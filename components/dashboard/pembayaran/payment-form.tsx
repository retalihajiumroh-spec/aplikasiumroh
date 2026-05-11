"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { insertPaymentEntriesAction } from "@/app/dashboard/pembayaran/actions";
import { jamaahRecords } from "@/lib/jamaah/dummy-data";
import { mergePackageOptions } from "@/lib/jamaah/input-form-data";
import { loadUserPackages } from "@/lib/paket/package-storage";
import { PAYMENT_TYPES, type PaymentLineDraft, type SavedPaymentEntry, emptyPaymentLine } from "@/lib/pembayaran/payment-types";
import { appendLocalPaymentEntries } from "@/lib/pembayaran/payment-storage";
import { PaymentProofUpload } from "./file-upload";
import { PaymentStatusDropdown } from "./status-dropdown";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/45 px-3 py-2.5 text-sm text-zinc-50 outline-none placeholder:text-slate-500/55 focus:border-zinc-500/45 focus:ring-2 focus:ring-zinc-600/15";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-zinc-400/65";

function lineFieldKey(localId: string, field: string) {
  return `${localId}__${field}`;
}

function validateLine(
  line: PaymentLineDraft,
  packageOpts: { id: string; label: string }[],
): Record<string, string> {
  const e: Record<string, string> = {};
  const k = (f: string) => lineFieldKey(line.localId, f);
  if (!line.packageId || !packageOpts.some((p) => p.id === line.packageId)) e[k("package")] = "Pilih paket.";
  if (!line.jamaahId) e[k("jamaah")] = "Pilih jamaah.";
  const amt = Number(String(line.amountIdr).replace(/\./g, "").replace(/,/g, "."));
  if (!Number.isFinite(amt) || amt <= 0) e[k("amount")] = "Jumlah harus lebih dari 0.";
  if (!line.files.length) e[k("files")] = "Unggah minimal satu bukti (JPG/PNG).";
  return e;
}

