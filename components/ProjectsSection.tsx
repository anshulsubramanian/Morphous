"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const luxuryProjects = [
  {
    number: "01",
    title: "Office Redesign",
    category: "Interior Design",
    cover: "/assets/OfficeRedesign/cover.jpg",
    href: "/office-redesign",
  },
  {
    number: "02",
    title: "Luxury Home Redesign",
    category: "Interior Design",
    cover: "/assets/LuxuryHomeRedesign/cover.jpg",
    href: "/luxury-home-redesign",
  },
  {
    number: "03",
    title: "Desert Oasis",
    category: "Product Design",
    cover: "/assets/work/cover.jpg",
    href: "/tgr-project",
  },
  {
    number: "04",
    title: "Botanical Garden",
    category: "Product Design",
    cover: "/assets/BotanicalGarden/bg_forest.jpg",
    href: "/botanical-garden-project",
  },
  {
    number: "05",
    title: "Regal",
    category: "Product Design",
    cover: "/assets/Regal/regal_cover.jpg",
    href: "/regal-project",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="bg-black text-warm-white py-20 px-6 md:px-10 lg:px-16 relative w-full overflow-hidden flex flex-col justify-between"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Hero Area / Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-warm-white/10 pb-10 relative">
          
          {/* Top Left Asterisk & Title */}
          <div className="flex flex-col gap-2">
            <span className="text-soft-beige font-serif text-lg leading-none -mb-1">*</span>
            <h2 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl tracking-wider uppercase text-warm-white leading-none">
              Projects
            </h2>
          </div>

          {/* Center Vertical Divider & Editorial Statement */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center max-w-xl px-4">
            <div className="w-px h-12 bg-warm-white/20" />
            <p className="text-[10px] tracking-[0.18em] uppercase font-light text-warm-white/60 leading-relaxed font-sans max-w-xs">
              A collection of spaces and objects, shaped with intention and detail.
            </p>
          </div>

          {/* Right Outlined Circle Button */}
          <Link
            href="/work"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-warm-white/15 hover:border-soft-beige flex flex-col items-center justify-center text-[10px] font-sans text-warm-white/60 hover:text-soft-beige uppercase tracking-widest text-center leading-none gap-1 transition-all duration-500 hover:scale-105 pointer-events-auto"
          >
            <span>View</span>
            <span>All</span>
          </Link>
        </div>

        {/* Project Accordion Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-black border-y border-black bg-black relative"
        >
          {luxuryProjects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              className="flex-1 hover:flex-[1.35] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group relative overflow-hidden h-[50vh] md:h-[65vh] min-h-[420px] bg-matte-black border-black cursor-pointer block"
            >
              {/* Full height photography with zoom zoom */}
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.8]"
              />

              {/* Luxury dark gradient overlays (top and bottom) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 opacity-90 transition-opacity duration-500 group-hover:opacity-80" />

              {/* Card Content - Top Left */}
              <div className="absolute top-8 left-8 z-20 flex flex-col gap-1 text-warm-white text-left pointer-events-none">
                <span className="font-serif text-sm opacity-50 font-mono tracking-wider">
                  {project.number}
                </span>
                <h3 className="font-serif font-light text-xl tracking-wide uppercase leading-tight">
                  {project.title}
                </h3>
                <span className="text-[9px] font-sans tracking-[0.15em] opacity-40 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Card Content - Bottom Left */}
              <div className="absolute bottom-8 left-8 z-20 text-warm-white/40 group-hover:text-warm-white text-[9px] font-sans tracking-[0.2em] uppercase transition-colors duration-500 pointer-events-none">
                View Project
              </div>

              {/* Card Content - Bottom Right */}
              <div className="absolute bottom-8 right-8 z-20 text-warm-white/40 group-hover:text-warm-white transition-colors duration-500 pointer-events-none">
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Section Footer details */}
        <div className="flex justify-between items-center mt-2 text-warm-white/30 text-[9px] font-mono tracking-[0.2em] uppercase">
          <span>Gurgaon</span>
          <span>2026</span>
        </div>

      </div>
    </section>
  );
}
