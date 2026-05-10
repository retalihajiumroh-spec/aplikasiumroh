import type { Metadata } from "next";
import { InventoryDashboard } from "@/components/dashboard/inventory/inventory-dashboard";

export const metadata: Metadata = {
  title: "Inventory | SA'YA Umroh OS",
  description: "Stock list and low-stock warnings for SA'YA Umroh logistics.",
};

export default function InventoryPage() {
  return <InventoryDashboard />;
}
