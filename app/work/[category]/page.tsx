
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, VIDEOS, slugOf, Video } from "@/lib/work-data";

function VideoModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        <motion.div
          className="relative z-10 w-full max-w-4xl"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-sm uppercase tracking-[0.3em] text-white/50 hover:text-white"
          >
            Close ✕
          </button>

          <div className="aspect-video w-full border border-white/10 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      className="group relative w-full cursor-pointer overflow-hidden text-left"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        <img
          src={thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: "rgba(0,0,0,0.45)",
            opacity: hovered ? 1 : 0.4,
          }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-600"
            style={{ background: "rgba(204,0,0,0.2)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#CC0000"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
          {video.title}
        </h3>

        <p className="mt-1 text-xs text-white/35">
          {video.client} · {video.year}
        </p>
      </div>
    </motion.button>
  );
}

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const router = useRouter();

  const category = CATEGORIES.find(
    (item) => slugOf(item.id) === params.category
  );

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  if (!category) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl">Category Not Found</h1>

        <button
          onClick={() => router.push("/home")}
          className="mt-6 text-sm uppercase tracking-widest text-red-600"
        >
          Back Home
        </button>
      </main>
    );
  }

  const videos = VIDEOS[category.id] ?? [];

  return (
    <main
      className="min-h-screen px-4 py-16 sm:px-8 md:px-16 lg:px-24"
      style={{
        background:
          "linear-gradient(160deg, #160000 0%, #080000 50%, #020000 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.push("/home")}
          className="mb-10 text-xs uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-red-600"
        >
          ← Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-4 h-px w-10 bg-red-600" />

          <h1
            className="text-4xl font-light uppercase text-white md:text-6xl"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {category.label}
          </h1>

          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/30">
            {videos.length} {videos.length === 1 ? "Video" : "Videos"}
          </p>
        </motion.div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <VideoCard
                  video={video}
                  onPlay={() => setActiveVideo(video)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <span className="text-4xl text-red-600/30">⬡</span>
            <p className="text-xs uppercase tracking-[0.5em] text-white/30">
              Coming Soon
            </p>
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </main>
  );
}
