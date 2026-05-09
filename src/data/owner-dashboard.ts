import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BellRing,
  Bot,
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  FileUp,
  MessageCircle,
  RadioTower,
  Sparkles,
  Target,
  UsersRound,
  WalletCards
} from "lucide-react";

export type KpiMetric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  description: string;
  icon: LucideIcon;
};

export type AiInsight = {
  title: string;
  description: string;
  impact: string;
  tone: "positive" | "warning" | "neutral" | "urgent";
  icon: LucideIcon;
};

export type TrendPoint = {
  label: string;
  revenue: number;
  conversion: number;
};

export type BranchComparison = {
  branch: string;
  revenue: number;
  target: number;
};

export type PipelineStage = {
  stage: "New" | "Contacted" | "Interested" | "Booking" | "Paid";
  count: number;
  value: string;
  leads: string[];
  accent: string;
};

export type CommunityMetric = {
  label: string;
  value: string;
  detail: string;
};

export type ActivityItem = {
  type: string;
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
};

export type BranchLeaderboard = {
  branch: string;
  city: string;
  score: number;
  revenue: string;
  conversion: string;
  growth: string;
};

export const kpiMetrics: KpiMetric[] = [
  {
    label: "Total Jamaah",
    value: "4,812",
    delta: "+12.4%",
    trend: "up",
    description: "vs. 30 hari terakhir",
    icon: UsersRound
  },
  {
    label: "Revenue",
    value: "Rp 18.7M",
    delta: "+21.8%",
    trend: "up",
    description: "gross booking value",
    icon: CircleDollarSign
  },
  {
    label: "Active Leads",
    value: "1,248",
    delta: "+8.9%",
    trend: "up",
    description: "lead hangat minggu ini",
    icon: Target
  },
  {
    label: "Closing Rate",
    value: "34.6%",
    delta: "-2.1%",
    trend: "down",
    description: "butuh follow-up SLA",
    icon: CheckCircle2
  }
];

export const aiInsights: AiInsight[] = [
  {
    title: "High intent users increased 18%",
    description: "AI mendeteksi lonjakan pencarian paket Ramadhan premium dari Jakarta Selatan.",
    impact: "Prioritaskan 96 lead dengan skor niat beli di atas 82.",
    tone: "positive",
    icon: Sparkles
  },
  {
    title: "Cabang Bandung conversion dropping",
    description: "Conversion turun dari 31% ke 24% setelah waktu respons WA melewati 22 menit.",
    impact: "Aktifkan reminder follow-up dan review script konsultasi.",
    tone: "urgent",
    icon: BellRing
  },
  {
    title: "Community engagement rising",
    description: "Grup alumni dan kajian manasik menghasilkan 412 interaksi baru minggu ini.",
    impact: "Dorong referral campaign untuk paket keluarga.",
    tone: "positive",
    icon: RadioTower
  },
  {
    title: "Follow-up response slowing",
    description: "Median respons sales naik ke 17 menit pada jam 19.00-22.00.",
    impact: "Tambah rotasi agent malam untuk cabang Surabaya dan Bekasi.",
    tone: "warning",
    icon: CalendarClock
  }
];

export const monthlyTrends: TrendPoint[] = [
  { label: "Jan", revenue: 9.2, conversion: 24 },
  { label: "Feb", revenue: 10.8, conversion: 27 },
  { label: "Mar", revenue: 12.6, conversion: 30 },
  { label: "Apr", revenue: 13.4, conversion: 29 },
  { label: "Mei", revenue: 15.9, conversion: 33 },
  { label: "Jun", revenue: 18.7, conversion: 34.6 }
];

export const branchComparison: BranchComparison[] = [
  { branch: "Jakarta", revenue: 6.8, target: 7.1 },
  { branch: "Surabaya", revenue: 4.3, target: 4.0 },
  { branch: "Bandung", revenue: 2.9, target: 3.8 },
  { branch: "Makassar", revenue: 2.4, target: 2.2 },
  { branch: "Bekasi", revenue: 2.3, target: 2.7 }
];

