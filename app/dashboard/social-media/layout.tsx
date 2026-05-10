import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Hub | SA'YA Umroh OS",
  description:
    "Buat, jadwalkan, dan pantau posting multi-platform untuk Instagram, Facebook, Twitter/X, dan LinkedIn.",
};

export default function SocialMediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
