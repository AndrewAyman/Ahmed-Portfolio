"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ChoiceCircles() {
  const router = useRouter();

  const choices = [
    {
      label: "Book Now",
      sub: "Reserve your session",
      icon: "📷",
      href: "/booking",
      delay: 0,
    },
    {
      label: "Portfolio",
      sub: "Explore my work",
      icon: "✦",
      href: "/home",
      delay: 0.15,
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="font-condensed text-xs tracking-[0.5em] text-red uppercase mb-3">
          Where to next?
        </p>
        <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-[0.2em]">
          Choose Your Path
        </h2>
      </motion.div>

      {/* Circles */}
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {choices.map((choice) => (
          <motion.button
            key={choice.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4 + choice.delay,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(choice.href)}
            className="group relative flex flex-col items-center justify-center w-52 h-52 md:w-60 md:h-60 rounded-full border-2 border-red/40 hover:border-red bg-black-soft hover:bg-red/5 transition-all duration-500 cursor-none"
          >
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-red/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                borderStyle: "dashed",
              }}
            />

            {/* Pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-red/10"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: choice.delay }}
            />

            {/* Corner dots */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-1.5 h-1.5 bg-red rounded-full group-hover:scale-150 transition-transform duration-300"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-${choice.label === "Book Now" ? 104 : 120}px) translateX(-50%)`,
                }}
              />
            ))}

            {/* Content */}
            <span className="font-bebas text-5xl text-red group-hover:scale-110 transition-transform duration-300 mb-2">
              {choice.icon}
            </span>
            <span className="font-bebas text-2xl text-white tracking-widest">
              {choice.label}
            </span>
            <span className="font-condensed text-xs text-white/40 tracking-[0.3em] uppercase mt-1">
              {choice.sub}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute hidden md:block w-px h-24 bg-red/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </motion.div>
  );
}