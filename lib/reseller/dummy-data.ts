/** Reseller & mitra — dummy data (no backend). */

export type PartnerKind = "reseller" | "mitra";

export type PartnerTier = "gold" | "silver" | "bronze";

export interface PartnerRow {
  id: string;
  name: string;
  kind: PartnerKind;
  city: string;
  commissionYtdIdr: number;
  jamaahClosed: number;
  tier: PartnerTier;
}

export const partners: PartnerRow[] = [
  {
    id: "p-01",
    name: "CV Raudhatul Jannah",
    kind: "reseller",
    city: "Jakarta Timur",
    commissionYtdIdr: 428_000_000,
    jamaahClosed: 186,
    tier: "gold",
  },
  {
    id: "p-02",
    name: "Yayasan Baitul Maal Sejahtera",
    kind: "mitra",
    city: "Bandung",
    commissionYtdIdr: 312_500_000,
    jamaahClosed: 142,
    tier: "gold",
  },
  {
    id: "p-03",
    name: "Koperasi Syariah Nusantara",
    kind: "mitra",
    city: "Surabaya",
    commissionYtdIdr: 198_400_000,
    jamaahClosed: 88,
    tier: "silver",
  },
  {
    id: "p-04",
    name: "Bapak H. Yusuf (agen independen)",
    kind: "reseller",
    city: "Medan",
    commissionYtdIdr: 124_800_000,
    jamaahClosed: 54,
    tier: "silver",
  },
  {
    id: "p-05",
    name: "Masjid Agung Al-Ikhlas",
    kind: "mitra",
    city: "Semarang",
    commissionYtdIdr: 86_200_000,
    jamaahClosed: 38,
    tier: "bronze",
  },
  {
    id: "p-06",
    name: "Travel Umroh Berkah Abadi",
    kind: "reseller",
    city: "Makassar",
    commissionYtdIdr: 71_500_000,
    jamaahClosed: 29,
    tier: "bronze",
  },
  {
    id: "p-07",
    name: "Komunitas Muslim Professionals Bali",
    kind: "mitra",
    city: "Denpasar",
    commissionYtdIdr: 54_300_000,
    jamaahClosed: 22,
    tier: "bronze",
  },
];

export function rankedPartners(): PartnerRow[] {
  return [...partners].sort((a, b) => b.commissionYtdIdr - a.commissionYtdIdr);
}

export function commissionAggregate() {
  const totalCommission = partners.reduce((a, p) => a + p.commissionYtdIdr, 0);
  const totalJamaah = partners.reduce((a, p) => a + p.jamaahClosed, 0);
  const n = partners.length;
  const avg = n > 0 ? Math.round(totalCommission / n) : 0;
  const top = rankedPartners()[0];
  return { totalCommission, totalJamaah, avgPerPartner: avg, top };
}

export function kindLabel(k: PartnerKind) {
  return k === "reseller" ? "Reseller" : "Mitra";
}

export function tierLabel(t: PartnerTier) {
  if (t === "gold") return "Gold";
  if (t === "silver") return "Silver";
  return "Bronze";
}
