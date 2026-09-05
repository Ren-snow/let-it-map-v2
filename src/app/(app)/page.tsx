import { getMapLocations } from "@/server/map/queries";
import { MapProvider } from "@/features/map/components/MapProvider";
import { MapWithDetail } from "@/features/map/components/MapWithDetail";

/**
 * Launch screen. The map is the background layer; everything else floats on it.
 */
export default async function MapPage() {
  const locations = await getMapLocations();

  return (
    <div className="h-[var(--app-height)] w-full">
      <MapProvider>
        <MapWithDetail locations={locations} />
      </MapProvider>
    </div>
  );
}
