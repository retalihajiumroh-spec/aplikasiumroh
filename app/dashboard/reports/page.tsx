import type { Metadata } from "next";
import { ReportsDashboard } from "@/components/dashboard/reports/reports-dashboard";

export const metadata: Metadata = {
  title: "Reports | SA'YA Umroh OS",
  description: "Financial summaries and report export actions for SA'YA Umroh OS.",
};

export default function ReportsPage() {
  return <ReportsDashboard />;
}
