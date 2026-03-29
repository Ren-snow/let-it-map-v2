import { CreatePostForm } from "@/components/features/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl tracking-tight">Create a Post</h1>
        <p className="mt-2 text-sm text-muted">
          Share a place that matters to you
        </p>
      </div>
      <CreatePostForm />
    </div>
  );
}
