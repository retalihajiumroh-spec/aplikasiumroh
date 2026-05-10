"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  categoryLabel,
  isLowStock,
  isNearLow,
  lowStockCount,
  nearLowCount,
  stockItems,
  type StockItem,
} from "@/lib/inventory/dummy-data";

type FilterMode = "all" | "low" | "near";

function stockLevel(item: StockItem) {
  if (isLowStock(item)) return "low" as const;
  if (isNearLow(item)) return "near" as const;
  return "ok" as const;
}

function barPct(item: StockItem) {
  const cap = Math.max(item.minQuantity * 2, item.quantity, 1);
  return Math.min(100, Math.round((item.quantity / cap) * 100));
}

export function InventoryDashboard() {
  const [filter, setFilter] = useState<FilterMode>("all");

  const low = useMemo(() => lowStockCount(stockItems), []);
  const near = useMemo(() => nearLowCount(stockItems), []);

  const filtered = useMemo(() => {
    if (filter === "low") return stockItems.filter(isLowStock);
    if (filter === "near") return stockItems.filter((i) => isLowStock(i) || isNearLow(i));
    return stockItems;
  }, [filter]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(52, 211, 153, 0.12), transparent 40%), radial-gradient(circle at 85% 0%, rgba(250, 204, 21, 0.08), transparent 38%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Inventory</h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-200/55 sm:text-base">
              Daftar stok barang logistik &amp; operasional dengan peringatan stok rendah dan zona mendekati minimum.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total SKU", value: String(stockItems.length), hint: "Aktif di katalog" },
            { label: "Stok rendah", value: String(low), hint: "≤ minimum" },
            { label: "Mendekati min.", value: String(near), hint: "Di atas min. ≤125%" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">{c.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-emerald-50">{c.value}</p>
              <p className="mt-1 text-[11px] text-emerald-500/50">{c.hint}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {low > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3"
            >
              <div className="flex flex-wrap items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/25 text-amber-100" aria-hidden>
                  !
                </span>
                <div>
                  <p className="font-semibold text-amber-100">Peringatan stok rendah</p>
                  <p className="mt-1 text-sm text-amber-200/80">
                    {low} item berada di atau di bawah level minimum. Tinjau daftar dan jadwalkan pembelian / transfer
                    antar cabang.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              { id: "all" as const, label: "Semua" },
              { id: "near" as const, label: "Peringatan + rendah" },
              { id: "low" as const, label: "Hanya stok rendah" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                filter === t.id
                  ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-50"
                  : "border-emerald-500/15 bg-emerald-950/40 text-emerald-300/70 hover:border-emerald-400/25"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 glass-panel overflow-hidden rounded-2xl">
          <div className="border-b border-emerald-500/10 px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-emerald-100">Stock list</p>
            <p className="text-xs text-emerald-500/50">{filtered.length} baris</p>
          </div>
          <ul className="divide-y divide-emerald-500/10">
            {filtered.map((item, i) => {
              const lvl = stockLevel(item);
              const pct = barPct(item);
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`px-4 py-4 sm:px-5 ${lvl === "low" ? "bg-rose-500/[0.06]" : lvl === "near" ? "bg-amber-500/[0.05]" : ""}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-emerald-400/60">{item.sku}</span>
                        {lvl === "low" ? (
                          <span className="rounded-md border border-rose-400/40 bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-100">
                            Stok rendah
                          </span>
                        ) : lvl === "near" ? (
                          <span className="rounded-md border border-amber-400/35 bg-amber-500/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100">
                            Mendekati min.
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 font-medium text-emerald-50">{item.name}</p>
                      <p className="mt-1 text-xs text-emerald-400/55">
                        {categoryLabel(item.category)} · {item.location}
                      </p>
                    </div>
                    <div className="shrink-0 text-right sm:pl-4">
                      <p className="font-mono text-lg font-semibold text-emerald-100">
                        {item.quantity}{" "}
                        <span className="text-sm font-normal text-emerald-400/60">{item.unit}</span>
                      </p>
                      <p className="text-[11px] text-emerald-500/50">
                        Min. {item.minQuantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-emerald-500/45">
                      <span>Level vs buffer</span>
                      <span>
                        {item.quantity}/{item.minQuantity} min
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-emerald-950/70 ring-1 ring-emerald-500/10">
                      <motion.div
                        className={`h-full rounded-full ${
                          lvl === "low"
                            ? "bg-gradient-to-r from-rose-500 to-amber-500"
                            : lvl === "near"
                              ? "bg-gradient-to-r from-amber-500 to-emerald-500"
                              : "bg-gradient-to-r from-emerald-500 to-teal-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-emerald-600/50">Restock terakhir: {item.lastRestocked}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
