"use client";

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { OverviewMonthlyPoint } from "@/lib/dashboard/dashboard-overview-data";
import type { FunnelStage, LeadSourceRow } from "@/lib/dashboard/premium-dashboard-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const grid = "rgba(167, 243, 208, 0.08)";
const axis = "rgba(209, 250, 229, 0.35)";

function MonthlyTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: OverviewMonthlyPoint }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.month}</p>
      <p className="mt-1 text-emerald-300/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-emerald-200/70">Jamaah baru: {row.jamaahNew}</p>
      <p className="text-emerald-200/70">Lead: {row.leads}</p>
    </div>
  );
}

function FunnelTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: FunnelStage }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-amber-400/25 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.name}</p>
      <p className="mt-1 font-mono text-amber-200/90">{row.value.toLocaleString("id-ID")}</p>
    </div>
  );
}

function LeadTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: LeadSourceRow }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.source}</p>
      <p className="mt-1 text-emerald-300/90">{row.leads.toLocaleString("id-ID")} lead</p>
    </div>
  );
}

function ChartShell({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">{title}</h2>
      <p className="mt-1 text-sm text-emerald-200/55">{subtitle}</p>
      {children}
    </motion.section>
  );
}

export function MonthlyPerformanceChart({ data }: { data: OverviewMonthlyPoint[] }) {
  return (
    <ChartShell
      title="Performa bulanan"
      subtitle="Revenue (IDR) dan pertumbuhan jamaah baru per bulan."
      delay={0}
    >
      <div className="mt-6 h-[280px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="premRevFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.42} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
            <YAxis
              yAxisId="rev"
              tickFormatter={(v) => formatIdrCompact(Number(v))}
              tick={{ fill: axis, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <YAxis
              yAxisId="jm"
              orientation="right"
              tick={{ fill: axis, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip content={<MonthlyTooltip />} />
            <Area
              yAxisId="rev"
              type="monotone"
              dataKey="revenueIdr"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#premRevFill)"
              name="Revenue"
            />
            <Line
              yAxisId="jm"
              type="monotone"
              dataKey="jamaahNew"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ r: 3, fill: "#fbbf24", strokeWidth: 0 }}
              name="Jamaah"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

export function FunnelInboundChart({ data }: { data: FunnelStage[] }) {
  return (
    <ChartShell
      title="Funnel inbound"
      subtitle="Alur konversi lead → pelunasan (dummy agregat)."
      delay={0.06}
    >
      <div className="mt-6 h-[280px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 12, right: 96, left: 12, bottom: 12 }}>
            <Tooltip content={<FunnelTooltip />} />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList position="right" fill="rgba(209, 250, 229, 0.9)" stroke="none" dataKey="name" offset={8} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

export function LeadSourceChart({ data }: { data: LeadSourceRow[] }) {
  return (
    <ChartShell title="Sumber lead" subtitle="Top channel akuisisi (dummy 30 hari)." delay={0.12}>
      <div className="mt-6 h-[280px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
            <CartesianGrid stroke={grid} strokeDasharray="3 6" horizontal={false} />
            <XAxis type="number" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="source"
              width={112}
              tick={{ fill: axis, fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<LeadTooltip />} cursor={{ fill: "rgba(251, 191, 36, 0.06)" }} />
            <Bar dataKey="leads" name="Leads" radius={[0, 8, 8, 0]} maxBarSize={22} fill="rgba(45, 212, 191, 0.75)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

export function PerformanceChartsGrid({
  monthly,
  funnel,
  leadSources,
}: {
  monthly: OverviewMonthlyPoint[];
  funnel: FunnelStage[];
  leadSources: LeadSourceRow[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <MonthlyPerformanceChart data={monthly} />
      <FunnelInboundChart data={funnel} />
      <LeadSourceChart data={leadSources} />
    </div>
  );
}
