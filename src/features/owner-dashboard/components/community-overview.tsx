import { communityMetrics } from "@/data/owner-dashboard";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";

export function CommunityOverview() {
  return (
    <OwnerPanel className="lg:col-span-5">
      <SectionHeader
        eyebrow="Community Overview"
        title="Owned audience health"
        action={<StatusPill>Referral engine active</StatusPill>}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {communityMetrics.map((metric) => (
          <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4" key={metric.label}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
            <p className="mt-3 text-2xl font-black text-white">{metric.value}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{metric.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-emerald-300/15 bg-emerald-300/10 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-white">Community to booking</span>
          <span className="font-black text-emerald-200">11.7%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-slate-950/60">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" style={{ width: "72%" }} />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Inbound conversion tertinggi berasal dari alumni Ramadhan dan grup kajian keluarga.
        </p>
      </div>
    </OwnerPanel>
  );
}
