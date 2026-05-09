"use client";

import { motion } from "framer-motion";
import type { BranchLeaderboardRow } from "@/lib/dashboard/owner-dummy-data";

function RankBadge({ rank }: { rank: number }) {
  const top = rank <= 3;
  return (
    <span
      className={
        top
          ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-teal-600/20 font-mono text-sm font-bold text-emerald-100 ring-1 ring-emerald-400/25"
          : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-950/40 font-mono text-sm font-semibold text-emerald-200/70"
      }
    >
      {rank}
    </span>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-emerald-500/10 bg-emerald-950/30 px-2.5 py-1.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-200/45">
        {label}
      </p>
      <p className="font-mono text-xs font-semibold text-emerald-100/95">{value}</p>
    </div>
  );
}

export function BranchLeaderboard({ rows }: { rows: BranchLeaderboardRow[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-emerald-50">
            Branch leaderboard
          </h2>
          <p className="mt-1 text-sm text-emerald-200/55">
            Ranking performa gabungan: revenue velocity, engagement, dan kepuasan
            jamaah.
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map((row, i) => (
          <motion.li
            key={row.branch}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.22 + i * 0.05 }}
            className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <RankBadge rank={row.rank} />
              <div className="min-w-0">
                <p className="truncate font-medium text-emerald-50">{row.branch}</p>
                <p className="text-sm text-emerald-200/45">{row.city}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <MetricPill label="Composite" value={`${row.score}`} />
                  <MetricPill label="Engagement" value={`${row.engagementScore}`} />
                </div>
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-3 gap-2 sm:max-w-[280px] sm:flex-1">
              <MetricPill label="Threads aktif" value={`${row.activeThreads}`} />
              <MetricPill label="Avg response" value={`${row.avgResponseMin} m`} />
              <MetricPill label="Satisfaction" value={`${row.satisfactionPct}%`} />
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
