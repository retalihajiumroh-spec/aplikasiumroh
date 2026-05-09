"use client";

import { motion } from "framer-motion";
import type { KpiDatum } from "@/lib/dashboard/owner-dummy-data";

function TrendIcon({ trend }: { trend: KpiDatum["trend"] }) {
  if (trend === "flat") {
    return (
      <span className="text-emerald-400/70" aria-hidden>
        —
      </span>
    );
  }
  const up = trend === "up";
  return (
    <svg
      className={up ? "text-emerald-400" : "text-rose-400/90"}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      {up ? <path d="M12 5l7 8H5l7-8z" /> : <path d="M12 19l-7-8h14l-7 8z" />}
    </svg>
  );
}

export function KpiCard({
  item,
  index,
}: {
  item: KpiDatum;
  index: number;
}) {
  const positive = item.trend === "up";
  const negative = item.trend === "down";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card group relative overflow-hidden rounded-2xl p-5 sm:p-6"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/55">
        {item.label}
      </p>
      <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-emerald-50 sm:text-3xl">
        {item.value}
      </p>
      <p className="mt-1 text-sm text-emerald-200/50">{item.sublabel}</p>
      <div className="mt-4 flex items-center gap-2">
        <TrendIcon trend={item.trend} />
        <span
          className={
            positive
              ? "text-sm font-medium text-emerald-400"
              : negative
                ? "text-sm font-medium text-rose-300/90"
                : "text-sm font-medium text-emerald-300/70"
          }
        >
          {item.delta}
        </span>
        <span className="text-xs text-emerald-200/40">vs bulan lalu</span>
      </div>
    </motion.article>
  );
}
