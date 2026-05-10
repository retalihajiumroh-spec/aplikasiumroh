import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/jamaah", label: "Jamaah" },
  { href: "/dashboard/paket", label: "Paket Umroh" },
  { href: "/dashboard/booking", label: "Booking & Payment" },
  { href: "/dashboard/owner", label: "Owner Dashboard" },
  { href: "/dashboard/crm", label: "CRM Pipeline" },
  { href: "/dashboard/ai-sales", label: "AI Sales Bot" },
  { href: "/dashboard/content-engine", label: "AI Content Engine" },
  { href: "/dashboard/ai-ads", label: "AI Ads Lab" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-emerald-100">
        SA&apos;YA Umroh OS
      </h1>
      <nav className="flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-center text-sm font-medium text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/20"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
