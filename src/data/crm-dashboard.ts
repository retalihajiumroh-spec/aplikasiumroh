import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpenCheck,
  CalendarCheck,
  FileCheck2,
  MessageSquareText,
  PhoneCall,
  Radio,
  Send,
  UsersRound
} from "lucide-react";

export type PipelineStage = "New" | "Contacted" | "Interested" | "Booking" | "Paid";
export type LeadScoreLevel = "cold" | "warm" | "hot" | "high intent";
export type EngagementLevel = "Low" | "Medium" | "High" | "Very High";

export type Interaction = {
  type: string;
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
};

export type Lead = {
  id: string;
  name: string;
  profile: string;
  phone: string;
  branch: string;
  stage: PipelineStage;
  score: number;
  scoreLevel: LeadScoreLevel;
  source: string;
  engagement: EngagementLevel;
  assignedAdmin: string;
  packageInterest: string;
  lastActivity: string;
  value: string;
  nextAction: string;
  recommendedPackage: string;
  notes: string[];
  aiRecommendations: string[];
  suggestedReplies: string[];
  history: Interaction[];
};

export type AiCrmSuggestion = {
  title: string;
  detail: string;
  priority: "Critical" | "High" | "Medium";
  leadName: string;
};

export type TimelineEvent = {
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
};

export const pipelineStages: PipelineStage[] = ["New", "Contacted", "Interested", "Booking", "Paid"];

