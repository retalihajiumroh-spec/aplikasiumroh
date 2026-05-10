/** Approval Center — demo antrian persetujuan (no backend). */

export type ApprovalKind = "cabang" | "mitra";

export interface ApprovalRequest {
  id: string;
  kind: ApprovalKind;
  title: string;
  summary: string;
  submittedBy: string;
  submittedAtLabel: string;
  /** Optional IDR amount for finance-style requests */
  amountIdr?: number;
}

export const initialApprovalRequests: ApprovalRequest[] = [
  {
    id: "a-c1",
    kind: "cabang",
    title: "Kenaikan plafon marketing Bandung",
    summary: "Minta tambahan Rp 45 jt/bulan untuk iklan Meta Ramadan.",
    submittedBy: "Kacab Bandung · Rina W.",
    submittedAtLabel: "9 Mei 2026 · 11:20",
    amountIdr: 45_000_000,
  },
  {
    id: "a-c2",
    kind: "cabang",
    title: "Revisi fee handling dokumen",
    summary: "Penyesuaian biaya visa per pax +Rp 75.000 mulai batch Juni.",
    submittedBy: "Ops Surabaya · Tim finance cabang",
    submittedAtLabel: "8 Mei 2026 · 16:05",
  },
  {
    id: "a-c3",
    kind: "cabang",
    title: "Pembukaan slot briefing weekend",
    summary: "Permintaan jadwal manasik Sabtu sore untuk 2 rombongan.",
    submittedBy: "Jakarta Pusat · TL pool",
    submittedAtLabel: "7 Mei 2026 · 09:40",
  },
  {
    id: "a-m1",
    kind: "mitra",
    title: "Registrasi mitra baru — CV Hikmah Tour",
    summary: "NPWP & dokumen lengkap, zona Jawa Tengah.",
    submittedBy: "Self-serve portal mitra",
    submittedAtLabel: "9 Mei 2026 · 14:02",
  },
  {
    id: "a-m2",
    kind: "mitra",
    title: "Upgrade tier komisi Silver → Gold",
    summary: "12 booking closed dalam 90 hari, memenuhi syarat tier.",
    submittedBy: "Mitra · PT Amanah Raya",
    submittedAtLabel: "8 Mei 2026 · 10:18",
  },
  {
    id: "a-m3",
    kind: "mitra",
    title: "Diskon khusus paket corporate Yayasan",
    summary: "Minta approval potongan 4% untuk MoU 120 pax.",
    submittedBy: "Mitra · Bapak Yusuf (Medan)",
    submittedAtLabel: "6 Mei 2026 · 13:55",
    amountIdr: 128_000_000,
  },
];
