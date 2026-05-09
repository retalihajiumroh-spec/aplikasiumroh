"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/button";

export function MobileMenu() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-emerald-300"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {isOpen ? (
        <div className="absolute left-4 right-4 top-[4.5rem] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900">
          <nav className="grid gap-2">
            {siteConfig.nav.map((item) => (
              <Link
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
            <span>Tema saat ini</span>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-sm dark:bg-slate-950 dark:text-emerald-300"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              type="button"
            >
              {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              {isDark ? "Gelap" : "Terang"}
            </button>
          </div>
          <LinkButton className="mt-3 w-full" href="/login">
            Login Jamaah
          </LinkButton>
        </div>
      ) : null}
    </div>
  );
}
