"use client";

import Link from "next/link";
import { Navigation, PenLine } from "lucide-react";
import { StreetView } from "@/features/map/components/StreetView";
import type { Snap } from "@/features/map/hooks/useBottomSheet";
import type { MapLocation } from "@/server/map/types";

function directionsUrl(location: MapLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
}

function createPostUrl(location: MapLocation) {
  const params = new URLSearchParams({
    placeId: location.placeId,
    name: location.name,
    address: location.address,
    lat: String(location.latitude),
    lng: String(location.longitude),
  });
  return `/posts/create?${params.toString()}`;
}

export function LocationSheet({
  location,
  areaPostCount,
  snap,
  sheetHeight,
  translate,
  isDragging,
  dragHandlers,
}: {
  location: MapLocation | null;
  areaPostCount: number;
  snap: Snap;
  sheetHeight: number;
  translate: number;
  isDragging: boolean;
  dragHandlers: React.ComponentProps<"div">;
}) {
  return (
    <section
      aria-label="Location details"
      style={{
        height: sheetHeight,
        transform: `translateY(${translate}px)`,
        transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-t-3xl border-t border-border bg-surface shadow-[0_-8px_32px_rgba(0,0,0,0.12)]"
    >
      {/* Drag area — the content below scrolls on its own */}
      <div {...dragHandlers} className="shrink-0 cursor-grab touch-none px-5 pb-3 pt-2.5 active:cursor-grabbing">
        <div className="mx-auto h-1 w-9 rounded-full bg-border" />

        {location ? (
          <div className="mt-3">
            <h2 className="font-serif text-xl leading-tight">{location.name}</h2>
            <p className="mt-1 truncate text-sm text-muted">{location.address}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            {areaPostCount === 1
              ? "1 post in this area"
              : `${areaPostCount} posts in this area`}
          </p>
        )}
      </div>

      {location && (
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          {/* Action row */}
          <div className="flex gap-2">
            <Link
              href={createPostUrl(location)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              <PenLine className="h-4 w-4" />
              Post here
            </Link>
            <a
              href={directionsUrl(location)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground/5"
            >
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </div>

          {/* Street View — only worth rendering once the sheet is open enough */}
          {snap !== "peek" && (
            <div className="mt-4 h-44 overflow-hidden rounded-xl">
              <StreetView lat={location.latitude} lng={location.longitude} />
            </div>
          )}

          <h3 className="mt-5 text-sm font-semibold">
            {location.posts.length === 1
              ? "1 post"
              : `${location.posts.length} posts`}
          </h3>
          <ul className="mt-2 space-y-2">
            {location.posts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-border bg-background p-3"
              >
                <p className="font-medium">{post.title}</p>
                {post.userName && (
                  <p className="mt-1 text-sm text-muted">by {post.userName}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
