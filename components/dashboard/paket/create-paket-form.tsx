"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import type { UmrohPackage } from "@/lib/paket/dummy-data";
import {
  DURASI_HARI,
  HANDLING_BANDARA,
  KOTA_BERANGKAT,
  KOTA_RUTE,
  KOTA_TUJUAN,
  MANASIK,
  MASKAPAI,
  PAKET_TIPE,
  PENERBANGAN,
  PERLENGKAPAN,
  TRANSPORTASI,
  YA_TIDAK,
  ZIARAH_TAMBAHAN,
} from "@/lib/paket/package-form-options";
import { defaultPackageFormValues, type PackageFormValues } from "@/lib/paket/package-form-types";
import { estimatePackagePricing } from "@/lib/paket/package-pricing";
import { appendUserPackage, clearFormDraft, loadFormDraft, saveFormDraft } from "@/lib/paket/package-storage";
import { formValuesToUmrohPackage, newPackageId, validatePackageForm } from "@/lib/paket/map-form-to-package";
import type { FieldErrors } from "@/lib/paket/map-form-to-package";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/45 px-3 py-2.5 text-sm text-zinc-50 shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500/60 focus:border-zinc-500/45 focus:ring-2 focus:ring-zinc-600/15";
const selectClass = `${inputClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`;
const labelClass = "text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400/70";
const errClass = "mt-1 text-xs font-medium text-rose-300/95";

