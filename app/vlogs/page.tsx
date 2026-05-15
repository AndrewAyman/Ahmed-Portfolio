"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VlogsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // التعديل هنا: استخدمنا الـ Backticks `` لتحويلها إلى نص برمجياً صحيح
        ctx.fillStyle = `rgba(204, 0, 0, ${p.alpha})`;

        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Particles */}
      <Navbar />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Red radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(180,0,0,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Top red line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-red-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Bottom red line */}
      <motion.div
        className="absolute bottom-0 right-0 h-[2px] bg-red-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Corner TL */}
        <motion.div
          initial={{ opacity: 0, x: -10, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -top-16 -left-16 w-10 h-10 border-t-2 border-l-2 border-red-600"
        />
        {/* Corner BR */}
        <motion.div
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -bottom-16 -right-16 w-10 h-10 border-b-2 border-r-2 border-red-600"
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[10px] tracking-[0.55em] uppercase text-red-600 mb-8"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          Vlogs
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px bg-red-600 mb-8"
        />

        {/* Coming Soon */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="text-white uppercase leading-none tracking-widest"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 12vw, 130px)",
          }}
        >
          Coming
          <br />
          <span className="text-red-600">Soon</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px bg-white/10 mt-10"
        />

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="text-white text-[11px] tracking-[0.45em] uppercase mt-6"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          Stay tuned
        </motion.p>
      </div>
    </main>
  );
}
