import { z } from "zod";

/**
 * Location selected through Google Places autocomplete.
 * Latitude/longitude arrive as strings from the form and are coerced here.
 */
export const locationInput = z.object({
  placeId: z.string().min(1, "Please select a location from the suggestions"),
  name: z.string().min(1, "Location name is required"),
  address: z.string(),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export const createPostInput = z.object({
  title: z.string().min(1).max(100, "Title must be between 1 and 100 characters"),
  description: z
    .string()
    .min(1)
    .max(2000, "Description must be between 1 and 2000 characters"),
  location: locationInput,
});

export type LocationInput = z.infer<typeof locationInput>;
export type CreatePostInput = z.infer<typeof createPostInput>;
