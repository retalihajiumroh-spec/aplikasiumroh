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
          <span className="font-medium uppercase tracking-wider text-zinc-400/60">Progres visa</span>
          <span className="font-mono text-zinc-300/80">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-950/70 ring-1 ring-zinc-600/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {showApprovalOk ? (
        <div className="flex items-center gap-2 rounded-xl border border-zinc-500/25 bg-zinc-600/10 px-3 py-2 text-xs text-zinc-200">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600/30 text-zinc-300" aria-hidden>
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
                      ? "border-zinc-500/60 bg-zinc-600/25 text-zinc-200"
                      : current
                        ? embassyRejected
                          ? "border-rose-400/60 bg-rose-500/20 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
                          : "border-zinc-400/70 bg-zinc-600/20 text-zinc-50 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                        : "border-zinc-800/60 bg-zinc-950/60 text-zinc-600/50"
                  }`}
                  animate={current && !embassyRejected ? { scale: [1, 1.05, 1] } : undefined}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {done ? "✓" : current ? (embassyRejected ? "✕" : "●") : i + 1}
                </motion.span>
                <span className={`mt-2 max-w-[88px] text-[10px] font-medium leading-tight sm:text-[11px] ${done || current ? "text-zinc-200/90" : "text-zinc-600/45"}`}>
                  {step.short}
                </span>
                <span className="mt-0.5 hidden text-[9px] text-zinc-600/45 sm:block">{step.label}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
