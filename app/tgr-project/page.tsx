"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    number: "01",
    name: "YUCCA",
    category: "COFFEE TABLE",
    statement: "A celebration of geometry and craftsmanship. Yucca combines sculptural form with reflective surfaces to create a striking contemporary centerpiece.",
    materials: [
      "Solid Walnut Wood",
      "Tempered Reflective Glass",
      "Hand-Finished Veneer",
      "Protective Matte Coating"
    ],
    dimensions: [
      "W 140 cm",
      "D 140 cm",
      "H 38 cm"
    ],
    designNotes: "Inspired by patterns found in nature and architecture, Yucca features a faceted silhouette paired with mirrored surfaces that create depth, light, and visual intrigue. Its open structure balances bold form with refined elegance.",
    details: [
      { title: "FRAME", content: "Solid walnut construction highlights the beauty of natural timber." },
      { title: "SURFACE", content: "Reflective glass inserts add depth and change visual perspectives." },
      { title: "CRAFTSMANSHIP", content: "Precision detailing ensures clean geometry and lasting durability." },
      { title: "SUSTAINABILITY", content: "Responsibly sourced materials support enduring design." }
    ],
    tagline: "A study in reflection and structure. Designed to bring depth, warmth, and architectural elegance to contemporary interiors.",
    images: [
      { src: "/assets/TGR/yucca_1.jpg", caption: "Yucca Coffee Table close-up patterned tabletop detail." },
      { src: "/assets/TGR/yucca_2.jpg", caption: "Yucca Coffee Table positioned in outdoor desert courtyard." },
      { src: "/assets/TGR/yucca_3.jpg", caption: "Faceted top profile of Yucca Coffee Table." },
      { src: "/assets/TGR/yucca_4.jpg", caption: "Desert Oasis lounge setting featuring Yucca Coffee Table." },
      { src: "/assets/TGR/yucca_5.jpg", caption: "Perspective detail of the hand-carved octagonal walnut base." },
      { src: "/assets/TGR/yucca_6.jpg", caption: "Yucca Coffee Table styled with material swatches and showroom layout." }
    ]
  },
  {
    number: "02",
    name: "ORBA",
    category: "BAR TABLE",
    statement: "A refined balance of craftsmanship and simplicity. Orba combines natural materials and thoughtful detailing to create an inviting centerpiece for gathering and connection.",
    materials: [
      "Solid Teak Wood",
      "Hand-Wrapped Natural Rope",
      "Engineered Wood Core",
      "Protective Outdoor Finish"
    ],
    dimensions: [
      "W 150 cm",
      "D 50 cm",
      "H 95 cm"
    ],
    designNotes: "Inspired by coastal living and traditional craftsmanship, Orba features sculpted forms, hand-wrapped rope accents, and clean architectural lines. Designed for versatile indoor and outdoor use, it balances functionality with understated elegance.",
    details: [
      { title: "FRAME", content: "Solid teak construction offers strength, durability, and natural beauty." },
      { title: "ROPE DETAILING", content: "Hand-wrapped fibers add texture and artisanal character." },
      { title: "CRAFTSMANSHIP", content: "Precision joinery ensures refined proportions and lasting quality." },
      { title: "SUSTAINABILITY", content: "Responsibly sourced materials support enduring design." }
    ],
    tagline: "A study in texture and proportion. Designed to bring warmth, craftsmanship, and timeless elegance to contemporary living.",
    images: [
      { src: "/assets/TGR/orba_1.jpg", caption: "Orba Bar Table displaying handcrafted walnut frame and wrapped rope legs." },
      { src: "/assets/TGR/orba_2.jpg", caption: "Perspective view of Orba Bar Table in a sunlit modern interior." },
      { src: "/assets/TGR/orba_3.jpg", caption: "Detail view of the rope weaving and wood joinery." }
    ]
  },
  {
    number: "03",
    name: "DUNEA",
    category: "OUTDOOR SOFA",
    statement: "A seamless expression of comfort and craftsmanship. Dunea combines sculptural form, woven textures, and generous proportions to create a refined outdoor retreat.",
    materials: [
      "Hand-Woven All-Weather Rope",
      "Powder-Coated Aluminum Frame",
      "High-Performance Outdoor Fabric",
      "Quick-Dry Foam Cushioning"
    ],
    dimensions: [
      "W 240 cm",
      "D 95 cm",
      "H 78 cm",
      "SH 42 cm"
    ],
    designNotes: "Inspired by coastal dunes, Dunea features soft curves, woven detailing, and a light architectural silhouette. Designed for contemporary outdoor living, it balances comfort, durability, and timeless elegance.",
    details: [
      { title: "FRAME", content: "Powder-coated aluminum provides strength and weather resistance." },
      { title: "WEAVING", content: "Handwoven rope adds texture and artisanal character." },
      { title: "COMFORT", content: "Deep cushions with quick-dry foam ensure lasting comfort." },
      { title: "SUSTAINABILITY", content: "Durable materials support longevity and responsible design." }
    ],
    tagline: "A study in softness and flow. Designed to bring comfort, connection, and quiet elegance to outdoor living.",
    images: [
      { src: "/assets/TGR/dunea_1.jpg", caption: "Dunea Outdoor Sofa featuring custom woven backrest and comfort throws." },
      { src: "/assets/TGR/dunea_2.jpg", caption: "Detail close-up of Dunea sofa showing patterned pillows." },
      { src: "/assets/TGR/dunea_3.jpg", caption: "Detail view of the Dunea woven armrest and soft upholstery." },
      { src: "/assets/TGR/dunea_4.jpg", caption: "Full perspective view of Dunea Outdoor Sofa in minimalist courtyard." }
    ]
  },
  {
    number: "04",
    name: "SOLARA",
    category: "ARM CHAIR",
    statement: "A harmonious blend of comfort and craftsmanship. Solara combines woven textures, sculptural curves, and generous cushioning to create a relaxed outdoor retreat.",
    materials: [
      "Hand-Woven All-Weather Wicker",
      "Solid Teak Wood Base",
      "High-Performance Outdoor Fabric",
      "Quick-Dry Foam Cushioning"
    ],
    dimensions: [
      "W 95 cm",
      "D 90 cm",
      "H 78 cm",
      "SH 42 cm"
    ],
    designNotes: "Inspired by the warmth of sunlit landscapes, Solara features a curved woven shell, soft upholstery, and organic proportions. Designed for outdoor living, it offers comfort, durability, and timeless elegance.",
    details: [
      { title: "FRAME", content: "A sturdy structure ensures stability and long-lasting performance." },
      { title: "WEAVING", content: "Handwoven wicker adds texture and artisanal character." },
      { title: "COMFORT", content: "Deep cushions provide exceptional comfort and support." },
      { title: "CRAFTSMANSHIP", content: "Carefully crafted details highlight the beauty of natural materials." },
      { title: "SUSTAINABILITY", content: "Durable materials promote longevity and responsible design." }
    ],
    tagline: "A study in comfort and texture. Designed to bring warmth, relaxation, and effortless elegance to outdoor spaces.",
    images: [
      { src: "/assets/TGR/solara_1.jpg", caption: "Solara Arm Chair in hand-woven wicker with beige upholstery." },
      { src: "/assets/TGR/solara_2.jpg", caption: "Detail view of Solara Arm Chair showcasing backrest texture." }
    ]
  },
  {
    number: "05",
    name: "SIROCCO",
    category: "OUTDOOR SWING",
    statement: "A floating retreat shaped by movement and ease. Sirocco reimagines outdoor lounging through soft forms, suspended comfort, and handcrafted details, creating a tranquil space that gently sways with its surroundings.",
    materials: [
      "Hand-Woven All-Weather Wicker",
      "Marine-Grade Suspension System",
      "High-Performance Outdoor Upholstery",
      "Powder-Coated Steel Frame Components"
    ],
    dimensions: [
      "W 120 cm",
      "D 100 cm",
      "H 65 cm",
      "SH 42 cm"
    ],
    designNotes: "Named after the warm Mediterranean wind, the Sirocco Swing embodies a sense of calm, freedom, and effortless relaxation. Its rounded cocoon-like form is wrapped in finely woven wicker and paired with generously cushioned upholstery that invites moments of rest. Suspended by elegant structural supports, the design appears to float within the landscape, creating a dynamic interaction between movement and stillness. Crafted for luxury outdoor environments, Sirocco transforms terraces, gardens, and poolside settings into intimate sanctuaries of comfort.",
    details: [
      { title: "STRUCTURE", content: "Engineered with durable outdoor-grade materials to ensure stability, safety, and long-term performance in open-air environments." },
      { title: "WEAVING", content: "Handcrafted wicker detailing introduces texture and warmth while enhancing the organic character of the design." },
      { title: "COMFORT", content: "Deep cushioning and ergonomic proportions create a relaxing seating experience, enhanced by the gentle motion of suspension." },
      { title: "SUSTAINABILITY", content: "Designed with durable, weather-resistant materials that reduce replacement cycles and support a philosophy of enduring outdoor living." }
    ],
    tagline: "A study in movement and serenity. Sirocco sways with its surroundings, creating a floating sanctuary.",
    images: [
      { src: "/assets/TGR/Sirocco Swing.jpeg", caption: "Sirocco Outdoor Swing suspended in custom braided cords with cream cushioning." },
      { src: "/assets/TGR/Sirocco Swing 2.jpeg", caption: "Cocoon frame structure close-up, showcasing handwoven organic lines." },
      { src: "/assets/TGR/TGR sketches.png", caption: "Structural drawing displaying suspension details and load testing specifications." }
    ]
  }
];

