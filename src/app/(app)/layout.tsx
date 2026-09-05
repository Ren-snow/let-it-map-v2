import { TabBar } from "@/components/layout/TabBar";

/**
 * App shell — full screen, no header or footer.
 * Screens size themselves against --app-height (100dvh minus the tab bar).
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-dvh pb-nav">{children}</div>
      <TabBar />
    </>
  );
}
