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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/15 bg-purple-950/40 px-4 py-2.5 text-xs text-purple-200/80 sm:px-6 light:border-slate-200/70 light:bg-slate-100/90 light:text-slate-700">
      <p className="min-w-0 truncate">
        <span className="text-purple-500/60 light:text-slate-500">Masuk sebagai</span>{" "}
        <span className="font-medium text-purple-100/95 light:text-slate-900">{email}</span>
        <span className="mx-2 text-purple-600/50 light:text-slate-400">·</span>
        <span className="rounded-md border border-purple-500/20 bg-purple-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-purple-300/90 light:border-purple-200/60 light:bg-purple-50 light:text-[#6A1B9A]">
          {role}
        </span>
      </p>
      <button
        type="button"
        onClick={() => void signOut()}
        className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-medium text-purple-200/90 transition hover:bg-white/5 light:border-slate-300/80 light:text-slate-800 light:hover:bg-slate-200/60"
      >
        Keluar
      </button>
    </div>
  );
}
