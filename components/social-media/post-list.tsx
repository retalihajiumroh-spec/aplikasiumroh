"use client";

import { motion } from "framer-motion";
import type { SocialPost, SocialPlatform } from "@/lib/types/socialMedia";
import { PLATFORM_SPECS } from "@/lib/types/socialMedia";

type FilterKey = "all" | "scheduled" | "published" | "failed";

function badgeForStatus(status: SocialPost["status"]) {
  switch (status) {
    case "scheduled":
      return "border-amber-400/35 bg-amber-400/12 text-amber-100";
    case "published":
      return "border-zinc-500/35 bg-zinc-500/12 text-zinc-200";
    case "failed":
      return "border-rose-400/35 bg-rose-400/12 text-rose-100";
    default:
      return "border-white/15 bg-white/5 text-zinc-200";
  }
}

function platformLabel(p: SocialPlatform) {
  return PLATFORM_SPECS.find((x) => x.id === p)?.label ?? p;
}

function aggregateMetrics(post: SocialPost) {
  const vals = Object.values(post.metrics ?? {});
  if (!vals.length) return { likes: "—", shares: "—", comments: "—" };
  const sum = vals.reduce(
    (acc, m) => ({
      likes: acc.likes + m.likes,
      shares: acc.shares + m.shares,
      comments: acc.comments + m.comments,
    }),
    { likes: 0, shares: 0, comments: 0 },
  );
  return {
    likes: sum.likes.toLocaleString("id-ID"),
    shares: sum.shares.toLocaleString("id-ID"),
    comments: sum.comments.toLocaleString("id-ID"),
  };
}

export function PostList({
  posts,
  filter,
  onFilterChange,
  onEdit,
  onDelete,
  onReuse,
}: {
  posts: SocialPost[];
  filter: FilterKey;
  onFilterChange: (f: FilterKey) => void;
  onEdit: (post: SocialPost) => void;
  onDelete: (id: string) => void;
  onReuse: (post: SocialPost) => void;
}) {
  const filtered = posts.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const tabs: { key: FilterKey; label: string }[] = [
    { key: "all", label: "Semua" },
    { key: "scheduled", label: "Terjadwal" },
    { key: "published", label: "Terpublikasi" },
    { key: "failed", label: "Gagal" },
  ];

  return (
    <motion.section
      layout
      className="glass-panel rounded-2xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
    >
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400/70">
            Manajemen & perpustakaan
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-50">Posting & performa kampanye</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300/55">
            Konten tersimpan sebagai perpustakaan — gunakan ulang cepat untuk kampanye berikutnya. Metrik
            akan disinkronkan dari API resmi setelah OAuth produksi aktif.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => onFilterChange(t.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === t.key
                  ? "bg-zinc-500/15 text-zinc-50 ring-1 ring-zinc-500/35"
                  : "bg-black/25 text-zinc-300/65 ring-1 ring-white/10 hover:bg-black/35"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[960px] w-full border-collapse text-left text-sm">
          <thead className="bg-black/25 text-xs uppercase tracking-wide text-zinc-300/55">
            <tr>
              <th className="px-4 py-3 font-semibold">Caption</th>
              <th className="px-4 py-3 font-semibold">Platform</th>
              <th className="px-4 py-3 font-semibold">Jadwal</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Suka</th>
              <th className="px-4 py-3 font-semibold">Bagikan</th>
              <th className="px-4 py-3 font-semibold">Komentar</th>
              <th className="px-4 py-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-zinc-300/55">
                  Belum ada data pada tab ini. Buat postingan baru atau ubah filter.
                </td>
              </tr>
            ) : (
              filtered.map((post) => {
                const m = aggregateMetrics(post);
                return (
                  <tr key={post.id} className="border-t border-white/10 bg-white/[0.015] hover:bg-white/[0.03]">
                    <td className="px-4 py-4 align-top">
                      <p className="line-clamp-2 font-medium text-zinc-50">{post.caption}</p>
                      {post.recurrence !== "none" && (
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400/55">
                          Berulang · {post.recurrence === "weekly" ? "mingguan" : "bulanan"}
                        </p>
                      )}
                      {post.lastError && (
                        <p className="mt-2 text-xs text-rose-200/80">{post.lastError}</p>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {post.platforms.map((p) => (
                          <span
                            key={p}
                            className="rounded-full bg-black/30 px-2 py-1 text-[11px] font-semibold text-zinc-200 ring-1 ring-white/10"
                          >
                            {platformLabel(p)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-zinc-200/85">
                      {new Date(post.scheduledAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${badgeForStatus(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top text-zinc-200">{m.likes}</td>
                    <td className="px-4 py-4 align-top text-zinc-200">{m.shares}</td>
                    <td className="px-4 py-4 align-top text-zinc-200">{m.comments}</td>
                    <td className="px-4 py-4 align-top text-right">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onReuse(post)}
                          className="rounded-lg border border-zinc-500/25 bg-zinc-600/10 px-3 py-1.5 text-[11px] font-semibold text-zinc-50 transition hover:bg-zinc-600/20"
                        >
                          Gunakan ulang
                        </button>
                        <button
                          type="button"
                          onClick={() => onEdit(post)}
                          className="rounded-lg border border-[color:var(--color-social-maroon-border)] px-3 py-1.5 text-[11px] font-semibold text-zinc-50 transition hover:bg-[color:var(--color-social-maroon-soft)]"
                          style={{ backgroundColor: "var(--color-social-maroon-soft)" }}
                        >
                          Edit Post
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(post.id)}
                          className="rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-zinc-200/80 transition hover:bg-black/45"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
