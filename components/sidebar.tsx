"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, LogOut, Menu, Settings, UserRound, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import { brandMark, dashboardNavItems } from "@/lib/navigation/dashboard-nav";

export type ShellUser = {
  displayName: string;
  email: string;
  role: string;
};

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) return "?";
  if (p.length === 1) return p[0]!.slice(0, 2).toUpperCase();
  return (p[0]![0] + p[p.length - 1]![0]).toUpperCase();
}

export function Sidebar({ user }: { user: ShellUser }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!profileOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (profileWrapRef.current?.contains(e.target as Node)) return;
      setProfileOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [profileOpen]);

  async function signOut() {
    const sb = getSupabaseBrowser();
    if (sb) await sb.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Navigasi utama">
      {dashboardNavItems.map((item, i) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard" || pathname === "/dashboard/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <motion.div key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}>
            <Link
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-purple-500/25 font-bold text-purple-50 ring-1 ring-violet-400/35 light:bg-[#6A1B9A]/15 light:text-[#3d0d5c] light:ring-[#6A1B9A]/35"
                  : "font-medium text-purple-200/75 hover:bg-white/[0.06] hover:text-purple-50 light:text-slate-500 light:hover:bg-purple-500/[0.08] light:hover:text-slate-900"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition ${
                  active
                    ? "text-purple-200 light:text-[#6A1B9A]"
                    : "text-purple-400/70 group-hover:text-purple-300 light:text-slate-500 light:group-hover:text-[#6A1B9A]"
                }`}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.badge !== undefined ? (
                <span className="shrink-0 rounded-md border border-violet-400/35 bg-violet-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-violet-100 light:border-violet-300/50 light:bg-violet-100 light:text-violet-900">
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
      className={`glass-panel fixed inset-y-0 left-0 z-[60] flex w-[min(88vw,280px)] flex-col border-r border-purple-500/15 shadow-2xl backdrop-blur-xl transition-transform duration-300 light:border-r-slate-200/80 lg:relative lg:inset-auto lg:z-0 lg:h-auto lg:min-h-dvh lg:w-64 lg:max-w-none lg:translate-x-0 lg:rounded-none lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-purple-500/10 px-4 py-4 light:border-b-slate-200/80">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={close}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/35 via-purple-600/25 to-violet-500/25 text-sm font-bold tracking-tight text-purple-50 ring-1 ring-violet-400/30 light:from-[#6A1B9A]/90 light:via-[#4a148c]/80 light:to-[#800000]/70 light:text-white light:ring-purple-300/50">
            S
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/85 light:text-[#6A1B9A]">
              {brandMark.title}
            </span>
            <span className="block text-sm font-semibold text-purple-50 light:text-slate-900">{brandMark.subtitle}</span>
          </span>
        </Link>
        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-purple-200/80 transition hover:bg-white/10 lg:hidden light:border-slate-300/70 light:text-slate-700 light:hover:bg-slate-100"
          onClick={close}
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {nav}

      <div ref={profileWrapRef} className="relative border-t border-purple-500/10 px-3 py-3 light:border-t-slate-200/80">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setProfileOpen((v) => !v);
          }}
          className="flex w-full items-center gap-3 rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-left transition hover:border-violet-400/30 hover:bg-white/[0.04] light:border-slate-300/70 light:bg-white light:hover:bg-slate-50"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 to-purple-600/20 text-xs font-bold text-violet-100 ring-1 ring-violet-400/25 light:from-purple-100 light:to-violet-100 light:text-[#6A1B9A] light:ring-purple-200/80">
            {initials(user.displayName)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-purple-50 light:text-slate-900">{user.displayName}</span>
            <span className="block truncate text-[11px] text-purple-500/70 light:text-slate-500">{user.role}</span>
          </span>
          <ChevronUp className={`h-4 w-4 shrink-0 text-purple-400/70 transition light:text-slate-500 ${profileOpen ? "" : "rotate-180"}`} aria-hidden />
        </button>
        <AnimatePresence>
          {profileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-xl border border-purple-500/15 bg-purple-950/95 py-1 shadow-xl backdrop-blur-xl light:border-slate-200/90 light:bg-white"
              role="menu"
            >
              <p className="truncate px-3 py-2 text-[11px] text-purple-500/80 light:text-slate-500">{user.email}</p>
              <Link
                href="/dashboard/settings"
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 text-sm text-purple-200/90 transition hover:bg-white/[0.06] light:text-slate-800 light:hover:bg-slate-100"
                onClick={() => setProfileOpen(false)}
              >
                <Settings className="h-4 w-4 text-purple-400/80 light:text-[#6A1B9A]" aria-hidden />
                Pengaturan akun
              </Link>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-200/90 transition hover:bg-rose-500/10 light:text-rose-700 light:hover:bg-rose-50"
                onClick={() => void signOut()}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Keluar
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-auto border-t border-purple-500/10 px-4 py-3 light:border-t-slate-200/80">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-purple-200/80 transition hover:border-purple-400/25 hover:bg-purple-500/10 light:border-slate-300/70 light:bg-slate-50 light:text-slate-700 light:hover:border-purple-300/50 light:hover:bg-purple-50"
          onClick={close}
        >
          <UserRound className="h-3.5 w-3.5 opacity-70" aria-hidden />
          Hub aplikasi
        </Link>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-[calc(0.75rem+env(safe-area-inset-top))] z-[55] flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-950/80 text-purple-100 shadow-lg backdrop-blur-md transition hover:bg-purple-900/90 lg:hidden light:border-slate-300/80 light:bg-white light:text-slate-800 light:shadow-md light:hover:bg-slate-50"
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
            className="fixed inset-0 z-[50] bg-black/55 backdrop-blur-sm lg:hidden light:bg-slate-900/35"
            aria-label="Tutup menu"
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      {panel}
    </>
  );
}
