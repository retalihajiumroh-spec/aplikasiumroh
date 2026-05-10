import type { Metadata } from "next";
import { OptimizationDashboard } from "@/components/dashboard/optimization/optimization-dashboard";

export const metadata: Metadata = {
  title: "Optimization | SA'YA Umroh OS",
  description: "Ads performance table with CTR, CPL, ROAS and Scale/Pause controls.",
};

export default function OptimizationPage() {
  return <OptimizationDashboard />;
}
