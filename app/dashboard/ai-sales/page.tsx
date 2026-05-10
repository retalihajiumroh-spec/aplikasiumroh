import type { Metadata } from "next";
import { AiSalesDashboard } from "@/components/dashboard/ai-sales/ai-sales-dashboard";

export const metadata: Metadata = {
  title: "AI Sales Bot | SA'YA Umroh OS",
  description:
    "AI sales assistant with WhatsApp-style chat, automated follow-ups, sales scripts, and voice call simulation.",
};

export default function AiSalesPage() {
  return <AiSalesDashboard />;
}
