/** Content System — demo preview payloads (no backend). */

export interface ContentPreviewPack {
  caption: string;
  adScript: string;
  cta: string;
}

export const demoContentPreview: ContentPreviewPack = {
  caption:
    "Bismillah — siap berangkat Ramadan dengan tenang?\n\nDi SA'YA Umroh, setiap detail dirapikan: manasik, hotel dekat Haram, dan pendampingan tim medis. Kuota batch terbatas — konsultasi 15 menit tanpa komitmen.\n\nSave posting ini untuk checklist persiapanmu. ✨",
  adScript:
    "[0–4s] HOOK: teks + cuplikan suasana Masjidil Haram fajar.\n[4–12s] VALUE: VO paket Ramadan Premium — manasik, dokter, hotel.\n[12–22s] PROOF: testimoni singkat + angka jamaah.\n[22–30s] CTA: DM *INFO* — slot terbatas.",
  cta: "DM *INFO* untuk jadwal call dengan konsultan — atau klik link di bio untuk brosur digital.",
};
