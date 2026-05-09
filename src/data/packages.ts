export type UmrohPackage = {
  id: string;
  name: string;
  duration: string;
  price: number;
  departure: string;
  highlights: string[];
  badge: string;
};

export const umrohPackages: UmrohPackage[] = [
  {
    id: "hemat-ramadhan",
    name: "Umroh Hemat Ramadhan",
    duration: "9 hari",
    price: 28900000,
    departure: "Jakarta - Madinah - Makkah",
    badge: "Best Value",
    highlights: ["Hotel bintang 4", "Manasik online", "Pembimbing bersertifikat"]
  },
  {
    id: "premium-family",
    name: "Umroh Premium Family",
    duration: "12 hari",
    price: 42900000,
    departure: "Jakarta - Doha - Jeddah",
    badge: "Premium",
    highlights: ["Hotel dekat Masjid", "Private lounge", "Pendamping keluarga"]
  },
  {
    id: "plus-turki",
    name: "Umroh Plus Turki",
    duration: "14 hari",
    price: 52900000,
    departure: "Jakarta - Istanbul - Makkah",
    badge: "Favorit",
    highlights: ["City tour Istanbul", "Visa termasuk", "Kelas edukasi sirah"]
  }
];
