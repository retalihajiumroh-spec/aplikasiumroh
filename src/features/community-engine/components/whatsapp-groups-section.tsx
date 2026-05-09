import { ArrowDownRight, ArrowUpRight, Bell, Hash, Users } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { WhatsAppGroup } from "@/data/community-engine";
import { cn } from "@/lib/utils";

export function WhatsAppGroupsSection({ groups }: { groups: WhatsAppGroup[] }) {
  return (
    <OwnerPanel className="community-animate-in">
      <SectionHeader
        eyebrow="WhatsApp surfaces"
        title="Group intelligence grid"
        description="Monitor ritme grup, topik hangat, dan isyarat pertumbuhan tanpa menyapu chat manual."
        action={
          <StatusPill className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
            Sync realtime · WA Business API
          </StatusPill>
        }
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {groups.map((group, index) => {
          const TrendIcon = group.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-950/70 to-slate-950/30 p-5 shadow-inner shadow-emerald-950/40 backdrop-blur-xl transition duration-500 hover:border-emerald-300/30"
              key={group.id}
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(52,211,153,0.18),transparent_42%)] opacity-80 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-200/90">
                      <Hash className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-300/70">
                        Owned channel
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-black tracking-tight text-white">{group.name}</h3>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
                      group.trend === "up" ? "bg-emerald-400/10 text-emerald-200" : "bg-rose-400/10 text-rose-200"
                    )}
                  >
                    <TrendIcon className="h-3.5 w-3.5" />
                    {group.growthLabel}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                      <Users className="h-3.5 w-3.5 text-emerald-200" />
                      Members
                    </div>
                    <p className="mt-2 text-xl font-black text-white">{group.members.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-[11px] font-semibold text-slate-400">Engagement</p>
                    <p className="mt-2 text-xl font-black text-white">{group.engagementPct}%</p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300"
                        style={{ width: `${Math.min(100, group.engagementPct)}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 sm:col-span-1">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-100">
                      <Bell className="h-3.5 w-3.5" />
                      Unread pulse
                    </div>
                    <p className="mt-2 text-xl font-black text-white">{group.unreadCount}</p>
                    <p className="mt-1 text-[10px] font-medium text-amber-100/80">Menunggu moderasi ringan</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/5 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200/80">Active topic</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-100">{group.activeTopic}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </OwnerPanel>
  );
}
