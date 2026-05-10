"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { dokumenRows, passportLabel, type PassportStatus } from "@/lib/dokumen/dummy-data";
import { VisaProgressTracker } from "./visa-progress-tracker";

function passportBadgeClass(s: PassportStatus) {
  if (s === "verified") return "border-emerald-400/35 bg-emerald-500/12 text-emerald-100";
  if (s === "uploaded") return "border-sky-400/35 bg-sky-500/12 text-sky-100";
  if (s === "renewal_needed") return "border-amber-400/35 bg-amber-500/12 text-amber-100";
  return "border-rose-400/30 bg-rose-500/10 text-rose-100";
}

export function DokumenDashboard() {
  const [selectedId, setSelectedId] = useState(dokumenRows[0]?.id ?? "");
  const selected = dokumenRows.find((r) => r.id === selectedId) ?? dokumenRows[0];

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(52, 211, 153, 0.12), transparent 40%), radial-gradient(circle at 90% 60%, rgba(20, 184, 166, 0.1), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Dokumen &amp; Visa</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Status paspor &amp; visa per jamaah, progres pengajuan, dan indikator persetujuan kedutaan (demo).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="border-b border-emerald-500/10 px-4 py-3 sm:px-5">
                <p className="text-sm font-medium text-emerald-100">Daftar jamaah</p>
                <p className="text-xs text-emerald-500/50">{dokumenRows.length} entri</p>
              </div>
              <ul className="max-h-[min(68vh,640px)] divide-y divide-emerald-500/10 overflow-y-auto [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
                {dokumenRows.map((row, i) => {
                  const active = row.id === selected?.id;
                  return (
                    <motion.li key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(row.id)}
                        className={`flex w-full flex-col gap-2 px-4 py-3 text-left transition sm:px-5 ${
                          active ? "bg-emerald-500/10 ring-1 ring-inset ring-emerald-400/25" : "hover:bg-emerald-950/40"
                        }`}
                      >
                        <p className="font-medium text-emerald-50">{row.name}</p>
                        <p className="font-mono text-xs text-emerald-400/55">{row.bookingRef}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${passportBadgeClass(row.passport)}`}>
                            Paspor: {passportLabel(row.passport)}
                          </span>
                          <span className="rounded-md border border-teal-400/25 bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-100">
                            Visa: langkah {row.visaStepIndex + 1}/5
                          </span>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 lg:sticky lg:top-24"
              >
                <section className="glass-panel rounded-2xl p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Status dokumen</p>
                  <h2 className="mt-1 text-lg font-semibold text-emerald-50">{selected.name}</h2>
                  <p className="text-xs text-emerald-500/55">{selected.packageName}</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500/50">Paspor</p>
                      <p className={`mt-2 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${passportBadgeClass(selected.passport)}`}>
                        {passportLabel(selected.passport)}
                      </p>
                      {selected.passportNote ? (
                        <p className="mt-2 text-xs text-emerald-200/55">{selected.passportNote}</p>
                      ) : null}
                    </div>
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-500/50">Visa</p>
                      <p className="mt-2 text-sm text-emerald-100/90">Progres pengajuan e-visa</p>
                      <p className="mt-1 text-xs text-emerald-500/50">Pembaruan: {selected.lastUpdate}</p>
                    </div>
                  </div>
                </section>

                <section className="glass-panel rounded-2xl p-5 sm:p-6">
                  <VisaProgressTracker row={selected} />
                </section>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
