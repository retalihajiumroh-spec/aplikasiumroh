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
        title={isLight ? "Ubah ke tampilan gelap (hitam)" : "Ubah ke tampilan terang (putih)"}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-zinc-100 shadow-sm shadow-black/30 transition hover:border-white/30 hover:bg-zinc-900/90 light:border-zinc-300 light:bg-white light:text-zinc-900 light:shadow-md light:hover:bg-zinc-50"
        aria-label={isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      >
        {isLight ? <Moon className="h-3.5 w-3.5" aria-hidden /> : <Sun className="h-3.5 w-3.5" aria-hidden />}
        <span className="tabular-nums">{isLight ? "Mode gelap" : "Mode terang"}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      title={isLight ? "Ubah ke tampilan gelap" : "Ubah ke tampilan terang"}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-zinc-950/80 text-zinc-100 transition hover:border-white/25 hover:bg-zinc-900 light:border-zinc-300 light:bg-white light:text-zinc-900 light:hover:bg-zinc-100"
      aria-label={isLight ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
    >
      {isLight ? <Moon className="h-[18px] w-[18px]" aria-hidden /> : <Sun className="h-[18px] w-[18px]" aria-hidden />}
    </motion.button>
  );
}
