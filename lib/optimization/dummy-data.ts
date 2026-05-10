/** Optimization — ads performance dummy (no backend). */

export type AdOptStatus = "active" | "paused" | "scaling";

export interface OptimizationAdRow {
  id: string;
  campaign: string;
  creative: string;
  ctrPct: number;
  cplIdr: number;
  /** Return on ad spend (multiplier, e.g. 3.2 = 3.2×). */
  roas: number;
  spendIdr: number;
}

export const optimizationRows: OptimizationAdRow[] = [
  { id: "o1", campaign: "Ramadan Premium · Broad", creative: "Hook emosional · Reels", ctrPct: 2.91, cplIdr: 405_000, roas: 3.4, spendIdr: 11_200_000 },
  { id: "o2", campaign: "Ramadan Premium · Broad", creative: "Manfaat hotel Haram", ctrPct: 1.88, cplIdr: 528_000, roas: 2.0, spendIdr: 7_800_000 },
  { id: "o3", campaign: "Ramadan Premium · Targeted", creative: "Kalkulator DP", ctrPct: 4.28, cplIdr: 268_000, roas: 5.1, spendIdr: 19_400_000 },
  { id: "o4", campaign: "Ramadan Premium · Targeted", creative: "Countdown seat", ctrPct: 3.71, cplIdr: 298_000, roas: 4.4, spendIdr: 13_600_000 },
  { id: "o5", campaign: "Ekonomi Plus · Broad", creative: "Harga transparan", ctrPct: 2.12, cplIdr: 442_000, roas: 2.6, spendIdr: 6_400_000 },
  { id: "o6", campaign: "Ekonomi Plus · Targeted", creative: "Form lead singkat", ctrPct: 3.55, cplIdr: 318_000, roas: 3.9, spendIdr: 10_200_000 },
];

export const optimizationSummary = {
  ctrPct: 3.08,
  cplIdr: 376_500,
  roas: 3.57,
  spendIdr: 68_600_000,
  impressions: 2_180_000,
  conversions: 182,
};
