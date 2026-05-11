"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CopyTextButton({ text, label = "Salin" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      window.setTimeout(() => setOk(false), 1600);
    } catch {
      setOk(false);
    }
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={handleCopy}
      className="rounded-lg border border-zinc-600/15 bg-zinc-950/40 px-2.5 py-1 text-[11px] font-medium text-zinc-300/90 transition hover:border-zinc-500/30 hover:bg-zinc-600/10"
    >
      {ok ? "Disalin" : label}
    </motion.button>
  );
}
