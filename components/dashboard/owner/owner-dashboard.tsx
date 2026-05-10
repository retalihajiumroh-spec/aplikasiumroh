"use client";

import { motion } from "framer-motion";
import { KpiCard } from "./kpi-card";
import { RevenueAnalytics } from "./revenue-analytics";
import { BranchPerformance } from "./branch-performance";
import { OwnerActivityFeed } from "./owner-activity-feed";
import { activityFeed, branchPerformance, kpiData, monthlyRevenueTrend } from "@/lib/dashboard/owner-dummy-data";

export function OwnerDashboard() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-16 pt-6 sm:pb-20 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(52, 211, 153, 0.12), transparent 40%), radial-gradient(circle at 80% 10%, rgba(45, 212, 191, 0.1), transparent 35%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              SA&apos;YA Umroh OS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
              Owner dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
              Pantau KPI utama, tren revenue & konversi, performa serta engagement cabang, dan aktivitas operasional
              terbaru dalam satu layar eksekutif.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-200/90">
              Live snapshot
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-emerald-200/55">
              Diperbarui 09 Mei 2026 · 14:32 WIB
            </span>
          </div>
        </motion.header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((item, index) => (
            <KpiCard key={item.key} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-12">
          <div className="space-y-8 xl:col-span-8">
            <RevenueAnalytics monthly={monthlyRevenueTrend} />
            <BranchPerformance data={branchPerformance} />
          </div>
          <div className="space-y-8 xl:col-span-4">
            <OwnerActivityFeed items={activityFeed} />
          </div>
        </div>
      </div>
    </div>
  );
}
