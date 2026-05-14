"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import VideoGate from "@/components/VideoGate";
import ChoiceCircles from "@/components/ChoiceCircles";

type Stage = "intro" | "video" | "choice";

export default function EntryPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const moveRing = (e: MouseEvent) => {
      setTimeout(() => {
        setCursorRingPos({ x: e.clientX, y: e.clientY });
      }, 80);
    };
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", moveRing);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", moveRing);
    };
  }, []);

  return (
    <main className="w-full h-full bg-black overflow-hidden grain custom-cursor-active">
      {/* Custom cursor */}
      <div
        className="cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div
        className="cursor-ring"
        style={{ left: cursorRingPos.x, top: cursorRingPos.y }}
      />

      {/* Stage 1: Intro animation */}
      {stage === "intro" && (
        <IntroAnimation onComplete={() => setStage("video")} />
      )}

      {/* Stage 2: Mandatory video */}
      {stage === "video" && (
        <VideoGate onComplete={() => setStage("choice")} />
      )}

      {/* Stage 3: Choice circles */}
      {stage === "choice" && <ChoiceCircles />}
    </main>
  );
}