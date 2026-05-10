/** Analytics — demo time series & cabang (no backend). */

export interface AnalyticsMonthlyPoint {
  month: string;
  revenueIdr: number;
  leads: number;
  /** Lead → booking conversion % */
  conversionPct: number;
}

export const analyticsMonthly: AnalyticsMonthlyPoint[] = [
  { month: "Jan 26", revenueIdr: 1_420_000_000, leads: 312, conversionPct: 11.2 },
  { month: "Feb 26", revenueIdr: 1_680_000_000, leads: 358, conversionPct: 12.4 },
  { month: "Mar 26", revenueIdr: 2_040_000_000, leads: 402, conversionPct: 13.8 },
  { month: "Apr 26", revenueIdr: 1_910_000_000, leads: 388, conversionPct: 12.9 },
  { month: "Mei 26", revenueIdr: 2_280_000_000, leads: 436, conversionPct: 14.2 },
  { month: "Jun 26", revenueIdr: 2_150_000_000, leads: 410, conversionPct: 13.5 },
  { month: "Jul 26", revenueIdr: 2_420_000_000, leads: 448, conversionPct: 14.6 },
  { month: "Agu 26", revenueIdr: 2_560_000_000, leads: 462, conversionPct: 15.1 },
];

export interface BranchAnalyticsRow {
  id: string;
  branch: string;
  shortLabel: string;
  city: string;
  revenueIdr: number;
  leads: number;
  conversionPct: number;
  bookings: number;
}

export const branchAnalytics: BranchAnalyticsRow[] = [
  {
    id: "b1",
    branch: "Pusat Jakarta",
    shortLabel: "JKT-PST",
    city: "Jakarta",
    revenueIdr: 3_200_000_000,
    leads: 620,
    conversionPct: 14.8,
    bookings: 92,
  },
  {
    id: "b2",
    branch: "Bandung",
    shortLabel: "BDG",
    city: "Bandung",
    revenueIdr: 1_480_000_000,
    leads: 290,
    conversionPct: 12.1,
    bookings: 35,
  },
  {
    id: "b3",
    branch: "Surabaya",
    shortLabel: "SBY",
    city: "Surabaya",
    revenueIdr: 1_960_000_000,
    leads: 340,
    conversionPct: 13.5,
    bookings: 46,
  },
  {
    id: "b4",
    branch: "Medan",
    shortLabel: "MDN",
    city: "Medan",
    revenueIdr: 920_000_000,
    leads: 188,
    conversionPct: 10.6,
    bookings: 20,
  },
  {
    id: "b5",
    branch: "Makassar",
    shortLabel: "MKS",
    city: "Makassar",
    revenueIdr: 740_000_000,
    leads: 156,
    conversionPct: 9.8,
    bookings: 15,
  },
];
