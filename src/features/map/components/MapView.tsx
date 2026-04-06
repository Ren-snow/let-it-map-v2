"use client";

import { Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { MapLocation } from "@/features/map/types";

const DEFAULT_CENTER = { lat: 53.4084, lng: -2.9916 }; // Liverpool
const DEFAULT_ZOOM = 8;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

export function MapView({ locations }: { locations: MapLocation[] }) {
    const [selected, setSelected] = useState<MapLocation | null>(null);

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
                    onClick={() => setSelected(location)}
                >
                    <Pin background="#C1623A" borderColor="#8B3A1F" glyphColor="#FFF" />
                </AdvancedMarker>
            ))}

            {selected && (
                <InfoWindow
                    position={{ lat: selected.latitude, lng: selected.longitude }}
                    onCloseClick={() => setSelected(null)}
                >
                    <div className="p-2">
                        <h3 className="font-semibold">{selected.name}</h3>
                        <p className="text-sm text-gray-600">{selected.address}</p>
                        <ul className="mt-2 space-y-1">
                            {selected.posts.map((post) => (
                                <li key={post.id} className="text-sm">
                                    <span className="font-medium">{post.title}</span>
                                    {post.userName && (
                                        <span className="text-gray-500"> — {post.userName}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </InfoWindow>
            )}
        </Map>
    );
}
