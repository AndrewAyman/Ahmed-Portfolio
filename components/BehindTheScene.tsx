"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

// صور المصور - 3 صور (من مجلد public/images)
const PHOTOGRAPHER_IMAGES = [
  {
    id: 1,
    src: "/images/4.jpg",
    alt: "Photographer at work - portrait session",
    caption: "Capturing the moment",
  },
  {
    id: 2,
    src: "/images/5.jpg",
    alt: "Behind the camera",
    caption: "Behind the lens",
  },
  {
    id: 3,
    src: "/images/6.jpg",
    alt: "Editing session",
    caption: "Crafting the story",
  },
];

// صور Behind the scene - 3 صور (نفس الصور أو صور مختلفة)
const BEHIND_SCENE_IMAGES = [
  {
    id: 1,
    src: "/images/1.jpg",
    alt: "Camera setup",
  },
  {
    id: 2,
    src: "/images/2.jpg",
    alt: "Lighting setup",
  },
  {
    id: 3,
    src: "/images/3.jpg",
    alt: "Action shot",
  },
];

export default function BehindTheScene() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [hoveredBTS, setHoveredBTS] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 80% 50% at 100% 20%, rgba(204,0,0,0.55) 0%, rgba(139,0,0,0.3) 40%, transparent 70%)",
          "radial-gradient(ellipse 60% 45% at 0% 70%, rgba(204,0,0,0.45) 0%, rgba(139,0,0,0.25) 50%, transparent 80%)",
          "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(180,0,0,0.35) 0%, rgba(100,0,0,0.2) 60%, transparent 100%)",
          "linear-gradient(160deg, #1a0000 0%, #0a0000 40%, #030000 100%)",
        ].join(", "),
      }}
    >
      {/* Animated red glow effects - intensified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.4) 0%, rgba(204,0,0,0.2) 30%, rgba(139,0,0,0.1) 60%, transparent 90%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.35) 0%, rgba(204,0,0,0.15) 50%, transparent 80%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,0,0,0.3) 0%, rgba(139,0,0,0.12) 60%, transparent 100%)",
            filter: "blur(65px)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            BEHIND THE
          </h2>
          <h2
            className="text-red-600 leading-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 8vw, 96px)",
              letterSpacing: "0.06em",
            }}
          >
            SCENE
          </h2>
          <p
            className="text-white/40 max-w-xl mt-4"
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(14px, 2vw, 16px)",
            }}
          >
            A glimpse into the creative process — from concept to final frame.
            Every image tells a story, and here&apos;s how they come to life.
          </p>
        </motion.div>

        {/* Main Content - Photographer Section + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-block">
                <div className="h-px w-16 bg-red-600/50 mb-3" />
                <span
                  className="text-red-500 text-sm tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  The Photographer
                </span>
              </div>
              <h3
                className="text-white leading-tight"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  letterSpacing: "0.04em",
                }}
              >
                Ahmed <span className="text-red-600">Osama</span>
              </h3>
              <p
                className="text-white/60 leading-relaxed"
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "clamp(14px, 1.8vw, 16px)",
                }}
              >
                With over 8 years of experience in fashion, commercial, and
                editorial photography, I believe that every frame should evoke
                emotion. My approach blends technical precision with artistic
                intuition — creating visuals that resonate.
              </p>
              <p
                className="text-white/40 leading-relaxed"
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "clamp(14px, 1.8vw, 16px)",
                }}
              >
                From concept development to final delivery, I work closely with
                clients to bring their vision to life. Based in Cairo, working
                worldwide.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Years Exp", value: "4+" },
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "40+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-red-600 font-bold"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(28px, 4vw, 38px)",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-white/30 text-xs tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-condensed)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Photographer Image Grid (3 photos) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-3">
              {PHOTOGRAPHER_IMAGES.map((img, idx) => (
                <motion.div
                  key={img.id}
                  className="relative overflow-hidden cursor-pointer"
                  style={{ borderRadius: "2px", aspectRatio: "3/4" }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => setHoveredImage(img.id)}
                  onHoverEnd={() => setHoveredImage(null)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-500"
                    style={{
                      filter: hoveredImage === img.id ? "none" : "grayscale(40%) brightness(0.7)",
                      transform: hoveredImage === img.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredImage === img.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute bottom-3 left-3 right-3">
                      <p
                        className="text-white/80 text-[10px] tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-condensed)" }}
                      >
                        {img.caption}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            {/* Decorative red line */}
            <div className="absolute -bottom-6 right-0 w-24 h-px bg-red-600/30" />
          </motion.div>
        </div>

        {/* Behind the Scene Gallery - 3 images */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span
              className="text-[13px] tracking-[0.5em] uppercase text-red-600/70"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              BTS Gallery
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {BEHIND_SCENE_IMAGES.map((img, idx) => (
              <motion.div
                key={img.id}
                className="relative overflow-hidden group cursor-pointer"
                style={{ borderRadius: "2px", aspectRatio: "4/5" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredBTS(img.id)}
                onHoverEnd={() => setHoveredBTS(null)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700"
                  style={{
                    filter: hoveredBTS === img.id ? "none" : "grayscale(60%) brightness(0.5)",
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredBTS === img.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className="text-white/60 text-[10px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "var(--font-condensed)" }}
                    >
                      {img.alt}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p
            className="text-white/30 italic max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-barlow)",
              fontSize: "clamp(14px, 2vw, 18px)",
            }}
          >
            &quot;Photography is the art of revealing what&apos;s already there — the beauty, the emotion, the story waiting to be told.&quot;
          </p>
          <p
            className="text-red-600/50 text-xs tracking-[0.3em] uppercase mt-4"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            — Ahmed Osama
          </p>
        </motion.div>
      </div>
    </section>
  );
}