"use client";

import { motion } from "framer-motion";
import type { BranchPerformanceMetrics } from "@/lib/dashboard/owner-dummy-data";

export function BranchEngagementCards({ branches }: { branches: BranchPerformanceMetrics[] }) {
  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Detail engagement per cabang</p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-600/25">
        {branches.map((b, i) => (
          <motion.article
            key={b.branch}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="glass-card w-[min(260px,calc(100vw-3rem))] shrink-0 rounded-xl p-4"
          >
            <p className="font-medium text-zinc-50">{b.city}</p>
            <p className="text-[11px] text-zinc-500/50">{b.branch}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg border border-zinc-600/10 bg-zinc-950/30 px-2 py-1.5">
                <dt className="text-zinc-600/55">Engagement</dt>
                <dd className="font-mono font-semibold text-zinc-200">{b.engagementScore}</dd>
              </div>
              <div className="rounded-lg border border-zinc-600/10 bg-zinc-950/30 px-2 py-1.5">
                <dt className="text-zinc-600/55">Kepuasan</dt>
                <dd className="font-mono font-semibold text-zinc-200">{b.satisfactionPct}%</dd>
              </div>
              <div className="rounded-lg border border-zinc-600/10 bg-zinc-950/30 px-2 py-1.5">
                <dt className="text-zinc-600/55">Avg respons</dt>
                <dd className="font-mono font-semibold text-zinc-200">{b.avgResponseMin} m</dd>
              </div>
              <div className="rounded-lg border border-zinc-600/10 bg-zinc-950/30 px-2 py-1.5">
                <dt className="text-zinc-600/55">Threads</dt>
                <dd className="font-mono font-semibold text-zinc-200">{b.activeThreads}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
