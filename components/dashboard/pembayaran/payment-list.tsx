"use client";

import { motion } from "framer-motion";
import type { PaymentAdminStatus, SavedPaymentEntry } from "@/lib/pembayaran/payment-types";
import { deleteLocalPaymentEntry, isLikelyServerPaymentId, updateLocalPaymentEntry } from "@/lib/pembayaran/payment-storage";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";
import { deletePaymentEntryAction, updatePaymentEntryStatusAction } from "@/app/dashboard/pembayaran/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { PaymentStatusDropdown } from "./status-dropdown";

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function PaymentList({
  entries,
  onChange,
}: {
  entries: SavedPaymentEntry[];
  onChange: () => void;
}) {
  async function handleDelete(id: string) {
    if (isSupabaseConfigured() && isLikelyServerPaymentId(id)) {
      const r = await deletePaymentEntryAction(id);
      if (!r.ok) {
        window.alert(r.error ?? "Gagal menghapus");
        return;
      }
    }
    deleteLocalPaymentEntry(id);
    onChange();
  }

  async function handleStatus(id: string, status: PaymentAdminStatus) {
    if (isSupabaseConfigured() && isLikelyServerPaymentId(id)) {
      const r = await updatePaymentEntryStatusAction(id, status);
      if (!r.ok) {
        window.alert(r.error ?? "Gagal memperbarui status");
        return;
      }
    }
    updateLocalPaymentEntry(id, { status });
    onChange();
  }

  if (entries.length === 0) {
    return (
      <p className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-6 text-center text-sm text-slate-500/90">
        Belum ada pembayaran yang dicatat dari form di atas.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((e, i) => (
        <motion.li
          key={e.id}
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="rounded-2xl border border-emerald-500/12 bg-emerald-950/30 p-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between sm:gap-4"
        >
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-mono text-[11px] text-emerald-400/70">{e.id}</p>
            <p className="font-semibold text-emerald-50">{e.jamaahName}</p>
            <p className="text-sm text-emerald-200/70">{e.packageLabel}</p>
            <p className="text-xs text-slate-500/85">{e.paymentType}</p>
            <p className="font-mono text-lg font-bold text-amber-200/95">{formatIdrCompact(e.amountIdr)}</p>
            <p className="text-[11px] text-slate-500/80">
              Bukti: {e.proofFileNames.length ? e.proofFileNames.join(", ") : "—"} · {formatWhen(e.createdAt)}
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col gap-2 sm:mt-0 sm:w-56">
            <PaymentStatusDropdown
              id={`st-${e.id}`}
              value={e.status}
              onChange={(s) => void handleStatus(e.id, s)}
              label="Ubah status"
            />
            <button
              type="button"
              onClick={() => void handleDelete(e.id)}
              className="rounded-lg border border-rose-400/30 px-3 py-2 text-xs font-semibold text-rose-200/90 hover:bg-rose-500/10"
            >
              Hapus
            </button>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
