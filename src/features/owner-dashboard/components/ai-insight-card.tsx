import type { AiInsight } from "@/data/owner-dashboard";
import { cn } from "@/lib/utils";

const toneStyles: Record<AiInsight["tone"], string> = {
  positive: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  warning: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  urgent: "border-rose-300/20 bg-rose-300/10 text-rose-100",
  neutral: "border-sky-300/20 bg-sky-300/10 text-sky-100"
};

export function AiInsightCard({ insight, index }: { insight: AiInsight; index: number }) {
  const Icon = insight.icon;

  return (
    <div
      className={cn(
        "owner-animate-in rounded-3xl border p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1",
        toneStyles[insight.tone]
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-white">{insight.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{insight.description}</p>
        </div>
      </div>
      <p className="mt-4 rounded-2xl bg-slate-950/35 px-4 py-3 text-xs font-semibold leading-5 text-slate-200">
        {insight.impact}
      </p>
    </div>
  );
}
