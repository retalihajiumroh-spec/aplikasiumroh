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
      className="rounded-lg border border-purple-500/15 bg-purple-950/40 px-2.5 py-1 text-[11px] font-medium text-purple-200/90 transition hover:border-purple-400/30 hover:bg-purple-500/10"
    >
      {ok ? "Disalin" : label}
    </motion.button>
  );
}
