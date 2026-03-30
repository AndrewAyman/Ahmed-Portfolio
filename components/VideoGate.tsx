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
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSeeking = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > lastAllowedRef.current + 0.5) {
      video.currentTime = lastAllowedRef.current;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 text-center"
      >
        <p className="font-condensed text-l tracking-[0.4em] text-red uppercase mb-2">
          RED EDE Photography
        </p>
        <h2 className="font-bebas text-3xl md:text-4xl text-white tracking-widest">
          Our Story
        </h2>
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative w-full max-w-4xl mx-4 aspect-video bg-black-soft border border-black-border overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/videos/reel.mp4"
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted={isMuted}
          onSeeking={handleSeeking}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />

        {/* Overlay top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
          <span className="font-bebas text-lg text-white tracking-widest">RED EDE</span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="relative flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-white/50 transition-all duration-300 group"
          >
            <span className="text-xs font-condensed tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">
              {isMuted ? "Unmute" : "Mute"}
            </span>
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
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
        </div>

        {/* No-skip notice */}
        <AnimatePresence>
          {!isEnded && (
            <motion.div
              className="absolute bottom-14 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="relative flex items-center gap-2 px-5 py-2 bg-black/60 backdrop-blur-sm border border-red/25 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-red"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-red flex-shrink-0"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <p className="font-condensed text-[11px] tracking-[0.35em] text-white/55 uppercase whitespace-nowrap">
                  Watch the full story to continue
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-4xl mx-4 h-[2px] bg-white/10 relative">
        <motion.div
          className="h-full bg-red origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red"
          style={{ left: `${progress}%`, opacity: progress > 0 && progress < 100 ? 1 : 0 }}
          animate={{ boxShadow: ["0 0 4px #CC0000", "0 0 10px #CC0000", "0 0 4px #CC0000"] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      {/* Enter button — appears after video ends, well spaced */}
      <AnimatePresence>
        {isEnded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 mt-16"
          >
            {/* decorative line above */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-[1px] bg-red/40 mb-2"
            />

            <motion.button
              onClick={onComplete}
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden font-condensed text-base tracking-[0.6em] uppercase text-white"
              style={{ padding: "18px 64px" }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(204,0,0,0.2)",
                  "0 0 45px rgba(204,0,0,0.5)",
                  "0 0 20px rgba(204,0,0,0.2)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {/* border */}
              <span className="absolute inset-0 border border-red/50 group-hover:border-red transition-colors duration-500" />

              {/* red fill slides in on hover */}
              <motion.span
                className="absolute inset-0 bg-red"
                initial={{ scaleX: 0, originX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red" />

              {/* text */}
              <span className="relative z-10 flex items-center gap-4">
                Enter
                <motion.span
                  variants={{ hover: { x: 6 } }}
                  transition={{ duration: 0.25 }}
                  className="text-red group-hover:text-white transition-colors duration-300"
                >
                  →
                </motion.span>
              </span>
            </motion.button>


          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}