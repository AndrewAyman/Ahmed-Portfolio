"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroClient from "@/components/HeroClient";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BehindTheScene from "@/components/BehindTheScene";
import FeedbackPage from "@/components/FeedBack";

const SERVICES = [
  "Portraits",
  "Commercial",
  "Events",
  "Editorial",
  "Product",
  "Lifestyle",
];

const CATEGORIES = [
  {
    id: "Content",
    label: "Content",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&h=130&fit=crop&auto=format",
  },
  {
    id: "Promo",
    label: "Promo",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=130&fit=crop&auto=format",
  },
  {
    id: "Gym",
    label: "Gym",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=130&fit=crop&auto=format",
  },
  {
    id: "Product",
    label: "Product",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=130&fit=crop&auto=format",
  },
  // ── Factories ── حاطينه بين Product و Others
  {
    id: "Factories",
    label: "Factories",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=130&fit=crop&auto=format",
  },
  {
    id: "Others",
    label: "Others",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=130&fit=crop&auto=format",
  },
];

type Video = {
  id: string;
  title: string;
  client: string;
  year: string;
  desc: string;
  youtubeId: string;
};

const VIDEOS: Record<string, Video[]> = {
  Content: [
    {
      id: "c-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "jX5unmmP_ik",
    },
    {
      id: "c-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "x1KD7eZV1nQ",
    },
    {
      id: "c-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "1lxyiY45R74",
    },
    {
      id: "c-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "PnMy8AudBRI",
    },
    {
      id: "c-5",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "0r_yWXZnR_Y",
    },
    {
      id: "c-6",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "I8awANybDFs",
    },
    {
      id: "c-7",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "87WzVCqIVtw",
    },
  ],
  Promo: [
    {
      id: "p-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "JLqLjnX0V7o",
    },
    {
      id: "p-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "C82MH7p-LEs",
    },
    {
      id: "p-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "1P25FEcsnDI",
    },
    {
      id: "p-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "D0aUmM1WY38",
    },
  ],
  Gym: [
    {
      id: "g-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "ie0itE7YmGI",
    },
    {
      id: "g-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "pigA8yqQgk4",
    },
    {
      id: "g-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "sRXwLa2Nzy4",
    },
    {
      id: "g-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "lCd8rfAhNSE",
    },
    {
      id: "g-5",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "cZPnUuwIVY0",
    },
    {
      id: "g-6",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "NSnnOgu5nag",
    },
    {
      id: "g-7",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "UA35QjDNoKA",
    },
    {
      id: "g-8",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "iXt9V1La8R8",
    },
    {
      id: "g-9",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "moutE0G4nv0",
    },
    {
      id: "g-10",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "58uUTJSYUwM",
    },
    {
      id: "g-11",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "Uuq85cumWTk",
    },
  ],
  Product: [
    {
      id: "prod-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "1RIK9MGby_U",
    },
    {
      id: "prod-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "cNmnwXHupjo",
    },
    {
      id: "prod-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "NUEDELh18Tc",
    },
    {
      id: "prod-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "U8tN9RXwknU",
    },
  ],
  // ── Factories — فاضية جاهزة تحط فيها اللينكات ──
  Factories: [
    {
      id: "f-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "mea7sJQamng",
    },
    {
      id: "f-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "eCBYkWAvUZM",
    },
  ],
  Others: [
    {
      id: "o-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "elrNdi15UT4",
    },
    {
      id: "o-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "Tq6CNjw3Uek",
    },
    {
      id: "o-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "CQbg3Op1TAE",
    },
    {
      id: "o-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "768I2xacnO4",
    },
    {
      id: "o-5",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "JjedbIPEKq8",
    },
    {
      id: "o-6",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "QKSJ_CBgjhc",
    },
  ],
};

/* ─── Video Modal ─────────────────────────────────────────────── */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

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
          className="relative w-full max-w-4xl z-10"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors text-sm tracking-[0.3em] uppercase flex items-center gap-2"
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
    </AnimatePresence>
  );
}

/* ─── Video Card ──────────────────────────────────────────────── */
function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onPlay}
      className="relative cursor-pointer overflow-hidden"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        <img
          src={thumb}
          alt={video.title}
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

