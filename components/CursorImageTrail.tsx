"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailItem {
  id: string;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

const trailImages = [
  "/assets/OfficeRedesign/cover.jpg",
  "/assets/LuxuryHomeRedesign/cover.jpg",
  "/assets/work/cover.jpg",
  "/assets/BotanicalGarden/bg_forest.jpg",
  "/assets/Regal/regal_cover.jpg",
];

export default function CursorImageTrail() {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Get position relative to the container
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from last spawn position
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Ebb & Flo frequency is ~110px
      if (distance > 115) {
        const id = `${Date.now()}-${Math.random()}`;
        const src = trailImages[imageIndex.current];
        
        // Random rotation between -12 and +12 degrees
        const rotation = (Math.random() - 0.5) * 24;

        setTrail((prev) => [
          ...prev,
          { id, x, y, src, rotation },
        ]);

        // Cycle through images
        imageIndex.current = (imageIndex.current + 1) % trailImages.length;
        lastPosition.current = { x, y };
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Periodically clean up old items to keep state light
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        if (prev.length > 8) {
          return prev.slice(prev.length - 8);
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10"
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.img
            key={item.id}
            src={item.src}
            alt=""
            initial={{
              opacity: 0,
              scale: 0.5,
              x: item.x - 115, // center the 230px wide image on cursor
              y: item.y - 76,  // center the 153px high image on cursor
              rotate: item.rotation - 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: item.rotation,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.45 },
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              mass: 0.6,
            }}
            onAnimationComplete={() => {
              // Remove item from trail after fadeout
              setTimeout(() => {
                setTrail((prev) => prev.filter((t) => t.id !== item.id));
              }, 600);
            }}
            className="absolute w-[230px] h-[153px] object-cover rounded-[10px] pointer-events-none shadow-xl border border-warm-white/10"
            style={{
              willChange: "transform, opacity",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
