"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type {
  CreateSocialPostInput,
  SocialMediaAttachment,
  SocialPlatform,
  SocialPost,
} from "@/lib/types/socialMedia";
import { PLATFORM_SPECS } from "@/lib/types/socialMedia";

type LocalMedia = {
  id: string;
  file: File;
  previewUrl: string;
};

const platformsOrdered: SocialPlatform[] = ["instagram", "facebook", "twitter", "linkedin"];

function defaultScheduledLocal(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function PostForm({
  editingPost,
  seed,
  onSubmitPost,
  onCancelEdit,
  onSeedConsumed,
}: {
  editingPost: SocialPost | null;
  seed: { nonce: number; post: SocialPost } | null;
  onSubmitPost: (payload: CreateSocialPostInput, opts: { mode: "create" | "edit"; id?: string }) => Promise<void>;
  onCancelEdit: () => void;
  onSeedConsumed: () => void;
}) {
  const [caption, setCaption] = useState("");
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [scheduledAt, setScheduledAt] = useState(defaultScheduledLocal());
  const [recurrence, setRecurrence] = useState<CreateSocialPostInput["recurrence"]>("none");
  const [localMedia, setLocalMedia] = useState<LocalMedia[]>([]);
  const [libraryAttachments, setLibraryAttachments] = useState<SocialMediaAttachment[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!editingPost) return;
    setCaption(editingPost.caption);
    setPlatforms(editingPost.platforms);
    const d = new Date(editingPost.scheduledAt);
    const pad = (n: number) => String(n).padStart(2, "0");
    setScheduledAt(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`,
    );
    setRecurrence(editingPost.recurrence);
    setLocalMedia([]);
    setLibraryAttachments(editingPost.media ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset attachment previews when switching posts
  }, [editingPost?.id]);

  useEffect(() => {
    if (!seed) return;
    setCaption(seed.post.caption);
    setPlatforms(seed.post.platforms);
    setRecurrence("none");
    setScheduledAt(defaultScheduledLocal());
    setLocalMedia([]);
    setLibraryAttachments(seed.post.media ?? []);
    onSeedConsumed();
    // nonce identifies each reuse action from library seed payloads
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only rerun when new seed arrives
  }, [seed?.nonce]);

  useEffect(() => {
    return () => {
      localMedia.forEach((m) => URL.revokeObjectURL(m.previewUrl));
    };
  }, [localMedia]);

  const previewAttachments = useMemo(() => {
    const fromLocal = localMedia.map((m) => ({
      url: m.previewUrl,
      type: m.file.type.startsWith("video") ? ("video" as const) : ("image" as const),
      name: m.file.name,
    }));
    return [...libraryAttachments, ...fromLocal];
  }, [libraryAttachments, localMedia]);

  function togglePlatform(p: SocialPlatform) {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function onFilesPicked(files: FileList | null) {
    if (!files?.length) return;
    const next: LocalMedia[] = [];
    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      next.push({ id: crypto.randomUUID(), file, previewUrl });
    });
    setLocalMedia((prev) => [...prev, ...next]);
  }

  function removeLocalMedia(id: string) {
    setLocalMedia((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  }

  function removeLibraryAttachment(index: number) {
    setLibraryAttachments((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const attachments: CreateSocialPostInput["media"] = [...libraryAttachments];

      for (const m of localMedia) {
        if (m.file.type.startsWith("video")) {
          attachments.push({
            url: "",
            type: "video",
            name: m.file.name,
          });
          continue;
        }
        const dataUrl = await readFileAsDataUrl(m.file);
        attachments.push({
          url: dataUrl,
          type: "image",
          name: m.file.name,
        });
      }

      const iso = new Date(scheduledAt).toISOString();

      await onSubmitPost(
        {
          caption,
          platforms,
          scheduledAt: iso,
          recurrence,
          media: attachments,
        },
        editingPost ? { mode: "edit", id: editingPost.id } : { mode: "create" },
      );

      if (!editingPost) {
        setCaption("");
        setPlatforms([]);
        setScheduledAt(defaultScheduledLocal());
        setRecurrence("none");
        localMedia.forEach((m) => URL.revokeObjectURL(m.previewUrl));
        setLocalMedia([]);
        setLibraryAttachments([]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className="glass-panel rounded-2xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400/70">
          Multi-posting
        </p>
        <h2 className="text-xl font-semibold text-zinc-50">
          {editingPost ? "Edit postingan" : "Buat postingan baru"}
        </h2>
        <p className="text-sm text-zinc-300/55">
          Satu formulir untuk Instagram, Facebook, Twitter/X, dan LinkedIn — dengan pratinjau glass
          dan jadwal berulang.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <label className="block text-sm font-medium text-zinc-200/90">
            Deskripsi / caption
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
              placeholder="Tulis narasi kampanye, ajakan, atau pengumuman layanan umroh..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-50 outline-none ring-zinc-500/30 transition placeholder:text-zinc-300/35 focus:ring-2"
              required
            />
          </label>

          <div>
            <p className="text-sm font-medium text-zinc-200/90">Media</p>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-500/25 bg-zinc-600/[0.04] px-4 py-8 text-center transition hover:border-zinc-500/40 hover:bg-zinc-600/[0.07]">
              <span className="text-sm font-medium text-zinc-200">Unggah gambar atau video</span>
              <span className="mt-1 text-xs text-zinc-300/50">
                Drag & drop mendukung beberapa file — video disarankan via Supabase Storage untuk produksi.
              </span>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={(e) => onFilesPicked(e.target.files)}
              />
            </label>

            {libraryAttachments.length > 0 && (
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {libraryAttachments.map((asset, index) => (
                  <li
                    key={`${asset.url}-${asset.name}-${index}`}
                    className="glass-card flex items-center gap-3 rounded-xl p-3 text-xs text-zinc-200/80"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      {asset.type === "video" && asset.url ? (
                        <video src={asset.url} className="h-full w-full object-cover" muted />
                      ) : asset.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img alt="" src={asset.url} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center px-2 text-center text-[10px] text-zinc-300/55">
                          Video
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{asset.name}</p>
                      <p className="text-zinc-300/45">Dari perpustakaan konten</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLibraryAttachment(index)}
                      className="rounded-lg border border-[color:var(--color-social-maroon-border)] bg-[color:var(--color-social-maroon-soft)] px-3 py-1 text-[11px] font-semibold text-zinc-50 transition hover:bg-[color:var(--color-social-maroon-soft)]/80"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {localMedia.length > 0 && (
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {localMedia.map((m) => (
                  <li
                    key={m.id}
                    className="glass-card flex items-center gap-3 rounded-xl p-3 text-xs text-zinc-200/80"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      {m.file.type.startsWith("video") ? (
                        <video src={m.previewUrl} className="h-full w-full object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element -- dynamic user uploads
                        <img alt="" src={m.previewUrl} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{m.file.name}</p>
                      <p className="text-zinc-300/45">{(m.file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLocalMedia(m.id)}
                      className="rounded-lg border border-[color:var(--color-social-maroon-border)] bg-[color:var(--color-social-maroon-soft)] px-3 py-1 text-[11px] font-semibold text-zinc-50 transition hover:bg-[color:var(--color-social-maroon-soft)]/80"
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="block text-sm font-medium text-zinc-200/90">
            Jadwal tayang
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-50 outline-none ring-zinc-500/30 transition focus:ring-2"
              required
            />
          </label>

          <label className="block text-sm font-medium text-zinc-200/90">
            Pengulangan
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as CreateSocialPostInput["recurrence"])}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-50 outline-none ring-zinc-500/30 transition focus:ring-2"
            >
              <option value="none">Tidak berulang</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </select>
          </label>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-zinc-200/90">Platform tujuan</p>
            <p className="mt-1 text-xs text-zinc-300/50">Pilih satu atau beberapa channel.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {platformsOrdered.map((p) => {
                const spec = PLATFORM_SPECS.find((x) => x.id === p)!;
                const active = platforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "border-zinc-500/40 bg-zinc-600/15 text-zinc-50 shadow-[0_0_0_1px_rgba(161,161,161,0.15)_inset]"
                        : "border-white/10 bg-black/15 text-zinc-300/70 hover:border-zinc-500/25"
                    }`}
                  >
                    <span className="block">{spec.label}</span>
                    <span className="mt-1 block text-[11px] font-normal text-zinc-300/45">
                      {spec.recommendedMedia}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-200/90">Pratinjau cepat per platform</p>
            <div className="mt-3 grid gap-3">
              {PLATFORM_SPECS.filter((s) => platforms.includes(s.id)).length === 0 ? (
                <div className="glass-card rounded-xl px-4 py-6 text-center text-sm text-zinc-300/55">
                  Pilih platform untuk melihat kartu pratinjau bergaya glass.
                </div>
              ) : (
                PLATFORM_SPECS.filter((s) => platforms.includes(s.id)).map((spec) => (
                  <motion.div
                    key={spec.id}
                    layout
                    className={`glass-card relative overflow-hidden rounded-2xl bg-gradient-to-br ${spec.accentClass} p-4`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200/70">
                          {spec.label}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm text-zinc-50/95">
                          {caption || "Caption akan muncul di sini berdasarkan platform..."}
                        </p>
                      </div>
                      <span className="rounded-full bg-black/25 px-3 py-1 text-[10px] font-medium text-zinc-50/85 ring-1 ring-white/10">
                        {spec.recommendedMedia}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {previewAttachments.slice(0, 3).map((asset, idx) => (
                        <div
                          key={`${asset.url}-${idx}`}
                          className="aspect-square overflow-hidden rounded-xl border border-white/15 bg-black/35 shadow-inner"
                        >
                          {asset.type === "video" && asset.url ? (
                            <video src={asset.url} className="h-full w-full object-cover" muted />
                          ) : asset.url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img alt="" src={asset.url} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center px-2 text-center text-[10px] text-zinc-300/55">
                              Video siap · unggah via storage produksi
                            </div>
                          )}
                        </div>
                      ))}
                      {previewAttachments.length === 0 && (
                        <div className="col-span-3 rounded-xl border border-dashed border-white/15 bg-black/25 px-3 py-6 text-center text-xs text-zinc-300/55">
                          Tambahkan media untuk melihat thumbnail pada setiap kartu.
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={submitting || platforms.length === 0}
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/35 transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
          style={{ backgroundColor: "var(--color-social-maroon)" }}
        >
          {submitting ? "Menyimpan..." : editingPost ? "Perbarui postingan" : "Create Post"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-social-maroon-border)] px-6 py-3 text-sm font-semibold text-zinc-50 transition hover:bg-[color:var(--color-social-maroon-soft)]"
            style={{ backgroundColor: "var(--color-social-maroon-soft)" }}
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
}
