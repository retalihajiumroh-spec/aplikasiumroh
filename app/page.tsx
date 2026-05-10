import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/reports", label: "Reports" },
  { href: "/dashboard/tasks", label: "Tasks & Reminder" },
  { href: "/dashboard/approval", label: "Approval Center" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/jamaah", label: "Jamaah" },
  { href: "/dashboard/jamaah/input", label: "Input Jamaah" },
  { href: "/dashboard/jamaah-experience", label: "Jamaah Experience" },
  { href: "/dashboard/paket", label: "Paket Umroh" },
  { href: "/dashboard/booking", label: "Booking & Payment" },
  { href: "/dashboard/pembayaran", label: "Pembayaran" },
  { href: "/dashboard/dokumen", label: "Dokumen & Visa" },
  { href: "/dashboard/inventory", label: "Inventory" },
  { href: "/dashboard/departure", label: "Departure" },
  { href: "/dashboard/tl", label: "TL & Muthowif" },
  { href: "/dashboard/owner", label: "Owner Dashboard" },
  { href: "/dashboard/crm", label: "CRM & Leads" },
  { href: "/dashboard/reseller", label: "Reseller / Mitra" },
  { href: "/dashboard/ai-sales", label: "AI Sales Bot" },
  { href: "/dashboard/content", label: "Content System" },
  { href: "/dashboard/community", label: "Community Engine" },
  { href: "/dashboard/content-engine", label: "AI Content Engine" },
  { href: "/dashboard/ai-ads", label: "AI Ads Lab" },
  { href: "/dashboard/optimization", label: "Optimization" },
  { href: "/dashboard/campaign", label: "Campaign & Broadcast" },
  { href: "/dashboard/survey", label: "Survey & Feedback" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        SA&apos;YA Umroh OS
      </h1>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <Link
          href="/login"
          className="font-medium text-purple-300/90 underline-offset-2 transition hover:text-purple-200 hover:underline"
        >
          Login Jamaah (portal)
        </Link>
        <Link
          href="/login/mitra"
          className="font-medium text-sky-300/95 underline-offset-2 transition hover:text-sky-200 hover:underline"
        >
          Login Mitra (portal)
        </Link>
        <Link
          href="/register/mitra"
          className="font-medium text-sky-300/85 underline-offset-2 transition hover:text-sky-200 hover:underline"
        >
          Registrasi Mitra
        </Link>
        <Link
          href="/login/cabang"
          className="font-medium text-violet-200/95 underline-offset-2 transition hover:text-violet-100 hover:underline"
        >
          Login Cabang (portal)
        </Link>
        <Link
          href="/register/cabang"
          className="font-medium text-violet-200/90 underline-offset-2 transition hover:text-violet-100 hover:underline"
        >
          Registrasi Cabang
        </Link>
      </div>
      <nav className="flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-[#6A1B9A]/40 bg-gradient-to-br from-[#6A1B9A]/25 to-[#2C3E50]/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-[#E6E6FA]/35 hover:from-[#6A1B9A]/35"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
