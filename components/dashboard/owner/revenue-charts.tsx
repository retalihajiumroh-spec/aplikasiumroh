"use client";

import { Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyRevenuePoint } from "@/lib/dashboard/owner-dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const chartColors = {
  grid: "rgba(230, 230, 250, 0.08)",
  axis: "rgba(255, 255, 255, 0.35)",
  revenueStroke: "#9C4DCC",
  conversion: "#a7f3d0",
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
    <div className="rounded-lg border border-purple-400/20 bg-purple-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-purple-100">{row.month}</p>
      <p className="mt-1 text-purple-300/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-purple-200/70">Konversi: {row.conversionPct.toFixed(1)}%</p>
    </div>
  );
}

export function MonthlyRevenueConversionChart({ data }: { data: MonthlyRevenuePoint[] }) {
  return (
    <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="ownerRevFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9C4DCC" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#9C4DCC" stopOpacity={0} />
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
            tick={{ fill: "rgba(230, 230, 250, 0.55)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "rgba(156, 77, 204, 0.25)" }} />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => <span className="text-xs text-purple-200/70">{value}</span>}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="revenueIdr"
            name="Revenue (IDR)"
            stroke={chartColors.revenueStroke}
            strokeWidth={2}
            fill="url(#ownerRevFill)"
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
