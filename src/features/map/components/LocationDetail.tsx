"use client";

import { StreetView } from "@/features/map/components/StreetView";
import type { MapLocation } from "@/features/map/types";

export function LocationDetail({ location }: { location: MapLocation }) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="h-64 overflow-hidden rounded-xl md:h-80">
        <StreetView lat={location.latitude} lng={location.longitude} />
      </div>

      <div>
        <h2 className="font-serif text-xl">{location.name}</h2>
        <p className="mt-1 text-sm text-muted">{location.address}</p>

        <ul className="mt-4 space-y-3">
          {location.posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-border bg-surface p-3"
            >
              <p className="font-medium">{post.title}</p>
              {post.userName && (
                <p className="mt-1 text-sm text-muted">by {post.userName}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
