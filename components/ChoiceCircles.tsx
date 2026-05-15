"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ─── circle size based on viewport ─── */
function useCircleSize() {
  const [size, setSize] = useState(160);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 360) setSize(120);
      else if (vw < 480) setSize(138);
      else if (vw < 640) setSize(155);
      else if (vw < 768) setSize(170);
      else if (vw < 1024) setSize(190);
      else setSize(220);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return size;
}

const choices = [
  {
    label: "Portfolio",
    sub: "Explore my work",
    icon: "✦",
    href: "/home",
    delay: 0,
  },
  {
    label: "Questions",
    sub: "Ask me anything",
    icon: "?",
    href: "/contact",
    delay: 0.1,
  },
  {
    label: "Vlogs",
    sub: "Feel The Story",
    icon: "★",
    href: "/vlogs",
    delay: 0.2,
  },
  {
    label: "Services",
    sub: "What we offer",
    icon: "◈",
    href: "/services",
    delay: 0.3,
  },
];

export default function ChoiceCircles() {
  const router = useRouter();
  const size = useCircleSize();

  /* ── font scales — increased for bigger text inside circles ── */
  const iconSize = Math.round(size * 0.17); // was 0.13
  const labelSize = Math.round(size * 0.13); // was 0.09
  const subSize = Math.max(9, Math.round(size * 0.062)); // was 0.047
  const gap = Math.round(size * 0.04);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #3a0000 0%, #1a0000 60%, #0a0000 100%)",
        gap: "clamp(24px, 4vh, 48px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Modern animated red background effects - Dominant red */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main ambient red glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(204,0,0,0.45) 0%, rgba(204,0,0,0.2) 30%, rgba(139,0,0,0.08) 70%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary red glow pulse */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(204,0,0,0.35) 0%, rgba(139,0,0,0.15) 40%, transparent 80%)",
            filter: "blur(50px)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top red glow layer */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(204,0,0,0.3) 0%, rgba(139,0,0,0.1) 50%, transparent 100%)",
            filter: "blur(55px)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Animated particles - Red tinted */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(204, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${0.2 + Math.random() * 0.3})`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating red orbs */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.25) 0%, rgba(139,0,0,0.1) 50%, transparent 80%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.22) 0%, rgba(139,0,0,0.08) 50%, transparent 80%)",
            filter: "blur(45px)",
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, -35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional red aura overlay */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 60%)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* subtle grid overlay - red tinted */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-4 relative z-10"
      >
        <h1
          className="text-red-600 leading-none mb-2"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(40px, 10vw, 96px)",
            letterSpacing: "0.06em",
          }}
        >
          Where to next?
        </h1>
        <p
          className="text-white/30 uppercase"
          style={{
            fontFamily: "var(--font-condensed)",
            fontSize: "clamp(9px, 1.8vw, 13px)",
            letterSpacing: "0.5em",
          }}
        >
          Choose your path
        </p>
      </motion.div>

      {/* ── 2×2 grid ── */}
      <div
        className="grid grid-cols-2 relative z-10"
        style={{ gap: `clamp(12px, 3vw, 40px)` }}
      >
        {choices.map((choice, ci) => (
          <motion.button
            key={choice.label}
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4 + choice.delay,
              type: "spring",
              stiffness: 175,
              damping: 18,
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(choice.href)}
            className="group relative flex flex-col items-center justify-center rounded-full"
            style={{
              width: size,
              height: size,
              border: "2px solid rgba(204,0,0,0.3)",
              background: "rgba(10,0,0,0.7)",
              flexShrink: 0,
            }}
          >
            {/* rotating dashed outer ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-8px",
                border: "1px dashed rgba(204,0,0,0.18)",
                borderRadius: "50%",
              }}
              animate={{ rotate: ci % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />

            {/* pulse ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: 0, border: "1px solid rgba(204,0,0,0.1)" }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: choice.delay,
              }}
            />

            {/* content */}
            <div
              className="flex flex-col items-center pointer-events-none select-none"
              style={{ gap }}
            >
              <span
                className="text-red-600 leading-none"
                style={{ fontFamily: "var(--font-bebas)", fontSize: iconSize }}
              >
                {choice.icon}
              </span>
              <span
                className="text-white tracking-widest"
                style={{ fontFamily: "var(--font-bebas)", fontSize: labelSize }}
              >
                {choice.label}
              </span>
              <span
                className="text-white/30 uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontSize: subSize,
                }}
              >
                {choice.sub}
              </span>
            </div>

            {/* hover glow border */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                border: "2px solid rgba(204,0,0,0.7)",
                boxShadow: "0 0 28px rgba(204,0,0,0.15)",
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
