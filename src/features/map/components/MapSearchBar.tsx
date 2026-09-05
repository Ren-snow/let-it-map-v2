"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { usePlacePredictions, type PlaceDetails } from "@/hooks/usePlacePredictions";

export function MapSearchBar({
  onSelect,
}: {
  onSelect: (place: PlaceDetails) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { predictions, clearPredictions, fetchDetails } =
    usePlacePredictions(query);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  async function handleSelect(placeId: string, label: string) {
    const details = await fetchDetails(placeId);
    if (!details) return;
    setQuery(label);
    setIsOpen(false);
    clearPredictions();
    onSelect(details);
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-30 p-3"
    >
      <div className="pointer-events-auto relative mx-auto max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => predictions.length > 0 && setIsOpen(true)}
          placeholder="Search for a place"
          autoComplete="off"
          aria-label="Search for a place"
          className="w-full rounded-2xl border border-border/50 bg-background/90 py-3 pl-11 pr-10 text-sm shadow-lg backdrop-blur-xl placeholder:text-faint focus:border-accent focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              clearPredictions();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-foreground/5"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {isOpen && predictions.length > 0 && (
          <ul className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
            {predictions.map((p) => (
              <li key={p.place_id}>
                <button
                  type="button"
                  onClick={() =>
                    handleSelect(p.place_id, p.structured_formatting.main_text)
                  }
                  className="block w-full border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-b-0 hover:bg-foreground/5"
                >
                  <span className="font-medium">
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
    </div>
  );
}
