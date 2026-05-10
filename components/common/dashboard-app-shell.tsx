"use client";

import type { ReactNode } from "react";
import { Sidebar, type ShellUser } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function DashboardAppShell({ children, user }: { children: ReactNode; user: ShellUser }) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="relative flex-1 overflow-x-hidden light:bg-[#faf7ff]">{children}</main>
      </div>
    </div>
  );
}
