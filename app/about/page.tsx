"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Back Button */}
      <nav className="fixed top-20 left-6 z-50">
        <Link href="/">
          <button className="px-6 py-3 bg-black/90 backdrop-blur-sm border border-white/30 rounded-full hover:bg-black transition-colors flex items-center gap-2 shadow-lg text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase mb-8">
            STUDIO MORPHOUS
          </h1>
          <div className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-4xl mx-auto">
            <p className="mb-2">It started with a sketch, a material, a shared question:</p>
            <p className="mb-2">Can design feel like a gesture?</p>
            <p>We've been building answers ever since.</p>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="border-t border-white w-full max-w-7xl mx-auto"></div>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Side - Title and Intro */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
                Services
              </h2>
              <p className="text-lg md:text-xl text-white leading-relaxed">
                We offer a comprehensive range of design services, carefully tailored to meet each client's unique needs and their project budgets.
              </p>
            </div>

            {/* Right Side - Service List */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Concept Design for Furniture & Decor
                </h3>
                <p className="text-lg text-white leading-relaxed">
                  Tailored designs that reflect individual style and enhance the unique character of any space.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Design Direction & Styling
                </h3>
                <p className="text-lg text-white leading-relaxed">
                  Creative direction, material moodboards, visual language, and space styling to bring cohesion across your physical and digital touchpoints.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Technical Drawings & Prototypes
                </h3>
                <p className="text-lg text-white leading-relaxed">
                  Providing detailed production drawings and developing prototypes to ensure quality and precision in the final product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

