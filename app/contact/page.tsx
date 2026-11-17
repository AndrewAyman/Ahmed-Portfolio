"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Helpers ───────────────────────────────────────────────── */
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
const ease = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: false, amount: 0.3 } as const; // once:false => الأنيميشن يتعاد فوق وتحت

const inputCls =
  "w-full bg-transparent text-white text-base outline-none placeholder:text-white/[0.28] py-3 caret-red font-barlow font-medium";

/* ─── Animated label ────────────────────────────────────────────
   عربي: الحروف المتصلة لو اتقسمت بتتفكك، فالـ "type" بيتعمل بمسح
   خطوة خطوة (زي الكتابة)، والباقي بيتحرك كلمة كلمة.
   إنجليزي: كل حرف لوحده.                                          */
type LabelMode = "type" | "drop" | "side" | "rise";

const letterV: Record<LabelMode, Variants> = {
  type: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } },
  drop: {
    hidden: { opacity: 0, y: -26, rotate: -10 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 18 } },
  },
  side: { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } },
  rise: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

function Label({
  text,
  mode,
  className = "",
  style,
}: {
  text: string;
  mode: LabelMode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const arabic = isArabic(text);

  if (arabic && mode === "type") {
    const n = text.length;
    return (
      <motion.span
        aria-label={text}
        className={`inline-block ${className}`}
        style={{ direction: "rtl", ...style }}
        variants={{
          hidden: { clipPath: "inset(0 0 0 100%)" },
          show: {
            clipPath: "inset(0 0 0 0%)",
            transition: { duration: Math.max(0.7, n * 0.06), ease: (t: number) => Math.floor(t * n) / n },
          },
        }}
      >
        {text}
      </motion.span>
    );
  }

  const parts = arabic ? text.split(" ") : text.split("");
  return (
    <motion.span
      aria-label={text}
      className={`inline-flex flex-wrap ${arabic ? "gap-x-[0.3em]" : ""} ${className}`}
      style={{ direction: arabic ? "rtl" : "ltr", ...style }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: arabic ? 0.12 : 0.035 } } }}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={letterV[mode]}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {p === " " ? "\u00A0" : p}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Field (form inputs) ───────────────────────────────────── */
