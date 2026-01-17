"use client";

import Navbar from "@/components/Navbar";
import WorkSection from "@/components/WorkSection";
import CraftSection from "@/components/CraftSection";
import Link from "next/link";
import Image from "next/image";

export default function WorkPage() {
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
      
      {/* Work Section */}
      <WorkSection />

      {/* Divider */}
      <div className="bg-white border-t border-gray-300 py-8"></div>

      {/* Craft Section */}
      <CraftSection />

      {/* Projects Grid Section */}
      <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* The Garden Room */}
            <Link
              href="/tgr-project"
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-300 cursor-pointer h-[600px] flex flex-col hover:opacity-70"
            >
              {/* Image - 60% */}
              <div className="relative w-full flex-[0_0_60%] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/assets/images/Work1.png"
                  alt="The Garden Room"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Text - 40% */}
              <div className="p-6 flex flex-col justify-center flex-[0_0_40%]">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                  The Garden Room
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                  The Garden Room is a celebration of natural elegance a collection where modern form meets the sculptural poetry of the desert.
                </p>
              </div>
              {/* View More overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">View More</span>
              </div>
            </Link>

            {/* White Studios */}
            <Link
              href="/white-studios-project"
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-300 cursor-pointer h-[600px] flex flex-col hover:opacity-70"
            >
              {/* Image - 60% */}
              <div className="relative w-full flex-[0_0_60%] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/assets/images/Work2.png"
                  alt="White Studios"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Text - 40% */}
              <div className="p-6 flex flex-col justify-center flex-[0_0_40%]">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                  White Studios
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                  Light & Life is a collaborative exploration by Studio Morphous and White Studios — a collection rooted in the question: what if light could grow, and life could glow?
                </p>
              </div>
              {/* View More overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">View More</span>
              </div>
            </Link>

            {/* Kanha Decor */}
            <Link
              href="/kahna-project"
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-300 cursor-pointer h-[600px] flex flex-col hover:opacity-70"
            >
              {/* Image - 60% */}
              <div className="relative w-full flex-[0_0_60%] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/assets/images/Work5.png"
                  alt="Kanha Decor"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Text - 40% */}
              <div className="p-6 flex flex-col justify-center flex-[0_0_40%]">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                  Kanha Decor
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                  This collection explores the silent choreography of the human condition. Stripped of identity and reduced to a single, continuous line, these figures embody the universal struggle between gravity and will.
                </p>
              </div>
              {/* View More overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">View More</span>
              </div>
            </Link>

            {/* Contours of Being */}
            <Link
              href="/contours-of-being-project"
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-300 cursor-pointer h-[600px] flex flex-col hover:opacity-70"
            >
              {/* Image - 60% */}
              <div className="relative w-full flex-[0_0_60%] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/assets/images/Work4.png"
                  alt="Contours of Being"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Text - 40% */}
              <div className="p-6 flex flex-col justify-center flex-[0_0_40%]">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                  Contours of Being
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed line-clamp-3">
                  Contours of Being captures the quiet complexity of the human experience. Its layered forms flow like an emotional landscape, shaped by time, change, and the invisible forces that move us.
                </p>
              </div>
              {/* View More overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">View More</span>
              </div>
            </Link>

            {/* Inaaya Home */}
            <Link
              href="/inaaya-project"
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-300 cursor-pointer h-[600px] flex flex-col hover:opacity-70"
            >
              {/* Image - 60% */}
              <div className="relative w-full flex-[0_0_60%] flex items-center justify-center bg-gray-50 p-4">
                <Image
                  src="/assets/images/innaya-rectangle-16.png"
                  alt="Inaaya Home - SĀMARA Collection"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Text - 40% */}
              <div className="p-6 flex flex-col justify-center flex-[0_0_40%]">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
                  Inaaya Home
                </h3>
                <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-2 overflow-hidden">
                  <p className="font-semibold">SĀMARA – Bedroom Collection for Inaaya Home</p>
                  <p className="line-clamp-3">
                    The SĀMARA Collection is defined by simplicity, balance, and material expression. Clean, sculptural forms are paired with a thoughtful play of finishes—soft upholstery, warm metallic accents, and refined stone surfaces. Each piece is minimal yet expressive, allowing texture and proportion to create quiet impact.
                  </p>
                </div>
              </div>
              {/* View More overlay on hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xl md:text-2xl font-semibold">View More</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

