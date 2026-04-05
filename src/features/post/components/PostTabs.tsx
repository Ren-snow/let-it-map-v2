"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { key: "all", label: "Everyone's Posts" },
  { key: "mine", label: "Your Posts" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export default function PostTabs({ currentTab }: { currentTab: TabKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTabClick(tab: TabKey) {
    if (tab === currentTab) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.delete("page");
    router.push(`/posts?${params.toString()}`);
  }

  return (
    <div className="flex gap-1 rounded-lg bg-surface-alt p-1">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleTabClick(key)}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            currentTab === key
              ? "bg-surface text-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
