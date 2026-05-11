"use client";

import type { ReactNode } from "react";
import { RoleSessionBanner } from "@/components/dashboard/role-session-banner";
import { Sidebar, type ShellUser } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function DashboardAppShell({
  children,
  user,
  demoMode,
}: {
  children: ReactNode;
  user: ShellUser;
  demoMode?: boolean;
}) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <RoleSessionBanner roleDisplay={user.roleDisplay} email={user.email} demoMode={Boolean(demoMode)} />
        <main className="relative flex-1 overflow-x-hidden light:bg-zinc-50">{children}</main>
      </div>
    </div>
  );
}
