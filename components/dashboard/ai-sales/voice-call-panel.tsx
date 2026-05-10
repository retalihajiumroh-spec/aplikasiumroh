"use client";

import { motion } from "framer-motion";
import type { VoiceCallLogEntry, VoiceScheduledCall } from "@/lib/ai-sales/dummy-data";

const bars = [10, 18, 14, 22, 16, 26, 12, 20, 15, 24];

export function VoiceCallPanel({
  log,
  scheduled,
  scriptPreview,
}: {
  log: VoiceCallLogEntry[];
  scheduled: VoiceScheduledCall[];
  scriptPreview: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      className="glass-panel relative overflow-hidden rounded-2xl p-5 sm:p-7"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" aria-hidden />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/70">Voice simulation</p>
          <h2 className="mt-1 text-lg font-semibold text-emerald-50">Panggilan & skrip</h2>
          <p className="mt-1 text-sm text-emerald-200/55">
            Log panggilan simulasi, jadwal call berikutnya, dan pratinjau skrip untuk tim sales.
          </p>
        </div>
        <div className="flex items-end justify-center gap-1 rounded-xl border border-emerald-500/10 bg-black/25 px-4 py-3 lg:w-48">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-emerald-700/50 to-emerald-300/80"
              animate={{
                height: [`${Math.round(h * 0.5)}px`, `${h}px`, `${Math.round(h * 0.65)}px`, `${h}px`],
              }}
              transition={{
                duration: 1.1 + i * 0.03,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.06,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Call log</h3>
          <ul className="mt-3 space-y-2">
            {log.map((row, i) => (
              <motion.li
                key={row.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass-card rounded-xl px-3 py-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-emerald-50">{row.leadName}</p>
                  <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-emerald-300/60">
                    {row.direction === "outbound" ? "Keluar" : "Masuk"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-200/55">{row.outcome}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-emerald-500/50">
                  <span>{row.at}</span>
                  <span>·</span>
                  <span>{row.durationMin} menit</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Jadwal mendatang</h3>
          <ul className="mt-3 space-y-2">
            {scheduled.map((row, i) => (
              <motion.li
                key={row.id}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass-card rounded-xl border border-emerald-400/15 p-3"
              >
                <p className="font-medium text-emerald-50">{row.leadName}</p>
                <p className="mt-1 text-[11px] text-emerald-300/60">{row.when}</p>
                <p className="mt-1 text-xs text-emerald-200/55">{row.purpose}</p>
                <p className="mt-2 border-t border-emerald-500/10 pt-2 text-[11px] leading-relaxed text-emerald-400/70">
                  {row.scriptExcerpt}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Voice script preview</h3>
        <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-emerald-500/10 bg-emerald-950/50 p-4 font-mono text-[11px] leading-relaxed text-emerald-100/85">
          {scriptPreview}
        </pre>
      </div>
    </motion.section>
  );
}
