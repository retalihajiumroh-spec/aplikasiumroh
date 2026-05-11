"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  commissionAggregate,
  kindLabel,
  partners,
  rankedPartners,
  tierLabel,
  type PartnerKind,
  type PartnerRow,
  type PartnerTier,
} from "@/lib/reseller/dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

function kindBadge(k: PartnerKind) {
  return k === "reseller"
    ? "border-violet-400/30 bg-violet-500/12 text-violet-100"
    : "border-violet-400/30 bg-violet-700/12 text-teal-100";
}

function tierBadge(t: PartnerTier) {
  if (t === "gold") return "border-violet-400/35 bg-violet-500/15 text-violet-100";
  if (t === "silver") return "border-slate-400/30 bg-slate-500/15 text-slate-100";
  return "border-orange-400/25 bg-orange-900/20 text-orange-100";
}

function RankBadge({ rank }: { rank: number }) {
  const top = rank <= 3;
  return (
    <span
      className={
        top
          ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400/30 to-teal-700/25 font-mono text-sm font-bold text-purple-50 ring-1 ring-purple-400/30"
          : "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-600/30 bg-purple-950/50 font-mono text-sm font-semibold text-purple-300/80"
      }
    >
      {rank}
    </span>
  );
}

export function ResellerDashboard() {
  const agg = useMemo(() => commissionAggregate(), []);
  const ranked = useMemo(() => rankedPartners(), []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(230, 230, 250, 0.12), transparent 40%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08), transparent 42%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-purple-50 sm:text-4xl">
              Reseller / Mitra
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-200/55 sm:text-base">
              Direktori mitra &amp; reseller, agregat komisi, dan peringkat performa berdasarkan komisi YTD (demo).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-purple-200/80 transition hover:border-purple-400/25 hover:bg-purple-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total komisi YTD",
              value: formatIdrCompact(agg.totalCommission),
              hint: "Akumulasi semua mitra & reseller",
            },
            {
              label: "Rata-rata / mitra",
              value: formatIdrCompact(agg.avgPerPartner),
              hint: `${ranked.length} entri aktif`,
            },
            {
              label: "Jamaah bersama mitra",
              value: agg.totalJamaah.toLocaleString("id-ID"),
              hint: `Top: ${agg.top.name}`,
            },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-purple-200/45">{c.label}</p>
              <p className="mt-2 font-mono text-xl font-semibold text-purple-50 sm:text-2xl">{c.value}</p>
              <p className="mt-1 text-[11px] text-purple-500/50">{c.hint}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 glass-panel rounded-2xl p-5 sm:p-7"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-purple-50">Peringkat performa</h2>
              <p className="mt-1 text-sm text-purple-200/55">
                Urutan berdasarkan komisi YTD — nomor 1 memimpin leaderboard.
              </p>
            </div>
            <span className="mt-2 inline-flex w-fit rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200/90 sm:mt-0">
              Top performer: {agg.top.name}
            </span>
          </div>

          <ul className="mt-6 space-y-2">
            {ranked.map((row: PartnerRow, i) => {
              const rank = i + 1;
              return (
                <motion.li
                  key={row.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.03 }}
                  className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                    rank === 1 ? "border-violet-400/25 bg-violet-500/5" : "border-purple-500/10 bg-purple-950/20"
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <RankBadge rank={rank} />
                    <div className="min-w-0">
                      <p className="font-medium text-purple-50">{row.name}</p>
                      <p className="text-xs text-purple-400/55">{row.city}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${kindBadge(row.kind)}`}>
                          {kindLabel(row.kind)}
                        </span>
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${tierBadge(row.tier)}`}>
                          {tierLabel(row.tier)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-end justify-between gap-4 sm:flex-col sm:items-end sm:text-right">
                    <div>
                      <p className="text-[10px] font-semibold uppercase text-purple-500/50">Komisi YTD</p>
                      <p className="font-mono text-lg font-semibold text-purple-200">{formatIdrCompact(row.commissionYtdIdr)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase text-purple-500/50">Jamaah closed</p>
                      <p className="font-mono text-sm font-medium text-purple-100/90">{row.jamaahClosed}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-8 glass-panel rounded-2xl p-5 sm:p-7"
        >
          <h2 className="text-lg font-semibold text-purple-50">Direktori mitra &amp; reseller</h2>
          <p className="mt-1 text-sm text-purple-200/55">Semua entri terdaftar — urutan direktori (bukan peringkat).</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-purple-500/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-purple-500/10 bg-purple-950/40 text-[10px] font-semibold uppercase tracking-wide text-purple-400/70">
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Kota</th>
                  <th className="px-4 py-3 text-right">Jamaah</th>
                  <th className="px-4 py-3 text-right">Komisi YTD</th>
                  <th className="px-4 py-3">Tier</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((row) => (
                  <tr key={row.id} className="border-b border-purple-500/5 last:border-0 odd:bg-purple-950/15">
                    <td className="px-4 py-3 font-medium text-purple-50">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${kindBadge(row.kind)}`}>
                        {kindLabel(row.kind)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-purple-200/60">{row.city}</td>
                    <td className="px-4 py-3 text-right font-mono text-purple-200/90">{row.jamaahClosed}</td>
                    <td className="px-4 py-3 text-right font-mono text-purple-200/90">{formatIdrCompact(row.commissionYtdIdr)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${tierBadge(row.tier)}`}>
                        {tierLabel(row.tier)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
