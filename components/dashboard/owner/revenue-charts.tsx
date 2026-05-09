"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Cell,
} from "recharts";
import type { BranchRevenueCompare, MonthlyRevenuePoint } from "@/lib/dashboard/owner-dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const chartColors = {
  grid: "rgba(167, 243, 208, 0.08)",
  axis: "rgba(209, 250, 229, 0.35)",
  revenueFill: "rgba(52, 211, 153, 0.35)",
  revenueStroke: "#34d399",
  conversion: "#a7f3d0",
  bar: ["#34d399", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e"],
};

function RevenueTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: MonthlyRevenuePoint }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">{row.month}</p>
      <p className="mt-1 text-emerald-300/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-emerald-200/70">Konversi: {row.conversionPct.toFixed(1)}%</p>
    </div>
  );
}

function BranchTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: BranchRevenueCompare }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-emerald-100">
        {row.branch} · {row.city}
      </p>
      <p className="mt-1 text-emerald-300/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-emerald-200/70">Jamaah closed: {row.jamaahClosed}</p>
    </div>
  );
}

export function MonthlyRevenueConversionChart({ data }: { data: MonthlyRevenuePoint[] }) {
  return (
    <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: chartColors.axis, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => formatIdrCompact(Number(v))}
            tick={{ fill: chartColors.axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[24, "auto"]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: "rgba(167, 243, 208, 0.55)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "rgba(52, 211, 153, 0.25)" }} />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span className="text-xs text-emerald-200/70">{value}</span>
            )}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="revenueIdr"
            name="Revenue (IDR)"
            stroke={chartColors.revenueStroke}
            strokeWidth={2}
            fill="url(#revFill)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="conversionPct"
            name="Conversion rate"
            stroke={chartColors.conversion}
            strokeWidth={2}
            dot={{ r: 3, fill: "#ecfdf5", stroke: chartColors.conversion }}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchRevenueBarChart({ data }: { data: BranchRevenueCompare[] }) {
  return (
    <div className="h-[220px] w-full min-w-0 sm:h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 4 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 6" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => formatIdrCompact(Number(v))}
            tick={{ fill: chartColors.axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="branch"
            width={108}
            tick={{ fill: chartColors.axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<BranchTooltip />} cursor={{ fill: "rgba(52, 211, 153, 0.06)" }} />
          <Bar dataKey="revenueIdr" name="Revenue" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((_, i) => (
              <Cell key={i} fill={chartColors.bar[i % chartColors.bar.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
