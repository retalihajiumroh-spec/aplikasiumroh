"use client";

import { motion } from "framer-motion";
import type { EngagementRecommendation } from "@/lib/content-engine/dummy-data";
import { ViralScoreRing } from "./viral-score-ring";

function ImpactDot({ impact }: { impact: EngagementRecommendation["impact"] }) {
  const strong = impact === "high";
  return (
    <span
      className={
        strong
          ? "rounded-full bg-purple-400/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-purple-950"
          : "rounded-full border border-purple-500/25 bg-purple-950/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-purple-300/70"
      }
    >
      {strong ? "Impact tinggi" : "Impact sedang"}
    </span>
  );
}

export function EngagementOptimizationSection({
  viralScore,
  recommendations,
}: {
  viralScore: number;
  recommendations: EngagementRecommendation[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-purple-50">Optimasi engagement</h2>
      <p className="mt-1 text-sm text-purple-200/55">
        Estimasi viral score dan saran perbaikan berbasis pola konten umroh yang berkinerja baik di
        Instagram & TikTok.
      </p>

      <div className="mt-8 rounded-2xl border border-purple-500/10 bg-purple-950/25 p-5 sm:p-6">
        <ViralScoreRing score={viralScore} />
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">
          Rekomendasi konten
        </p>
        <ul className="mt-4 space-y-3">
          {recommendations.map((rec, i) => (
            <motion.li
              key={rec.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.05 }}
              className="glass-card flex flex-col gap-2 rounded-xl p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-purple-50">{rec.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-purple-200/60">{rec.detail}</p>
              </div>
              <ImpactDot impact={rec.impact} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
