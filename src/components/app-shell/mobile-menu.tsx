"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const isDark =
    mounted && (resolvedTheme === "dark" || document.documentElement.classList.contains("dark"));

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
        <div
          className={cn(
            "absolute left-4 right-4 top-[4.5rem] rounded-3xl border p-4 shadow-2xl shadow-slate-900/10",
            isDark ? "border-white/10 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"
          )}
          style={{
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#ffffff" : "#0f172a"
          }}
        >
          <nav className="grid gap-2">
            {siteConfig.nav.map((item) => (
              <Link
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  isDark ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div
            className={cn(
              "mt-3 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold",
              isDark ? "bg-white/10 text-white" : "bg-slate-50 text-slate-800"
            )}
          >
            <span>Tema saat ini</span>
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold shadow-sm",
                isDark ? "bg-slate-950 text-emerald-300" : "bg-white text-emerald-700"
              )}
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
