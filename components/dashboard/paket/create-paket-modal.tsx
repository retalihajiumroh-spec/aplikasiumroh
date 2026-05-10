"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CreatePaketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("90");
  const [departure, setDeparture] = useState("");
  const [price, setPrice] = useState("");

  function handleSave() {
    onClose();
    setName("");
    setDeparture("");
    setPrice("");
    setSeats("90");
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/55 backdrop-blur-sm" aria-label="Tutup" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-paket-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="glass-panel relative z-[1] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="border-b border-emerald-500/10 px-5 py-4">
              <div className="flex items-start justify-between gap-2">
                <h2 id="create-paket-title" className="text-lg font-semibold text-emerald-50">
                  Buat paket baru
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-2 text-emerald-200/70 hover:bg-white/10"
                  aria-label="Tutup"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-sm text-emerald-200/55">Form demo — tidak menyimpan ke server.</p>
            </div>
            <div className="space-y-4 px-5 py-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nama paket</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Contoh: Ramadan Syawal Premium"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Kuota seat</span>
                <input
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  inputMode="numeric"
                  className="mt-1.5 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Tanggal berangkat</span>
                <input
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Contoh: 15 Apr 2026"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Harga mulai (IDR)</span>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  inputMode="numeric"
                  className="mt-1.5 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="89500000"
                />
              </label>
            </div>
            <div className="flex gap-2 border-t border-emerald-500/10 bg-emerald-950/30 px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-emerald-200/80 hover:bg-white/5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-600/20 py-2.5 text-sm font-semibold text-emerald-50"
              >
                Simpan (simulasi)
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
