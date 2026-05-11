import type { PackageFormValues } from "@/lib/paket/package-form-types";

const AIRLINE_MULT: Record<string, number> = {
  Saudia: 1.05,
  "Garuda Indonesia": 1.12,
  "Lion Air": 0.92,
  Emirates: 1.25,
  "Air Asia": 0.95,
  "Oman Air": 1.08,
  Indigo: 0.98,
  Etihad: 1.18,
  Ethiopian: 1.02,
  Turkish: 1.15,
  Scoot: 0.94,
  Hainan: 1.0,
};

function durasiFactor(d: PackageFormValues["durasiPaket"]): number {
  switch (d) {
    case "9 hari":
      return 0.88;
    case "12 hari":
      return 1;
    case "15 hari":
      return 1.14;
    case "16 hari":
      return 1.2;
    case "30 hari":
      return 1.75;
    default:
      return 1;
  }
}

/** Demo modal & per jamaah (IDR) from form selections. */
export function estimatePackagePricing(v: PackageFormValues): { totalModalIdr: number; perJamaahIdr: number } {
  const base = v.pilihPaket === "Promo" ? 28_000_000 : 36_500_000;
  let total = base * durasiFactor(v.durasiPaket) * (AIRLINE_MULT[v.maskapai] ?? 1);
  if (v.penerbangan === "Direct") total *= 1.08;

  total += v.malamMadinah * 520_000 + v.malamMekkah * 580_000;

  if (v.transportasi === "Kereta Cepat") total *= 1.08;
  else total *= 0.99;

  if (v.handlingBerangkat === "VIP Meet & Greet") total += 2_800_000;
  if (v.handlingBerangkat === "Standar") total += 900_000;
  if (v.handlingKedatangan === "VIP Meet & Greet") total += 2_400_000;
  if (v.handlingKedatangan === "Standar") total += 900_000;

  if (v.asuransi) total += 2_500_000;
  if (v.visa) total += 3_200_000;
  if (v.siskopatuh) total += 450_000;

  if (v.perlengkapan === "Medium") total *= 1.06;
  if (v.perlengkapan === "Premium") total *= 1.14;

  if (v.manasik === "Offline") total += 1_200_000;

  if (v.cityTourMadinah === "Ya") total += 650_000;
  if (v.cityTourMekkah === "Ya") total += 650_000;

  if (v.ziarahTambahan === "Al Ula") total += 4_500_000;
  if (v.ziarahTambahan === "Korniece") total += 3_200_000;

  const j = Math.max(1, Math.floor(Number(v.jumlahJamaah)) || 1);
  const totalModalIdr = Math.round(total);
  const perJamaahIdr = Math.ceil(totalModalIdr / j);
  return { totalModalIdr, perJamaahIdr };
}
