"use client";

import { useEffect, useRef, useState } from "react";
import { usePlacePredictions, type PlaceDetails } from "@/hooks/usePlacePredictions";

export function PlaceAutocompleteInput({
  initialPlace,
}: {
  initialPlace?: PlaceDetails | null;
}) {
  const [inputVal, setInputVal] = useState(initialPlace?.name ?? "");
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(
    initialPlace ?? null,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Predictions pause while a place is selected, so picking one closes the list.
  const { predictions, clearPredictions, fetchDetails } = usePlacePredictions(
    inputVal,
    !selectedPlace,
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsDismissed(true);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const isOpen = !isDismissed && predictions.length > 0;

  async function handleSelect(placeId: string) {
    const details = await fetchDetails(placeId);
    if (!details) return;
    setSelectedPlace(details);
    setInputVal(details.name);
    setIsDismissed(true);
    clearPredictions();
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
          setIsDismissed(false);
        }}
        onFocus={() => setIsDismissed(false)}
        placeholder="Search for a place or address..."
        autoComplete="off"
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
      />
      {selectedPlace && (
        <p className="mt-1.5 text-xs text-muted">{selectedPlace.address}</p>
      )}

      <input type="hidden" name="placeId" value={selectedPlace?.placeId ?? ""} />
      <input type="hidden" name="locationName" value={selectedPlace?.name ?? ""} />
      <input type="hidden" name="locationAddress" value={selectedPlace?.address ?? ""} />
      <input type="hidden" name="latitude" value={selectedPlace?.lat ?? ""} />
      <input type="hidden" name="longitude" value={selectedPlace?.lng ?? ""} />

      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
          {predictions.map((p) => (
            <li key={p.place_id}>
              <button
                type="button"
                onClick={() => handleSelect(p.place_id)}
                className="block w-full border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-b-0 hover:bg-foreground/5"
              >
                <span className="font-medium text-foreground">
                  {p.structured_formatting.main_text}
                </span>
                <span className="ml-1.5 text-muted">
                  {p.structured_formatting.secondary_text}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
