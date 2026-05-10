"use client";

import Link from "next/link";
import { Bell, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useId, useState } from "react";
import type { ShellUser } from "@/components/sidebar";

function BrandBlock() {
  return (
    <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5 rounded-xl py-1 transition hover:opacity-95">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/35 via-purple-600/25 to-violet-500/25 text-sm font-bold text-purple-50 ring-1 ring-violet-400/30">
        S
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/85">SA&apos;YA</p>
        <p className="text-sm font-semibold text-purple-50">Umroh OS</p>
      </div>
    </Link>
  );
}

export function Topbar({ user }: { user: ShellUser }) {
  const searchId = useId();
  const [q, setQ] = useState("");

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-purple-500/10 bg-purple-950/65 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-3 pl-14 sm:pl-14 lg:pl-0">
          <BrandBlock />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <label htmlFor={searchId} className="sr-only">
            Pencarian global
          </label>
          <div className="relative min-w-0 flex-1 sm:max-w-md lg:max-w-lg">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400/60" aria-hidden />
            <input
              id={searchId}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari jamaah, booking, paket…"
              className="w-full rounded-2xl border border-purple-500/15 bg-purple-950/50 py-2.5 pl-10 pr-4 text-sm text-purple-50 placeholder:text-slate-500/80 focus:border-violet-400/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/20 bg-white/[0.04] text-purple-200 transition hover:border-violet-400/40 hover:bg-violet-500/10"
              aria-label="Notifikasi"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-400 shadow shadow-violet-500/40" aria-hidden />
            </motion.button>
            <Link
              href="/dashboard/settings"
              className="flex h-11 items-center gap-2 rounded-2xl border border-violet-400/25 bg-gradient-to-r from-purple-500/15 via-purple-600/10 to-violet-500/15 px-3 text-sm font-medium text-purple-100 transition hover:border-violet-300/45"
              aria-label="Profil dan pengaturan"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/20 ring-1 ring-violet-400/30">
                <UserRound className="h-4 w-4 text-violet-100" aria-hidden />
              </span>
              <span className="hidden max-w-[140px] truncate sm:inline">{user.displayName}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
