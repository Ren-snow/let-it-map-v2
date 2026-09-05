"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, LayoutList, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tab = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
};

const TABS: Tab[] = [
  { href: "/", label: "Map", icon: Map, isActive: (p) => p === "/" },
  {
    href: "/posts",
    label: "Posts",
    icon: LayoutList,
    isActive: (p) => p.startsWith("/posts"),
  },
  {
    href: "/me",
    label: "Profile",
    icon: User,
    isActive: (p) => p.startsWith("/me"),
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-background/85 pb-[var(--safe-bottom)] backdrop-blur-xl"
    >
      <ul className="flex h-[var(--nav-height)] items-stretch">
        {TABS.map((tab) => {
          const active = tab.isActive(pathname);
          const Icon = tab.icon;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[11px] font-medium tracking-tight">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
