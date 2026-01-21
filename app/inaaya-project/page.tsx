"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function InaayaProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function for asset paths
  const asset = (path: string) => `/assets/Inaaya/${path}`;

  const products = [
    {
      name: "Opal",
      description: "A soft, sculpted bed defined by gentle curves and layered upholstery. Halo balances comfort and character through subtle paneling and plush forms—creating a calm, cocooning centerpiece for the bedroom.",
      images: [
        asset("Opal_1.png"),
        asset("Opal_2.png"),
        asset("Opal_4.png"),
      ],
    },
    {
      name: "Strata",
      description: "A sculpted storage piece defined by rhythmic vertical fluting and a warm metallic finish. Arc Credenza brings quiet luxury and material depth to the collection, balancing function with refined presence.",
      images: [
        asset("Strata_2.png"),
        asset("Strata_3.png"),
        asset("Strata_4.png"),
      ],
    },
    {
      name: "Orb Bedsider",
      description: "A compact bedside piece defined by soft geometry and refined finishes. The sculpted brass pull becomes a quiet focal point, balancing simplicity with tactile elegance",
      images: [
        asset(" Orb bedsider_1.png"),
        asset(" Orb bedsider_2.png"),
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Back Button */}
      <nav className="fixed top-16 sm:top-20 left-4 sm:left-6 z-50">
        <Link href="/work">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-black/90 backdrop-blur-sm border border-white/30 rounded-full hover:bg-black transition-colors flex items-center gap-2 shadow-lg text-white text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section
        className="pt-32 pb-16 px-4 relative bg-cover bg-center bg-black"
        style={{
          backgroundImage: `url('/assets/images/inaaya_cover.png')`,
          minHeight: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>

      {/* Product Collection */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-24">
          {products.map((product, index) => (
            <article
              key={index}
              className="bg-black"
            >
              {/* Product Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                {product.name}
              </h2>
              
              {/* Product Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-4xl">
                {product.description}
              </p>

              {/* Product Images */}
              {product.images.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={image}
                        alt={`${product.name} view ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Let's Talk CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
          style={{
            background: "linear-gradient(to right, #1e3a8a 0%, #581c87 50%, #4c1d95 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-300/50 bg-purple-500/20 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm">Available to work with you</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Let's design next one together
          </h2>

          <Link href="/#lets-talk">
            <button className="bg-white text-black hover:bg-white/90 rounded-full text-lg px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 border border-gray-200">
              Let's talk →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

