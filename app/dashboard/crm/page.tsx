import type { Metadata } from "next";
import { CrmPipeline } from "@/components/dashboard/crm/crm-pipeline";

export const metadata: Metadata = {
  title: "CRM Pipeline | SA'YA Umroh OS",
  description: "Kanban pipeline with AI follow-up suggestions for SA'YA Umroh sales.",
};

export default function CrmPipelinePage() {
  return <CrmPipeline />;
}
