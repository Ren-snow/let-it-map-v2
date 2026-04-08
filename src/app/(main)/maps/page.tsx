import { getMapLocations } from "@/features/map/server/queries";
import { MapProvider } from "@/features/map/components/MapProvider";
import { MapWithDetail } from "@/features/map/components/MapWithDetail";

export default async function MapsPage() {
  const locations = await getMapLocations();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl tracking-tight">Map</h1>
        <p className="mt-2 text-sm text-muted">
          Explore places shared by the community
        </p>
      </div>
      <MapProvider>
        <MapWithDetail locations={locations} />
      </MapProvider>
    </div>
  );
}
