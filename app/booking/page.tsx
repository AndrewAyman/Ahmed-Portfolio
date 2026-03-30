"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function BookingPage() {
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
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: cursorRingPos.x, top: cursorRingPos.y }} />
      <Navbar />
      <BookingForm />
      <Footer />
    </main>
  );
}