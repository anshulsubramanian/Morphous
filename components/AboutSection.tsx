"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [revealProgress, setRevealProgress] = useState(0.4); // Start at 40%
  const imagesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imagesRef.current) return;

      const rect = imagesRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if images are visible in viewport
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Calculate how much of the images container is visible
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
        const visibleHeight = visibleBottom - visibleTop;
        const visibilityRatio = visibleHeight / rect.height;
        
        // Gradually reveal from 40% to 100% as we scroll
        // When 70% visible, start revealing, fully revealed at 100% visible
        if (visibilityRatio > 0.7) {
          const progress = Math.min((visibilityRatio - 0.7) / 0.3, 1); // 0 to 1 as visibility goes from 0.7 to 1.0
          const revealAmount = 0.4 + (progress * 0.6); // From 40% to 100%
          setRevealProgress((prev) => Math.max(prev, revealAmount)); // Only increase, never decrease
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <div>A DESIGN PRACTICE</div>
              <div>SHAPED BY</div>
              <div>ATTENTION.</div>
            </h1>
          </div>
          <div className="flex items-start justify-end">
            <div className="max-w-md">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Studio Morphous is a design practice shaping furniture, objects, and spatial products with feeling. We work from concept to creation, from CAD to craftsmanship, building pieces that function, last, and quietly belong.
              </p>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div
          ref={imagesRef}
          className="flex flex-col md:flex-row justify-end gap-4 md:gap-0 transition-all duration-1000 ease-in-out w-full"
        >
          <div className="relative w-full md:w-96 lg:w-[480px] aspect-[3/4] overflow-hidden mx-auto md:mx-0">
            <div
              className="relative w-full h-full transition-all duration-1000 ease-in-out"
              style={{
                clipPath: `inset(0 0 ${(1 - revealProgress) * 100}% 0)`,
              }}
            >
              <Image
                src="/assets/images/AboutImg1Ex.png"
                alt="About Image 1"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="relative w-full md:w-96 lg:w-[480px] aspect-[3/4] overflow-hidden mx-auto md:mx-0">
            <div
              className="relative w-full h-full transition-all duration-1000 ease-in-out"
              style={{
                clipPath: `inset(0 0 ${(1 - revealProgress) * 100}% 0)`,
              }}
            >
              <Image
                src="/assets/images/AboutImg2Ex.png"
                alt="About Image 2"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

