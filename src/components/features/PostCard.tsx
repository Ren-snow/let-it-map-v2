import { MapPin } from "lucide-react";
import type { PostWithDetails } from "@/types/post";

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  if (diffDay > 0) return `${diffDay}d ago`;
  if (diffHour > 0) return `${diffHour}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return "Just now";
}

export default function PostCard({ post }: { post: PostWithDetails }) {
  const initials = post.user.name
    ? post.user.name.charAt(0).toUpperCase()
    : "?";

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      {/* User row */}
      <div className="mb-3 flex items-center gap-3">
        {post.user.image ? (
          <img
            src={post.user.image}
            alt={post.user.name ?? "User"}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-alt text-xs font-medium text-muted">
            {initials}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {post.user.name ?? "Anonymous"}
          </span>
          <span className="text-xs text-faint">
            {getRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-serif text-lg tracking-tight text-foreground">
        {post.title}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      {/* Location pill */}
      <div className="flex items-center gap-2 rounded-lg bg-surface-alt px-3 py-2">
        <MapPin className="h-4 w-4 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {post.location.name}
          </p>
          {post.location.address && post.location.address !== post.location.name && (
            <p className="truncate text-xs text-faint">
              {post.location.address}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
