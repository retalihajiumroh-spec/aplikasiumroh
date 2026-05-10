/** CRM pipeline + AI sales + broadcast — dummy data (no backend). */

export const PIPELINE_STAGES = [
  { id: "new", label: "New", short: "Baru", accent: "from-sky-400/20 to-cyan-500/10" },
  { id: "contacted", label: "Contacted", short: "Kontak", accent: "from-violet-400/20 to-fuchsia-500/10" },
  { id: "interested", label: "Interested", short: "Minat", accent: "from-amber-400/25 to-orange-500/10" },
  { id: "booking", label: "Booking", short: "Booking", accent: "from-emerald-400/25 to-teal-600/10" },
  { id: "paid", label: "Paid", short: "Lunas", accent: "from-teal-300/20 to-emerald-700/15" },
] as const;

export type PipelineStageId = (typeof PIPELINE_STAGES)[number]["id"];

export type EngagementLevel = "high" | "medium" | "low";

export interface CrmLead {
  id: string;
  name: string;
  phoneMasked: string;
  city: string;
  packageInterest: string;
  score: number;
  engagement: EngagementLevel;
  lastActivity: string;
  stage: PipelineStageId;
  branch: string;
  /** Short AI-generated follow-up copy for sales. */
  aiFollowUp: string;
}

export const crmLeads: CrmLead[] = [
  {
    id: "L-1042",
    name: "Budi Santoso",
    phoneMasked: "+62 812 •••• 8811",
    city: "Jakarta Selatan",
    packageInterest: "Ramadan Premium 1447H",
    score: 78,
    engagement: "high",
    lastActivity: "Buka brochure 12 menit lalu",
    stage: "new",
    branch: "Pusat",
    aiFollowUp:
      "Kirim ringkasan manasik + jadwal konsultasi video besok 10:00. Lead sering buka dokumen visa.",
  },
  {
    id: "L-1041",
    name: "Keluarga Hidayat",
    phoneMasked: "+62 857 •••• 2044",
    city: "Bandung",
    packageInterest: "Ekonomi Plus Maret",
    score: 64,
    engagement: "medium",
    lastActivity: "Balas WA template 2 jam lalu",
    stage: "new",
    branch: "Jawa Barat",
    aiFollowUp:
      "Tawarkan perbandingan 3 hotel Madinah; mereka menjawab singkat — cocok voice note 45 detik.",
  },
  {
    id: "L-1038",
    name: "Rina Kusuma",
    phoneMasked: "+62 821 •••• 1190",
    city: "Surabaya",
    packageInterest: "Private Family 8 pax",
    score: 91,
    engagement: "high",
    lastActivity: "Klik link DP calculator",
    stage: "contacted",
    branch: "Jatim",
    aiFollowUp:
      "Skor naik +6 setelah kalkulator. Kirim invoice DP preview dan slot maskapai Garuda.",
  },
  {
    id: "L-1035",
    name: "Ahmad Fauzi",
    phoneMasked: "+62 838 •••• 5521",
    city: "Medan",
    packageInterest: "Reguler April",
    score: 55,
    engagement: "low",
    lastActivity: "Tidak aktif 4 hari",
    stage: "contacted",
    branch: "Sumatera",
    aiFollowUp:
      "Re-activation: broadcast segment 'dormant contacted' atau pesan personal tentang kuota terbatas.",
  },
  {
    id: "L-1032",
    name: "Yayasan Al-Ikhlas",
    phoneMasked: "+62 811 •••• 9033",
    city: "Depok",
    packageInterest: "Corporate 40 pax",
    score: 88,
    engagement: "high",
    lastActivity: "Meeting Zoom selesai · positif",
    stage: "interested",
    branch: "Pusat",
    aiFollowUp:
      "Kirim MoU ringkas + timeline pembayaran bertahap; decision maker: Ibu Ketua.",
  },
  {
    id: "L-1029",
    name: "M. Rizki",
    phoneMasked: "+62 895 •••• 4412",
    city: "Makassar",
    packageInterest: "Premium Plus Mei",
    score: 72,
    engagement: "medium",
    lastActivity: "Upload KTP 3 anggota keluarga",
    stage: "interested",
    branch: "Sulawesi",
    aiFollowUp:
      "Lengkapi data paspor; tawarkan asuransi perjalanan — conversion +9% di cabang serupa.",
  },
  {
    id: "L-1024",
    name: "Siti Aminah",
    phoneMasked: "+62 813 •••• 7720",
    city: "Tangerang",
    packageInterest: "Ramadan Premium 1447H",
    score: 84,
    engagement: "high",
    lastActivity: "Tanda tangan kontrak digital",
    stage: "booking",
    branch: "Pusat",
    aiFollowUp:
      "Trigger reminder DP-1 setelah kontrak; lampirkan rekening virtual dan kontak finance.",
  },
  {
    id: "L-1019",
    name: "Hendra Wijaya",
    phoneMasked: "+62 858 •••• 3301",
    city: "Semarang",
    packageInterest: "Ekonomi Plus Maret",
    score: 69,
    engagement: "medium",
    lastActivity: "Pilih kursi pesawat",
    stage: "booking",
    branch: "Jateng",
    aiFollowUp:
      "Notifikasi baggage allowance dan tips packing — meningkatkan kepuasan pre-departure.",
  },
  {
    id: "L-1015",
    name: "Keluarga Pratama",
    phoneMasked: "+62 877 •••• 6602",
    city: "Jakarta Barat",
    packageInterest: "Ramadan Premium 1447H",
    score: 95,
    engagement: "high",
    lastActivity: "Pelunasan terverifikasi",
    stage: "paid",
    branch: "Pusat",
    aiFollowUp:
      "Onboarding: grup WA jamaah + checklist manasik; upsell asuransi top-up masih relevan.",
  },
  {
    id: "L-1008",
    name: "Dewi Lestari",
    phoneMasked: "+62 822 •••• 1988",
    city: "Bali",
    packageInterest: "Private Family 8 pax",
    score: 81,
    engagement: "high",
    lastActivity: "Pembayaran cicilan ke-3",
    stage: "paid",
    branch: "Bali",
    aiFollowUp:
      "Jadwalkan briefing kesehatan & vaksinasi; mereka prefer komunikasi sore hari.",
  },
];

