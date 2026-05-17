"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; // تم إضافة Variants هنا
import { useInView } from "react-intersection-observer";

// إضافة : Variants هنا هي الحل الجذري للمشكلة
const item = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay,
    },
  },
});
const LogoImage = () => (
  <motion.div
    className="relative overflow-hidden shrink-0"
    style={{ width: 200, height: 66 }}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.1 }}
  >
    <Image
      src="/images/black logo-02.png"
      alt="Ahmed Osama Production"
      fill
      className="object-contain"
      style={{
        transform: "scale(2.8) translateY(8%)",
        transformOrigin: "center center",
      }}
    />
  </motion.div>
);

// تم استخدام React.ReactNode هنا لحل مشكلة التوافق مع TypeScript
const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  TikTok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  ),
  Canva: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M17 12a5 5 0 1 1-5-5c1.5 0 2.8.6 3.8 1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
};

const navLinks = [
  { label: "Portfolio", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Questions", href: "/contact" },
  { label: "Vlogs", href: "/vlogs" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ahmedosamaa4?igsh=MWdwM2Ruc2htdzQ4dA%3D%3D&utm_source=qr",
    handle: "@ahmedosama",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1B6nUTQGwi/?mibextid=wwXIfr",
    handle: "/ahmedosama",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ahmedosamaa999?_r=1&_t=ZS-96RH3wu22q4",
    handle: "@ahmedosama",
  },
  {
    label: "Canva",
    href: "https://canva.link/vft5xt6wbdf3k0r",
    handle: "/ahmedosama",
  },
];

const contactItems = [
  { label: "Email", value: "midoosauk@gmail.com" },
  { label: "Phone", value: "+201227957008" },
  { label: "Based in", value: "Cairo, Egypt" },
  { label: "Available", value: "Worldwide" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const v = inView ? "show" : "hidden";

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1c1c1c" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(204,0,0,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1.5fr] gap-x-12 gap-y-16 justify-items-center text-center md:text-left">
          <div className="flex flex-col items-center gap-6">
            <motion.div variants={item(0)} initial="hidden" animate={v}>
              <LogoImage />
            </motion.div>

            <motion.div
              variants={item(0.12)}
              initial="hidden"
              animate={v}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-8 h-px bg-red-600 shrink-0" />
              <p
                className="text-[11px] tracking-[0.42em] uppercase text-white/30"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                Capture the moment · Feel the story
              </p>
              <div className="w-8 h-px bg-red-600 shrink-0" />
            </motion.div>

            <motion.p
              variants={item(0.24)}
              initial="hidden"
              animate={v}
              className="text-[15px] text-white/30 leading-relaxed max-w-[280px]"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Professional videography. Based in Cairo — available worldwide.
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-6 ml-12">
            <motion.p
              variants={item(0.18)}
              initial="hidden"
              animate={v}
              className="text-[11px] tracking-[0.5em] uppercase text-red-600"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Navigation
            </motion.p>

            <div className="flex flex-col items-center gap-4">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  variants={item(0.3 + i * 0.08)}
                  initial="hidden"
                  animate={v}
                >
                  <Link
                    href={l.href}
                    className="group flex items-center gap-3 text-[15px] text-white/40 hover:text-white transition-all duration-300"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    <span className="w-0 h-px bg-red-600 group-hover:w-6 transition-all duration-300 shrink-0" />
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.p
              variants={item(0.22)}
              initial="hidden"
              animate={v}
              className="text-[11px] tracking-[0.5em] uppercase text-red-600"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Follow
            </motion.p>

            <div className="flex flex-col items-start gap-5">
              {socialLinks.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={item(0.38 + i * 0.08)}
                  initial="hidden"
                  animate={v}
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-red-600 text-white/30 group-hover:text-white"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      {icons[s.label]}
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                      <span
                        className="text-[15px] text-white/40 group-hover:text-white transition-colors duration-300"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="text-[11px] text-white/20 group-hover:text-red-600/50 transition-colors duration-300 tracking-wider"
                        style={{ fontFamily: "var(--font-condensed)" }}
                      >
                        {s.handle}
                      </span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <motion.p
              variants={item(0.26)}
              initial="hidden"
              animate={v}
              className="text-[11px] tracking-[0.5em] uppercase text-red-600"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Contact
            </motion.p>

            <div className="flex flex-col w-full max-w-[280px]">
              {contactItems.map((c, i) => (
                <motion.div
                  key={c.label}
                  variants={item(0.46 + i * 0.08)}
                  initial="hidden"
                  animate={v}
                  className="flex items-center justify-between gap-5 py-4"
                  style={{ borderBottom: "1px solid #181818" }}
                >
                  <span
                    className="text-[11px] tracking-[0.35em] uppercase text-red-600/55"
                    style={{ fontFamily: "var(--font-condensed)" }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="text-[15px] text-white/45"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {c.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={item(0.8)}
          initial="hidden"
          animate={v}
          className="flex flex-col items-center justify-center gap-6 mt-24 pt-8"
          style={{ borderTop: "1px solid #181818" }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="w-2 h-2 rounded-full bg-red-600/50"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p
              className="text-[11px] tracking-[0.3em] text-white/20"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              Cairo, Egypt
            </p>
          </div>
          <p
            className="text-[11px] tracking-[0.3em] text-white/20 text-center"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            © {year} Ahmed Osama Production. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
