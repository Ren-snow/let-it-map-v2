"use client"

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react"

type SelectedPlace = {
    placeId: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
};


export function PlaceAutocompleteInput({ defaultValue }: { defaultValue?: string }) {
    const [inputVal, setInputVal] = useState(defaultValue ?? "");
    const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

    const placesLib = useMapsLibrary("places");

    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);

    useEffect(() => {
        if (!placesLib) return;
        autocompleteService.current = new placesLib.AutocompleteService();
        placesService.current = new placesLib.PlacesService(
            document.createElement("div"),
        );
    }, [placesLib]);

    useEffect(() => {
        if (!autocompleteService.current || !inputVal.trim() || selectedPlace) {
            return;
        }
        const timer = setTimeout(() => {
            autocompleteService.current!.getPlacePredictions(
                { input: inputVal },
                (results: google.maps.places.AutocompletePrediction[] | null) => {
                    setPredictions(results ?? []);
                    setIsOpen(true);
                },
            );
        }, 300);
        return () => clearTimeout(timer);
    }, [inputVal, selectedPlace])

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [])

    function handleSelect(prediction: google.maps.places.AutocompletePrediction) {
        if (!placesService.current) return;
        placesService.current.getDetails(
            {
                placeId: prediction.place_id,
                fields: ["place_id", "name", "geometry", "formatted_address"],
            },
            (place: google.maps.places.PlaceResult | null) => {
                if (!place?.geometry?.location) return;
                setSelectedPlace({
                    placeId: prediction.place_id,
                    name: place.name ?? "",
                    address: place.formatted_address ?? "",
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                });
                setInputVal(place.name ?? "");
                setIsOpen(false);
            },
        );
    }


    return (
        <div ref={containerRef} className="relative">
            <label
                htmlFor="locationSearch"
                className="mb-1.5 block text-sm font-medium text-foreground"
            >
                Location
            </label>
            <input
                id="locationSearch"
                type="text"
                value={inputVal}
                onChange={(e) => {
                    setInputVal(e.target.value);
                    setSelectedPlace(null);
                }}
                onFocus={() => {
                    if (predictions.length > 0) setIsOpen(true);
                }}
                placeholder="Search for a place or address..."
                autoComplete="off"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            />
            {selectedPlace && (
                <p className="mt-1.5 text-xs text-muted">
                    {selectedPlace.address}
                </p>
            )}

            <input type="hidden" name="placeId" value={selectedPlace?.placeId ?? ""} />
            <input type="hidden" name="locationName" value={selectedPlace?.name ?? ""} />
            <input type="hidden" name="locationAddress" value={selectedPlace?.address ?? ""} />
            <input type="hidden" name="latitude" value={selectedPlace?.lat ?? ""} />
            <input type="hidden" name="longitude" value={selectedPlace?.lng ?? ""} />

            {isOpen && predictions.length > 0 && (
                <ul className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                    {predictions.map((p) => (
                        <li
                            key={p.place_id}
                            onClick={() => handleSelect(p)}
                            className="cursor-pointer border-b border-border px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-foreground/5"
                        >
                            <span className="font-medium text-foreground">
                                {p.structured_formatting.main_text}
                            </span>
                            <span className="ml-1.5 text-muted">
                                {p.structured_formatting.secondary_text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}