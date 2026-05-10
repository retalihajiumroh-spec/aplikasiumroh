"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import type { OverviewMonthlyPoint } from "@/lib/dashboard/dashboard-overview-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const grid = "rgba(230, 230, 250, 0.08)";
const axis = "rgba(255, 255, 255, 0.35)";

function RevenueTooltip({
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
      <p className="text-purple-200/70">Lead: {row.leads}</p>
    </div>
  );
}

function LeadsTooltip({
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
      <p className="mt-1 text-purple-300/90">{row.leads} lead</p>
    </div>
  );
}

export function OverviewCharts({ data }: { data: OverviewMonthlyPoint[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel rounded-2xl p-5 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-purple-50">Revenue trend</h2>
        <p className="mt-1 text-sm text-purple-200/55">Gross package bulanan (IDR).</p>
        <div className="mt-6 h-[260px] w-full min-w-0 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="dashMainRevFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9C4DCC" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#9C4DCC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis
                tickFormatter={(v) => formatIdrCompact(Number(v))}
                tick={{ fill: axis, fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<RevenueTooltip />} cursor={{ stroke: "rgba(156, 77, 204, 0.2)" }} />
              <Area
                type="monotone"
                dataKey="revenueIdr"
                stroke="#9C4DCC"
                strokeWidth={2}
                fill="url(#dashMainRevFill)"
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06 }}
        className="glass-panel rounded-2xl p-5 sm:p-6"
      >
        <h2 className="text-lg font-semibold text-purple-50">Leads trend</h2>
        <p className="mt-1 text-sm text-purple-200/55">Jumlah lead baru tercatat per bulan.</p>
        <div className="mt-6 h-[260px] w-full min-w-0 sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<LeadsTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
              <Bar dataKey="leads" name="Leads" fill="rgba(196, 163, 165, 0.65)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>
    </div>
  );
}
