import { Clock3, MessageCircle, PackageCheck, UserRound } from "lucide-react";
import type { Lead } from "@/data/crm-dashboard";
import { cn } from "@/lib/utils";
import { LeadScoreBadge, ScoreRing } from "@/features/crm/components/lead-score-badge";

export function LeadCard({
  lead,
  selected,
  onSelect
}: {
  lead: Lead;
  selected: boolean;
  onSelect: (lead: Lead) => void;
}) {
  return (
    <button
      className={cn(
        "group w-full rounded-3xl border p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-emerald-300/10",
        selected ? "border-emerald-300/50 bg-emerald-300/10" : "border-white/10 bg-slate-950/45"
      )}
      onClick={() => onSelect(lead)}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-300 text-sm font-black text-slate-950">
          {lead.name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black text-white">{lead.name}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{lead.profile}</p>
        </div>
        <ScoreRing level={lead.scoreLevel} score={lead.score} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <LeadScoreBadge level={lead.scoreLevel} score={lead.score} />
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-slate-300">
          {lead.engagement}
        </span>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
          {lead.source}
        </span>
        <span className="flex items-center gap-2">
          <UserRound className="h-3.5 w-3.5 text-emerald-300" />
          Admin {lead.assignedAdmin}
        </span>
        <span className="flex items-center gap-2">
          <PackageCheck className="h-3.5 w-3.5 text-emerald-300" />
          {lead.packageInterest}
        </span>
        <span className="flex items-start gap-2">
          <Clock3 className="mt-0.5 h-3.5 w-3.5 text-emerald-300" />
          {lead.lastActivity}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-white/[0.04] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold text-slate-500">Potential value</span>
          <span className="text-xs font-black text-emerald-200">{lead.value}</span>
        </div>
      </div>
    </button>
  );
}
