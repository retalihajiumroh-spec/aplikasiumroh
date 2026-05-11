import type {
  DurasiHari,
  HandlingBandara,
  KotaBerangkat,
  KotaRute,
  KotaTujuan,
  Manasik,
  Maskapai,
  PaketTipe,
  Penerbangan,
  Perlengkapan,
  Transportasi,
  YaTidak,
  ZiarahTambahan,
} from "@/lib/paket/package-form-options";

/** Full form payload (saved with user-created packages for audit / future API). */
export interface PackageFormValues {
  namaPaket: string;
  pilihPaket: PaketTipe;
  durasiPaket: DurasiHari;
  tanggalKeberangkatan: string;
  kotaKeberangkatan: KotaBerangkat;
  kotaTujuan: KotaTujuan;
  kotaRute: KotaRute;
  jumlahJamaah: number;
  maskapai: Maskapai;
  penerbangan: Penerbangan;
  hotelMadinah: string;
  hotelMekkah: string;
  malamMadinah: number;
  malamMekkah: number;
  transportasi: Transportasi;
  handlingBerangkat: HandlingBandara;
  handlingKedatangan: HandlingBandara;
  asuransi: boolean;
  visa: boolean;
  siskopatuh: boolean;
  tourLeader: string;
  muthowif: string;
  perlengkapan: Perlengkapan;
  manasik: Manasik;
  cityTourMadinah: YaTidak;
  cityTourMekkah: YaTidak;
  ziarahTambahan: ZiarahTambahan;
}

export const defaultPackageFormValues = (): PackageFormValues => ({
  namaPaket: "",
  pilihPaket: "Reguler",
  durasiPaket: "12 hari",
  tanggalKeberangkatan: "",
  kotaKeberangkatan: "Jakarta",
  kotaTujuan: "Jeddah",
  kotaRute: "Madinah - Mekkah",
  jumlahJamaah: 40,
  maskapai: "Saudia",
  penerbangan: "Direct",
  hotelMadinah: "",
  hotelMekkah: "",
  malamMadinah: 5,
  malamMekkah: 7,
  transportasi: "Bis",
  handlingBerangkat: "Standar",
  handlingKedatangan: "Standar",
  asuransi: true,
  visa: true,
  siskopatuh: true,
  tourLeader: "",
  muthowif: "",
  perlengkapan: "Medium",
  manasik: "Offline",
  cityTourMadinah: "Ya",
  cityTourMekkah: "Ya",
  ziarahTambahan: "Al Ula",
});
