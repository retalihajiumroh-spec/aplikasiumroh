import { Bookmark, Clapperboard, HeartHandshake, Share2 } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { ContentPerformance } from "@/data/community-engine";

export function ContentPerformanceSection({ data }: { data: ContentPerformance }) {
  return (
    <OwnerPanel className="community-animate-in [animation-delay:280ms]">
      <SectionHeader
        eyebrow="Creative analytics"
        title="Content performance lab"
        description="Temukan format yang membuka percakapan, bukan sekadar views — termasuk getaran emosional audiens."
        action={<StatusPill className="border-fuchsia-300/25 bg-fuchsia-400/10 text-fuchsia-100">Multiformat · WA + reels</StatusPill>}
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-emerald-400/15 via-slate-950/70 to-slate-950/40 p-6 lg:col-span-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/15 p-3 text-emerald-100">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-200/80">Most engaging kajian</p>
              <p className="mt-1 text-lg font-black leading-snug text-white">{data.topKajian.title}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] font-semibold text-slate-400">Reaksi</p>
              <p className="mt-2 text-xl font-black text-white">{data.topKajian.reactions.toLocaleString("id-ID")}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] font-semibold text-slate-400">Simpan</p>
              <p className="mt-2 text-xl font-black text-white">{data.topKajian.saves.toLocaleString("id-ID")}</p>
            </div>
            <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-3">
              <p className="text-[10px] font-semibold text-emerald-100">Lift</p>
              <p className="mt-2 text-xl font-black text-emerald-50">{data.topKajian.lift}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:col-span-7 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <Bookmark className="h-4 w-4 text-cyan-200" />
              Most saved
            </div>
            <p className="mt-4 text-base font-black text-white">{data.topSaved.title}</p>
            <p className="mt-2 text-xs font-semibold text-cyan-100">{data.topSaved.format}</p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500">Total saves</p>
                <p className="mt-1 text-3xl font-black text-white">{data.topSaved.saves.toLocaleString("id-ID")}</p>
              </div>
              <div className="h-14 w-24 rounded-2xl bg-[linear-gradient(135deg,rgba(34,211,238,0.35),transparent)]" />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
              <Clapperboard className="h-4 w-4 text-pink-200" />
              Most shared reels
            </div>
            <p className="mt-4 text-base font-black text-white">{data.topReel.title}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] font-semibold text-slate-400">Shares</p>
                <p className="mt-2 text-2xl font-black text-white">{data.topReel.shares}</p>
              </div>
              <div className="rounded-2xl border border-pink-300/25 bg-pink-400/10 p-3">
                <p className="text-[10px] font-semibold text-pink-100">Completion</p>
                <p className="mt-2 text-2xl font-black text-pink-50">{data.topReel.completionRate}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-violet-300/25 bg-gradient-to-br from-violet-500/20 via-slate-950/80 to-slate-950/50 p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-100">Emotional engagement score</p>
                <p className="mt-2 text-4xl font-black text-white">{data.emotionalScore}</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-violet-100/90">{data.emotionalLabel}</p>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <Share2 className="h-6 w-6 text-violet-200" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">Virality readiness</p>
                  <p className="text-lg font-black text-white">High resonance</p>
                </div>
              </div>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-300 shadow-[0_0_40px_rgba(167,139,250,0.55)]" />
            </div>
          </div>
        </div>
      </div>
    </OwnerPanel>
  );
}
