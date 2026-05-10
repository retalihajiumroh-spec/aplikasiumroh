/** Jamaah registry — dummy data (no backend). */

export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface JamaahDocuments {
  visa: boolean;
  passport: boolean;
  vaccination: boolean;
}

export interface JamaahRecord {
  id: string;
  name: string;
  phoneMasked: string;
  packageName: string;
  branch: string;
  batch: string;
  payment: PaymentStatus;
  documents: JamaahDocuments;
}

export const jamaahRecords: JamaahRecord[] = [
  {
    id: "J-20481",
    name: "Siti Aminah",
    phoneMasked: "+62 813 •••• 7720",
    packageName: "Ramadan Premium 1447H",
    branch: "Jakarta Pusat",
    batch: "Maret 2026",
    payment: "paid",
    documents: { visa: true, passport: true, vaccination: true },
  },
  {
    id: "J-20476",
    name: "Budi Santoso",
    phoneMasked: "+62 812 •••• 8811",
    packageName: "Ramadan Premium 1447H",
    branch: "Jakarta Pusat",
    batch: "Maret 2026",
    payment: "partial",
    documents: { visa: true, passport: true, vaccination: false },
  },
  {
    id: "J-20470",
    name: "Rina Kusuma",
    phoneMasked: "+62 821 •••• 1190",
    packageName: "Private Family 8 pax",
    branch: "Surabaya",
    batch: "April 2026",
    payment: "partial",
    documents: { visa: false, passport: true, vaccination: true },
  },
  {
    id: "J-20458",
    name: "Ahmad Fauzi",
    phoneMasked: "+62 838 •••• 5521",
    packageName: "Ekonomi Plus Maret",
    branch: "Medan",
    batch: "Maret 2026",
    payment: "unpaid",
    documents: { visa: false, passport: false, vaccination: false },
  },
  {
    id: "J-20452",
    name: "Dewi Lestari",
    phoneMasked: "+62 822 •••• 1988",
    packageName: "Premium Plus Mei",
    branch: "Bali",
    batch: "Mei 2026",
    payment: "paid",
    documents: { visa: true, passport: true, vaccination: true },
  },
  {
    id: "J-20441",
    name: "M. Rizki",
    phoneMasked: "+62 895 •••• 4412",
    packageName: "Premium Plus Mei",
    branch: "Makassar",
    batch: "Mei 2026",
    payment: "partial",
    documents: { visa: true, passport: false, vaccination: true },
  },
  {
    id: "J-20433",
    name: "Keluarga Hidayat",
    phoneMasked: "+62 857 •••• 2044",
    packageName: "Ekonomi Plus Maret",
    branch: "Bandung",
    batch: "Maret 2026",
    payment: "paid",
    documents: { visa: true, passport: true, vaccination: false },
  },
  {
    id: "J-20428",
    name: "Hendra Wijaya",
    phoneMasked: "+62 858 •••• 3301",
    packageName: "Reguler April",
    branch: "Semarang",
    batch: "April 2026",
    payment: "unpaid",
    documents: { visa: false, passport: true, vaccination: false },
  },
];

export function docCompleteCount(d: JamaahDocuments): number {
  return (d.visa ? 1 : 0) + (d.passport ? 1 : 0) + (d.vaccination ? 1 : 0);
}

export function isDocComplete(d: JamaahDocuments): boolean {
  return docCompleteCount(d) === 3;
}
