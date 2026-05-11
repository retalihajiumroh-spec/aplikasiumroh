"use client";

import { useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { AppRole } from "@/lib/supabase/database.types";

export function SupabaseSessionBar({ email, role }: { email: string; role: AppRole | string }) {
  const router = useRouter();

  async function signOut() {
    const sb = getSupabaseBrowser();
    if (sb) {
      await sb.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-600/15 bg-zinc-950/40 px-4 py-2.5 text-xs text-zinc-300/80 sm:px-6 light:border-slate-200/70 light:bg-slate-100/90 light:text-slate-700">
      <p className="min-w-0 truncate">
        <span className="text-zinc-600/60 light:text-slate-500">Masuk sebagai</span>{" "}
        <span className="font-medium text-zinc-200/95 light:text-slate-900">{email}</span>
        <span className="mx-2 text-zinc-600/50 light:text-slate-400">·</span>
        <span className="rounded-md border border-zinc-600/20 bg-zinc-600/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-zinc-400/90 light:border-zinc-300/60 light:bg-zinc-50 light:text-[#27272a]">
          {role}
        </span>
      </p>
      <button
        type="button"
        onClick={() => void signOut()}
        className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-medium text-zinc-300/90 transition hover:bg-white/5 light:border-slate-300/80 light:text-slate-800 light:hover:bg-slate-200/60"
      >
        Keluar
      </button>
    </div>
  );
}