export function leadsByStage(stage: PipelineStageId): CrmLead[] {
  return crmLeads.filter((l) => l.stage === stage);
}

/** --- AI Sales --- */

export interface WaAutoFollowUp {
  id: string;
  leadName: string;
  phoneMasked: string;
  runAt: string;
  channel: "WhatsApp Business";
  status: "scheduled" | "sent" | "paused";
  snippet: string;
}

export const waAutoFollowUps: WaAutoFollowUp[] = [
  {
    id: "W-901",
    leadName: "Budi Santoso",
    phoneMasked: "+62 812 •••• 8811",
    runAt: "Hari ini · 16:00 WIB",
    channel: "WhatsApp Business",
    status: "scheduled",
    snippet: "Assalamu'alaikum Pak Budi, berikut ringkasan paket Ramadan Premium…",
  },
  {
    id: "W-899",
    leadName: "Rina Kusuma",
    phoneMasked: "+62 821 •••• 1190",
    runAt: "Besok · 09:30 WIB",
    channel: "WhatsApp Business",
    status: "scheduled",
    snippet: "Bu Rina, kami siapkan pratinjau invoice DP sesuai pilihan maskap…",
  },
  {
    id: "W-896",
    leadName: "Ahmad Fauzi",
    phoneMasked: "+62 838 •••• 5521",
    runAt: "Kemarin · 11:15 WIB",
    channel: "WhatsApp Business",
    status: "sent",
    snippet: "Pak Ahmad, kami ingin memastikan kenyamanan jadwal konsultasi…",
  },
  {
    id: "W-892",
    leadName: "Keluarga Hidayat",
    phoneMasked: "+62 857 •••• 2044",
    runAt: "Dijeda otomatis",
    channel: "WhatsApp Business",
    status: "paused",
    snippet: "(Bot dijeda — sales override)",
  },
];

export interface LeadScoreFactor {
  label: string;
  weightPct: number;
  value: number;
  note: string;
}

export const leadScoreFactors: LeadScoreFactor[] = [
  { label: "Intent perilaku", weightPct: 35, value: 31, note: "Klik harga, brochure, kalkulator DP" },
  { label: "Respons channel", weightPct: 25, value: 22, note: "Latensi balasan & frekuensi WA" },
  { label: "Kelengkapan data", weightPct: 20, value: 17, note: "KTP, paspor, peserta" },
  { label: "Nilai paket", weightPct: 12, value: 10, note: "Tier premium vs ekonomi" },
  { label: "Sinyal waktu", weightPct: 8, value: 7, note: "Dekat musim peak / early bird" },
];

