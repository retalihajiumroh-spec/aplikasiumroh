import { Activity, BrainCircuit, Gauge, ShieldCheck } from "lucide-react";
import { aiInsights, kpiMetrics, ownerQuickSignals } from "@/data/owner-dashboard";
import { AiInsightCard } from "@/features/owner-dashboard/components/ai-insight-card";
import { RevenueAnalytics } from "@/features/owner-dashboard/components/analytics-charts";
import { ActivityFeed } from "@/features/owner-dashboard/components/activity-feed";
import { CommunityOverview } from "@/features/owner-dashboard/components/community-overview";
import { CrmPipelinePreview } from "@/features/owner-dashboard/components/crm-pipeline-preview";
import { KpiCard } from "@/features/owner-dashboard/components/kpi-card";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import { TopBranches } from "@/features/owner-dashboard/components/top-branches";

export function OwnerDashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[140px]" />
        <div className="absolute right-[-10rem] top-52 h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[130px]" />
        <div className="absolute bottom-[-16rem] left-[-12rem] h-[36rem] w-[36rem] rounded-full bg-lime-300/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <section className="relative mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 xl:py-12">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="owner-animate-in rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-emerald-950/30 backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill>
                    <BrainCircuit className="mr-2 h-3.5 w-3.5" />
                    SA&apos;YA AI Operating System
                  </StatusPill>
                  <StatusPill className="border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    Live owner cockpit
                  </StatusPill>
                </div>
                <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-0.04em] text-white md:text-6xl xl:text-7xl">
                  Umroh command center for growth, revenue, and jamaah experience.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                  Premium dashboard untuk owner travel: membaca demand, memantau cabang, menggerakkan CRM, dan mengoptimalkan komunitas dari satu layar.
                </p>
              </div>

              <div className="grid min-w-[280px] gap-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-300/10 p-3 text-emerald-200">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">System Health</p>
                    <p className="text-xs text-slate-500">18 cabang aktif realtime</p>
                  </div>
                  <span className="ml-auto h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.9)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.04] p-3">
                    <p className="text-xs text-slate-500">SLA Follow-up</p>
                    <p className="mt-1 text-xl font-black text-white">92%</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.04] p-3">
                    <p className="text-xs text-slate-500">AI Confidence</p>
                    <p className="mt-1 text-xl font-black text-white">88%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <OwnerPanel className="owner-animate-in p-5 [animation-delay:120ms]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Operating Signals</p>
                <p className="mt-1 text-xs text-slate-500">AI-generated business pulse</p>
              </div>
              <Activity className="h-5 w-5 text-emerald-200" />
            </div>
            <div className="mt-5 grid gap-3">
              {ownerQuickSignals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-950/45 p-3" key={signal.label}>
                    <Icon className="h-4 w-4 text-emerald-200" />
                    <span className="flex-1 text-xs text-slate-400">{signal.label}</span>
                    <span className="text-sm font-black text-white">{signal.value}</span>
                  </div>
                );
              })}
            </div>
          </OwnerPanel>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpiMetrics.map((metric, index) => (
            <KpiCard index={index} key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="mt-8">
          <SectionHeader
            eyebrow="AI Insights"
            title="Autonomous recommendations"
            description="Insight cards untuk membantu owner mengambil keputusan cepat sebelum performa turun."
            action={
              <StatusPill className="border-violet-300/20 bg-violet-300/10 text-violet-200">
                <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                Confidence weighted
              </StatusPill>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {aiInsights.map((insight, index) => (
              <AiInsightCard index={index} insight={insight} key={insight.title} />
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-12">
          <RevenueAnalytics />
          <ActivityFeed />
          <CrmPipelinePreview />
          <CommunityOverview />
          <TopBranches />
        </section>
      </section>
    </main>
  );
}
