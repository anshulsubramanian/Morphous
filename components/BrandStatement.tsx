"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="bg-black text-warm-white px-6 md:px-12 lg:px-24 py-24 md:py-36 flex items-center justify-center border-y border-warm-white/10"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light leading-snug tracking-tight text-center"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)" }}
        >
          We craft the signature objects, spaces, and narratives that define evolved living.
        </motion.h2>
      </div>
    </section>
  );
}

