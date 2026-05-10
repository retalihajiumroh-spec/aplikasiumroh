/** Dokumen & visa — dummy tracking (no backend). */

export type PassportStatus = "missing" | "uploaded" | "verified" | "renewal_needed";

export type VisaStepId = "data" | "submit" | "embassy" | "approved" | "issued";

export interface VisaStepDef {
  id: VisaStepId;
  label: string;
  short: string;
}

export const visaSteps: VisaStepDef[] = [
  { id: "data", label: "Pengumpulan data", short: "Data" },
  { id: "submit", label: "Pengajuan KBRI / e-visa", short: "Ajuan" },
  { id: "embassy", label: "Review kedutaan", short: "Review" },
  { id: "approved", label: "Disetujui", short: "Setuju" },
  { id: "issued", label: "E-visa terbit", short: "Terbit" },
];

export interface DokumenRow {
  id: string;
  name: string;
  bookingRef: string;
  packageName: string;
  passport: PassportStatus;
  passportNote?: string;
  /** Step currently in progress (0–4). Steps before this are treated as completed. */
  visaStepIndex: number;
  /** Embassy decision positive (shown when stepIndex >= embassy and not stuck). */
  embassyApproved: boolean | null;
  lastUpdate: string;
}

export const dokumenRows: DokumenRow[] = [
  {
    id: "d1",
    name: "Siti Aminah",
    bookingRef: "BK-2026-1842",
    packageName: "Ramadan Premium 1447H",
    passport: "verified",
    passportNote: "Berlaku hingga Nov 2031",
    visaStepIndex: 4,
    embassyApproved: true,
    lastUpdate: "2 jam lalu",
  },
  {
    id: "d2",
    name: "Budi Santoso",
    bookingRef: "BK-2026-1756",
    packageName: "Ramadan Premium 1447H",
    passport: "verified",
    visaStepIndex: 3,
    embassyApproved: true,
    lastUpdate: "5 jam lalu",
  },
  {
    id: "d3",
    name: "Rina Kusuma",
    bookingRef: "BK-2026-1903",
    packageName: "Private Family 8 pax",
    passport: "uploaded",
    passportNote: "Menunggu verifikasi CS",
    visaStepIndex: 2,
    embassyApproved: null,
    lastUpdate: "1 hari lalu",
  },
  {
    id: "d4",
    name: "Ahmad Fauzi",
    bookingRef: "BK-2026-1710",
    packageName: "Ekonomi Plus Maret",
    passport: "renewal_needed",
    passportNote: "Masa berlaku < 6 bulan",
    visaStepIndex: 0,
    embassyApproved: null,
    lastUpdate: "3 hari lalu",
  },
  {
    id: "d5",
    name: "Keluarga Hidayat",
    bookingRef: "BK-2026-1801",
    packageName: "Ekonomi Plus Maret",
    passport: "missing",
    visaStepIndex: 0,
    embassyApproved: null,
    lastUpdate: "—",
  },
  {
    id: "d6",
    name: "M. Rizki",
    bookingRef: "BK-2026-1655",
    packageName: "Premium Plus Mei",
    passport: "verified",
    visaStepIndex: 2,
    embassyApproved: false,
    lastUpdate: "Kemarin",
  },
];

export function passportLabel(s: PassportStatus): string {
  if (s === "missing") return "Belum upload";
  if (s === "uploaded") return "Diterima";
  if (s === "verified") return "Terverifikasi";
  return "Perlu perpanjang";
}

export function visaProgressPct(stepIndex: number): number {
  const n = visaSteps.length - 1;
  if (n <= 0) return 0;
  return Math.round((stepIndex / n) * 100);
}
