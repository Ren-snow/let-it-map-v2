"use client";

import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const ZOOM = 15;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

/** A single pin, no controls — context for a post, not a place to navigate. */
export function LocationMiniMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <Map
      defaultCenter={{ lat, lng }}
      defaultZoom={ZOOM}
      className="h-full w-full"
      gestureHandling="cooperative"
      disableDefaultUI
      mapId={MAP_ID}
    >
      <AdvancedMarker position={{ lat, lng }}>
        <Pin background="#C1623A" borderColor="#8B3A1F" glyphColor="#FFF" />
      </AdvancedMarker>
    </Map>
  );
}
