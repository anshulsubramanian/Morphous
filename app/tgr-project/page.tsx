"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function TGRProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function for asset paths
  const asset = (path: string) => `/assets/TGR/${path}`;

  const products = [
    {
      name: "Yucca Coffee Table",
      description: "Rooted in form and balance, the Yucca Coffee Table embodies quiet sophistication. Its sculptural silhouette and refined finish bring depth and intention to contemporary living spaces.",
      image: asset("Yucca Coffee Table.jpeg"),
    },
    {
      name: "The Orba Bar Table",
      description: "Brings form and function into perfect balance. Defined by clean lines, tactile finishes, and enduring materials, designed for open-air gatherings that blend ease with sophistication.",
      image: asset("Orba Bar Table.jpeg"),
    },
    {
      name: "Dunea Sofa",
      description: "Captures the fluid elegance of desert landscapes. Its softly curved frame and tactile weave evoke the rhythm of shifting sands, while generous cushions offer an inviting sense of ease.",
      image: asset("Dunea Sofa.jpeg"),
    },
    {
      name: "Sirocco Swing",
      description: "Inspired by the warm desert winds, it embodies effortless grace and balance. Its rounded form and woven texture create a sense of weightless comfort, inviting calm and gentle motion.",
      image: asset("Sirocco Swing.jpeg"),
    },
    {
      name: "Canna Side Table",
      description: "Playful yet poised, draws inspiration from natural balance and sculptural simplicity. Its geometric composition creates a sense of grounded elegance.",
      image: asset("Canna Side Table.png"),
    },
    {
      name: "Agava Dining Table",
      description: "Celebrates contrast and balance through its sculptural composition and tactile presence. The interplay of smooth and woven textures creates a sense of warmth and refinement.",
      image: asset("Agava Dining Table.png"),
    },
    {
      name: "Avara Cabinet",
      description: "Combines lightness and function with a sculptural, pole-mounted form. Blending woven textures and warm wood, it offers elegant storage and a refined presence.",
      image: asset("Avara Cabinet.jpeg"),
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
          backgroundImage: `url('${asset("Garden Room Cover.png")}')`,
          minHeight: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>

      {/* Product Collection */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">The Collection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <article
                key={index}
                className="group bg-black border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-white">{product.name}</h3>
                  <p className="text-white/70 leading-relaxed">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Gallery Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-white">Additional Views</h2>
          <h2 className="text-xl text-white/70 mb-12">As showcased in Design Democracy, Hyderabad, September 2025</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={asset("TGRAdditional1.jpg")}
                alt="Additional View 1"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={asset("TGRAddtional2.jpg")}
                alt="Additional View 2"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={asset("TGRAdditional3.jpg")}
                alt="Additional View 3"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={asset("TGRAdditonal4.jpg")}
                alt="Additional View 4"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={asset("TGRAdditional5.jpg")}
                alt="Additional View 5"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
              <video
                src={asset("TGRV1.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
              <video
                src={asset("TGRV2.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
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

