import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";

export const metadata: Metadata = {
  title: "Owner Dashboard | SA'YA Umroh OS",
  description:
    "Executive owner dashboard — KPIs, revenue & conversion, branch performance & engagement, and real-time activity feed.",
};

export default function OwnerDashboardPage() {
  return <OwnerDashboard />;
}
