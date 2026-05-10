"use client";

import { motion } from "framer-motion";
import { voiceReminderCopy } from "@/lib/crm/dummy-data";

const bars = [12, 20, 16, 28, 18, 32, 22, 26, 14, 24, 18, 30, 16, 22];

export function VoiceReminderSimulation() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel relative overflow-hidden rounded-2xl p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" aria-hidden />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">
            Roadmap · simulasi UI
          </div>
          <h2 className="mt-3 text-lg font-semibold text-emerald-50">{voiceReminderCopy.title}</h2>
          <p className="mt-1 text-sm text-emerald-200/55">{voiceReminderCopy.subtitle}</p>
          <div className="mt-4 rounded-xl border border-emerald-500/10 bg-emerald-950/35 px-3 py-2.5 text-xs text-emerald-200/70">
            <span className="font-medium text-emerald-300/90">{voiceReminderCopy.simulatedState}</span>
            <span className="mx-2 text-emerald-600/60">·</span>
            {voiceReminderCopy.nextExample}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-500/10 bg-black/20 px-4 py-6 sm:px-8">
          <div className="flex h-14 items-end justify-center gap-1">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-emerald-600/40 to-emerald-300/90"
                animate={{
                  height: [`${Math.round(h * 0.45)}px`, `${h}px`, `${Math.round(h * 0.6)}px`, `${Math.round(h * 0.9)}px`, `${Math.round(h * 0.5)}px`],
                }}
                transition={{
                  duration: 1.2 + i * 0.04,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
          <p className="text-center text-[11px] text-emerald-400/60">
            Visualisasi gelombang suara · panggilan pengingat (integrasi telephony mendatang)
          </p>
        </div>
      </div>
    </motion.section>
  );
}