function Field({
  label,
  required,
  name,
  focused,
  value,
  children,
}: {
  label: string;
  required?: boolean;
  name: string;
  focused: string | null;
  value?: string;
  children: React.ReactNode;
}) {
  const isActive = focused === name || (value !== undefined && value.length > 0);
  return (
    <div className="relative pb-px">
      <label
        className="block mb-3 font-condensed font-semibold text-[14px] uppercase tracking-[0.5em] transition-colors duration-300"
        style={{ color: isActive ? "#FF1A1A" : "rgba(255,255,255,0.9)" }}
      >
        {label}
        {required && <span style={{ color: "#CC0000" }} className="ml-1">*</span>}
      </label>
      {children}
      <div className="right-0 bottom-0 left-0 absolute bg-white/40 h-[1.5px]" />
      <motion.div
        className="bottom-0 left-0 absolute bg-red h-[2px]"
        animate={{ width: focused === name ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Textarea with animated underline ──────────────────────── */
function Area({
  name,
  rows,
  value,
  onChange,
  placeholder,
  focused,
  setFocused,
}: {
  name: string;
  rows: number;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  focused: string | null;
  setFocused: (v: string | null) => void;
}) {
  return (
    <div className="relative mt-1 pb-px">
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        className={`${inputCls} resize-none text-sm placeholder:text-sm`}
        style={{ direction: "rtl", letterSpacing: "0" }}
      />
      <div className="right-0 bottom-0 left-0 absolute bg-white/35 h-[1.5px]" />
      <motion.div
        className="bottom-0 left-0 absolute bg-red h-[2px]"
        animate={{ width: focused === name ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── Quiz option ───────────────────────────────────────────── */
type OptDir = "up" | "left" | "right" | "spin";
const optV: Record<OptDir, Variants> = {
  up: { hidden: { opacity: 0, y: 26, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
  spin: { hidden: { opacity: 0, rotate: -14, scale: 0.8 }, show: { opacity: 1, rotate: 0, scale: 1 } },
};

function QuizOption({
  label,
  icon,
  selected,
  onClick,
  dir = "up",
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  dir?: OptDir;
}) {
  const arabic = isArabic(label);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={optV[dir]}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-5 py-4 border font-condensed font-semibold text-left uppercase transition-colors duration-300"
      style={{
        borderColor: selected ? "#FF1A1A" : "rgba(255,255,255,0.3)",
        color: selected ? "#fff" : "rgba(255,255,255,0.75)",
        background: selected ? "rgba(204,0,0,0.22)" : "rgba(0,0,0,0.35)",
        letterSpacing: arabic ? "0" : "0.25em",
        direction: arabic ? "rtl" : "ltr",
        fontFamily: arabic ? "var(--font-barlow)" : undefined,
        fontSize: arabic ? "16px" : "13px",
      }}
    >
      {icon && (
        <span
          className="text-lg transition-colors duration-300"
          style={{ color: selected ? "#FF1A1A" : "rgba(255,255,255,0.45)" }}
        >
          {icon}
        </span>
      )}
      {label}
      {selected && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-auto text-sm"
          style={{ color: "#FF1A1A" }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─── Scene: كل سؤال له أنيميشن دخول مختلف ─────────────────── */
type Anim = "slide" | "drop" | "flip" | "zoom" | "blur";

function sceneVariants(anim: Anim, left: boolean): Variants {
  const map: Record<Anim, { hidden: object; show: object }> = {
    slide: { hidden: { opacity: 0, x: left ? -150 : 150 }, show: { opacity: 1, x: 0 } },
    drop: { hidden: { opacity: 0, y: -90 }, show: { opacity: 1, y: 0 } },
    flip: {
      hidden: { opacity: 0, rotateX: -80, transformPerspective: 900 },
      show: { opacity: 1, rotateX: 0, transformPerspective: 900 },
    },
    zoom: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
    blur: { hidden: { opacity: 0, y: 50, filter: "blur(18px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
  };
  return {
    hidden: { ...map[anim].hidden, transition: { duration: 0.3 } },
    show: {
      ...map[anim].show,
      transition: { duration: 0.8, ease, staggerChildren: 0.09, delayChildren: 0.25 },
    },
  };
}

function Scene({
  n,
  side,
  anim,
  mode,
  label,
  sublabel,
  children,
}: {
  n: number;
  side: "left" | "right" | "center";
  anim: Anim;
  mode: LabelMode;
  label: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  const left = side === "left";
  const center = side === "center";
  const arabic = isArabic(label);

  const wrap = center
    ? "pl-10 md:pl-0"
    : left
      ? "pl-10 md:pl-0 md:w-1/2 md:pr-14"
      : "pl-10 md:w-1/2 md:ml-auto md:pl-14";

  const dot = center
    ? "left-4 md:left-1/2 -translate-x-1/2"
    : left
      ? "left-4 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-1/2"
      : "left-4 md:left-0 -translate-x-1/2";

  return (
    <div className={`relative ${wrap}`}>
      {/* node على الخط */}
      <span
        className={`absolute top-8 z-20 w-3 h-3 rotate-45 bg-red ${dot}`}
        style={{ boxShadow: "0 0 18px rgba(255,26,26,0.8)" }}
      />
      <motion.div
        variants={sceneVariants(anim, left)}
        initial="hidden"
        whileInView="show"
        viewport={VIEW}
        className={`relative p-6 md:p-8 bg-black/45 backdrop-blur-[3px] border border-white/10 ${
          center ? "md:max-w-4xl md:mx-auto" : ""
        }`}
      >
        {/* الشريط الأحمر ناحية الخط */}
        <span
          className={`absolute top-0 h-full w-[2px] bg-red ${
            left ? "left-0 md:left-auto md:right-0" : "left-0"
          }`}
        />
        {/* رقم شبحي كبير */}
        <span
          aria-hidden
          className="-top-9 right-3 absolute font-bebas text-[110px] text-transparent md:text-[150px] leading-none pointer-events-none select-none"
          style={{ WebkitTextStroke: "1px rgba(255,40,40,0.35)" }}
        >
          {String(n).padStart(2, "0")}
        </span>

        <div className="z-10 relative flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="flex justify-center items-center rounded-full w-7 h-7 font-bebas font-bold text-[13px] shrink-0"
              style={{
                border: "1.5px solid rgba(255,26,26,0.7)",
                color: "#FF1A1A",
                background: "rgba(204,0,0,0.15)",
              }}
            >
              {n}
            </span>
            <Label
              text={label}
              mode={mode}
              className="font-condensed font-semibold text-white/90 uppercase"
              style={{
                letterSpacing: arabic ? "0" : "0.4em",
                fontFamily: arabic ? "var(--font-barlow)" : undefined,
                fontSize: arabic ? "18px" : "15px",
              }}
            />
            {sublabel && (
              <span
                className="font-barlow font-medium text-white/40 text-sm"
                style={{ direction: isArabic(sublabel) ? "rtl" : "ltr" }}
              >
                ({sublabel})
              </span>
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────── */
const roles = [
  { id: "doctor", label: "دكتور", icon: "✚" },
  { id: "coach", label: "كوتش", icon: "◈" },
  { id: "creator", label: "صاحب كونتينت", icon: "◐" },
];

const coachTypes = [
  { id: "content", label: "كونتنت", icon: "◎" },
  { id: "motivation", label: "موتيفيشن", icon: "✦" },
  { id: "storytelling", label: "ستوري تيلينج", icon: "◉" },
];

/* ─── Briefs Types & Data ──────────────────────────────────────
   ملاحظة: يمكنك وضع أي عدد من لينكات الفيديوهات لكل بريف
   الصيغ المدعومة:
   - روابط يوتيوب عادية: https://www.youtube.com/watch?v=...
   - روابط يوتيوب مختصرة: https://youtu.be/...
   - يوتيوب شورتس: https://www.youtube.com/shorts/...
   - ريلز إنستجرام: https://www.instagram.com/reel/...
   - أو أي رابط خارجي آخر.
   يمكنك كتابة اللينكات كمصفوفة روابط مباشرة أو مع عناوين مخصصة لكل فيديو.
─────────────────────────────────────────────────────────────── */
export type BriefVideoItem = {
  title?: string;
  url: string;
};

export type BriefItem = {
  id: string;
  label: string;
  desc: string;
  videos: (string | BriefVideoItem)[];
};

const briefs: BriefItem[] = [
  {
    id: "brief1",
    label: "بريف ١",
    desc: "ريلز سريعة وحماسية",
    videos: [
      {
        title: "فيديو 1 - Storytelling",
        url: "https://www.instagram.com/reel/Dc6pBoZITge/?cplk=MTA1NmNvaGNqbjB0Mw%3D%3D",
      },
      {
        title: "فيديو 2",
        url: "https://www.instagram.com/reel/DcUS10NNpy0/?obrf=eTV1YTdhejBvano5",
      },
    ],
  },
  {
    id: "brief2",
    label: "بريف ٢",
    desc: "تصوير سينمائي هادي",
    videos: [
      {
        title: "فيديو 1",
        url: "https://www.instagram.com/reel/DdG02zgMQpg/?cplk=dHl0ZW90Z2lvb2Ux",
      },
      {
        title: "فيديو 2",
        url: "https://www.instagram.com/reel/DaqmDBfOEDb/?psln=MWdvd3BrZXgzMnZ1Mg%3D%3D",
      },
    ],
  },
  {
    id: "brief3",
    label: "بريف ٣",
    desc: "محتوى تعليمي مبسط",
    videos: [
      {
        title: "فيديو 1 - تعليمي",
        url: "https://www.instagram.com/reel/DVB_j6tiEID/?xtok=MWs1eXE0dHNyeHhobg%3D%3D",
      },
      {
        title: "فيديو 2",
        url: "https://www.instagram.com/reel/Da27xlEjvpb/?exln=bmM4bG93azF3Ymtm",
      },
    ],
  },
];

/* تحويل الفيديوهات إلى صيغة موحدة */
function normalizeBriefVideos(
  videos?: (string | BriefVideoItem)[]
): { title: string; url: string }[] {
  if (!videos || !Array.isArray(videos)) return [];
  return videos.map((v, i) => {
    if (typeof v === "string") {
      return { title: `فيديو ${i + 1}`, url: v };
    }
    return { title: v.title || `فيديو ${i + 1}`, url: v.url };
  });
}

/* استخراج رابط التضمين المناسب لليوتيوب وإنستجرام */
function parseVideoEmbed(url: string) {
  if (!url) return { type: "unknown", embedUrl: "" };

  const trimmed = url.trim();

  // لو ID يوتيوب مباشر (11 حرف)
  if (/^[\w-]{11}$/.test(trimmed)) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${trimmed}?autoplay=1&rel=0`,
    };
  }

  // روابط يوتيوب بجميع أشكالها
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // روابط إنستجرام ريلز
  const igMatch = trimmed.match(/instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    return {
      type: "instagram",
      embedUrl: `https://www.instagram.com/reel/${igMatch[1]}/embed`,
    };
  }

  return {
    type: "external",
    embedUrl: trimmed,
  };
}

/* ─── Brief card (بتدخل متروّحة، كل كارت بزاوية) ──────────── */
function BriefCard({
  i,
  label,
  desc,
  videosCount,
  selected,
  onClick,
  onWatch,
}: {
  i: number;
  label: string;
  desc: string;
  videosCount: number;
  selected: boolean;
  onClick: () => void;
  onWatch: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 90, rotate: i % 2 ? 8 : -8, scale: 0.85 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 140, damping: 16, delay: i * 0.12 },
        },
      }}
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col gap-3 backdrop-blur-sm p-5 border transition-colors duration-300 cursor-pointer"
      style={{
        borderColor: selected ? "#FF1A1A" : "rgba(255,255,255,0.3)",
        background: selected ? "rgba(204,0,0,0.25)" : "rgba(0,0,0,0.55)",
        direction: "rtl",
      }}
    >
      <div className="flex justify-between items-center">
        <span
          className="font-barlow font-semibold text-base"
          style={{ color: selected ? "#fff" : "rgba(255,255,255,0.85)" }}
        >
          {label}
        </span>
        {selected && <span style={{ color: "#FF1A1A" }}>✓</span>}
      </div>
      <p className="font-barlow font-medium text-white/55 text-sm">{desc}</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onWatch();
        }}
        className="flex items-center gap-1.5 w-fit font-condensed font-semibold text-[11px] text-red hover:text-white uppercase tracking-[0.35em] transition-colors cursor-pointer"
        style={{ direction: "ltr", textAlign: "right" }}
      >
        <span>Watch {videosCount > 1 ? `(${videosCount})` : ""} →</span>
      </button>
    </motion.div>
  );
}

/* ─── نافذة عرض فيديوهات البريف المنبثقة (Modal) ─────────────── */
function BriefVideosModal({
  briefData,
  onClose,
}: {
  briefData: {
    label: string;
    desc: string;
    videos: { title: string; url: string }[];
  };
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const currentVideo = briefData.videos[activeIndex] || briefData.videos[0];
  const videoParsed = currentVideo ? parseVideoEmbed(currentVideo.url) : null;

  return (
    <AnimatePresence>
      <motion.div
        className="z-50 fixed inset-0 flex justify-center items-center p-3 sm:p-5 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          className="relative flex flex-col bg-[#090101] shadow-[0_0_50px_rgba(204,0,0,0.3)] border border-red-600/40 rounded-lg w-full max-w-4xl max-h-[92vh] overflow-hidden"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ direction: "rtl" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-black/60 px-5 py-4 border-white/10 border-b">
            <div className="flex items-center gap-3">
              <span className="flex justify-center items-center bg-red-600 rounded-full w-2.5 h-2.5 animate-pulse" />
              <div>
                <h3 className="font-barlow font-bold text-white text-base sm:text-lg">
                  {briefData.label} — <span className="font-normal text-white/60">{briefData.desc}</span>
                </h3>
                <p className="mt-0.5 font-barlow text-white/40 text-xs">
                  معاينة الفيديوهات ({activeIndex + 1} من {briefData.videos.length})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="hover:bg-red-600/10 px-3 py-1.5 border border-white/15 hover:border-red-600 rounded text-white/70 hover:text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              ✕ إغلاق
            </button>
          </div>

          {/* Main Video View Area */}
          <div className="flex flex-col flex-1 gap-4 p-4 sm:p-6 overflow-y-auto">
            {/* Player Container */}
            <div className="relative flex justify-center items-center bg-black border border-white/10 rounded w-full aspect-video overflow-hidden">
              {videoParsed?.type === "youtube" ? (
                <iframe
                  key={videoParsed.embedUrl}
                  src={videoParsed.embedUrl}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0 w-full h-full"
                />
              ) : videoParsed?.type === "instagram" ? (
                <div className="flex flex-col justify-center items-center bg-black/80 p-2 w-full h-full">
                  <iframe
                    key={videoParsed.embedUrl}
                    src={videoParsed.embedUrl}
                    title={currentVideo.title}
                    className="border-0 rounded w-full max-w-[340px] h-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-4 p-6 text-center">
                  <span className="text-red-600 text-4xl">▶</span>
                  <p className="font-medium text-white text-sm">{currentVideo?.title || "فيديو المعاينة"}</p>
                  <a
                    href={currentVideo?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    فتح رابط الفيديو ↗
                  </a>
                </div>
              )}
            </div>

            {/* Video Controls & Playlist Switcher */}
            {briefData.videos.length > 1 && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-barlow text-white/50 text-xs">
                    اختر الفيديو للمشاهدة:
                  </span>

                  {/* Prev / Next buttons */}
                  <div className="flex items-center gap-2" style={{ direction: "ltr" }}>
                    <button
                      type="button"
                      disabled={activeIndex === 0}
                      onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                      className="disabled:opacity-30 px-2.5 py-1 border border-white/15 hover:border-red-600 rounded text-white/70 hover:text-white text-xs transition-all cursor-pointer disabled:pointer-events-none"
                    >
                      ← السابق
                    </button>
                    <button
                      type="button"
                      disabled={activeIndex === briefData.videos.length - 1}
                      onClick={() => setActiveIndex((prev) => Math.min(briefData.videos.length - 1, prev + 1))}
                      className="disabled:opacity-30 px-2.5 py-1 border border-white/15 hover:border-red-600 rounded text-white/70 hover:text-white text-xs transition-all cursor-pointer disabled:pointer-events-none"
                    >
                      التالي →
                    </button>
                  </div>
                </div>

                {/* Playlist Tabs / Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {briefData.videos.map((vid, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all cursor-pointer ${
                        activeIndex === idx
                          ? "border border-red-600 bg-red-600/20 text-white shadow-[0_0_15px_rgba(204,0,0,0.3)]"
                          : "border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span className={activeIndex === idx ? "text-red-500 font-bold" : "text-white/40"}>
                        {activeIndex === idx ? "●" : "○"}
                      </span>
                      <span>{vid.title || `فيديو ${idx + 1}`}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Link button at bottom */}
            {currentVideo?.url && (
              <div className="flex justify-end pt-2 border-white/5 border-t">
                <a
                  href={currentVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white/40 hover:text-red-500 text-xs transition-colors"
                >
                  <span>مشاهدة الفيديو على المنصة الأصلية</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── WhatsApp Section ───────────────────────────────────────── */
function WhatsAppSection() {
  return (
    <section className="z-10 relative flex flex-col justify-center items-center gap-5 pt-6 pb-16">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-semibold text-[12px] text-white uppercase tracking-[0.55em]"
        style={{ fontFamily: "var(--font-condensed)" }}
      >
        connect to whatsApp
      </motion.p>

      <motion.a
        href="https://wa.me/201227957008"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.15 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex justify-center items-center rounded-full w-20 h-20"
          style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(37,211,102,0.4)" }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(37,211,102,0.3)" }}
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "" });

  const [role, setRole] = useState("");
  const [coachType, setCoachType] = useState("");
  const [shootGoal, setShootGoal] = useState("");
  const [badExperience, setBadExperience] = useState<"yes" | "no" | "">("");
  const [badExpDetail, setBadExpDetail] = useState("");
  const [hasScript, setHasScript] = useState<"yes" | "no" | "">("");
  const [brief, setBrief] = useState("");
  const [customBrief, setCustomBrief] = useState("");
  const [activeBriefVideos, setActiveBriefVideos] = useState<{
    label: string;
    desc: string;
    videos: { title: string; url: string }[];
  } | null>(null);

  const isCoach = role === "coach";

  /* ترقيم ديناميكي (سؤال الكوتش بيظهر ويختفي) + الجانب بيتبدل حسب الرقم */
  const num = {
    role: 1,
    coach: 2,
    goal: isCoach ? 3 : 2,
    bad: isCoach ? 4 : 3,
    script: isCoach ? 5 : 4,
    brief: isCoach ? 6 : 5,
  };
  const sideOf = (n: number) => (n % 2 ? "left" : "right") as "left" | "right";

  /* Parallax للخلفية + خط التقدم */
  const { scrollYProgress: pageProgress } = useScroll();
  const img1Y = useTransform(pageProgress, [0, 1], ["0px", "-90px"]);
  const img2Y = useTransform(pageProgress, [0, 1], ["0px", "90px"]);

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 60%", "end 70%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRoleChange = (id: string) => {
    setRole(id);
    if (id !== "coach") setCoachType("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedBrief =
        brief === "custom"
          ? `Custom — ${customBrief}`
          : briefs.find((b) => b.id === brief)?.label || "";

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          to_email: "midoosauk@gmail.com",
          subject: `[RED EDE] ${form.subject} — ${form.name}`,
          from_name: form.name,
          reply_to: form.email,
          phone: form.phone,
          client_role: roles.find((r) => r.id === role)?.label || "",
          coach_type: coachTypes.find((c) => c.id === coachType)?.label || "-",
          shoot_goal: shootGoal,
          bad_experience: badExperience === "yes" ? `Yes — ${badExpDetail}` : "No",
          has_script: hasScript,
          selected_brief: selectedBrief,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", subject: "" });
        setRole("");
        setCoachType("");
        setShootGoal("");
        setBadExperience("");
        setBadExpDetail("");
        setHasScript("");
        setBrief("");
        setCustomBrief("");
        setActiveBriefVideos(null);
      } else throw new Error();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {/* clipPath بيمنع الخلفية الثابتة تغطي الفوتر */}
      <div className="relative" style={{ background: "#030000", clipPath: "inset(0)" }}>
        {/* ── Background images (ثابتة + parallax، واضحة أكتر) ── */}
        <div className="z-0 fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="-top-20 right-0 absolute w-full md:w-[60%] h-[60vh] md:h-[85vh]"
            style={{
              y: img1Y,
              backgroundImage: "url('/images/1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.75,
              filter: "contrast(1.05) saturate(0.95)",
              maskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
            }}
          />
          <motion.div
            className="-bottom-20 left-0 absolute w-full md:w-[60%] h-[60vh] md:h-[85vh]"
            style={{
              y: img2Y,
              backgroundImage: "url('/images/2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
              filter: "contrast(1.05) saturate(0.95)",
              maskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 85%)",
            }}
          />
          {/* أحمر خفيف بس + تغميق بسيط */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 100% 0%, rgba(200,0,0,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 50% 35% at 0% 100%, rgba(170,0,0,0.14) 0%, transparent 60%),
                linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.45) 100%)
              `,
            }}
          />
        </div>

        <main className="z-10 relative pt-20 md:pt-[100px] min-h-screen grain" style={{ background: "transparent" }}>
          <div className="mx-auto px-4 sm:px-8 md:px-12 py-10 max-w-6xl">
            {/* ══ HERO ══ */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10 md:mb-14"
            >
              <div className="bg-red w-8 h-px" />
              <span className="font-condensed font-semibold text-[13px] text-red uppercase tracking-[0.6em]">
                Get In <span className="text-red-600">Touch</span>
              </span>
            </motion.div>

            <div className="items-end gap-10 md:gap-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] mb-24 md:mb-32">
              <div>
                <motion.h1
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
                  className="mb-6 font-bebas font-bold leading-[0.92]"
                  style={{ fontSize: "clamp(56px, 8vw, 110px)", letterSpacing: "0.04em" }}
                >
                  <span className="block text-white">
                    <Label text="Lets" mode="drop" />
                  </span>
                  <span className="block text-red-700">
                    <Label text="Connect" mode="drop" />
                  </span>
                </motion.h1>
                <p className="max-w-md font-barlow font-medium text-white/70 text-base leading-relaxed">
                  Have a vision or an idea? Fill in the form and I will get back to you within 24 hours. Every
                  great photo starts with a conversation.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-[3px] px-6 border border-white/10"
              >
                {[
                  { label: "Phone", value: "+201227957008" },
                  { label: "Based in", value: "Cairo, Egypt" },
                  { label: "Available", value: "Worldwide" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-6 py-5 border-white/20 border-b last:border-b-0">
                    <span className="w-24 font-condensed font-semibold text-[12px] text-red/90 uppercase tracking-[0.45em] shrink-0">
                      {item.label}
                    </span>
                    <span className="font-barlow font-medium text-white/80 text-base">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col justify-center items-center gap-8 py-24 text-center"
                >
                  <div className="relative w-20 h-20">
                    <motion.div
                      className="absolute inset-0 border-2 border-red rotate-45"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(204,0,0,0.3)",
                          "0 0 50px rgba(204,0,0,0.6)",
                          "0 0 20px rgba(204,0,0,0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center">
                      <span className="font-bold text-red text-2xl">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-bebas font-bold text-white text-5xl md:text-6xl tracking-widest">
                      Message Sent!
                    </h3>
                    <p className="max-w-sm font-barlow font-medium text-white/60 text-base leading-relaxed">
                      We have received your message and will be in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="px-8 py-3 border border-red/30 hover:border-red font-condensed font-semibold text-white/60 hover:text-white text-xs uppercase tracking-[0.5em] transition-all duration-300"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="content" exit={{ opacity: 0 }}>
                  {/* ══ ZIGZAG QUIZ ══ */}
                  <div ref={trackRef} className="relative flex flex-col gap-20 md:gap-28 pb-24">
                    {/* الخط الأساسي */}
                    <div className="top-0 bottom-0 left-4 md:left-1/2 absolute bg-white/15 w-px -translate-x-1/2" />
                    <motion.div
                      className="top-0 bottom-0 left-4 md:left-1/2 absolute w-[2px]"
                      style={{
                        x: "-50%",
                        scaleY: lineScale,
                        originY: 0,
                        background: "linear-gradient(to bottom, #CC0000, #FF1A1A)",
                        boxShadow: "0 0 14px rgba(255,26,26,0.6)",
                      }}
                    />

                    {/* 1 — Role */}
                    <Scene n={num.role} side={sideOf(num.role)} anim="blur" mode="type" label="انت مين؟">
                      <div className="flex flex-wrap gap-2">
                        {roles.map((r) => (
                          <QuizOption
                            key={r.id}
                            label={r.label}
                            icon={r.icon}
                            dir="up"
                            selected={role === r.id}
                            onClick={() => handleRoleChange(r.id)}
                          />
                        ))}
                      </div>
                    </Scene>

                    {/* 2 — Coach type (كوتش بس) */}
                    <AnimatePresence>
                      {isCoach && (
                        <motion.div
                          key="coach-type"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="-mx-8 -my-2 px-8 py-2 overflow-hidden"
                        >
                          <Scene
                            n={num.coach}
                            side={sideOf(num.coach)}
                            anim="slide"
                            mode="side"
                            label="بتقدم ايه كـ كوتش؟"
                          >
                            <div className="flex flex-wrap gap-2">
                              {coachTypes.map((c) => (
                                <QuizOption
                                  key={c.id}
                                  label={c.label}
                                  icon={c.icon}
                                  dir={sideOf(num.coach) === "left" ? "left" : "right"}
                                  selected={coachType === c.id}
                                  onClick={() => setCoachType(c.id)}
                                />
                              ))}
                            </div>
                          </Scene>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 3 — Goal */}
                    <Scene n={num.goal} side={sideOf(num.goal)} anim="drop" mode="drop" label="هدفك ايه من التصوير؟">
                      <Area
                        name="shootGoal"
                        rows={3}
                        value={shootGoal}
                        onChange={setShootGoal}
                        placeholder="مثلاً: كامبين لمنتج جديد، محتوى لسوشيال ميديا..."
                        focused={focused}
                        setFocused={setFocused}
                      />
                    </Scene>

                    {/* 4 — Bad experience */}
                    <Scene
                      n={num.bad}
                      side={sideOf(num.bad)}
                      anim="flip"
                      mode="rise"
                      label="حصل حاجة ضايقتك قبل كده فى التصوير؟"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          <QuizOption
                            label="أيوه، حصل"
                            icon="◈"
                            dir="spin"
                            selected={badExperience === "yes"}
                            onClick={() => setBadExperience("yes")}
                          />
                          <QuizOption
                            label="لأ، أول مرة"
                            icon="◎"
                            dir="spin"
                            selected={badExperience === "no"}
                            onClick={() => setBadExperience("no")}
                          />
                        </div>
                        <AnimatePresence>
                          {badExperience === "yes" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35 }}
                              className="overflow-hidden"
                            >
                              <Area
                                name="badExp"
                                rows={2}
                                value={badExpDetail}
                                onChange={setBadExpDetail}
                                placeholder="قولي ايه اللي حصل..."
                                focused={focused}
                                setFocused={setFocused}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Scene>

                    {/* 5 — Script */}
                    <Scene
                      n={num.script}
                      side={sideOf(num.script)}
                      anim="zoom"
                      mode="type"
                      label="عندك اسكريبت جاهز؟"
                      sublabel="ولا نشتغل مع بعض"
                    >
                      <div className="flex flex-wrap gap-2">
                        <QuizOption
                          label="أيوه، جاهز"
                          icon="✦"
                          dir="up"
                          selected={hasScript === "yes"}
                          onClick={() => setHasScript("yes")}
                        />
                        <QuizOption
                          label="ساعدني نعمل حاجة"
                          icon="◐"
                          dir="up"
                          selected={hasScript === "no"}
                          onClick={() => setHasScript("no")}
                        />
                      </div>
                    </Scene>

                    {/* 6 — Brief (مشترك، في النص، آخر سؤال) */}
                    <Scene
                      n={num.brief}
                      side="center"
                      anim="blur"
                      mode="side"
                      label="اختار أقرب بريف ليك"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-3">
                          {briefs.map((b, i) => {
                            const normalized = normalizeBriefVideos(b.videos);
                            return (
                              <BriefCard
                                key={b.id}
                                i={i}
                                label={b.label}
                                desc={b.desc}
                                videosCount={normalized.length}
                                selected={brief === b.id}
                                onClick={() => setBrief(b.id)}
                                onWatch={() =>
                                  setActiveBriefVideos({
                                    label: b.label,
                                    desc: b.desc,
                                    videos: normalized,
                                  })
                                }
                              />
                            );
                          })}
                        </div>

                        <div>
                          <QuizOption
                            label="customize — عايز حاجة مختلفة"
                            icon="✎"
                            dir="up"
                            selected={brief === "custom"}
                            onClick={() => setBrief("custom")}
                          />
                        </div>

                        <AnimatePresence>
                          {brief === "custom" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.35 }}
                              className="overflow-hidden"
                            >
                              <Area
                                name="customBrief"
                                rows={3}
                                value={customBrief}
                                onChange={setCustomBrief}
                                placeholder="وصفلنا فكرتك بالتفصيل..."
                                focused={focused}
                                setFocused={setFocused}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Scene>
                  </div>

                  {/* ══ DETAILS FORM ══ */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 70, transition: { duration: 0.3 } },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, staggerChildren: 0.05 } },
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEW}
                    className="bg-black/50 backdrop-blur-[3px] mx-auto p-6 md:p-10 border border-white/10 border-t-2 border-t-red max-w-2xl"
                  >
                    <div className="mb-10 text-center">
                      <Label
                        text="Your Details"
                        mode="drop"
                        className="justify-center font-condensed font-semibold text-[13px] text-white/80 uppercase"
                        style={{ letterSpacing: "0.6em" }}
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                      <Field label="Full Name" required name="name" focused={focused} value={form.name}>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          className={inputCls}
                        />
                      </Field>

                      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
                        <Field label="Email" required name="email" focused={focused} value={form.email}>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Phone" name="phone" focused={focused} value={form.phone}>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+20 ..."
                            onFocus={() => setFocused("phone")}
                            onBlur={() => setFocused(null)}
                            className={inputCls}
                          />
                        </Field>
                      </div>

                      <Field label="Subject" required name="subject" focused={focused} value={form.subject}>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          className={inputCls}
                        />
                      </Field>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? "hover" : undefined}
                        whileTap={!loading ? { scale: 0.98 } : undefined}
                        className="group relative disabled:opacity-30 py-5 border border-red w-full overflow-hidden font-condensed font-semibold text-white text-sm uppercase tracking-[0.5em] transition-colors duration-500 disabled:cursor-not-allowed"
                      >
                        {!loading && (
                          <motion.span
                            className="absolute inset-0 bg-red"
                            initial={{ scaleX: 1, originX: 0 }}
                            variants={{ hover: { scaleX: 0 } }}
                            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                          />
                        )}
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="z-10 relative flex justify-center items-center gap-3 text-red"
                            >
                              <motion.span
                                className="border border-red/40 border-t-red rounded-full w-4 h-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                              Sending…
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="z-10 relative flex justify-center items-center gap-4"
                            >
                              Send Message
                              <motion.span variants={{ hover: { x: 6 } }} transition={{ duration: 0.25 }}>
                                →
                              </motion.span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <p className="font-condensed font-semibold text-[11px] text-white/40 text-center uppercase tracking-[0.5em]">
                        We respond within 24 hours
                      </p>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        <WhatsAppSection />
      </div>
      {activeBriefVideos && (
        <BriefVideosModal
          briefData={activeBriefVideos}
          onClose={() => setActiveBriefVideos(null)}
        />
      )}
      <Footer />
    </MotionConfig>
  );
}