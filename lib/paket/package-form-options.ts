/** Dropdown options for the Buat Paket Umroh form (client-side catalog). */

export const PAKET_TIPE = ["Reguler", "Promo"] as const;
export type PaketTipe = (typeof PAKET_TIPE)[number];

export const DURASI_HARI = ["9 hari", "12 hari", "15 hari", "16 hari", "30 hari"] as const;
export type DurasiHari = (typeof DURASI_HARI)[number];

export const KOTA_BERANGKAT = ["Jakarta", "Yogyakarta", "Surabaya", "Makassar", "Medan", "Bali"] as const;
export type KotaBerangkat = (typeof KOTA_BERANGKAT)[number];

export const KOTA_TUJUAN = ["Jeddah", "Madinah"] as const;
export type KotaTujuan = (typeof KOTA_TUJUAN)[number];

export const KOTA_RUTE = ["Madinah - Mekkah", "Mekkah - Madinah"] as const;
export type KotaRute = (typeof KOTA_RUTE)[number];

export const MASKAPAI = [
  "Saudia",
  "Garuda Indonesia",
  "Lion Air",
  "Emirates",
  "Air Asia",
  "Oman Air",
  "Indigo",
  "Etihad",
  "Ethiopian",
  "Turkish",
  "Scoot",
  "Hainan",
] as const;
export type Maskapai = (typeof MASKAPAI)[number];

export const PENERBANGAN = ["Transit", "Direct"] as const;
export type Penerbangan = (typeof PENERBANGAN)[number];

export const TRANSPORTASI = ["Bis", "Kereta Cepat"] as const;
export type Transportasi = (typeof TRANSPORTASI)[number];

/** Handling bandara — opsi umum (demo). */
export const HANDLING_BANDARA = ["Standar", "VIP Meet & Greet", "Tidak termasuk"] as const;
export type HandlingBandara = (typeof HANDLING_BANDARA)[number];

export const PERLENGKAPAN = ["Basic", "Medium", "Premium"] as const;
export type Perlengkapan = (typeof PERLENGKAPAN)[number];

export const MANASIK = ["Online", "Offline"] as const;
export type Manasik = (typeof MANASIK)[number];

export const YA_TIDAK = ["Ya", "Tidak"] as const;
export type YaTidak = (typeof YA_TIDAK)[number];

export const ZIARAH_TAMBAHAN = ["Al Ula", "Korniece"] as const;
export type ZiarahTambahan = (typeof ZIARAH_TAMBAHAN)[number];
