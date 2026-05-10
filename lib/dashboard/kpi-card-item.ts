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
}
