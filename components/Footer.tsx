"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black-mid border-t border-black-border py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 border border-red rotate-45 flex items-center justify-center">
                <span className="font-bebas text-xs text-red -rotate-45">RE</span>
              </div>
              <span className="font-bebas text-xl tracking-[0.25em] text-white">
                RED <span className="text-red">EDE</span>
              </span>
            </div>
            <p className="font-barlow text-xs text-white/30 leading-relaxed">
              Professional photography for weddings, portraits, fashion & commercial.
              Based in Cairo, available worldwide.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-condensed text-xs tracking-[0.4em] text-red uppercase mb-5">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Portfolio", href: "/home#gallery" },
                { label: "Services", href: "/home#services" },
                { label: "Pricing", href: "/home#pricing" },
                { label: "Reviews", href: "/home#reviews" },
                { label: "Book Now", href: "/booking" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="font-barlow text-sm text-white/40 hover:text-white transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-condensed text-xs tracking-[0.4em] text-red uppercase mb-5">
              Follow
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "Facebook", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "Behance", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-barlow text-sm text-white/40 hover:text-white transition-colors duration-300 group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-red group-hover:w-4 transition-all duration-300" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black-border pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="font-condensed text-xs text-white/20 tracking-widest">
            © {year} RED EDE Photography. All rights reserved.
          </p>
          <p className="font-condensed text-xs text-white/20 tracking-widest">
            Cairo, Egypt
          </p>
        </div>
      </div>
    </footer>
  );
}