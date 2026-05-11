"use client";

import Link from "next/link";
import { useMemo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  docCompleteCount,
  isDocComplete,
  jamaahRecords,
  type JamaahDocuments,
  type JamaahRecord,
  type PaymentStatus,
} from "@/lib/jamaah/dummy-data";

type DocFilter = "all" | "complete" | "incomplete";

function paymentLabel(p: PaymentStatus) {
  if (p === "paid") return "Lunas";
  if (p === "partial") return "DP / cicilan";
  return "Belum bayar";
}

function paymentBadgeClass(p: PaymentStatus) {
  if (p === "paid") return "border-zinc-500/35 bg-zinc-600/15 text-zinc-200";
  if (p === "partial") return "border-zinc-500/35 bg-zinc-600/12 text-zinc-200";
  return "border-rose-400/30 bg-rose-500/10 text-rose-100";
}

function docSummary(d: JamaahDocuments) {
  const n = docCompleteCount(d);
  return `${n}/3`;
}

export function JamaahDashboard() {
  const [query, setQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | PaymentStatus>("all");
  const [docFilter, setDocFilter] = useState<DocFilter>("all");
  const [selectedId, setSelectedId] = useState<string>(jamaahRecords[0]?.id ?? "");
  const [docState, setDocState] = useState<Record<string, JamaahDocuments>>(() =>
    Object.fromEntries(jamaahRecords.map((j) => [j.id, { ...j.documents }])),
  );

  const mergedList: JamaahRecord[] = useMemo(
    () =>
      jamaahRecords.map((j) => ({
        ...j,
        documents: docState[j.id] ?? j.documents,
      })),
    [docState],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mergedList.filter((j) => {
      if (paymentFilter !== "all" && j.payment !== paymentFilter) return false;
      const complete = isDocComplete(j.documents);
      if (docFilter === "complete" && !complete) return false;
      if (docFilter === "incomplete" && complete) return false;
      if (!q) return true;
      return (
        j.name.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q) ||
        j.packageName.toLowerCase().includes(q) ||
        j.branch.toLowerCase().includes(q)
      );
    });
  }, [mergedList, query, paymentFilter, docFilter]);

  useEffect(() => {
    if (filtered.length === 0) return;
    if (!filtered.some((j) => j.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = filtered.find((j) => j.id === selectedId) ?? filtered[0];

  const setDoc = useCallback((id: string, key: keyof JamaahDocuments, value: boolean) => {
    setDocState((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? jamaahRecords.find((x) => x.id === id)!.documents), [key]: value },
    }));
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(156, 77, 204, 0.12), transparent 40%), radial-gradient(circle at 90% 30%, rgba(196, 163, 165, 0.1), transparent 42%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Jamaah</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300/55 sm:text-base">
              Daftar jamaah dengan status pembayaran dan kelengkapan dokumen — visa, paspor, dan vaksinasi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/jamaah/input"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-500/35 bg-gradient-to-r from-zinc-600/30 to-zinc-600/20 px-4 py-2.5 text-sm font-bold text-zinc-50 shadow-lg shadow-zinc-950/25 transition hover:border-zinc-400/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
              Tambah jamaah
            </Link>
            <Link
              href="/"
              className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
            >
              ← Hub
            </Link>
          </div>
        </motion.header>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="block min-w-[200px] flex-1 sm:max-w-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Cari</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nama, ID, paket, atau cabang…"
              className="mt-1.5 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
            />
          </label>
          <label className="block w-full sm:w-44">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Pembayaran</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as typeof paymentFilter)}
              className="mt-1.5 w-full cursor-pointer rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
            >
              <option value="all">Semua</option>
              <option value="paid">Lunas</option>
              <option value="partial">DP / cicilan</option>
              <option value="unpaid">Belum bayar</option>
            </select>
          </label>
          <label className="block w-full sm:w-44">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Dokumen</span>
            <select
              value={docFilter}
              onChange={(e) => setDocFilter(e.target.value as DocFilter)}
              className="mt-1.5 w-full cursor-pointer rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
            >
              <option value="all">Semua</option>
              <option value="complete">Lengkap (3/3)</option>
              <option value="incomplete">Belum lengkap</option>
            </select>
          </label>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="border-b border-zinc-600/10 px-4 py-3 sm:px-5">
                <p className="text-sm font-medium text-zinc-200">
                  {filtered.length} jamaah
                  {query || paymentFilter !== "all" || docFilter !== "all" ? " · hasil filter" : ""}
                </p>
              </div>
              <ul className="max-h-[min(70vh,640px)] divide-y divide-zinc-600/10 overflow-y-auto [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
                {filtered.map((j, i) => {
                  const active = j.id === selected?.id;
                  return (
                    <motion.li key={j.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(j.id)}
                        className={`flex w-full flex-col gap-2 px-4 py-3 text-left transition sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
                          active ? "bg-zinc-600/10 ring-1 ring-inset ring-zinc-500/25" : "hover:bg-zinc-950/40"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-zinc-50">{j.name}</p>
                          <p className="font-mono text-xs text-zinc-500/55">{j.id}</p>
                          <p className="mt-1 truncate text-xs text-zinc-300/50">
                            {j.packageName} · {j.branch}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${paymentBadgeClass(j.payment)}`}>
                            {paymentLabel(j.payment)}
                          </span>
                          <span
                            className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                              isDocComplete(j.documents)
                                ? "border-zinc-500/30 bg-zinc-600/10 text-zinc-300"
                                : "border-white/10 bg-white/[0.04] text-zinc-400/70"
                            }`}
                          >
                            Dokumen {docSummary(j.documents)}
                          </span>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
              {filtered.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-zinc-600/50">Tidak ada jamaah yang cocok dengan filter.</p>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500/70">Checklist dokumen</p>
                  <h2 className="mt-1 text-lg font-semibold text-zinc-50">{selected.name}</h2>
                  <p className="font-mono text-xs text-zinc-500/55">{selected.id}</p>
                  <p className="mt-2 text-sm text-zinc-300/55">{selected.packageName}</p>
                  <p className="text-xs text-zinc-600/50">
                    {selected.branch} · {selected.batch}
                  </p>

                  <div className="mt-5 rounded-xl border border-zinc-600/10 bg-zinc-950/30 p-3">
                    <p className="text-xs font-medium text-zinc-400/60">Status pembayaran</p>
                    <p className={`mt-1 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${paymentBadgeClass(selected.payment)}`}>
                      {paymentLabel(selected.payment)}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {(
                      [
                        { key: "visa" as const, label: "Visa", hint: "E-visa / stamping" },
                        { key: "passport" as const, label: "Paspor", hint: "Masa berlaku ≥ 6 bulan" },
                        { key: "vaccination" as const, label: "Vaksinasi", hint: "Meningitis + COVID sesuai syarat" },
                      ] as const
                    ).map((row) => (
                      <li
                        key={row.key}
                        className="flex items-start gap-3 rounded-xl border border-zinc-600/10 bg-zinc-950/25 px-3 py-3"
                      >
                        <input
                          type="checkbox"
                          checked={selected.documents[row.key]}
                          onChange={(e) => setDoc(selected.id, row.key, e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-zinc-600/40 bg-zinc-950 text-zinc-600 focus:ring-zinc-600/40"
                        />
                        <div>
                          <p className="font-medium text-zinc-50">{row.label}</p>
                          <p className="text-xs text-zinc-600/55">{row.hint}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-center text-[11px] text-zinc-600/45">
                    Perubahan checklist disimpan lokal (demo tanpa backend).
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel rounded-2xl p-8 text-center"
                >
                  <p className="text-sm text-zinc-300/55">Sesuaikan filter atau pencarian untuk menampilkan jamaah.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
