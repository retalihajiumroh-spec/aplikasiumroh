"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ActiveLeadProfile, ChatMessage } from "@/lib/ai-sales/dummy-data";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-label="Sedang mengetik">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-zinc-400/70"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const isLead = msg.role === "lead";
  const isSystem = msg.role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center py-1">
        <div className="max-w-[90%] rounded-full border border-zinc-600/15 bg-zinc-950/60 px-3 py-1.5 text-center text-[11px] leading-relaxed text-zinc-300/65">
          {msg.body}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isLead ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[85%] sm:max-w-[75%]`}>
        <div
          className={
            isLead
              ? "rounded-2xl rounded-tl-md border border-zinc-600/10 bg-zinc-950/70 px-3 py-2 text-sm leading-relaxed text-zinc-50/95 shadow-sm"
              : "rounded-2xl rounded-tr-md border border-zinc-500/20 bg-gradient-to-br from-zinc-600/90 to-zinc-800/90 px-3 py-2 text-sm leading-relaxed text-white shadow-md"
          }
        >
          {msg.body}
        </div>
        <p className={`mt-1 px-1 text-[10px] text-zinc-600/50 ${isLead ? "text-left" : "text-right"}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
}

export function WaChatInterface({ lead, messages }: { lead: ActiveLeadProfile; messages: ChatMessage[] }) {
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setTyping(true), 1800);
    const hide = window.setTimeout(() => setTyping(false), 4200);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-panel overflow-hidden rounded-2xl p-0"
    >
      {/* WA-style header */}
      <div className="flex items-center gap-3 border-b border-zinc-950/50 bg-gradient-to-r from-zinc-950 to-zinc-900 px-4 py-3">
        <button
          type="button"
          className="rounded-lg p-1.5 text-zinc-300/70 hover:bg-white/10 hover:text-zinc-50"
          aria-label="Kembali"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-600/25 font-mono text-sm font-bold text-zinc-200 ring-2 ring-zinc-500/30">
          {lead.name
            .split(/\s+/)
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-zinc-50">{lead.name}</p>
          <p className="truncate font-mono text-[11px] text-zinc-400/60">{lead.phoneMasked}</p>
        </div>
        <button
          type="button"
          className="rounded-lg p-1.5 text-zinc-300/70 hover:bg-white/10 hover:text-zinc-50"
          aria-label="Panggilan suara"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
        </button>
      </div>

      {/* Lead profile strip */}
      <div className="border-b border-zinc-600/10 bg-zinc-950/40 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-md border border-zinc-500/25 bg-zinc-600/15 px-2 py-0.5 font-mono font-semibold text-zinc-200">
            Skor {lead.score}
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-zinc-300/70">
            {lead.stageLabel}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500/55">Interaksi terakhir: {lead.lastInteraction}</p>
        <p className="mt-1 text-[11px] text-zinc-300/45">{lead.packageInterest}</p>
      </div>

      {/* Chat body */}
      <div className="flex max-h-[min(52vh,520px)] min-h-[280px] flex-col bg-[#061510]">
        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4 [scrollbar-color:rgba(52,211,153,0.2)_transparent] [scrollbar-width:thin]">
          <p className="text-center text-[10px] font-medium uppercase tracking-wider text-zinc-600/60">
            Hari ini
          </p>
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} />
          ))}
          <AnimatePresence>
            {typing ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-zinc-600/10 bg-zinc-950/70 px-3 py-2">
                  <TypingDots />
                  <span className="text-[11px] text-zinc-600/55">Rina mengetik…</span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="border-t border-zinc-900/60 bg-zinc-950/80 px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-600/15 bg-zinc-950/60 px-3 py-2">
            <span className="text-[12px] text-zinc-600/50">Ketik balasan…</span>
            <span className="ml-auto text-[10px] text-zinc-600/45">Demo</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
