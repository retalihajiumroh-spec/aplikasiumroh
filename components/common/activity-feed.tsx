"use client";

import { motion } from "framer-motion";
import { CreditCard, FileUp, Sparkles, UserPlus } from "lucide-react";
import type { OverviewActivityItem, OverviewActivityKind } from "@/lib/dashboard/dashboard-overview-data";

function kindIcon(kind: OverviewActivityKind) {
  switch (kind) {
    case "payment":
      return CreditCard;
    case "document":
      return FileUp;
    case "booking":
      return Sparkles;
    default:
      return UserPlus;
  }
}

function kindAccent(kind: OverviewActivityKind) {
  switch (kind) {
    case "payment":
      return "from-emerald-400/30 to-teal-500/15 border-emerald-400/25";
    case "document":
      return "from-sky-400/25 to-cyan-500/10 border-sky-400/20";
    case "booking":
      return "from-amber-400/30 to-orange-500/15 border-amber-400/25";
    default:
      return "from-violet-400/25 to-fuchsia-500/10 border-violet-400/20";
  }
}

export function ActivityFeed({ items, title = "Activity feed" }: { items: OverviewActivityItem[]; title?: string }) {
  return (
    <section className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
      <div className="flex items-end justify-between gap-2 border-b border-emerald-500/10 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-emerald-50">{title}</h2>
          <p className="mt-1 text-sm text-emerald-200/50">Update operasional dengan animasi ringan.</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => {
          const Icon = kindIcon(item.kind);
          const ring = kindAccent(item.kind);
          return (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              whileHover={{ x: 2 }}
              className="flex gap-3 rounded-xl border border-emerald-500/10 bg-emerald-950/30 p-3 transition hover:border-emerald-400/25"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${ring}`}>
                <Icon className="h-[18px] w-[18px] text-emerald-50/95" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-emerald-50">{item.title}</p>
                <p className="mt-0.5 text-xs text-emerald-200/55">{item.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-emerald-400/60">
                  <span className="font-mono">{item.at}</span>
                  {item.meta ? <span>· {item.meta}</span> : null}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
