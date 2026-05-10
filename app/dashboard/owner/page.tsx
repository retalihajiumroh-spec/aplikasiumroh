import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";

export const metadata: Metadata = {
  title: "Owner Dashboard | SA'YA Umroh OS",
  description:
    "Executive owner dashboard — KPIs, revenue & conversion trends, branch performance, AI insights, and activity feed.",
};

export default function OwnerDashboardPage() {
  return <OwnerDashboard />;
}
