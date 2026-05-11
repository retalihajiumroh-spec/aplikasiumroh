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
      <h2 className="text-lg font-semibold text-zinc-50">Adset creation</h2>
      <p className="mt-1 text-sm text-zinc-300/55">
        Konfigurasi audiensi untuk <strong className="text-zinc-300/80">Broad</strong> (jangkauan luas) dan{" "}
        <strong className="text-zinc-300/80">Targeted</strong> (konversi). Ringkasan diterapkan ke pratinjau struktur di bawah secara langsung.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-500/20 bg-zinc-600/[0.06] p-4 sm:p-5">
          <span className="inline-flex rounded-full border border-zinc-500/30 bg-zinc-600/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-300">
            Broad
          </span>
          <h3 className="mt-3 text-sm font-semibold text-zinc-50">Awareness · jangkauan luas</h3>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Ringkasan audiensi</span>
            <textarea
              value={broadAudience}
              onChange={(e) => onBroadChange(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-zinc-600/20 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
              placeholder="Contoh: Indonesia, minat travel & religi, lookalike pembeli…"
            />
          </label>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600/55">
            Gunakan untuk prospecting cold audience &amp; remarketing lebar sebelum penyempitan funnel.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-500/25 bg-zinc-700/[0.06] p-4 sm:p-5">
          <span className="inline-flex rounded-full border border-zinc-500/30 bg-zinc-700/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-100">
            Targeted
          </span>
          <h3 className="mt-3 text-sm font-semibold text-zinc-50">Konversi · audiensi ketat</h3>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Ringkasan audiensi</span>
            <textarea
              value={targetedAudience}
              onChange={(e) => onTargetedChange(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-zinc-700/20 bg-zinc-950/50 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-700/20"
              placeholder="Contoh: remarketing 30 hari, usia 28–45, Jabodetabek…"
            />
          </label>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-600/55">
            Cocok untuk lead warm, intent tinggi, dan penutupan dengan CPL terkontrol.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
