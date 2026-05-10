/** Booking & pembayaran — dummy data (no backend). */

export type BookingPaymentStatus = "paid" | "installment" | "pending";

export interface InvoiceLine {
  description: string;
  amountIdr: number;
}

export interface BookingPaymentRecord {
  id: string;
  bookingRef: string;
  customerName: string;
  packageName: string;
  branch: string;
  status: BookingPaymentStatus;
  /** Total tagihan kontrak. */
  amountIdr: number;
  /** Sudah dibayar (cicilan atau lunas). */
  paidIdr: number;
  issuedAt: string;
  dueLabel: string;
  invoiceNumber: string;
  lines: InvoiceLine[];
}

export const bookingPayments: BookingPaymentRecord[] = [
  {
    id: "bp-01",
    bookingRef: "BK-2026-1842",
    customerName: "Keluarga Pratama",
    packageName: "Ramadan Premium 1447H",
    branch: "Jakarta Pusat",
    status: "paid",
    amountIdr: 186_500_000,
    paidIdr: 186_500_000,
    issuedAt: "28 Apr 2026",
    dueLabel: "Lunas",
    invoiceNumber: "INV-2026-044812",
    lines: [
      { description: "Paket umroh 5 pax · Ramadan Premium", amountIdr: 175_000_000 },
      { description: "Asuransi perjalanan & handling", amountIdr: 8_500_000 },
      { description: "Biaya administrasi", amountIdr: 3_000_000 },
    ],
  },
  {
    id: "bp-02",
    bookingRef: "BK-2026-1799",
    customerName: "Yayasan Al-Ikhlas",
    packageName: "Corporate 40 pax · April",
    branch: "Jakarta Pusat",
    status: "installment",
    amountIdr: 1_820_000_000,
    paidIdr: 910_000_000,
    issuedAt: "02 Mei 2026",
    dueLabel: "Cicilan 2/4 · jatuh tempo 15 Mei 2026",
    invoiceNumber: "INV-2026-044901",
    lines: [
      { description: "DP tahap 1 (40 pax)", amountIdr: 728_000_000 },
      { description: "Cicilan tahap 2", amountIdr: 182_000_000 },
      { description: "Manasik & logistik tambahan", amountIdr: 0 },
    ],
  },
  {
    id: "bp-03",
    bookingRef: "BK-2026-1903",
    customerName: "Rina Kusuma",
    packageName: "Private Family 8 pax",
    branch: "Surabaya",
    status: "pending",
    amountIdr: 712_000_000,
    paidIdr: 0,
    issuedAt: "06 Mei 2026",
    dueLabel: "Menunggu konfirmasi DP 30%",
    invoiceNumber: "INV-2026-045033",
    lines: [
      { description: "Paket private 8 pax", amountIdr: 680_000_000 },
      { description: "Upgrade kamar & meal plan", amountIdr: 32_000_000 },
    ],
  },
  {
    id: "bp-04",
    bookingRef: "BK-2026-1756",
    customerName: "Budi Santoso",
    packageName: "Ramadan Premium 1447H",
    branch: "Jakarta Pusat",
    status: "installment",
    amountIdr: 89_500_000,
    paidIdr: 44_750_000,
    issuedAt: "22 Apr 2026",
    dueLabel: "Cicilan 1/2 · sisa pelunasan 22 Jun 2026",
    invoiceNumber: "INV-2026-044701",
    lines: [{ description: "Paket 2 pax · Ramadan Premium", amountIdr: 89_500_000 }],
  },
  {
    id: "bp-05",
    bookingRef: "BK-2026-1888",
    customerName: "Hendra Wijaya",
    packageName: "Ekonomi Plus Maret",
    branch: "Semarang",
    status: "paid",
    amountIdr: 105_800_000,
    paidIdr: 105_800_000,
    issuedAt: "30 Apr 2026",
    dueLabel: "Lunas",
    invoiceNumber: "INV-2026-044955",
    lines: [
      { description: "Paket 2 pax · Ekonomi Plus", amountIdr: 98_000_000 },
      { description: "Visa & handling dokumen", amountIdr: 7_800_000 },
    ],
  },
];
