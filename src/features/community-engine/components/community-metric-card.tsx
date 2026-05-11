import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OverviewMetric } from "@/data/community-engine";

const accentRing: Record<OverviewMetric["accent"], string> = {
  emerald: "from-emerald-400/25 via-emerald-400/5 to-transparent",
  cyan: "from-cyan-400/25 via-cyan-400/5 to-transparent",
  amber: "from-amber-400/25 via-amber-400/5 to-transparent",
  violet: "from-zinc-500/25 via-zinc-500/5 to-transparent",
  rose: "from-rose-400/25 via-rose-400/5 to-transparent"
};

const accentGlow: Record<OverviewMetric["accent"], string> = {
  emerald: "bg-emerald-400/15 text-emerald-200",
  cyan: "bg-cyan-400/15 text-cyan-200",
  amber: "bg-amber-400/15 text-amber-200",
  violet: "bg-zinc-500/15 text-zinc-300",
  rose: "bg-rose-400/15 text-rose-200"
};

export function CommunityMetricCard({ metric, index }: { metric: OverviewMetric; index: number }) {
  const TrendIcon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : Minus;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-emerald-950/25 backdrop-blur-2xl transition duration-500 hover:border-emerald-300/25 community-animate-in"
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-90 blur-3xl transition duration-700 group-hover:opacity-100",
          accentRing[metric.accent]
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
          <p className="mt-4 text-3xl font-black tracking-tight text-white">{metric.value}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{metric.hint}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
            metric.trend === "up" && "bg-emerald-400/10 text-emerald-200",
            metric.trend === "down" && "bg-rose-400/10 text-rose-200",
            metric.trend === "flat" && "bg-white/10 text-slate-300"
          )}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {metric.delta}
        </span>
      </div>
      <div className={cn("relative mt-5 inline-flex rounded-2xl px-3 py-2 text-[11px] font-semibold", accentGlow[metric.accent])}>
        {metric.pulseLabel}
      </div>
    </div>
  );
}
