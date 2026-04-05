"use server";

import { eq, desc, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts, locations, users } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import type { PostWithDetails, PaginatedResult } from "@/types/post";

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

export async function getPaginatedPosts({
  page = 1,
  pageSize = 20,
  userId,
}: {
  page?: number;
  pageSize?: number;
  userId?: string;
}): Promise<PaginatedResult<PostWithDetails>> {
  const whereCondition = userId ? eq(posts.userId, userId) : undefined;

  // db.select() always returns an array; destructure to get rows and the first count result
  const [rows, [{ total }]] = await Promise.all([
    db
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
      .where(whereCondition)
      .orderBy(desc(posts.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize),
    db.select({ total: count() }).from(posts).where(whereCondition),
  ]);

  return {
    data: rows.map((row) => ({
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
    })),
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
}

export type CreatePostState =
  | {
      error: string;
      values: {
        title: string;
        description: string;
        locationName: string;
        locationAddress: string;
      };
    }
  | undefined;

// _prevState is required by useActionState but unused here
export async function createPost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      error: "Authentication required",
      values: {
        title: "",
        description: "",
        locationName: "",
        locationAddress: "",
      },
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const locationName = formData.get("locationName") as string;
  const locationAddress = formData.get("locationAddress") as string;

  const values = { title, description, locationName, locationAddress };

  // Validation
  if (!title || title.length > 100) {
    return { error: "Title must be between 1 and 100 characters", values };
  }
  if (!description || description.length > 2000) {
    return {
      error: "Description must be between 1 and 2000 characters",
      values,
    };
  }
  if (!locationName) {
    return { error: "Location name is required", values };
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
