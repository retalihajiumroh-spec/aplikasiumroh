import type { Metadata } from "next";
import { AiSalesDashboard } from "@/components/dashboard/ai-sales/ai-sales-dashboard";

export const metadata: Metadata = {
  title: "AI Sales Bot | SA'YA Umroh OS",
  description: "AI-powered sales assistant: WhatsApp follow-ups, lead scoring, and suggested replies.",
};

export default function AiSalesPage() {
  return <AiSalesDashboard />;
}
