import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KpiMetric } from "@/data/owner-dashboard";
import { OwnerPanel } from "@/features/owner-dashboard/components/owner-panel";

export function KpiCard({ metric, index }: { metric: KpiMetric; index: number }) {
  const Icon = metric.icon;
  const TrendIcon = metric.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <OwnerPanel
      className="group relative overflow-hidden p-5 owner-animate-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/20 blur-3xl transition group-hover:bg-emerald-300/30" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-emerald-200 shadow-lg shadow-emerald-950/20">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            metric.trend === "up" ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"
          }`}
        >
          <TrendIcon className="h-3.5 w-3.5" />
          {metric.delta}
        </span>
      </div>
      <div className="relative mt-7">
        <p className="text-sm font-medium text-slate-400">{metric.label}</p>
        <p className="mt-2 text-3xl font-black tracking-tight text-white">{metric.value}</p>
        <p className="mt-2 text-xs font-medium text-slate-500">{metric.description}</p>
      </div>
    </OwnerPanel>
  );
}
