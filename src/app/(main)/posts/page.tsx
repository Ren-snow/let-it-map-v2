import Link from "next/link";
import { PlusIcon, FileText } from "lucide-react";
import { auth } from "@/lib/auth";
import { getPaginatedPosts } from "@/actions/post";
import PostCard from "@/components/features/PostCard";
import PostTabs from "@/components/features/PostTabs";
import Pagination from "@/components/features/Pagination";
import type { TabKey } from "@/components/features/PostTabs";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const { tab, page } = await searchParams;
  const currentTab: TabKey = tab === "mine" ? "mine" : "all";
  const currentPage = Math.max(1, Number(page) || 1);
  const session = await auth();

  const showMine = currentTab === "mine" && !!session?.user;

  const result = await getPaginatedPosts({
    page: currentPage,
    pageSize: 20,
    userId: showMine ? session?.user?.id : undefined,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Posts</h1>
          <p className="mt-1 text-sm text-muted">
            Discover places shared by the community
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

      {/* Tabs */}
      <PostTabs currentTab={currentTab} />

      {/* Sign-in prompt for "Your Posts" when not logged in */}
      {currentTab === "mine" && !session?.user && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface py-16">
          <FileText className="h-10 w-10 text-faint" />
          <p className="text-sm text-muted">Sign in to see your posts</p>
        </div>
      )}

      {/* Empty state */}
      {(showMine || currentTab === "all") && result.data.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface py-16">
          <FileText className="h-10 w-10 text-faint" />
          <p className="text-sm text-muted">
            {showMine
              ? "You haven't shared any places yet"
              : "No posts yet. Be the first to share a place!"}
          </p>
          <Link
            href="/posts/create"
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <PlusIcon className="h-4 w-4" />
            Create Post
          </Link>
        </div>
      )}

      {/* Post list */}
      {result.data.length > 0 && (
        <div className="flex flex-col gap-5">
          {result.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={result.page} totalPages={result.totalPages} tab={currentTab} />

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
