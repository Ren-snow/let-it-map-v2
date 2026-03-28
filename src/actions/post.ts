"use server";

import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts, locations, users } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import type { PostWithDetails } from "@/types/post";

export async function getPosts(userId?: string): Promise<PostWithDetails[]> {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      userName: users.name,
      userId: users.id,
      userImage: users.image,
      locationName: locations.name,
      locationAddress: locations.address,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .innerJoin(locations, eq(posts.locationId, locations.id))
    .where(userId ? eq(posts.userId, userId) : undefined)
    .orderBy(desc(posts.createdAt));

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    user: {
      id: row.userId,
      name: row.userName,
      image: row.userImage,
    },
    location: {
      name: row.locationName,
      address: row.locationAddress,
    },
  }));
}

export async function createPost(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Authentication required");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const locationName = formData.get("locationName") as string;
  const locationAddress = formData.get("locationAddress") as string;

  // Validation
  if (!title || title.length > 100) {
    throw new Error("Title must be between 1 and 100 characters");
  }
  if (!description || description.length > 2000) {
    throw new Error("Description must be between 1 and 2000 characters");
  }
  if (!locationName) {
    throw new Error("Location name is required");
  }

  // Temporary placeId until Google Maps integration
  const placeId = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  await db.transaction(async (tx) => {
    // Insert location
    const [location] = await tx
      .insert(locations)
      .values({
        placeId,
        name: locationName,
        address: locationAddress || locationName,
        latitude: "0",
        longitude: "0",
      })
      .returning({ id: locations.id });

    // Insert post
    await tx.insert(posts).values({
      userId,
      locationId: location.id,
      title,
      description,
    });
  });

  revalidatePath("/posts");
  redirect("/posts");
}
