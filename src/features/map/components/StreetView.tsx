"use client";

import { useEffect, useRef } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export function StreetView({ lat, lng }: { lat: number; lng: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const map = useMap();
  const streetViewLib = useMapsLibrary("streetView");

  useEffect(() => {
    if (!containerRef.current || !streetViewLib || !map) return;

    const panorama = new streetViewLib.StreetViewPanorama(containerRef.current, {
      position: { lat, lng },
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      addressControl: false,
      fullscreenControl: false,
    });

    const service = new streetViewLib.StreetViewService();
    service.getPanorama(
      { location: { lat, lng }, radius: 500 },
      (data, status) => {
        if (status === streetViewLib.StreetViewStatus.OK && data?.location?.latLng) {
          panorama.setPosition(data.location.latLng);
        } else {
          containerRef.current?.setAttribute("data-no-streetview", "true");
        }
      }
    );

    return () => {
      panorama.setVisible(false);
    };
  }, [lat, lng, streetViewLib, map]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full rounded-xl" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-surface-alt text-sm text-muted opacity-0 transition-opacity [:has([data-no-streetview])>&]:opacity-100">
        Street View is not available for this location
      </div>
    </div>
  );
}
