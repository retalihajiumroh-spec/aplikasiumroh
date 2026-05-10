/** Options & package list helpers for Input Jamaah form. */

import type { PaymentStatus } from "@/lib/jamaah/dummy-data";
import { umrohPackages } from "@/lib/paket/dummy-data";
import type { StoredUserPackage } from "@/lib/paket/package-storage";

export const jamaahInputPackageOptions = umrohPackages.map((p) => ({ id: p.id, label: p.name }));

export function mergePackageOptions(userPkgs: StoredUserPackage[]): { id: string; label: string }[] {
  const base = jamaahInputPackageOptions;
  const seen = new Set(base.map((o) => o.id));
  const extra = userPkgs
    .filter((p) => !seen.has(p.id))
    .map((p) => ({ id: p.id, label: p.name }));
  return [...extra, ...base];
}

export const JENIS_KELAMIN = ["Laki-laki", "Perempuan"] as const;
export type JenisKelamin = (typeof JENIS_KELAMIN)[number];

export const KEWARGANEGARAAN = ["Indonesia", "Warga Negara Asing"] as const;

export const STATUS_PERNIKAHAN = ["Belum Kawin", "Kawin", "Cerai Hidup", "Cerai Mati"] as const;

export const PENDIDIKAN = ["SD", "SMP/setara", "SMA/setara", "D1", "D3", "S1", "S2", "S3"] as const;

export const PEKERJAAN = ["Karyawan Swasta", "ASN", "Wirausaha", "Ibu Rumah Tangga", "Lainnya"] as const;

/** Query keys untuk mitra referral (?mitra= / ?ref= / ?referral=) */
export const MITRA_QUERY_KEYS = ["mitra", "ref", "referral"] as const;

export const paymentStatusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "paid", label: "Lunas" },
  { value: "partial", label: "DP / cicilan" },
  { value: "unpaid", label: "Belum bayar" },
];
