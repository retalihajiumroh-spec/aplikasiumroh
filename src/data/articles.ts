export type ContentItem = {
  id: string;
  title: string;
  category: "Artikel" | "Ebook";
  description: string;
  readTime: string;
  access: "Gratis" | "Jamaah";
};

export const contentLibrary: ContentItem[] = [
  {
    id: "panduan-pertama",
    title: "Panduan Umroh Pertama untuk Jamaah Baru",
    category: "Ebook",
    description:
      "Checklist persiapan dokumen, perlengkapan, dan mental sebelum keberangkatan.",
    readTime: "28 menit",
    access: "Gratis"
  },
  {
    id: "manasik-ringkas",
    title: "Manasik Ringkas: Dari Ihram hingga Tahallul",
    category: "Artikel",
    description:
      "Ringkasan praktis rukun, wajib, dan adab selama menjalankan ibadah umroh.",
    readTime: "8 menit",
    access: "Gratis"
  },
  {
    id: "strategi-perjalanan",
    title: "Strategi Mengatur Energi di Tanah Suci",
    category: "Artikel",
    description:
      "Tips menjaga stamina, jadwal ibadah, dan waktu istirahat agar perjalanan nyaman.",
    readTime: "6 menit",
    access: "Jamaah"
  }
];
