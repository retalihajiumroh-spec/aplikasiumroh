/** Paket Umroh — dummy catalog (no backend). */

export type PaketStatus = "open" | "almost_full" | "sold_out";

export interface UmrohPackage {
  id: string;
  name: string;
  subtitle: string;
  departureLabel: string;
  durationNights: number;
  priceFromIdr: number;
  seatsBooked: number;
  seatsTotal: number;
  status: PaketStatus;
}

export const umrohPackages: UmrohPackage[] = [
  {
    id: "P-RP-03",
    name: "Ramadan Premium 1447H",
    subtitle: "Hotel ±400m Haram · Garuda Indonesia · manasik intensif",
    departureLabel: "12 Mar 2026",
    durationNights: 24,
    priceFromIdr: 89_500_000,
    seatsBooked: 78,
    seatsTotal: 90,
    status: "almost_full",
  },
  {
    id: "P-EP-02",
    name: "Ekonomi Plus Maret",
    subtitle: "Hotel bintang 4 · Lion Air group · dokter pendamping",
    departureLabel: "18 Mar 2026",
    durationNights: 21,
    priceFromIdr: 52_900_000,
    seatsBooked: 34,
    seatsTotal: 110,
    status: "open",
  },
  {
    id: "P-PF-01",
    name: "Private Family 8 pax",
    subtitle: "Jadwal fleksibel · hotel pilihan · konsultan dedicated",
    departureLabel: "05 Apr 2026",
    durationNights: 22,
    priceFromIdr: 118_000_000,
    seatsBooked: 8,
    seatsTotal: 8,
    status: "sold_out",
  },
  {
    id: "P-PP-04",
    name: "Premium Plus Mei",
    subtitle: "Madinah first · Emirates · lounge access",
    departureLabel: "22 Mei 2026",
    durationNights: 25,
    priceFromIdr: 98_750_000,
    seatsBooked: 41,
    seatsTotal: 72,
    status: "open",
  },
  {
    id: "P-RG-01",
    name: "Reguler April",
    subtitle: "Paket hemat terjadwal · maskapai grup",
    departureLabel: "08 Apr 2026",
    durationNights: 20,
    priceFromIdr: 44_200_000,
    seatsBooked: 96,
    seatsTotal: 96,
    status: "sold_out",
  },
  {
    id: "P-RP-04",
    name: "Ramadan Premium 1447H · Batch 2",
    subtitle: "Sama dengan batch 1 · keberangkatan pekan ke-2 Ramadan",
    departureLabel: "20 Mar 2026",
    durationNights: 24,
    priceFromIdr: 91_200_000,
    seatsBooked: 52,
    seatsTotal: 90,
    status: "open",
  },
];

export function seatPct(booked: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((booked / total) * 1000) / 10);
}

export function seatsRemaining(booked: number, total: number): number {
  return Math.max(0, total - booked);
}
