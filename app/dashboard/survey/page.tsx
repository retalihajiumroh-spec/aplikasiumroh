import type { Metadata } from "next";
import { SurveyFeedbackDashboard } from "@/components/dashboard/survey/survey-feedback-dashboard";

export const metadata: Metadata = {
  title: "Survey & Feedback | SA'YA Umroh OS",
  description: "Survey feedback form and satisfaction rating insights for SA'YA Umroh OS.",
};

export default function SurveyPage() {
  return <SurveyFeedbackDashboard />;
}
