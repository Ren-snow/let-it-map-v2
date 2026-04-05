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
