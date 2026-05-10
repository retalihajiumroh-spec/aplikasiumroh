export type KpiKey = "jamaah" | "revenue" | "closing" | "activeLeads";

export interface KpiDatum {
  key: KpiKey;
  label: string;
  value: string;
  sublabel: string;
  delta: string;
  trend: "up" | "down" | "flat";
}

export interface MonthlyRevenuePoint {
  month: string;
  revenueIdr: number;
  conversionPct: number;
}

/** Per cabang: performa komersial + engagement operasional. */
export interface BranchPerformanceMetrics {
  branch: string;
  city: string;
  /** Skor komposit 0–100 (revenue + konversi + penutupan). */
  performanceScore: number;
  conversionPct: number;
  revenueIdr: number;
  closedSales: number;
  activeLeads: number;
  /** Engagement CS & komunitas cabang 0–100. */
  engagementScore: number;
  satisfactionPct: number;
  avgResponseMin: number;
  activeThreads: number;
}

export type ActivityFeedKind = "lead" | "payment" | "document" | "booking";

export interface ActivityFeedItem {
  id: string;
  kind: ActivityFeedKind;
  title: string;
  description: string;
  at: string;
  amountIdr?: number;
  meta?: string;
}

export const kpiData: KpiDatum[] = [
  {
    key: "jamaah",
    label: "Total Jamaah",
    value: "2.847",
    sublabel: "terdaftar musim ini",
    delta: "+12,4%",
    trend: "up",
  },
  {
    key: "revenue",
    label: "Revenue",
    value: "Rp 48,2 M",
    sublabel: "YTD gross package",
    delta: "+8,1%",
    trend: "up",
  },
  {
    key: "closing",
    label: "Closing Rate",
    value: "34,6%",
    sublabel: "lead → kontrak",
    delta: "+2,1 pts",
    trend: "up",
  },
  {
    key: "activeLeads",
    label: "Active Leads",
    value: "1.284",
    sublabel: "aktivitas 14 hari terakhir",
    delta: "+5,8%",
    trend: "up",
  },
];

export const monthlyRevenueTrend: MonthlyRevenuePoint[] = [
  { month: "Jan", revenueIdr: 3.2e9, conversionPct: 28.4 },
  { month: "Feb", revenueIdr: 3.6e9, conversionPct: 29.1 },
  { month: "Mar", revenueIdr: 4.1e9, conversionPct: 31.2 },
  { month: "Apr", revenueIdr: 3.9e9, conversionPct: 30.5 },
  { month: "Mei", revenueIdr: 4.8e9, conversionPct: 32.8 },
  { month: "Jun", revenueIdr: 5.2e9, conversionPct: 33.9 },
  { month: "Jul", revenueIdr: 5.6e9, conversionPct: 34.2 },
  { month: "Agu", revenueIdr: 5.1e9, conversionPct: 33.1 },
  { month: "Sep", revenueIdr: 5.9e9, conversionPct: 35.4 },
  { month: "Okt", revenueIdr: 6.3e9, conversionPct: 36.1 },
  { month: "Nov", revenueIdr: 6.8e9, conversionPct: 36.8 },
  { month: "Des", revenueIdr: 7.1e9, conversionPct: 37.2 },
];

export const branchPerformance: BranchPerformanceMetrics[] = [
  {
    branch: "SA'YA Pusat",
    city: "Jakarta",
    performanceScore: 94,
    conversionPct: 38.2,
    revenueIdr: 14.2e9,
    closedSales: 612,
    activeLeads: 412,
    engagementScore: 91,
    satisfactionPct: 96,
    avgResponseMin: 12,
    activeThreads: 428,
  },
  {
    branch: "SA'YA Jawa Barat",
    city: "Bandung",
    performanceScore: 88,
    conversionPct: 34.6,
    revenueIdr: 9.8e9,
    closedSales: 418,
    activeLeads: 268,
    engagementScore: 86,
    satisfactionPct: 93,
    avgResponseMin: 18,
    activeThreads: 301,
  },
  {
    branch: "SA'YA Jatim",
    city: "Surabaya",
    performanceScore: 84,
    conversionPct: 32.9,
    revenueIdr: 8.4e9,
    closedSales: 355,
    activeLeads: 241,
    engagementScore: 82,
    satisfactionPct: 91,
    avgResponseMin: 21,
    activeThreads: 267,
  },
  {
    branch: "SA'YA Sumatera",
    city: "Medan",
    performanceScore: 79,
    conversionPct: 29.4,
    revenueIdr: 6.1e9,
    closedSales: 251,
    activeLeads: 198,
    engagementScore: 74,
    satisfactionPct: 88,
    avgResponseMin: 27,
    activeThreads: 184,
  },
  {
    branch: "SA'YA Sulawesi",
    city: "Makassar",
    performanceScore: 76,
    conversionPct: 27.1,
    revenueIdr: 4.9e9,
    closedSales: 198,
    activeLeads: 165,
    engagementScore: 71,
    satisfactionPct: 86,
    avgResponseMin: 31,
    activeThreads: 142,
  },
];

export const activityFeed: ActivityFeedItem[] = [
  {
    id: "a1",
    kind: "payment",
    title: "Pembayaran lunas",
    description: "Keluarga Pratama · Ramadan Premium 1447H · Jakarta Pusat",
    at: "Baru saja",
    amountIdr: 186_500_000,
    meta: "Virtual account · terverifikasi",
  },
  {
    id: "a2",
    kind: "lead",
    title: "Lead baru · high intent",
    description: "Budi Santoso · klik kalkulator DP + isi form singkat",
    at: "3 menit lalu",
    meta: "Skor AI 88 · sumber: Meta Lead Ads",
  },
  {
    id: "a3",
    kind: "document",
    title: "Dokumen visa lengkap",
    description: "Batch Maret · 12 jamaah · upload paspor & vaksin",
    at: "9 menit lalu",
    meta: "Portal jamaah · cabang Surabaya",
  },
  {
    id: "a4",
    kind: "booking",
    title: "Booking dikonfirmasi",
    description: "Yayasan Al-Ikhlas · 40 pax · kontrak digital ditandatangani",
    at: "22 menit lalu",
    meta: "Tim finance · Pusat",
  },
  {
    id: "a5",
    kind: "payment",
    title: "DP masuk",
    description: "Rina Kusuma · Private family 8 pax · tahap 1",
    at: "38 menit lalu",
    amountIdr: 84_000_000,
    meta: "Transfer bank · auto-match",
  },
  {
    id: "a6",
    kind: "lead",
    title: "Lead portal",
    description: "8 kontak dari landing Bandung · kampanye Google Ads",
    at: "51 menit lalu",
    meta: "UTM: spring-promo-jabar",
  },
  {
    id: "a7",
    kind: "document",
    title: "Kontrak korporat diunggah",
    description: "PT Sejahtera Bersama · legal review selesai",
    at: "1 jam lalu",
    meta: "Drive terenkripsi",
  },
  {
    id: "a8",
    kind: "booking",
    title: "Slot maskapai di-hold",
    description: "Keluarga Hidayat · Ekonomi Plus Maret · Garuda",
    at: "1 jam lalu",
    meta: "Ops · Jawa Barat",
  },
];

export function formatIdrCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  if (abs >= 1e12) return `${sign}Rp ${(abs / 1e12).toFixed(1)} T`;
  if (abs >= 1e9) return `${sign}Rp ${(abs / 1e9).toFixed(1)} M`;
  if (abs >= 1e6) return `${sign}Rp ${(abs / 1e6).toFixed(1)} jt`;
  return (
    sign +
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(abs)
  );
}
