import { Crown, TrendingUp } from "lucide-react";
import { topBranches } from "@/data/owner-dashboard";
import { OwnerPanel, SectionHeader } from "@/features/owner-dashboard/components/owner-panel";

export function TopBranches() {
  return (
    <OwnerPanel className="lg:col-span-3">
      <SectionHeader eyebrow="Leaderboard" title="Top branches" />
      <div className="grid gap-3">
        {topBranches.map((branch, index) => (
          <div
            className="group rounded-3xl border border-white/10 bg-slate-950/45 p-4 transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
            key={branch.branch}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                {index === 0 ? <Crown className="h-4 w-4" /> : <span className="text-sm font-black">#{index + 1}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{branch.branch}</p>
                <p className="text-xs text-slate-500">{branch.city}</p>
              </div>
              <span className="text-xl font-black text-emerald-200">{branch.score}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-2xl bg-white/[0.04] p-2">
                <p className="font-bold text-white">{branch.revenue}</p>
                <p className="mt-1 text-slate-500">Revenue</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-2">
                <p className="font-bold text-white">{branch.conversion}</p>
                <p className="mt-1 text-slate-500">Close</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-2">
                <p className="inline-flex items-center justify-center gap-1 font-bold text-emerald-200">
                  <TrendingUp className="h-3 w-3" />
                  {branch.growth}
                </p>
                <p className="mt-1 text-slate-500">Growth</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OwnerPanel>
  );
}
