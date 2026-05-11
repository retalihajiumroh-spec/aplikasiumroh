"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { bookingPayments, type BookingPaymentStatus } from "@/lib/booking/dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";
import { InvoicePreview } from "./invoice-preview";

function statusLabel(s: BookingPaymentStatus) {
  if (s === "paid") return "Paid";
  if (s === "installment") return "Installment";
  return "Pending";
}

function statusClass(s: BookingPaymentStatus) {
  if (s === "paid") return "border-zinc-500/35 bg-zinc-600/15 text-zinc-200";
  if (s === "installment") return "border-sky-400/35 bg-sky-500/12 text-sky-100";
  return "border-zinc-500/35 bg-zinc-600/12 text-zinc-200";
}

export function BookingDashboard() {
  const [selectedId, setSelectedId] = useState(bookingPayments[0]?.id ?? "");

  const selected = bookingPayments.find((r) => r.id === selectedId) ?? bookingPayments[0];

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(156, 77, 204, 0.12), transparent 40%), radial-gradient(circle at 10% 50%, rgba(196, 163, 165, 0.1), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Booking &amp; Payment</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300/55 sm:text-base">
              Daftar booking dan pembayaran dengan status Paid, Installment, atau Pending — pratinjau invoice per transaksi.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="border-b border-zinc-600/10 px-4 py-3 sm:px-5">
                <p className="text-sm font-medium text-zinc-200">Booking &amp; pembayaran</p>
                <p className="text-xs text-zinc-600/50">{bookingPayments.length} transaksi</p>
              </div>
              <ul className="max-h-[min(68vh,640px)] divide-y divide-zinc-600/10 overflow-y-auto [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
                {bookingPayments.map((row, i) => {
                  const active = row.id === selected?.id;
                  return (
                    <motion.li key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(row.id)}
                        className={`flex w-full flex-col gap-2 px-4 py-3 text-left transition sm:px-5 ${
                          active ? "bg-zinc-600/10 ring-1 ring-inset ring-zinc-500/25" : "hover:bg-zinc-950/40"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-zinc-300">{row.bookingRef}</span>
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusClass(row.status)}`}>
                            {statusLabel(row.status)}
                          </span>
                        </div>
                        <p className="font-medium text-zinc-50">{row.customerName}</p>
                        <p className="line-clamp-2 text-xs text-zinc-300/55">{row.packageName}</p>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-mono text-zinc-400/80">{formatIdrCompact(row.amountIdr)}</span>
                          <span className="text-zinc-600/45">{row.invoiceNumber}</span>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            {selected ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Payment invoice preview</p>
                <InvoicePreview record={selected} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
