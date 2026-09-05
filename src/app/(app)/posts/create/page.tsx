import { CreatePostForm } from "@/features/post/components/CreatePostForm";
import { MapProvider } from "@/features/map/components/MapProvider";

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl tracking-tight">Create a Post</h1>
        <p className="mt-2 text-sm text-muted">
          Share a place that matters to you
        </p>
      </div>
      <MapProvider>
        <CreatePostForm />
      </MapProvider>
    </div>
  );
}
