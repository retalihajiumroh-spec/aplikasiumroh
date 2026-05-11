"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BranchPerformanceMetrics } from "@/lib/dashboard/owner-dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const grid = "rgba(230, 230, 250, 0.08)";
const axis = "rgba(255, 255, 255, 0.35)";
const barColors = ["#9C4DCC", "#27272a", "#800000", "#4A148C", "#2C3E50"];

function ConversionTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BranchPerformanceMetrics }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">
        {row.branch} · {row.city}
      </p>
      <p className="mt-1 text-zinc-400/90">Konversi: {row.conversionPct.toFixed(1)}%</p>
      <p className="text-zinc-300/70">
        Skor performa: {row.performanceScore} · Revenue: {formatIdrCompact(row.revenueIdr)}
      </p>
    </div>
  );
}

function PerformanceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BranchPerformanceMetrics }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.branch}</p>
      <p className="mt-1 text-zinc-400/90">Skor komposit: {row.performanceScore}/100</p>
      <p className="text-zinc-300/70">
        Jamaah closed: {row.closedSales} · Lead aktif: {row.activeLeads}
      </p>
    </div>
  );
}

function EngagementTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BranchPerformanceMetrics & { short: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.branch}</p>
      <p className="mt-1 text-zinc-400/90">
        Engagement: {row.engagementScore} · Kepuasan: {row.satisfactionPct}%
      </p>
      <p className="text-zinc-300/70">
        Avg respons: {row.avgResponseMin} m · Threads aktif: {row.activeThreads}
      </p>
    </div>
  );
}

export function BranchConversionChart({ data }: { data: BranchPerformanceMetrics[] }) {
  return (
    <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 6" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, "auto"]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="city"
            width={72}
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ConversionTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
          <Bar dataKey="conversionPct" name="Konversi %" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={barColors[i % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchPerformanceScoreChart({ data }: { data: BranchPerformanceMetrics[] }) {
  return (
    <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 6" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}`}
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="city"
            width={72}
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<PerformanceTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
          <Bar dataKey="performanceScore" name="Skor performa" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={barColors[i % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchEngagementChart({ data }: { data: BranchPerformanceMetrics[] }) {
  const chartData = data.map((d) => ({ ...d, short: d.city }));
  return (
    <div className="h-[260px] w-full min-w-0 sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="short"
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip content={<EngagementTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
          <Legend
            wrapperStyle={{ paddingTop: 12 }}
            formatter={(value) => <span className="text-xs text-zinc-300/70">{value}</span>}
          />
          <Bar dataKey="engagementScore" name="Skor engagement" fill="rgba(156, 77, 204, 0.55)" radius={[4, 4, 0, 0]} maxBarSize={26} />
          <Bar dataKey="satisfactionPct" name="Kepuasan %" fill="rgba(230, 230, 250, 0.4)" radius={[4, 4, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
