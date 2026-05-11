"use client";

import { motion } from "framer-motion";
import type { CarouselSlide } from "@/lib/content-engine/dummy-data";

export function CarouselPreview({ slides }: { slides: CarouselSlide[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Carousel preview</p>
      <p className="mt-1 text-xs text-purple-200/45">Pratinjau rasio 4:5 seperti feed Instagram.</p>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/25">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 * i }}
            className="relative h-[220px] w-[176px] shrink-0 overflow-hidden rounded-2xl border border-purple-500/15 shadow-lg shadow-black/30"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-purple-100/70">
                Slide {i + 1}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">{slide.title}</p>
              <p className="mt-0.5 text-[11px] text-purple-100/75">{slide.subtitle}</p>
            </div>
            <div className="absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm">
              SA&apos;YA
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
