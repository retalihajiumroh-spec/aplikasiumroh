"use client";

import { motion } from "framer-motion";
import type { OverviewActivityItem, OverviewActivityKind } from "@/lib/dashboard/dashboard-overview-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

function kindMeta(kind: OverviewActivityKind) {
  switch (kind) {
    case "lead":
      return { label: "Lead", className: "border-sky-400/30 bg-sky-500/12 text-sky-100" };
    case "payment":
      return { label: "Bayar", className: "border-zinc-500/30 bg-zinc-600/12 text-zinc-200" };
    case "document":
      return { label: "Dokumen", className: "border-zinc-500/30 bg-zinc-600/12 text-zinc-200" };
    case "booking":
      return { label: "Booking", className: "border-zinc-500/30 bg-zinc-600/12 text-zinc-200" };
  }
}

export function OverviewActivityFeed({ items }: { items: OverviewActivityItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-zinc-50">Activity feed</h2>
      <p className="mt-1 text-sm text-zinc-300/55">Aktivitas terbaru di seluruh operasi.</p>
      <ul className="mt-5 max-h-[min(560px,62vh)] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
        {items.map((item, i) => {
          const m = kindMeta(item.kind);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03 }}
              className="glass-card rounded-xl p-3.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.className}`}>
                  {m.label}
                </span>
                <span className="text-[11px] text-zinc-600/50">{item.at}</span>
              </div>
              <p className="mt-2 font-medium text-zinc-50">{item.title}</p>
              <p className="mt-0.5 text-sm text-zinc-300/60">{item.description}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                {item.amountIdr !== undefined ? (
                  <p className="font-mono text-sm font-semibold text-zinc-400/90">
                    {formatIdrCompact(item.amountIdr)}
                  </p>
                ) : (
                  <span />
                )}
                {item.meta ? <span className="text-[11px] text-zinc-600/50">{item.meta}</span> : null}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
