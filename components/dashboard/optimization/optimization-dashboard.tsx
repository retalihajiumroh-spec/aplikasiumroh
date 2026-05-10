"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { optimizationRows, optimizationSummary, type AdOptStatus, type OptimizationAdRow } from "@/lib/optimization/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

function fmtPct(n: number) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

function fmtRoas(n: number) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + "×";
}

export function OptimizationDashboard() {
  const [statusById, setStatusById] = useState<Record<string, AdOptStatus>>(() =>
    Object.fromEntries(optimizationRows.map((r) => [r.id, "active" as const])),
  );

  const setStatus = useCallback((id: string, s: AdOptStatus) => {
    setStatusById((prev) => ({ ...prev, [id]: s }));
  }, []);

  const handleScale = useCallback(
    (id: string) => {
      setStatus(id, "scaling");
      window.setTimeout(() => setStatus(id, "active"), 1400);
    },
    [setStatus],
  );

  const activeCount = useMemo(
    () => Object.values(statusById).filter((s) => s === "active" || s === "scaling").length,
    [statusById],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 90% 50%, rgba(56, 189, 248, 0.08), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Optimization</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Pantau performa iklan dengan CTR, CPL, dan ROAS — kontrol cepat lewat Scale atau Pause (demo lokal).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { label: "CTR", value: fmtPct(optimizationSummary.ctrPct), hint: "Rata-rata tertimbang" },
            { label: "CPL", value: formatIdr(optimizationSummary.cplIdr), hint: "Cost per lead" },
            { label: "ROAS", value: fmtRoas(optimizationSummary.roas), hint: "Return on ad spend" },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 sm:p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">{k.label}</p>
              <p className="mt-2 font-mono text-xl font-semibold text-emerald-50 sm:text-2xl">{k.value}</p>
              <p className="mt-1 text-[11px] text-emerald-500/50">{k.hint}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-10 glass-panel rounded-2xl p-5 sm:p-7"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-emerald-50">Ads performance</h2>
              <p className="mt-1 text-sm text-emerald-200/55">
                Breakdown per kreatif — metrik utama dan aksi optimasi.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-emerald-300/70">
              {activeCount}/{optimizationRows.length} aktif
            </span>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-emerald-500/10 bg-emerald-950/25 p-4 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Spend</p>
              <p className="font-mono text-sm font-semibold text-emerald-100">{formatIdr(optimizationSummary.spendIdr)}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Impresi</p>
              <p className="font-mono text-sm font-semibold text-emerald-100">
                {optimizationSummary.impressions.toLocaleString("id-ID")}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Konversi</p>
              <p className="font-mono text-sm font-semibold text-emerald-100">{optimizationSummary.conversions}</p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-emerald-500/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-500/10 bg-emerald-950/40 text-[11px] font-semibold uppercase tracking-wide text-emerald-400/70">
                  <th className="px-4 py-3">Kampanye</th>
                  <th className="px-4 py-3">Kreatif</th>
                  <th className="px-4 py-3">CTR</th>
                  <th className="px-4 py-3">CPL</th>
                  <th className="px-4 py-3">ROAS</th>
                  <th className="px-4 py-3 text-right">Spend</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {optimizationRows.map((row: OptimizationAdRow, i) => {
                  const st = statusById[row.id] ?? "active";
                  const paused = st === "paused";
                  const scaling = st === "scaling";
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.03 * i }}
                      className="border-b border-emerald-500/5 last:border-0 odd:bg-emerald-950/15"
                    >
                      <td className="px-4 py-3 font-medium text-emerald-200/90">{row.campaign}</td>
                      <td className="max-w-[220px] px-4 py-3 text-emerald-100/85">
                        <span className="line-clamp-2">{row.creative}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-emerald-200/90">{fmtPct(row.ctrPct)}</td>
                      <td className="px-4 py-3 font-mono text-emerald-200/90">{formatIdr(row.cplIdr)}</td>
                      <td className="px-4 py-3 font-mono text-emerald-200/90">{fmtRoas(row.roas)}</td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-300/80">{formatIdr(row.spendIdr)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            disabled={scaling || paused}
                            onClick={() => handleScale(row.id)}
                            className="rounded-lg border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-100 transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {scaling ? "Scaling…" : "Scale"}
                          </motion.button>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            disabled={scaling}
                            onClick={() => setStatus(row.id, paused ? "active" : "paused")}
                            className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition disabled:opacity-40 ${
                              paused
                                ? "border-sky-400/35 bg-sky-500/15 text-sky-100 hover:bg-sky-500/25"
                                : "border-amber-400/35 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20"
                            }`}
                          >
                            {paused ? "Aktifkan" : "Pause"}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
