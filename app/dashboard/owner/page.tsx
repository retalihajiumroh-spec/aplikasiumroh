import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/dashboard/owner/owner-dashboard";

export const metadata: Metadata = {
  title: "Owner Dashboard | SA'YA Umroh OS",
  description: "Executive dashboard for travel owners — KPIs, revenue, branches, and community.",
};

export default function OwnerDashboardPage() {
  return <OwnerDashboard />;
}
