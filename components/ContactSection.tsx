"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("_to", "studiomorphous@gmail.com");
    formData.append("_subject", "New Inquiry from Studio Morphous Website");

    try {
      const response = await fetch("https://formspree.io/f/xwvvyjpg", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        setFormMessage("Thank you. We'll be in touch soon.");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => { setFormStatus("idle"); setFormMessage(""); }, 6000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Something went wrong. Email us at studiomorphous@gmail.com");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-matte-black text-warm-white py-24 md:py-36 px-6 md:px-10 lg:px-16 relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif font-light text-3xl md:text-4xl text-warm-white">
              Contact Form
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-warm-white/70 text-[10px]">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                    className="bg-transparent border-b border-warm-white/15 text-warm-white font-sans text-sm font-light py-3 placeholder-warm-white/45 focus:outline-none focus:border-soft-beige transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-warm-white/70 text-[10px]">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                    className="bg-transparent border-b border-warm-white/15 text-warm-white font-sans text-sm font-light py-3 placeholder-warm-white/45 focus:outline-none focus:border-soft-beige transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-warm-white/70 text-[10px]">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="bg-transparent border-b border-warm-white/15 text-warm-white font-sans text-sm font-light py-3 placeholder-warm-white/45 focus:outline-none focus:border-soft-beige transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-caption text-warm-white/70 text-[10px]">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91-XXXXX-XXXXX"
                    className="bg-transparent border-b border-warm-white/15 text-warm-white font-sans text-sm font-light py-3 placeholder-warm-white/45 focus:outline-none focus:border-soft-beige transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-caption text-warm-white/70 text-[10px]">How can we help?</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project, vision, or inquiry..."
                  className="bg-transparent border-b border-warm-white/15 text-warm-white font-sans text-sm font-light py-3 placeholder-warm-white/45 focus:outline-none focus:border-soft-beige transition-colors duration-300 resize-none"
                />
              </div>

              {formMessage && (
                <p className={`font-sans text-xs ${formStatus === "success" ? "text-soft-beige" : "text-red-400/80"}`}>
                  {formMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="mt-4 border border-soft-beige/40 text-soft-beige hover:bg-soft-beige hover:text-matte-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 px-8 py-4 text-caption self-start"
              >
                {formStatus === "submitting" ? "Scheduling..." : "Schedule a Call"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Column: Contact info cards */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-caption text-warm-white/70 text-[10px] mb-2">Say Hello</h3>
              <a
                href="mailto:studiomorphous@gmail.com"
                className="font-serif font-light text-2xl md:text-3xl hover:text-soft-beige transition-colors duration-300 block"
              >
                studiomorphous@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-caption text-warm-white/70 text-[10px] mb-1">Call Us</h3>
              <a
                href="tel:+919782896600"
                className="font-serif font-light text-xl text-warm-white hover:text-soft-beige transition-colors duration-300 block"
              >
                +91 9782896600
              </a>
            </div>

            <div className="flex flex-col items-start gap-4">
              <h3 className="text-caption text-warm-white/70 text-[10px]">Get Social</h3>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/studiomorphous/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-sm text-warm-white/70 hover:text-soft-beige transition-colors duration-300"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/919782896600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-sm text-warm-white/70 hover:text-soft-beige transition-colors duration-300"
                >
                  Whatsapp
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
