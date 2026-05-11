"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";

export function AiInsightPanel({
  leadStatus,
  engagementScore,
  suggestedActions,
  highlight,
}: {
  leadStatus: string;
  engagementScore: number;
  suggestedActions: readonly string[] | string[];
  highlight: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[45] p-4 sm:p-6">
      <div className="pointer-events-auto ml-auto w-[min(100%,380px)]">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.aside
              key="open"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel overflow-hidden rounded-2xl border border-zinc-500/25 shadow-2xl shadow-black/40"
            >
              <div className="flex items-start justify-between gap-2 border-b border-zinc-600/10 bg-gradient-to-r from-zinc-600/15 to-zinc-600/10 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-500/30 bg-zinc-600/15 text-zinc-200">
                    <Bot className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-300/90">AI Sales insight</p>
                    <p className="truncate text-sm font-medium text-zinc-50">{highlight}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-lg border border-white/10 p-1.5 text-zinc-300/80 transition hover:bg-white/10"
                  aria-label="Sembunyikan panel AI"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3 px-4 py-4">
                <div className="rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600/55">Status lead</p>
                  <p className="mt-1 text-sm text-zinc-200/90">{leadStatus}</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2">
                  <span className="text-xs font-medium text-zinc-300/70">Engagement score</span>
                  <span className="flex items-center gap-1 font-mono text-lg font-semibold text-zinc-300">
                    <Sparkles className="h-4 w-4 text-zinc-400/90" aria-hidden />
                    {engagementScore}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600/55">Tindakan disarankan</p>
                  <ul className="mt-2 space-y-2">
                    {suggestedActions.map((a, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.05 }}
                        className="flex gap-2 rounded-lg border border-zinc-600/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-zinc-300/80"
                      >
                        <span className="mt-0.5 font-mono text-[10px] text-zinc-500/80">{i + 1}.</span>
                        <span>{a}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.aside>
          ) : (
            <motion.button
              key="closed"
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="glass-panel ml-auto flex items-center gap-2 rounded-2xl border border-zinc-500/30 bg-zinc-950/60 px-4 py-3 text-sm font-medium text-zinc-50 shadow-xl"
            >
              <Bot className="h-5 w-5 text-zinc-300" aria-hidden />
              AI insight
              <ChevronUp className="h-4 w-4 text-zinc-400/80" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
