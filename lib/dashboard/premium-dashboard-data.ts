/** Dummy datasets for premium main dashboard (funnel, community, lead mix, jamaah grid). */

export interface FunnelStage {
  name: string;
  value: number;
  fill: string;
}

export const funnelInbound: FunnelStage[] = [
  { name: "Leads", value: 4280, fill: "rgba(52, 211, 153, 0.95)" },
  { name: "Contacted", value: 3120, fill: "rgba(45, 212, 191, 0.88)" },
  { name: "Interested", value: 1840, fill: "rgba(20, 184, 166, 0.82)" },
  { name: "Booking", value: 920, fill: "rgba(251, 191, 36, 0.85)" },
  { name: "Paid", value: 612, fill: "rgba(245, 158, 11, 0.9)" },
];

export interface LeadSourceRow {
  source: string;
  leads: number;
  /** Share of all channel leads (%). */
  pct: number;
}

export const leadSourceMix: LeadSourceRow[] = [
  { source: "Instagram Ads", leads: 1284, pct: 30.7 },
  { source: "Facebook Ads", leads: 942, pct: 22.5 },
  { source: "WhatsApp Blast", leads: 718, pct: 17.2 },
  { source: "Referral / Mitra", leads: 556, pct: 13.3 },
  { source: "Website / SEO", leads: 412, pct: 9.9 },
  { source: "Walk-in / Cabang", leads: 268, pct: 6.4 },
];

export interface CommunitySegment {
  name: string;
  value: number;
  fill: string;
}

export const communityEngagement: CommunitySegment[] = [
  { name: "Engaged", value: 1842, fill: "rgba(52, 211, 153, 0.9)" },
  { name: "Active", value: 956, fill: "rgba(56, 189, 248, 0.85)" },
  { name: "Passive", value: 412, fill: "rgba(148, 163, 184, 0.55)" },
];

/** Lead engagement pipeline (active vs total) for progress UI. */
export const leadEngagementPipeline = {
  activeLeads: 1284,
  totalLeads: 3742,
  label: "Lead aktif dalam sistem (30 hari)",
} as const;

export type LeadTemp = "hot" | "warm" | "cold";

export interface LeadInteractionItem {
  id: string;
  title: string;
  detail: string;
  channel: string;
  temp: LeadTemp;
  at: string;
}

export const leadInteractionFeed: LeadInteractionItem[] = [
  {
    id: "li1",
    title: "Lead baru",
    detail: "Ayu Lestari · bertanya harga paket April",
    channel: "Instagram Ads",
    temp: "hot",
    at: "2 menit lalu",
  },
  {
    id: "li2",
    title: "Balasan otomatis terbuka",
    detail: "Keluarga Pratama · thread WA 6 pesan",
    channel: "WhatsApp",
    temp: "warm",
    at: "6 menit lalu",
  },
  {
    id: "li3",
    title: "Lead dari kampanye lookalike",
    detail: "Bambang S. · form website singkat",
    channel: "Facebook Ads",
    temp: "hot",
    at: "14 menit lalu",
  },
  {
    id: "li4",
    title: "Skor dingin · follow-up",
    detail: "Lina K. · tidak merespons 72 jam",
    channel: "Email",
    temp: "cold",
    at: "32 menit lalu",
  },
  {
    id: "li5",
    title: "Lead organik IG story",
    detail: "Zaki M. · swipe-up ke WhatsApp",
    channel: "Instagram",
    temp: "warm",
    at: "51 menit lalu",
  },
];

/** % of previous funnel stage (first stage = 100% of top). */
export function funnelConversionPercents(stages: FunnelStage[]): { name: string; value: number; pctOfPrevious: number }[] {
  return stages.map((s, i) => {
    const prev = i === 0 ? s.value : stages[i - 1]!.value;
    const pctOfPrevious = i === 0 ? 100 : Math.round((s.value / prev) * 1000) / 10;
    return { name: s.name, value: s.value, pctOfPrevious };
  });
}

export const communityGrowth = {
  daily: "+2,4%",
  weekly: "+6,1%",
  monthly: "+14,8%",
  caption: "Komunitas WA & portal jamaah · rolling 30 hari",
} as const;

export interface DashboardJamaahRow {
  id: string;
  name: string;
  status: string;
  package: string;
  paymentStatus: string;
  branch: string;
  detail: string;
}

export const dashboardJamaahRows: DashboardJamaahRow[] = [
  {
    id: "j1",
    name: "Rina Kartikasari",
    status: "Berangkat Maret",
    package: "Ramadan Premium",
    paymentStatus: "Lunas",
    branch: "Jakarta Pusat",
    detail: "Visa issued · boarding group A · asuransi aktif.",
  },
  {
    id: "j2",
    name: "Hendra Wijaya & keluarga",
    status: "Dokumen review",
    package: "Family Plus",
    paymentStatus: "Cicilan 2/3",
    branch: "Bandung",
    detail: "Paspor OK · menunggu biometrik visa.",
  },
  {
    id: "j3",
    name: "PT Mulia Sejahtera (korporat)",
    status: "Kontrak aktif",
    package: "Corporate 24 pax",
    paymentStatus: "DP diterima",
    branch: "Surabaya",
    detail: "PIC: Ibu Lestari · invoice INV-2026-044.",
  },
  {
    id: "j4",
    name: "Ahmad Fauzi",
    status: "Pre-departure",
    package: "Ekonomi Hemat",
    paymentStatus: "Lunas",
    branch: "Medan",
    detail: "Briefing LMS 88% · vaksin meninggal.",
  },
  {
    id: "j5",
    name: "Siti Aminah",
    status: "Lead → booking",
    package: "Silver Maret",
    paymentStatus: "Pending VA",
    branch: "Makassar",
    detail: "Follow-up otomatis terkirim · high intent score 82.",
  },
  {
    id: "j6",
    name: "Budi Santoso",
    status: "Waitlist April",
    package: "April Shalawat",
    paymentStatus: "Belum DP",
    branch: "Semarang",
    detail: "Prioritas seat 12/45 · reminder H-7 aktif.",
  },
  {
    id: "j7",
    name: "Keluarga Hidayat",
    status: "Berangkat April",
    package: "Premium Plus",
    paymentStatus: "Lunas",
    branch: "Jakarta Selatan",
    detail: "TL assigned · muthowif briefing scheduled.",
  },
  {
    id: "j8",
    name: "Dewi Lestari",
    status: "Onboarding",
    package: "Ramadan Premium",
    paymentStatus: "Cicilan 1/4",
    branch: "Yogyakarta",
    detail: "Portal login OK · dokumen vaksin diunggah.",
  },
];

export const aiSalesInsight = {
  leadStatus: "Interested → siap negosiasi paket",
  engagementScore: 84,
  suggestedActions: [
    "Kirim ringkasan paket Ramadan + jadwal konsultasi 15 menit",
    "Tawarkan cicilan 0% untuk kontrak sebelum akhir pekan",
    "Assign ke CS cabang terdekat (auto-rute: Bandung)",
  ],
  highlight: "Lead baru dari Instagram Ads · skor intent tinggi",
} as const;
