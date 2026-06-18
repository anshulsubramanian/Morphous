"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BrandingLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="bg-[#EAE9E8] py-10 md:py-16 overflow-hidden w-full border-t border-[#111111]/5 flex items-center justify-center select-none"
    >
      <div className="w-full text-center">
        <motion.h1
          initial={{ y: "80%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light uppercase tracking-tighter text-[#111111] leading-none text-center inline-block w-full whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 13vw, 250px)" }}
        >
          Studio Morphous
        </motion.h1>
      </div>
    </div>
  );
}
