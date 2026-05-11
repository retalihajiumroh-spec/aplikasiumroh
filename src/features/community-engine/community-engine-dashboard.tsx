import { MessageCircleHeart, RadioTower, Sparkles } from "lucide-react";
import {
  aiCommunityInsights,
  automationCards,
  communityOverviewMetrics,
  communityTimeline,
  contentPerformance,
  engagementLeaderboard,
  heatmapByDay,
  heatmapByHour,
  highIntentUsers,
  interactionSpikes,
  whatsAppGroups
} from "@/data/community-engine";
import { AiCommunityInsightsPanel } from "@/features/community-engine/components/ai-community-insights";
import { CommunityMetricCard } from "@/features/community-engine/components/community-metric-card";
import { CommunityTimelineSection } from "@/features/community-engine/components/community-timeline-section";
import { ContentPerformanceSection } from "@/features/community-engine/components/content-performance-section";
import { HeatmapSection } from "@/features/community-engine/components/heatmap-section";
import { HighIntentSection } from "@/features/community-engine/components/high-intent-section";
import { LeaderboardSection } from "@/features/community-engine/components/leaderboard-section";
import { SmartAutomationSection } from "@/features/community-engine/components/smart-automation-section";
import { WhatsAppGroupsSection } from "@/features/community-engine/components/whatsapp-groups-section";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";

export function CommunityEngineDashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[150px]" />
        <div className="absolute right-[-12rem] top-40 h-[36rem] w-[36rem] rounded-full bg-teal-400/15 blur-[140px]" />
        <div className="absolute bottom-[-18rem] left-[-10rem] h-[38rem] w-[38rem] rounded-full bg-lime-300/12 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_55%)]" />
      </div>

      <section className="relative mx-auto max-w-[1560px] px-4 py-10 sm:px-6 lg:px-8 xl:py-14">
        <div className="owner-animate-in rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-emerald-950/35 backdrop-blur-2xl md:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill>
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  SA&apos;YA Umroh Operating System
                </StatusPill>
                <StatusPill className="border-emerald-300/25 bg-emerald-400/10 text-emerald-50">
                  Community Engine
                </StatusPill>
                <StatusPill className="border-cyan-300/25 bg-cyan-400/10 text-cyan-50">
                  WhatsApp growth intelligence
                </StatusPill>
              </div>
              <h1 className="mt-8 text-4xl font-black tracking-[-0.042em] text-white md:text-6xl">
                The invisible conversion machine behind your Umroh community.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Satu permukaan premium untuk membaca emosi komunitas, merasakan lonjakan niat jamaah, dan menggerakkan grup WhatsApp sebagai mesin pertumbuhan —
                tanpa terlihat seperti marketing kasar.
              </p>
            </div>

            <OwnerPanel className="w-full max-w-md shrink-0 border-emerald-300/15 bg-emerald-400/[0.07] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/15 p-3 text-emerald-50">
                  <RadioTower className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Community nervous system</p>
                  <p className="text-xs text-emerald-100/80">Signal → story → action loop aktif</p>
                </div>
                <span className="ml-auto flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_28px_rgba(110,231,183,0.95)]" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-[11px] font-semibold text-slate-400">WA groups wired</p>
                  <p className="mt-2 text-2xl font-black text-white">24</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-[11px] font-semibold text-slate-400">AI confidence</p>
                  <p className="mt-2 text-2xl font-black text-white">91%</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
                <MessageCircleHeart className="h-4 w-4 text-emerald-200" />
                Moderasi manusia tetap mengambil alih percakapan sensitif — otomasi hanya membuka jalan.
              </div>
            </OwnerPanel>
          </div>
        </div>

        <section className="mt-10">
          <SectionHeader
            eyebrow="Community overview"
            title="North star signals"
            description="Angka-angka ini dirancang untuk decision-maker: mana yang sehat, mana yang butuh sentuhan manusia, mana yang siap dikonversi."
            action={<StatusPill>Live snapshot · rolling 24 jam</StatusPill>}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {communityOverviewMetrics.map((metric, index) => (
              <CommunityMetricCard index={index} key={metric.label} metric={metric} />
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-10">
          <WhatsAppGroupsSection groups={whatsAppGroups} />

          <div className="grid gap-6 xl:grid-cols-12">
            <HeatmapSection days={heatmapByDay} hours={heatmapByHour} spikes={interactionSpikes} />
            <LeaderboardSection entries={engagementLeaderboard} />
          </div>

          <HighIntentSection users={highIntentUsers} />
          <ContentPerformanceSection data={contentPerformance} />
          <AiCommunityInsightsPanel insights={aiCommunityInsights} />

          <div className="grid gap-6 xl:grid-cols-12">
            <CommunityTimelineSection events={communityTimeline} />
            <SmartAutomationSection cards={automationCards} />
          </div>
        </section>
      </section>
    </main>
  );
}
