import type { Metadata } from "next";
import { JamaahInputForm } from "@/components/dashboard/jamaah/jamaah-input-form";

export const metadata: Metadata = {
  title: "Input Jamaah | SA'YA Umroh OS",
  description: "Form to register new Jamaah with documents and payment status.",
};

export default function JamaahInputPage() {
  return <JamaahInputForm />;
}
