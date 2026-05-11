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
            "radial-gradient(circle at 15% 20%, rgba(156, 77, 204, 0.12), transparent 40%), radial-gradient(circle at 85% 0%, rgba(196, 163, 165, 0.08), transparent 38%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Inventory</h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-300/55 sm:text-base">
              Daftar stok barang logistik &amp; operasional dengan peringatan stok rendah dan zona mendekati minimum.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
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
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-300/45">{c.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-zinc-50">{c.value}</p>
              <p className="mt-1 text-[11px] text-zinc-600/50">{c.hint}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {low > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden rounded-xl border border-zinc-500/30 bg-zinc-600/10 px-4 py-3"
            >
              <div className="flex flex-wrap items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-600/25 text-zinc-200" aria-hidden>
                  !
                </span>
                <div>
                  <p className="font-semibold text-zinc-200">Peringatan stok rendah</p>
                  <p className="mt-1 text-sm text-zinc-300/80">
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
                  ? "border-zinc-500/40 bg-zinc-600/20 text-zinc-50"
                  : "border-zinc-600/15 bg-zinc-950/40 text-zinc-400/70 hover:border-zinc-500/25"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 glass-panel overflow-hidden rounded-2xl">
          <div className="border-b border-zinc-600/10 px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-zinc-200">Stock list</p>
            <p className="text-xs text-zinc-600/50">{filtered.length} baris</p>
          </div>
          <ul className="divide-y divide-zinc-600/10">
            {filtered.map((item, i) => {
              const lvl = stockLevel(item);
              const pct = barPct(item);
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`px-4 py-4 sm:px-5 ${lvl === "low" ? "bg-rose-500/[0.06]" : lvl === "near" ? "bg-zinc-600/[0.05]" : ""}`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-zinc-500/60">{item.sku}</span>
                        {lvl === "low" ? (
                          <span className="rounded-md border border-rose-400/40 bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-100">
                            Stok rendah
                          </span>
                        ) : lvl === "near" ? (
                          <span className="rounded-md border border-zinc-500/35 bg-zinc-600/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-200">
                            Mendekati min.
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 font-medium text-zinc-50">{item.name}</p>
                      <p className="mt-1 text-xs text-zinc-500/55">
                        {categoryLabel(item.category)} · {item.location}
                      </p>
                    </div>
                    <div className="shrink-0 text-right sm:pl-4">
                      <p className="font-mono text-lg font-semibold text-zinc-200">
                        {item.quantity}{" "}
                        <span className="text-sm font-normal text-zinc-500/60">{item.unit}</span>
                      </p>
                      <p className="text-[11px] text-zinc-600/50">
                        Min. {item.minQuantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-zinc-600/45">
                      <span>Level vs buffer</span>
                      <span>
                        {item.quantity}/{item.minQuantity} min
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-950/70 ring-1 ring-zinc-600/10">
                      <motion.div
                        className={`h-full rounded-full ${
                          lvl === "low"
                            ? "bg-gradient-to-r from-rose-500 to-zinc-600"
                            : lvl === "near"
                              ? "bg-gradient-to-r from-zinc-600 to-zinc-600"
                              : "bg-gradient-to-r from-zinc-600 to-zinc-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-600/50">Restock terakhir: {item.lastRestocked}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
