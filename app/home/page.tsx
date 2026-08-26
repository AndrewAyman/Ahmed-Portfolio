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
    id: "Food & Drinks",
    label: "Food & Drinks",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=130&fit=crop&auto=format",
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
    id: "Medical",
    label: "Medical",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=130&fit=crop&auto=format",
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
    {
      id: "c-8",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "7TgCWYLc7To",
    },
     {
      id: "c-9",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "bNx6bzIx26A",
    },
     {
      id: "c-10",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "NnoAYFEvRGQ",
    },
     {
      id: "c-11",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "iEtlZ_KhXh0",
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
      youtubeId: "DSGR5r2v-EM",
    },
  ],
  Gym: [
    // {
    //   id: "g-1",
    //   title: "اسم الفيديو",
    //   client: "اسم الكلايينت",
    //   year: "2024",
    //   desc: "وصف قصير",
    //   youtubeId: "ie0itE7YmGI",
    // },
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
    {
      id: "g-12",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "GWB-i37wdBo",
    },
     {
      id: "g-13",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "3D7eBEgLx08",
    },
     {
      id: "g-14",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "WyMDwibU7ZM",
    },
     {
      id: "g-15",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "n_o1XtZLryk",
    },
     {
      id: "g-16",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "Mo5Apf1c8V0",
    },
  ],
  "Food & Drinks": [
    {
      id: "fd-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "CdG4faWdW0g",
    },
    {
      id: "fd-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "dGaDbUWORrA",
    },
    {
      id: "fd-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "yucb2Op_7jU",
    },
    {
      id: "fd-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "VOG4gSqCRBI",
    }
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
    Medical: [
    {
      id: "f-1",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "7vmO_45Owg0",
    },
        {
      id: "f-2",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "7TgCWYLc7To",
    },
            {
      id: "f-3",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "o_6MtCLAw7k",
    },
                {
      id: "f-4",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "4NxXotUl-9g",
    },
                    {
      id: "f-5",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "UipQRii9BwU",
    },
    {
      id: "f-6",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "v4PfmFrR3T0",
    },
    {
      id: "f-7",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "AQ6ULJb7rtA",
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
    {
      id: "o-7",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "4NxXotUl-9g",
    },
    {
      id: "o-8",
      title: "اسم الفيديو",
      client: "اسم الكلايينت",
      year: "2024",
      desc: "وصف قصير",
      youtubeId: "WyMDwibU7ZM",
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
        className="z-50 fixed inset-0 flex justify-center items-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        <motion.div
          className="z-10 relative w-full max-w-4xl"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="-top-10 right-0 absolute flex items-center gap-2 text-white/50 hover:text-white text-sm uppercase tracking-[0.3em] transition-colors"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            Close ✕
          </button>
          <div className="bg-black border border-white/10 w-full aspect-video">
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
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative bg-white/5 aspect-video overflow-hidden">
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center border-2 border-red-600 rounded-full w-14 h-14"
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
      className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-14"
      >
        <div className="bg-red-600 mb-4 w-10 h-px" />
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

      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
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
              className="relative flex items-center gap-4 p-4 border overflow-hidden text-left transition-all duration-300"
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
                className="w-16 h-12 overflow-hidden shrink-0"
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
                className="flex-1 font-semibold text-sm md:text-base uppercase tracking-wider transition-colors duration-300"
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
                className="flex justify-center items-center border rounded-full w-8 h-8 shrink-0"
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
                <div className="flex-1 bg-white/[0.06] h-px" />
                <span
                  className="text-[15px] text-red-700 uppercase tracking-[0.5em]"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </span>
                <div className="flex-1 bg-white/[0.06] h-px" />
              </div>

              {videos.length > 0 ? (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="flex flex-col justify-center items-center gap-4 py-20"
                >
                  <span className="text-red-600/30 text-4xl">⬡</span>
                  <p
                    className="text-[11px] text-white/20 uppercase tracking-[0.5em]"
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
        className="mx-auto px-6 sm:px-10 md:px-16 max-w-4xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 text-[10px] sm:text-xs uppercase tracking-[0.5em]"
          style={{ fontFamily: "var(--font-condensed)", color: "#CC0000" }}
        >
          Ready to Create?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="mb-10 md:mb-14 leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 12vw, 130px)",
            letterSpacing: "0.04em",
          }}
        >
          <span className="block text-white">LET&apos;S MAKE</span>
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
            className="group inline-flex relative items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 border-2 overflow-hidden transition-all duration-500"
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
            <span className="z-10 relative group-hover:text-white uppercase transition-colors duration-400">
              Start Your Journey
            </span>
            <motion.span
              className="z-10 relative group-hover:text-white transition-colors duration-400"
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