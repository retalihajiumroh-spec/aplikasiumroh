"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ToastItem } from "@/components/social-media/notification-toasts";
import { NotificationToasts } from "@/components/social-media/notification-toasts";
import { PostForm } from "@/components/social-media/post-form";
import { PostList } from "@/components/social-media/post-list";
import * as socialMediaService from "@/lib/services/socialMediaService";
import type { CreateSocialPostInput, SocialPost } from "@/lib/types/socialMedia";

export default function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [filter, setFilter] = useState<"all" | "scheduled" | "published" | "failed">("all");
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [seed, setSeed] = useState<{ nonce: number; post: SocialPost } | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...t, id }]);
    window.setTimeout(() => dismissToast(id), 6500);
  }, [dismissToast]);

  const refresh = useCallback(async () => {
    const list = await socialMediaService.listPosts();
    setPosts(list);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const runTick = () => {
      void socialMediaService.tickScheduler((post, outcome) => {
        void refresh();
        if (outcome === "ok") {
          pushToast({
            tone: "success",
            title: "Posting berhasil dipublikasikan",
            detail: `${post.platforms.length} platform · ${post.caption.slice(0, 72)}${post.caption.length > 72 ? "…" : ""}`,
          });
        } else {
          pushToast({
            tone: "error",
            title: "Posting gagal",
            detail: post.lastError ?? "Periksa koneksi OAuth atau lengkapi platform tujuan.",
          });
        }
      });
    };

    runTick();
    const id = window.setInterval(runTick, 12000);
    return () => window.clearInterval(id);
  }, [pushToast, refresh]);

  const onSubmitPost = useCallback(
    async (payload: CreateSocialPostInput, opts: { mode: "create" | "edit"; id?: string }) => {
      if (opts.mode === "edit" && opts.id) {
        await socialMediaService.updatePost(opts.id, payload);
        pushToast({
          tone: "success",
          title: "Posting diperbarui",
          detail: "Perubahan disimpan ke perpustakaan konten.",
        });
        setEditingPost(null);
      } else {
        await socialMediaService.createPost(payload);
        pushToast({
          tone: "success",
          title: "Posting dibuat",
          detail: "Entri baru siap dijadwalkan dan dikirim otomatis pada waktu yang ditentukan.",
        });
      }
      await refresh();
    },
    [pushToast, refresh],
  );

  const onSeedConsumed = useCallback(() => setSeed(null), []);

  const onReuse = useCallback((post: SocialPost) => {
    setEditingPost(null);
    setSeed({ nonce: Date.now(), post });
    pushToast({
      tone: "info",
      title: "Konten dimuat dari perpustakaan",
      detail: "Sesuaikan jadwal lalu kirim sebagai kampanye baru.",
    });
  }, [pushToast]);

  const onDelete = useCallback(
    async (id: string) => {
      await socialMediaService.deletePost(id);
      setEditingPost((prev) => (prev?.id === id ? null : prev));
      pushToast({ tone: "info", title: "Posting dihapus", detail: "Entri dihapus dari jadwal aktif." });
      await refresh();
    },
    [pushToast, refresh],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-16 pt-6 sm:pb-20 sm:pt-10">
      <NotificationToasts items={toasts} onDismiss={dismissToast} />

      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 16% 24%, rgba(190, 24, 93, 0.12), transparent 38%), radial-gradient(circle at 82% 18%, rgba(52, 211, 153, 0.14), transparent 35%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              SA&apos;YA Umroh OS
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
              Social Media Hub
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
              Satu antarmuka premium untuk multi-posting, penjadwalan berulang, pratinjau tiap platform,
              dan pelacakan performa kampanye — dengan penyimpanan Supabase opsional.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/owner"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:border-emerald-400/35 hover:bg-emerald-500/10"
            >
              ← Owner dashboard
            </Link>
            <Link
              href="/"
              className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-50 transition hover:border-emerald-400/45 hover:bg-emerald-500/15"
            >
              Beranda
            </Link>
          </div>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-12">
            <PostForm
              key={editingPost?.id ?? "create"}
              editingPost={editingPost}
              seed={seed}
              onSubmitPost={onSubmitPost}
              onCancelEdit={() => setEditingPost(null)}
              onSeedConsumed={onSeedConsumed}
            />
          </div>

          <div className="lg:col-span-12">
            <PostList
              posts={posts}
              filter={filter}
              onFilterChange={setFilter}
              onEdit={(post) => {
                setSeed(null);
                setEditingPost(post);
              }}
              onDelete={onDelete}
              onReuse={onReuse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
