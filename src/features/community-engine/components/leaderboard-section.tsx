import { Crown, Medal, Sparkles } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { LeaderboardEntry } from "@/data/community-engine";
import { cn } from "@/lib/utils";

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-600 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/30">
        1
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 text-sm font-black text-slate-900 shadow-inner">
        2
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 to-amber-700 text-sm font-black text-slate-950 shadow-lg shadow-orange-500/25">
        3
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-black text-slate-300">
      {rank}
    </span>
  );
}

export function LeaderboardSection({ entries }: { entries: LeaderboardEntry[] }) {
  const maxScore = Math.max(...entries.map((entry) => entry.score), 1);

  return (
    <OwnerPanel className="community-animate-in xl:col-span-4 [animation-delay:200ms]">
      <SectionHeader
        eyebrow="Humans in the loop"
        title="Engagement leaderboard"
        description="Siapa yang membawa ritme komunitas — siap untuk appreciation & micro-campaign."
        action={
          <StatusPill className="border-violet-300/25 bg-violet-400/10 text-violet-100">
            <Crown className="mr-2 h-3.5 w-3.5" />
            Top movers
          </StatusPill>
        }
      />

      <div className="grid gap-3">
        {entries.map((entry, index) => (
          <div
            className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4 backdrop-blur-xl transition hover:border-emerald-300/25"
            key={entry.name}
            style={{ animationDelay: `${220 + index * 55}ms` }}
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-400/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
              <RankBadge rank={entry.rank} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-black text-white">{entry.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-100">
                    <Sparkles className="h-3 w-3" />
                    {entry.badge}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-400">
                  <span>
                    Score <span className="text-white">{entry.score}</span>
                  </span>
                  <span>
                    Interaksi <span className="text-white">{entry.interactions}</span>
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      entry.rank <= 3 ? "from-emerald-300 via-lime-200 to-cyan-300" : "from-emerald-500/70 to-emerald-300/60"
                    )}
                    style={{ width: `${(entry.score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
              <Medal className="hidden h-5 w-5 shrink-0 text-emerald-200/80 sm:block" />
            </div>
          </div>
        ))}
      </div>
    </OwnerPanel>
  );
}
