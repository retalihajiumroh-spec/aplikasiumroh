"use client";

import { motion } from "framer-motion";
import type { AiInsight, AiInsightKind } from "@/lib/dashboard/owner-dummy-data";

function kindLabel(kind: AiInsightKind) {
  if (kind === "high_intent") return "High intent";
  if (kind === "community") return "Komunitas";
  return "Alert cabang";
}

function kindStyles(kind: AiInsightKind) {
  if (kind === "high_intent") {
    return {
      ring: "ring-emerald-400/25",
      badge: "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
      glow: "from-emerald-400/15 to-transparent",
    };
  }
  if (kind === "community") {
    return {
      ring: "ring-teal-400/20",
      badge: "border-teal-400/25 bg-teal-500/10 text-teal-100",
      glow: "from-teal-400/12 to-transparent",
    };
  }
  return {
    ring: "ring-amber-400/25",
    badge: "border-amber-400/30 bg-amber-500/10 text-amber-100",
    glow: "from-amber-400/15 to-transparent",
  };
}

export function OwnerAiInsights({ insights }: { insights: AiInsight[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/70">AI insights</p>
          <h2 className="mt-1 text-lg font-semibold text-emerald-50">Ringkasan cerdas</h2>
          <p className="mt-1 text-sm text-emerald-200/55">
            Analisis lead berminat tinggi, engagement komunitas, dan peringatan performa cabang.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-300/60">
          Demo model
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {insights.map((item, i) => {
          const s = kindStyles(item.kind);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.05 }}
              className={`glass-card relative overflow-hidden rounded-xl p-4 ring-1 ${s.ring}`}
            >
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${s.glow} blur-2xl`}
                aria-hidden
              />
              <div className="relative flex flex-wrap items-start justify-between gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.badge}`}>
                  {kindLabel(item.kind)}
                </span>
                {item.metricLabel && item.metricValue ? (
                  <div className="text-right">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-500/50">
                      {item.metricLabel}
                    </p>
                    <p className="font-mono text-sm font-semibold text-emerald-100">{item.metricValue}</p>
                  </div>
                ) : null}
              </div>
              <p className="relative mt-2 font-medium text-emerald-50">{item.title}</p>
              <p className="relative mt-1 text-sm leading-relaxed text-emerald-100/85">{item.summary}</p>
              <p className="relative mt-2 text-xs leading-relaxed text-emerald-200/55">{item.detail}</p>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
