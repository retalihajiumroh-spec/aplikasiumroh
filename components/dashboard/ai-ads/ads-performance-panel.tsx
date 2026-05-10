"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { AdPerformanceRow, AdRuntimeStatus } from "@/lib/ai-ads/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

function fmtPct(n: number) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
}

function fmtMult(n: number) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "×";
}

export function AdsPerformancePanel({
  summary,
  rows,
}: {
  summary: { ctrPct: number; cplIdr: number; roiPct: number; spendIdr: number; impressions: number; leads: number };
  rows: AdPerformanceRow[];
}) {
  const [statusById, setStatusById] = useState<Record<string, AdRuntimeStatus>>(() =>
    Object.fromEntries(rows.map((r) => [r.id, "active" as const])),
  );

  const setStatus = useCallback((id: string, s: AdRuntimeStatus) => {
    setStatusById((prev) => ({ ...prev, [id]: s }));
  }, []);

  const handleScale = useCallback(
    (id: string) => {
      setStatus(id, "scaling");
      window.setTimeout(() => setStatus(id, "active"), 1400);
    },
    [setStatus],
  );

  const activeCount = useMemo(() => Object.values(statusById).filter((s) => s === "active" || s === "scaling").length, [statusById]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-emerald-50">Performance dashboard</h2>
          <p className="mt-1 text-sm text-emerald-200/55">
            Estimasi agregat kampanye demo: CTR, CPL, ROI — kontrol skala / jeda per kreatif (status lokal).
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-emerald-300/70 sm:mt-0">
          {activeCount}/{rows.length} kreatif aktif
        </span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: "CTR", value: fmtPct(summary.ctrPct), hint: "Klik / tayang" },
          { label: "CPL", value: formatIdr(summary.cplIdr), hint: "Cost per lead" },
          { label: "ROI", value: fmtMult(summary.roiPct), hint: "Return on spend" },
        ].map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.04 }}
            className="glass-card rounded-xl p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">{k.label}</p>
            <p className="mt-2 font-mono text-xl font-semibold text-emerald-50">{k.value}</p>
            <p className="mt-1 text-[11px] text-emerald-500/50">{k.hint}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 rounded-xl border border-emerald-500/10 bg-emerald-950/25 p-4 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Spend</p>
          <p className="font-mono text-sm font-semibold text-emerald-100">{formatIdr(summary.spendIdr)}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Impresi</p>
          <p className="font-mono text-sm font-semibold text-emerald-100">{summary.impressions.toLocaleString("id-ID")}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/50">Lead</p>
          <p className="font-mono text-sm font-semibold text-emerald-100">{summary.leads}</p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-emerald-500/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-emerald-500/10 bg-emerald-950/40 text-[11px] font-semibold uppercase tracking-wide text-emerald-400/70">
              <th className="px-4 py-3">Adset</th>
              <th className="px-4 py-3">Kreatif</th>
              <th className="px-4 py-3">CTR</th>
              <th className="px-4 py-3">CPL</th>
              <th className="px-4 py-3">ROI</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const st = statusById[row.id] ?? "active";
              const paused = st === "paused";
              const scaling = st === "scaling";
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                  className="border-b border-emerald-500/5 last:border-0 odd:bg-emerald-950/15"
                >
                  <td className="px-4 py-3 font-medium text-emerald-200/90">{row.adSetLabel}</td>
                  <td className="max-w-[200px] px-4 py-3 text-emerald-100/85">
                    <span className="line-clamp-2">{row.adName}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-200/90">{fmtPct(row.ctrPct)}</td>
                  <td className="px-4 py-3 font-mono text-emerald-200/90">{formatIdr(row.cplIdr)}</td>
                  <td className="px-4 py-3 font-mono text-emerald-200/90">{fmtMult(row.roiPct)}</td>
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
  );
}
