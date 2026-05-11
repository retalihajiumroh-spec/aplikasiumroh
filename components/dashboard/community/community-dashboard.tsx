"use client";

import { motion } from "framer-motion";
import { CommunityEngagement } from "@/components/community-engagement";
import { communityEngagement, communityGrowth } from "@/lib/dashboard/premium-dashboard-data";

export function CommunityDashboard() {
  return (
    <div className="relative min-h-full overflow-x-hidden pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 10%, rgba(156, 77, 204, 0.12), transparent 45%), radial-gradient(circle at 80% 20%, rgba(156, 77, 204, 0.1), transparent 40%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-zinc-600/10 pb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300/75">Community Engine</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Komunitas & engagement</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300/55 sm:text-base">
            Pantau segmentasi pengguna aktif, engaged, dan silent beserta laju pertumbuhan komunitas digital jamaah.
          </p>
        </motion.header>
        <div className="mt-10">
          <CommunityEngagement segments={communityEngagement} growth={communityGrowth} />
        </div>
      </div>
    </div>
  );
}
