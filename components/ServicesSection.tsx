"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Concept & Creative Direction",
    cover: "/assets/services/creative_direction.png",
  },
  {
    number: "02",
    title: "Interior Design",
    cover: "/assets/services/interior_design.png",
  },
  {
    number: "03",
    title: "Interior Architecture",
    cover: "/assets/services/interior_architecture.png",
  },
  {
    number: "04",
    title: "Product Design",
    cover: "/assets/services/product_design.png",
  },
  {
    number: "05",
    title: "3D Visualization",
    cover: "/assets/services/visualization.png",
  },
  {
    number: "06",
    title: "Technical Documentation",
    cover: "/assets/services/technical_docs.png",
  },
  {
    number: "07",
    title: "Material & Finish Strategy",
    cover: "/assets/services/material_strategy.png",
  },
  {
    number: "08",
    title: "Procurement & Project Management",
    cover: "/assets/services/procurement.png",
  },
  {
    number: "09",
    title: "Turnkey Delivery",
    cover: "/assets/services/turnkey.png",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardWidth(200);
      } else if (window.innerWidth < 1024) {
        setCardWidth(260);
      } else {
        setCardWidth(320);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Autoplay timer changing active index every 1s, pausing on user hover, resetting on index change
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  const handleDrag = (event: any, info: any) => {
    setDragOffset(info.offset.x);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 60;
    setDragOffset(0);
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  const scrollProgress = (activeIndex / (services.length - 1)) * 100;

  return (
    <section
      ref={containerRef}
      id="services"
      className="bg-black text-warm-white py-24 md:py-36 px-6 md:px-10 lg:px-16 relative w-full overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Top-Left Header and Top-Right Sub-Copy/Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-white/10 pb-8 w-full gap-6">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-soft-beige font-serif text-lg leading-none -mb-1">*</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-warm-white leading-none">
              Our Services
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-5">
            <p className="text-[10px] tracking-[0.2em] uppercase font-light text-warm-white/60 leading-relaxed font-sans max-w-sm md:text-right">
              Form. Feeling. Function. — From concept sketch to turnkey realization.
            </p>
            
            {/* Carousel navigation controls */}
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-warm-white/40 uppercase">
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
          </div>
        </div>

        {/* 3D Wheel Carousel Container */}
        <motion.div
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full h-[50vh] md:h-[58vh] min-h-[400px] flex items-center justify-center select-none pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
        >
          {services.map((service, index) => {
            // Calculate distance around the wheel
            let diff = index - activeIndex;
            const N = services.length;
            if (diff < -Math.floor(N / 2)) diff += N;
            if (diff > Math.floor(N / 2)) diff -= N;

            // Only render visible items in window to optimize performance
            const isVisible = Math.abs(diff) <= 2;
            const isActive = diff === 0;

            const x = diff * cardWidth + dragOffset;
            const scale = 1 - Math.abs(diff) * 0.12;
            const rotateY = diff * -15;
            const z = -Math.abs(diff) * 120;
            const opacity = isVisible ? (1 - Math.abs(diff) * 0.35) : 0;

            return (
              <motion.div
                key={index}
                style={{
                  position: "absolute",
                  transformStyle: "preserve-3d",
                }}
                initial={false}
                animate={{
                  x,
                  scale,
                  rotateY,
                  z,
                  opacity,
                  borderColor: isActive ? "rgba(216, 199, 181, 0.6)" : "rgba(245, 242, 237, 0.1)",
                  boxShadow: isActive ? "0 10px 30px -5px rgba(216, 199, 181, 0.06)" : "0 0px 0px rgba(0, 0, 0, 0)",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                transition={{
                  x: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  scale: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  rotateY: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  z: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  borderColor: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  boxShadow: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
                  opacity: { type: "tween", ease: "easeInOut", duration: 0.18 },
                }}
                onClick={() => setActiveIndex(index)}
                className="w-[220px] md:w-[260px] lg:w-[280px] border relative overflow-hidden group flex flex-col justify-between p-8 cursor-pointer h-[42vh] md:h-[50vh] min-h-[350px] bg-matte-black"
              >
                {/* 1. Base Grayscale Image (Always Underneath) */}
                <img
                  src={service.cover}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.15] brightness-[0.25] pointer-events-none select-none"
                />

                {/* 2. Color Highlight Image (Opacity Animated over 0.85s in perfect sync) */}
                <motion.img
                  src={service.cover}
                  alt={service.title}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    type: "tween",
                    ease: [0.16, 1, 0.3, 1],
                    duration: 0.5,
                  }}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale-0 contrast-[1.15] brightness-[0.55] pointer-events-none select-none"
                />

                {/* Card Number & Title (Colors Animated in sync) */}
                <div className="z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                  <motion.span
                    initial={false}
                    animate={{
                      color: isActive ? "#D8C7B5" : "rgba(245, 242, 237, 0.4)",
                    }}
                    transition={{
                      type: "tween",
                      ease: [0.16, 1, 0.3, 1],
                      duration: 0.5,
                    }}
                    className="font-serif text-lg"
                  >
                    {service.number}
                  </motion.span>
                  
                  <motion.h3
                    initial={false}
                    animate={{
                      color: isActive ? "#F5F2ED" : "rgba(245, 242, 237, 0.5)",
                    }}
                    transition={{
                      type: "tween",
                      ease: [0.16, 1, 0.3, 1],
                      duration: 0.5,
                    }}
                    className="font-serif font-light text-xs md:text-sm tracking-[0.16em] uppercase mt-2 max-w-[180px] leading-relaxed text-left"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Subtle border overlay inside card */}
                <div className="absolute inset-0 border border-warm-white/5 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Scroll/Index Progress Bar */}
        <div className="flex items-center gap-6 w-full text-[9px] font-mono tracking-[0.2em] text-warm-white/40 uppercase relative">
          <span className="w-8 text-left">01</span>
          
          <div className="flex-1 h-px bg-warm-white/15 relative">
            {/* Scroll indicator bar */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-soft-beige"
              animate={{ width: `${scrollProgress}%` }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            />
            {/* Sliding circular node */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-soft-beige"
              animate={{ left: `calc(${scrollProgress}% - 3px)` }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            />
          </div>

          <span className="w-8 text-right">09</span>
        </div>

      </div>
    </section>
  );
}
