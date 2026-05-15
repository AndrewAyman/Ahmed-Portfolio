"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoGateProps {
  onComplete: () => void;
}

export default function VideoGate({ onComplete }: VideoGateProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAllowedRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });

    const handleTimeUpdate = () => {
      if (video.duration) {
        lastAllowedRef.current = video.currentTime;
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const handleSeeking = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > lastAllowedRef.current + 0.5) {
      video.currentTime = lastAllowedRef.current;
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
    resetHideTimer();
  };

  const rewind5 = () => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.max(0, video.currentTime - 5);
    video.currentTime = newTime;
    lastAllowedRef.current = newTime;
    resetHideTimer();
  };

  const forward5 = () => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.min(video.duration, video.currentTime + 5);
    video.currentTime = newTime;
    lastAllowedRef.current = newTime;
    resetHideTimer();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetHideTimer();
  };

  const formatTime = (pct: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return "0:00";
    const s = Math.floor((pct / 100) * video.duration);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #3a0000 0%, #1a0000 60%, #0a0000 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Modern animated background effects - Red dominant */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main ambient red glow - More dominant */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(204,0,0,0.45) 0%, rgba(204,0,0,0.2) 30%, rgba(139,0,0,0.08) 70%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary red glow pulse - Strong */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(204,0,0,0.35) 0%, rgba(139,0,0,0.15) 40%, transparent 80%)",
            filter: "blur(50px)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Third red layer for more dominance */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(204,0,0,0.3) 0%, rgba(139,0,0,0.1) 50%, transparent 100%)",
            filter: "blur(55px)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Animated particles - Red tinted */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(204, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${0.2 + Math.random() * 0.3})`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating red orbs - Enhanced */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.25) 0%, rgba(139,0,0,0.1) 50%, transparent 80%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(204,0,0,0.22) 0%, rgba(139,0,0,0.08) 50%, transparent 80%)",
            filter: "blur(45px)",
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, -35, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional red aura */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 60%)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* subtle grid overlay - darker for red theme */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(204,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 text-center relative z-10"
      >
        <p
          className="text-base tracking-[0.4em] text-red-600 uppercase mb-2"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          Ahmed Osama Production
        </p>
        <h2
          className="text-3xl md:text-4xl text-white tracking-widest"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Our Story
        </h2>
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative w-full max-w-4xl mx-4 aspect-video border border-white/10 overflow-hidden z-10"
        style={{ background: "#0a0000" }}
        onMouseMove={resetHideTimer}
        onMouseEnter={resetHideTimer}
      >
        <video
          ref={videoRef}
          src="/videos/reel.mp4"
          className="w-full h-full object-cover cursor-pointer"
          autoPlay
          playsInline
          muted={isMuted}
          onSeeking={handleSeeking}
          onClick={togglePlay}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />

        {/* ── Top bar ── */}
        <motion.div
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,0,0,0.85), transparent)",
          }}
        >
          <span
            className="text-base text-white tracking-widest"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Ahmed Osama
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-white/50 transition-all duration-300 group"
          >
            <span
              className="text-xs text-white/60 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              {isMuted ? "Unmute" : "Mute"}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-white/60 group-hover:text-white transition-colors duration-300"
            >
              {isMuted ? (
                <>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
          </motion.button>
        </motion.div>

        {/* ── Center play icon when paused ── */}
        <AnimatePresence>
          {!isPlaying && !isEnded && (
            <motion.div
              key="paused-icon"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-16 h-16 rounded-full border border-red-600/60 flex items-center justify-center"
                style={{ background: "rgba(10,0,0,0.7)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── No-skip notice ── */}
        {/* <AnimatePresence>
          {!isEnded && (
            <motion.div
              className="absolute bottom-14 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div
                className="relative flex items-center gap-2 px-5 py-2 backdrop-blur-sm border border-red-600/25 overflow-hidden"
                style={{ background: "rgba(10,0,0,0.65)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-600"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <p
                  className="text-[11px] text-white/55 uppercase whitespace-nowrap tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-condensed)" }}
                >
                  Watch the full story to continue
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* ── Bottom controls bar ── */}
        <motion.div
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 flex items-center gap-3"
          style={{
            background:
              "linear-gradient(to top, rgba(10,0,0,0.9), transparent)",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={rewind5}
            title="Rewind 5 seconds"
            className="flex items-center justify-center w-8 h-8 text-white/70 hover:text-red-500 transition-colors duration-200 relative"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 12a9.5 9.5 0 1 1 1.08 4.4" />
              <polyline points="2.5 6 2.5 12 8.5 12" />
            </svg>
            <span
              className="absolute text-[9px] font-bold text-white/70"
              style={{ bottom: "3px", right: "1px", lineHeight: 1 }}
            >
              5
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="flex items-center justify-center w-8 h-8 text-white hover:text-red-500 transition-colors duration-200"
          >
            {isPlaying ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="5" y="3" width="4" height="18" rx="1" />
                <rect x="15" y="3" width="4" height="18" rx="1" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={forward5}
            title="Forward 5 seconds"
            className="flex items-center justify-center w-8 h-8 text-white/70 hover:text-red-500 transition-colors duration-200 relative"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 12a9.5 9.5 0 1 0-1.08 4.4" />
              <polyline points="21.5 6 21.5 12 15.5 12" />
            </svg>
            <span
              className="absolute text-[9px] font-bold text-white/70"
              style={{ bottom: "3px", left: "1px", lineHeight: 1 }}
            >
              5
            </span>
          </motion.button>

          <span
            className="text-[11px] text-white/50 tracking-wider tabular-nums"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            {formatTime(progress)}
          </span>
        </motion.div>
      </motion.div>

      {/* ── Progress bar ── */}
      <div
        className="w-full max-w-4xl mx-4 h-[2px] relative z-10"
        style={{ background: "rgba(204,0,0,0.15)" }}
      >
        <motion.div
          className="h-full bg-red-600 origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-600"
          style={{
            left: `${progress}%`,
            opacity: progress > 0 && progress < 100 ? 1 : 0,
          }}
          animate={{
            boxShadow: [
              "0 0 4px #CC0000",
              "0 0 10px #CC0000",
              "0 0 4px #CC0000",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      {/* ── Enter button - smaller, just says "Enter" ── */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col items-center gap-2 mt-12 relative z-10"
        >
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden text-sm text-white uppercase px-6 py-2"
            style={{
              fontFamily: "var(--font-condensed)",
              letterSpacing: "0.3em",
              fontSize: "13px",
            }}
          >
            <span className="absolute inset-0 border border-red-600/50 group-hover:border-red-600 transition-colors duration-500" />
            <motion.span
              className="absolute inset-0 bg-red-600"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-600" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-600" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600" />
            <span className="relative z-10 flex items-center gap-2">
              Enter
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="text-red-600 group-hover:text-white transition-colors duration-300 text-sm"
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
