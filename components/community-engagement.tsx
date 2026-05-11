"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { leadEngagementPipeline, type CommunitySegment } from "@/lib/dashboard/premium-dashboard-data";

function CommunityTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: CommunitySegment }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.name}</p>
      <p className="mt-1 font-mono text-zinc-400/90">{row.value.toLocaleString("id-ID")} pengguna</p>
    </div>
  );
}

export function CommunityEngagement({
  segments,
  growth,
}: {
  segments: CommunitySegment[];
  growth: { daily: string; weekly: string; monthly: string; caption: string };
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const total = segments.reduce((a, s) => a + s.value, 0);
  const leadPct = Math.round((leadEngagementPipeline.activeLeads / leadEngagementPipeline.totalLeads) * 1000) / 10;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl border border-zinc-600/10 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-zinc-50">Engagement komunitas</h2>
      <p className="mt-1 text-sm text-slate-400/90">Active, passive, dan engaged — plus pipeline lead aktif.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-center">
        <div className="h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={segments} cx="50%" cy="50%" innerRadius={56} outerRadius={84} paddingAngle={3} dataKey="value" nameKey="name">
                {segments.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} stroke="rgba(6, 78, 59, 0.4)" strokeWidth={1} />
                ))}
              </Pie>
              <Tooltip content={<CommunityTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-600/55">Total tercatat</p>
          <p className="font-mono text-3xl font-semibold tracking-tight text-zinc-50">{total.toLocaleString("id-ID")}</p>
          <ul className="space-y-2 text-sm">
            {segments.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2 rounded-xl border border-zinc-600/10 bg-zinc-950/35 px-3 py-2">
                <span className="flex items-center gap-2 text-zinc-300/80">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.fill }} aria-hidden />
                  {s.name}
                </span>
                <span className="font-mono text-zinc-200/90">{s.value.toLocaleString("id-ID")}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-zinc-600/15 bg-zinc-950/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-600/60">Lead engagement</p>
              <p className="font-mono text-sm font-semibold text-zinc-300/95">{leadPct}%</p>
            </div>
            <p className="mt-1 text-[11px] text-slate-500/90">{leadEngagementPipeline.label}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-950/80 ring-1 ring-zinc-600/15">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400/90 to-zinc-500/85"
                initial={{ width: 0 }}
                animate={inView ? { width: `${Math.min(100, leadPct)}%` } : { width: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mt-2 text-[11px] text-zinc-600/55">
              <span className="font-mono text-zinc-300/85">{leadEngagementPipeline.activeLeads.toLocaleString("id-ID")}</span> aktif · total{" "}
              <span className="font-mono">{leadEngagementPipeline.totalLeads.toLocaleString("id-ID")}</span>
            </p>
          </div>
          <div className="rounded-xl border border-zinc-500/20 bg-zinc-600/10 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-300/80">Pertumbuhan</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-zinc-600/55">Harian</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-50">{growth.daily}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600/55">Mingguan</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-50">{growth.weekly}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600/55">Bulanan</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-zinc-50">{growth.monthly}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500/90">{growth.caption}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
