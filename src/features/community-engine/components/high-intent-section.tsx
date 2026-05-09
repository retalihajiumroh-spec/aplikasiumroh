import { Flame, Radar } from "lucide-react";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { HighIntentUser } from "@/data/community-engine";

export function HighIntentSection({ users }: { users: HighIntentUser[] }) {
  return (
    <OwnerPanel className="community-animate-in [animation-delay:240ms]">
      <SectionHeader
        eyebrow="Signal extraction"
        title="High intent detection"
        description="AI membaca bahasa natural, perilaku klik, dan konteks diskusi untuk menandai calon jamaah yang layak difollow-up manusia."
        action={
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange-100">
            <Flame className="h-3.5 w-3.5" />
            High intent
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {users.map((user, index) => (
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-orange-300/20 bg-gradient-to-br from-orange-500/15 via-slate-950/70 to-slate-950/40 p-5 shadow-[0_24px_80px_rgba(249,115,22,0.12)]"
            key={user.id}
            style={{ animationDelay: `${260 + index * 70}ms` }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-400/25 blur-3xl" />
            <div className="relative flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-orange-200/80">Detected profile</p>
                  <p className="mt-2 text-lg font-black text-white">{user.name}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Intent score</p>
                  <p className="mt-1 text-2xl font-black text-emerald-200">{user.score}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200/90">
                  <Radar className="h-4 w-4" />
                  Signals captured
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-slate-200">
                  {user.signals.map((signal) => (
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-300" key={signal}>
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-100">Recommended follow-up</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-emerald-50">{user.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OwnerPanel>
  );
}
