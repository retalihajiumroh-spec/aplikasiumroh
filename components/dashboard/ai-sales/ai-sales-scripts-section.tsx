"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SalesScriptPack, ScriptCategory } from "@/lib/ai-sales/dummy-data";
import { CopyTextButton } from "./copy-text-button";

const order: ScriptCategory[] = ["closing", "objection", "urgency"];

export function AiSalesScriptsSection({ packs }: { packs: SalesScriptPack[] }) {
  const [tab, setTab] = useState<ScriptCategory>("closing");
  const active = packs.find((p) => p.category === tab) ?? packs[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">AI sales scripts</h2>
      <p className="mt-1 text-sm text-emerald-200/55">
        Balasan siap pakai untuk closing, penanganan keberatan, dan urgensi halus — salin ke WhatsApp.
      </p>

      <div className="mt-4 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {order.map((key) => {
          const p = packs.find((x) => x.category === key)!;
          const on = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                on
                  ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-50"
                  : "border-transparent text-emerald-300/55 hover:bg-white/5"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.category}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-4"
        >
          <p className="text-sm text-emerald-200/55">{active.description}</p>
          <ul className="mt-4 space-y-3">
            {active.replies.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="flex flex-col gap-2 rounded-xl border border-emerald-500/10 bg-emerald-950/35 p-3 sm:flex-row sm:items-start sm:justify-between"
              >
                <p className="text-sm leading-relaxed text-emerald-100/90">{r.text}</p>
                <CopyTextButton text={r.text} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
