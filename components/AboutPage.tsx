"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const practiceAreas = [
  {
    title: "Interior Design & Space Planning",
    desc: "Developing comprehensive spatial layouts that balance structural proportion, movement, and visual weight. We craft custom joinery systems and ergonomic divisions that feel both integrated and inevitable.",
    focus: ["Space Ergonomics", "Bespoke Joinery Layouts", "Spatial Flow Optimization"]
  },
  {
    title: "Product & Custom Furniture Design",
    desc: "Designing signature furniture pieces and design objects from sketch to production. We fuse structural integrity with comfort and statement aesthetics, as seen in our custom Opal and Strata series.",
    focus: ["Bespoke Seating & Bedding", "Textured Cabinetry Facades", "Kinetic Light Sculptures"]
  },
  {
    title: "CMF Strategy & Material Curation",
    desc: "Developing color, material, and finish palettes that enrich the tactile experience of a space. We study how materials age, reflect light, and converse with one another under varying illumination.",
    focus: ["Tactile Material Curation", "Gloss & Texture Coordination", "Custom Finish Engineering"]
  },
  {
    title: "Bespoke Lighting Solutions",
    desc: "Designing integrated lighting systems that transform space into atmosphere. We coordinate architectural cove illumination, diffuse light sources, and custom floor fixtures to shape soft ambient glow.",
    focus: ["Architectural Cove Illumination", "Diffused Lighting Details", "Contrast & Lux Coordination"]
  },
  {
    title: "3D Architectural Visualization",
    desc: "Translating concepts into high-fidelity atmospheric rendering to preview texture, shadow, and materiality. This enables meticulous client review and precision material planning prior to procurement.",
    focus: ["High-Fidelity Rendering", "Material Scale Previews", "Lighting Simulation"]
  },
  {
    title: "Technical Documentation & Detailing",
    desc: "Producing precise engineering drawings, joinery blueprints, and material sheets. We establish clear technical guidelines for fabricators and craftsmen to ensure seamless execution.",
    focus: ["Millwork & Joinery Details", "Production Spec Sheets", "Craftsman Coordination"]
  }
];

