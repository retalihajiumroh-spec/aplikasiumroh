"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { KpiCardItem, KpiTrend } from "@/lib/dashboard/kpi-card-item";

function TrendIcon({ trend }: { trend: KpiTrend }) {
  if (trend === "flat") {
    return (
      <span className="text-zinc-500/70" aria-hidden>
        —
      </span>
    );
  }
  const up = trend === "up";
  return (
    <svg
      className={up ? "text-zinc-500" : "text-rose-400/90"}
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

function AnimatedInteger({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("id-ID"));

  useEffect(() => {
    const c = animate(mv, value, { duration: 1.05, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [mv, value]);

  return <motion.span className={className}>{text}</motion.span>;
}

export function KpiCard({ item, index }: { item: KpiCardItem; index: number }) {
  const positive = item.trend === "up";
  const negative = item.trend === "down";
  const progress = item.progress;
  const countUp = item.countUpTo;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="glass-card group relative overflow-hidden rounded-2xl border border-zinc-600/10 p-5 shadow-lg ring-1 ring-zinc-500/0 transition-[box-shadow,ring-color] duration-300 hover:border-zinc-500/20 hover:ring-zinc-500/15 sm:p-6"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-zinc-500/15 to-zinc-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400/70">{item.label}</p>
      <motion.p
        className="mt-2 font-mono text-2xl font-bold tracking-tight text-[#E6E6FA] sm:text-3xl"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        {countUp !== undefined ? (
          <AnimatedInteger value={countUp} className="inline-block min-h-[1.2em] tabular-nums" />
        ) : (
          item.value
        )}
      </motion.p>
      <p className="mt-1 text-sm text-slate-400/90">{item.sublabel}</p>
      {progress !== undefined ? (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[10px] font-medium uppercase tracking-wide text-zinc-600/50">
            <span>Progress</span>
            <span className="font-mono text-zinc-300/80">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-950/80 ring-1 ring-zinc-600/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#27272a] to-[#800000]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              transition={{ duration: 0.9, delay: 0.12 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <TrendIcon trend={item.trend} />
        <span
          className={
            positive
              ? "text-sm font-semibold text-zinc-500"
              : negative
                ? "text-sm font-semibold text-rose-300/90"
                : "text-sm font-semibold text-zinc-400/70"
          }
        >
          {item.delta}
        </span>
        <span className="text-xs text-zinc-300/45">{item.deltaContext ?? "vs bulan lalu"}</span>
      </div>
    </motion.article>
  );
}
