import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bot, ClipboardCheck, MessageSquareReply, PackageCheck, Phone } from "lucide-react";
import type { Lead } from "@/data/crm-dashboard";
import { CrmPanel, CrmPill } from "@/features/crm/components/crm-shell";
import { LeadScoreBadge } from "@/features/crm/components/lead-score-badge";

export function LeadDetailPanel({ lead }: { lead: Lead }) {
  return (
    <CrmPanel className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-hidden p-0">
      <div className="border-b border-white/10 bg-gradient-to-br from-emerald-300/15 via-white/[0.04] to-transparent p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-300 to-cyan-300 text-lg font-black text-slate-950">
            {lead.name
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-black text-white">{lead.name}</p>
            <p className="mt-1 text-sm text-slate-400">{lead.profile}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <LeadScoreBadge level={lead.scoreLevel} score={lead.score} />
              <CrmPill className="border-white/10 bg-white/[0.04] text-slate-300">{lead.stage}</CrmPill>
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[calc(100vh-18rem)] space-y-5 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Branch", lead.branch],
            ["Source", lead.source],
            ["Admin", lead.assignedAdmin],
            ["Value", lead.value]
          ].map(([label, value]) => (
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3" key={label}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
              <p className="mt-2 text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/10 p-4">
          <div className="flex items-start gap-3">
            <Bot className="mt-1 h-5 w-5 text-emerald-200" />
            <div>
              <p className="font-bold text-white">AI next best action</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50">{lead.nextAction}</p>
            </div>
          </div>
        </div>

        <PanelBlock icon={PackageCheck} title="Recommended package">
          <p className="text-sm leading-6 text-slate-300">{lead.recommendedPackage}</p>
        </PanelBlock>

        <PanelBlock icon={ClipboardCheck} title="Notes">
          <ul className="grid gap-2">
            {lead.notes.map((note) => (
              <li className="rounded-2xl bg-white/[0.04] px-3 py-2 text-sm leading-6 text-slate-300" key={note}>
                {note}
              </li>
            ))}
          </ul>
        </PanelBlock>

        <PanelBlock icon={Bot} title="AI recommendations">
          <ul className="grid gap-2">
            {lead.aiRecommendations.map((recommendation) => (
              <li className="rounded-2xl bg-emerald-300/10 px-3 py-2 text-sm leading-6 text-emerald-50" key={recommendation}>
                {recommendation}
              </li>
            ))}
          </ul>
        </PanelBlock>

        <PanelBlock icon={MessageSquareReply} title="Suggested replies">
          <div className="grid gap-2">
            {lead.suggestedReplies.map((reply) => (
              <button
                className="rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-3 text-left text-sm leading-6 text-slate-300 transition hover:border-emerald-300/30 hover:text-white"
                key={reply}
                type="button"
              >
                {reply}
              </button>
            ))}
          </div>
        </PanelBlock>

        <PanelBlock icon={Phone} title="Interaction history">
          <div className="grid gap-3">
            {lead.history.map((event) => {
              const Icon = event.icon;

              return (
                <div className="flex gap-3 rounded-2xl bg-white/[0.04] p-3" key={`${event.title}-${event.time}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{event.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{event.detail}</p>
                    <p className="mt-1 text-[11px] font-bold text-slate-500">{event.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </PanelBlock>
      </div>
    </CrmPanel>
  );
}

function PanelBlock({
  icon: Icon,
  title,
  children
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-emerald-200" />
        <p className="text-sm font-black text-white">{title}</p>
      </div>
      {children}
    </div>
  );
}
