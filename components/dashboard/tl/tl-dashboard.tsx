"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { departureRows, type DepartureRow } from "@/lib/departure/dummy-data";
import { muthowifRanking, tlRanking, type RankedLeader } from "@/lib/tl/dummy-data";
import { AssignTlModal } from "@/components/dashboard/departure/assign-tl-modal";

function rankAccent(rank: number) {
  if (rank === 1) return "from-violet-400/25 via-violet-500/10 to-purple-950/30 border-violet-400/30";
  if (rank === 2) return "from-slate-300/20 via-slate-400/8 to-purple-950/30 border-slate-400/25";
  if (rank === 3) return "from-orange-400/18 via-orange-600/8 to-purple-950/30 border-orange-400/25";
  return "from-purple-500/8 to-purple-950/25 border-purple-500/12";
}

function RankCard({ person, delay }: { person: RankedLeader; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 ${rankAccent(person.rank)}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-mono text-lg font-bold ${
            person.rank <= 3 ? "border-white/15 bg-white/10 text-purple-50" : "border-purple-500/20 bg-purple-950/40 text-purple-200/90"
          }`}
          aria-hidden
        >
          #{person.rank}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug text-purple-50">{person.name}</h3>
          <p className="mt-1 text-xs text-purple-200/50">{person.branch}</p>
          <p className="mt-2 text-xs leading-relaxed text-purple-200/65">{person.highlight}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-xl font-semibold tabular-nums text-purple-100">{person.score}</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-purple-400/55">Skor</p>
        </div>
      </div>
    </motion.article>
  );
}

export function TlDashboard() {
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
            "radial-gradient(circle at 18% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 88% 45%, rgba(230, 230, 250, 0.06), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-purple-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-purple-50 sm:text-4xl">TL &amp; Muthowif</h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-200/55 sm:text-base">
              Peringkat kinerja tour leader dan muthowif, serta penugasan TL ke jadwal keberangkatan (demo lokal).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-purple-200/80 transition hover:border-purple-400/25 hover:bg-purple-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section>
            <div className="mb-4 flex items-end justify-between gap-2 border-b border-purple-500/10 pb-3">
              <div>
                <h2 className="text-lg font-semibold text-purple-50">Ranking Tour Leader</h2>
                <p className="mt-0.5 text-xs text-purple-200/50">Periode rolling 90 hari · skor komposit internal.</p>
              </div>
              <span className="rounded-lg border border-purple-500/15 bg-purple-950/40 px-2 py-1 font-mono text-[10px] text-purple-300/80">Top 5</span>
            </div>
            <div className="space-y-3">
              {tlRanking.map((p, i) => (
                <RankCard key={p.id} person={p} delay={0.04 * i} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-2 border-b border-purple-500/10 pb-3">
              <div>
                <h2 className="text-lg font-semibold text-purple-50">Ranking Muthowif</h2>
                <p className="mt-0.5 text-xs text-purple-200/50">Materi manasik, kehadiran, &amp; umpan balik jamaah.</p>
              </div>
              <span className="rounded-lg border border-purple-500/15 bg-purple-950/40 px-2 py-1 font-mono text-[10px] text-purple-300/80">Top 5</span>
            </div>
            <div className="space-y-3">
              {muthowifRanking.map((p, i) => (
                <RankCard key={p.id} person={p} delay={0.04 * i} />
              ))}
            </div>
          </section>
        </div>

        <section className="mt-12">
          <div className="mb-4 border-b border-purple-500/10 pb-3">
            <h2 className="text-lg font-semibold text-purple-50">Penugasan Team Leader</h2>
            <p className="mt-1 text-sm text-purple-200/50">
              Pilih keberangkatan lalu tetapkan TL dari daftar kandidat — tersinkron lokal dengan halaman Departure (data demo).
            </p>
          </div>

          <ul className="space-y-4">
            {rows.map((row, i) => (
              <motion.li
                key={row.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                className="glass-panel flex flex-col gap-4 rounded-2xl border border-purple-500/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold text-purple-300/75">{row.code}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-purple-50">{row.packageName}</h3>
                  <p className="mt-1 text-sm text-purple-200/50">{row.departureLabel}</p>
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-2 sm:min-w-[200px] sm:items-end">
                  {row.tlName ? (
                    <div className="rounded-xl border border-purple-400/25 bg-purple-500/10 px-3 py-2 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-purple-400/70">TL aktif</p>
                      <p className="text-sm font-medium text-purple-50">{row.tlName}</p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-violet-400/25 bg-violet-500/10 px-3 py-2 text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-violet-300/80">TL</p>
                      <p className="text-sm text-violet-100/90">Belum ditugaskan</p>
                    </div>
                  )}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setModalDepartureId(row.id)}
                    className="rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-500/20 to-violet-900/15 px-4 py-2.5 text-sm font-semibold text-purple-50 shadow-md shadow-purple-950/30"
                  >
                    Assign Team Leader
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </section>
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
