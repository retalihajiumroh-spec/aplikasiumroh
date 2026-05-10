import type { Metadata } from "next";
import { ContentEngineDashboard } from "@/components/dashboard/content-engine/content-engine-dashboard";

export const metadata: Metadata = {
  title: "AI Content Engine | SA'YA Umroh OS",
  description: "Generate captions, ad scripts, carousels, and engagement insights for Umroh marketing.",
};

export default function ContentEnginePage() {
  return <ContentEngineDashboard />;
}
