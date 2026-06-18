"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface ProjectData {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  statement: string;
  description: string;
  heroImage: string;
  images: {
    src: string;
    caption: string;
    aspect: "portrait" | "landscape";
  }[];
  materials: string[];
  disciplines: string[];
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

function RevealImage({ src, alt, aspect }: { src: string; alt: string; aspect: "portrait" | "landscape" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative overflow-hidden ${
        aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover img-grain"
        sizes="(max-width: 768px) 100vw, 66vw"
      />
      <div className="absolute inset-0 bg-matte-black/5" />
    </motion.div>
  );
}

export default function ProjectPage({ project }: { project: ProjectData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <article className="bg-matte-black text-warm-white">
      {/* Hero */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0 scale-105" style={{ y: heroY }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover img-grain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-matte-black/30 via-matte-black/10 to-matte-black/80" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 lg:px-16"
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-caption text-soft-beige/70 mb-4"
            >
              {project.category} · {project.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif font-light text-warm-white"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
            >
              {project.title}
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Statement */}
      <section className="py-20 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-2">
              <p className="text-caption text-soft-beige/40 mt-2">Overview</p>
            </div>
            <div className="md:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif font-light text-warm-white/90"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
              >
                {project.statement}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-sans text-warm-gray text-sm leading-relaxed font-light mt-8"
              >
                {project.description}
              </motion.p>
            </div>
            <div className="md:col-span-3 flex flex-col gap-8">
              <div>
                <p className="text-caption text-soft-beige/40 mb-3">Disciplines</p>
                <div className="flex flex-col gap-2">
                  {project.disciplines.map((d) => (
                    <p key={d} className="font-sans text-warm-white/60 text-xs font-light">
                      {d}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-caption text-soft-beige/40 mb-3">Location</p>
                <p className="font-sans text-warm-white/60 text-xs font-light">{project.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {project.images.map((img, i) => {
            const isFullWidth = i % 5 === 0;
            const isLeft = i % 5 === 1 || i % 5 === 3;

            return (
              <div key={i}>
                {isFullWidth ? (
                  <div>
                    <RevealImage src={img.src} alt={img.caption} aspect="landscape" />
                    <p className="text-caption text-warm-gray/40 mt-3">{img.caption}</p>
                  </div>
                ) : (
                  <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
                    <div className="w-full md:w-2/3">
                      <RevealImage src={img.src} alt={img.caption} aspect={img.aspect} />
                      <p className="text-caption text-warm-gray/40 mt-3">{img.caption}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Materials palette */}
      <section className="border-t border-warm-white/6 py-16 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p className="text-caption text-soft-beige/40 mb-4">Material Palette</p>
              <p className="font-sans text-warm-gray text-xs leading-relaxed font-light">
                Each material was selected not just for appearance, but for how it ages,
                holds light, and communicates atmosphere.
              </p>
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap gap-3">
                {project.materials.map((mat) => (
                  <motion.span
                    key={mat}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-sans text-warm-white/70 text-xs font-light border border-warm-white/10 px-4 py-2"
                  >
                    {mat}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next / Prev navigation */}
      {(project.prev || project.next) && (
        <section className="border-t border-warm-white/6 py-12 px-6 md:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {project.prev ? (
              <Link
                href={project.prev.href}
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span className="font-sans text-xs font-light">{project.prev.title}</span>
              </Link>
            ) : <div />}

            <Link
              href="/work"
              className="text-caption text-warm-gray/40 hover:text-warm-white transition-colors duration-300"
            >
              All Projects
            </Link>

            {project.next ? (
              <Link
                href={project.next.href}
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <span className="font-sans text-xs font-light">{project.next.title}</span>
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}
    </article>
  );
}
