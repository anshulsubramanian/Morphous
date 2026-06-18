"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const scenes = [
  {
    name: "OVERVIEW",
    image: "/assets/LuxuryHomeRedesign/cover.jpg",
    caption: "A comprehensive view of the luxury master bedroom showcasing custom ceiling design, ambient lighting, and rich material coordination.",
  },
  {
    name: "BED DETAIL",
    image: "/assets/LuxuryHomeRedesign/img_1.jpg",
    caption: "Close-up detail of the custom upholstered headboard paired with textured cushions and a marble panel backdrop.",
  },
  {
    name: "SIDE ELEVATION",
    image: "/assets/LuxuryHomeRedesign/img_2.jpg",
    caption: "Bedside perspective showing the custom built-in window bench, accent wall details, and premium wooden doors.",
  },
  {
    name: "BED & LIGHTING",
    image: "/assets/LuxuryHomeRedesign/img_3.jpg",
    caption: "Wide view showing the balance between natural light and architectural cove illumination across the bedroom scene.",
  },
  {
    name: "STUDY CORNER",
    image: "/assets/LuxuryHomeRedesign/img_4.jpg",
    caption: "Minimalist workspace integration featuring a marble textured wall panel, custom desk, and ergonomic task chair."
  },
  {
    name: "WALK-IN CLOSET",
    image: "/assets/LuxuryHomeRedesign/img_5.jpg",
    caption: "Custom walk-in wardrobe featuring fluted glass doors, cream solid panels, and integrated shelf lighting.",
  },
  {
    name: "FLOATING SHELVES",
    image: "/assets/LuxuryHomeRedesign/img_6.jpg",
    caption: "Minimalist floating shelves with under-cabinet strip lighting displaying curated decorative elements.",
  },
  {
    name: "DRESSER VANITY",
    image: "/assets/LuxuryHomeRedesign/img_7.jpg",
    caption: "A custom dressing table integrated with a fluted wooden panel backdrop and a soft textile pouf.",
  },
  {
    name: "WARDROBE SYSTEM",
    image: "/assets/LuxuryHomeRedesign/img_8.jpg",
    caption: "Full-height wardrobe doors and integrated storage panels showcasing precision joinery and layout."
  },
  {
    name: "WRITING DESK",
    image: "/assets/LuxuryHomeRedesign/img_9.jpg",
    caption: "An elegant writing desk with integrated storage drawers, warm back-lit shelving, and a custom fluted wood accent wall."
  },
  {
    name: "BEDSIDE ALCOVE",
    image: "/assets/LuxuryHomeRedesign/img_10.jpg",
    caption: "Bedside detail highlighting custom vertical fluted headboard design, glass-topped nightstand, and linen roman blinds."
  },
  {
    name: "INTEGRATED WORKSPACE",
    image: "/assets/LuxuryHomeRedesign/img_11.jpg",
    caption: "A comprehensive view of the bedroom study desk integration showing the transition between the sleeping space and work area."
  },
  {
    name: "WORK ZONE DETAILED",
    image: "/assets/LuxuryHomeRedesign/img_12.jpg",
    caption: "Alternative perspective of the integrated study corner highlighting the seamless joinery and balanced neutral palette."
  }
];

export default function LuxuryHomeRedesignPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <div className="bg-black text-warm-white min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-28 md:pt-36 px-6 md:px-10 lg:px-16 pb-20">
        
        {/* Layout Wrapper: Left Sidebar + Right Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* Left Fixed Panel (sticky) */}
          <aside className="w-full lg:w-[22%] shrink-0 lg:sticky lg:top-28 h-auto lg:h-[calc(100vh-10rem)] flex flex-col justify-between pr-4 overflow-y-auto scrollbar-none pb-4 border-b lg:border-b-0 border-warm-white/10">
            <div className="flex flex-col gap-6 text-left">
              {/* Back button */}
              <Link
                href="/#projects"
                className="group flex items-center gap-2 text-caption text-[10px] text-warm-white/40 hover:text-warm-white transition-colors duration-300 self-start"
              >
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span>BACK TO PROJECTS</span>
              </Link>

              {/* Number and Title */}
              <div className="flex flex-col gap-1 mt-4">
                <span className="font-mono text-[10px] tracking-widest text-warm-white/30">02 / 06</span>
                <h1 className="font-serif font-light text-3xl tracking-widest text-warm-white uppercase mt-1 leading-tight">
                  Luxury Home Redesign
                </h1>
                <span className="font-sans text-[10px] tracking-[0.2em] text-soft-beige/70 uppercase mt-1">
                  Interior Design
                </span>
                <div className="flex flex-col text-[10px] tracking-wider text-warm-white/40 font-mono mt-2 gap-0.5">
                  <span>GURGAON, INDIA</span>
                  <span>2026</span>
                </div>
              </div>

              <div className="w-full h-px bg-warm-white/10 my-2" />

              {/* Minimal Project Description Statement */}
              <p className="text-xs font-light text-warm-white/60 leading-relaxed font-sans">
                A meticulous redesign of a luxury residential space, showcasing a refined interplay of custom wood joinery, fine stone paneling, and architectural lighting configurations.
              </p>

            </div>
          </aside>

          {/* Right Content Area (Interactive Slideshow) */}
          <div className="flex-1 lg:pl-10 lg:border-l border-warm-white/10 flex flex-col gap-8 min-w-0">
            
            {/* Main Interactive Hero Frame */}
            <div className="flex flex-col gap-4 relative">
              
              {/* Carousel navigation (Top Right) */}
              <div className="absolute right-0 -top-8 z-20 flex items-center gap-4 text-[10px] font-mono tracking-widest text-warm-white/40 uppercase">
                <button
                  onClick={handlePrev}
                  className="hover:text-warm-white transition-colors duration-300 focus:outline-none"
                >
                  PREV
                </button>
                <span>/</span>
                <button
                  onClick={handleNext}
                  className="hover:text-warm-white transition-colors duration-300 focus:outline-none"
                >
                  NEXT
                </button>
              </div>

              {/* Main Image Container */}
              <div className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-matte-black mt-2">
                <div className="absolute inset-0 w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={scenes[activeIdx].image}
                        alt={scenes[activeIdx].caption}
                        fill
                        className="object-contain img-grain"
                        sizes="(max-width: 1024px) 100vw, 78vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
              </div>

              {/* Bottom Caption and Page Indicator */}
              <div className="flex justify-between items-baseline gap-6 text-[10px] font-mono tracking-widest text-warm-white/40 uppercase mt-2">
                <p className="normal-case tracking-normal font-light text-warm-white/60 text-xs italic max-w-xl text-left">
                  {scenes[activeIdx].caption}
                </p>
                <div className="shrink-0 flex items-center gap-1 select-none font-medium">
                  <span className="text-warm-white">{String(activeIdx + 1).padStart(2, "0")}</span>
                  <span>—</span>
                  <span>{String(scenes.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>

            {/* Static Gallery Thumbnails Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.name}
                  className={`flex flex-col gap-2 group cursor-pointer ${
                    activeIdx === idx ? "opacity-100" : "opacity-50 hover:opacity-85"
                  } transition-opacity duration-300`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-matte-black">
                    <Image
                      src={scene.image}
                      alt={scene.name}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 img-grain"
                      sizes="(max-width: 768px) 50vw, 15vw"
                    />
                  </div>
                  <span className="font-mono text-[8px] tracking-widest text-warm-white/30 uppercase mt-1 text-left">
                    {String(idx + 1).padStart(2, "0")} . {scene.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Instagram Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-warm-white/10 pt-8 mt-12 pb-4 text-left">
              <span className="font-sans text-xs font-light text-warm-white/50">
                Find out more on instagram!
              </span>
              <a
                href="https://www.instagram.com/studiomorphous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-soft-beige/30 hover:border-soft-beige bg-transparent text-soft-beige hover:text-warm-white text-[10px] font-mono tracking-widest uppercase px-5 py-2.5 transition-colors duration-300"
              >
                <span>Follow @studiomorphous</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Bottom Nav: Next / Prev navigation links */}
            <div className="border-t border-warm-white/10 pt-8 mt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
              <Link
                href="/regal-project"
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span>Regal</span>
              </Link>

              <Link
                href="/work"
                className="text-warm-white/50 hover:text-warm-white transition-colors duration-300"
              >
                All Projects
              </Link>

              <Link
                href="/office-redesign"
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <span>Office Redesign</span>
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
