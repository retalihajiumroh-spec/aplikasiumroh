import { branchComparison, monthlyTrends } from "@/data/owner-dashboard";
import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";

function buildLinePath(values: number[], width: number, height: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function RevenueAnalytics() {
  const revenuePath = buildLinePath(
    monthlyTrends.map((point) => point.revenue),
    560,
    210
  );
  const conversionPath = buildLinePath(
    monthlyTrends.map((point) => point.conversion),
    560,
    210
  );
  const maxBranchRevenue = Math.max(...branchComparison.map((branch) => branch.revenue));

  return (
    <OwnerPanel className="lg:col-span-8">
      <SectionHeader
        eyebrow="Revenue Analytics"
        title="Financial command center"
        description="Trend revenue, conversion, dan performa cabang dalam satu cockpit untuk keputusan owner."
        action={<StatusPill>AI forecast +17% next 30 days</StatusPill>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Monthly revenue trend</p>
              <p className="text-xs text-slate-500">Rp Miliar / closing rate overlay</p>
            </div>
            <div className="flex gap-3 text-xs font-semibold">
              <span className="text-emerald-300">Revenue</span>
              <span className="text-sky-300">Conversion</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.16),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.8),rgba(2,6,23,0.9))] p-4">
            <svg className="h-64 w-full" preserveAspectRatio="none" viewBox="0 0 560 240" role="img" aria-label="Revenue and conversion trend chart">
              <defs>
                <linearGradient id="ownerRevenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((line) => (
                <line
                  key={line}
                  stroke="rgba(148,163,184,0.12)"
                  strokeWidth="1"
                  x1="0"
                  x2="560"
                  y1={line * 60 + 18}
                  y2={line * 60 + 18}
                />
              ))}
              <path d={`${revenuePath} L 560 230 L 0 230 Z`} fill="url(#ownerRevenueGradient)" />
              <path className="owner-draw-line" d={revenuePath} fill="none" stroke="#34d399" strokeLinecap="round" strokeWidth="5" />
              <path className="owner-draw-line owner-draw-line-delay" d={conversionPath} fill="none" stroke="#38bdf8" strokeDasharray="10 12" strokeLinecap="round" strokeWidth="3" />
              {monthlyTrends.map((point, index) => (
                <text fill="#94a3b8" fontSize="12" key={point.label} x={(index / (monthlyTrends.length - 1)) * 540 + 4} y="238">
                  {point.label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
          <div className="mb-5">
            <p className="text-sm font-bold text-white">Branch comparison</p>
            <p className="text-xs text-slate-500">Revenue actual vs. target</p>
          </div>
          <div className="grid gap-4">
            {branchComparison.map((branch) => {
              const revenueWidth = (branch.revenue / maxBranchRevenue) * 100;
              const targetWidth = (branch.target / maxBranchRevenue) * 100;

              return (
                <div key={branch.branch}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{branch.branch}</span>
                    <span className="text-slate-500">Rp {branch.revenue.toFixed(1)}M</span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="absolute inset-y-0 left-0 rounded-full bg-emerald-400" style={{ width: `${revenueWidth}%` }} />
                    <div className="absolute inset-y-0 left-0 border-r-2 border-white/70" style={{ width: `${targetWidth}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OwnerPanel>
  );
}
