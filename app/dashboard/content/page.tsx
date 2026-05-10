import type { Metadata } from "next";
import { ContentSystemDashboard } from "@/components/dashboard/content/content-system-dashboard";

export const metadata: Metadata = {
  title: "Content System | SA'YA Umroh OS",
  description: "Content input from Reels and TikTok with preview for captions, ad scripts, and CTAs.",
};

export default function ContentSystemPage() {
  return <ContentSystemDashboard />;
}
