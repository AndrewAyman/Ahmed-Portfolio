"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IntroAnimationProps {
  onComplete: () => void;
}

type Phase = "start" | "logo" | "tagline" | "exit";

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<Phase>("start");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const runTimeline = useCallback(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), 600),
      setTimeout(() => setPhase("tagline"), 1900),
      setTimeout(() => setPhase("exit"), 3600),
      setTimeout(() => onComplete(), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(runTimeline, [runTimeline]);

  const show = phase === "logo" || phase === "tagline";

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        >
          {/* ── Photographer image (background) ── */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 1.06 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <Image
              src="/images/Oss.png"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
              quality={85}
            />
            {/* dark + red vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* subtle red tint matching photo mood */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(120,0,0,0.18)",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>

          {/* ── Red glow pulse ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 1.6 }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, rgba(204,0,0,0.22) 0%, transparent 60%)",
            }}
          />

          {/* ── Top red line ── */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-red-600"
            initial={{ width: "0%" }}
            animate={{ width: show ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {/* ── Bottom red line ── */}
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] bg-red-600"
            initial={{ width: "0%" }}
            animate={{ width: show ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
          />

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center gap-7 text-center px-8">
            {/* Corner TL */}
            <motion.div
              initial={{ opacity: 0, x: -8, y: -8 }}
              animate={{ opacity: show ? 1 : 0, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-12 -left-12 w-8 h-8 border-t-2 border-l-2 border-red-600"
            />
            {/* Corner BR */}
            <motion.div
              initial={{ opacity: 0, x: 8, y: 8 }}
              animate={{ opacity: show ? 1 : 0, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-12 -right-12 w-8 h-8 border-b-2 border-r-2 border-red-600"
            />

            {/* ── Logo ── */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.88 }}
              animate={{
                opacity: show ? 1 : 0,
                y: show ? 0 : 24,
                scale: show ? 1 : 0.88,
              }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* glow bloom behind logo */}
              <motion.div
                className="absolute inset-0 blur-3xl pointer-events-none"
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ background: "rgba(204,0,0,0.3)" }}
              />

              <div
                className="relative overflow-hidden"
                style={{ width: 320, height: 130 }}
              >
                <Image
                  src="/images/black logo-02.png"
                  alt="Ahmed Osama Production"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="320px"
                  className="object-contain"
                  style={{
                    transform: "scale(1.8)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </motion.div>

            {/* ── Tagline - Responsive: Mobile (parallel lines) | Windows (single line) ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: phase === "tagline" ? 1 : 0,
                y: phase === "tagline" ? 0 : 14,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                className="h-px bg-red-600"
                initial={{ width: 0 }}
                animate={{ width: phase === "tagline" ? 56 : 0 }}
                transition={{ duration: 0.6 }}
              />

              {/* Responsive text layout */}
              {isMobile ? (
                // Mobile: Two parallel lines
                <div className="flex flex-col items-center gap-1">
                  <p
                    className="text-[11px] text-white/45 uppercase whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-condensed)",
                      letterSpacing: "0.52em",
                    }}
                  >
                    Capture the moment
                  </p>
                  <p
                    className="text-[11px] text-white/45 uppercase whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-condensed)",
                      letterSpacing: "0.52em",
                    }}
                  >
                    Feel the story
                  </p>
                </div>
              ) : (
                // Desktop: Single line
                <p
                  className="text-[11px] text-white/45 uppercase whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-condensed)",
                    letterSpacing: "0.52em",
                  }}
                >
                  Capture the moment · Feel the story
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
