"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

type Props = {
  /** Compact icon-only (topbar); larger hit area on hub. */
  variant?: "icon" | "pill";
};

export function ThemeToggle({ variant = "icon" }: Props) {
  const { mode, toggle } = useTheme();
  const isLight = mode === "light";

  if (variant === "pill") {
    return (
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-100 transition hover:bg-purple-500/20 light:border-slate-300/60 light:bg-white light:text-slate-800 light:hover:bg-slate-50"
        aria-label={isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      >
        {isLight ? <Moon className="h-3.5 w-3.5" aria-hidden /> : <Sun className="h-3.5 w-3.5" aria-hidden />}
        {isLight ? "Gelap" : "Terang"}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/20 bg-white/[0.04] text-purple-100 transition hover:border-violet-400/40 hover:bg-violet-500/10 light:border-slate-300/70 light:bg-slate-100 light:text-slate-800 light:hover:bg-slate-200/80"
      aria-label={isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
    >
      {isLight ? <Moon className="h-[18px] w-[18px]" aria-hidden /> : <Sun className="h-[18px] w-[18px]" aria-hidden />}
    </motion.button>
  );
}
