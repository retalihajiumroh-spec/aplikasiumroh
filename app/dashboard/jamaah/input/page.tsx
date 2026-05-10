import { Suspense } from "react";
import type { Metadata } from "next";
import { JamaahInputForm } from "@/components/dashboard/jamaah/jamaah-input-form";

export const metadata: Metadata = {
  title: "Input Jamaah | SA'YA Umroh OS",
  description:
    "Form pendaftaran jamaah: KTP, paspor, alamat, dokumen JPG, permintaan khusus, dan mitra dari link referral.",
};

function FormFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-purple-200/70">
      Memuat form…
    </div>
  );
}

export default function JamaahInputPage() {
  return (
    <Suspense fallback={<FormFallback />}>
      <JamaahInputForm />
    </Suspense>
  );
}
