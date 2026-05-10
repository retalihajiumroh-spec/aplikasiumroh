/** AI Sales Bot — chat, follow-ups, scripts, voice (dummy, no backend). */

export type ChatRole = "lead" | "agent" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  body: string;
  time: string;
}

export interface ActiveLeadProfile {
  id: string;
  name: string;
  phoneMasked: string;
  score: number;
  lastInteraction: string;
  stageLabel: string;
  packageInterest: string;
}

export type FollowUpKind = "status" | "urgency" | "reminder";

export interface AutomatedFollowUp {
  id: string;
  kind: FollowUpKind;
  title: string;
  triggerSummary: string;
  scheduledFor: string;
  bodyPreview: string;
}

export type ScriptCategory = "closing" | "objection" | "urgency";

export interface SalesScriptPack {
  category: ScriptCategory;
  label: string;
  description: string;
  replies: { id: string; text: string }[];
}

export interface VoiceCallLogEntry {
  id: string;
  leadName: string;
  direction: "outbound" | "inbound";
  outcome: string;
  durationMin: number;
  at: string;
}

export interface VoiceScheduledCall {
  id: string;
  leadName: string;
  when: string;
  purpose: string;
  scriptExcerpt: string;
}

export const activeLead: ActiveLeadProfile = {
  id: "L-1038",
  name: "Rina Kusuma",
  phoneMasked: "+62 821 •••• 1190",
  score: 91,
  lastInteraction: "Klik kalkulator DP · 8 menit lalu",
  stageLabel: "Contacted → Interested",
  packageInterest: "Private Family 8 pax · Premium Plus",
};

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "agent",
    body: "Wa'alaikumsalam Bu Rina, terima kasih sudah melihat simulasi cicilan. Ada yang ingin Ibu tanyakan soal jadwal maskapai?",
    time: "14:02",
  },
  {
    id: "m2",
    role: "lead",
    body: "Kalau untuk anak umur 9 tahun dokumennya sama saja ya?",
    time: "14:06",
  },
  {
    id: "m3",
    role: "agent",
    body: "Untuk anak 9 tahun biasanya KTP/KK + akta lahir + paspor (jika sudah ada). Tim kami bantu checklist per anggota keluarga.",
    time: "14:07",
  },
  {
    id: "m4",
    role: "system",
    body: "AI menandai minat tinggi setelah klik link invoice preview.",
    time: "14:08",
  },
  {
    id: "m5",
    role: "lead",
    body: "Oke, kalau seat Garuda untuk pekan kedua Ramadan masih ada?",
    time: "14:09",
  },
];

export const automatedFollowUps: AutomatedFollowUp[] = [
  {
    id: "f1",
    kind: "status",
    title: "Follow-up pasca kalkulator DP",
    triggerSummary: "Lead stage: Interested · event: klik kalkulator",
    scheduledFor: "Hari ini · 16:30 WIB",
    bodyPreview:
      "Bu Rina, berikut pratinjau invoice DP 30% untuk 8 pax. Slot maskapai bisa kami hold 24 jam setelah konfirmasi…",
  },
  {
    id: "f2",
    kind: "urgency",
    title: "Urgensi kuota maskapai",
    triggerSummary: "High intent + pertanyaan seat Garuda",
    scheduledFor: "Hari ini · 18:00 WIB",
    bodyPreview:
      "Bu, untuk pekan ke-2 Ramadan sisa 6 seat di grup kami. Jika Ibu setuju, kami proses hold seat setelah DP masuk…",
  },
  {
    id: "f3",
    kind: "reminder",
    title: "Reminder konsultasi video",
    triggerSummary: "Jadwal tidak dikonfirmasi dalam 12 jam",
    scheduledFor: "Besok · 09:00 WIB",
    bodyPreview:
      "Reminder: konsultasi video besok jam 10:00 WIB. Link Zoom sama seperti kemarin — mohon konfirmasi hadir…",
  },
  {
    id: "f4",
    kind: "reminder",
    title: "Re-engagement 48 jam",
    triggerSummary: "Lead tidak membalas setelah proposal",
    scheduledFor: "2 hari lagi · 11:00 WIB",
    bodyPreview:
      "Halo Bu Rina, kami ingin memastikan proposal kemarin sudah cukup jelas. Balas *INFO* jika ingin revisi jadwal…",
  },
];

