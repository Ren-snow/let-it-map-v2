import { getMapLocations } from "@/server/map/queries";
import { MapProvider } from "@/features/map/components/MapProvider";
import { MapScreen } from "@/features/map/components/MapScreen";

/**
 * Launch screen. The map is the background layer; everything else floats on it.
 */
export default async function MapPage() {
  const locations = await getMapLocations();

  return (
    <div className="h-[var(--app-height)] w-full">
      <MapProvider>
        <MapScreen locations={locations} />
      </MapProvider>
    </div>
  );
}
