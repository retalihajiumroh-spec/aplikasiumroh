"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreatePaketModal } from "./create-paket-modal";
import {
  seatPct,
  seatsRemaining,
  umrohPackages,
  type PaketStatus,
  type UmrohPackage,
} from "@/lib/paket/dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

function statusMeta(s: PaketStatus) {
  if (s === "open") return { label: "Terbuka", className: "border-emerald-400/35 bg-emerald-500/12 text-emerald-100" };
  if (s === "almost_full")
    return { label: "Hampir penuh", className: "border-amber-400/35 bg-amber-500/12 text-amber-100" };
  return { label: "Penuh", className: "border-rose-400/35 bg-rose-500/12 text-rose-100" };
}

function SeatBar({ pkg }: { pkg: UmrohPackage }) {
  const pct = seatPct(pkg.seatsBooked, pkg.seatsTotal);
  const left = seatsRemaining(pkg.seatsBooked, pkg.seatsTotal);
  const full = left === 0;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-emerald-200/70">Keterisian seat</span>
        <span className="font-mono text-emerald-100/90">
          {pkg.seatsBooked} / {pkg.seatsTotal}
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-emerald-950/70 ring-1 ring-emerald-500/10">
        <motion.div
          className={`h-full rounded-full ${
            full
              ? "bg-gradient-to-r from-rose-500/90 to-amber-500/70"
              : pct >= 85
                ? "bg-gradient-to-r from-amber-500/90 to-amber-400/70"
                : "bg-gradient-to-r from-emerald-500 to-teal-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-2 text-[11px] text-emerald-400/65">
        {full ? "Kuota habis · tunggu batch berikutnya" : `${left} seat tersedia · ${pct.toLocaleString("id-ID")}% terisi`}
      </p>
    </div>
  );
}

export function PaketDashboard() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(52, 211, 153, 0.12), transparent 40%), radial-gradient(circle at 85% 10%, rgba(20, 184, 166, 0.1), transparent 38%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Paket Umroh</h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-200/55 sm:text-base">
              Katalog paket, harga mulai, jadwal keberangkatan, dan ketersediaan seat — kelola batch dengan satu layar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-600/20 px-4 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
              Buat paket
            </motion.button>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
            >
              ← Hub
            </Link>
          </div>
        </motion.header>

        <ul className="mt-10 space-y-5">
          {umrohPackages.map((pkg, i) => {
            const st = statusMeta(pkg.status);
            return (
              <motion.li
                key={pkg.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel rounded-2xl p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400/60">{pkg.id}</span>
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${st.className}`}>
                        {st.label}
                      </span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-emerald-50">{pkg.name}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-200/55">{pkg.subtitle}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-emerald-500/50">Berangkat</dt>
                        <dd className="font-medium text-emerald-100">{pkg.departureLabel}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-emerald-500/50">Durasi</dt>
                        <dd className="font-medium text-emerald-100">{pkg.durationNights} malam</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wider text-emerald-500/50">Mulai dari</dt>
                        <dd className="font-mono font-semibold text-emerald-200">{formatIdrCompact(pkg.priceFromIdr)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <SeatBar pkg={pkg} />
              </motion.li>
            );
          })}
        </ul>
      </div>

      <CreatePaketModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
