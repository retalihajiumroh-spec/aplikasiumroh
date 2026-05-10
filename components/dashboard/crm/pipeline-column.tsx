"use client";

import { motion } from "framer-motion";
import type { CrmLead, PipelineStageId } from "@/lib/crm/dummy-data";
import { leadsByStage } from "@/lib/crm/dummy-data";
import { PipelineLeadCard } from "./pipeline-lead-card";

const stageMeta = {
  new: { chip: "Inbound" },
  contacted: { chip: "Outreach" },
  interested: { chip: "Nurturing" },
  booking: { chip: "Closing" },
  paid: { chip: "Won" },
} as const;

export function PipelineColumn({
  stageId,
  label,
  short,
  accent,
  index,
}: {
  stageId: PipelineStageId;
  label: string;
  short: string;
  accent: string;
  index: number;
}) {
  const leads: CrmLead[] = leadsByStage(stageId);
  const chip = stageMeta[stageId].chip;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[min(100vw-2rem,280px)] shrink-0 flex-col sm:w-[300px]"
    >
      <div className={`glass-panel rounded-2xl bg-gradient-to-br ${accent} p-1`}>
        <div className="rounded-[0.9rem] border border-emerald-500/10 bg-emerald-950/25 px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-emerald-50">{label}</p>
              <p className="text-[11px] text-emerald-200/45">{short}</p>
            </div>
            <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-200">
              {leads.length}
            </span>
          </div>
          <span className="mt-2 inline-flex rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-200/50">
            {chip}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-2.5 rounded-2xl border border-emerald-500/5 bg-emerald-950/10 p-2 min-h-[120px]">
        {leads.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-emerald-500/45">Belum ada lead di tahap ini.</p>
        ) : (
          leads.map((lead, i) => <PipelineLeadCard key={lead.id} lead={lead} index={i} />)
        )}
      </div>
    </motion.section>
  );
}
