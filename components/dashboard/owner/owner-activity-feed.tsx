"use client";

import { motion } from "framer-motion";
import type { ActivityFeedItem, ActivityFeedKind } from "@/lib/dashboard/owner-dummy-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

function kindMeta(kind: ActivityFeedKind) {
  if (kind === "transaction") {
    return { label: "Transaksi", className: "border-emerald-400/25 bg-emerald-500/12 text-emerald-200" };
  }
  if (kind === "lead_capture") {
    return { label: "Lead capture", className: "border-sky-400/25 bg-sky-500/10 text-sky-100" };
  }
  return { label: "Update", className: "border-white/15 bg-white/[0.06] text-emerald-100/80" };
}

export function OwnerActivityFeed({ items }: { items: ActivityFeedItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">Activity feed</h2>
      <p className="mt-1 text-sm text-emerald-200/55">
        Transaksi terbaru, ringkasan penangkapan lead otomatis, dan pembaruan sistem.
      </p>

      <ul className="mt-5 max-h-[560px] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
        {items.map((item, i) => {
          const m = kindMeta(item.kind);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              className="glass-card rounded-xl p-3.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${m.className}`}>
                  {m.label}
                </span>
                <span className="text-[11px] text-emerald-500/50">{item.at}</span>
              </div>
              <p className="mt-2 font-medium text-emerald-50">{item.title}</p>
              <p className="mt-0.5 text-sm text-emerald-200/60">{item.description}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                {item.amountIdr !== undefined ? (
                  <p className="font-mono text-sm font-semibold text-emerald-300/90">
                    {formatIdrCompact(item.amountIdr)}
                  </p>
                ) : (
                  <span />
                )}
                {item.meta ? (
                  <span className="text-[11px] text-emerald-500/50">{item.meta}</span>
                ) : null}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
