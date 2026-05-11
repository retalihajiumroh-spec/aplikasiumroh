"use client";

import { ShieldCheck } from "lucide-react";

export function RoleSessionBanner({
  roleDisplay,
  email,
  demoMode,
}: {
  roleDisplay: string;
  email: string;
  demoMode: boolean;
}) {
  return (
    <div
      className="border-b border-zinc-600/15 bg-gradient-to-r from-[#800000]/25 via-zinc-900/40 to-zinc-950/50 px-4 py-2.5 text-center text-sm text-zinc-100 backdrop-blur-sm light:border-slate-200/90 light:from-[#800000]/12 light:via-zinc-100 light:to-white light:text-slate-800 sm:px-6 lg:px-8"
      role="status"
      aria-live="polite"
    >
      <p className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-300 light:text-[#800000]" aria-hidden />
        <span>
          Anda login sebagai <strong className="font-semibold text-white light:text-slate-950">{roleDisplay}</strong>
          <span className="text-zinc-400 light:text-slate-600"> · </span>
          <span className="text-zinc-300/90 light:text-slate-600">{email}</span>
        </span>
        {demoMode ? (
          <span className="rounded-md border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-100 light:border-amber-600/40 light:bg-amber-100 light:text-amber-950">
            Mode demo (tanpa Supabase)
          </span>
        ) : null}
      </p>
    </div>
  );
}
