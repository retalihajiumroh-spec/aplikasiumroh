import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 font-black text-slate-950">
            R
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-950 dark:text-white">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LinkButton className="hidden px-4 py-2.5 sm:inline-flex" href="/login">
            Login
          </LinkButton>
          <button
            aria-label="Buka menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
            type="button"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
