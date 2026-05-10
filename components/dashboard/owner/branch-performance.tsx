"use client";

import { motion } from "framer-motion";
import type { BranchPerformanceMetrics } from "@/lib/dashboard/owner-dummy-data";
import { BranchConversionChart, BranchLeadSalesChart } from "./branch-performance-charts";

export function BranchPerformance({ data }: { data: BranchPerformanceMetrics[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-emerald-50">Performa cabang</h2>
          <p className="mt-1 max-w-xl text-sm text-emerald-200/55">
            Perbandingan konversi lead → kontrak dan volume lead aktif vs penutupan (jamaah) per entitas.
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300/90 sm:mt-0">
          YTD · agregat internal
        </span>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
              Konversi per cabang
            </span>
            <span className="h-1 w-1 rounded-full bg-emerald-500/40" aria-hidden />
            <span className="text-xs text-emerald-200/45">% lead → kontrak</span>
          </div>
          <BranchConversionChart data={data} />
        </div>
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
              Lead vs penjualan
            </span>
            <span className="h-1 w-1 rounded-full bg-emerald-500/40" aria-hidden />
            <span className="text-xs text-emerald-200/45">Pipeline aktif · jamaah closed</span>
          </div>
          <BranchLeadSalesChart data={data} />
        </div>
      </div>
    </motion.section>
  );
}
