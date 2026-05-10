"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tlCandidates } from "@/lib/departure/dummy-data";

export function AssignTlModal({
  open,
  departureCode,
  packageName,
  currentTl,
  onClose,
  onAssign,
}: {
  open: boolean;
  departureCode: string;
  packageName: string;
  currentTl: string | null;
  onClose: () => void;
  onAssign: (name: string) => void;
}) {
  const [choice, setChoice] = useState<string>(currentTl ?? tlCandidates[0]);

  useEffect(() => {
    if (open) setChoice(currentTl ?? tlCandidates[0]);
  }, [open, currentTl]);

  function handleSave() {
    if (choice.trim()) onAssign(choice.trim());
    onClose();
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
            aria-labelledby="assign-tl-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="glass-panel relative z-[1] w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="border-b border-purple-500/10 px-5 py-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 id="assign-tl-title" className="text-lg font-semibold text-purple-50">
                    Assign tour leader
                  </h2>
                  <p className="mt-1 font-mono text-xs text-purple-400/60">{departureCode}</p>
                  <p className="mt-1 text-sm text-purple-200/55">{packageName}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-2 text-purple-200/70 hover:bg-white/10"
                  aria-label="Tutup"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-5 py-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Pilih TL</span>
                <select
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                  className="mt-2 w-full cursor-pointer rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                >
                  {tlCandidates.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <p className="mt-3 text-[11px] text-purple-500/50">Penugasan disimpan lokal (demo tanpa backend).</p>
            </div>
            <div className="flex gap-2 border-t border-purple-500/10 bg-purple-950/30 px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-purple-200/80 hover:bg-white/5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-500/25 to-violet-900/20 py-2.5 text-sm font-semibold text-purple-50"
              >
                Simpan TL
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
