'use client';

import { LinkButton } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent" />

      <div className="container-luxury relative z-10 text-center py-20">
        <p className="text-gold-400 font-semibold tracking-widest uppercase mb-4 text-sm">
          Premium Umroh Experience
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Sacred Journey
          <br />
          <span className="gradient-text-gold">Begins Here</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Experience the finest Umroh pilgrimage with SA&apos;YA — luxury accommodations, expert
          guidance, and a spiritually enriching journey tailored for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton href="/paket" variant="primary" className="px-10 py-4 text-base">
            Explore Packages
          </LinkButton>
          <LinkButton href="/dashboard" variant="secondary" className="px-10 py-4 text-base">
            Dashboard
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