export function PaymentLineForm({
  line,
  onChange,
  onRemove,
  packageOptions,
  errors,
  jamaahQuery,
  onJamaahQuery,
  canRemove,
}: {
  line: PaymentLineDraft;
  onChange: (next: PaymentLineDraft) => void;
  onRemove: () => void;
  packageOptions: { id: string; label: string }[];
  errors: Record<string, string>;
  jamaahQuery: string;
  onJamaahQuery: (q: string) => void;
  canRemove: boolean;
}) {
  const jamaahFiltered = useMemo(() => {
    const q = jamaahQuery.trim().toLowerCase();
    return jamaahRecords.filter((j) => !q || j.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q));
  }, [jamaahQuery]);

  return (
    <motion.div
      layout
      className="rounded-2xl border border-zinc-600/12 bg-zinc-950/25 p-4 sm:p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-200/90">Baris pembayaran</p>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 rounded-lg border border-rose-400/25 px-2.5 py-1 text-[11px] font-medium text-rose-200/90 hover:bg-rose-500/10"
          >
            Hapus baris
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label>
          <span className={labelClass}>Pilih paket umroh</span>
          <select
            value={line.packageId}
            onChange={(e) => onChange({ ...line, packageId: e.target.value })}
            className={inputClass + (errors[lineFieldKey(line.localId, "package")] ? " border-rose-400/45 ring-1 ring-rose-500/25" : "")}
          >
            <option value="" className="bg-zinc-950">
              — Pilih —
            </option>
            {packageOptions.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-950">
                {p.label}
              </option>
            ))}
          </select>
          {errors[lineFieldKey(line.localId, "package")] ? (
            <p className="mt-1 text-xs text-rose-300">{errors[lineFieldKey(line.localId, "package")]}</p>
          ) : null}
        </label>

        <div>
          <span className={labelClass}>Pilih nama jamaah</span>
          <input
            type="search"
            value={jamaahQuery}
            onChange={(e) => onJamaahQuery(e.target.value)}
            placeholder="Cari nama atau ID…"
            className={inputClass + " mb-2"}
          />
          <select
            value={line.jamaahId}
            onChange={(e) => onChange({ ...line, jamaahId: e.target.value })}
            className={inputClass + (errors[lineFieldKey(line.localId, "jamaah")] ? " border-rose-400/45 ring-1 ring-rose-500/25" : "")}
          >
            <option value="" className="bg-zinc-950">
              — Pilih —
            </option>
            {jamaahFiltered.map((j) => (
              <option key={j.id} value={j.id} className="bg-zinc-950">
                {j.name} · {j.id}
              </option>
            ))}
          </select>
          {errors[lineFieldKey(line.localId, "jamaah")] ? (
            <p className="mt-1 text-xs text-rose-300">{errors[lineFieldKey(line.localId, "jamaah")]}</p>
          ) : null}
        </div>

        <label>
          <span className={labelClass}>Jumlah yang dibayarkan (IDR)</span>
          <input
            inputMode="decimal"
            value={line.amountIdr}
            onChange={(e) => onChange({ ...line, amountIdr: e.target.value })}
            className={inputClass + (errors[lineFieldKey(line.localId, "amount")] ? " border-rose-400/45 ring-1 ring-rose-500/25" : "")}
            placeholder="Contoh: 15000000"
          />
          {errors[lineFieldKey(line.localId, "amount")] ? (
            <p className="mt-1 text-xs text-rose-300">{errors[lineFieldKey(line.localId, "amount")]}</p>
          ) : null}
        </label>

        <label>
          <span className={labelClass}>Keterangan pembayaran</span>
          <select
            value={line.paymentType}
            onChange={(e) => onChange({ ...line, paymentType: e.target.value as PaymentLineDraft["paymentType"] })}
            className={inputClass}
          >
            {PAYMENT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-zinc-950">
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className="lg:col-span-2">
          <PaymentProofUpload
            files={line.files}
            onChange={(files) => onChange({ ...line, files })}
            error={errors[lineFieldKey(line.localId, "files")]}
          />
        </div>

        <div className="lg:col-span-2">
          <PaymentStatusDropdown value={line.status} onChange={(s) => onChange({ ...line, status: s })} />
        </div>

        {line.packageId && line.jamaahId ? (
          <p className="lg:col-span-2 text-[11px] text-slate-500/85">
            Ringkas: <span className="text-zinc-300/80">{packageOptions.find((p) => p.id === line.packageId)?.label}</span> ·{" "}
            <span className="text-zinc-300/80">{jamaahRecords.find((j) => j.id === line.jamaahId)?.name}</span>
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function PaymentBatchForm({ onSaved }: { onSaved: (entries: SavedPaymentEntry[]) => void }) {
  const [lines, setLines] = useState<PaymentLineDraft[]>(() => [emptyPaymentLine()]);
  const [queries, setQueries] = useState<Record<string, string>>({});
  const [pkgOpts, setPkgOpts] = useState(mergePackageOptions(loadUserPackages()));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setPkgOpts(mergePackageOptions(loadUserPackages()));
  }, []);

  const defaultPid = pkgOpts[0]?.id ?? "";
  useEffect(() => {
    if (!defaultPid) return;
    setLines((prev) => prev.map((l) => (!l.packageId ? { ...l, packageId: defaultPid } : l)));
  }, [defaultPid]);

  const setLine = useCallback((localId: string, next: PaymentLineDraft) => {
    setLines((prev) => prev.map((l) => (l.localId === localId ? next : l)));
  }, []);

  const addLine = useCallback(() => {
    const nl = emptyPaymentLine();
    if (defaultPid) nl.packageId = defaultPid;
    setLines((prev) => [...prev, nl]);
    setNotice(null);
  }, [defaultPid]);

  const removeLine = useCallback((localId: string) => {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.localId !== localId)));
    setQueries((q) => {
      const n = { ...q };
      delete n[localId];
      return n;
    });
  }, []);

  const parseAmount = (raw: string) => {
    const n = Number(String(raw).replace(/\./g, "").replace(/,/g, "."));
    return Number.isFinite(n) ? n : NaN;
  };

  const handleSubmit = useCallback(async () => {
    setNotice(null);
    const flat: Record<string, string> = {};
    for (const line of lines) {
      const e = validateLine(line, pkgOpts);
      Object.assign(flat, e);
    }
    setErrors(flat);
    if (Object.keys(flat).length > 0) {
      setNotice({ type: "err", text: "Lengkapi field yang bertanda error sebelum menyimpan." });
      return;
    }

    const built: Omit<SavedPaymentEntry, "id" | "createdAt">[] = lines.map((line) => {
      const pkg = pkgOpts.find((p) => p.id === line.packageId)!;
      const j = jamaahRecords.find((x) => x.id === line.jamaahId)!;
      return {
        packageId: line.packageId,
        packageLabel: pkg.label,
        jamaahId: line.jamaahId,
        jamaahName: j.name,
        amountIdr: parseAmount(line.amountIdr),
        paymentType: line.paymentType,
        status: line.status,
        proofFileNames: line.files.map((f) => f.name),
      };
    });

    setSubmitting(true);
    try {
      const tryRemote = isSupabaseConfigured();
      let savedRows: SavedPaymentEntry[] = [];

      if (tryRemote) {
        const res = await insertPaymentEntriesAction(
          built.map((b) => ({
            package_id: b.packageId,
            package_label: b.packageLabel,
            jamaah_id: b.jamaahId,
            jamaah_name: b.jamaahName,
            amount_idr: b.amountIdr,
            payment_type: b.paymentType,
            status: b.status,
            proof_filenames: b.proofFileNames,
          })),
        );
        if (!res.ok) {
          const now = new Date().toISOString();
          savedRows = built.map((b, i) => ({
            ...b,
            id: `PAY-LOC-${Date.now()}-${i}`,
            createdAt: now,
          }));
          appendLocalPaymentEntries(savedRows);
          setNotice({ type: "err", text: `${res.error} Data disimpan lokal sebagai cadangan demo.` });
          onSaved(savedRows);
          setLines([{ ...emptyPaymentLine(), packageId: defaultPid || "" }]);
          setQueries({});
          setErrors({});
          setSubmitting(false);
          return;
        }
        savedRows = built.map((b, i) => ({
          ...b,
          id: res.rows[i]?.id ?? `P-${Date.now()}-${i}`,
          createdAt: res.rows[i]?.created_at ?? new Date().toISOString(),
        }));
      } else {
        const now = new Date().toISOString();
        savedRows = built.map((b, i) => ({
          ...b,
          id: `PAY-LOC-${Date.now()}-${i}`,
          createdAt: now,
        }));
      }

      appendLocalPaymentEntries(savedRows);
      onSaved(savedRows);
      setLines([{ ...emptyPaymentLine(), packageId: defaultPid || "" }]);
      setQueries({});
      setErrors({});
      setNotice({ type: "ok", text: `${savedRows.length} pembayaran berhasil dicatat.` });
    } catch {
      setNotice({ type: "err", text: "Terjadi kesalahan saat menyimpan." });
    } finally {
      setSubmitting(false);
    }
  }, [lines, pkgOpts, defaultPid, onSaved]);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col gap-3 border-b border-zinc-600/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-50">Input pembayaran</h2>
          <p className="mt-1 text-sm text-slate-400/90">
            Tambah satu atau banyak pembayaran sekaligus. Bukti: JPG/PNG. Status dapat diatur langsung oleh admin finance.
          </p>
        </div>
        <button
          type="button"
          onClick={addLine}
          className="inline-flex items-center justify-center rounded-xl border border-zinc-500/35 bg-zinc-600/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-600/20"
        >
          + Tambah pembayaran lain
        </button>
      </div>

      <div className="space-y-5">
        {lines.map((line) => (
          <PaymentLineForm
            key={line.localId}
            line={line}
            onChange={(next) => setLine(line.localId, next)}
            onRemove={() => removeLine(line.localId)}
            packageOptions={pkgOpts}
            errors={errors}
            jamaahQuery={queries[line.localId] ?? ""}
            onJamaahQuery={(q) => setQueries((prev) => ({ ...prev, [line.localId]: q }))}
            canRemove={lines.length > 1}
          />
        ))}
      </div>

      {notice ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={
            notice.type === "ok"
              ? "rounded-xl border border-zinc-500/30 bg-zinc-600/10 px-4 py-3 text-sm text-zinc-200"
              : "rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
          }
          role="status"
        >
          {notice.text}
        </motion.p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setLines([{ ...emptyPaymentLine(), packageId: defaultPid || "" }]);
            setErrors({});
            setNotice(null);
          }}
          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300/80 hover:bg-white/5"
        >
          Reset baris
        </button>
        <motion.button
          type="button"
          disabled={submitting}
          onClick={() => void handleSubmit()}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl border border-zinc-500/40 bg-gradient-to-r from-zinc-600 to-zinc-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg disabled:opacity-50"
        >
          {submitting ? "Menyimpan…" : "Tambah pembayaran"}
        </motion.button>
      </div>
    </div>
  );
}
