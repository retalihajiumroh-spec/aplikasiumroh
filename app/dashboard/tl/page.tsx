import type { Metadata } from "next";
import { TlDashboard } from "@/components/dashboard/tl/tl-dashboard";

export const metadata: Metadata = {
  title: "TL & Muthowif | SA'YA Umroh OS",
  description: "TL and Muthowif rankings and Team Leader assignment for departures.",
};

export default function TlPage() {
  return <TlDashboard />;
}