export default function AboutPage() {
  const [activeArea, setActiveArea] = useState<number | null>(0);
  return (
    <main className="bg-black text-warm-white selection:bg-soft-beige selection:text-black">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 lg:px-16 bg-matte-black border-b border-warm-white/10">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-caption text-soft-beige/60 mb-8 uppercase font-mono tracking-widest text-xs">Studio Morphous</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-serif font-light text-warm-white leading-tight uppercase tracking-wider"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)", letterSpacing: "-0.01em" }}
            >
              A multidisciplinary
              <br />
              design practice built on
              <br />
              <span className="italic font-serif text-soft-beige font-light lowercase">material sensitivity.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* About body */}
      <section className="py-24 md:py-36 px-6 md:px-10 lg:px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-36">
            <div className="md:col-span-7 flex flex-col justify-center">
              <Reveal>
                <h2
                  className="font-serif font-light text-warm-white leading-[1.2] mb-8 uppercase tracking-wide"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
                >
                  We design with depth — shaping spaces, objects, and furniture that live with quiet intention.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-sans text-warm-white/60 text-sm leading-relaxed mb-6 font-light">
                  Studio Morphous was founded in Gurugram on a simple design belief: that great work should feel inevitable. Across high-end residential redesigns, workspaces, and bespoke product collections, we prioritize spatial harmony, material honesty, and advanced CMF (Color, Material, Finish) strategy.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-sans text-warm-white/60 text-sm leading-relaxed mb-6 font-light">
                  Our portfolio navigates both spatial scale and refined object development. From the precision-crafted joinery of custom walk-in closets and modern collaborative office systems to the sculptural elegance of furniture pieces like our Opal, Strata, and Orb collections, every project is a dialogue between form and feeling.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-sans text-warm-white/60 text-sm leading-relaxed font-light">
                  We balance structural rigor with sensory richness, creating environments and objects that reward close, quiet attention.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <Reveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden bg-matte-black border border-warm-white/10 mb-6">
                  <Image
                    src="/assets/images/AboutImg2.png"
                    alt="Material Strategy and Process"
                    fill
                    className="object-cover img-grain"
                  />
                </div>
                <p className="text-caption text-warm-white/40 font-mono text-[9px] uppercase tracking-wider">Studio process and material studies.</p>
              </Reveal>
            </div>
          </div>

          {/* Values grid */}
          <div className="border-t border-warm-white/10 pt-16 mb-24 md:mb-36">
            <Reveal>
              <p className="text-caption text-soft-beige/60 mb-10 font-mono tracking-widest text-xs uppercase">How We Work</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Spatial Rigor",
                  body: "Whether organizing a custom dressing cabinet system, laying out an open-plan workstation lobby, or shaping a bedside companion, we believe proportion is everything. We construct grids to frame life.",
                },
                {
                  title: "Material as Voice",
                  body: "We select metals, timbers, stone, and glass not just for their static visual presence, but for how they reflect light, feel to the touch, and develop character over years of daily interaction.",
                },
                {
                  title: "Bespoke CMF Strategy",
                  body: "Color, material, and finish are never secondary additions. We treat them as architectural components, coordinating custom textures and coves to define the emotional tone of every space.",
                },
              ].map((v, i) => (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="bg-matte-black/40 border border-warm-white/10 p-8 md:p-10 h-full flex flex-col gap-4">
                    <span className="font-mono text-soft-beige/40 text-[10px] tracking-widest">0{i + 1}</span>
                    <h3 className="font-serif font-light text-warm-white text-lg tracking-wider uppercase">
                      {v.title}
                    </h3>
                    <p className="font-sans text-warm-white/60 text-sm leading-relaxed font-light">
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Practice Areas Accordion Section */}
          <div className="border-t border-warm-white/10 pt-16 mb-24 md:mb-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Title Column */}
              <div className="lg:col-span-4 text-left lg:sticky lg:top-28 self-start flex flex-col gap-4">
                <Reveal>
                  <p className="text-caption text-soft-beige/60 font-mono tracking-widest text-xs uppercase">Practice Areas</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h3 className="font-serif font-light text-2xl md:text-3xl text-warm-white uppercase tracking-wider">
                    Core
                    <br />
                    Capabilities
                  </h3>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="text-xs font-light text-warm-white/40 leading-relaxed font-sans max-w-[280px] mt-2">
                    Click on each practice area to explore our methodology, approach, and focus fields.
                  </p>
                </Reveal>
              </div>

              {/* Right Accordion List Column */}
              <div className="lg:col-span-8 flex flex-col divide-y divide-warm-white/10 border-t border-b border-warm-white/10">
                {practiceAreas.map((area, idx) => {
                  const isOpen = activeArea === idx;
                  return (
                    <div key={area.title} className="py-6 text-left">
                      <button
                        onClick={() => setActiveArea(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center group focus:outline-none transition-colors duration-300"
                      >
                        <div className="flex items-center gap-6">
                          <span className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${isOpen ? "text-soft-beige" : "text-warm-white/30"}`}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className={`font-serif font-light text-lg md:text-xl uppercase tracking-wide transition-colors duration-300 ${isOpen ? "text-soft-beige" : "text-warm-white/70 group-hover:text-warm-white"}`}>
                            {area.title}
                          </span>
                        </div>
                        
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-soft-beige text-soft-beige rotate-45" : "border-warm-white/10 text-warm-white/40 group-hover:border-warm-white/30 group-hover:text-warm-white"}`}>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300">
                            <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-12"
                          >
                            <div className="flex flex-col gap-6 max-w-2xl">
                              <p className="font-sans text-warm-white/60 text-sm leading-relaxed font-light">
                                {area.desc}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 pt-2">
                                {area.focus.map((item) => (
                                  <span key={item} className="font-mono text-[9px] tracking-wider uppercase bg-warm-white/5 border border-warm-white/10 px-3 py-1.5 rounded-full text-soft-beige">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Reveal>
            <div className="border border-warm-white/10 bg-matte-black/40 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex flex-col gap-2 text-left">
                <span className="text-soft-beige font-serif text-lg leading-none -mb-1">*</span>
                <h3
                  className="font-serif font-light text-warm-white uppercase tracking-wider"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", lineHeight: 1.2 }}
                >
                  Let's craft the story
                  <br />
                  of your space.
                </h3>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 border border-soft-beige/30 text-soft-beige hover:bg-soft-beige hover:text-black transition-all duration-500 px-8 py-4 text-caption uppercase tracking-wider text-xs font-mono shrink-0"
              >
                Get in Touch
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </Link>
            </div>
          </Reveal>

        </div>
      </section>
    </main>
  );
}
