import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { TimelineEvent } from "@/data/community-engine";

export function CommunityTimelineSection({ events }: { events: TimelineEvent[] }) {
  return (
    <OwnerPanel className="community-animate-in xl:col-span-5 [animation-delay:340ms]">
      <SectionHeader
        eyebrow="Living pulse"
        title="Community timeline"
        description="Gelombang interaksi terbaru — dari reaksi cepat hingga percakapan privat yang membuka peluang closing."
        action={<StatusPill className="border-lime-300/25 bg-lime-400/10 text-lime-100">Realtime · simulated feed</StatusPill>}
      />

      <div className="relative grid gap-4">
        <div className="pointer-events-none absolute bottom-10 left-6 top-10 w-px bg-gradient-to-b from-emerald-300/70 via-white/10 to-transparent" />
        {events.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="community-animate-in relative flex gap-4"
              key={item.id}
              style={{ animationDelay: `${360 + index * 70}ms` }}
            >
              <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/15 text-emerald-100 shadow-[0_12px_40px_rgba(16,185,129,0.25)]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200">{item.type}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{item.time}</span>
                </div>
                <p className="mt-3 text-sm font-bold text-white">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </OwnerPanel>
  );
}
