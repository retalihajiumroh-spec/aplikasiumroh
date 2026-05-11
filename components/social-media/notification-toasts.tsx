"use client";

import { AnimatePresence, motion } from "framer-motion";

export type ToastItem = {
  id: string;
  tone: "success" | "error" | "info";
  title: string;
  detail?: string;
};

export function NotificationToasts({ items, onDismiss }: { items: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:justify-end sm:pr-8">
      <div className="pointer-events-auto flex w-full max-w-md flex-col gap-3">
        <AnimatePresence initial={false}>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-panel rounded-2xl px-4 py-3 shadow-2xl ring-1 ${
                t.tone === "success"
                  ? "ring-zinc-500/35"
                  : t.tone === "error"
                    ? "ring-rose-400/35"
                    : "ring-zinc-300/25"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                    t.tone === "success"
                      ? "bg-zinc-500/15 text-zinc-300"
                      : t.tone === "error"
                        ? "bg-rose-400/15 text-rose-100"
                        : "bg-white/10 text-zinc-50"
                  }`}
                >
                  {t.tone === "success" ? "✓" : t.tone === "error" ? "!" : "i"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-50">{t.title}</p>
                  {t.detail && <p className="mt-1 text-xs text-zinc-300/65">{t.detail}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => onDismiss(t.id)}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-300/70 transition hover:bg-white/10 hover:text-zinc-50"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
