import { BrainCircuit } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { AiCommunityInsight } from "@/data/community-engine";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  AiCommunityInsight["tone"],
  { border: string; glow: string; chip: string }
> = {
  positive: {
    border: "border-emerald-300/25",
    glow: "from-emerald-400/25",
    chip: "bg-emerald-400/10 text-emerald-100"
  },
  warning: {
    border: "border-amber-300/30",
    glow: "from-amber-400/25",
    chip: "bg-amber-400/10 text-amber-100"
  },
  neutral: {
    border: "border-slate-400/25",
    glow: "from-slate-400/20",
    chip: "bg-white/10 text-slate-100"
  },
  urgent: {
    border: "border-rose-400/30",
    glow: "from-rose-500/30",
    chip: "bg-rose-400/10 text-rose-100"
  }
};

export function AiCommunityInsightsPanel({ insights }: { insights: AiCommunityInsight[] }) {
  return (
    <OwnerPanel className="community-animate-in [animation-delay:300ms]">
      <SectionHeader
        eyebrow="Interpretation layer"
        title="AI community insight panel"
        description="Narasi siap pakai untuk tim konten, moderator, dan sales — dibangun dari pola perilaku nyata komunitas Anda."
        action={
          <StatusPill className="border-indigo-300/25 bg-indigo-400/10 text-indigo-100">
            <BrainCircuit className="mr-2 h-3.5 w-3.5" />
            Multi-signal fusion
          </StatusPill>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight, index) => {
          const tone = toneStyles[insight.tone];

          return (
            <div
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] border bg-slate-950/45 p-5 backdrop-blur-xl transition hover:border-emerald-300/30",
                tone.border
              )}
              key={insight.id}
              style={{ animationDelay: `${320 + index * 60}ms` }}
            >
              <div className={cn("pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl", tone.glow)} />
              <div className="relative flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em]", tone.chip)}>
                    {insight.tone}
                  </span>
                  {insight.metric ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-slate-200">
                      {insight.metric}
                    </span>
                  ) : null}
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-100">{insight.text}</p>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <p className="text-[11px] font-medium text-slate-500">
                  Digenerate dari kombinasi konten, ritme waktu, dan kedalaman thread — tanpa menyimpan pesan privat mentah.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </OwnerPanel>
  );
}
