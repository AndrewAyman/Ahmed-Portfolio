"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"image" | "logo" | "tagline" | "exit">("image");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 800);
    const t2 = setTimeout(() => setPhase("tagline"), 1800);
    const t3 = setTimeout(() => setPhase("exit"), 3200);
    const t4 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated red glow background — no image needed */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(204,0,0,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Red line top */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-red"
            initial={{ width: "0%" }}
            animate={{ width: phase !== "image" ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Red line bottom */}
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] bg-red"
            initial={{ width: "0%" }}
            animate={{ width: phase !== "image" ? "100%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">

            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: phase === "logo" || phase === "tagline" ? 1 : 0,
                scale: phase === "logo" || phase === "tagline" ? 1 : 0.8,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative w-20 h-20">
                <motion.div
                  className="absolute inset-0 border-2 border-red rotate-45"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(204,0,0,0.3)",
                      "0 0 40px rgba(204,0,0,0.7)",
                      "0 0 20px rgba(204,0,0,0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-2 border border-red/40 rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl text-red tracking-widest"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    RE
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === "logo" || phase === "tagline" ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h1
                className="text-7xl md:text-9xl text-white"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.3em" }}
              >
                RED <span className="text-red">EDE</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: phase === "tagline" ? 1 : 0,
                y: phase === "tagline" ? 0 : 20,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-sm text-white/50 uppercase"
              style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.4em" }}
            >
              Capture the moment · Feel the story
            </motion.p>

            {/* Corner decorations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "tagline" ? 1 : 0 }}
              className="absolute -top-8 -left-16 w-8 h-8 border-t-2 border-l-2 border-red"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "tagline" ? 1 : 0 }}
              className="absolute -bottom-8 -right-16 w-8 h-8 border-b-2 border-r-2 border-red"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}