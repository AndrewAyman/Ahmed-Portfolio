"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const TAGLINE = "Your Vision. My Lens.";

// Rotating videography quotes
const ROTATING_QUOTES = [
  "Capturing moments that last forever.",
  "Every picture tells a thousand stories.",
  "Freezing time, one click at a time.",
  "Where light meets emotion.",
  "Your story, beautifully framed.",
  "The art of seeing the unseen.",
  "Creating memories you can feel.",
  "videography is the poetry of life.",
];

/* ─── الخلفية: صورة 1 بدوتون أحمر/أسود + حركة خفيفة ─────────────── */
function BackgroundImages({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // الصورة بتتحرك عكس اتجاه الماوس شوية
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const m1x = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const m1y = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const s1 = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const mask =
    "radial-gradient(ellipse 80% 80% at 75% 35%, black 25%, transparent 75%)";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-full md:w-[64%] h-[62%] md:h-[78%]"
        style={{ x: m1x, y: m1y }}
      >
        <motion.div className="absolute inset-0" style={{ y: s1 }}>
          <div
            className="absolute inset-0 opacity-60 md:opacity-90"
            style={{
              background: "#9b0000",
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          >
            <motion.div
              className="absolute inset-[-6%]"
              style={{
                backgroundImage: "url('/images/1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(1) contrast(1.15)",
                mixBlendMode: "multiply",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* تغميق ورا الكلام عشان يفضل مقروء */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 78%, rgba(8,8,8,0.8) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ─── عدسة كاميرا حقيقية ─────────────────────────────────────────
   جسم معدن + حلقة فوكس مخرّشة بتلف ببطء + حلقة حمرا (زي عدسات L)
   + كتابة محفورة + زجاج بطبقات + بلاستيك آيريس 8 ريش + لمعان     */
const ENGRAVE = "YOUR VISION — MY LENS — 35mm F1.4 — Ø77 — ";

function LensDecor({ mobile = false }: { mobile?: boolean }) {
  const size = mobile
    ? "clamp(110px, 38vw, 160px)"
    : "clamp(150px, 20vw, 230px)";

  return (
    <motion.div
      style={{
        width: size,
        aspectRatio: "1",
        position: "relative",
        flexShrink: 0,
        filter: "drop-shadow(0 0 38px rgba(204,0,0,0.45))",
      }}
      initial={{ scale: 0, opacity: 0, rotate: -40 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* جسم العدسة (معدن) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 20deg, #161616, #3d3d3d, #121212, #4a4a4a, #101010, #333, #161616)",
          boxShadow:
            "inset 0 0 0 2px rgba(255,255,255,0.07), inset 0 0 22px rgba(0,0,0,0.95), 0 14px 40px rgba(0,0,0,0.85)",
        }}
      />

      {/* حلقة الفوكس المخرّشة (بتلف ببطء) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "4%",
          background:
            "repeating-conic-gradient(from 0deg, #0a0a0a 0deg 2.5deg, #3a3a3a 2.5deg 5deg)",
          boxShadow: "inset 0 0 14px rgba(0,0,0,0.9)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {/* إضاءة على الحلقة عشان تبان مجسمة */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "4%",
          background:
            "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.28), transparent 42%), radial-gradient(circle at 82% 88%, rgba(0,0,0,0.65), transparent 55%)",
        }}
      />

      {/* الحلقة الداخلية السودا (عليها الكتابة) */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "14%",
          background:
            "conic-gradient(from 200deg, #050505, #1c1c1c, #070707, #222, #050505)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 12px rgba(0,0,0,0.9)",
        }}
      />

      {/* الحلقة الحمرا */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "21%",
          border: "2px solid #CC0000",
          boxShadow:
            "0 0 12px rgba(204,0,0,0.8), inset 0 0 8px rgba(204,0,0,0.6)",
        }}
      />

      {/* الزجاج + الآيريس + الانعكاسات */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="lensGlass" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#1c0007" />
            <stop offset="0.55" stopColor="#07030a" />
            <stop offset="0.85" stopColor="#14001c" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <radialGradient id="lensCore" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff4d4d" stopOpacity="1" />
            <stop offset="0.4" stopColor="#cc0000" stopOpacity="0.9" />
            <stop offset="1" stopColor="#5a0000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lensBlade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#343434" />
            <stop offset="1" stopColor="#0b0b0b" />
          </linearGradient>
          <linearGradient id="lensCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a2be2" stopOpacity="0.9" />
            <stop offset="0.35" stopColor="#00e0a0" stopOpacity="0.55" />
            <stop offset="0.65" stopColor="#ff1a1a" stopOpacity="0.8" />
            <stop offset="1" stopColor="#3a6cff" stopOpacity="0.6" />
          </linearGradient>
          <filter id="lensBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <path
            id="lensTextPath"
            d="M100,100 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0"
          />
        </defs>

        {/* الكتابة المحفورة */}
        <text
          fill="rgba(255,255,255,0.5)"
          fontSize="6"
          style={{
            fontFamily: "var(--font-condensed)",
            textTransform: "uppercase",
          }}
        >
          <textPath
            href="#lensTextPath"
            textLength="402"
            lengthAdjust="spacing"
          >
            {ENGRAVE + ENGRAVE}
          </textPath>
        </text>

        {/* الزجاج الأمامي */}
        <circle cx="100" cy="100" r="55" fill="url(#lensGlass)" />
        <circle
          cx="100"
          cy="100"
          r="55"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.8"
        />
        {/* حدود عناصر الزجاج الداخلية */}
        <circle cx="100" cy="100" r="47" fill="none" stroke="rgba(255,70,70,0.25)" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="41" fill="none" stroke="rgba(130,90,255,0.22)" strokeWidth="0.6" />

        {/* الآيريس: 8 ريش بتتنفس */}
        <g transform="translate(100 100)">
          <motion.g
            animate={{ scale: [1, 0.93, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M-5 -35 L17 -31 L11 -10 L-10 -12 Z"
                transform={`rotate(${i * 45})`}
                fill="url(#lensBlade)"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="0.5"
              />
            ))}
          </motion.g>
        </g>

        {/* قلب العدسة المضيء */}
        <motion.circle
          cx="100"
          cy="100"
          r="15"
          fill="url(#lensCore)"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* انعكاس الطلاء الملوّن (بيلف ببطء) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.55 }}
        >
          <circle
            cx="100"
            cy="100"
            r="51"
            fill="none"
            stroke="url(#lensCoat)"
            strokeWidth="2.4"
            strokeDasharray="60 260"
            filter="url(#lensBlur)"
          />
        </motion.g>

        {/* لمعان ثابت */}
        <ellipse
          cx="77"
          cy="72"
          rx="17"
          ry="8"
          fill="#fff"
          opacity="0.28"
          transform="rotate(-35 77 72)"
          filter="url(#lensBlur)"
        />
        <ellipse
          cx="126"
          cy="129"
          rx="9"
          ry="4"
          fill="#fff"
          opacity="0.12"
          transform="rotate(-35 126 129)"
          filter="url(#lensBlur)"
        />
        <circle cx="70" cy="66" r="1.6" fill="#fff" opacity="0.85" />
      </svg>
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

      {/* صورة الخلفية */}
      <BackgroundImages scrollYProgress={scrollYProgress} />

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
          </div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />

      {/* Gradient fade at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-20" />
    </section>
  );
}