"use client";

import { Bell, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useId, useState } from "react";

function BrandMark() {
  return (
    <div className="hidden shrink-0 items-center gap-2 sm:flex lg:hidden" aria-hidden>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/35 to-amber-500/20 text-xs font-bold text-emerald-50 ring-1 ring-amber-400/25">
        S
      </span>
      <div className="leading-tight">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200/85">SA&apos;YA</p>
        <p className="text-sm font-semibold text-emerald-50">Umroh OS</p>
      </div>
    </div>
  );
}

export function Topbar() {
  const searchId = useId();
  const [q, setQ] = useState("");

  return (
    <motion.header
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-emerald-500/10 bg-emerald-950/60 px-4 py-3 backdrop-blur-xl sm:px-6 lg:pl-8"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap">
        <div className="flex w-full min-w-0 flex-1 items-center gap-3 pl-14 lg:pl-0">
          <BrandMark />
          <label htmlFor={searchId} className="sr-only">
            Pencarian global
          </label>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400/60" aria-hidden />
            <input
              id={searchId}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari jamaah, booking, paket…"
              className="w-full rounded-2xl border border-emerald-500/15 bg-emerald-950/50 py-2.5 pl-10 pr-4 text-sm text-emerald-50 placeholder:text-emerald-600/50 focus:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-white/[0.04] text-emerald-200 transition hover:border-amber-400/40 hover:bg-amber-500/10"
            aria-label="Notifikasi"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400 shadow shadow-amber-500/40" aria-hidden />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex h-11 items-center gap-2 rounded-2xl border border-amber-400/25 bg-gradient-to-r from-emerald-500/15 via-emerald-600/10 to-amber-500/15 px-3 text-sm font-medium text-emerald-100 transition hover:border-amber-300/45"
            aria-label="Profil pengguna"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 ring-1 ring-amber-400/30">
              <UserRound className="h-4 w-4 text-amber-100" aria-hidden />
            </span>
            <span className="hidden max-w-[120px] truncate sm:inline">Admin</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
