import { Flame, Snowflake, Sparkles, Zap } from "lucide-react";
import type { LeadScoreLevel } from "@/data/crm-dashboard";
import { cn } from "@/lib/utils";

const scoreStyles: Record<LeadScoreLevel, string> = {
  cold: "border-sky-300/20 bg-sky-300/10 text-sky-200",
  warm: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  hot: "border-orange-300/20 bg-orange-300/10 text-orange-200",
  "high intent": "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
};

const scoreIcons = {
  cold: Snowflake,
  warm: Zap,
  hot: Flame,
  "high intent": Sparkles
};

export function LeadScoreBadge({
  level,
  score,
  className
}: {
  level: LeadScoreLevel;
  score: number;
  className?: string;
}) {
  const Icon = scoreIcons[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em]",
        scoreStyles[level],
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {level} · {score}
    </span>
  );
}

export function ScoreRing({ score, level }: { score: number; level: LeadScoreLevel }) {
  const color = level === "high intent" ? "#34d399" : level === "hot" ? "#fb923c" : level === "warm" ? "#fbbf24" : "#38bdf8";

  return (
    <div
      className="grid h-12 w-12 place-items-center rounded-full text-xs font-black text-white"
      style={{
        background: `conic-gradient(${color} ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`
      }}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950">{score}</span>
    </div>
  );
}
