"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const allProjects = [
  {
    id: "office-redesign",
    number: "01",
    title: "Office Redesign",
    category: "Interior Design",
    year: "2026",
    cover: "/assets/OfficeRedesign/cover.jpg",
    href: "/office-redesign",
  },
  {
    id: "tgr",
    number: "02",
    title: "Desert Oasis",
    category: "Product Design",
    year: "2026",
    cover: "/assets/work/cover.jpg",
    href: "/tgr-project",
  },
  {
    id: "botanical-garden",
    number: "03",
    title: "Botanical Garden",
    category: "Product Design",
    year: "2026",
    cover: "/assets/BotanicalGarden/bg_forest.jpg",
    href: "/botanical-garden-project",
  },
  {
    id: "regal",
    number: "04",
    title: "Regal",
    category: "Product Design",
    year: "2026",
    cover: "/assets/Regal/regal_cover.jpg",
    href: "/regal-project",
  },
  {
    id: "luxury-home-redesign",
    number: "05",
    title: "Luxury Home Redesign",
    category: "Interior Design",
    year: "2026",
    cover: "/assets/LuxuryHomeRedesign/cover.jpg",
    href: "/luxury-home-redesign",
  },
];

const categories = ["All", "Interior Design", "Product Design"];

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <main className="bg-matte-black text-warm-white pt-32 md:pt-36 pb-20 md:pb-28 min-h-screen">
      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">

        {/* Page header */}
        <div ref={ref} className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-caption text-soft-beige/60 mb-4"
          >
            Studio Morphous
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif font-light text-warm-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Selected Work
          </motion.h1>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 mb-14 md:mb-20 border-b border-warm-white/6 pb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-caption transition-colors duration-300 ${
                activeFilter === cat
                  ? "text-warm-white"
                  : "text-warm-gray/50 hover:text-warm-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-caption text-warm-gray/30">
            {filtered.length} {filtered.length === 1 ? "Project" : "Projects"}
          </span>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-14 md:gap-y-20">
          {filtered.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}

function WorkCard({ project, index }: { project: (typeof allProjects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: (index % 2) * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link href={project.href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden mb-5">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover img-grain transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-matte-black/15 transition-opacity duration-700 group-hover:opacity-0" />

          <div className="absolute top-4 left-4">
            <span className="text-caption text-warm-white/70 bg-matte-black/40 backdrop-blur-sm px-3 py-1.5">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="text-caption text-warm-white flex items-center gap-2">
              View
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M0 4H12M12 4L9 1M12 4L9 7" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h2
            className="font-serif font-light text-warm-white group-hover:text-soft-beige transition-colors duration-300"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", lineHeight: 1.2 }}
          >
            {project.title}
          </h2>
          <span className="text-caption text-warm-gray/40">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}
