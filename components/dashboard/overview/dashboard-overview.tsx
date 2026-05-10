"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { KpiCard } from "@/components/dashboard/owner/kpi-card";
import { OverviewCharts } from "./overview-charts";
import { OverviewActivityFeed } from "./overview-activity-feed";
import {
  overviewActivity,
  overviewKpis,
  overviewMonthlySeries,
} from "@/lib/dashboard/dashboard-overview-data";

export function DashboardOverview() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-16 pt-6 sm:pb-20 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 0%, rgba(52, 211, 153, 0.14), transparent 42%), radial-gradient(circle at 85% 40%, rgba(45, 212, 191, 0.1), transparent 45%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              SA&apos;YA Umroh OS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
              Ringkasan cepat performa bisnis: KPI utama, tren revenue & lead, serta aktivitas operasional terkini.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10 hover:text-emerald-100"
          >
            ← Hub aplikasi
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewKpis.map((item, index) => (
            <KpiCard key={item.label} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-8">
            <OverviewCharts data={overviewMonthlySeries} />
          </div>
          <div className="lg:col-span-4">
            <OverviewActivityFeed items={overviewActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}
