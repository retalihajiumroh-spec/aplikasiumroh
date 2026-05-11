"use client";

import { motion } from "framer-motion";

export function AppFooter({ company = "SA'YA Umroh" }: { company?: string }) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="mt-12 border-t border-zinc-600/10 py-8 text-center text-xs text-zinc-600/55"
    >
      <p>
        © {year} {company}. Operating System — internal use.
      </p>
    </motion.footer>
  );
}
