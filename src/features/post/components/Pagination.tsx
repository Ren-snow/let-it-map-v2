import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  tab,
}: {
  page: number;
  totalPages: number;
  tab: string;
}) {
  if (totalPages <= 1) return null;

  function buildHref(p: number) {
    const params = new URLSearchParams({ tab, page: String(p) });
    return `/posts?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-faint">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}

      <span className="text-sm text-muted">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-faint">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
