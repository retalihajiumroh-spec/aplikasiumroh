import type { Metadata } from "next";
import { CrmPipeline } from "@/components/dashboard/crm/crm-pipeline";

export const metadata: Metadata = {
  title: "CRM & Leads | SA'YA Umroh OS",
  description: "CRM Kanban pipeline and lead cards — New through Paid with score and last activity.",
};

export default function CrmLeadsPage() {
  return <CrmPipeline />;
}
