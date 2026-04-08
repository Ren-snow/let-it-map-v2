"use client";

import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { MapLocation } from "@/features/map/types";

const DEFAULT_CENTER = { lat: 53.4084, lng: -2.9916 }; // Liverpool
const DEFAULT_ZOOM = 8;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

export function MapView({
    locations,
    selected,
    onSelect,
}: {
    locations: MapLocation[];
    selected: MapLocation | null;
    onSelect: (location: MapLocation) => void;
}) {
    return (
        <Map
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            className="h-full w-full"
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapId={MAP_ID}
        >
            {locations.map((location) => (
                <AdvancedMarker
                    key={location.id}
                    position={{ lat: location.latitude, lng: location.longitude }}
                    onClick={() => onSelect(location)}
                >
                    <Pin
                        background={selected?.id === location.id ? "#1B7A6E" : "#C1623A"}
                        borderColor={selected?.id === location.id ? "#15665C" : "#8B3A1F"}
                        glyphColor="#FFF"
                    />
                </AdvancedMarker>
            ))}
        </Map>
    );
}
