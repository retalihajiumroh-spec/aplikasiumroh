"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { brandMark, dashboardNavItems } from "@/lib/navigation/dashboard-nav";

export function Sidebar() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Navigasi utama">
      {dashboardNavItems.map((item, i) => {
        const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <motion.div key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
            <Link
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-emerald-500/20 text-emerald-50 ring-1 ring-amber-400/35"
                  : "text-emerald-200/75 hover:bg-white/[0.06] hover:text-emerald-50"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition ${active ? "text-emerald-300" : "text-emerald-400/70 group-hover:text-emerald-300"}`}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.badge !== undefined ? (
                <span className="shrink-0 rounded-md border border-amber-400/35 bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-100">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              ) : null}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );

  const panel = (
    <aside
      className={`glass-panel fixed inset-y-0 left-0 z-[60] flex w-[min(88vw,280px)] flex-col border-r border-emerald-500/15 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:h-auto lg:min-h-dvh lg:w-64 lg:max-w-none lg:translate-x-0 lg:rounded-none lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      aria-hidden={false}
    >
      <div className="flex items-center justify-between gap-2 border-b border-emerald-500/10 px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={close}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/35 via-emerald-600/25 to-amber-500/25 text-sm font-bold tracking-tight text-emerald-50 ring-1 ring-amber-400/30">
            S
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/85">{brandMark.title}</span>
            <span className="block text-sm font-semibold text-emerald-50">{brandMark.subtitle}</span>
          </span>
        </Link>
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-emerald-200/80 transition hover:bg-white/10 lg:hidden"
          onClick={close}
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {nav}
      <div className="mt-auto border-t border-emerald-500/10 px-4 py-3">
        <Link
          href="/"
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          onClick={close}
        >
          Hub aplikasi
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-[calc(0.75rem+env(safe-area-inset-top))] z-[55] flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-950/80 text-emerald-100 shadow-lg backdrop-blur-md transition hover:bg-emerald-900/90 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Buka menu navigasi"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.button
            key="backdrop"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] bg-black/55 backdrop-blur-sm lg:hidden"
            aria-label="Tutup menu"
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      {panel}
    </>
  );
}