export const salesScriptPacks: SalesScriptPack[] = [
  {
    category: "closing",
    label: "Closing",
    description: "Mengunci komitmen tanpa tekanan berlebihan.",
    replies: [
      {
        id: "c1",
        text: "Bu Rina, jika paket ini cocok, langkah berikutnya cukup tanda tangan kontrak digital dan DP 30% — tim kami siap bantu hingga pelunasan.",
      },
      {
        id: "c2",
        text: "Untuk melindungi seat maskapai, kami sarankan konfirmasi hari ini; setelah itu saya kirimkan invoice resmi dan grup WA jamaah.",
      },
    ],
  },
  {
    category: "objection",
    label: "Objection handling",
    description: "Menjawab keraguan harga dan waktu.",
    replies: [
      {
        id: "o1",
        text: "Wajar Bu membandingkan harga — bedanya kami di kurasi hotel jarak Haram, manasik intensif, dan tim medis. Mau saya breakdown per pos?",
      },
      {
        id: "o2",
        text: "Kalau waktu keberangkatan masih fleksibel, kami bisa cek 2 pekan terdekat dengan benefit serupa agar Ibu punya opsi.",
      },
    ],
  },
  {
    category: "urgency",
    label: "Urgency",
    description: "Menciptakan urgensi halus yang tetap premium.",
    replies: [
      {
        id: "u1",
        text: "Kuota grup kami untuk Ramadan memang terbatas per batch — yang pekan kedua tinggal beberapa seat, tapi kami bisa cek alternatif tanpa mengorbankan kualitas.",
      },
      {
        id: "u2",
        text: "Jika hold seat dimulai hari ini, kami lock harga sesuai proposal; setelah lewat cut-off minggu ini, harga mengikuti update maskapai.",
      },
    ],
  },
];

export const voiceCallLog: VoiceCallLogEntry[] = [
  {
    id: "v1",
    leadName: "Rina Kusuma",
    direction: "outbound",
    outcome: "Positif · minta invoice DP",
    durationMin: 11,
    at: "Kemarin · 15:40",
  },
  {
    id: "v2",
    leadName: "Budi Santoso",
    direction: "outbound",
    outcome: "Follow-up manasik",
    durationMin: 6,
    at: "Kemarin · 10:12",
  },
  {
    id: "v3",
    leadName: "Keluarga Hidayat",
    direction: "inbound",
    outcome: "Tanya cicilan · diarahkan ke WA",
    durationMin: 4,
    at: "2 hari lalu · 19:05",
  },
];

export const voiceScheduledCalls: VoiceScheduledCall[] = [
  {
    id: "s1",
    leadName: "Rina Kusuma",
    when: "Besok · 10:00 WIB",
    purpose: "Konfirmasi seat Garuda + MoU keluarga",
    scriptExcerpt:
      "Buka dengan apresiasi atas respons cepat di WA. Validasi jumlah pax, tanyakan preferensi kamar anak, lalu ringkas 3 langkah berikutnya (invoice, grup WA, manasik).",
  },
  {
    id: "s2",
    leadName: "Yayasan Al-Ikhlas",
    when: "Besok · 14:30 WIB",
    purpose: "Pembahasan pembayaran bertahap",
    scriptExcerpt:
      "Konfirmasi struktur yayasan, jelaskan opsi cicilan korporat 3 tahap, dan pastikan penandatangan berwenang hadir di meeting.",
  },
];

export const voiceScriptPreview = `[OPENING · 20 detik]
"Selamat siang Bu Rina, ini [nama] dari SA'YA Umroh — apakah waktunya masih nyaman untuk 10 menit?"

[CEK KEBUTUHAN · 2 menit]
Ringkas paket yang sudah dibahas di WA, tanyakan satu hal: prioritas Ibu soal jadwal vs maskapai.

[PENUTUP · 1 menit]
Ajukan pilihan A/B (hold seat vs jadwalkan ulang), konfirmasi channel tindak lanjut (WA + invoice), ucapkan terima kasih.`;
