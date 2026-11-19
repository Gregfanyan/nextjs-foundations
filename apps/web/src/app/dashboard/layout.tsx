import { SessionTimer } from "@/components/session-timer";
import { SidebarLink } from "@/components/sidebar-link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[70vh] gap-8">
      <aside className="flex w-48 flex-col gap-1 border-r pr-4">
        <p className="mb-2 font-semibold text-gray-500 text-xs uppercase">
          Dashboard
        </p>
        <SidebarLink href="/dashboard">Overview</SidebarLink>
        <SidebarLink href="/dashboard/analytics">Analytics</SidebarLink>
        <SidebarLink href="/dashboard/settings">Settings</SidebarLink>
        <div className="mt-auto pt-6">
          <SessionTimer />
        </div>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}
