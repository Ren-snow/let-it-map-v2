"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
};

const DEBOUNCE_MS = 300;

/**
 * Google Places autocomplete. Debounces the query and resolves the full
 * details of a picked prediction. Knows nothing about posts or locations.
 */
export function usePlacePredictions(query: string, enabled = true) {
  const placesLib = useMapsLibrary("places");
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  useEffect(() => {
    if (!placesLib) return;
    autocompleteService.current = new placesLib.AutocompleteService();
    placesService.current = new placesLib.PlacesService(
      document.createElement("div"),
    );
  }, [placesLib]);

  useEffect(() => {
    if (!enabled || !query.trim()) return;

    const timer = setTimeout(() => {
      autocompleteService.current?.getPlacePredictions(
        { input: query },
        (results) => setPredictions(results ?? []),
      );
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query, enabled, placesLib]);

  const clearPredictions = useCallback(() => setPredictions([]), []);

  const fetchDetails = useCallback(
    (placeId: string) =>
      new Promise<PlaceDetails | null>((resolve) => {
        if (!placesService.current) {
          resolve(null);
          return;
        }
        placesService.current.getDetails(
          {
            placeId,
            fields: ["place_id", "name", "geometry", "formatted_address"],
          },
          (place) => {
            if (!place?.geometry?.location) {
              resolve(null);
              return;
            }
            resolve({
              placeId,
              name: place.name ?? "",
              address: place.formatted_address ?? "",
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          },
        );
      }),
    [],
  );

  // Stale results must not outlive the query that produced them.
  const visible = enabled && query.trim() ? predictions : [];

  return { predictions: visible, clearPredictions, fetchDetails };
}
