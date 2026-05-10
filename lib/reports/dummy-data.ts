/** Reports — financial demo aggregates (no backend). */

export const financialSummary = {
  periodLabel: "YTD · Jan – Agu 2026",
  totalRevenueIdr: 16_820_000_000,
  totalCostIdr: 12_940_000_000,
  grossMarginPct: 23.1,
  netProfitIdr: 2_180_000_000,
  outstandingArIdr: 1_260_000_000,
  cashOnHandIdr: 3_450_000_000,
  bookingsClosed: 842,
  avgTicketIdr: 19_950_000,
};

export interface CashflowRow {
  id: string;
  packageName: string;
  revenueIdr: number;
  costIdr: number;
  marginPct: number;
  pax: number;
}

export const topPackageCashflow: CashflowRow[] = [
  { id: "r1", packageName: "Ramadan Premium 1447H", revenueIdr: 4_920_000_000, costIdr: 3_780_000_000, marginPct: 23.2, pax: 248 },
  { id: "r2", packageName: "Ekonomi Plus Maret", revenueIdr: 2_640_000_000, costIdr: 2_180_000_000, marginPct: 17.4, pax: 312 },
  { id: "r3", packageName: "Premium Plus Mei", revenueIdr: 2_010_000_000, costIdr: 1_520_000_000, marginPct: 24.4, pax: 96 },
  { id: "r4", packageName: "Private Family", revenueIdr: 1_180_000_000, costIdr: 890_000_000, marginPct: 24.6, pax: 42 },
  { id: "r5", packageName: "Corporate / Yayasan", revenueIdr: 890_000_000, costIdr: 710_000_000, marginPct: 20.2, pax: 144 },
];
