import { estimatePackagePricing } from "@/lib/paket/package-pricing";
import type { PackageFormValues } from "@/lib/paket/package-form-types";
import type { StoredUserPackage } from "@/lib/paket/package-storage";

function formatIdDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

export function buildSubtitle(v: PackageFormValues): string {
  const bits = [
    `${v.kotaKeberangkatan} · ${v.maskapai}`,
    `${v.penerbangan} · ${v.kotaRute}`,
    v.hotelMadinah ? `Madinah: ${v.hotelMadinah}` : null,
    v.hotelMekkah ? `Mekkah: ${v.hotelMekkah}` : null,
  ].filter(Boolean);
  return bits.join(" · ");
}

export function formValuesToUmrohPackage(v: PackageFormValues, id: string): StoredUserPackage {
  const pricing = estimatePackagePricing(v);
  const seatsTotal = Math.max(1, Math.floor(Number(v.jumlahJamaah)) || 1);
  const durationNights = Math.max(1, v.malamMadinah + v.malamMekkah + 2);

  return {
    id,
    name: v.namaPaket.trim(),
    subtitle: buildSubtitle(v),
    departureLabel: formatIdDate(v.tanggalKeberangkatan),
    durationNights,
    priceFromIdr: pricing.perJamaahIdr,
    seatsBooked: 0,
    seatsTotal,
    status: "open",
    formSnapshot: v,
    totalModalIdr: pricing.totalModalIdr,
  };
}

export function newPackageId(): string {
  return `P-NEW-${Date.now().toString(36).toUpperCase()}`;
}

export type FieldErrors = Partial<Record<string, string>>;

export function validatePackageForm(v: PackageFormValues, todayIso: string): FieldErrors {
  const e: FieldErrors = {};

  if (!v.namaPaket.trim()) e.namaPaket = "Nama paket wajib diisi.";

  const j = Number(v.jumlahJamaah);
  if (!Number.isFinite(j) || j < 1 || !Number.isInteger(j)) e.jumlahJamaah = "Jumlah jamaah wajib bilangan bulat ≥ 1.";

  if (!v.tanggalKeberangkatan) e.tanggalKeberangkatan = "Tanggal keberangkatan wajib diisi.";
  else if (v.tanggalKeberangkatan < todayIso) e.tanggalKeberangkatan = "Tanggal tidak boleh di masa lalu.";

  if (!v.hotelMadinah.trim()) e.hotelMadinah = "Nama hotel Madinah wajib diisi.";
  if (!v.hotelMekkah.trim()) e.hotelMekkah = "Nama hotel Mekkah wajib diisi.";

  const md = Number(v.malamMadinah);
  const mk = Number(v.malamMekkah);
  if (!Number.isFinite(md) || md < 1 || !Number.isInteger(md)) e.malamMadinah = "Malam di Madinah wajib bilangan bulat ≥ 1.";
  if (!Number.isFinite(mk) || mk < 1 || !Number.isInteger(mk)) e.malamMekkah = "Malam di Mekkah wajib bilangan bulat ≥ 1.";

  return e;
}