export default function DesertOasisProjectPage() {
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const currentProduct = products[activeProductIdx];
  const [openSection, setOpenSection] = useState<string | null>("FRAME");

  const handleNextImg = () => {
    setActiveImgIdx((prev) => (prev + 1) % currentProduct.images.length);
  };

  const handlePrevImg = () => {
    setActiveImgIdx((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length);
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="bg-black text-warm-white min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-28 md:pt-36 px-6 md:px-10 lg:px-16 pb-20">
        
        {/* Collection Selector Submenu */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-warm-white/10 pb-6 mb-10 overflow-x-auto scrollbar-none select-none">
          {products.map((prod, idx) => (
            <button
              key={prod.name}
              onClick={() => {
                setActiveProductIdx(idx);
                setActiveImgIdx(0);
                setOpenSection(prod.details[0]?.title || null);
              }}
              className={`font-mono text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none whitespace-nowrap ${
                activeProductIdx === idx
                  ? "text-soft-beige font-semibold border-b border-soft-beige/50 pb-1"
                  : "text-warm-white/40 hover:text-warm-white pb-1"
              }`}
            >
              {prod.number} {prod.name}
            </button>
          ))}
        </div>

        {/* Layout Wrapper: Left Sidebar + Right Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* Left Sidebar Panel (sticky) */}
          <aside className="w-full lg:w-[22%] shrink-0 lg:sticky lg:top-28 h-auto lg:h-[calc(100vh-14rem)] flex flex-col justify-between pr-4 overflow-y-auto scrollbar-none pb-4 border-b lg:border-b-0 border-warm-white/10">
            <div className="flex flex-col gap-6 text-left">
              {/* Back button */}
              <Link
                href="/#projects"
                className="group flex items-center gap-2 text-caption text-[10px] text-warm-white/40 hover:text-warm-white transition-colors duration-300 self-start"
              >
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span>BACK TO PROJECTS</span>
              </Link>

              {/* Number and Title */}
              <div className="flex flex-col gap-1 mt-4">
                <span className="font-mono text-[10px] tracking-widest text-warm-white/30">
                  {currentProduct.number} / {String(products.length).padStart(2, "0")}
                </span>
                <h1 className="font-serif font-light text-4xl tracking-widest text-warm-white uppercase mt-1">
                  {currentProduct.name}
                </h1>
                <span className="font-sans text-[10px] tracking-[0.2em] text-soft-beige/70 uppercase">
                  {currentProduct.category}
                </span>
              </div>

              <div className="w-full h-px bg-warm-white/10 my-2" />

              {/* Description Statement */}
              <p className="text-xs font-light text-warm-white/60 leading-relaxed font-sans max-w-[240px]">
                {currentProduct.statement}
              </p>

              <div className="w-full h-px bg-warm-white/10 my-2" />

              {/* Materials List */}
              <div className="flex flex-col gap-2 text-left">
                <h3 className="font-mono text-[9px] tracking-widest text-warm-white/40 uppercase">MATERIALS</h3>
                <ul className="flex flex-col gap-1 text-xs font-light text-warm-white/70">
                  {currentProduct.materials.map((mat) => (
                    <li key={mat}>{mat}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full h-px bg-warm-white/10 my-2" />

              {/* Dimensions List */}
              <div className="flex flex-col gap-2 text-left">
                <h3 className="font-mono text-[9px] tracking-widest text-warm-white/40 uppercase">DIMENSIONS</h3>
                <ul className="flex flex-col gap-1 text-xs font-light text-warm-white/70 font-mono">
                  {currentProduct.dimensions.map((dim) => (
                    <li key={dim}>{dim}</li>
                  ))}
                </ul>
              </div>

              <div className="w-full h-px bg-warm-white/10 my-2" />

              {/* Spec Sheet Download */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-mono text-[10px] tracking-widest text-soft-beige hover:text-warm-white transition-colors duration-300 uppercase inline-flex items-center gap-1.5 self-start"
              >
                DOWNLOAD SPEC SHEET ↓
              </a>
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 lg:pl-10 lg:border-l border-warm-white/10 flex flex-col gap-12 min-w-0">
            
            {/* Interactive Hero Image Panel */}
            <div className="flex flex-col gap-4 relative">
              
              {/* Carousel navigation (Top Right) */}
              <div className="absolute right-0 -top-8 z-20 flex items-center gap-4 text-[10px] font-mono tracking-widest text-warm-white/40 uppercase">
                <button
                  onClick={handlePrevImg}
                  className="hover:text-warm-white transition-colors duration-300 focus:outline-none"
                >
                  PREV
                </button>
                <span>/</span>
                <button
                  onClick={handleNextImg}
                  className="hover:text-warm-white transition-colors duration-300 focus:outline-none"
                >
                  NEXT
                </button>
              </div>

              {/* Hero Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-matte-black mt-2">
                <div className="absolute inset-0 w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeProductIdx}-${activeImgIdx}`}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentProduct.images[activeImgIdx].src}
                        alt={currentProduct.images[activeImgIdx].caption}
                        fill
                        className="object-contain img-grain"
                        sizes="(max-width: 1024px) 100vw, 78vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
              </div>

              {/* Bottom Carousel Meta: Caption and Page Indicator */}
              <div className="flex justify-between items-baseline gap-6 text-[10px] font-mono tracking-widest text-warm-white/40 uppercase">
                <p className="normal-case tracking-normal font-light text-warm-white/60 text-xs italic max-w-lg">
                  {currentProduct.images[activeImgIdx].caption}
                </p>
                <div className="shrink-0 flex items-center gap-1 select-none font-medium">
                  <span className="text-warm-white">{String(activeImgIdx + 1).padStart(2, "0")}</span>
                  <span>—</span>
                  <span>{String(currentProduct.images.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>

            {/* Secondary Image Grid + Design Notes Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start mt-4">
              {currentProduct.images.map((img, imgIdx) => (
                <div
                  key={img.src}
                  className={`flex flex-col gap-2 group cursor-pointer ${
                    activeImgIdx === imgIdx ? "opacity-100" : "opacity-60 hover:opacity-90"
                  } transition-opacity duration-300`}
                  onClick={() => setActiveImgIdx(imgIdx)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-matte-black">
                    <Image
                      src={img.src}
                      alt={img.caption || "Detail view"}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 img-grain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <span className="font-mono text-[8px] tracking-widest text-warm-white/30 uppercase mt-1">
                    {String(imgIdx + 1).padStart(2, "0")} . DETAIL VIEW
                  </span>
                </div>
              ))}

              {/* Column 4: Design Notes Panel */}
              <div className="flex flex-col gap-6 text-left pl-2 col-span-2 md:col-span-1">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif font-light text-sm tracking-[0.2em] text-soft-beige uppercase">
                    Design Notes
                  </h3>
                  <p className="text-[11px] font-light text-warm-white/60 leading-relaxed font-sans">
                    {currentProduct.designNotes}
                  </p>
                </div>
                
                {/* Year/Origin Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-warm-white/10 pt-4 text-[9px] font-mono tracking-widest uppercase">
                  <div className="flex flex-col gap-1">
                    <span className="text-warm-white/30">YEAR</span>
                    <span className="text-warm-white/80">2026</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-warm-white/30">ORIGIN</span>
                    <span className="text-warm-white/80">Gurgaon, India</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Separator Divider */}
            <div className="w-full h-px bg-warm-white/10" />

            {/* Bottom Section: Sketches (Left), Accordion (Center), Craft Photo (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-2">
              
              {/* Left Column: Sketches on Textured drawing paper */}
              <div className="flex flex-col gap-3 group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F0] border border-black/10">
                  <Image
                    src="/assets/TGR/TGR sketches.png"
                    alt="Technical sketches"
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102 img-grain contrast-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>
                <div className="flex justify-between items-baseline font-mono text-[8px] tracking-widest text-warm-white/30 uppercase mt-1 text-left">
                  <span>04 . DESIGN BLUEPRINT</span>
                  <span className="font-light italic text-[8px] normal-case tracking-normal">Technical Elevations</span>
                </div>
              </div>

              {/* Center Column: Specification Accordion */}
              <div className="flex flex-col text-left divide-y divide-warm-white/10 border-t border-b border-warm-white/10">
                {currentProduct.details.map((item) => {
                  const isOpen = openSection === item.title;
                  return (
                    <div key={item.title} className="py-3.5">
                      <button
                        onClick={() => toggleSection(item.title)}
                        className="w-full flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-warm-white/70 hover:text-warm-white focus:outline-none transition-colors duration-300"
                      >
                        <span>{item.title}</span>
                        <span className="text-xs">{isOpen ? "—" : "+"}</span>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-[11px] font-light text-warm-white/60 leading-relaxed font-sans pr-2">
                              {item.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Spec Tagline with visual border */}
              <div className="flex flex-col justify-between min-h-[160px] p-6 border border-warm-white/10 bg-matte-black/40 text-left">
                <span className="font-mono text-[8px] tracking-widest text-warm-white/30 uppercase">
                  SPECIFICATION SUMMARY
                </span>
                <p className="font-serif font-light text-sm italic text-soft-beige leading-relaxed mt-4">
                  “{currentProduct.tagline}”
                </p>
                <div className="w-8 h-px bg-soft-beige mt-6" />
              </div>

            </div>

            {/* Instagram Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-warm-white/10 pt-8 mt-12 pb-4 text-left">
              <span className="font-sans text-xs font-light text-warm-white/50">
                Find out more on instagram!
              </span>
              <a
                href="https://www.instagram.com/studiomorphous/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-soft-beige/30 hover:border-soft-beige bg-transparent text-soft-beige hover:text-warm-white text-[10px] font-mono tracking-widest uppercase px-5 py-2.5 transition-colors duration-300"
              >
                <span>Follow @studiomorphous</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Bottom Nav: Next / Prev navigation links */}
            <div className="border-t border-warm-white/10 pt-8 mt-12 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
              <Link
                href="/office-redesign"
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span>Office Redesign</span>
              </Link>

              <Link
                href="/work"
                className="text-warm-white/50 hover:text-warm-white transition-colors duration-300"
              >
                All Projects
              </Link>

              <Link
                href="/botanical-garden-project"
                className="group flex items-center gap-3 text-warm-white/40 hover:text-warm-white transition-colors duration-300"
              >
                <span>Botanical Garden</span>
                <svg width="12" height="8" viewBox="0 0 16 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