function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-zinc-600/15 pb-2 text-sm font-bold uppercase tracking-wide text-zinc-300/90">{children}</h3>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className={labelClass}>{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass + (error ? " border-rose-400/40 ring-1 ring-rose-500/20" : "")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error ? (
        <p id={`${id}-err`} className={errClass} role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  error,
  min = 0,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  error?: string;
  min?: number;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className={labelClass}>{label}</span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        step={1}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className={inputClass + (error ? " border-rose-400/40 ring-1 ring-rose-500/20" : "")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error ? (
        <p id={`${id}-err`} className={errClass} role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function SelectField<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
  error?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className={labelClass}>{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={selectClass + (error ? " border-rose-400/40 ring-1 ring-rose-500/20" : "")}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2334d399' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        }}
        aria-invalid={Boolean(error)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-zinc-950 text-zinc-50">
            {o}
          </option>
        ))}
      </select>
      {error ? (
        <p className={errClass} role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-600/10 bg-zinc-950/30 px-3 py-2.5 transition hover:border-zinc-500/25">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-zinc-600/40 bg-zinc-950 text-zinc-600 focus:ring-zinc-600/40"
      />
      <span className="text-sm font-medium text-zinc-200/90">{label}</span>
    </label>
  );
}

export function CreatePaketForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: (pkg: UmrohPackage) => void;
  onCancel: () => void;
}) {
  const [v, setV] = useState<PackageFormValues>(() => {
    const d = loadFormDraft();
    return d ?? defaultPackageFormValues();
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [draftMsg, setDraftMsg] = useState<string | null>(null);

  const todayIso = useMemo(() => todayIsoDate(), []);

  const pricing = useMemo(() => estimatePackagePricing(v), [v]);

  const set = useCallback(<K extends keyof PackageFormValues>(key: K, val: PackageFormValues[K]) => {
    setV((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });
    setDraftMsg(null);
  }, []);

  function handleDraft() {
    saveFormDraft(v);
    setDraftMsg("Draft disimpan di perangkat ini.");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eMap = validatePackageForm(v, todayIso);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    const id = newPackageId();
    const pkg = formValuesToUmrohPackage(v, id);
    appendUserPackage(pkg);
    clearFormDraft();
    setV(defaultPackageFormValues());
    onSuccess(pkg);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 px-5 py-5 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <SectionTitle>Paket & jadwal</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField
                id="namaPaket"
                label="Nama paket"
                value={v.namaPaket}
                onChange={(x) => set("namaPaket", x)}
                error={errors.namaPaket}
                placeholder="Contoh: Ramadan Syawal Premium"
              />
            </div>
            <SelectField
              id="pilihPaket"
              label="Pilih paket"
              value={v.pilihPaket}
              onChange={(x) => set("pilihPaket", x)}
              options={PAKET_TIPE}
            />
            <SelectField
              id="durasiPaket"
              label="Durasi paket"
              value={v.durasiPaket}
              onChange={(x) => set("durasiPaket", x)}
              options={DURASI_HARI}
            />
            <label htmlFor="tanggal" className="block sm:col-span-2">
              <span className={labelClass}>Tanggal keberangkatan</span>
              <input
                id="tanggal"
                type="date"
                min={todayIso}
                value={v.tanggalKeberangkatan}
                onChange={(e) => set("tanggalKeberangkatan", e.target.value)}
                className={inputClass + (errors.tanggalKeberangkatan ? " border-rose-400/40 ring-1 ring-rose-500/20" : "")}
              />
              {errors.tanggalKeberangkatan ? (
                <p className={errClass} role="alert">
                  {errors.tanggalKeberangkatan}
                </p>
              ) : null}
            </label>
            <SelectField
              id="kotaBerangkat"
              label="Kota keberangkatan"
              value={v.kotaKeberangkatan}
              onChange={(x) => set("kotaKeberangkatan", x)}
              options={KOTA_BERANGKAT}
              error={errors.kotaKeberangkatan}
            />
            <NumberField
              id="jumlahJamaah"
              label="Jumlah jamaah"
              value={v.jumlahJamaah}
              onChange={(x) => set("jumlahJamaah", x)}
              error={errors.jumlahJamaah}
              min={1}
            />
          </div>

          <SectionTitle>Rute & penerbangan</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField id="kotaTujuan" label="Kota tujuan" value={v.kotaTujuan} onChange={(x) => set("kotaTujuan", x)} options={KOTA_TUJUAN} />
            <SelectField id="kotaRute" label="Kota rute" value={v.kotaRute} onChange={(x) => set("kotaRute", x)} options={KOTA_RUTE} />
            <SelectField id="maskapai" label="Maskapai" value={v.maskapai} onChange={(x) => set("maskapai", x)} options={MASKAPAI} />
            <SelectField
              id="penerbangan"
              label="Penerbangan"
              value={v.penerbangan}
              onChange={(x) => set("penerbangan", x)}
              options={PENERBANGAN}
            />
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle>Hotel & menginap</SectionTitle>
          <div className="grid gap-4">
            <TextField
              id="hotelMd"
              label="Nama hotel di Madinah"
              value={v.hotelMadinah}
              onChange={(x) => set("hotelMadinah", x)}
              error={errors.hotelMadinah}
              placeholder="Contoh: Oberoi Madinah"
            />
            <TextField
              id="hotelMk"
              label="Nama hotel di Mekkah"
              value={v.hotelMekkah}
              onChange={(x) => set("hotelMekkah", x)}
              error={errors.hotelMekkah}
              placeholder="Contoh: Swissotel Makkah"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                id="malamMd"
                label="Durasi menginap di Madinah (malam)"
                value={v.malamMadinah}
                onChange={(x) => set("malamMadinah", x)}
                error={errors.malamMadinah}
                min={0}
              />
              <NumberField
                id="malamMk"
                label="Durasi menginap di Mekkah (malam)"
                value={v.malamMekkah}
                onChange={(x) => set("malamMekkah", x)}
                error={errors.malamMekkah}
                min={0}
              />
            </div>
          </div>

          <SectionTitle>Transport & handling</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="transport"
              label="Pilihan transportasi"
              value={v.transportasi}
              onChange={(x) => set("transportasi", x)}
              options={TRANSPORTASI}
            />
            <SelectField
              id="hb1"
              label="Handling bandara keberangkatan"
              value={v.handlingBerangkat}
              onChange={(x) => set("handlingBerangkat", x)}
              options={HANDLING_BANDARA}
            />
            <SelectField
              id="hb2"
              label="Handling bandara kedatangan"
              value={v.handlingKedatangan}
              onChange={(x) => set("handlingKedatangan", x)}
              options={HANDLING_BANDARA}
            />
          </div>

          <SectionTitle>Layanan & compliance</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-3">
            <CheckRow id="asuransi" label="Asuransi" checked={v.asuransi} onChange={(x) => set("asuransi", x)} />
            <CheckRow id="visa" label="Visa" checked={v.visa} onChange={(x) => set("visa", x)} />
            <CheckRow id="sisko" label="Siskopatuh" checked={v.siskopatuh} onChange={(x) => set("siskopatuh", x)} />
          </div>

          <SectionTitle>Tim lapangan & program</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="tl" label="Tour leader" value={v.tourLeader} onChange={(x) => set("tourLeader", x)} placeholder="Nama TL" />
            <TextField id="mut" label="Muthowif" value={v.muthowif} onChange={(x) => set("muthowif", x)} placeholder="Nama muthowif" />
            <SelectField
              id="perl"
              label="Perlengkapan"
              value={v.perlengkapan}
              onChange={(x) => set("perlengkapan", x)}
              options={PERLENGKAPAN}
            />
            <SelectField id="manasik" label="Manasik" value={v.manasik} onChange={(x) => set("manasik", x)} options={MANASIK} />
            <SelectField
              id="ctm"
              label="City tour Madinah"
              value={v.cityTourMadinah}
              onChange={(x) => set("cityTourMadinah", x)}
              options={YA_TIDAK}
            />
            <SelectField
              id="ctk"
              label="City tour Mekkah"
              value={v.cityTourMekkah}
              onChange={(x) => set("cityTourMekkah", x)}
              options={YA_TIDAK}
            />
            <SelectField
              id="ziarah"
              label="Ziarah tambahan"
              value={v.ziarahTambahan}
              onChange={(x) => set("ziarahTambahan", x)}
              options={ZIARAH_TAMBAHAN}
            />
          </div>
        </div>
      </div>

      <motion.div
        layout
        className="sticky bottom-0 z-[2] rounded-2xl border border-zinc-500/25 bg-gradient-to-br from-zinc-950/95 to-zinc-900/90 p-4 shadow-xl shadow-black/30 backdrop-blur-md sm:p-5"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={labelClass}>Ringkasan harga modal total</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-zinc-200">{formatIdrCompact(pricing.totalModalIdr)}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-600/60">Ringkasan harga per jamaah</p>
            <p className="font-mono text-lg font-semibold text-zinc-50">{formatIdrCompact(pricing.perJamaahIdr)}</p>
            <p className="mt-2 text-[11px] text-slate-500/90">Perhitungan demo mengikuti pilihan form; dapat disesuaikan dengan kebijakan keuangan.</p>
          </div>
          <div className="flex flex-col gap-2 sm:min-w-[220px]">
            {draftMsg ? <p className="text-center text-xs font-medium text-zinc-400/90">{draftMsg}</p> : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-zinc-300/85 transition hover:bg-white/5 min-[400px]:flex-none min-[400px]:px-5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDraft}
                className="flex-1 rounded-xl border border-zinc-500/30 bg-zinc-600/10 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-600/20 min-[400px]:flex-none min-[400px]:px-5"
              >
                Simpan draft
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl border border-zinc-500/40 bg-gradient-to-r from-zinc-600 to-zinc-900 py-2.5 text-sm font-bold text-white shadow-lg shadow-zinc-950/40 transition hover:brightness-110 min-[400px]:flex-none min-[400px]:px-6"
              >
                Buat paket
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </form>
  );
}