/* ─── Work Section ────────────────────────────────────────────── */
function WorkSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const videos = activeCategory ? (VIDEOS[activeCategory] ?? []) : [];
  const videosContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: string, isActive: boolean) => {
    const next = isActive ? null : categoryId;
    setActiveCategory(next);
    if (!isActive) {
      setTimeout(() => {
        videosContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <section
      id="what-i-do"
      className="py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-14"
      >
        <div className="h-px w-10 bg-red-600 mb-4" />
        <h2
          className="text-white leading-none"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 300,
          }}
        >
          WHAT I DO
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => handleCategoryClick(cat.id, isActive)}
              className="relative flex items-center gap-4 p-4 text-left overflow-hidden transition-all duration-300 border"
              style={{
                borderColor: isActive
                  ? "rgba(204,0,0,0.6)"
                  : "rgba(255,255,255,0.07)",
                background: isActive
                  ? "rgba(204,0,0,0.06)"
                  : "rgba(255,255,255,0.02)",
                borderRadius: "2px",
              }}
            >
              <div
                className="w-16 h-12 shrink-0 overflow-hidden"
                style={{ borderRadius: "1px" }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: isActive
                      ? "none"
                      : "grayscale(80%) brightness(0.5)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                />
              </div>
              <span
                className="flex-1 text-sm md:text-base font-semibold uppercase tracking-wider transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-condensed)",
                  letterSpacing: "0.2em",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {cat.label}
              </span>
              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  borderColor: isActive
                    ? "rgba(204,0,0,0.6)"
                    : "rgba(204,0,0,0.25)",
                  color: isActive ? "#CC0000" : "rgba(204,0,0,0.5)",
                }}
              >
                <span className="text-sm">›</span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            ref={videosContainerRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span
                  className="text-[15px] tracking-[0.5em] uppercase text-red-700"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((v) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      onPlay={() => setActiveVideo(v)}
                    />
                  ))}
                </div>
              ) : (
                /* placeholder لما Factories فاضية */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 gap-4"
                >
                  <span className="text-4xl text-red-600/30">⬡</span>
                  <p
                    className="text-[11px] tracking-[0.5em] uppercase text-white/20"
                    style={{ fontFamily: "var(--font-condensed)" }}
                  >
                    Coming Soon
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}

/* ─── Cursor ──────────────────────────────────────────────────── */
function useCursor() {
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setDot({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 80);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return { dot, ring };
}

/* ─── Services Ticker ─────────────────────────────────────────── */
function ServicesTicker() {
  return (
    <div style={{ background: "#CC0000", padding: "3px 0" }}>
      <section
        id="services"
        className="py-4 overflow-hidden"
        style={{ background: "#000" }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, pass) =>
            SERVICES.map((s) => (
              <span
                key={`${pass}-${s}`}
                className="inline-block px-6 md:px-10"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(18px, 3vw, 32px)",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {s} ·
              </span>
            )),
          )}
        </motion.div>
      </section>
    </div>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section
      className="py-24 md:py-36 border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-6 sm:px-10 md:px-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[10px] sm:text-xs tracking-[0.5em] uppercase mb-6"
          style={{ fontFamily: "var(--font-condensed)", color: "#CC0000" }}
        >
          Ready to Create?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="leading-none mb-10 md:mb-14"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 12vw, 130px)",
            letterSpacing: "0.04em",
          }}
        >
          <span className="text-white block">LET&apos;S MAKE</span>
          <span style={{ color: "#CC0000" }} className="block">
            MAGIC
          </span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden border-2 px-10 sm:px-14 py-4 sm:py-5 transition-all duration-500"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "clamp(11px, 1.5vw, 14px)",
              letterSpacing: "0.45em",
              borderColor: "#CC0000",
              color: "#CC0000",
            }}
          >
            <span
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
              style={{ background: "#CC0000" }}
            />
            <span className="relative z-10 uppercase group-hover:text-white transition-colors duration-400">
              Start Your Journey
            </span>
            <motion.span
              className="relative z-10 group-hover:text-white transition-colors duration-400"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  const { dot, ring } = useCursor();

  return (
    <main
      className="w-full overflow-x-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 80% 50% at 100% 0%, rgba(210,0,0,0.55) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 0% 80%, rgba(180,0,0,0.40) 0%, transparent 55%)",
          "linear-gradient(160deg, #160000 0%, #080000 50%, #020000 100%)",
        ].join(", "),
      }}
    >
      <div className="cursor-dot" style={{ left: dot.x, top: dot.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />
      <Navbar />
      <HeroClient />
      <WorkSection />
      <section>
        <Testimonials />
      </section>
      <CTASection />
      <FeedbackPage />
      <BehindTheScene />
      <Footer />
    </main>
  );
}
