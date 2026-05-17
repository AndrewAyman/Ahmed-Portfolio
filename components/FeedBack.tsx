"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

type MediaType = "image" | "video" | "youtube" | "tiktok";

interface FeedbackItem {
  id: number;
  src: string;
  alt: string;
  type: MediaType;
}

const FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    id: 1,
    src: "/images/feedback/1.jpeg",
    alt: "Client work 1",
    type: "image",
  },
  { id: 2, src: "/images/feedback/2.png", alt: "Client work 2", type: "image" },
  { id: 3, src: "/images/feedback/3.png", alt: "Client work 3", type: "image" },
  { id: 4, src: "/images/feedback/4.png", alt: "Client work 4", type: "image" },
  { id: 5, src: "/images/feedback/5.png", alt: "Client work 5", type: "image" },
  { id: 6, src: "/images/feedback/6.png", alt: "Client work 6", type: "image" },
  { id: 7, src: "/images/feedback/7.png", alt: "Client work 7", type: "image" },
  { id: 8, src: "/images/feedback/8.png", alt: "Client work 8", type: "image" },
  { id: 9, src: "/images/feedback/9.png", alt: "Client work 9", type: "image" },
  {
    id: 10,
    src: "/images/feedback/10.png",
    alt: "Client work 10",
    type: "image",
  },
  {
    id: 11,
    src: "/images/feedback/11.png",
    alt: "Client work 11",
    type: "image",
  },
  {
    id: 12,
    src: "/images/feedback/12.png",
    alt: "Client work 12",
    type: "image",
  },
  {
    id: 13,
    src: "/images/feedback/14.mp4",
    alt: "Client video 1",
    type: "video",
  },
  {
    id: 14,
    src: "/images/feedback/15.mp4",
    alt: "Client video 2",
    type: "video",
  },
  {
    id: 15,
    src: "/images/feedback/16.mp4",
    alt: "Client video 3",
    type: "video",
  },
];

const NAV_BTN =
  "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:border-red-600 hover:bg-red-600/20 hover:scale-110";

function PlayIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function MediaRenderer({ item }: { item: FeedbackItem }) {
  if (item.type === "video") {
    return (
      <video
        key={item.src}
        src={item.src}
        controls
        autoPlay
        muted
        loop
        playsInline
        style={{
          maxHeight: "70vh",
          maxWidth: "85vw",
          width: "auto",
          height: "auto",
          display: "block",
          borderRadius: "12px",
          outline: "none",
        }}
      />
    );
  }

  if (item.type === "youtube" || item.type === "tiktok") {
    return (
      <iframe
        key={item.src}
        src={item.src}
        title={item.alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: "min(780px, 85vw)",
          aspectRatio: "16 / 9",
          border: "none",
          display: "block",
          borderRadius: "12px",
        }}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={800}
      height={1000}
      className="max-h-[70vh] w-auto object-contain rounded-[8px]"
      style={{ display: "block" }}
      priority
    />
  );
}

export default function FeedbackPage() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const total = FEEDBACK_ITEMS.length;

  const goNext = () => {
    if (currentIndex < total - 1) {
      setDirection("next");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
    }),
  };

  const current = FEEDBACK_ITEMS[currentIndex];

  return (
    <>
      <Navbar />
      <section
        ref={containerRef}
        className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse 80% 50% at 100% 20%, rgba(204,0,0,0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 45% at 0% 70%, rgba(204,0,0,0.35) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(180,0,0,0.25) 0%, transparent 80%)",
            "linear-gradient(160deg, #120000 0%, #080000 50%, #020000 100%)",
          ].join(", "),
        }}
      >
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(204,0,0,0.35) 0%, rgba(204,0,0,0.15) 40%, transparent 80%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(204,0,0,0.25) 0%, rgba(139,0,0,0.1) 60%, transparent 100%)",
              filter: "blur(70px)",
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="h-px w-12 bg-red-600 mb-4" />
            <h2
              className="text-white leading-none mb-3"
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 300,
                letterSpacing: "0.02em",
              }}
            >
              CLIENT
            </h2>
            <h2
              className="text-red-600 leading-none"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 8vw, 96px)",
                letterSpacing: "0.06em",
              }}
            >
              FEEDBACK
            </h2>
            <p
              className="text-white/40 max-w-xl mt-4"
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "clamp(14px, 2vw, 16px)",
              }}
            >
              A collection of moments captured for our amazing clients. Each
              image tells a unique story.
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="flex items-center gap-6">
            {/* ── Arrow Prev — FIX: className على سطر واحد ── */}
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className={NAV_BTN}
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Media Area */}
            <div className="flex-1 flex justify-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                  <div
                    className="absolute inset-0 z-10 pointer-events-none rounded-[12px]"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(204,0,0,0.3), 0 0 40px rgba(204,0,0,0.15)",
                    }}
                  />
                  <MediaRenderer item={current} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Arrow Next — FIX: className على سطر واحد ── */}
            <button
              onClick={goNext}
              disabled={currentIndex === total - 1}
              className={NAV_BTN}
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Counter + Dots */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <p
              className="text-white/30 text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-2">
              {FEEDBACK_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? "next" : "prev");
                    setCurrentIndex(i);
                  }}
                  className="transition-all duration-300 rounded-full flex items-center justify-center"
                  style={{
                    width: currentIndex === i ? "28px" : "7px",
                    height: "7px",
                    backgroundColor:
                      currentIndex === i
                        ? "rgba(204,0,0,1)"
                        : item.type !== "image"
                          ? "rgba(255,255,255,0.45)"
                          : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Go to item ${i + 1}`}
                >
                  {item.type !== "image" && currentIndex !== i && <PlayIcon />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16 pt-8 border-t border-white/10"
          >
            <p
              className="text-white/25 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Thank you for trusting us with your vision
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
