"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const materials = [
  {
    id: "stone",
    name: "Natural Stone",
    description:
      "Quarried directly from the earth. Each slab represents geological deep time. We utilize raw travertine, limestone, and custom soapstone for their inherent warmth, textured porosities, and raw, honest imperfections.",
    image: "/assets/TGR/TGR Mood Board.jpeg",
    tag: "Natural Stone",
    origin: "Tuscany, Italy & Rajasthan, India",
    tactility: "Honed matte, porous grain, earthy density",
    spec: "Porosity: Med-High · Resistance: High · 100% Raw",
  },
  {
    id: "wood",
    name: "Hardwoods & Teak",
    description:
      "Premium solid hardwoods, organic teak, and dark walnut—specifically hand-chosen for their distinctive grain structures, warm undertones, and natural patina potential. Surfaces designed to age gracefully over generations.",
    image: "/assets/TGR/Agava Dining Table.png",
    tag: "Hardwood & Timber",
    origin: "Kashmir Highlands & Burma",
    tactility: "Warm grain, organic oils, natural beeswaxed texture",
    spec: "Density: 0.72g/cm³ · Finishes: VOC-Free Beeswax",
  },
  {
    id: "metal",
    name: "Blackened Steel & Brass",
    description:
      "Acid-etched blackened steel, brushed brass, and heavily oxidized bronze surfaces. Metals conceived as structural sculpture. Geometric forms that trap, reflect, and celebrate light and shadow simultaneously.",
    image: "/assets/WhiteStudios/WWA1.jpg",
    tag: "Scattered Metals",
    origin: "Artisanal Foundries, Gurugram",
    tactility: "Cold, textured metalwork, satin oxidized finish",
    spec: "Treatment: Acid-Etched Patina · Solid Cast",
  },
  {
    id: "plaster",
    name: "Venetian Plaster & Cement",
    description:
      "Traditional Venetian lime plaster and microcement applied carefully in structural layers. Every single coat records the physical texture, pressure, and hand movement of the artisan who crafted it.",
    image: "/assets/WhiteStudios/WWA2.jpg",
    tag: "Lime & Plaster",
    origin: "Venetian Minerals & Local Lime",
    tactility: "Velvety mineral feel, multi-coat textured trowelling",
    spec: "Thickness: 2.2mm · Application: Multi-layered trowel",
  },
  {
    id: "textile",
    name: "Raw Linen & Boucle",
    description:
      "Hand-woven organic textiles, heavy raw linens, and highly textured boucle wool fabrics. Selected exclusively for their tactile touch, breathability, and the way they diffuse spatial lighting into soft shadows.",
    image: "/assets/TGR/TGRAdditional1.jpg",
    tag: "Textile & Weaves",
    origin: "Handloom Cooperatives, Northern India",
    tactility: "Breathing weaves, irregular linen slubs, boucle density",
    spec: "Composition: 100% Organic Linen & Mountain Wool",
  },
];

export default function MaterialsSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="bg-warm-white py-28 md:py-40 overflow-hidden relative">
      
      {/* Visual background lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-matte-black/5" />
      <div className="absolute inset-y-0 left-12 w-px bg-matte-black/5 pointer-events-none hidden lg:block" />

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-caption text-warm-gray mb-4 flex items-center gap-2"
            >
              <span className="blueprint-dot" />
              Material as Emotion
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif font-light text-matte-black"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Atelier Material
              <br />
              <em>Mood Board.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-end"
          >
            <p className="font-sans text-warm-gray text-sm leading-relaxed font-light">
              We approach materiality as an emotional language. Stone communicates weight and geological permanence. Timbers offer organic warmth. Cast metals capture light and dark reflections. Our specifications explore physical dialogues that breathe and evolve over decades.
            </p>
          </motion.div>
        </div>

        {/* Materials interactive desk grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Panel: material select list buttons */}
          <div className="lg:col-span-5 bg-warm-white flex flex-col justify-between border border-matte-black/5 divide-y divide-matte-black/8 shadow-sm">
            {materials.map((mat, i) => {
              const isActive = active === i;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-6 py-6 transition-all duration-500 relative ${
                    isActive ? "bg-matte-black text-warm-white" : "hover:bg-soft-beige/20 text-matte-black"
                  }`}
                >
                  {/* Small architectural line on the left for active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeMaterialLine"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-soft-beige"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-sans text-[0.65rem] font-mono tracking-widest uppercase transition-colors duration-300 ${
                        isActive ? "text-soft-beige" : "text-warm-gray/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} / SPEC-0{i + 1}
                    </span>
                    <span
                      className={`text-[0.6rem] text-caption transition-colors duration-300 ${
                        isActive ? "text-soft-beige/70" : "text-warm-gray/50"
                      }`}
                    >
                      {mat.tag}
                    </span>
                  </div>

                  <h3
                    className="font-serif font-light tracking-tight transition-colors duration-300"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)" }}
                  >
                    {isActive ? <em>{mat.name}</em> : mat.name}
                  </h3>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-3 space-y-3"
                    >
                      <p className="font-sans text-warm-white/70 text-xs leading-relaxed font-light">
                        {mat.description}
                      </p>

                      {/* Technical specifications sub-grid */}
                      <div className="border-t border-warm-white/10 pt-3 space-y-1.5 text-[0.65rem] font-sans font-light text-soft-beige/80">
                        <div className="flex justify-between gap-4">
                          <span className="text-warm-white/40 uppercase tracking-wider">Origin</span>
                          <span className="text-right">{mat.origin}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-warm-white/40 uppercase tracking-wider">Tactility</span>
                          <span className="text-right italic">{mat.tactility}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-warm-white/40 uppercase tracking-wider">Technical</span>
                          <span className="text-right font-mono text-[0.6rem]">{mat.spec}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel: Active Image (Fully Clean and Unblocked) */}
          <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto min-h-[450px] bg-stone-200 overflow-hidden border border-matte-black/5 shadow-md">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.id}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  className="object-cover img-grain"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/30 via-transparent to-matte-black/10" />
              </motion.div>
            ))}

            {/* Simple Label Overlay */}
            <div className="absolute bottom-5 left-5 z-10">
              <span className="text-caption text-warm-white/80 bg-matte-black/40 backdrop-blur-sm px-3 py-1.5">
                {materials[active].tag}
              </span>
            </div>
          </div>

        </div>

        {/* Marquee strip */}
        <div className="mt-16 md:mt-20 overflow-hidden border-t border-matte-black/8 pt-8">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center gap-16 pr-16">
                {["Stone slab", "Blackened brass", "Solid timber", "Venetian plaster", "Boucle weave", "Honed soapstone", "Burma teak", "Acid patina"].map(
                  (word) => (
                    <div key={word} className="flex items-center gap-4">
                      <span className="font-serif font-light italic text-warm-gray/35 text-xl tracking-wider">
                        {word}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
