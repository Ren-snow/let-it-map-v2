"use client";

import { useState } from "react";
import { MapView } from "@/features/map/components/MapView";
import { LocationDetail } from "@/features/map/components/LocationDetail";
import type { MapLocation } from "@/server/map/types";

export function MapWithDetail({ locations }: { locations: MapLocation[] }) {
  const [selected, setSelected] = useState<MapLocation | null>(null);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <MapView
          locations={locations}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* Interim detail panel. Phase B replaces this with a draggable
          bottom sheet (peek / half / full snap points). */}
      {selected && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3">
          <div className="pointer-events-auto mx-auto max-w-xl">
            <LocationDetail
              location={selected}
              onClose={() => setSelected(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
