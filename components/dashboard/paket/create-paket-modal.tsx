"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { UmrohPackage } from "@/lib/paket/dummy-data";
import { CreatePaketForm } from "./create-paket-form";

export function CreatePaketModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (pkg: UmrohPackage) => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Tutup" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-paket-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            className="glass-panel relative z-[1] flex max-h-[min(92dvh,920px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-600/15 shadow-2xl shadow-black/50"
          >
            <div className="shrink-0 border-b border-zinc-600/10 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="create-paket-title" className="text-lg font-bold tracking-tight text-zinc-50 sm:text-xl">
                    Buat paket Umroh baru
                  </h2>
                  <p className="mt-1 text-sm text-slate-400/90">
                    Lengkapi detail paket — data disimpan di perangkat ini (demo) dan muncul di daftar Paket Umroh.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-xl border border-white/10 p-2 text-zinc-300/70 transition hover:bg-white/10"
                  aria-label="Tutup"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:rgba(52,211,153,0.35)_transparent] [scrollbar-width:thin]">
              <CreatePaketForm
                onCancel={onClose}
                onSuccess={(pkg) => {
                  onCreated(pkg);
                  onClose();
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
