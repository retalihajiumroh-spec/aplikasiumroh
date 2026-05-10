"use client";

import { motion } from "framer-motion";
import type { CrmLead } from "@/lib/crm/dummy-data";

function ScorePill({ score }: { score: number }) {
  const tier =
    score >= 80
      ? "text-purple-100 bg-purple-500/20 ring-purple-400/30"
      : score >= 60
        ? "text-violet-100 bg-violet-500/15 ring-violet-400/25"
        : "text-purple-200/80 bg-white/5 ring-white/10";
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
      className="glass-card rounded-xl p-4 ring-1 ring-transparent transition hover:ring-purple-400/15"
    >
      <p className="truncate text-base font-semibold tracking-tight text-purple-50">{lead.name}</p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/60">Score</span>
        <ScorePill score={lead.score} />
      </div>

      <div className="mt-4 border-t border-purple-500/10 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/60">Last activity</p>
        <p className="mt-1 text-sm leading-snug text-purple-100/85">{lead.lastActivity}</p>
      </div>
    </motion.article>
  );
}
