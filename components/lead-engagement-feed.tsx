"use client";

import { motion, useInView } from "framer-motion";
import { Flame, Snowflake, SunMedium } from "lucide-react";
import { useRef } from "react";
import type { LeadInteractionItem, LeadTemp } from "@/lib/dashboard/premium-dashboard-data";

function TempBadge({ temp }: { temp: LeadTemp }) {
  if (temp === "hot") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/35 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100">
        <Flame className="h-3 w-3" aria-hidden />
        Hot
      </span>
    );
  }
  if (temp === "warm") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-500/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-100">
        <SunMedium className="h-3 w-3" aria-hidden />
        Warm
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-slate-500/35 bg-slate-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-200">
      <Snowflake className="h-3 w-3" aria-hidden />
      Cold
    </span>
  );
}

export function LeadEngagementFeed({ items }: { items: LeadInteractionItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45 }}
      className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">Metrik interaksi lead</h2>
      <p className="mt-1 text-sm text-slate-400/90">Lead baru, saluran kampanye, dan suhu lead (hot / warm / cold).</p>
      <ul className="mt-4 space-y-2">
        {items.map((row, i) => (
          <motion.li
            key={row.id}
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ delay: 0.04 + i * 0.04 }}
            whileHover={{ x: 4, transition: { duration: 0.18 } }}
            className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 p-3 transition hover:border-amber-400/25 hover:bg-white/[0.03]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <TempBadge temp={row.temp} />
              <span className="text-[11px] font-medium uppercase tracking-wide text-emerald-500/55">{row.channel}</span>
              <span className="text-[11px] text-emerald-500/45">· {row.at}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-emerald-50">{row.title}</p>
            <p className="mt-0.5 text-xs text-slate-400/90">{row.detail}</p>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
