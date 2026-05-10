"use client";

import { motion } from "framer-motion";
import type { BookingPaymentRecord } from "@/lib/booking/dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

function lineSum(lines: BookingPaymentRecord["lines"]) {
  return lines.reduce((a, l) => a + l.amountIdr, 0);
}

export function InvoicePreview({ record }: { record: BookingPaymentRecord }) {
  const subtotal = lineSum(record.lines);
  const balance = Math.max(0, record.amountIdr - record.paidIdr);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-panel overflow-hidden rounded-2xl"
    >
      <div className="border-b border-purple-500/10 bg-purple-950/40 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400/80">SA&apos;YA Umroh</p>
            <p className="mt-1 font-mono text-sm font-semibold text-purple-50">Invoice</p>
            <p className="font-mono text-xs text-purple-400/60">{record.invoiceNumber}</p>
          </div>
          <div className="text-right text-xs text-purple-300/60">
            <p>{record.issuedAt}</p>
            <p className="mt-1 max-w-[180px] text-purple-500/55">{record.dueLabel}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-500/50">Bill to</p>
          <p className="font-medium text-purple-50">{record.customerName}</p>
          <p className="text-xs text-purple-200/55">{record.packageName}</p>
          <p className="text-[11px] text-purple-500/45">{record.branch} · {record.bookingRef}</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-purple-500/10">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-500/10 bg-purple-950/50 text-[10px] font-semibold uppercase tracking-wide text-purple-400/70">
                <th className="px-3 py-2">Deskripsi</th>
                <th className="px-3 py-2 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {record.lines.map((line, i) => (
                <tr key={i} className="border-b border-purple-500/5 last:border-0">
                  <td className="px-3 py-2.5 text-purple-100/85">{line.description}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-purple-200/90">
                    {formatIdrCompact(line.amountIdr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 border-t border-dashed border-purple-500/20 pt-4 text-sm">
          <div className="flex justify-between text-purple-200/60">
            <span>Subtotal (baris)</span>
            <span className="font-mono">{formatIdrCompact(subtotal)}</span>
          </div>
          <div className="flex justify-between font-semibold text-purple-50">
            <span>Total tagihan</span>
            <span className="font-mono">{formatIdrCompact(record.amountIdr)}</span>
          </div>
          <div className="flex justify-between text-purple-300/80">
            <span>Telah dibayar</span>
            <span className="font-mono">{formatIdrCompact(record.paidIdr)}</span>
          </div>
          {balance > 0 ? (
            <div className="flex justify-between text-violet-200/90">
              <span>Sisa</span>
              <span className="font-mono font-semibold">{formatIdrCompact(balance)}</span>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border border-purple-500/10 bg-purple-500/5 px-3 py-2 text-center text-[10px] text-purple-500/55">
          Pratinjau invoice · tidak memiliki kekuatan hukum digital
        </div>
      </div>
    </motion.div>
  );
}