export const crmPipeline: PipelineStage[] = [
  {
    stage: "New",
    count: 318,
    value: "Rp 5.4M",
    leads: ["Siti Aminah", "H. Rasyid", "Komunitas Al-Falah"],
    accent: "from-cyan-400 to-emerald-300"
  },
  {
    stage: "Contacted",
    count: 224,
    value: "Rp 4.1M",
    leads: ["Rina Family", "Dewan Guru Bekasi", "Majelis Nurul"],
    accent: "from-blue-400 to-cyan-300"
  },
  {
    stage: "Interested",
    count: 166,
    value: "Rp 3.7M",
    leads: ["Bpk. Arman", "KBIH An-Nur", "Ibu Wulan"],
    accent: "from-violet-400 to-fuchsia-300"
  },
  {
    stage: "Booking",
    count: 92,
    value: "Rp 2.8M",
    leads: ["PT Barokah", "Hj. Fatimah", "Alumni Batch 12"],
    accent: "from-amber-300 to-orange-400"
  },
  {
    stage: "Paid",
    count: 64,
    value: "Rp 2.7M",
    leads: ["Dr. Hanif", "Keluarga Hasan", "Komunitas Hijrah"],
    accent: "from-emerald-300 to-lime-300"
  }
];

export const communityMetrics: CommunityMetric[] = [
  { label: "Active users", value: "8,420", detail: "+14% weekly active" },
  { label: "Passive users", value: "21,906", detail: "ready for nurture flow" },
  { label: "Most engaged group", value: "Alumni Ramadhan", detail: "2.8K comments / week" },
  { label: "Inbound conversion", value: "11.7%", detail: "+3.2 pts from referral" }
];

export const activityFeed: ActivityItem[] = [
  {
    type: "New lead",
    title: "Lead keluarga 6 pax masuk dari Meta Ads",
    detail: "Skor AI 91 - minat paket Premium Family.",
    time: "2 menit lalu",
    icon: UsersRound
  },
  {
    type: "Payment received",
    title: "DP Rp 120.000.000 diterima",
    detail: "Booking Umroh Plus Turki - Cabang Jakarta.",
    time: "8 menit lalu",
    icon: WalletCards
  },
  {
    type: "WA reply",
    title: "Balasan WhatsApp dari H. Mulyadi",
    detail: "Meminta jadwal keberangkatan Syawal.",
    time: "14 menit lalu",
    icon: MessageCircle
  },
  {
    type: "Document upload",
    title: "Jamaah upload paspor dan buku vaksin",
    detail: "Dokumen siap diverifikasi oleh admin visa.",
    time: "21 menit lalu",
    icon: FileUp
  }
];

export const topBranches: BranchLeaderboard[] = [
  {
    branch: "Retali Jakarta Prime",
    city: "Jakarta",
    score: 98,
    revenue: "Rp 6.8M",
    conversion: "38.4%",
    growth: "+24%"
  },
  {
    branch: "Retali Surabaya East",
    city: "Surabaya",
    score: 91,
    revenue: "Rp 4.3M",
    conversion: "35.9%",
    growth: "+19%"
  },
  {
    branch: "Retali Makassar Hub",
    city: "Makassar",
    score: 87,
    revenue: "Rp 2.4M",
    conversion: "33.2%",
    growth: "+16%"
  },
  {
    branch: "Retali Bandung Raya",
    city: "Bandung",
    score: 79,
    revenue: "Rp 2.9M",
    conversion: "24.1%",
    growth: "-7%"
  }
];

export const ownerQuickSignals = [
  { label: "AI lead score avg", value: "78.4", icon: Bot },
  { label: "Branch online", value: "18/21", icon: Building2 },
  { label: "Cashflow runway", value: "142 hari", icon: Banknote },
  { label: "Upsell momentum", value: "+11.6%", icon: ArrowUpRight },
  { label: "Risk alerts", value: "3 aktif", icon: ArrowDownRight }
];
