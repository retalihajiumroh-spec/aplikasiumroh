"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { loadUserPackages } from "@/lib/paket/package-storage";
import {
  JENIS_KELAMIN,
  KEWARGANEGARAAN,
  mergePackageOptions,
  MITRA_QUERY_KEYS,
  PENDIDIKAN,
  PEKERJAAN,
  STATUS_PERNIKAHAN,
  jamaahInputPackageOptions,
} from "@/lib/jamaah/input-form-data";

const inputClass =
  "mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/45 px-3 py-2.5 text-sm text-zinc-50 outline-none transition placeholder:text-slate-500/60 focus:border-zinc-500/45 focus:ring-2 focus:ring-zinc-600/15";
const inputErr = " border-rose-400/45 ring-1 ring-rose-500/25";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-zinc-400/65";

function FormSection({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="glass-panel rounded-2xl border border-zinc-600/10 p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-50">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-400/90">{subtitle}</p> : null}
      <div className="mt-6 space-y-4">{children}</div>
    </section>
  );
}

export interface JamaahInputValues {
  namaSesuaiKtp: string;
  noKtp: string;
  noWa: string;
  jenisKelamin: string;
  kewarganegaraan: string;
  packageId: string;
  mitra: string;
  tempatLahir: string;
  tanggalLahir: string;
  statusPernikahan: string;
  pendidikan: string;
  pekerjaan: string;
  namaAyah: string;
  namaSaudaraDarurat: string;
  noWaSaudaraDarurat: string;
  alamatJalan: string;
  rtRw: string;
  kelurahanDesa: string;
  kabupatenKota: string;
  provinsi: string;
  kodePos: string;
  noPaspor: string;
  namaSesuaiPaspor: string;
  namaTambahanHal5: string;
  tanggalPaspor: string;
  tanggalKadaluarsaPaspor: string;
  kotaPaspor: string;
  permintaanKhusus: string;
}

function emptyForm(packageIdDefault: string): JamaahInputValues {
  return {
    namaSesuaiKtp: "",
    noKtp: "",
    noWa: "",
    jenisKelamin: JENIS_KELAMIN[0],
    kewarganegaraan: KEWARGANEGARAAN[0],
    packageId: packageIdDefault,
    mitra: "",
    tempatLahir: "",
    tanggalLahir: "",
    statusPernikahan: STATUS_PERNIKAHAN[0],
    pendidikan: PENDIDIKAN[2],
    pekerjaan: PEKERJAAN[0],
    namaAyah: "",
    namaSaudaraDarurat: "",
    noWaSaudaraDarurat: "",
    alamatJalan: "",
    rtRw: "",
    kelurahanDesa: "",
    kabupatenKota: "",
    provinsi: "",
    kodePos: "",
    noPaspor: "",
    namaSesuaiPaspor: "",
    namaTambahanHal5: "",
    tanggalPaspor: "",
    tanggalKadaluarsaPaspor: "",
    kotaPaspor: "",
    permintaanKhusus: "",
  };
}

function nextJamaahId() {
  return `J-${Math.floor(20_000 + Math.random() * 9_000)}`;
}

