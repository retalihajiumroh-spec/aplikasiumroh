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

const grid = "rgba(167, 243, 208, 0.08)";
const axis = "rgba(209, 250, 229, 0.35)";
const convColors = ["#34d399", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e"];

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
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">
        {row.branch} · {row.city}
      </p>
      <p className="mt-1 text-emerald-300/90">Konversi: {row.conversionPct.toFixed(1)}%</p>
      <p className="text-emerald-200/70">
        Lead aktif: {row.activeLeads} · Penutupan: {row.closedSales}
      </p>
    </div>
  );
}

function LeadSalesTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BranchPerformanceMetrics & { short: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.branch}</p>
      <p className="mt-1 text-emerald-300/90">{formatIdrCompact(row.revenueIdr)} revenue YTD</p>
      <p className="text-emerald-200/70">
        Lead aktif: {row.activeLeads} · Jamaah closed: {row.closedSales}
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
          <Tooltip content={<ConversionTooltip />} cursor={{ fill: "rgba(52, 211, 153, 0.06)" }} />
          <Bar dataKey="conversionPct" name="Konversi" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={convColors[i % convColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchLeadSalesChart({ data }: { data: BranchPerformanceMetrics[] }) {
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
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<LeadSalesTooltip />} cursor={{ fill: "rgba(52, 211, 153, 0.06)" }} />
          <Legend
            wrapperStyle={{ paddingTop: 12 }}
            formatter={(value) => <span className="text-xs text-emerald-200/70">{value}</span>}
          />
          <Bar dataKey="activeLeads" name="Lead aktif" fill="rgba(52, 211, 153, 0.55)" radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar dataKey="closedSales" name="Penutupan (jamaah)" fill="rgba(167, 243, 208, 0.35)" radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
