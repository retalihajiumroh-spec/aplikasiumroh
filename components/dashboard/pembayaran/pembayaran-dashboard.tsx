"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";
import type { SavedPaymentEntry } from "@/lib/pembayaran/payment-types";
import { loadLocalPaymentEntries } from "@/lib/pembayaran/payment-storage";
import { PaymentBatchForm } from "./payment-form";
import { PaymentList } from "./payment-list";

const rows = [
  { id: "p1", ref: "INV-2026-089", party: "Keluarga Wijaya", amount: 62_000_000, method: "VA BCA", status: "Settlement", at: "Hari ini · 09:12" },
  { id: "p2", ref: "INV-2026-088", party: "PT Mulia Sejahtera", amount: 120_000_000, method: "Transfer", status: "Verifikasi", at: "Hari ini · 08:40" },
  { id: "p3", ref: "INV-2026-087", party: "Hendra Kusuma", amount: 94_500_000, method: "Mandiri VA", status: "Lunas", at: "Kemarin" },
  { id: "p4", ref: "INV-2026-086", party: "Batch Maret · 6 pax", amount: 48_000_000, method: "QRIS", status: "Settlement", at: "Kemarin" },
  { id: "p5", ref: "INV-2026-085", party: "Yayasan Al-Ikhlas", amount: 210_000_000, method: "Transfer", status: "Menunggu bukti", at: "2 hari lalu" },
] as const;

export function PembayaranDashboard() {
  const [savedPayments, setSavedPayments] = useState<SavedPaymentEntry[]>([]);

  const refreshSaved = useCallback(() => {
    setSavedPayments(loadLocalPaymentEntries());
  }, []);

  useEffect(() => {
    refreshSaved();
  }, [refreshSaved]);

  return (
    <div className="relative min-h-full overflow-x-hidden pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(251, 191, 36, 0.1), transparent 40%), radial-gradient(circle at 85% 30%, rgba(52, 211, 153, 0.1), transparent 42%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-emerald-500/10 pb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/75">Kasir digital</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-emerald-50 sm:text-4xl">Pembayaran</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400/90 sm:text-base">
            Catat banyak pembayaran sekaligus, unggah bukti, dan set status (Approved / Pending / Rejected). Data tersimpan di
            Supabase bila dikonfigurasi, selalu dicerminkan lokal untuk daftar di bawah.
          </p>
        </motion.header>

        <PaymentBatchForm onSaved={refreshSaved} />

        <div className="mt-14">
          <h2 className="text-lg font-bold text-emerald-50">Pembayaran tercatat</h2>
          <p className="mt-1 text-sm text-slate-500/90">Edit status atau hapus entri. Jalankan SQL migrasi `002_payment_entries.sql` di Supabase agar sinkron server aktif.</p>
          <div className="mt-6">
            <PaymentList entries={savedPayments} onChange={refreshSaved} />
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-4 text-lg font-bold text-emerald-50">Antrian settlement (demo)</h2>
          <div className="overflow-hidden rounded-2xl border border-emerald-500/10 glass-panel">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-emerald-500/10 bg-emerald-950/45 text-[11px] font-bold uppercase tracking-wide text-emerald-400/70">
                <tr>
                  <th className="px-4 py-3">Referensi</th>
                  <th className="px-4 py-3">Pihak</th>
                  <th className="px-4 py-3">Nominal</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Metode</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 md:table-cell">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-emerald-500/10 bg-emerald-950/20 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-emerald-200/90">{r.ref}</td>
                    <td className="px-4 py-3 text-emerald-100/95">{r.party}</td>
                    <td className="px-4 py-3 font-mono text-amber-200/90">{formatIdrCompact(r.amount)}</td>
                    <td className="hidden px-4 py-3 text-emerald-200/70 sm:table-cell">{r.method}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md border border-emerald-400/25 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-100">
                        {r.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500/90 md:table-cell">{r.at}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
