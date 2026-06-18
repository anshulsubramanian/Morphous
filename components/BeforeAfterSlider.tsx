"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/assets/images/AboutImg1Ex.png",
  afterImage = "/assets/images/AboutImg1.png",
  beforeLabel = "RAW STRUCTURE / PROCESS STAGE",
  afterLabel = "FINISHED ATMOSPHERE / DESIGN",
  height = "h-[50vh] md:h-[65vh]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-10%" });

  // Handle automatic swipe reveal on scroll-in to invite interaction
  useEffect(() => {
    if (isInView) {
      // Slow initial swipe: starts at 50, goes to 30, then 70, then settles at 50
      const sequence = [
        { val: 50, delay: 500 },
        { val: 35, delay: 1000 },
        { val: 65, delay: 1700 },
        { val: 50, delay: 2400 },
      ];
      
      sequence.forEach((step) => {
        setTimeout(() => {
          if (!isDragging) {
            setSliderPosition(step.val);
          }
        }, step.delay);
      });
    }
  }, [isInView]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <div ref={inViewRef} className="w-full max-w-7xl mx-auto py-12 md:py-20 relative px-6 md:px-10 lg:px-16">
      
      {/* Description header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-caption text-warm-gray text-[0.6rem] tracking-[0.2em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-soft-beige" />
            Interactive Spatial Study
          </span>
          <h3 className="font-serif font-light text-matte-black text-2xl md:text-3xl mt-2">
            The Anatomy of a <em>Finished Space</em>
          </h3>
        </div>
        <p className="font-sans text-warm-gray text-xs leading-relaxed font-light max-w-sm">
          Slide the cursor horizontally to reveal the creative dialogue between raw architectural structure and spatial material finish.
        </p>
      </div>

      {/* Main Slider Container */}
      <div
        ref={containerRef}
        className={`relative w-full ${height} overflow-hidden slider-container bg-stone-100 select-none cursor-ew-resize`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        
        {/* Before Image (Background - Behind) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={beforeImage}
            alt="Before Spatial Design"
            fill
            className="object-cover img-grain pointer-events-none"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-matte-black/10" />
          
          {/* Label overlay before (left bottom) */}
          <div className="absolute bottom-5 left-5 z-10 bg-matte-black/50 backdrop-blur-sm border border-warm-white/10 px-4 py-2 pointer-events-none transition-opacity duration-300">
            <span className="text-caption text-warm-white/90 text-[0.55rem] tracking-[0.18em]">
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* After Image (Foreground - Clipped width) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src={afterImage}
            alt="After Finished Design"
            fill
            className="object-cover img-grain pointer-events-none"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-matte-black/5" />
          
          {/* Label overlay after (right bottom) */}
          <div className="absolute bottom-5 right-5 z-10 bg-matte-black/50 backdrop-blur-sm border border-warm-white/10 px-4 py-2 pointer-events-none transition-opacity duration-300">
            <span className="text-caption text-soft-beige text-[0.55rem] tracking-[0.18em]">
              {afterLabel}
            </span>
          </div>
        </div>

        {/* Vertical divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-soft-beige z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Central Handle Dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-matte-black border border-soft-beige flex items-center justify-center shadow-lg transition-transform duration-300"
            style={{ transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})` }}
          >
            <div className="flex gap-1.5 items-center">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5L5 9" stroke="#D8C7B5" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="#D8C7B5" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Interactive hover instruction overlay (Fades on drag or settle) */}
        {sliderPosition === 50 && !isDragging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-matte-black/20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 }}
              className="bg-matte-black/85 backdrop-blur-md border border-soft-beige/20 text-soft-beige px-6 py-4 rounded-none text-center shadow-2xl"
            >
              <p className="text-caption text-[0.6rem] tracking-[0.2em] mb-1 text-soft-beige">
                SPATIAL TRANSFORMATION
              </p>
              <p className="font-serif italic text-warm-white text-sm">
                Drag the slider to transform the room
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
