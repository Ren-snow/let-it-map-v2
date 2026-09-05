"use client";

import { X } from "lucide-react";
import { StreetView } from "@/features/map/components/StreetView";
import type { MapLocation } from "@/server/map/types";

export function LocationDetail({
  location,
  onClose,
}: {
  location: MapLocation;
  onClose: () => void;
}) {
  return (
    <div className="max-h-[55vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-xl">
      <div className="relative h-40 w-full">
        <StreetView lat={location.latitude} lng={location.longitude} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <h2 className="font-serif text-xl leading-tight">{location.name}</h2>
        <p className="mt-1 text-sm text-muted">{location.address}</p>

        <ul className="mt-4 space-y-2">
          {location.posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-border bg-background p-3"
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
