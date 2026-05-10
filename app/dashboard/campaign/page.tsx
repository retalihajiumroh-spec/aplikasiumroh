import type { Metadata } from "next";
import { CampaignDashboard } from "@/components/dashboard/campaign/campaign-dashboard";

export const metadata: Metadata = {
  title: "Campaign & Broadcast | SA'YA Umroh OS",
  description: "Campaign creation and WhatsApp broadcast segmentation for SA'YA Umroh OS.",
};

export default function CampaignPage() {
  return <CampaignDashboard />;
}
