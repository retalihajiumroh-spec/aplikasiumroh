/** Tasks & reminders — demo data (no backend). */

export type TaskPriority = "high" | "medium" | "low";

export interface TaskItem {
  id: string;
  title: string;
  detail: string;
  dueLabel: string;
  dueSort: string;
  priority: TaskPriority;
  assignee: string;
  completed: boolean;
}

export const initialTasks: TaskItem[] = [
  {
    id: "t1",
    title: "Follow-up DP rombongan RP-03B",
    detail: "Hubungi 6 jamaah dengan tagihan DP jatuh tempo 12 Mei.",
    dueLabel: "10 Mei 2026 · 17:00",
    dueSort: "2026-05-10T17:00:00",
    priority: "high",
    assignee: "Tim Finance Pusat",
    completed: false,
  },
  {
    id: "t2",
    title: "Kirim batch visa ke embassy",
    detail: "Paket Premium Plus — 22 paspor siap scan.",
    dueLabel: "11 Mei 2026 · 10:00",
    dueSort: "2026-05-11T10:00:00",
    priority: "high",
    assignee: "Dokumen · SBY",
    completed: false,
  },
  {
    id: "t3",
    title: "Update seat chart maskapai GA",
    detail: "Konfirmasi kursi H+45 batch Maret.",
    dueLabel: "14 Mei 2026",
    dueSort: "2026-05-14T23:59:59",
    priority: "medium",
    assignee: "Ops Jakarta",
    completed: false,
  },
  {
    id: "t4",
    title: "Briefing TL internal — Ramadan",
    detail: "Slide SOP bandara + kontak darurat.",
    dueLabel: "16 Mei 2026 · 15:30",
    dueSort: "2026-05-16T15:30:00",
    priority: "medium",
    assignee: "HR & Training",
    completed: false,
  },
  {
    id: "t5",
    title: "Restock kit kesehatan jamaah",
    detail: "Masker N95, sanitizer, booklet edukasi.",
    dueLabel: "20 Mei 2026",
    dueSort: "2026-05-20T23:59:59",
    priority: "low",
    assignee: "Inventory",
    completed: true,
  },
  {
    id: "t6",
    title: "Review kontrak mitra reseller Q2",
    detail: "Tiga mitra zona timur.",
    dueLabel: "22 Mei 2026",
    dueSort: "2026-05-22T23:59:59",
    priority: "low",
    assignee: "Legal",
    completed: false,
  },
];

export type ReminderChannel = "whatsapp" | "app" | "calendar";

export interface ReminderItem {
  id: string;
  title: string;
  whenLabel: string;
  whenSort: string;
  channel: ReminderChannel;
  note?: string;
  relatedTaskId?: string;
}

export const initialReminders: ReminderItem[] = [
  {
    id: "m1",
    title: "Notifikasi WA: DP rombongan RP-03B",
    whenLabel: "9 Mei 2026 · 08:00",
    whenSort: "2026-05-09T08:00:00",
    channel: "whatsapp",
    note: "Template finance + link bayar.",
    relatedTaskId: "t1",
  },
  {
    id: "m2",
    title: "Push app: unggah paspor batch visa",
    whenLabel: "10 Mei 2026 · 09:00",
    whenSort: "2026-05-10T09:00:00",
    channel: "app",
    relatedTaskId: "t2",
  },
  {
    id: "m3",
    title: "Kalender: deadline seat maskapai",
    whenLabel: "13 Mei 2026 · 07:45",
    whenSort: "2026-05-13T07:45:00",
    channel: "calendar",
    relatedTaskId: "t3",
  },
  {
    id: "m4",
    title: "WA grup TL: materi briefing",
    whenLabel: "15 Mei 2026 · 18:00",
    whenSort: "2026-05-15T18:00:00",
    channel: "whatsapp",
    relatedTaskId: "t4",
  },
];
