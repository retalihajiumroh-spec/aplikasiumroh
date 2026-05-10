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
}

export const leadSourceMix: LeadSourceRow[] = [
  { source: "Instagram Ads", leads: 1284 },
  { source: "Facebook Ads", leads: 942 },
  { source: "WhatsApp Blast", leads: 718 },
  { source: "Referral / Mitra", leads: 556 },
  { source: "Website / SEO", leads: 412 },
  { source: "Walk-in / Cabang", leads: 268 },
];

export interface CommunitySegment {
  name: string;
  value: number;
  fill: string;
}

export const communityEngagement: CommunitySegment[] = [
  { name: "Engaged", value: 1842, fill: "rgba(52, 211, 153, 0.9)" },
  { name: "Active", value: 956, fill: "rgba(56, 189, 248, 0.85)" },
  { name: "Silent", value: 412, fill: "rgba(148, 163, 184, 0.55)" },
];

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
