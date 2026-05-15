"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const TAGLINE = "Your Vision. My Lens.";

// Rotating photography quotes
const ROTATING_QUOTES = [
  "Capturing moments that last forever.",
  "Every picture tells a thousand stories.",
  "Freezing time, one click at a time.",
  "Where light meets emotion.",
  "Your story, beautifully framed.",
  "The art of seeing the unseen.",
  "Creating memories you can feel.",
  "Photography is the poetry of life.",
];

const LENS_RINGS = [
  { size: "100%", border: "2px solid rgba(204,0,0,0.35)", inset: 0 },
  { size: "80%", border: "2px solid rgba(204,0,0,0.55)", inset: "10%" },
  { size: "60%", border: "1px solid rgba(204,0,0,0.4)", inset: "20%" },
];

function LensDecor({ mobile = false }: { mobile?: boolean }) {
  const size = mobile
    ? "clamp(80px, 28vw, 120px)"
    : "clamp(120px, 18vw, 180px)";

  return (
    <motion.div
      style={{
        width: size,
        aspectRatio: "1",
        position: "relative",
        flexShrink: 0,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {LENS_RINGS.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{ inset: r.inset, border: r.border }}
        />
      ))}
      <motion.div
        className="absolute rounded-full"
        style={{ inset: "15%", border: "1px dashed rgba(204,0,0,0.3)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "30%",
          background:
            "radial-gradient(circle, rgba(204,0,0,0.9) 0%, rgba(150,0,0,0.6) 60%, transparent 100%)",
          boxShadow: "0 0 30px rgba(204,0,0,0.5)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 right-5 md:right-16 flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <span
        className="text-red-500/50"
        style={{
          fontFamily: "var(--font-condensed)",
          fontSize: "9px",
          letterSpacing: "0.5em",
          writingMode: "vertical-rl",
        }}
      >
        SCROLL
      </span>
      <motion.div
        className="w-px h-10 rounded-full"
        style={{
          background: "linear-gradient(to bottom, #CC0000, transparent)",
        }}
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_QUOTES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60px] md:h-[80px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-white/45 md:text-white/55 mx-auto"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "clamp(13px, 2vw, 18px)",
            maxWidth: "36ch",
            lineHeight: 1.6,
            textAlign: "center",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING_QUOTES[index]}
          <br />
          <span className="text-white/30 text-sm md:text-base">
            Every frame tells your story.
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// Mobile version of rotating text
function MobileRotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_QUOTES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-white/45 mb-8 mx-auto"
          style={{
            fontFamily: "var(--font-barlow)",
            fontSize: "14px",
            maxWidth: "30ch",
            lineHeight: 1.6,
            textAlign: "center",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING_QUOTES[index]}
          <br />
          <span className="text-white/25 text-xs">
            Every frame tells your story.
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function HeroClient() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-based animations for modern transition effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const lensScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const lensOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Scroll to What I Do section
  const scrollToWhatIDo = () => {
    const section = document.getElementById("what-i-do");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden pt-24"
    >
      {/* Animated background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(180,0,0,0.55) 0%, rgba(80,0,0,0.6) 45%, #080808 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* top red line with scroll animation */}
      <motion.div
        className="absolute left-0 h-[1px] top-24"
        style={{ background: "rgba(204,0,0,0.4)" }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />

      {/* ── MOBILE layout ── */}
      <motion.div
        className="flex md:hidden flex-col items-center justify-center flex-1 gap-8 px-6 pb-10 relative z-10"
        style={{ opacity, scale, y }}
      >
        <motion.div style={{ scale: lensScale, opacity: lensOpacity }}>
          <LensDecor mobile />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-red-500/70 uppercase mb-4"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "10px",
              letterSpacing: "0.5em",
            }}
          >
            {TAGLINE}
          </p>

          <h1
            className="leading-none mb-5"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(44px, 14vw, 72px)",
              letterSpacing: "0.04em",
            }}
          >
            <span className="block text-white">UNFORGETTABLE</span>
            <span className="block" style={{ color: "#CC0000" }}>
              MOMENTS
            </span>
          </h1>

          <MobileRotatingText />

          <div className="flex flex-col gap-3 items-center mt-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-3.5 w-full justify-center"
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "11px",
                letterSpacing: "0.45em",
                background: "#CC0000",
                color: "#fff",
                border: "2px solid #CC0000",
              }}
            >
              <span
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"
                style={{ background: "#000" }}
              />
              <span className="relative z-10 uppercase">Contact Now</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>

            {/* View Portfolio Button - NOW SCROLLS TO WHAT I DO */}
            <button
              onClick={scrollToWhatIDo}
              className="group inline-flex items-center gap-3 px-8 py-3.5 w-full justify-center"
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "11px",
                letterSpacing: "0.45em",
                border: "2px solid rgba(204,0,0,0.35)",
                color: "rgba(255,255,255,0.45)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <span className="uppercase group-hover:text-white transition-colors duration-300">
                View Portfolio
              </span>
              <motion.span
                className="group-hover:text-white transition-colors duration-300"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── DESKTOP layout ── */}
      <motion.div
        className="hidden md:flex flex-col flex-1 relative z-10"
        style={{ opacity, scale, rotateX }}
      >
        {/* lens centered top area with scroll animation */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div style={{ scale: lensScale, opacity: lensOpacity }}>
            <LensDecor />
          </motion.div>
        </div>

        {/* text bottom */}
        <motion.div
          className="w-full text-center px-8 md:px-16 pb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-red-500/80 uppercase mb-5"
            style={{
              fontFamily: "var(--font-condensed)",
              fontSize: "clamp(9px, 1.8vw, 12px)",
              letterSpacing: "0.55em",
            }}
          >
            {TAGLINE}
          </p>

          <h1
            className="leading-none mb-8"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(56px, 11vw, 130px)",
              letterSpacing: "0.04em",
            }}
          >
            <span className="block text-white">UNFORGETTABLE</span>
            <span className="block" style={{ color: "#CC0000" }}>
              MOMENTS
            </span>
          </h1>

          <RotatingText />

          <div className="flex flex-row gap-4 justify-center items-center mt-6">
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4"
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "clamp(10px, 1.5vw, 13px)",
                letterSpacing: "0.45em",
                background: "#CC0000",
                color: "#fff",
                border: "2px solid #CC0000",
              }}
            >
              <span
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"
                style={{ background: "#000" }}
              />
              <span className="relative z-10 uppercase">Contact Now</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>

            {/* View Portfolio Button - DESKTOP */}
            <button
              onClick={scrollToWhatIDo}
              className="group inline-flex items-center gap-3 px-10 py-4"
              style={{
                fontFamily: "var(--font-condensed)",
                fontSize: "clamp(10px, 1.5vw, 13px)",
                letterSpacing: "0.45em",
                border: "2px solid rgba(204,0,0,0.35)",
                color: "rgba(255,255,255,0.55)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <span className="uppercase group-hover:text-white transition-colors duration-300">
                View Portfolio
              </span>
              <motion.span
                className="group-hover:text-white transition-colors duration-300"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />

      {/* Gradient fade at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-20" />
    </section>
  );
}
