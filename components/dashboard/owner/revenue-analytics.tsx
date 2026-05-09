"use client";

import { motion } from "framer-motion";
import { MonthlyRevenueConversionChart, BranchRevenueBarChart } from "./revenue-charts";
import type { BranchRevenueCompare, MonthlyRevenuePoint } from "@/lib/dashboard/owner-dummy-data";

export function RevenueAnalytics({
  monthly,
  branches,
}: {
  monthly: MonthlyRevenuePoint[];
  branches: BranchRevenueCompare[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-emerald-50">
            Revenue analytics
          </h2>
          <p className="mt-1 max-w-xl text-sm text-emerald-200/55">
            Tren bulanan, rasio konversi, dan perbandingan performa cabang — agregat
            gross package sebelum diskon korporat.
          </p>
        </div>
        <span className="mt-2 inline-flex w-fit items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300/90 sm:mt-0">
          FY 2026 · Indonesia
        </span>
      </div>

      <div className="mt-8 space-y-10">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
              Tren bulanan
            </span>
            <span className="h-1 w-1 rounded-full bg-emerald-500/40" aria-hidden />
            <span className="text-xs text-emerald-200/45">Revenue + conversion rate</span>
          </div>
          <MonthlyRevenueConversionChart data={monthly} />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/15 to-transparent" />

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
              Perbandingan cabang
            </span>
            <span className="h-1 w-1 rounded-full bg-emerald-500/40" aria-hidden />
            <span className="text-xs text-emerald-200/45">Revenue YTD per entitas</span>
          </div>
          <BranchRevenueBarChart data={branches} />
        </div>
      </div>
    </motion.section>
  );
}
