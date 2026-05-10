"use client";

import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  jamaahInputBranchOptions,
  jamaahInputPackageOptions,
  paymentStatusOptions,
} from "@/lib/jamaah/input-form-data";
import type { PaymentStatus } from "@/lib/jamaah/dummy-data";

function nextJamaahId() {
  return `J-${Math.floor(20_000 + Math.random() * 9_000)}`;
}

function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length < 4) return raw.trim() || "—";
  const tail = d.slice(-4);
  return `+62 •••• ${tail}`;
}

export function JamaahInputForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageId, setPackageId] = useState(jamaahInputPackageOptions[0]?.id ?? "");
  const [branch, setBranch] = useState<(typeof jamaahInputBranchOptions)[number]>("Jakarta Pusat");
  const [payment, setPayment] = useState<PaymentStatus>("unpaid");

  const [visaFile, setVisaFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [vaccineFile, setVaccineFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{
    id: string;
    name: string;
    email: string;
    phoneDisplay: string;
    packageName: string;
    branch: string;
    payment: PaymentStatus;
    files: { visa?: string; passport?: string; vaccination?: string };
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const packageLabel = jamaahInputPackageOptions.find((p) => p.id === packageId)?.label ?? "";

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setPackageId(jamaahInputPackageOptions[0]?.id ?? "");
    setBranch("Jakarta Pusat");
    setPayment("unpaid");
    setVisaFile(null);
    setPassportFile(null);
    setVaccineFile(null);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const n = name.trim();
      const em = email.trim().toLowerCase();
      const ph = phone.trim();
      if (!n || !em || !ph) {
        setError("Nama, email, dan nomor telepon wajib diisi.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        setError("Format email tidak valid.");
        return;
      }
      if (!packageId) {
        setError("Pilih paket umroh.");
        return;
      }

      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        setCreated({
          id: nextJamaahId(),
          name: n,
          email: em,
          phoneDisplay: maskPhone(ph),
          packageName: packageLabel,
          branch,
          payment,
          files: {
            visa: visaFile?.name,
            passport: passportFile?.name,
            vaccination: vaccineFile?.name,
          },
        });
      }, 550);
    },
    [name, email, phone, packageId, packageLabel, branch, payment, visaFile, passportFile, vaccineFile],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-24 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 88% 40%, rgba(56, 189, 248, 0.07), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Input Jamaah</h1>
            <p className="mt-2 text-sm text-emerald-200/55 sm:text-base">
              Tambah data jamaah baru, unggah dokumen pendukung, dan simpan sebagai rekaman lokal (demo tanpa server).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/jamaah"
              className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
            >
              ← Daftar Jamaah
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
            >
              Hub
            </Link>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {created ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-10 glass-panel rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">Berhasil dibuat (demo)</p>
              <h2 className="mt-2 text-xl font-semibold text-emerald-50">Jamaah {created.id}</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Nama</dt>
                  <dd className="font-medium text-emerald-50">{created.name}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Email</dt>
                  <dd className="break-all font-mono text-xs text-emerald-100/90">{created.email}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Telepon</dt>
                  <dd className="font-mono text-emerald-100/90">{created.phoneDisplay}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Paket</dt>
                  <dd className="text-right text-emerald-100/90">{created.packageName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Cabang</dt>
                  <dd className="text-emerald-100/90">{created.branch}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-emerald-500/10 py-2">
                  <dt className="text-emerald-200/55">Pembayaran</dt>
                  <dd className="text-emerald-100/90">{paymentStatusOptions.find((o) => o.value === created.payment)?.label}</dd>
                </div>
                <div className="pt-2">
                  <dt className="text-emerald-200/55">Dokumen</dt>
                  <dd className="mt-1 space-y-1 text-xs text-emerald-200/70">
                    <p>Visa: {created.files.visa ?? "— belum unggah"}</p>
                    <p>Paspor: {created.files.passport ?? "— belum unggah"}</p>
                    <p>Vaksin: {created.files.vaccination ?? "— belum unggah"}</p>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setCreated(null);
                    resetForm();
                  }}
                  className="rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-500/25"
                >
                  Input jamaah lain
                </button>
                <Link
                  href="/dashboard/jamaah"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-emerald-200/85 transition hover:bg-white/5"
                >
                  Lihat daftar Jamaah
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="mt-10 space-y-8"
            >
              <section className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-emerald-50">Data jamaah</h2>
                <p className="mt-1 text-sm text-emerald-200/50">Identitas dan paket yang dipilih.</p>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nama lengkap</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45"
                      placeholder="Sesuai KTP / paspor"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45"
                      placeholder="nama@email.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nomor telepon (WhatsApp)</span>
                    <input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50 placeholder:text-emerald-600/45"
                      placeholder="0812xxxxxxxx"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Paket umroh</span>
                      <select
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                      >
                        {jamaahInputPackageOptions.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Cabang pendaftaran</span>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value as (typeof jamaahInputBranchOptions)[number])}
                        className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                      >
                        {jamaahInputBranchOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Status pembayaran</span>
                    <select
                      value={payment}
                      onChange={(e) => setPayment(e.target.value as PaymentStatus)}
                      className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                    >
                      {paymentStatusOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </section>

              <section className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-emerald-50">Unggah dokumen</h2>
                <p className="mt-1 text-sm text-emerald-200/50">Visa, paspor, dan sertifikat vaksin (PDF atau JPG, demo — file tidak diunggah ke server).</p>

                <div className="mt-6 space-y-4">
                  {(
                    [
                      { key: "visa" as const, label: "Visa / dokumen visa", file: visaFile, set: setVisaFile },
                      { key: "passport" as const, label: "Paspor (bio page)", file: passportFile, set: setPassportFile },
                      { key: "vaccination" as const, label: "Vaksinasi / MCU", file: vaccineFile, set: setVaccineFile },
                    ] as const
                  ).map((row) => (
                    <label key={row.key} className="block rounded-xl border border-emerald-500/12 bg-emerald-950/25 px-4 py-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">{row.label}</span>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/*"
                        onChange={(e) => row.set(e.target.files?.[0] ?? null)}
                        className="mt-2 block w-full text-xs text-emerald-200/80 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-500/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-emerald-100"
                      />
                      {row.file ? <p className="mt-2 truncate font-mono text-[11px] text-emerald-300/80">{row.file.name}</p> : null}
                    </label>
                  ))}
                </div>
              </section>

              {error ? (
                <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100/95" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-emerald-200/80 transition hover:bg-white/5"
                >
                  Reset form
                </button>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  animate={submitting ? { scale: [1, 1.02, 1] } : undefined}
                  transition={{ repeat: submitting ? Infinity : 0, duration: 0.8 }}
                  className="rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/25 to-teal-600/15 px-6 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/25 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Menyimpan…" : "Simpan & buat Jamaah"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
