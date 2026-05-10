import type { Metadata } from "next";
import { CommunityDashboard } from "@/components/dashboard/community/community-dashboard";

export const metadata: Metadata = {
  title: "Community Engine | SA'YA Umroh OS",
  description: "Community engagement overview — active, silent, and engaged members with growth metrics.",
};

export default function CommunityPage() {
  return <CommunityDashboard />;
}
