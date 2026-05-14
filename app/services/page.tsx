"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Shared background ─────────────────────────────────────── */
const pageBg = `
  radial-gradient(ellipse 75% 40% at 100% 0%,   rgba(200,0,0,0.40) 0%, transparent 60%),
  radial-gradient(ellipse 55% 35% at 0%  60%,   rgba(170,0,0,0.28) 0%, transparent 55%),
  radial-gradient(ellipse 40% 30% at 50% 40%,   rgba(130,0,0,0.15) 0%, transparent 60%),
  radial-gradient(ellipse 30% 20% at 80% 80%,   rgba(120,0,0,0.18) 0%, transparent 50%),
  linear-gradient(170deg, #180000 0%, #060000 50%, #030000 100%)
`;

/* ─── Data ──────────────────────────────────────────────────── */
const services = [
  {
    id: "01",
    title: "Videography",
    tags: ["Narrative", "Brand Film", "Documentary", "Music Video"],
  },
  {
    id: "02",
    title: "Short-form Content",
    tags: ["Reels", "TikTok", "Shorts", "Social Media"],
  },
  {
    id: "03",
    title: "Commercial Shoots",
    tags: ["Product", "Lifestyle", "Campaign", "Brand Identity"],
  },
  {
    id: "04",
    title: "Event Coverage",
    tags: ["Launches", "Concerts", "Conferences"],
  },
  {
    id: "05",
    title: "Editing",
    tags: ["Color Grading", "Retouching", "Motion Graphics", "VFX"],
  },
];

/* ─── Char animation ────────────────────────────────────────── */
const charVariants: Variants = {
  hidden: { y: 110, opacity: 0, skewY: 6 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25 + i * 0.035,
    },
  }),
};

