"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
    { label: "Work",     href: "#gallery" },
    { label: "Services", href: "#services" },
    { label: "Pricing",  href: "#pricing" },
    { label: "Reviews",  href: "#reviews" },
  ];

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
  };

  const linkItem = {
    hidden: { opacity: 0, y: -12 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* top red accent line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-red"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
        />

        <div className={`transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-lg" : "bg-transparent"}`}>
          <div className="flex items-center justify-between px-10 md:px-20 h-[72px]">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-9 h-9 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 border border-red rotate-45"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="font-bebas text-[11px] text-red z-10" style={{ letterSpacing: "0.05em" }}>
                    RE
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bebas text-lg tracking-[0.3em] text-white">
                    RED <span className="text-red">EDE</span>
                  </span>
                  <span className="font-condensed text-[9px] tracking-[0.5em] text-white/30 uppercase" style={{ marginTop: "1px" }}>
                    Photography
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop links */}
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
                  className="relative group font-condensed text-[11px] tracking-[0.4em] uppercase text-white/35 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red group-hover:w-full transition-all duration-300" />
                  {activeLink === link.label && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red"
                    />
                  )}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden md:flex items-center gap-6"
            >
              <div className="w-px h-5 bg-white/10" />
              <Link
                href="/booking"
                className="relative group overflow-hidden font-condensed text-[11px] tracking-[0.4em] uppercase px-5 py-2.5 border border-red/50 text-red transition-all duration-300 hover:text-white hover:border-red"
              >
                <span className="absolute inset-0 bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Book Now</span>
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-white" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} className="block w-4 h-px bg-red" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.3 }} className="block w-6 h-px bg-white" />
            </button>
          </div>

          <motion.div className="h-px bg-white/5" animate={{ opacity: scrolled ? 1 : 0 }} transition={{ duration: 0.3 }} />
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-end px-10 pb-16"
          >
            <span className="absolute top-24 right-8 font-bebas text-[120px] text-white/[0.03] leading-none select-none">
              MENU
            </span>

            <div className="flex flex-col gap-2 mb-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  onClick={() => setMenuOpen(false)}
                  className="font-bebas text-6xl tracking-widest text-white/80 hover:text-red transition-colors duration-300 leading-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-4"
            >
              <div className="w-12 h-px bg-red mb-2" />
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="font-condensed text-sm tracking-[0.4em] uppercase px-8 py-3 border border-red text-red hover:bg-red hover:text-white transition-all duration-300 self-start"
              >
                Book a Session
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}