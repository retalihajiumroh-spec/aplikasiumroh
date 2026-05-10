import type { Metadata } from "next";
import { AiAdsLabDashboard } from "@/components/dashboard/ai-ads/ai-ads-lab-dashboard";

export const metadata: Metadata = {
  title: "AI Ads Lab | SA'YA Umroh OS",
  description: "AI-powered ad content, ad set generation, and performance controls for Umroh travel marketing.",
};

export default function AiAdsLabPage() {
  return <AiAdsLabDashboard />;
}
