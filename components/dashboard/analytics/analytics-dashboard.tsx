"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analyticsMonthly, branchAnalytics, type AnalyticsMonthlyPoint, type BranchAnalyticsRow } from "@/lib/analytics/dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const grid = "rgba(230, 230, 250, 0.08)";
const axis = "rgba(255, 255, 255, 0.35)";

function MonthlyRevTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: AnalyticsMonthlyPoint }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.month}</p>
      <p className="mt-1 text-zinc-400/90">{formatIdrCompact(row.revenueIdr)}</p>
    </div>
  );
}

function MonthlyLeadsTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: AnalyticsMonthlyPoint }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.month}</p>
      <p className="mt-1 text-zinc-400/90">{row.leads} lead</p>
    </div>
  );
}

function MonthlyConvTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: AnalyticsMonthlyPoint }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.month}</p>
      <p className="mt-1 text-zinc-400/90">Konversi {row.conversionPct.toFixed(1)}%</p>
      <p className="text-zinc-300/70">{row.leads} lead · revenue {formatIdrCompact(row.revenueIdr)}</p>
    </div>
  );
}

function BranchRevTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: BranchAnalyticsRow }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">
        {row.branch} · {row.city}
      </p>
      <p className="mt-1 text-zinc-400/90">{formatIdrCompact(row.revenueIdr)}</p>
      <p className="text-zinc-300/70">
        {row.bookings} booking · {row.leads} lead
      </p>
    </div>
  );
}

function BranchComposedTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: BranchAnalyticsRow }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-500/20 bg-zinc-950/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md">
      <p className="font-medium text-zinc-200">{row.branch}</p>
      <p className="mt-1 text-zinc-400/90">Lead: {row.leads}</p>
      <p className="text-zinc-300/70">Konversi {row.conversionPct.toFixed(1)}%</p>
    </div>
  );
}

export function AnalyticsDashboard() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 16% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 90% 35%, rgba(156, 77, 204, 0.08), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Analytics</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300/55 sm:text-base">
              Tren revenue &amp; lead, tingkat konversi, dan perbandingan antar cabang — data agregat demo.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-zinc-50">Revenue</h2>
            <p className="mt-1 text-sm text-zinc-300/55">Gross paket tercatat per bulan (IDR).</p>
            <div className="mt-5 h-[240px] w-full min-w-0 sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsMonthly} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="analyticsRevFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9C4DCC" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#9C4DCC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
                  <YAxis
                    tickFormatter={(v) => formatIdrCompact(Number(v))}
                    tick={{ fill: axis, fontSize: 9 }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                  />
                  <Tooltip content={<MonthlyRevTooltip />} cursor={{ stroke: "rgba(156, 77, 204, 0.2)" }} />
                  <Area type="monotone" dataKey="revenueIdr" stroke="#9C4DCC" strokeWidth={2} fill="url(#analyticsRevFill)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-zinc-50">Leads</h2>
            <p className="mt-1 text-sm text-zinc-300/55">Lead baru masuk CRM per bulan.</p>
            <div className="mt-5 h-[240px] w-full min-w-0 sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsMonthly} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
                  <YAxis tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip content={<MonthlyLeadsTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
                  <Bar dataKey="leads" name="Leads" fill="rgba(196, 163, 165, 0.7)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-zinc-50">Conversion</h2>
            <p className="mt-1 text-sm text-zinc-300/55">Lead → booking (estimasi agregat).</p>
            <div className="mt-5 h-[240px] w-full min-w-0 sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsMonthly} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    domain={["auto", "auto"]}
                    tick={{ fill: axis, fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip content={<MonthlyConvTooltip />} cursor={{ stroke: "rgba(230, 230, 250, 0.25)" }} />
                  <Line
                    type="monotone"
                    dataKey="conversionPct"
                    name="Konversi"
                    stroke="#fcd34d"
                    strokeWidth={2.5}
                    dot={{ fill: "#fcd34d", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-10"
        >
          <div className="mb-4 border-b border-zinc-600/10 pb-3">
            <h2 className="text-lg font-semibold text-zinc-50">Perbandingan cabang</h2>
            <p className="mt-1 text-sm text-zinc-300/55">Revenue vs volume lead, serta konversi per cabang (periode rolling demo).</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-panel rounded-2xl p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-zinc-200/90">Revenue per cabang</h3>
              <p className="mt-1 text-xs text-zinc-300/50">IDR kotor paket tercatat.</p>
              <div className="mt-5 h-[260px] w-full min-w-0 sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchAnalytics} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                    <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
                    <XAxis dataKey="shortLabel" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                    <YAxis
                      tickFormatter={(v) => formatIdrCompact(Number(v))}
                      tick={{ fill: axis, fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                      width={52}
                    />
                    <Tooltip content={<BranchRevTooltip />} cursor={{ fill: "rgba(156, 77, 204, 0.06)" }} />
                    <Bar dataKey="revenueIdr" name="Revenue" fill="rgba(156, 77, 204, 0.75)" radius={[6, 6, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-zinc-200/90">Lead &amp; konversi per cabang</h3>
              <p className="mt-1 text-xs text-zinc-300/50">Batang: lead · Garis: konversi %.</p>
              <div className="mt-5 h-[260px] w-full min-w-0 sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={branchAnalytics} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                    <CartesianGrid stroke={grid} strokeDasharray="3 6" vertical={false} />
                    <XAxis dataKey="shortLabel" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                    <YAxis yAxisId="left" tick={{ fill: axis, fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fill: axis, fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<BranchComposedTooltip />} />
                    <Legend
                      wrapperStyle={{ fontSize: 11 }}
                      formatter={(value) => (value === "leads" ? "Leads" : "Konversi %")}
                    />
                    <Bar yAxisId="left" dataKey="leads" name="leads" fill="rgba(196, 163, 165, 0.65)" radius={[5, 5, 0, 0]} maxBarSize={36} />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="conversionPct"
                      name="conversionPct"
                      stroke="#fcd34d"
                      strokeWidth={2}
                      dot={{ fill: "#fcd34d", r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
