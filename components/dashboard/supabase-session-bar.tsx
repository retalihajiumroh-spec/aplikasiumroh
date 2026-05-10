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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/15 bg-emerald-950/40 px-4 py-2.5 text-xs text-emerald-200/80 sm:px-6">
      <p className="min-w-0 truncate">
        <span className="text-emerald-500/60">Masuk sebagai</span>{" "}
        <span className="font-medium text-emerald-100/95">{email}</span>
        <span className="mx-2 text-emerald-600/50">·</span>
        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-emerald-300/90">
          {role}
        </span>
      </p>
      <button
        type="button"
        onClick={() => void signOut()}
        className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-medium text-emerald-200/90 transition hover:bg-white/5"
      >
        Keluar
      </button>
    </div>
  );
}