function isJpegFile(f: File | null): boolean {
  if (!f) return false;
  return f.type === "image/jpeg" || /\.jpe?g$/i.test(f.name);
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type FieldKey = keyof JamaahInputValues | "fileKtp" | "fileKk" | "filePaspor" | "filePasFoto" | "fileVaksin";

type Errors = Partial<Record<FieldKey, string>>;

export function JamaahInputForm() {
  const searchParams = useSearchParams();
  const [pkgOpts, setPkgOpts] = useState(jamaahInputPackageOptions);
  const defaultPid = jamaahInputPackageOptions[0]?.id ?? "";

  const [v, setV] = useState(() => emptyForm(defaultPid));
  const [fileKtp, setFileKtp] = useState<File | null>(null);
  const [fileKk, setFileKk] = useState<File | null>(null);
  const [filePaspor, setFilePaspor] = useState<File | null>(null);
  const [filePasFoto, setFilePasFoto] = useState<File | null>(null);
  const [fileVaksin, setFileVaksin] = useState<File | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [referralNote, setReferralNote] = useState<string | null>(null);

  useEffect(() => {
    const merged = mergePackageOptions(loadUserPackages());
    setPkgOpts(merged);
  }, []);

  useEffect(() => {
    if (pkgOpts.length === 0) return;
    setV((prev) => (pkgOpts.some((p) => p.id === prev.packageId) ? prev : { ...prev, packageId: pkgOpts[0].id }));
  }, [pkgOpts]);

  useEffect(() => {
    if (!searchParams) return;
    for (const key of MITRA_QUERY_KEYS) {
      const raw = searchParams.get(key)?.trim();
      if (raw) {
        const decoded = decodeURIComponent(raw);
        setV((prev) => ({ ...prev, mitra: decoded }));
        setReferralNote(`Mitra diisi otomatis dari parameter URL (${key}).`);
        return;
      }
    }
    setReferralNote(null);
  }, [searchParams]);

  const setField = useCallback(<K extends keyof JamaahInputValues>(key: K, val: JamaahInputValues[K]) => {
    setV((prev) => ({ ...prev, [key]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[key];
      return n;
    });
  }, []);

  const validate = useCallback((): Errors => {
    const e: Errors = {};
    const req = (key: keyof JamaahInputValues, msg: string) => {
      if (!String(v[key] ?? "").trim()) e[key] = msg;
    };

    req("namaSesuaiKtp", "Wajib diisi.");
    req("noKtp", "Wajib diisi.");
    req("noWa", "Wajib diisi.");
    req("tempatLahir", "Wajib diisi.");
    req("tanggalLahir", "Wajib diisi.");
    req("namaAyah", "Wajib diisi.");
    req("namaSaudaraDarurat", "Wajib diisi.");
    req("noWaSaudaraDarurat", "Wajib diisi.");
    req("alamatJalan", "Wajib diisi.");
    req("rtRw", "Wajib diisi.");
    req("kelurahanDesa", "Wajib diisi.");
    req("kabupatenKota", "Wajib diisi.");
    req("provinsi", "Wajib diisi.");
    req("kodePos", "Wajib diisi.");
    req("noPaspor", "Wajib diisi.");
    req("namaSesuaiPaspor", "Wajib diisi.");
    req("tanggalPaspor", "Wajib diisi.");
    req("tanggalKadaluarsaPaspor", "Wajib diisi.");
    req("kotaPaspor", "Wajib diisi.");

    if (!v.packageId) e.packageId = "Pilih paket umroh.";

    const tgl = v.tanggalLahir;
    if (tgl && tgl >= todayIso()) e.tanggalLahir = "Tanggal lahir harus di masa lalu.";

    const tp = v.tanggalPaspor;
    const te = v.tanggalKadaluarsaPaspor;
    if (tp && te && te <= tp) e.tanggalKadaluarsaPaspor = "Kadaluarsa harus setelah tanggal paspor diterbitkan.";

    if (v.kewarganegaraan === "Indonesia") {
      const digits = v.noKtp.replace(/\D/g, "");
      if (digits.length !== 16) e.noKtp = "NIK Indonesia harus 16 digit angka.";
    }

    const files: { f: File | null; key: FieldKey; label: string }[] = [
      { f: fileKtp, key: "fileKtp", label: "Foto KTP" },
      { f: fileKk, key: "fileKk", label: "Foto Kartu Keluarga" },
      { f: filePaspor, key: "filePaspor", label: "Foto Paspor" },
      { f: filePasFoto, key: "filePasFoto", label: "Pas foto" },
      { f: fileVaksin, key: "fileVaksin", label: "Foto vaksin" },
    ];
    for (const { f, key, label } of files) {
      if (!f) e[key] = `${label} wajib diunggah (JPG).`;
      else if (!isJpegFile(f)) e[key] = "Hanya format JPG / JPEG.";
    }

    return e;
  }, [v, fileKtp, fileKk, filePaspor, filePasFoto, fileVaksin]);

  const resetForm = useCallback(() => {
    const pid = pkgOpts[0]?.id ?? defaultPid;
    setV(emptyForm(pid));
    setFileKtp(null);
    setFileKk(null);
    setFilePaspor(null);
    setFilePasFoto(null);
    setFileVaksin(null);
    setErrors({});
    setCreatedId(null);
    if (searchParams) {
      for (const key of MITRA_QUERY_KEYS) {
        const raw = searchParams.get(key)?.trim();
        if (raw) {
          setV((prev) => ({ ...prev, mitra: decodeURIComponent(raw) }));
          break;
        }
      }
    }
  }, [pkgOpts, defaultPid, searchParams]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const eMap = validate();
      setErrors(eMap);
      if (Object.keys(eMap).length > 0) return;

      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        setCreatedId(nextJamaahId());
      }, 500);
    },
    [validate],
  );

  const errCls = useCallback((key: FieldKey) => (errors[key] ? inputErr : ""), [errors]);

  if (createdId) {
    return (
      <div className="relative min-h-dvh overflow-x-hidden pb-24 pt-6 sm:pt-10">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 88% 40%, rgba(156, 77, 204, 0.07), transparent 40%)",
          }}
        />
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl border border-zinc-500/25 bg-zinc-600/[0.08] p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400/80">Berhasil (demo)</p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-50">Jamaah {createdId}</h2>
            <p className="mt-2 text-sm text-zinc-300/70">
              Data tersimpan secara lokal untuk demo. Unggahan: {fileKtp?.name}, {fileKk?.name}, …
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setCreatedId(null);
                  resetForm();
                }}
                className="rounded-xl border border-zinc-500/35 bg-zinc-600/15 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition hover:bg-zinc-600/25"
              >
                Input jamaah lain
              </button>
              <Link
                href="/dashboard/jamaah"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-zinc-300/85 transition hover:bg-white/5"
              >
                Kembali ke daftar Jamaah
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-28 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 88% 40%, rgba(156, 77, 204, 0.07), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">Input Jamaah</h1>
            <p className="mt-2 text-sm text-slate-400/90 sm:text-base">
              Lengkapi data sesuai KTP & paspor. Mitra dapat terisi otomatis dari link referral (`?mitra=` / `?ref=`).
            </p>
            {referralNote ? (
              <p className="mt-2 rounded-lg border border-zinc-500/25 bg-zinc-600/10 px-3 py-2 text-xs text-zinc-200/90">{referralNote}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/jamaah"
              className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
            >
              ← Daftar Jamaah
            </Link>
          </div>
        </motion.header>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
          noValidate
        >
          <FormSection title="Identitas (KTP)" subtitle="Nama dan nomor sesuai dokumen resmi.">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className={labelClass}>Nama sesuai KTP</span>
                <input
                  value={v.namaSesuaiKtp}
                  onChange={(e) => setField("namaSesuaiKtp", e.target.value)}
                  className={inputClass + errCls("namaSesuaiKtp")}
                  placeholder="Sesuai KTP"
                  autoComplete="name"
                />
                {errors.namaSesuaiKtp ? <p className="mt-1 text-xs text-rose-300">{errors.namaSesuaiKtp}</p> : null}
              </label>
              <label>
                <span className={labelClass}>No. KTP / NIK</span>
                <input
                  value={v.noKtp}
                  onChange={(e) => setField("noKtp", e.target.value)}
                  className={inputClass + errCls("noKtp")}
                  placeholder="16 digit"
                  inputMode="numeric"
                />
                {errors.noKtp ? <p className="mt-1 text-xs text-rose-300">{errors.noKtp}</p> : null}
              </label>
              <label>
                <span className={labelClass}>No. WhatsApp</span>
                <input
                  value={v.noWa}
                  onChange={(e) => setField("noWa", e.target.value)}
                  className={inputClass + errCls("noWa")}
                  placeholder="08xxxxxxxxxx"
                  inputMode="tel"
                />
                {errors.noWa ? <p className="mt-1 text-xs text-rose-300">{errors.noWa}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Jenis kelamin</span>
                <select
                  value={v.jenisKelamin}
                  onChange={(e) => setField("jenisKelamin", e.target.value)}
                  className={inputClass}
                >
                  {JENIS_KELAMIN.map((x) => (
                    <option key={x} value={x} className="bg-zinc-950">
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={labelClass}>Kewarganegaraan</span>
                <select
                  value={v.kewarganegaraan}
                  onChange={(e) => setField("kewarganegaraan", e.target.value)}
                  className={inputClass}
                >
                  {KEWARGANEGARAAN.map((x) => (
                    <option key={x} value={x} className="bg-zinc-950">
                      {x}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </FormSection>

          <FormSection title="Paket & mitra" subtitle="Pilih paket. Mitra dari link referral dapat diganti jika perlu.">
            <label>
              <span className={labelClass}>Pilihan paket umroh</span>
              <select
                value={v.packageId}
                onChange={(e) => setField("packageId", e.target.value)}
                className={inputClass + errCls("packageId")}
              >
                {pkgOpts.map((p) => (
                  <option key={p.id} value={p.id} className="bg-zinc-950">
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.packageId ? <p className="mt-1 text-xs text-rose-300">{errors.packageId}</p> : null}
            </label>
            <label>
              <span className={labelClass}>Mitra (referral)</span>
              <input
                value={v.mitra}
                onChange={(e) => setField("mitra", e.target.value)}
                className={inputClass}
                placeholder="Kode / nama mitra — otomatis dari URL bila ada"
              />
              <p className="mt-1 text-[11px] text-slate-500/90">Contoh link: `/dashboard/jamaah/input?mitra=MITRA-001`</p>
            </label>
          </FormSection>

          <FormSection title="Data kelahiran & demografi">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClass}>Tempat lahir</span>
                <input
                  value={v.tempatLahir}
                  onChange={(e) => setField("tempatLahir", e.target.value)}
                  className={inputClass + errCls("tempatLahir")}
                />
                {errors.tempatLahir ? <p className="mt-1 text-xs text-rose-300">{errors.tempatLahir}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Tanggal lahir</span>
                <input
                  type="date"
                  max={todayIso()}
                  value={v.tanggalLahir}
                  onChange={(e) => setField("tanggalLahir", e.target.value)}
                  className={inputClass + errCls("tanggalLahir")}
                />
                {errors.tanggalLahir ? <p className="mt-1 text-xs text-rose-300">{errors.tanggalLahir}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Status pernikahan</span>
                <select
                  value={v.statusPernikahan}
                  onChange={(e) => setField("statusPernikahan", e.target.value)}
                  className={inputClass}
                >
                  {STATUS_PERNIKAHAN.map((x) => (
                    <option key={x} value={x} className="bg-zinc-950">
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={labelClass}>Pendidikan</span>
                <select
                  value={v.pendidikan}
                  onChange={(e) => setField("pendidikan", e.target.value)}
                  className={inputClass}
                >
                  {PENDIDIKAN.map((x) => (
                    <option key={x} value={x} className="bg-zinc-950">
                      {x}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className={labelClass}>Pekerjaan</span>
                <select
                  value={v.pekerjaan}
                  onChange={(e) => setField("pekerjaan", e.target.value)}
                  className={inputClass}
                >
                  {PEKERJAAN.map((x) => (
                    <option key={x} value={x} className="bg-zinc-950">
                      {x}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </FormSection>

          <FormSection title="Keluarga & kontak darurat">
            <label>
              <span className={labelClass}>Nama ayah</span>
              <input value={v.namaAyah} onChange={(e) => setField("namaAyah", e.target.value)} className={inputClass + errCls("namaAyah")} />
              {errors.namaAyah ? <p className="mt-1 text-xs text-rose-300">{errors.namaAyah}</p> : null}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClass}>Nama saudara kandung (keadaan darurat)</span>
                <input
                  value={v.namaSaudaraDarurat}
                  onChange={(e) => setField("namaSaudaraDarurat", e.target.value)}
                  className={inputClass + errCls("namaSaudaraDarurat")}
                />
                {errors.namaSaudaraDarurat ? <p className="mt-1 text-xs text-rose-300">{errors.namaSaudaraDarurat}</p> : null}
              </label>
              <label>
                <span className={labelClass}>No. WA saudara kandung</span>
                <input
                  value={v.noWaSaudaraDarurat}
                  onChange={(e) => setField("noWaSaudaraDarurat", e.target.value)}
                  className={inputClass + errCls("noWaSaudaraDarurat")}
                  inputMode="tel"
                />
                {errors.noWaSaudaraDarurat ? <p className="mt-1 text-xs text-rose-300">{errors.noWaSaudaraDarurat}</p> : null}
              </label>
            </div>
          </FormSection>

          <FormSection title="Alamat rumah">
            <label>
              <span className={labelClass}>Alamat (nama jalan)</span>
              <input
                value={v.alamatJalan}
                onChange={(e) => setField("alamatJalan", e.target.value)}
                className={inputClass + errCls("alamatJalan")}
              />
              {errors.alamatJalan ? <p className="mt-1 text-xs text-rose-300">{errors.alamatJalan}</p> : null}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClass}>RT / RW</span>
                <input value={v.rtRw} onChange={(e) => setField("rtRw", e.target.value)} className={inputClass + errCls("rtRw")} placeholder="001/002" />
                {errors.rtRw ? <p className="mt-1 text-xs text-rose-300">{errors.rtRw}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Kelurahan / Desa</span>
                <input
                  value={v.kelurahanDesa}
                  onChange={(e) => setField("kelurahanDesa", e.target.value)}
                  className={inputClass + errCls("kelurahanDesa")}
                />
                {errors.kelurahanDesa ? <p className="mt-1 text-xs text-rose-300">{errors.kelurahanDesa}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Kabupaten / Kota</span>
                <input
                  value={v.kabupatenKota}
                  onChange={(e) => setField("kabupatenKota", e.target.value)}
                  className={inputClass + errCls("kabupatenKota")}
                />
                {errors.kabupatenKota ? <p className="mt-1 text-xs text-rose-300">{errors.kabupatenKota}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Provinsi</span>
                <input value={v.provinsi} onChange={(e) => setField("provinsi", e.target.value)} className={inputClass + errCls("provinsi")} />
                {errors.provinsi ? <p className="mt-1 text-xs text-rose-300">{errors.provinsi}</p> : null}
              </label>
              <label className="sm:col-span-2">
                <span className={labelClass}>Kode pos</span>
                <input
                  value={v.kodePos}
                  onChange={(e) => setField("kodePos", e.target.value)}
                  className={inputClass + errCls("kodePos")}
                  inputMode="numeric"
                />
                {errors.kodePos ? <p className="mt-1 text-xs text-rose-300">{errors.kodePos}</p> : null}
              </label>
            </div>
          </FormSection>

          <FormSection title="Paspor">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClass}>No. paspor</span>
                <input value={v.noPaspor} onChange={(e) => setField("noPaspor", e.target.value)} className={inputClass + errCls("noPaspor")} />
                {errors.noPaspor ? <p className="mt-1 text-xs text-rose-300">{errors.noPaspor}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Nama sesuai paspor</span>
                <input
                  value={v.namaSesuaiPaspor}
                  onChange={(e) => setField("namaSesuaiPaspor", e.target.value)}
                  className={inputClass + errCls("namaSesuaiPaspor")}
                />
                {errors.namaSesuaiPaspor ? <p className="mt-1 text-xs text-rose-300">{errors.namaSesuaiPaspor}</p> : null}
              </label>
              <label className="sm:col-span-2">
                <span className={labelClass}>Nama tambahan halaman 5 paspor (jika nama satu kata)</span>
                <input
                  value={v.namaTambahanHal5}
                  onChange={(e) => setField("namaTambahanHal5", e.target.value)}
                  className={inputClass}
                  placeholder="Opsional"
                />
              </label>
              <label>
                <span className={labelClass}>Tanggal paspor diterbitkan</span>
                <input
                  type="date"
                  value={v.tanggalPaspor}
                  onChange={(e) => setField("tanggalPaspor", e.target.value)}
                  className={inputClass + errCls("tanggalPaspor")}
                />
                {errors.tanggalPaspor ? <p className="mt-1 text-xs text-rose-300">{errors.tanggalPaspor}</p> : null}
              </label>
              <label>
                <span className={labelClass}>Tanggal kadaluarsa paspor</span>
                <input
                  type="date"
                  value={v.tanggalKadaluarsaPaspor}
                  onChange={(e) => setField("tanggalKadaluarsaPaspor", e.target.value)}
                  className={inputClass + errCls("tanggalKadaluarsaPaspor")}
                />
                {errors.tanggalKadaluarsaPaspor ? <p className="mt-1 text-xs text-rose-300">{errors.tanggalKadaluarsaPaspor}</p> : null}
              </label>
              <label className="sm:col-span-2">
                <span className={labelClass}>Kota paspor diterbitkan</span>
                <input value={v.kotaPaspor} onChange={(e) => setField("kotaPaspor", e.target.value)} className={inputClass + errCls("kotaPaspor")} />
                {errors.kotaPaspor ? <p className="mt-1 text-xs text-rose-300">{errors.kotaPaspor}</p> : null}
              </label>
            </div>
          </FormSection>

          <FormSection title="Unggah dokumen" subtitle="Format JPG saja (demo — file tidak diunggah ke server).">
            {(
              [
                { file: fileKtp, set: setFileKtp, label: "Foto KTP", errKey: "fileKtp" as const },
                { file: fileKk, set: setFileKk, label: "Foto Kartu Keluarga", errKey: "fileKk" as const },
                { file: filePaspor, set: setFilePaspor, label: "Foto Paspor", errKey: "filePaspor" as const },
                {
                  file: filePasFoto,
                  set: setFilePasFoto,
                  label: "Pas foto 80% wajah, background putih",
                  errKey: "filePasFoto" as const,
                },
                {
                  file: fileVaksin,
                  set: setFileVaksin,
                  label: "Foto vaksin Meningitis & Polio",
                  errKey: "fileVaksin" as const,
                },
              ] as const
            ).map((row) => (
              <label key={row.errKey} className="block rounded-xl border border-zinc-600/12 bg-zinc-950/25 px-4 py-3">
                <span className={labelClass}>{row.label}</span>
                <input
                  type="file"
                  accept="image/jpeg,.jpg,.jpeg"
                  onChange={(e) => {
                    row.set(e.target.files?.[0] ?? null);
                    setErrors((er) => {
                      const n = { ...er };
                      delete n[row.errKey];
                      return n;
                    });
                  }}
                  className={
                    "mt-2 block w-full text-xs text-zinc-300/80 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-600/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-200 " +
                    (errors[row.errKey] ? "rounded-lg ring-1 ring-rose-400/40" : "")
                  }
                />
                {row.file ? <p className="mt-2 truncate font-mono text-[11px] text-zinc-400/80">{row.file.name}</p> : null}
                {errors[row.errKey] ? <p className="mt-1 text-xs text-rose-300">{errors[row.errKey]}</p> : null}
              </label>
            ))}
          </FormSection>

          <FormSection title="Permintaan khusus" subtitle="Contoh: upgrade kamar, upgrade pesawat, upgrade hotel.">
            <label>
              <span className={labelClass}>Catatan</span>
              <textarea
                value={v.permintaanKhusus}
                onChange={(e) => setField("permintaanKhusus", e.target.value)}
                rows={4}
                className={inputClass + " min-h-[100px] resize-y"}
                placeholder="Tulis permintaan atau kosongkan jika tidak ada."
              />
            </label>
          </FormSection>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300/80 transition hover:bg-white/5"
            >
              Reset form
            </button>
            <motion.button
              type="submit"
              disabled={submitting}
              className="rounded-xl border border-zinc-500/40 bg-gradient-to-r from-zinc-600 to-zinc-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-zinc-950/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Menyimpan…" : "Simpan data jamaah"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
