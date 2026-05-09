"use client";

import { motion } from "framer-motion";
import type { ActivityLogItem } from "@/lib/dashboard/owner-dummy-data";

const channelStyles: Record<
  ActivityLogItem["channel"],
  { label: string; className: string }
> = {
  whatsapp: {
    label: "WA",
    className: "border-emerald-400/25 bg-emerald-500/15 text-emerald-200",
  },
  portal: {
    label: "Portal",
    className: "border-teal-400/25 bg-teal-500/15 text-teal-100",
  },
  branch: {
    label: "Cabang",
    className: "border-cyan-400/25 bg-cyan-500/10 text-cyan-100",
  },
  system: {
    label: "Sistem",
    className: "border-white/10 bg-white/5 text-emerald-100/80",
  },
};

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "?";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export function CommunityOverview({
  activeMembers,
  highIntentInCommunity,
  weeklyGrowthPct,
  logs,
}: {
  activeMembers: number;
  highIntentInCommunity: number;
  weeklyGrowthPct: number;
  logs: ActivityLogItem[];
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl p-5 sm:p-7"
    >
      <h2 className="text-lg font-semibold tracking-tight text-emerald-50">
        Community overview
      </h2>
      <p className="mt-1 text-sm text-emerald-200/55">
        Anggota aktif, pipeline komunitas, dan aktivitas terbaru di ekosistem SA&apos;YA.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">
            Anggota komunitas aktif
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold text-emerald-50">
            {activeMembers.toLocaleString("id-ID")}
          </p>
          <p className="mt-1 text-xs text-emerald-300/60">
            +{weeklyGrowthPct.toFixed(1)}% minggu ini · WA groups + forum portal
          </p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">
            High intent di komunitas
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold text-emerald-50">
            {highIntentInCommunity}
          </p>
          <p className="mt-1 text-xs text-emerald-300/60">
            Skor perilaku ≥ 72 · prioritas routing ke CS cabang
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
          Latest activity
        </p>
        <ul className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
          {logs.map((log, i) => (
            <motion.li
              key={log.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.28 + i * 0.04 }}
              className="glass-card flex gap-3 rounded-xl p-3"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 font-mono text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/20"
                aria-hidden
              >
                {initials(log.actor)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium text-emerald-50">
                    {log.actor}
                  </span>
                  <span
                    className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${channelStyles[log.channel].className}`}
                  >
                    {channelStyles[log.channel].label}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-emerald-100/85">
                  <span className="text-emerald-300/70">{log.action}</span>{" "}
                  <span className="text-emerald-200/55">· {log.target}</span>
                </p>
                <p className="mt-1 text-xs text-emerald-400/55">{log.at}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
