import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/dashboard/analytics/analytics-dashboard";

export const metadata: Metadata = {
  title: "Analytics | SA'YA Umroh OS",
  description: "Revenue, leads, conversion trends and branch comparison analytics.",
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
