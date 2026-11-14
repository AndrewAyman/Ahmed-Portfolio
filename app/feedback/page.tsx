"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackPage from "@/components/FeedBack";

export default function FeedbackRoutePage() {
  return (
    <main
      className="w-full overflow-x-hidden min-h-screen"
      style={{
        background: [
          "radial-gradient(ellipse 80% 50% at 100% 0%, rgba(210,0,0,0.55) 0%, transparent 60%)",
          "radial-gradient(ellipse 60% 40% at 0% 80%, rgba(180,0,0,0.40) 0%, transparent 55%)",
          "linear-gradient(160deg, #160000 0%, #080000 50%, #020000 100%)",
        ].join(", "),
      }}
    >
      <Navbar />
      <FeedbackPage />
      <Footer />
    </main>
  );
}