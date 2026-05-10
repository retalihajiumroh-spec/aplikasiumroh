"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { departureRows, seatFillPct, type DepartureRow } from "@/lib/departure/dummy-data";
import { AssignTlModal } from "./assign-tl-modal";

export function DepartureDashboard() {
  const [tlById, setTlById] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(departureRows.map((d) => [d.id, d.tlName])),
  );
  const [modalDepartureId, setModalDepartureId] = useState<string | null>(null);

  const rows: DepartureRow[] = useMemo(
    () => departureRows.map((d) => ({ ...d, tlName: tlById[d.id] ?? d.tlName })),
    [tlById],
  );

  const modalRow = modalDepartureId ? rows.find((r) => r.id === modalDepartureId) : null;

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 85% 40%, rgba(45, 212, 191, 0.1), transparent 40%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Departure</h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-200/55 sm:text-base">
              Jadwal keberangkatan grup, keterisian seat, dan penugasan tour leader (TL).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <ul className="mt-10 space-y-5">
          {rows.map((row, i) => {
            const pct = seatFillPct(row.seatsBooked, row.seatsTotal);
            const left = Math.max(0, row.seatsTotal - row.seatsBooked);
            const full = left === 0;

            return (
              <motion.li
                key={row.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel rounded-2xl p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-emerald-300/80">{row.code}</span>
                    </div>
                    <h2 className="mt-1 text-lg font-semibold text-emerald-50">{row.packageName}</h2>
                    <p className="mt-1 text-sm text-emerald-200/55">{row.route}</p>
                    <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                      <div>
                        <dt className="text-emerald-500/50">Berangkat</dt>
                        <dd className="font-medium text-emerald-100">{row.departureLabel}</dd>
                      </div>
                      <div>
                        <dt className="text-emerald-500/50">Kembali (est.)</dt>
                        <dd className="font-medium text-emerald-100">{row.returnLabel}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                    {row.tlName ? (
                      <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-400/70">TL</p>
                        <p className="text-sm font-medium text-emerald-50">{row.tlName}</p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-amber-400/25 bg-amber-500/10 px-3 py-2 text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300/80">TL</p>
                        <p className="text-sm text-amber-100/90">Belum ditugaskan</p>
                      </div>
                    )}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModalDepartureId(row.id)}
                      className="rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/20 to-teal-600/15 px-4 py-2.5 text-sm font-semibold text-emerald-50 shadow-md shadow-emerald-950/30"
                    >
                      Assign TL
                    </motion.button>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-medium uppercase tracking-wider text-emerald-300/60">Seat</span>
                    <span className="font-mono text-emerald-100/90">
                      {row.seatsBooked} / {row.seatsTotal}
                      {!full ? <span className="text-emerald-500/50"> · {left} kosong</span> : <span className="text-emerald-500/50"> · penuh</span>}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-emerald-950/70 ring-1 ring-emerald-500/10">
                    <motion.div
                      className={`h-full rounded-full ${
                        full
                          ? "bg-gradient-to-r from-rose-500/90 to-amber-500/70"
                          : pct >= 88
                            ? "bg-gradient-to-r from-amber-500 to-emerald-400"
                            : "bg-gradient-to-r from-emerald-500 to-teal-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="mt-1.5 text-right text-[11px] text-emerald-500/50">{pct.toLocaleString("id-ID")}% terisi</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <AssignTlModal
        open={!!modalRow}
        departureCode={modalRow?.code ?? ""}
        packageName={modalRow?.packageName ?? ""}
        currentTl={modalRow?.tlName ?? null}
        onClose={() => setModalDepartureId(null)}
        onAssign={(name) => {
          if (modalDepartureId) setTlById((prev) => ({ ...prev, [modalDepartureId]: name }));
        }}
      />
    </div>
  );
}
