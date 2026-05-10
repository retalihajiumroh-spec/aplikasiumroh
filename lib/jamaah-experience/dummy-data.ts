export interface JourneyStep {
  id: string;
  title: string;
  detail: string;
  /** Initial completion for demo. */
  completed: boolean;
}

export const journeySteps: JourneyStep[] = [
  {
    id: "j1",
    title: "Kontrak & DP",
    detail: "Tanda tangan e-kontrak dan DP minimal terpenuhi.",
    completed: true,
  },
  {
    id: "j2",
    title: "Kelengkapan dokumen",
    detail: "Paspor, vaksin, foto visa — unggah di portal jamaah.",
    completed: true,
  },
  {
    id: "j3",
    title: "Briefing kesehatan",
    detail: "Video LMS + kuesioner kesehatan pra-keberangkatan.",
    completed: false,
  },
  {
    id: "j4",
    title: "Manasik intensif",
    detail: "Hadir minimal 2 sesi offline/Zoom (jadwal cabang).",
    completed: false,
  },
  {
    id: "j5",
    title: "Tas jamaah & perlengkapan",
    detail: "Ambil di kantor cabang atau kirim ke alamat terdaftar.",
    completed: false,
  },
  {
    id: "j6",
    title: "Keberangkatan",
    detail: "Check-in bandara & titik kumpul rombongan.",
    completed: false,
  },
];

export interface LmsModule {
  id: string;
  title: string;
  description: string;
  lessonsTotal: number;
  lessonsDone: number;
  estMinutes: number;
}

export const lmsModules: LmsModule[] = [
  {
    id: "m1",
    title: "Etika & adab di Tanah Suci",
    description: "Adab thawaf, sai, dan interaksi multikultural.",
    lessonsTotal: 8,
    lessonsDone: 8,
    estMinutes: 45,
  },
  {
    id: "m2",
    title: "Manasik praktis",
    description: "Urutan ibadah dari miqat hingga selesai umroh.",
    lessonsTotal: 12,
    lessonsDone: 9,
    estMinutes: 90,
  },
  {
    id: "m3",
    title: "Kesehatan perjalanan",
    description: "Hidrasi, obat rutin, dan kesiapan klinik.",
    lessonsTotal: 6,
    lessonsDone: 2,
    estMinutes: 35,
  },
  {
    id: "m4",
    title: "Logistik bandara & hotel",
    description: "Bagasi, gate, dan orientasi hotel Mekkah/Madinah.",
    lessonsTotal: 5,
    lessonsDone: 0,
    estMinutes: 25,
  },
];

export type ReminderChannel = "whatsapp" | "app" | "email";
export type ReminderStatus = "done" | "upcoming" | "scheduled";

export interface ReminderItem {
  id: string;
  title: string;
  whenLabel: string;
  whenSort: string;
  channel: ReminderChannel;
  status: ReminderStatus;
  note?: string;
}

export const reminderTimeline: ReminderItem[] = [
  {
    id: "r1",
    title: "Link rekaman manasik Zoom",
    whenLabel: "4 Mei 2026 · 20:00",
    whenSort: "2026-05-04T20:00:00",
    channel: "whatsapp",
    status: "done",
    note: "Terkirim ke grup rombongan H45.",
  },
  {
    id: "r2",
    title: "Deadline unggah paspor (scan halaman bio)",
    whenLabel: "11 Mei 2026 · 23:59",
    whenSort: "2026-05-11T23:59:00",
    channel: "app",
    status: "upcoming",
  },
  {
    id: "r3",
    title: "Briefing kesehatan — sesi live",
    whenLabel: "18 Mei 2026 · 19:30",
    whenSort: "2026-05-18T19:30:00",
    channel: "email",
    status: "scheduled",
    note: "Kalender .ics terlampir di email.",
  },
  {
    id: "r4",
    title: "Titik kumpul bandara Soetta Terminal 3",
    whenLabel: "28 Mei 2026 · 06:30",
    whenSort: "2026-05-28T06:30:00",
    channel: "whatsapp",
    status: "scheduled",
    note: "Gate 5 · rombongan Ramadan Premium.",
  },
];

export const experienceProfile = {
  name: "Siti Aminah",
  packageLabel: "Ramadan Premium · H45",
  departureLabel: "28 Mei 2026",
  branch: "Jakarta Pusat",
};
