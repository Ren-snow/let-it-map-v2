"use client";

import { useState } from "react";
import { MapView } from "@/features/map/components/MapView";
import { LocationDetail } from "@/features/map/components/LocationDetail";
import type { MapLocation } from "@/features/map/types";

export function MapWithDetail({ locations }: { locations: MapLocation[] }) {
  const [selected, setSelected] = useState<MapLocation | null>(null);

  return (
    <>
      <div className="h-[60vh] overflow-hidden rounded-xl">
        <MapView
          locations={locations}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {selected && <LocationDetail location={selected} />}
    </>
  );
}
