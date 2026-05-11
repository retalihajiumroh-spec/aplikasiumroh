"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BroadcastSegment } from "@/lib/crm/dummy-data";

export interface BroadcastWaModalProps {
  open: boolean;
  onClose: () => void;
  segments: BroadcastSegment[];
}

export function BroadcastWaModal({ open, onClose, segments }: BroadcastWaModalProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(segments.map((s) => [s.id, s.id === "high_intent"])),
  );
  const [message, setMessage] = useState(
    "Assalamu'alaikum, kami dari SA'YA Umroh menginformasikan kuota Ramadan Premium terbatas. Balas *INFO* untuk detail paket & jadwal konsultasi.",
  );
  const [sentPulse, setSentPulse] = useState(false);

  const recipientEstimate = useMemo(() => {
    return segments.filter((s) => selected[s.id]).reduce((a, s) => a + s.leadCount, 0);
  }, [segments, selected]);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSend() {
    setSentPulse(true);
    window.setTimeout(() => {
      setSentPulse(false);
      onClose();
    }, 900);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            aria-label="Tutup modal"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="broadcast-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="glass-panel relative z-[1] w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="border-b border-zinc-600/10 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500/70">
                    WhatsApp Business
                  </p>
                  <h2 id="broadcast-title" className="mt-1 text-lg font-semibold text-zinc-50">
                    Broadcast pesan
                  </h2>
                  <p className="mt-1 text-sm text-zinc-300/55">
                    Pilih segmen lead. Pengiriman nyata memerlukan integrasi API (belum aktif).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300/70 transition hover:bg-white/10 hover:text-zinc-200"
                  aria-label="Tutup"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[min(70vh,540px)] overflow-y-auto px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
                Segmen penerima
              </p>
              <ul className="mt-3 space-y-2">
                {segments.map((seg) => {
                  const on = !!selected[seg.id];
                  return (
                    <li key={seg.id}>
                      <button
                        type="button"
                        onClick={() => toggle(seg.id)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                          on
                            ? "border-zinc-500/35 bg-zinc-600/15 ring-1 ring-zinc-500/20"
                            : "border-zinc-600/10 bg-zinc-950/20 hover:border-zinc-500/20"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            on ? "border-zinc-500/50 bg-zinc-500/20" : "border-zinc-600/20"
                          }`}
                          aria-hidden
                        >
                          {on ? (
                            <svg className="text-zinc-200" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="font-medium text-zinc-50">{seg.label}</span>
                            <span className="font-mono text-xs text-zinc-400/80">
                              ~{seg.leadCount} lead
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs text-zinc-300/50">{seg.description}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <label className="mt-6 block">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
                  Isi pesan
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/40 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                  placeholder="Tulis pesan broadcast…"
                />
              </label>

              <div className="mt-4 rounded-xl border border-zinc-600/10 bg-zinc-600/5 px-3 py-2.5 text-xs text-zinc-300/65">
                Estimasi penerima unik (dummy overlap tidak dihitung):{" "}
                <span className="font-mono font-semibold text-zinc-300">{recipientEstimate}</span> kontak
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-zinc-600/10 bg-zinc-950/30 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300/80 transition hover:bg-white/5"
              >
                Batal
              </button>
              <motion.button
                type="button"
                onClick={handleSend}
                disabled={recipientEstimate === 0 || !message.trim()}
                animate={sentPulse ? { scale: [1, 1.02, 1] } : undefined}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-zinc-500/30 bg-gradient-to-r from-zinc-600/25 to-zinc-700/20 px-4 py-2.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-900/30 transition hover:border-zinc-500/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sentPulse ? "Mengirim simulasi…" : "Kirim broadcast (simulasi)"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