/* ─── Service Card ──────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href="/home" className="block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative group cursor-pointer"
      >
        {/* top border line */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: "1.5px", background: "rgba(255,255,255,0.12)" }}
        />
        {/* red sweep on hover */}
        <motion.div
          className="absolute top-0 left-0"
          style={{ height: "1.5px", background: "#CC0000" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* subtle red glow behind row on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(90deg, rgba(204,0,0,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[110px_1fr_280px_40px] items-start gap-6 lg:gap-10 py-10 lg:py-12 relative z-10">
          {/* index number */}
          <motion.span
            className="text-5xl lg:text-6xl leading-none select-none"
            animate={{ color: hovered ? "#FF1A1A" : "rgba(255,255,255,0.08)" }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {service.id}
          </motion.span>

          {/* title */}
          <div className="flex flex-col gap-2 pt-1">
            <motion.h3
              className="text-3xl lg:text-5xl xl:text-6xl text-white leading-none"
              animate={{ letterSpacing: hovered ? "0.08em" : "0.04em" }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {service.title}
            </motion.h3>
          </div>

          {/* tags */}
          <div className="hidden lg:flex flex-wrap gap-2 pt-2 self-center">
            {service.tags.map((tag, i) => (
              <motion.span
                key={tag}
                animate={{
                  opacity: hovered ? 1 : 0.3,
                  borderColor: hovered
                    ? "rgba(255,26,26,0.35)"
                    : "rgba(255,255,255,0.12)",
                }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border text-white/60"
                style={{ fontFamily: "var(--font-condensed)" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* arrow */}
          <motion.div
            className="hidden lg:flex items-center justify-end pt-2 self-center"
            animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0.2 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ color: "#FF1A1A", fontSize: "1.125rem" }}>→</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─── Hero ──────────────────────────────────────────────────── */
function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ourChars = "OUR".split("");
  const servicesChars = "SERVICES".split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] flex flex-col justify-end pb-20 pt-[72px] px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* scrolling watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden select-none"
        style={{ opacity: 0.025 }}
      >
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="leading-none tracking-widest text-white"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "18vw" }}
            >
              AHMED OSAMA ·{" "}
            </span>
          ))}
        </motion.div>
      </div>

      {/* left vertical red line */}
      <motion.div
        className="absolute left-8 md:left-16 lg:left-24 w-px"
        style={{
          top: "72px",
          height: "38%",
          background:
            "linear-gradient(to bottom, transparent, #CC0000, transparent)",
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.4 }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-6" style={{ background: "#CC0000" }} />
          <span
            className="text-[11px] tracking-[0.55em] uppercase"
            style={{
              fontFamily: "var(--font-condensed)",
              color: "rgba(204,0,0,0.75)",
            }}
          >
            What we do
          </span>
        </motion.div>

        {/* big title */}
        <div
          className="leading-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(68px, 13vw, 175px)",
          }}
        >
          <div className="overflow-hidden mb-1">
            {ourChars.map((c, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="show"
                className="inline-block text-white"
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {servicesChars.map((c, i) => (
              <motion.span
                key={i}
                custom={ourChars.length + i}
                variants={charVariants}
                initial="hidden"
                animate="show"
                className="inline-block"
                style={{ color: i < 3 ? "#CC0000" : "white" }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-sm max-w-md mt-8 leading-relaxed"
          style={{
            fontFamily: "var(--font-barlow)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Seven disciplines. One vision. Whether you need a single shot or a
          full production — every service is built around the story you want to
          tell.
        </motion.p>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 right-8 md:right-16 lg:right-24 flex flex-col items-center gap-2"
      >
        <span
          className="text-[9px] tracking-[0.5em] uppercase"
          style={{
            fontFamily: "var(--font-condensed)",
            color: "rgba(255,255,255,0.2)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(204,0,0,0.6), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "5", label: "Core Services" },
    { value: "3+", label: "Years Active" },
    { value: "200+", label: "Projects Done" },
    { value: "∞", label: "Creative Drive" },
  ];

  return (
    <section
      className="py-10 px-8 md:px-16 lg:px-24"
      style={{
        borderTop: "1.5px solid rgba(255,255,255,0.10)",
        borderBottom: "1.5px solid rgba(255,255,255,0.10)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="flex flex-col gap-1"
          >
            <span
              className="text-4xl md:text-5xl leading-none"
              style={{ fontFamily: "var(--font-bebas)", color: "#FF1A1A" }}
            >
              {s.value}
            </span>
            <span
              className="text-[10px] tracking-[0.5em] uppercase"
              style={{
                fontFamily: "var(--font-condensed)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Featured Shooting ─────────────────────────────────────── */
function FeaturedShooting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);

  return (
    <motion.section
      ref={ref}
      className="mx-4 md:mx-8 lg:mx-16 my-16 overflow-hidden"
      style={{
        scale,
        border: "1.5px solid rgba(255,255,255,0.09)",
      }}
    >
      <div
        className="relative p-12 md:p-20 lg:p-28"
        style={{
          background:
            "linear-gradient(135deg, rgba(204,0,0,0.10) 0%, rgba(20,0,0,0.6) 50%, rgba(5,0,0,0.8) 100%)",
        }}
      >
        {/* ambient glow */}
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.12), transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* bottom right secondary glow */}
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(160,0,0,0.09), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-[10px] tracking-[0.6em] uppercase"
              style={{
                fontFamily: "var(--font-condensed)",
                color: "rgba(204,0,0,0.7)",
              }}
            >
              Signature Service
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <span
              className="text-5xl"
              style={{
                fontFamily: "var(--font-bebas)",
                color: "rgba(255,255,255,0.06)",
              }}
            >
              07
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="leading-none mb-5"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(56px, 9vw, 144px)",
              letterSpacing: "0.06em",
            }}
          >
            <span className="text-white">SHOOT</span>
            <span style={{ color: "#CC0000" }}>ING</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase mb-8"
            style={{
              fontFamily: "var(--font-condensed)",
              color: "rgba(204,0,0,0.65)",
            }}
          >
            End-to-end. No compromises.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-12"
            style={{
              fontFamily: "var(--font-barlow)",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            End-to-end shooting services covering photography and video, focused
            on clean execution, strong visuals, and impactful storytelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {[
              "Photography",
              "Video",
              "Storytelling",
              "Full Production",
              "Art Direction",
              "Post-Production",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.4em] uppercase px-4 py-2 transition-all duration-300 cursor-default"
                style={{
                  fontFamily: "var(--font-condensed)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.38)",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "rgba(255,26,26,0.45)";
                  (e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.70)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.13)";
                  (e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.38)";
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────── */
function ServicesCTA() {
  return (
    <section
      className="py-32 px-8 md:px-16 lg:px-24"
      style={{ borderTop: "1.5px solid rgba(255,255,255,0.10)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12"
      >
        <div>
          <p
            className="text-[11px] tracking-[0.6em] uppercase mb-6"
            style={{
              fontFamily: "var(--font-condensed)",
              color: "#CC0000",
            }}
          >
            Ready to start ?
          </p>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-widest leading-none"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            LET&apos;S BUILD
            <br />
            <span style={{ color: "#CC0000" }}>SOMETHING</span>
            <br />
            TOGETHER.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-3">
          <a
            href="/contact"
            className="relative group inline-flex items-center gap-4 text-sm tracking-[0.4em] uppercase px-12 py-6 overflow-hidden text-white transition-all duration-500"
            style={{
              fontFamily: "var(--font-condensed)",
              border: "2px solid #CC0000",
            }}
          >
            {/* fill that sweeps away on hover */}
            <motion.span
              className="absolute inset-0"
              style={{ background: "#CC0000", originX: 0 }}
              initial={{ scaleX: 1 }}
              whileHover={{ scaleX: 0 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            />
            <span className="relative z-10 flex items-center gap-4">
              Contact Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </a>
          <span
            className="text-[9px] tracking-[0.5em] uppercase"
            style={{
              fontFamily: "var(--font-condensed)",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Feel free to ask
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main
        className="w-full min-h-screen overflow-x-hidden grain"
        style={{ background: pageBg }}
      >
        <ServicesHero />
        <StatsBar />

        {/* services list */}
        <section className="py-8 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
            {/* bottom border */}
            <div
              style={{
                height: "1.5px",
                background: "rgba(255,255,255,0.12)",
              }}
            />
          </div>
        </section>

        <FeaturedShooting />
        <ServicesCTA />
      </main>

      <Footer />
    </>
  );
}
