"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Portfolio", href: "/home" },
    { label: "Services", href: "/services" },
    { label: "Client", href: "/client" },
    { label: "Feedback", href: "/feedback" }, // ← الرابط الجديد
    { label: "Questions", href: "/contact" },
    { label: "Vlogs", href: "/vlogs" },
  ];

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
  };

  const linkItem: Variants = {
    hidden: { opacity: 0, y: -12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  /* ── Logo ── */
  const LogoImage = ({ width, height }: { width: number; height: number }) => (
    <div
      className="relative shrink-0"
      style={{ width, height }}
    >
      <Image
        src="/images/black logo-02.png"
        alt="Ahmed Osama Production"
        fill
        className="object-contain"
        style={{
          transform: "scale(2.8) translateY(12%)",
          transformOrigin: "center center",
        }}
        priority
      />
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* top red line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-red-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        />

        <div
          className="transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
          }}
        >
          <div className="flex items-center justify-between px-8 md:px-16 h-[72px]">
            {/* ── Logo ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/" className="block">
                <LogoImage width={160} height={52} />
              </Link>
            </motion.div>

            {/* ── Desktop center links ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={linkItem}
                  onClick={() => setActiveLink(link.label)}
                  className="relative group text-[11px] tracking-[0.4em] uppercase text-white/35 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-600 group-hover:w-full transition-all duration-300" />
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600"
                    />
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* ── Desktop CTA ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:flex items-center gap-6"
            >
              <div className="w-px h-5 bg-white/10" />
              <Link
                href="/contact"
                className="relative group overflow-hidden text-[11px] tracking-[0.4em] uppercase px-5 py-2.5 border border-red-600/50 text-red-600 transition-all duration-300 hover:text-white hover:border-red-600"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                <span className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">CONTACT Now</span>
              </Link>
            </motion.div>

            {/* ── Mobile hamburger ── */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-white"
              />
              <motion.span
                animate={{
                  opacity: menuOpen ? 0 : 1,
                  scaleX: menuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="block w-4 h-px bg-red-600"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-white"
              />
            </button>
          </div>

          <motion.div
            className="h-px bg-white/5"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.nav>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-end px-8 pb-16"
          >
            <span
              className="absolute top-24 right-6 text-[100px] text-white/[0.03] leading-none select-none"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              MENU
            </span>

            <div
              className="absolute top-0 left-0 right-0 h-[64px] flex items-center px-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <LogoImage width={140} height={46} />
            </div>

            <div className="flex flex-col gap-1 mb-10 mt-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  onClick={() => setMenuOpen(false)}
                  className="text-[56px] tracking-widest text-white/75 hover:text-red-600 transition-colors duration-300 leading-tight"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3"
            >
              <div className="w-10 h-px bg-red-600 mb-1" />
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.4em] uppercase px-8 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 self-start"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                Contact Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}