/** Keberangkatan — dummy jadwal (no backend). */

export interface DepartureRow {
  id: string;
  code: string;
  packageName: string;
  route: string;
  departureLabel: string;
  returnLabel: string;
  seatsBooked: number;
  seatsTotal: number;
  /** Tour leader — null jika belum ditugaskan. */
  tlName: string | null;
}

export const departureRows: DepartureRow[] = [
  {
    id: "dp-01",
    code: "DP-RP-03A",
    packageName: "Ramadan Premium 1447H",
    route: "CGK → JED (GA)",
    departureLabel: "12 Mar 2026 · 14:35 WIB",
    returnLabel: "05 Apr 2026",
    seatsBooked: 78,
    seatsTotal: 90,
    tlName: "Ustadz Ahmad Hidayat",
  },
  {
    id: "dp-02",
    code: "DP-RP-03B",
    packageName: "Ramadan Premium 1447H · Batch 2",
    route: "CGK → JED (GA)",
    departureLabel: "20 Mar 2026 · 09:10 WIB",
    returnLabel: "12 Apr 2026",
    seatsBooked: 52,
    seatsTotal: 90,
    tlName: null,
  },
  {
    id: "dp-03",
    code: "DP-EP-02",
    packageName: "Ekonomi Plus Maret",
    route: "CGK → JED (JT group)",
    departureLabel: "18 Mar 2026 · 20:45 WIB",
    returnLabel: "08 Apr 2026",
    seatsBooked: 96,
    seatsTotal: 110,
    tlName: null,
  },
  {
    id: "dp-04",
    code: "DP-PF-01",
    packageName: "Private Family 8 pax",
    route: "SUB → JED (SQ)",
    departureLabel: "05 Apr 2026 · 11:20 WIB",
    returnLabel: "27 Apr 2026",
    seatsBooked: 8,
    seatsTotal: 8,
    tlName: "Ibu Siti Rahma",
  },
  {
    id: "dp-05",
    code: "DP-PP-04",
    packageName: "Premium Plus Mei",
    route: "CGK → DXB → JED (EK)",
    departureLabel: "22 Mei 2026 · 00:15 WIB",
    returnLabel: "16 Jun 2026",
    seatsBooked: 41,
    seatsTotal: 72,
    tlName: null,
  },
];

export const tlCandidates = [
  "Ustadz Ahmad Hidayat",
  "Ibu Siti Rahma",
  "Bapak M. Yusuf, Lc.",
  "Ibu Dr. Lina Kusuma",
  "Tim TL Cabang Bandung",
] as const;

export function seatFillPct(booked: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((booked / total) * 1000) / 10);
}
