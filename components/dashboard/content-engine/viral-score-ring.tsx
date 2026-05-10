"use client";

import { motion } from "framer-motion";

export function ViralScoreRing({
  score,
  label = "Viral score",
  sublabel = "Estimasi performa relatif vs konten sejenis",
}: {
  score: number;
  label?: string;
  sublabel?: string;
}) {
  const clamped = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative h-36 w-36 shrink-0">
        <svg className="-rotate-90" width="144" height="144" viewBox="0 0 144 144" aria-hidden>
          <circle cx="72" cy="72" r="44" fill="none" stroke="rgba(6,78,59,0.5)" strokeWidth="10" />
          <motion.circle
            cx="72"
            cy="72"
            r="44"
            fill="none"
            stroke="url(#viralGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="viralGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold tracking-tight text-emerald-50">{clamped}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400/60">/ 100</span>
        </div>
      </div>
      <div className="max-w-sm text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">{label}</p>
        <p className="mt-2 text-sm text-emerald-200/55">{sublabel}</p>
        <p className="mt-3 rounded-lg border border-emerald-500/15 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-100/75">
          Skor menggabungkan pola hook, ritme kalimat, CTA, dan kepadatan hashtag — model internal (demo).
        </p>
      </div>
    </div>
  );
}
