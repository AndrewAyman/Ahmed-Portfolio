"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const moveRing = (e: MouseEvent) => {
      setTimeout(() => setCursorRingPos({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", moveRing);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", moveRing);
    };
  }, []);

  return (
    <main className="bg-black min-h-screen grain">
      {/* Cursor */}
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: cursorRingPos.x, top: cursorRingPos.y }} />

      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="RED EDE Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Red vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute left-6 md:left-12 top-32 bottom-20 w-px bg-red origin-top"
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="font-condensed text-xs tracking-[0.6em] text-red uppercase mb-6 ml-6"
          >
            Photography · Egypt & Worldwide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="font-bebas text-8xl md:text-[10rem] leading-none text-white tracking-widest ml-6"
          >
            Capture<br />
            <span className="text-red">Every</span><br />
            Moment
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 ml-6 flex items-center gap-6"
          >
            <Link
              href="/booking"
              className="font-condensed text-sm tracking-[0.4em] uppercase px-8 py-4 bg-red text-white hover:bg-transparent hover:border hover:border-red transition-all duration-300"
            >
              Book a Session
            </Link>
            <a
              href="#gallery"
              className="font-condensed text-sm tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors duration-300"
            >
              View Work ↓
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-12 flex flex-col items-center gap-2"
        >
          <span className="font-condensed text-xs tracking-[0.4em] text-white/20 uppercase rotate-90 origin-center mb-4">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-red/40"
          />
        </motion.div>
      </section>

      {/* Services strip */}
      <section id="services" className="py-8 bg-red overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) =>
            ["Weddings", "Portraits", "Fashion", "Commercial", "Events", "Editorial"].map(
              (s) => (
                <span
                  key={`${i}-${s}`}
                  className="font-bebas text-2xl tracking-[0.3em] text-white/80"
                >
                  {s} ·
                </span>
              )
            )
          )}
        </motion.div>
      </section>

      {/* Gallery */}
      <Gallery />

      {/* Pricing */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-24 px-6 md:px-12 bg-black-soft border-y border-black-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-condensed text-xs tracking-[0.5em] text-red uppercase mb-4">
            Ready?
          </p>
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-widest mb-8">
            Let's Make Magic
          </h2>
          <Link
            href="/booking"
            className="inline-block font-condensed text-sm tracking-[0.4em] uppercase px-12 py-5 border-2 border-red text-red hover:bg-red hover:text-white transition-all duration-400"
          >
            Start Your Journey →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}