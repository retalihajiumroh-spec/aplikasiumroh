import { activityFeed } from "@/data/owner-dashboard";
import { OwnerPanel, SectionHeader } from "@/features/owner-dashboard/components/owner-panel";

export function ActivityFeed() {
  return (
    <OwnerPanel className="lg:col-span-4">
      <SectionHeader eyebrow="Realtime Activity" title="Live operating feed" />
      <div className="relative grid gap-4">
        <div className="absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-emerald-300/60 via-white/10 to-transparent" />
        {activityFeed.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="owner-animate-in relative flex gap-4"
              key={`${item.type}-${item.time}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <Icon className="h-4 w-4" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-300">
                    {item.type}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{item.time}</span>
                </div>
                <p className="mt-3 text-sm font-bold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </OwnerPanel>
  );
}
