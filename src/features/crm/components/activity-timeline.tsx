import { crmTimeline } from "@/data/crm-dashboard";
import { CrmPanel, CrmSectionHeader } from "@/features/crm/components/crm-shell";

export function ActivityTimeline() {
  return (
    <CrmPanel className="p-5">
      <CrmSectionHeader eyebrow="Activity Timeline" title="Live CRM pulse" />
      <div className="relative grid gap-4">
        <div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-emerald-300/70 via-white/10 to-transparent" />
        {crmTimeline.map((event, index) => {
          const Icon = event.icon;

          return (
            <div className="owner-animate-in relative flex gap-4" key={event.title} style={{ animationDelay: `${index * 90}ms` }}>
              <div className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <Icon className="h-4 w-4" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm font-black text-white">{event.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{event.detail}</p>
                <p className="mt-2 text-[11px] font-bold text-slate-500">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CrmPanel>
  );
}
