"use client";

import { motion } from "framer-motion";
import { ActivityFeed } from "@/components/activity-feed";
import { AiInsightPanel } from "@/components/ai-insight";
import { CommunityEngagement } from "@/components/community-engagement";
import { AppFooter } from "@/components/footer";
import { JamaahDataTable } from "@/components/jamaah-data-table";
import { KpiCard } from "@/components/kpi-card";
import { LeadEngagementFeed } from "@/components/lead-engagement-feed";
import { PerformanceChartsGrid } from "@/components/performance-chart";
import {
  overviewActivity,
  overviewKpis,
  overviewMonthlySeries,
} from "@/lib/dashboard/dashboard-overview-data";
import {
  aiSalesInsight,
  communityEngagement,
  communityGrowth,
  dashboardJamaahRows,
  funnelInbound,
  leadInteractionFeed,
  leadSourceMix,
} from "@/lib/dashboard/premium-dashboard-data";

export function DashboardOverview() {
  return (
    <div className="relative min-h-full overflow-x-hidden pb-28 pt-6 sm:pb-32 sm:pt-8">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(52, 211, 153, 0.12), transparent 40%), radial-gradient(circle at 90% 30%, rgba(251, 191, 36, 0.08), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="border-b border-emerald-500/10 pb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/75">SA&apos;YA Umroh OS</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-50 sm:text-4xl">Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400/90 sm:text-base">
            KPI operasional, performa 6 bulan, funnel inbound dengan persentase, komunitas, aktivitas kasir, dan metrik
            interaksi lead — tampilan premium siap presentasi.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewKpis.map((item, index) => (
            <KpiCard key={item.label} item={item} index={index} />
          ))}
        </div>

        <div className="mt-10">
          <PerformanceChartsGrid monthly={overviewMonthlySeries} funnel={funnelInbound} leadSources={leadSourceMix} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-8 lg:col-span-5">
            <ActivityFeed
              items={overviewActivity}
              title="Activity feed"
              description="Pembayaran, lead kampanye, dokumen, dan booking — transisi halus."
            />
            <LeadEngagementFeed items={leadInteractionFeed} />
          </div>
          <div className="lg:col-span-7">
            <CommunityEngagement segments={communityEngagement} growth={communityGrowth} />
          </div>
        </div>

        <div className="mt-10">
          <JamaahDataTable rows={dashboardJamaahRows} />
        </div>

        <AppFooter />
      </div>

      <AiInsightPanel
        leadStatus={aiSalesInsight.leadStatus}
        engagementScore={aiSalesInsight.engagementScore}
        suggestedActions={aiSalesInsight.suggestedActions}
        highlight={aiSalesInsight.highlight}
      />
    </div>
  );
}
