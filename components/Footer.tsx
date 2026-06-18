"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-warm-white py-16 px-6 md:px-10 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-baseline text-sm font-light">
        {/* Left Column */}
        <div className="flex flex-col gap-2">
          <span className="font-serif text-lg tracking-wider">Studio Morphous</span>
          <span className="text-xs text-warm-gray font-mono">Gurugram, India</span>
        </div>

        {/* Center Column: Links */}
        <div className="flex flex-wrap gap-6 md:justify-center">
          <Link href="/work" className="text-warm-gray hover:text-white transition-colors duration-300">
            Work
          </Link>
          <Link href="/about" className="text-warm-gray hover:text-white transition-colors duration-300">
            About
          </Link>
          <a
            href="https://www.instagram.com/studiomorphous/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-white transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/919782896600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-white transition-colors duration-300"
          >
            Whatsapp
          </a>
        </div>

        {/* Right Column: Copyright */}
        <div className="md:text-right flex flex-col gap-1">
          <span className="text-xs text-warm-gray/60">
            &copy; {year} Studio Morphous. All rights reserved.
          </span>
          <span className="text-[10px] text-warm-gray/30 font-mono">
            Designed for Distinction.
          </span>
        </div>
      </div>
    </footer>
  );
}
