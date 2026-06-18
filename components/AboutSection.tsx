"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-warm-white text-matte-black py-28 md:py-40"
    >
      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">

        {/* Label */}
        <Reveal>
          <p className="text-caption text-warm-gray mb-12 md:mb-16">
            About the Studio
          </p>
        </Reveal>

        {/* Main statement */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-32">
          <div className="md:col-span-8">
            <Reveal delay={0.1}>
              <h2
                className="font-serif font-light text-matte-black leading-[1.08]"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.02em" }}
              >
                We explore the intersection of{" "}
                <em>furniture, interiors,</em> materiality, and sculptural form —
                creating spaces and objects that live beyond trends.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end gap-6">
            <Reveal delay={0.2}>
              <div className="divider mb-6" style={{ background: "rgba(15,15,15,0.15)" }} />
              <p className="font-sans text-warm-gray text-sm leading-relaxed font-light">
                Studio Morphous is a multidisciplinary design practice based in Gurugram, India.
                We work across product design, furniture, interiors, and spatial styling — always
                guided by material sensitivity and quiet confidence.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="font-sans text-warm-gray text-sm leading-relaxed font-light">
                Our work is shaped by a deep reverence for craft, a fascination with texture, and
                the belief that truly exceptional design communicates before words can.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Image + pillars grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32">
          {/* Large image */}
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
              <Image
                src="/assets/images/AboutImg1.png"
                alt="Studio Morphous workspace"
                fill
                className="object-cover img-grain"
              />
              <div className="absolute inset-0 bg-matte-black/8" />
            </div>
          </Reveal>

          {/* Right column: stacked image + pillars */}
          <div className="flex flex-col gap-6 md:gap-8">
            <Reveal delay={0.2}>
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <Image
                  src="/assets/images/AboutImg2.png"
                  alt="Studio Morphous design process"
                  fill
                  className="object-cover img-grain"
                />
                <div className="absolute inset-0 bg-matte-black/8" />
              </div>
            </Reveal>

            {/* Design pillars */}
            <div className="grid grid-cols-2 gap-px bg-matte-black/10">
              {[
                { label: "Material Sensitivity", desc: "Stone, metal, wood, patina — each surface is chosen with intention." },
                { label: "Sculptural Form", desc: "Objects that hold space, carry weight, and earn presence." },
                { label: "Warm Minimalism", desc: "Restraint without coldness. Simplicity that breathes." },
                { label: "Timeless Craft", desc: "Designed to outlast trends. Built to last generations." },
              ].map((pillar, i) => (
                <Reveal key={pillar.label} delay={0.1 + i * 0.07}>
                  <div className="bg-warm-white p-5 md:p-6">
                    <p className="font-sans text-matte-black text-xs font-medium tracking-widest uppercase mb-2">
                      {pillar.label}
                    </p>
                    <p className="font-sans text-warm-gray text-xs leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy quote */}
        <Reveal delay={0.1}>
          <div className="border-l-2 border-soft-beige pl-8 md:pl-12 py-4 max-w-3xl">
            <blockquote
              className="font-serif font-light italic text-matte-black leading-relaxed"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              "Material. Form. Atmosphere. We design with depth — shaping objects and
              experiences that live with intention."
            </blockquote>
            <p className="font-sans text-warm-gray text-xs tracking-widest uppercase mt-6">
              Studio Morphous — Design Philosophy
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
