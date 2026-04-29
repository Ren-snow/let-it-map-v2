"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts, locations } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

export type CreatePostState =
  | {
      error: string;
      values: {
        title: string;
        description: string;
        locationName: string;
        locationAddress: string;
        placeId: string;
        latitude: string;
        longitude: string;
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
        placeId: "",
        latitude: "",
        longitude: "",
      },
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const locationName = formData.get("locationName") as string;
  const locationAddress = formData.get("locationAddress") as string;
  const placeId = formData.get("placeId") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;

  const values = {
    title,
    description,
    locationName,
    locationAddress,
    placeId,
    latitude,
    longitude,
  };

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
  if (!placeId || !latitude || !longitude) {
    return { error: "Please select a location from the suggestions", values };
  }

  await db.transaction(async (tx) => {
    const existing = await tx
      .select({ id: locations.id })
      .from(locations)
      .where(eq(locations.placeId, placeId))
      .limit(1);

    let locationId: string;

    if (existing.length > 0) {
      locationId = existing[0].id;
    } else {
      const [location] = await tx
        .insert(locations)
        .values({
          placeId,
          name: locationName,
          address: locationAddress || locationName,
          latitude,
          longitude,
        })
        .returning({ id: locations.id });
      locationId = location.id;
    }

    // Insert post
    await tx.insert(posts).values({
      userId,
      locationId,
      title,
      description,
    });
  });

  revalidatePath("/posts");
  redirect("/posts");
}