export const crmLeads: Lead[] = [
  {
    id: "lead-rina-family",
    name: "Rina Prameswari Family",
    profile: "Keluarga 6 pax, Jakarta Selatan",
    phone: "+62 812-7711-2044",
    branch: "Jakarta",
    stage: "New",
    score: 92,
    scoreLevel: "high intent",
    source: "Meta Ads",
    engagement: "Very High",
    assignedAdmin: "Nadia",
    packageInterest: "Umroh Premium Family",
    lastActivity: "Klik simulasi cicilan 4 menit lalu",
    value: "Rp 258.000.000",
    nextAction: "Kirim itinerary family dan jadwalkan call hari ini.",
    recommendedPackage: "Premium Family 12 hari - quad room dekat Masjid",
    notes: [
      "Mencari keberangkatan Ramadhan untuk 4 dewasa dan 2 anak.",
      "Menanyakan fasilitas lounge dan pendamping keluarga.",
      "Budget fleksibel jika hotel dekat Masjid."
    ],
    aiRecommendations: [
      "Follow up dalam 10 menit; intent tinggi dari repeat visit halaman harga.",
      "Tawarkan seat lock 24 jam dengan benefit airport lounge.",
      "Gunakan angle kenyamanan anak dan pendamping keluarga."
    ],
    suggestedReplies: [
      "Bu Rina, saya sudah siapkan opsi Premium Family 12 hari dengan hotel dekat Masjid. Mau saya kirimkan itinerary dan estimasi cicilannya?",
      "Untuk 6 pax, kami bisa bantu blok seat sementara hari ini agar harga tidak berubah."
    ],
    history: [
      {
        type: "Ad click",
        title: "Masuk dari campaign Ramadhan Family",
        detail: "Landing page visited 3x dalam 24 jam.",
        time: "4 menit lalu",
        icon: Radio
      },
      {
        type: "WhatsApp",
        title: "Membuka link konsultasi WhatsApp",
        detail: "Belum mengirim pesan pertama.",
        time: "9 menit lalu",
        icon: MessageSquareText
      }
    ]
  },
  {
    id: "lead-h-mulyadi",
    name: "H. Mulyadi",
    profile: "Tokoh komunitas, Bekasi",
    phone: "+62 811-9020-1188",
    branch: "Bekasi",
    stage: "New",
    score: 78,
    scoreLevel: "hot",
    source: "Referral Alumni",
    engagement: "High",
    assignedAdmin: "Fauzan",
    packageInterest: "Umroh Plus Turki",
    lastActivity: "Minta jadwal Syawal 17 menit lalu",
    value: "Rp 424.000.000",
    nextAction: "Validasi jumlah rombongan dan kirim proposal grup.",
    recommendedPackage: "Umroh Plus Turki 14 hari - grup komunitas",
    notes: [
      "Potensi rombongan 8-12 pax dari majelis taklim.",
      "Butuh materi presentasi untuk pengurus komunitas."
    ],
    aiRecommendations: [
      "Buat proposal PDF grup dengan harga tiered.",
      "Highlight bonus private manasik untuk komunitas.",
      "Minta jadwal presentasi Zoom sebelum Jumat."
    ],
    suggestedReplies: [
      "Pak Haji, untuk rombongan majelis kami bisa buatkan proposal khusus plus jadwal Syawal. Berapa estimasi jamaah yang ingin ikut?",
      "Kami juga bisa bantu presentasi singkat ke pengurus komunitas agar semua pertanyaan terjawab."
    ],
    history: [
      {
        type: "Community",
        title: "Mention dari grup Alumni Ramadhan",
        detail: "Direkomendasikan oleh jamaah batch 12.",
        time: "17 menit lalu",
        icon: UsersRound
      }
    ]
  },
  {
    id: "lead-pt-barokah",
    name: "PT Barokah Sentosa",
    profile: "Corporate reward, Surabaya",
    phone: "+62 812-4410-9031",
    branch: "Surabaya",
    stage: "Contacted",
    score: 86,
    scoreLevel: "hot",
    source: "Website",
    engagement: "High",
    assignedAdmin: "Icha",
    packageInterest: "Umroh Corporate",
    lastActivity: "Balas WA 31 menit lalu",
    value: "Rp 690.000.000",
    nextAction: "Kirim opsi invoice termin dan jadwal presentasi HR.",
    recommendedPackage: "Corporate Executive 10 hari - 18 pax",
    notes: [
      "HR ingin paket reward untuk karyawan berprestasi.",
      "Butuh invoice termin dan kelengkapan legal travel."
    ],
    aiRecommendations: [
      "Tekankan compliance, invoice, dan report keberangkatan.",
      "Tawarkan dedicated PIC dan dashboard dokumen perusahaan."
    ],
    suggestedReplies: [
      "Bu, kami bisa siapkan proposal corporate dengan termin pembayaran dan dedicated PIC. Apakah presentasi HR cocok besok jam 10.00?",
      "Saya lampirkan legalitas dan contoh timeline dokumen untuk 18 jamaah."
    ],
    history: [
      {
        type: "WA reply",
        title: "Membalas pertanyaan invoice",
        detail: "Menanyakan termin 50/50 dan NPWP.",
        time: "31 menit lalu",
        icon: MessageSquareText
      },
      {
        type: "Call",
        title: "Discovery call 12 menit",
        detail: "Budget approved oleh finance.",
        time: "Kemarin",
        icon: PhoneCall
      }
    ]
  },
  {
    id: "lead-siti-aminah",
    name: "Siti Aminah",
    profile: "First timer, Bandung",
    phone: "+62 857-3321-0044",
    branch: "Bandung",
    stage: "Contacted",
    score: 54,
    scoreLevel: "warm",
    source: "Instagram DM",
    engagement: "Medium",
    assignedAdmin: "Rafi",
    packageInterest: "Umroh Hemat Ramadhan",
    lastActivity: "Buka ebook manasik 2 jam lalu",
    value: "Rp 28.900.000",
    nextAction: "Kirim edukasi tabungan dan paket hemat.",
    recommendedPackage: "Umroh Hemat Ramadhan 9 hari",
    notes: ["Masih membandingkan harga dengan travel lain.", "Sensitif DP dan cicilan."],
    aiRecommendations: [
      "Kirim social proof jamaah Bandung.",
      "Jangan push hard sell; edukasi keamanan travel dan jadwal DP."
    ],
    suggestedReplies: [
      "Bu Siti, saya kirimkan checklist memilih travel aman dan detail paket hemat Ramadhan ya.",
      "DP bisa disesuaikan, yang penting seat dan jadwalnya cocok dengan rencana Ibu."
    ],
    history: [
      {
        type: "Ebook",
        title: "Download ebook Panduan Umroh Pertama",
        detail: "Membaca 72% konten edukasi.",
        time: "2 jam lalu",
        icon: BookOpenCheck
      }
    ]
  },
  {
    id: "lead-al-falah",
    name: "Komunitas Al-Falah",
    profile: "Majelis keluarga, Makassar",
    phone: "+62 813-7070-5511",
    branch: "Makassar",
    stage: "Interested",
    score: 89,
    scoreLevel: "high intent",
    source: "Community",
    engagement: "Very High",
    assignedAdmin: "Nadia",
    packageInterest: "Umroh Plus Turki",
    lastActivity: "Upload daftar calon jamaah 1 jam lalu",
    value: "Rp 1.060.000.000",
    nextAction: "Verifikasi rooming list dan blok 20 seat.",
    recommendedPackage: "Plus Turki 14 hari - group departure",
    notes: [
      "20 calon jamaah sudah masuk spreadsheet.",
      "Meminta opsi pembimbing ustadz internal."
    ],
    aiRecommendations: [
      "Segera blok seat karena grup sangat high intent.",
      "Tawarkan co-branding manasik untuk komunitas."
    ],
    suggestedReplies: [
      "Daftar calon jamaah sudah kami terima. Saya bantu validasi rooming list dan blok seat sementara hari ini.",
      "Untuk pembimbing internal, kami bisa sinkronkan dengan muthawif dan itinerary resmi."
    ],
    history: [
      {
        type: "Document",
        title: "Upload daftar calon jamaah",
        detail: "20 nama, 14 paspor valid, 6 masih follow-up.",
        time: "1 jam lalu",
        icon: FileCheck2
      },
      {
        type: "Community",
        title: "Engagement grup naik",
        detail: "48 komentar pada posting jadwal Turki.",
        time: "3 jam lalu",
        icon: UsersRound
      }
    ]
  },
  {
    id: "lead-dr-hanif",
    name: "Dr. Hanif Rahman",
    profile: "VIP couple, Jakarta",
    phone: "+62 811-8899-6200",
    branch: "Jakarta",
    stage: "Interested",
    score: 95,
    scoreLevel: "high intent",
    source: "Google Search",
    engagement: "Very High",
    assignedAdmin: "Icha",
    packageInterest: "Umroh Private VIP",
    lastActivity: "Minta hotel tower view 45 menit lalu",
    value: "Rp 178.000.000",
    nextAction: "Kirim opsi VIP private dan jadwal call owner.",
    recommendedPackage: "Private VIP 10 hari - hotel 5 star Haram view",
    notes: ["Prioritas privasi, fleksibilitas jadwal, dan hotel premium.", "Siap bayar full jika itinerary cocok."],
    aiRecommendations: [
      "Escalate ke owner / senior closer.",
      "Kirim proposal eksklusif tanpa banyak pilihan harga."
    ],
    suggestedReplies: [
      "Dokter, saya siapkan opsi private VIP dengan hotel 5 star tower view. Apakah berkenan call singkat sore ini dengan senior consultant kami?",
      "Untuk privasi, seluruh itinerary bisa kami tailor sesuai jadwal Dokter."
    ],
    history: [
      {
        type: "Search",
        title: "Mencari paket VIP Haram view",
        detail: "Query: umroh private hotel dekat haram.",
        time: "45 menit lalu",
        icon: Send
      }
    ]
  },
  {
    id: "lead-ibu-wulan",
    name: "Ibu Wulan",
    profile: "Solo jamaah, Tangerang",
    phone: "+62 878-1020-8811",
    branch: "Jakarta",
    stage: "Booking",
    score: 73,
    scoreLevel: "hot",
    source: "WhatsApp",
    engagement: "High",
    assignedAdmin: "Fauzan",
    packageInterest: "Umroh Premium Family",
    lastActivity: "Kirim KTP 25 menit lalu",
    value: "Rp 42.900.000",
    nextAction: "Validasi dokumen dan kirim invoice DP.",
    recommendedPackage: "Premium Family 12 hari - sharing quad",
    notes: ["Berangkat sendiri, ingin room sharing aman.", "KTP sudah masuk, paspor menyusul."],
    aiRecommendations: [
      "Kirim reassurance pendamping perempuan.",
      "Follow-up paspor sebelum jam 20.00."
    ],
    suggestedReplies: [
      "Bu Wulan, KTP sudah kami terima. Saya kirim invoice DP dan panduan upload paspor ya.",
      "Untuk room sharing, kami atur bersama jamaah perempuan sesuai standar kenyamanan."
    ],
    history: [
      {
        type: "Document",
        title: "Upload KTP",
        detail: "Dokumen identitas masuk dan menunggu paspor.",
        time: "25 menit lalu",
        icon: FileCheck2
      }
    ]
  },
  {
    id: "lead-keluarga-hasan",
    name: "Keluarga Hasan",
    profile: "Family 4 pax, Bekasi",
    phone: "+62 813-8890-4432",
    branch: "Bekasi",
    stage: "Booking",
    score: 68,
    scoreLevel: "warm",
    source: "Referral Alumni",
    engagement: "Medium",
    assignedAdmin: "Rafi",
    packageInterest: "Umroh Hemat Ramadhan",
    lastActivity: "Menunggu approval cuti",
    value: "Rp 115.600.000",
    nextAction: "Kirim opsi tanggal alternatif dan reminder cuti.",
    recommendedPackage: "Hemat Ramadhan 9 hari - family room",
    notes: ["Kendala tanggal cuti sekolah.", "Butuh kepastian harga anak."],
    aiRecommendations: ["Tawarkan dua tanggal alternatif.", "Kirim deadline seat promo agar keputusan tidak tertunda."],
    suggestedReplies: [
      "Pak Hasan, saya kirimkan dua tanggal alternatif agar lebih mudah menyesuaikan cuti keluarga.",
      "Seat promo masih bisa kami bantu hold sampai besok siang."
    ],
    history: [
      {
        type: "Calendar",
        title: "Minta tanggal alternatif",
        detail: "Prefer keberangkatan setelah ujian sekolah.",
        time: "4 jam lalu",
        icon: CalendarCheck
      }
    ]
  },
  {
    id: "lead-hj-fatimah",
    name: "Hj. Fatimah",
    profile: "Repeat jamaah, Bandung",
    phone: "+62 812-7000-1932",
    branch: "Bandung",
    stage: "Paid",
    score: 82,
    scoreLevel: "hot",
    source: "Alumni Community",
    engagement: "High",
    assignedAdmin: "Nadia",
    packageInterest: "Umroh Premium Family",
    lastActivity: "Pelunasan terkonfirmasi 13 menit lalu",
    value: "Rp 171.600.000",
    nextAction: "Kirim receipt dan jadwal manasik premium.",
    recommendedPackage: "Premium Family 12 hari - repeat jamaah benefit",
    notes: ["Pelunasan untuk 4 pax sudah diterima.", "Minta seat dekat lorong untuk lansia."],
    aiRecommendations: [
      "Aktifkan referral ask setelah receipt terkirim.",
      "Tambahkan tag VIP repeat untuk service team."
    ],
    suggestedReplies: [
      "Alhamdulillah pelunasan sudah masuk, Bu Hajjah. Saya kirim receipt dan jadwal manasik premium sekarang.",
      "Catatan seat lansia sudah kami teruskan ke tim operasional."
    ],
    history: [
      {
        type: "Payment",
        title: "Pelunasan diterima",
        detail: "Rp 171.600.000 via transfer bank.",
        time: "13 menit lalu",
        icon: Banknote
      }
    ]
  },
  {
    id: "lead-drs-yusuf",
    name: "Drs. Yusuf",
    profile: "Couple, Surabaya",
    phone: "+62 822-4411-7855",
    branch: "Surabaya",
    stage: "Paid",
    score: 61,
    scoreLevel: "warm",
    source: "Website",
    engagement: "Medium",
    assignedAdmin: "Icha",
    packageInterest: "Umroh Hemat Ramadhan",
    lastActivity: "Upload paspor istri 1 jam lalu",
    value: "Rp 57.800.000",
    nextAction: "Review dokumen dan assign manasik online.",
    recommendedPackage: "Hemat Ramadhan 9 hari - couple departure",
    notes: ["Pembayaran lunas.", "Menunggu validasi masa berlaku paspor."],
    aiRecommendations: ["Kirim checklist koper dan jadwal manasik.", "Pastikan paspor valid lebih dari 7 bulan."],
    suggestedReplies: [
      "Pak Yusuf, paspor sudah kami terima. Tim dokumen sedang validasi dan saya kirim jadwal manasik online.",
      "Mohon siapkan buku vaksin jika sudah tersedia."
    ],
    history: [
      {
        type: "Document",
        title: "Upload paspor",
        detail: "Paspor istri masuk, masa berlaku perlu validasi.",
        time: "1 jam lalu",
        icon: FileCheck2
      }
    ]
  }
];

