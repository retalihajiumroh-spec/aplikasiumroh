import type { KpiCardItem } from "./kpi-card-item";

export interface OverviewMonthlyPoint {
  month: string;
  revenueIdr: number;
  leads: number;
  /** Jamaah baru tercatat per bulan (dummy). */
  jamaahNew: number;
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
    sublabel: "kapasitas musim 78%",
    delta: "+12,4%",
    trend: "up",
    deltaContext: "vs musim lalu",
    progress: 78,
  },
  {
    label: "Total Leads",
    value: "4.280",
    sublabel: "pipeline aktif 30 hari",
    delta: "+9,2%",
    trend: "up",
    deltaContext: "vs bulan lalu",
    progress: 64,
  },
  {
    label: "Pengguna Komunitas Aktif",
    value: "3.210",
    sublabel: "WA + portal engagement",
    delta: "+6,8%",
    trend: "up",
    deltaContext: "rolling 14 hari",
    progress: 71,
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
  {
    label: "Revenue",
    value: "Rp 8,74 M",
    sublabel: "MTD gross package",
    delta: "+11,2%",
    trend: "up",
    deltaContext: "vs target bulanan",
    progress: 88,
  },
  {
    label: "Target Revenue",
    value: "Rp 9,90 M",
    sublabel: "quota MTD cabang gabungan",
    delta: "88%",
    trend: "up",
    deltaContext: "pencapaian quota",
    progress: 88,
  },
];

export const overviewMonthlySeries: OverviewMonthlyPoint[] = [
  { month: "Jan", revenueIdr: 3.2e9, leads: 382, jamaahNew: 118 },
  { month: "Feb", revenueIdr: 3.6e9, leads: 401, jamaahNew: 124 },
  { month: "Mar", revenueIdr: 4.1e9, leads: 468, jamaahNew: 142 },
  { month: "Apr", revenueIdr: 3.9e9, leads: 442, jamaahNew: 136 },
  { month: "Mei", revenueIdr: 4.8e9, leads: 512, jamaahNew: 158 },
  { month: "Jun", revenueIdr: 5.2e9, leads: 534, jamaahNew: 164 },
  { month: "Jul", revenueIdr: 5.6e9, leads: 558, jamaahNew: 172 },
  { month: "Agu", revenueIdr: 5.1e9, leads: 489, jamaahNew: 151 },
  { month: "Sep", revenueIdr: 5.9e9, leads: 601, jamaahNew: 178 },
  { month: "Okt", revenueIdr: 6.3e9, leads: 624, jamaahNew: 186 },
  { month: "Nov", revenueIdr: 6.8e9, leads: 648, jamaahNew: 194 },
  { month: "Des", revenueIdr: 7.1e9, leads: 672, jamaahNew: 202 },
];

export const overviewActivity: OverviewActivityItem[] = [
  {
    id: "o1",
    kind: "payment",
    title: "DP masuk",
    description: "Keluarga Wijaya · Ramadan Premium · Jakarta",
    at: "3 menit lalu",
    amountIdr: 62_000_000,
    meta: "VA terotorisasi",
  },
  {
    id: "o2",
    kind: "lead",
    title: "Leads baru dari Instagram Ads",
    description: "Sari Dewi · bertanya jadwal konsultasi",
    at: "8 menit lalu",
    meta: "Auto-rute ke CS Bandung",
  },
  {
    id: "o3",
    kind: "booking",
    title: "Kontrak ditandatangani",
    description: "PT Mulia Sejahtera · 24 pax · April",
    at: "24 menit lalu",
    meta: "E-sign selesai",
  },
  {
    id: "o4",
    kind: "document",
    title: "Paspor diunggah",
    description: "Batch Maret · 6 jamaah",
    at: "41 menit lalu",
    meta: "Portal · validasi AI",
  },
  {
    id: "o5",
    kind: "lead",
    title: "Form website",
    description: "11 lead dari kampanye Meta · Surabaya",
    at: "1 jam lalu",
    meta: "UTM: ramadan-early",
  },
  {
    id: "o6",
    kind: "payment",
    title: "Pelunasan",
    description: "Hendra Kusuma · Ekonomi Plus",
    at: "2 jam lalu",
    amountIdr: 94_500_000,
    meta: "Transfer bank",
  },
];
