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
import { useMemo, useRef } from "react";
import type { OverviewMonthlyPoint } from "@/lib/dashboard/dashboard-overview-data";
import type { FunnelStage, LeadSourceRow } from "@/lib/dashboard/premium-dashboard-data";
import { funnelConversionPercents } from "@/lib/dashboard/premium-dashboard-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const grid = "rgba(230, 230, 250, 0.08)";
const axis = "rgba(255, 255, 255, 0.35)";

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
    <div className="rounded-lg border border-purple-400/20 bg-purple-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-purple-100">{row.month}</p>
      <p className="mt-1 text-purple-300/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-purple-200/70">Jamaah baru: {row.jamaahNew}</p>
      <p className="text-purple-200/70">Lead: {row.leads}</p>
      <p className="text-violet-200/85">Konversi lead: {row.conversionPct}%</p>
    </div>
  );
}

function FunnelTooltip({
  active,
  payload,
  conversion,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: FunnelStage }>;
  conversion: { name: string; value: number; pctOfPrevious: number }[];
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const c = conversion.find((x) => x.name === row.name);
  return (
    <div className="rounded-lg border border-violet-400/25 bg-purple-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-purple-100">{row.name}</p>
      <p className="mt-1 font-mono text-violet-200/90">{row.value.toLocaleString("id-ID")}</p>
      {c && c.pctOfPrevious < 100 ? (
        <p className="mt-1 text-purple-200/70">dari tahap sebelumnya: {c.pctOfPrevious}%</p>
      ) : (
        <p className="mt-1 text-purple-200/70">basis funnel</p>
      )}
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
    <div className="rounded-lg border border-purple-400/20 bg-purple-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-purple-100">{row.source}</p>
      <p className="mt-1 text-purple-300/90">{row.leads.toLocaleString("id-ID")} lead</p>
      <p className="text-violet-200/85">{row.pct}% dari total</p>
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
      className="glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-purple-50">{title}</h2>
      <p className="mt-1 text-sm text-slate-400/90">{subtitle}</p>
      {children}
    </motion.section>
  );
}

export function MonthlyPerformanceChart({ data }: { data: OverviewMonthlyPoint[] }) {
  const last6 = useMemo(() => (data.length > 6 ? data.slice(-6) : data), [data]);

  return (
    <ChartShell
      title="Performa 6 bulan"
      subtitle="Trend revenue, jamaah baru, dan tingkat konversi lead per bulan."
      delay={0}
    >
      <div className="mt-6 h-[240px] w-full min-w-0 sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={last6} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="premRevFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9C4DCC" stopOpacity={0.42} />
                <stop offset="100%" stopColor="#9C4DCC" stopOpacity={0} />
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
              stroke="#9C4DCC"
              strokeWidth={2}
              fill="url(#premRevFill)"
              name="Revenue"
            />
            <Line
              yAxisId="jm"
              type="monotone"
              dataKey="jamaahNew"
              stroke="#C4A3A5"
              strokeWidth={2}
              dot={{ r: 3, fill: "#C4A3A5", strokeWidth: 0 }}
              name="Jamaah"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-500/80">Batang bawah: konversi lead → booking (%)</p>
      <div className="mt-4 h-[72px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last6} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 9 }} axisLine={false} tickLine={false} width={28} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<MonthlyTooltip />} />
            <Bar dataKey="conversionPct" fill="rgba(196, 163, 165, 0.45)" radius={[4, 4, 0, 0]} maxBarSize={28} name="Konversi" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartShell>
  );
}

export function FunnelInboundChart({ data }: { data: FunnelStage[] }) {
  const conversion = useMemo(() => funnelConversionPercents(data), [data]);

  return (
    <ChartShell
      title="Funnel inbound"
      subtitle="Leads → Contacted → Interested → Booking → Paid dengan % dari tahap sebelumnya."
      delay={0.06}
    >
      <div className="mt-6 h-[260px] w-full min-w-0 sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 12, right: 96, left: 12, bottom: 12 }}>
            <Tooltip content={(props) => <FunnelTooltip {...props} conversion={conversion} />} />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList position="right" fill="rgba(255, 255, 255, 0.9)" stroke="none" dataKey="name" offset={8} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {conversion.map((c, i) => (
          <span
            key={c.name}
            className="rounded-lg border border-purple-500/15 bg-purple-950/50 px-2.5 py-1 text-[11px] text-purple-200/85"
          >
            <span className="font-semibold text-purple-100/95">{c.name}</span>
            {i > 0 ? (
              <span className="text-violet-200/90"> · {c.pctOfPrevious}% dari sebelumnya</span>
            ) : (
              <span className="text-purple-500/60"> · {c.value.toLocaleString("id-ID")} lead</span>
            )}
          </span>
        ))}
      </div>
    </ChartShell>
  );
}

export function LeadSourceChart({ data }: { data: LeadSourceRow[] }) {
  return (
    <ChartShell title="Performa per kanal" subtitle="Top channel leads dengan porsi persentase." delay={0.12}>
      <div className="mt-6 h-[280px] w-full min-w-0 sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 28, left: 8, bottom: 0 }}>
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
            <Tooltip content={<LeadTooltip />} cursor={{ fill: "rgba(230, 230, 250, 0.06)" }} />
            <Bar dataKey="leads" name="Leads" radius={[0, 8, 8, 0]} maxBarSize={22} fill="rgba(196, 163, 165, 0.75)">
              <LabelList
                dataKey="pct"
                position="right"
                fill="rgba(251, 191, 136, 0.95)"
                fontSize={11}
                formatter={(v: number) => `${v}%`}
              />
            </Bar>
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
