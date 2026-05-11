"use client";

import { motion } from "framer-motion";
import { CreditCard, FileUp, Sparkles, UserPlus } from "lucide-react";
import type { OverviewActivityItem, OverviewActivityKind } from "@/lib/dashboard/dashboard-overview-data";
import { formatIdrCompact } from "@/lib/dashboard/owner-dummy-data";

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
      return "from-purple-400/30 to-violet-700/15 border-purple-400/25";
    case "document":
      return "from-sky-400/25 to-violet-500/10 border-sky-400/20";
    case "booking":
      return "from-violet-400/30 to-orange-500/15 border-violet-400/25";
    default:
      return "from-violet-400/25 to-fuchsia-500/10 border-violet-400/20";
  }
}

export function ActivityFeed({
  items,
  title = "Activity feed",
  description = "Aktivitas terbaru dengan transisi ringan.",
}: {
  items: OverviewActivityItem[];
  title?: string;
  description?: string;
}) {
  return (
    <section className="glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6">
      <div className="border-b border-purple-500/10 pb-4">
        <h2 className="text-lg font-semibold text-purple-50">{title}</h2>
        <p className="mt-1 text-sm text-purple-200/50">{description}</p>
      </div>
      <ul className="mt-4 max-h-[min(520px,58vh)] space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(52,211,153,0.25)_transparent] [scrollbar-width:thin]">
        {items.map((item, i) => {
          const Icon = kindIcon(item.kind);
          const ring = kindAccent(item.kind);
          return (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex gap-3 rounded-xl border border-purple-500/10 bg-purple-950/30 p-3 transition hover:border-violet-400/25"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${ring}`}>
                <Icon className="h-[18px] w-[18px] text-purple-50/95" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-purple-50">{item.title}</p>
                <p className="mt-0.5 text-xs text-purple-200/55">{item.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-purple-400/60">
                  <span className="font-mono">{item.at}</span>
                  {item.amountIdr !== undefined ? (
                    <span className="font-mono font-semibold text-violet-200/90">{formatIdrCompact(item.amountIdr)}</span>
                  ) : null}
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
