"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/common/sidebar";
import { Topbar } from "@/components/common/topbar";

export function DashboardAppShell({ children, sessionTop }: { children: ReactNode; sessionTop?: ReactNode | null }) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {sessionTop}
        <Topbar />
        <main className="relative flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
