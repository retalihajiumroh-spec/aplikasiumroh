import type { Metadata } from "next";
import { CommunityDashboard } from "@/components/dashboard/community/community-dashboard";
import { CommunityEngineDashboard } from "@/features/community-engine/community-engine-dashboard";

export const metadata: Metadata = {
  title: "Community Engine | SA'YA Umroh OS",
  description:
    "Community engagement overview — executive snapshot plus automation insights from the community engine.",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
      <CommunityDashboard />
      <CommunityEngineDashboard />
    </div>
  );
}
