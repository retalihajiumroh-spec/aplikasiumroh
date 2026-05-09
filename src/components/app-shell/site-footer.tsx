import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-bold text-slate-950 dark:text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">Navigasi</p>
          <div className="mt-4 grid gap-3 text-sm">
            {siteConfig.nav.map((item) => (
              <Link className="text-slate-600 hover:text-emerald-600 dark:text-slate-400" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">Kontak</p>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Jakarta, Indonesia
            <br />
            support@retaliumroh.id
          </p>
        </div>
      </div>
    </footer>
  );
}
