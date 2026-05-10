"use client";

import { motion } from "framer-motion";
import type { CrmLead } from "@/lib/crm/dummy-data";

function ScorePill({ score }: { score: number }) {
  const tier =
    score >= 80
      ? "text-emerald-100 bg-emerald-500/20 ring-emerald-400/30"
      : score >= 60
        ? "text-amber-100 bg-amber-500/15 ring-amber-400/25"
        : "text-emerald-200/80 bg-white/5 ring-white/10";
  return (
    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 font-mono text-sm font-bold ring-1 ${tier}`}>
      {score}
    </span>
  );
}

export function PipelineLeadCard({ lead, index }: { lead: CrmLead; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="glass-card rounded-xl p-4 ring-1 ring-transparent transition hover:ring-emerald-400/15"
    >
      <p className="truncate text-base font-semibold tracking-tight text-emerald-50">{lead.name}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/60">Score</span>
        <ScorePill score={lead.score} />
      </div>

      <div className="mt-4 border-t border-emerald-500/10 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/60">Last activity</p>
        <p className="mt-1 text-sm leading-snug text-emerald-100/85">{lead.lastActivity}</p>
      </div>
    </motion.article>
  );
}
