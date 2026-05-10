import type { Metadata } from "next";
import { DashboardOverview } from "@/components/dashboard/overview/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard | SA'YA Umroh OS",
  description: "SA'YA Umroh OS overview — KPIs, revenue and leads trends, and activity feed.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
