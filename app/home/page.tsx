"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroClient from "@/components/HeroClient";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BehindTheScene from "@/components/BehindTheScene";
import FeedbackPage from "@/components/FeedBack";
import { CATEGORIES, VIDEOS, slugOf } from "@/lib/work-data";

const SERVICES = [
  "Portraits",
  "Commercial",
  "Events",
  "Editorial",
  "Product",
  "Lifestyle",
];

/* ─── Work Section ────────────────────────────────────────────── */
/* كل كارت دلوقتي لينك لصفحة خاصة: /work/content , /work/promo ... */
function WorkSection() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((cat, i) => {
          const count = VIDEOS[cat.id]?.length ?? 0;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/work/${slugOf(cat.id)}`}
                className="group relative flex items-center gap-5 p-4 text-left overflow-hidden transition-all duration-300 border hover:border-red-600/60 hover:bg-red-600/[0.06]"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="w-24 h-[72px] sm:w-28 sm:h-20 md:w-32 md:h-24 shrink-0 overflow-hidden"
                  style={{ borderRadius: "1px" }}
                >
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-all duration-500 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span
                    className="text-sm md:text-base font-semibold uppercase tracking-wider text-white/55 group-hover:text-white transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-condensed)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    className="text-[10px] uppercase text-white/25"
                    style={{
                      fontFamily: "var(--font-condensed)",
                      letterSpacing: "0.35em",
                    }}
                  >
                    {count} {count === 1 ? "Video" : "Videos"}
                  </span>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    borderColor: "rgba(204,0,0,0.35)",
                    color: "#CC0000",
                  }}
                >
                  <span className="text-sm">›</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
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
      <WorkSection />
      <HeroClient />
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