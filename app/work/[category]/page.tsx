"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, VIDEOS, slugOf, type Video } from "@/lib/work-data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Video Modal ─────────────────────────────────────────────── */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-4xl z-10"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          Close ✕
        </button>
        <div className="aspect-video w-full bg-black border border-white/10">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Video Card ──────────────────────────────────────────────── */
function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: Video;
  index: number;
  onPlay: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: (index % 3) * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onPlay}
      className="relative cursor-pointer overflow-hidden"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        <img
          src={src}
          alt={video.title}
          // بعض الفيديوهات مفيهاش maxres، فبنرجع للصورة الأصغر
          onError={() =>
            setSrc(`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`)
          }
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease }}
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-red-600"
            style={{ background: "rgba(204,0,0,0.2)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#CC0000">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function WorkCategoryPage() {
  const params = useParams<{ category: string }>();
  const slug = decodeURIComponent(params.category ?? "").toLowerCase();
  const idx = CATEGORIES.findIndex((c) => slugOf(c.id) === slug);
  if (idx === -1) notFound();

  const cat = CATEGORIES[idx];
  const videos = VIDEOS[cat.id] ?? [];

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* لو المتصفح منع النسخ، اللينك موجود في الـ address bar */
    }
  };

  return (
    <main
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        clipPath: "inset(0)",
        background: [
          "radial-gradient(ellipse 80% 50% at 100% 0%, rgba(210,0,0,0.45) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 0% 80%, rgba(180,0,0,0.30) 0%, transparent 55%)",
          "linear-gradient(160deg, #160000 0%, #080000 50%, #020000 100%)",
        ].join(", "),
      }}
    >
      <Navbar />

      {/* ── Background images (خفيفة جدًا) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-10 right-0 w-full md:w-[55%] h-[50vh] md:h-[75vh]"
          style={{
            backgroundImage: "url('/images/1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            filter: "grayscale(0.3)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-10 left-0 w-full md:w-[55%] h-[50vh] md:h-[75vh]"
          style={{
            backgroundImage: "url('/images/2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.17,
            filter: "grayscale(0.3)",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <section className="relative z-10 pt-24 md:pt-[120px] pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/home#what-i-do"
            className="group inline-flex items-center gap-3 px-5 py-3 border border-white/20 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 text-[12px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-condensed)", borderRadius: "2px" }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Title + actions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <div className="h-px w-10 bg-red-600 mb-4" />
            <h1
              className="text-white leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(56px, 11vw, 140px)",
                letterSpacing: "0.04em",
              }}
            >
              {cat.label}
            </h1>
            <p
              className="mt-3 text-[12px] tracking-[0.45em] uppercase text-red-600"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              {videos.length} {videos.length === 1 ? "Video" : "Videos"}
            </p>
          </div>

          <button
            onClick={copyLink}
            className="self-start md:self-auto px-6 py-3 border border-red-600/60 text-white/70 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 text-[12px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            {copied ? "Link Copied ✓" : "Copy Link"}
          </button>
        </motion.div>

        {/* Grid */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((vid, i) => (
              <VideoCard
                key={vid.id}
                video={vid}
                index={i}
                onPlay={() => setActiveVideo(vid)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-4xl text-red-600/30">⬡</span>
            <p
              className="text-[11px] tracking-[0.5em] uppercase text-white/30"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Coming Soon
            </p>
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            key={activeVideo.id}
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}