export interface SuggestedReply {
  id: string;
  leadName: string;
  lastMessagePreview: string;
  tone: "warm" | "professional" | "concise";
  replies: string[];
}

export const suggestedAiReplies: SuggestedReply[] = [
  {
    id: "R-1",
    leadName: "Budi Santoso",
    lastMessagePreview: "Kalau bayar cicilan bisa sampai berapa bulan ya?",
    tone: "professional",
    replies: [
      "Wa'alaikumsalam Pak Budi, untuk Ramadan Premium kami sediakan cicilan hingga 6 bulan dengan bunga 0% untuk DP minimal 30%. Saya lampirkan simulasi tenor — boleh saya kirimkan?",
      "Pak Budi, cicilan tersedia hingga 6x tanpa bunga untuk DP 30%+. Tim finance kami bisa sesuaikan dengan cash flow Bapak; saya bantu jadwalkan 10 menit call singkat?",
    ],
  },
  {
    id: "R-2",
    leadName: "Yayasan Al-Ikhlas",
    lastMessagePreview: "Kami butuh invoice resmi untuk RAB.",
    tone: "concise",
    replies: [
      "Baik Bu, invoice resmi + NPWP kami akan dikirim dalam 1×24 jam ke email yayasan. Mohon konfirmasi alamat penagihan yang digunakan.",
    ],
  },
  {
    id: "R-3",
    leadName: "M. Rizki",
    lastMessagePreview: "Hotel Madinah dekat Masjid Nabawi nggak?",
    tone: "warm",
    replies: [
      "Wa'alaikumsalam Pak Rizki, untuk paket Premium Plus Mei kami prioritaskan hotel walking distance ±400m ke gate utama (tergantung ketersediaan maskapai). Saya kirimkan peta & foto kamar perbandingan ya?",
    ],
  },
];

export interface HighIntentLead {
  id: string;
  name: string;
  score: number;
  signals: string[];
  recommendedAction: string;
}

export const highIntentLeads: HighIntentLead[] = [
  {
    id: "H-01",
    name: "Budi Santoso",
    score: 92,
    signals: ["3× buka brochure", "Klik kalkulator DP", "Balasan < 5 menit"],
    recommendedAction: "Prioritaskan slot konsultasi + kirim pratinjau kontrak.",
  },
  {
    id: "H-02",
    name: "Rina Kusuma",
    score: 89,
    signals: ["Private family", "Upload dokumen anggota", "Tanya jadwal maskapai"],
    recommendedAction: "Tawarkan upgrade asuransi + seat selection bundling.",
  },
  {
    id: "H-03",
    name: "Yayasan Al-Ikhlas",
    score: 87,
    signals: ["Zoom positif", "Mint MoU", "Decision maker engaged"],
    recommendedAction: "Kirim MoU + timeline cicilan korporat.",
  },
];

/** Voice reminder — UI placeholder for future telephony integration. */
export const voiceReminderCopy = {
  title: "Voice call reminders",
  subtitle: "Integrasi telepon AI (beta) — pengingat jadwal keberangkatan & manasik.",
  simulatedState: "Siap memanggil",
  nextExample: "H-01 · Budi Santoso · reminder konsultasi besok 10:00",
};

/** --- Broadcast --- */

export interface BroadcastSegment {
  id: string;
  label: string;
  description: string;
  leadCount: number;
}

export const broadcastSegments: BroadcastSegment[] = [
  {
    id: "high_intent",
    label: "High intent (skor ≥ 80)",
    description: "Perilaku kuat + respons cepat",
    leadCount: 38,
  },
  {
    id: "interested",
    label: "Tahap Interested",
    description: "Sudah minat, belum booking",
    leadCount: 124,
  },
  {
    id: "dormant",
    label: "Dormant 7 hari",
    description: "Kontak terakhir tanpa balasan",
    leadCount: 56,
  },
  {
    id: "booking_dp",
    label: "Booking · belum DP",
    description: "Kontrak signed, menunggu pembayaran",
    leadCount: 19,
  },
  {
    id: "branch_jakarta",
    label: "Cabang Jakarta",
    description: "Semua stage · entitas Pusat",
    leadCount: 210,
  },
];
