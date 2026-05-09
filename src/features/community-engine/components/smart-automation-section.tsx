import { Bot, Clock3, Workflow } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { AutomationCard } from "@/data/community-engine";
import { cn } from "@/lib/utils";

const statusLabel: Record<AutomationCard["status"], { label: string; className: string }> = {
  live: { label: "Live", className: "border-emerald-300/25 bg-emerald-400/15 text-emerald-100" },
  paused: { label: "Paused", className: "border-slate-400/25 bg-white/10 text-slate-200" },
  scheduled: { label: "Scheduled", className: "border-sky-300/25 bg-sky-400/15 text-sky-100" }
};

export function SmartAutomationSection({ cards }: { cards: AutomationCard[] }) {
  return (
    <OwnerPanel className="community-animate-in xl:col-span-7 [animation-delay:360ms]">
      <SectionHeader
        eyebrow="Operational leverage"
        title="Smart automation fabric"
        description="Otomasi yang terasa manusiawi — menjaga ritme komunitas selagi tim fokus pada percakapan bernilai tinggi."
        action={
          <StatusPill className="border-emerald-300/25 bg-emerald-400/10 text-emerald-50">
            <Workflow className="mr-2 h-3.5 w-3.5" />
            Guardrails aktif
          </StatusPill>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => {
          const status = statusLabel[card.status];

          return (
            <div
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-slate-950/60 p-5 shadow-inner shadow-emerald-950/40 backdrop-blur-xl transition hover:border-emerald-300/25"
              key={card.id}
              style={{ animationDelay: `${380 + index * 70}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(52,211,153,0.22),transparent_55%)] opacity-70 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-3 text-emerald-100">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-black text-white">{card.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.description}</p>
                    </div>
                  </div>
                  <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em]", status.className)}>
                    {status.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{card.statLabel}</p>
                    <p className="mt-1 text-xl font-black text-white">{card.statValue}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                    <Clock3 className="h-4 w-4 text-emerald-200" />
                    Always-on routing
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </OwnerPanel>
  );
}
