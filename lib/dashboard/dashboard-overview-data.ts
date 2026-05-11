import type { KpiCardItem } from "./kpi-card-item";

export interface OverviewMonthlyPoint {
  month: string;
  revenueIdr: number;
  leads: number;
  /** Jamaah baru tercatat per bulan (dummy). */
  jamaahNew: number;
  /** Conversion lead → booking % (dummy). */
  conversionPct: number;
}

export type OverviewActivityKind = "lead" | "payment" | "document" | "booking";

export interface OverviewActivityItem {
  id: string;
  kind: OverviewActivityKind;
  title: string;
  description: string;
  at: string;
  amountIdr?: number;
  meta?: string;
}

export const overviewKpis: KpiCardItem[] = [
  {
    label: "Total Jamaah",
    value: "1.248",
    sublabel: "terdaftar aktif musim ini",
    delta: "+12,4%",
    trend: "up",
    deltaContext: "vs musim lalu",
    progress: 78,
    countUpTo: 1248,
  },
  {
    label: "Total Leads",
    value: "3.742",
    sublabel: "pipeline 30 hari terakhir",
    delta: "+8,6%",
    trend: "up",
    deltaContext: "vs bulan lalu",
    progress: 62,
    countUpTo: 3742,
  },
  {
    label: "Total Revenue",
    value: "Rp 8,74 M",
    sublabel: "MTD gross package",
    delta: "+11,2%",
    trend: "up",
    deltaContext: "vs target bulanan",
    progress: 88,
  },
  {
    label: "Engagement Rate",
    value: "68,4%",
    sublabel: "balasan & konten interaktif",
    delta: "+2,1 pts",
    trend: "up",
    deltaContext: "vs bulan lalu",
    progress: 68,
  },
];

export const overviewMonthlySeries: OverviewMonthlyPoint[] = [
  { month: "Jul", revenueIdr: 5.6e9, leads: 558, jamaahNew: 172, conversionPct: 33.2 },
  { month: "Agu", revenueIdr: 5.1e9, leads: 489, jamaahNew: 151, conversionPct: 32.4 },
  { month: "Sep", revenueIdr: 5.9e9, leads: 601, jamaahNew: 178, conversionPct: 34.1 },
  { month: "Okt", revenueIdr: 6.3e9, leads: 624, jamaahNew: 186, conversionPct: 35.0 },
  { month: "Nov", revenueIdr: 6.8e9, leads: 648, jamaahNew: 194, conversionPct: 35.6 },
  { month: "Des", revenueIdr: 7.1e9, leads: 672, jamaahNew: 202, conversionPct: 36.2 },
];

export const overviewActivity: OverviewActivityItem[] = [
  {
    id: "o1",
    kind: "payment",
    title: "Pembayaran diterima",
    description: "Keluarga Wijaya · Ramadan Premium · VA terotorisasi",
    at: "3 menit lalu",
    amountIdr: 62_000_000,
    meta: "Jakarta Pusat",
  },
  {
    id: "o2",
    kind: "lead",
    title: "Lead dari Instagram Ads",
    description: "Sari Dewi · konsultasi paket premium",
    at: "8 menit lalu",
    meta: "Skor intent 84",
  },
  {
    id: "o3",
    kind: "booking",
    title: "Booking dikonfirmasi",
    description: "PT Mulia Sejahtera · 24 pax · April",
    at: "24 menit lalu",
    meta: "E-sign selesai",
  },
  {
    id: "o4",
    kind: "document",
    title: "Unggahan dokumen",
    description: "Batch Maret · paspor & vaksin · 6 jamaah",
    at: "41 menit lalu",
    meta: "Validasi AI",
  },
  {
    id: "o5",
    kind: "lead",
    title: "Lead Facebook Ads (kampanye Ramadan)",
    description: "11 kontak baru · Surabaya",
    at: "1 jam lalu",
    meta: "UTM: ramadan-early",
  },
  {
    id: "o6",
    kind: "payment",
    title: "Pelunasan",
    description: "Hendra Kusuma · Ekonomi Plus · transfer bank",
    at: "2 jam lalu",
    amountIdr: 94_500_000,
    meta: "Medan",
  },
];