export const crmSuggestions: AiCrmSuggestion[] = [
  {
    title: "Follow up this lead now",
    detail: "Rina Family sudah 3x membuka simulasi cicilan dan belum dihubungi.",
    priority: "Critical",
    leadName: "Rina Prameswari Family"
  },
  {
    title: "High intent detected",
    detail: "Dr. Hanif mencari VIP Haram view dan meminta call senior consultant.",
    priority: "High",
    leadName: "Dr. Hanif Rahman"
  },
  {
    title: "Lead inactive 3 days",
    detail: "Keluarga Hasan tertahan approval cuti, butuh tanggal alternatif.",
    priority: "Medium",
    leadName: "Keluarga Hasan"
  }
];

export const crmTimeline: TimelineEvent[] = [
  {
    title: "WA replies increased",
    detail: "27 balasan masuk dari segment Ramadhan Family.",
    time: "10 menit lalu",
    icon: MessageSquareText
  },
  {
    title: "Payments received",
    detail: "3 transaksi DP dan 1 pelunasan masuk hari ini.",
    time: "24 menit lalu",
    icon: Banknote
  },
  {
    title: "Document upload spike",
    detail: "14 jamaah upload paspor setelah reminder otomatis.",
    time: "48 menit lalu",
    icon: FileCheck2
  },
  {
    title: "Community engagement",
    detail: "Alumni Ramadhan menghasilkan 11 referral baru.",
    time: "1 jam lalu",
    icon: UsersRound
  }
];

export const crmFilterOptions = {
  branches: ["All", "Jakarta", "Bekasi", "Bandung", "Surabaya", "Makassar"],
  scores: ["All", "cold", "warm", "hot", "high intent"],
  sources: ["All", "Meta Ads", "Referral Alumni", "Website", "Instagram DM", "Community", "Google Search", "WhatsApp", "Alumni Community"],
  packages: ["All", "Umroh Premium Family", "Umroh Plus Turki", "Umroh Corporate", "Umroh Hemat Ramadhan", "Umroh Private VIP"],
  admins: ["All", "Nadia", "Fauzan", "Icha", "Rafi"]
};
