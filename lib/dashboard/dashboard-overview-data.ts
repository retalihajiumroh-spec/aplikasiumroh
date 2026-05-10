import type { KpiCardItem } from "./kpi-card-item";

export interface OverviewMonthlyPoint {
  month: string;
  revenueIdr: number;
  leads: number;
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
    value: "2.847",
    sublabel: "terdaftar musim ini",
    delta: "+12,4%",
    trend: "up",
  },
  {
    label: "Revenue",
    value: "Rp 48,2 M",
    sublabel: "YTD gross package",
    delta: "+8,1%",
    trend: "up",
  },
  {
    label: "Leads Today",
    value: "47",
    sublabel: "kontak baru hari ini",
    delta: "+18%",
    trend: "up",
    deltaContext: "vs rata-rata harian",
  },
  {
    label: "Conversion Rate",
    value: "36,2%",
    sublabel: "lead → kontrak (30 hari)",
    delta: "+1,4 pts",
    trend: "up",
    deltaContext: "vs bulan lalu",
  },
];

export const overviewMonthlySeries: OverviewMonthlyPoint[] = [
  { month: "Jan", revenueIdr: 3.2e9, leads: 382 },
  { month: "Feb", revenueIdr: 3.6e9, leads: 401 },
  { month: "Mar", revenueIdr: 4.1e9, leads: 468 },
  { month: "Apr", revenueIdr: 3.9e9, leads: 442 },
  { month: "Mei", revenueIdr: 4.8e9, leads: 512 },
  { month: "Jun", revenueIdr: 5.2e9, leads: 534 },
  { month: "Jul", revenueIdr: 5.6e9, leads: 558 },
  { month: "Agu", revenueIdr: 5.1e9, leads: 489 },
  { month: "Sep", revenueIdr: 5.9e9, leads: 601 },
  { month: "Okt", revenueIdr: 6.3e9, leads: 624 },
  { month: "Nov", revenueIdr: 6.8e9, leads: 648 },
  { month: "Des", revenueIdr: 7.1e9, leads: 672 },
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
    title: "Lead baru · WhatsApp",
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
