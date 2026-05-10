import type { Metadata } from "next";
import { DepartureDashboard } from "@/components/dashboard/departure/departure-dashboard";

export const metadata: Metadata = {
  title: "Departure | SA'YA Umroh OS",
  description: "Departure schedules with seat progress and tour leader assignment.",
};

export default function DeparturePage() {
  return <DepartureDashboard />;
}
