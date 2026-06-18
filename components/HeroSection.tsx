"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for subtle hover parallax if needed, or simple static layout
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-matte-black text-warm-white flex flex-col justify-between pt-24 pb-4 px-6 md:px-10 lg:px-16"
    >
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between relative h-full">
        
        {/* Centered Circular Graphic Container (shifted slightly up to create space) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none -translate-y-12 md:-translate-y-16">
          
          {/* Large Outer Circle Outline */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[85vw] h-[85vw] max-w-[580px] max-h-[580px] rounded-full border border-warm-white/10 flex items-center justify-center aspect-square"
          >
            
            {/* Grayscale Smoke circle backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 0.65, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.15 }}
              className="w-[62%] h-[62%] rounded-full overflow-hidden border border-warm-white/5 relative bg-matte-black"
            >
              <img
                src="/assets/images/smoke_circle.png"
                alt=""
                className="w-full h-full object-cover filter contrast-[1.1] saturate-0 mix-blend-lighten"
              />
            </motion.div>

            {/* Floating Text Overlay - Center of the circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-1 md:gap-2 select-none pointer-events-none">
              
              {/* Floating "FORM" */}
              <motion.h1
                animate={{ 
                  y: [-4, 4, -4],
                  x: [-1.5, 1.5, -1.5]
                }}
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="font-serif font-light text-warm-white leading-none text-center uppercase tracking-wide text-[3.2rem] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[6.2rem]"
              >
                Form
              </motion.h1>

              {/* Floating "FEELING" */}
              <motion.h1
                animate={{ 
                  y: [4, -4, 4],
                  x: [2, -2, 2]
                }}
                transition={{
                  y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="font-serif font-light text-warm-white leading-none text-center uppercase tracking-wide text-[3.2rem] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[6.2rem]"
              >
                Feeling
              </motion.h1>

              {/* Floating "FUNCTION" */}
              <motion.h1
                animate={{ 
                  y: [-5, 5, -5],
                  x: [-2, 2, -2]
                }}
                transition={{
                  y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="font-serif font-light text-warm-white leading-none text-center uppercase tracking-wide text-[3.2rem] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[6.2rem]"
              >
                Function
              </motion.h1>

            </div>
          </motion.div>
        </div>

        {/* Left Side: Circular Link (Centered perfectly inside w-24 h-24) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-auto hidden md:block">
          <Link
            href="/work"
            className="w-24 h-24 rounded-full border border-warm-white/15 hover:border-soft-beige flex flex-col items-center justify-center text-[10px] font-sans text-warm-white/60 hover:text-soft-beige uppercase tracking-widest text-center leading-none gap-1 transition-all duration-500 hover:scale-105 p-0"
          >
            <span>View</span>
            <span>Work</span>
          </Link>
        </div>

        {/* Right Side: Side tagline */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-2 text-right pointer-events-none text-warm-white/50 text-[10px] uppercase tracking-widest font-light">
          <span className="text-soft-beige font-serif text-lg leading-none mb-1">*</span>
          <span>We shape objects</span>
          <span>and spaces</span>
          <span>that evolve</span>
        </div>

        {/* Bottom Middle details (aligned tightly to the bottom to avoid overlap) */}
        <div className="mt-auto w-full flex flex-col items-center justify-end gap-4 z-30 pointer-events-none">
          
          {/* Center Info Text */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-soft-beige font-serif text-base leading-none">*</span>
            <p className="max-w-xl text-center text-warm-white/60 text-[10px] md:text-[11px] uppercase tracking-widest leading-relaxed font-light">
              An interdisciplinary studio working at the intersection of interior, design and visual storytelling.
            </p>
          </div>

          {/* Scroll Explore & Line Indicator (reduced line height to keep content shifted down) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-widest text-warm-white/40 font-mono">
              Scroll to explore
            </span>
            <div className="w-px h-6 bg-gradient-to-b from-warm-white/20 via-warm-white/40 to-transparent" />
          </div>

        </div>

      </div>
    </section>
  );
}
