export type KpiKey = "jamaah" | "revenue" | "closing" | "leads";

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

export interface BranchRevenueCompare {
  branch: string;
  city: string;
  revenueIdr: number;
  jamaahClosed: number;
}

export interface BranchLeaderboardRow {
  rank: number;
  branch: string;
  city: string;
  score: number;
  engagementScore: number;
  activeThreads: number;
  avgResponseMin: number;
  satisfactionPct: number;
}

export interface ActivityLogItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
  channel: "whatsapp" | "portal" | "branch" | "system";
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
    key: "leads",
    label: "High Intent Leads",
    value: "186",
    sublabel: "skor ≥ 72 (7 hari)",
    delta: "−4,2%",
    trend: "down",
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

export const branchRevenueCompare: BranchRevenueCompare[] = [
  { branch: "SA'YA Pusat", city: "Jakarta", revenueIdr: 14.2e9, jamaahClosed: 612 },
  { branch: "SA'YA Jawa Barat", city: "Bandung", revenueIdr: 9.8e9, jamaahClosed: 418 },
  { branch: "SA'YA Jatim", city: "Surabaya", revenueIdr: 8.4e9, jamaahClosed: 355 },
  { branch: "SA'YA Sumatera", city: "Medan", revenueIdr: 6.1e9, jamaahClosed: 251 },
  { branch: "SA'YA Sulawesi", city: "Makassar", revenueIdr: 4.9e9, jamaahClosed: 198 },
];

export const branchLeaderboard: BranchLeaderboardRow[] = [
  {
    rank: 1,
    branch: "SA'YA Pusat",
    city: "Jakarta",
    score: 94,
    engagementScore: 91,
    activeThreads: 428,
    avgResponseMin: 12,
    satisfactionPct: 96,
  },
  {
    rank: 2,
    branch: "SA'YA Jawa Barat",
    city: "Bandung",
    score: 88,
    engagementScore: 86,
    activeThreads: 301,
    avgResponseMin: 18,
    satisfactionPct: 93,
  },
  {
    rank: 3,
    branch: "SA'YA Jatim",
    city: "Surabaya",
    score: 84,
    engagementScore: 82,
    activeThreads: 267,
    avgResponseMin: 21,
    satisfactionPct: 91,
  },
  {
    rank: 4,
    branch: "SA'YA Sumatera",
    city: "Medan",
    score: 79,
    engagementScore: 74,
    activeThreads: 184,
    avgResponseMin: 27,
    satisfactionPct: 88,
  },
  {
    rank: 5,
    branch: "SA'YA Sulawesi",
    city: "Makassar",
    score: 76,
    engagementScore: 71,
    activeThreads: 142,
    avgResponseMin: 31,
    satisfactionPct: 86,
  },
];

export const communityStats = {
  activeMembers: 3840,
  highIntentInCommunity: 94,
  weeklyGrowthPct: 6.2,
};

export const activityLogs: ActivityLogItem[] = [
  {
    id: "1",
    actor: "Tim CS Jakarta",
    action: "Mengirim paket proposal",
    target: "Keluarga Rahman — Ramadan Premium",
    at: "2 menit lalu",
    channel: "whatsapp",
  },
  {
    id: "2",
    actor: "Portal Jamaah",
    action: "Upload dokumen visa",
    target: "12 jamaah batch Maret",
    at: "18 menit lalu",
    channel: "portal",
  },
  {
    id: "3",
    actor: "Branch Bandung",
    action: "Follow-up high intent",
    target: "Lead H-72 — skor 81",
    at: "42 menit lalu",
    channel: "branch",
  },
  {
    id: "4",
    actor: "Sistem",
    action: "Sinkronisasi saldo DP",
    target: "Rekonsiliasi harian selesai",
    at: "1 jam lalu",
    channel: "system",
  },
  {
    id: "5",
    actor: "Komunitas Umroh ID",
    action: "Moderator menyetujui posting",
    target: "Tips manasik pra-keberangkatan",
    at: "2 jam lalu",
    channel: "portal",
  },
  {
    id: "6",
    actor: "Tim CS Surabaya",
    action: "Jadwalkan konsultasi video",
    target: "4 keluarga calon jamaah",
    at: "3 jam lalu",
    channel: "whatsapp",
  },
];

export function formatIdrCompact(value: number): string {
  if (value >= 1e12) return `Rp ${(value / 1e12).toFixed(1)} T`;
  if (value >= 1e9) return `Rp ${(value / 1e9).toFixed(1)} M`;
  if (value >= 1e6) return `Rp ${(value / 1e6).toFixed(1)} jt`;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
