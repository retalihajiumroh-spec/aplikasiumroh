"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

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
  { href: "/dashboard/social-media", label: "Social Media Hub" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-8">
      <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white light:text-zinc-900">SA&apos;YA Umroh OS</h1>
        <ThemeToggle variant="pill" />
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <Link
          href="/login"
          className="font-medium text-zinc-300 underline-offset-2 transition hover:text-white hover:underline light:text-zinc-700 light:hover:text-zinc-950"
        >
          Login Jamaah (portal)
        </Link>
        <Link
          href="/login/mitra"
          className="font-medium text-zinc-300 underline-offset-2 transition hover:text-white hover:underline light:text-zinc-600 light:hover:text-zinc-900"
        >
          Login Mitra (portal)
        </Link>
        <Link
          href="/register/mitra"
          className="font-medium text-zinc-400 underline-offset-2 transition hover:text-zinc-200 hover:underline light:text-zinc-600 light:hover:text-zinc-900"
        >
          Registrasi Mitra
        </Link>
        <Link
          href="/login/cabang"
          className="font-medium text-zinc-300 underline-offset-2 transition hover:text-white hover:underline light:text-zinc-700 light:hover:text-zinc-950"
        >
          Login Cabang (portal)
        </Link>
        <Link
          href="/register/cabang"
          className="font-medium text-zinc-400 underline-offset-2 transition hover:text-zinc-200 hover:underline light:text-zinc-600 light:hover:text-zinc-900"
        >
          Registrasi Cabang
        </Link>
      </div>
      <nav className="flex max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-white/15 bg-gradient-to-br from-zinc-800/80 to-black/60 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-black/40 transition hover:border-white/25 hover:from-zinc-700/90 light:border-zinc-300 light:from-white light:to-zinc-100 light:text-zinc-900 light:shadow-md light:hover:border-zinc-400 light:hover:from-zinc-50"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
