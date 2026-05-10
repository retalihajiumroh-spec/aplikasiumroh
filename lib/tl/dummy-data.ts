/** TL & Muthowif — ranking demo (no backend). */

export interface RankedLeader {
  id: string;
  rank: number;
  name: string;
  /** Composite score 0–100 */
  score: number;
  /** Short stat line for card */
  highlight: string;
  branch: string;
}

export const tlRanking: RankedLeader[] = [
  {
    id: "tl-1",
    rank: 1,
    name: "Ustadz Ahmad Hidayat",
    score: 96,
    highlight: "18 rombongan · NPS jamaah 92",
    branch: "Jakarta Pusat",
  },
  {
    id: "tl-2",
    rank: 2,
    name: "Ibu Siti Rahma",
    score: 94,
    highlight: "15 rombongan · SLA laporan 98%",
    branch: "Jakarta Pusat",
  },
  {
    id: "tl-3",
    rank: 3,
    name: "Bapak M. Yusuf, Lc.",
    score: 91,
    highlight: "12 rombongan · zero insiden medis",
    branch: "Bandung",
  },
  {
    id: "tl-4",
    rank: 4,
    name: "Ibu Dr. Lina Kusuma",
    score: 88,
    highlight: "9 rombongan · familial care 4.8★",
    branch: "Surabaya",
  },
  {
    id: "tl-5",
    rank: 5,
    name: "Tim TL Cabang Bandung",
    score: 85,
    highlight: "Shared pool · utilisasi 78%",
    branch: "Bandung",
  },
];

export const muthowifRanking: RankedLeader[] = [
  {
    id: "mw-1",
    rank: 1,
    name: "KH. Prof. Zainal Abidin",
    score: 97,
    highlight: "Manasik · kepuasan 4.9★",
    branch: "Nasional",
  },
  {
    id: "mw-2",
    rank: 2,
    name: "Ustadz Fikri Maulana, MA",
    score: 95,
    highlight: "24 sesi Zoom · hadir 99%",
    branch: "Jakarta",
  },
  {
    id: "mw-3",
    rank: 3,
    name: "Ustadzah Hana Farida",
    score: 93,
    highlight: "Konten LMS top viewed",
    branch: "Jakarta",
  },
  {
    id: "mw-4",
    rank: 4,
    name: "Ustadz Wildan Hakim",
    score: 90,
    highlight: "Haji & umroh · bilingual OK",
    branch: "Surabaya",
  },
  {
    id: "mw-5",
    rank: 5,
    name: "Ustadz Rifqi Ramadhan",
    score: 87,
    highlight: "Youth cohort · engagement +34%",
    branch: "Medan",
  },
];
