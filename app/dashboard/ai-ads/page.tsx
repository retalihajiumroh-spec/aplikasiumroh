import type { Metadata } from "next";
import { AiAdsLabDashboard } from "@/components/dashboard/ai-ads/ai-ads-lab-dashboard";

export const metadata: Metadata = {
  title: "AI Ads Lab | SA'YA Umroh OS",
  description: "AI Ads Lab — Broad and Targeted adset creation with CTR, CPL, and ROI performance analytics.",
};

export default function AiAdsLabPage() {
  return <AiAdsLabDashboard />;
}
