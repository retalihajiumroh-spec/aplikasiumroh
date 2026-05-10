"use client";

import { motion } from "framer-motion";

export function AdsetCreationPanel({
  broadAudience,
  targetedAudience,
  onBroadChange,
  onTargetedChange,
}: {
  broadAudience: string;
  targetedAudience: string;
  onBroadChange: (v: string) => void;
  onTargetedChange: (v: string) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <h2 className="text-lg font-semibold text-purple-50">Adset creation</h2>
      <p className="mt-1 text-sm text-purple-200/55">
        Konfigurasi audiensi untuk <strong className="text-purple-200/80">Broad</strong> (jangkauan luas) dan{" "}
        <strong className="text-purple-200/80">Targeted</strong> (konversi). Ringkasan diterapkan ke pratinjau struktur di bawah secara langsung.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-purple-400/20 bg-purple-500/[0.06] p-4 sm:p-5">
          <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-200">
            Broad
          </span>
          <h3 className="mt-3 text-sm font-semibold text-purple-50">Awareness · jangkauan luas</h3>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Ringkasan audiensi</span>
            <textarea
              value={broadAudience}
              onChange={(e) => onBroadChange(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-500/35 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              placeholder="Contoh: Indonesia, minat travel & religi, lookalike pembeli…"
            />
          </label>
          <p className="mt-3 text-[11px] leading-relaxed text-purple-500/55">
            Gunakan untuk prospecting cold audience &amp; remarketing lebar sebelum penyempitan funnel.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-400/25 bg-violet-700/[0.06] p-4 sm:p-5">
          <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-700/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-100">
            Targeted
          </span>
          <h3 className="mt-3 text-sm font-semibold text-purple-50">Konversi · audiensi ketat</h3>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-300/60">Ringkasan audiensi</span>
            <textarea
              value={targetedAudience}
              onChange={(e) => onTargetedChange(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-violet-700/20 bg-purple-950/50 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-500/35 focus:border-violet-400/40 focus:outline-none focus:ring-2 focus:ring-violet-700/20"
              placeholder="Contoh: remarketing 30 hari, usia 28–45, Jabodetabek…"
            />
          </label>
          <p className="mt-3 text-[11px] leading-relaxed text-purple-500/55">
            Cocok untuk lead warm, intent tinggi, dan penutupan dengan CPL terkontrol.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
