"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      const scrollTo = sessionStorage.getItem("scrollTo");
      if (scrollTo) {
        sessionStorage.removeItem("scrollTo");
        const timer = setTimeout(() => {
          const el = document.querySelector(scrollTo);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleAnchor = (href: string) => {
    if (!href.startsWith("#")) return;
    if (pathname !== "/") {
      sessionStorage.setItem("scrollTo", href);
      window.location.href = "/";
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-matte-black/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20 relative">
          {/* Logo */}
          <Link
            href="/"
            className="text-warm-white font-serif text-lg tracking-[0.15em] font-light hover:text-soft-beige transition-colors duration-300"
          >
            STUDIO MORPHOUS
          </Link>

          {/* Centered SM Monogram */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-auto">
            <Link
              href="/"
              className="text-warm-white font-serif text-lg tracking-[0.2em] font-light hover:text-soft-beige transition-colors duration-300"
            >
              SM
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-caption">
            {navItems.map((item, index) => {
              const isActive =
                item.href.startsWith("/") && pathname === item.href;
              const element = item.href.startsWith("#") ? (
                <button
                  key={item.name}
                  onClick={() => handleAnchor(item.href)}
                  className={`text-caption transition-colors duration-300 link-hover ${
                    isActive ? "text-warm-white font-normal" : "text-warm-white/60 hover:text-warm-white"
                  }`}
                >
                  {item.name.toUpperCase()}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-caption transition-colors duration-300 link-hover ${
                    isActive
                      ? "text-warm-white font-normal"
                      : "text-warm-white/60 hover:text-warm-white"
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              );

              if (index === 0) {
                return element;
              }

              return (
                <div key={item.name} className="flex items-center gap-5">
                  <span className="text-warm-white/20 select-none pointer-events-none text-[10px] font-sans font-light">/</span>
                  {element}
                </div>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-warm-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-warm-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-warm-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-matte-black flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-warm-white font-serif text-lg tracking-[0.15em] font-light"
              >
                STUDIO MORPHOUS
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-warm-white/60 hover:text-warm-white"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.5 }}
                >
                  {item.href.startsWith("#") ? (
                    <button
                      onClick={() => handleAnchor(item.href)}
                      className="font-serif text-5xl text-warm-white/80 hover:text-warm-white font-light italic transition-colors duration-300 text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-5xl text-warm-white/80 hover:text-warm-white font-light italic transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-12">
              <p className="text-caption text-warm-gray">
                studiomorphous@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
