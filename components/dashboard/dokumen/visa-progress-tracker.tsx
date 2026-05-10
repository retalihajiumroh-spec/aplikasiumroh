"use client";

import { motion } from "framer-motion";
import { visaProgressPct, visaSteps, type DokumenRow } from "@/lib/dokumen/dummy-data";

export function VisaProgressTracker({ row }: { row: DokumenRow }) {
  const pct = visaProgressPct(row.visaStepIndex);
  const embassyIdx = visaSteps.findIndex((s) => s.id === "embassy");
  const showApprovalOk = row.embassyApproved === true && row.visaStepIndex > embassyIdx;
  const showRejection = row.embassyApproved === false && row.visaStepIndex >= embassyIdx;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-medium uppercase tracking-wider text-emerald-300/60">Progres visa</span>
          <span className="font-mono text-emerald-200/80">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-950/70 ring-1 ring-emerald-500/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {showApprovalOk ? (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-200" aria-hidden>
            ✓
          </span>
          <span>
            <span className="font-semibold">Persetujuan kedutaan</span> — visa disetujui, lanjut penerbitan e-visa.
          </span>
        </div>
      ) : null}

      {showRejection ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-100">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/25" aria-hidden>
            !
          </span>
          <span>
            <span className="font-semibold">Perlu tindakan</span> — hasil review kedutaan belum memenuhi syarat (dummy).
          </span>
        </div>
      ) : null}

      <ol className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
        {visaSteps.map((step, i) => {
          const done = i < row.visaStepIndex;
          const current = i === row.visaStepIndex;
          const isEmbassy = step.id === "embassy";
          const embassyRejected = isEmbassy && row.embassyApproved === false && row.visaStepIndex === embassyIdx;

          return (
            <li key={step.id} className="flex flex-1 flex-col items-center text-center sm:min-w-0">
              <div className="flex flex-col items-center">
                <motion.span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    done
                      ? "border-emerald-400/60 bg-emerald-500/25 text-emerald-100"
                      : current
                        ? embassyRejected
                          ? "border-rose-400/60 bg-rose-500/20 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
                          : "border-emerald-300/70 bg-emerald-500/20 text-emerald-50 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                        : "border-emerald-800/60 bg-emerald-950/60 text-emerald-600/50"
                  }`}
                  animate={current && !embassyRejected ? { scale: [1, 1.05, 1] } : undefined}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {done ? "✓" : current ? (embassyRejected ? "✕" : "●") : i + 1}
                </motion.span>
                <span className={`mt-2 max-w-[88px] text-[10px] font-medium leading-tight sm:text-[11px] ${done || current ? "text-emerald-100/90" : "text-emerald-600/45"}`}>
                  {step.short}
                </span>
                <span className="mt-0.5 hidden text-[9px] text-emerald-500/45 sm:block">{step.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
