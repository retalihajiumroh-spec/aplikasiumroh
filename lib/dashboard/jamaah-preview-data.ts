export type LeadTemp = "hot" | "warm" | "cold";

export interface JamaahPreviewRow {
  id: string;
  name: string;
  packageName: string;
  payment: "Lunas" | "Cicilan" | "Pending";
  leadTemp: LeadTemp;
  seatPct: number;
}

export const jamaahPreviewRows: JamaahPreviewRow[] = [
  { id: "J-01", name: "Siti Aminah", packageName: "Ramadan Premium", payment: "Lunas", leadTemp: "hot", seatPct: 100 },
  { id: "J-02", name: "Budi Santoso", packageName: "Ramadan Premium", payment: "Cicilan", leadTemp: "hot", seatPct: 72 },
  { id: "J-03", name: "Rina Kusuma", packageName: "Private Family", payment: "Pending", leadTemp: "warm", seatPct: 40 },
  { id: "J-04", name: "Ahmad Fauzi", packageName: "Ekonomi Plus", payment: "Pending", leadTemp: "cold", seatPct: 18 },
  { id: "J-05", name: "Dewi Lestari", packageName: "Premium Plus", payment: "Lunas", leadTemp: "warm", seatPct: 95 },
  { id: "J-06", name: "M. Rizki", packageName: "Premium Plus", payment: "Cicilan", leadTemp: "hot", seatPct: 88 },
  { id: "J-07", name: "Yayasan Al-Ikhlas", packageName: "Corporate 40 pax", payment: "Cicilan", leadTemp: "warm", seatPct: 55 },
  { id: "J-08", name: "Hendra Kusuma", packageName: "Ekonomi Plus", payment: "Lunas", leadTemp: "cold", seatPct: 100 },
];
