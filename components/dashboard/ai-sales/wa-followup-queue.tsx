"use client";

import { motion } from "framer-motion";
import type { AutomatedFollowUp, FollowUpKind } from "@/lib/ai-sales/dummy-data";

function kindBadge(kind: FollowUpKind) {
  if (kind === "urgency") {
    return { label: "Urgensi", className: "border-rose-400/30 bg-rose-500/10 text-rose-100" };
  }
  if (kind === "reminder") {
    return { label: "Reminder", className: "border-zinc-500/30 bg-zinc-600/10 text-zinc-200" };
  }
  return { label: "Status lead", className: "border-sky-400/30 bg-sky-500/10 text-sky-100" };
}

export function WaFollowupQueue({ items }: { items: AutomatedFollowUp[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-zinc-50">Automated WA follow-ups</h2>
      <p className="mt-1 text-sm text-zinc-300/55">
        Antrian pesan berdasarkan status pipeline, urgensi kuota, dan pengingat jadwal — siap kirim via WhatsApp
        Business (simulasi).
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((row, i) => {
          const b = kindBadge(row.kind);
          return (
            <motion.li
              key={row.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${b.className}`}>
                  {b.label}
                </span>
                <span className="font-mono text-[11px] text-zinc-500/55">{row.scheduledFor}</span>
              </div>
              <p className="mt-2 font-medium text-zinc-50">{row.title}</p>
              <p className="mt-1 text-[11px] text-zinc-400/50">{row.triggerSummary}</p>
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-200/75">{row.bodyPreview}</p>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
