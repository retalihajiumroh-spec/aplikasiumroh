"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CommunitySegment } from "@/lib/dashboard/premium-dashboard-data";

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
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.name}</p>
      <p className="mt-1 font-mono text-emerald-300/90">{row.value.toLocaleString("id-ID")} pengguna</p>
    </div>
  );
}

export function CommunityOverview({
  segments,
  growth,
}: {
  segments: CommunitySegment[];
  growth: { daily: string; weekly: string; monthly: string; caption: string };
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const total = segments.reduce((a, s) => a + s.value, 0);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">Community overview</h2>
      <p className="mt-1 text-sm text-emerald-200/55">Distribusi engagement dan pertumbuhan komunitas.</p>
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
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-500/55">Total tercatat</p>
          <p className="font-mono text-3xl font-semibold tracking-tight text-emerald-50">{total.toLocaleString("id-ID")}</p>
          <ul className="space-y-2 text-sm">
            {segments.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/10 bg-emerald-950/35 px-3 py-2">
                <span className="flex items-center gap-2 text-emerald-200/80">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.fill }} aria-hidden />
                  {s.name}
                </span>
                <span className="font-mono text-emerald-100/90">{s.value.toLocaleString("id-ID")}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-200/80">Pertumbuhan</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-emerald-500/55">Harian</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-50">{growth.daily}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-500/55">Mingguan</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-50">{growth.weekly}</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-500/55">Bulanan</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-50">{growth.monthly}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-emerald-200/50">{growth.caption}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
