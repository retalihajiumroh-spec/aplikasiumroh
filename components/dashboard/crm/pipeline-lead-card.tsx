"use client";

import { motion } from "framer-motion";
import type { CrmLead, EngagementLevel } from "@/lib/crm/dummy-data";

function ScorePill({ score }: { score: number }) {
  const tier =
    score >= 80 ? "text-emerald-100 bg-emerald-500/20 ring-emerald-400/30" : score >= 60 ? "text-amber-100 bg-amber-500/15 ring-amber-400/25" : "text-emerald-200/80 bg-white/5 ring-white/10";
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-0.5 font-mono text-xs font-semibold ring-1 ${tier}`}>
      {score}
    </span>
  );
}

function EngagementTag({ level }: { level: EngagementLevel }) {
  const map: Record<EngagementLevel, string> = {
    high: "Engagement tinggi",
    medium: "Engagement sedang",
    low: "Engagement rendah",
  };
  const dot: Record<EngagementLevel, string> = {
    high: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
    medium: "bg-amber-400/90",
    low: "bg-slate-400/70",
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-200/55">
      <span className={`h-1.5 w-1.5 rounded-full ${dot[level]}`} aria-hidden />
      {map[level]}
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
      className="glass-card rounded-xl p-3.5 ring-1 ring-transparent transition hover:ring-emerald-400/15"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-emerald-50">{lead.name}</p>
          <p className="truncate font-mono text-[11px] text-emerald-300/50">{lead.phoneMasked}</p>
        </div>
        <ScorePill score={lead.score} />
      </div>
      <p className="mt-2 truncate text-xs text-emerald-200/45">
        {lead.city} · {lead.branch}
      </p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-emerald-100/85">{lead.packageInterest}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <EngagementTag level={lead.engagement} />
        <span className="text-[10px] text-emerald-500/50">·</span>
        <span className="text-[11px] text-emerald-200/45">{lead.lastActivity}</span>
      </div>
      <div className="mt-3 rounded-lg border border-emerald-400/15 bg-emerald-500/[0.07] p-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300/70">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-emerald-400" aria-hidden>
            <path
              d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          AI follow-up
        </div>
        <p className="mt-1 text-xs leading-relaxed text-emerald-100/80">{lead.aiFollowUp}</p>
      </div>
      <p className="mt-2 font-mono text-[10px] text-emerald-500/45">{lead.id}</p>
    </motion.article>
  );
}
