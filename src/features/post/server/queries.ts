import { eq, desc, count } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts, locations, users } from "@/lib/db/schema";
import type { PostWithDetails } from "@/features/post/types";
import type { PaginatedResult } from "@/types/common";

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
