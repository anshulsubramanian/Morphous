"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function WhiteStudiosProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function for asset paths
  const asset = (path: string) => `/assets/WhiteStudios/${path}`;

  const products = [
    {
      name: "Bamboo Lamp",
      description:
        "Bamboo brings together light and life in one form. Its metal body, hand-finished in deep green, holds warm alabaster panels that diffuse a soft, natural glow. An integrated planter adds a living accent. A quiet nod to nature within a crafted, minimal structure.",
      images: [asset("bamboo-1.png"), asset("bamboo-2.png"), asset("bamboo-3.png")],
    },
    {
      name: "Bloom",
      description:
        "Bloom is a sculptural floor lamp where metal meets life. Its cast-metal base anchors five elevated bowls, three illuminated, two cradling living greens. Contrasting finishes play between rough and reflective, solid and soft. A composition that feels both grounded and growing.",
      images: [asset("bloom-1.png"), asset("bloom-2.png"), asset("bloom-3.png"), asset("bloom-4.png")],
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
          backgroundImage: `url('${asset("White White Studio.png")}')`,
          minHeight: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>

      {/* Product Collection */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">The Collection</h2>
          <div className="space-y-16">
            {products.map((product, index) => (
              <article
                key={index}
                className="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-lg p-8"
              >
                <h3 className="text-3xl font-semibold mb-4 text-white">{product.name}</h3>
                <p className="text-lg text-white/70 leading-relaxed mb-6">{product.description}</p>
                {product.images.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="rounded-xl overflow-hidden flex items-center justify-center bg-white">
                        <Image
                          src={image}
                          alt={`${product.name} view ${imgIndex + 1}`}
                          width={600}
                          height={600}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Gallery */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Additional Gallery</h2>
          <h2 className="text-xl text-white/70 mb-12">As showcased in Design Democracy, Hyderabad, September 2025</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={asset("WWA1.jpg")}
                alt="White Studios additional 1"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={asset("WWA2.jpg")}
                alt="White Studios additional 2"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #581c87 50%, #000000 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm">Available to work with you</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Let's design next one together
          </h2>

          <Link href="/#lets-talk">
            <button className="bg-white text-black hover:bg-white/90 rounded-full text-lg px-8 py-6 font-semibold transition-all duration-300 hover:scale-105">
              Let's talk →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

