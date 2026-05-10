export type KpiTrend = "up" | "down" | "flat";

/** Shared shape for KPI tiles (owner dashboard, main dashboard, etc.). */
export interface KpiCardItem {
  label: string;
  value: string;
  sublabel: string;
  delta: string;
  trend: KpiTrend;
  /** Defaults to "vs bulan lalu". */
  deltaContext?: string;
  /** Optional 0–100 progress toward a target (capacity, quota, etc.). */
  progress?: number;
  /** If set, animates a count-up on mount to this integer (display via id-ID grouping). */
  countUpTo?: number;
}
