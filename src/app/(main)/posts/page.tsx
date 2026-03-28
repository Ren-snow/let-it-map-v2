import Link from "next/link";
import { PlusIcon } from "lucide-react";

function PostCardSkeleton() {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      {/* User row */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-surface-alt" />
        <div className="flex flex-col gap-1">
          <div className="h-3 w-20 rounded bg-surface-alt" />
          <div className="h-2.5 w-14 rounded bg-surface-alt" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-2 h-5 w-2/3 rounded bg-surface-alt" />

      {/* Description */}
      <div className="mb-4 space-y-1.5">
        <div className="h-3.5 w-full rounded bg-surface-alt" />
        <div className="h-3.5 w-4/5 rounded bg-surface-alt" />
      </div>

      {/* Location pill */}
      <div className="flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2">
        <svg
          className="h-4 w-4 shrink-0 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="h-3.5 w-28 rounded bg-background" />
          <div className="h-2.5 w-40 rounded bg-background" />
        </div>
      </div>
    </article>
  );
}

export default function PostsPage() {
  return (
    <div className="space-y-14">
      {/* Your Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl tracking-tight">Your Posts</h2>
            <p className="mt-1 text-sm text-muted">
              Places you have shared
            </p>
          </div>
          <Link
            href="/posts/create"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <PlusIcon className="h-4 w-4" />
            Add Post
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {[1, 2].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-border" />

      {/* Everyone's Posts */}
      <section>
        <div className="mb-6">
          <h2 className="font-serif text-2xl tracking-tight">
            {"Everyone's Posts"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Discover places shared by the community
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {[1, 2, 3].map((i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-border" />

      {/* Map */}
      <section>
        <div className="mb-6">
          <h2 className="font-serif text-2xl tracking-tight">Map</h2>
          <p className="mt-1 text-sm text-muted">
            All posts on the map
          </p>
        </div>

        <div className="flex aspect-4/3 items-center justify-center rounded-2xl border border-border bg-surface-alt">
          <div className="flex flex-col items-center gap-2 text-faint">
            <svg
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503-11.307 3.746-1.46a.75.75 0 0 1 .997.707v9.56a.75.75 0 0 1-.497.707l-5.25 2.044a.75.75 0 0 1-.553 0l-5.25-2.044a.75.75 0 0 1-.497-.707V3.697a.75.75 0 0 1 .997-.707l3.746 1.46a.75.75 0 0 0 .558 0Z"
              />
            </svg>
            <span className="text-sm">Google Maps</span>
          </div>
        </div>
      </section>
    </div>
  );
}
