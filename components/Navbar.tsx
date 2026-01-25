"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Let's Talk", href: "#lets-talk" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check which section is in view for anchor links
      if (pathname === "/") {
        const sections = ["about", "lets-talk"];
        const scrollPosition = window.scrollY + 100;
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
        
        // If at top, no active section
        if (window.scrollY < 100) {
          setActiveSection("");
        }
      }
    };
    
    // Check initial scroll position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  
  // Set active section based on pathname
  useEffect(() => {
    if (pathname === "/work") {
      setActiveSection("/work");
    } else if (pathname === "/about") {
      setActiveSection("/about");
    } else if (pathname === "/") {
      setActiveSection("");
    } else {
      setActiveSection("");
    }
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a page link (starts with /), use Next.js navigation
    if (href.startsWith("/")) {
      e.preventDefault();
      window.location.href = href;
      return;
    }
    
    // Otherwise, it's an anchor link for smooth scrolling
    e.preventDefault();
    
    // If we're on a different page and clicking an anchor link, navigate to home first
    if (pathname !== "/" && href.startsWith("#")) {
      // Store the hash to scroll to after navigation
      sessionStorage.setItem("scrollTo", href);
      window.location.href = "/";
      return;
    }
    
    // If we're on the home page, scroll to the section
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 64; // 64px for navbar height
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-md ${
        isScrolled ? "border-b border-gray-800" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto pl-2 sm:pl-4 lg:pl-6 pr-8 sm:pr-12 lg:pr-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 -ml-2 sm:-ml-4">
            <a
              href="/"
              onClick={(e) => {
                if (pathname !== "/") {
                  e.preventDefault();
                  window.location.href = "/";
                }
              }}
              className="flex items-center"
            >
              <Image
                src="/assets/images/SM_Transparent.png"
                alt="Company Logo"
                width={100}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`text-white font-bold px-3 py-2 text-sm transition-colors hover:opacity-80 relative ${
                      isActive ? "underline decoration-2 underline-offset-4" : ""
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleClick(e, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block text-white font-bold px-3 py-3 text-base transition-colors hover:opacity-80 ${
                      isActive ? "underline decoration-2 underline-offset-4" : ""
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

