import type { Metadata } from "next";
import { ResellerDashboard } from "@/components/dashboard/reseller/reseller-dashboard";

export const metadata: Metadata = {
  title: "Reseller / Mitra | SA'YA Umroh OS",
  description: "Reseller and partner directory with commission stats and performance ranking.",
};

export default function ResellerPage() {
  return <ResellerDashboard />;
}
