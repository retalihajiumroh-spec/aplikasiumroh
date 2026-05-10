export type KpiKey = "jamaah" | "revenue" | "activeLeads" | "closing";

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

/** Per-cabang: konversi, pipeline, penutupan. */
export interface BranchPerformanceMetrics {
  branch: string;
  city: string;
  conversionPct: number;
  activeLeads: number;
  closedSales: number;
  revenueIdr: number;
}

export type AiInsightKind = "high_intent" | "community" | "branch_alert";

export interface AiInsight {
  id: string;
  kind: AiInsightKind;
  title: string;
  summary: string;
  detail: string;
  metricLabel?: string;
  metricValue?: string;
}

export type ActivityFeedKind = "transaction" | "lead_capture" | "update";

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
    key: "activeLeads",
    label: "Active Leads",
    value: "1.284",
    sublabel: "aktivitas 14 hari terakhir",
    delta: "+5,8%",
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
    conversionPct: 38.2,
    activeLeads: 412,
    closedSales: 612,
    revenueIdr: 14.2e9,
  },
  {
    branch: "SA'YA Jawa Barat",
    city: "Bandung",
    conversionPct: 34.6,
    activeLeads: 268,
    closedSales: 418,
    revenueIdr: 9.8e9,
  },
  {
    branch: "SA'YA Jatim",
    city: "Surabaya",
    conversionPct: 32.9,
    activeLeads: 241,
    closedSales: 355,
    revenueIdr: 8.4e9,
  },
  {
    branch: "SA'YA Sumatera",
    city: "Medan",
    conversionPct: 29.4,
    activeLeads: 198,
    closedSales: 251,
    revenueIdr: 6.1e9,
  },
  {
    branch: "SA'YA Sulawesi",
    city: "Makassar",
    conversionPct: 27.1,
    activeLeads: 165,
    closedSales: 198,
    revenueIdr: 4.9e9,
  },
];

export const aiInsights: AiInsight[] = [
  {
    id: "ai-1",
    kind: "high_intent",
    title: "High-intent lead cluster",
    summary: "38 lead memasuki skor ≥ 85 dalam 48 jam — mayoritas dari konten Reels Ramadan.",
    detail:
      "Polanya: klik kalkulator DP + balasan WA < 6 menit. Routing otomatis ke CS Jakarta meningkatkan booking +14% vs rata-rata.",
    metricLabel: "Top skor",
    metricValue: "94",
  },
  {
    id: "ai-2",
    kind: "community",
    title: "Community engagement",
    summary: "Komunitas jamaah aktif naik 6,2% mingguan; thread manasik paling banyak disimpan.",
    detail:
      "Sesi live Q&A pekan ini menghasilkan 214 pertanyaan unik. Saran: pin FAQ ke portal untuk mengurangi beban CS cabang.",
    metricLabel: "Anggota aktif",
    metricValue: "3.840",
  },
  {
    id: "ai-3",
    kind: "branch_alert",
    title: "Alert performa cabang",
    summary: "Medan: konversi turun 1,8 pts vs bulan lalu saat lead naik.",
    detail:
      "Waktu respons rata-rata naik ke 27 menit. Prioritaskan template WA otomatis +1 agen shift sore untuk menutup gap.",
    metricLabel: "Δ konversi",
    metricValue: "−1,8 pts",
  },
];

export const activityFeed: ActivityFeedItem[] = [
  {
    id: "a1",
    kind: "transaction",
    title: "Pelunasan paket",
    description: "Keluarga Pratama · Ramadan Premium 1447H",
    at: "2 menit lalu",
    amountIdr: 186_500_000,
    meta: "Virtual account · terverifikasi",
  },
  {
    id: "a2",
    kind: "lead_capture",
    title: "Auto-capture dari IG Reels",
    description: "12 lead baru dari kampanye #UmrohRamadan — 6 high intent",
    at: "14 menit lalu",
    meta: "Webhook Meta + skor AI",
  },
  {
    id: "a3",
    kind: "transaction",
    title: "DP masuk",
    description: "Yayasan Al-Ikhlas · cicilan tahap 2",
    at: "32 menit lalu",
    amountIdr: 420_000_000,
    meta: "Transfer bank",
  },
  {
    id: "a4",
    kind: "lead_capture",
    title: "Form portal · umroh reguler",
    description: "8 lead dari landing page Bandung — sumber: Google Ads",
    at: "1 jam lalu",
    meta: "UTM: spring-promo-jabar",
  },
  {
    id: "a5",
    kind: "update",
    title: "Sinkronisasi CRM",
    description: "Pipeline diselaraskan dengan WhatsApp Business — 42 kontak",
    at: "2 jam lalu",
    meta: "Sistem",
  },
  {
    id: "a6",
    kind: "transaction",
    title: "Refund parsial",
    description: "Pembatalan 1 pax · batch Maret (sesuai kebijakan)",
    at: "3 jam lalu",
    amountIdr: -12_750_000,
    meta: "Finance disetujui",
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
