"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const workImages = [
  "/assets/work/Agava Dining Table.png",
  "/assets/work/Avara Cabinet.jpeg",
  "/assets/work/bamboo-1.png",
  "/assets/work/bamboo-2.png",
  "/assets/work/bamboo-3.png",
  "/assets/work/bloom-1.png",
  "/assets/work/bloom-2.png",
  "/assets/work/bloom-3.png",
  "/assets/work/bloom-4.png",
  "/assets/work/Canna Side Table.png",
  "/assets/work/Dunea Sofa 2.jpeg",
  "/assets/work/Dunea Sofa.jpeg",
  "/assets/work/FOLD_1.png",
  "/assets/work/FOLD.png",
  "/assets/work/HALO_2.png",
  "/assets/work/HALO.png",
  "/assets/work/hug.png",
  "/assets/work/NOAH_1.png",
  "/assets/work/NOAH_2.png",
  "/assets/work/Orba Bar Table.jpeg",
  "/assets/work/oro_1.png",
  "/assets/work/oro_2.png",
  "/assets/work/ORO_3.png",
  "/assets/work/oro.png",
  "/assets/work/Sirocco Swing 2.jpeg",
  "/assets/work/Sirocco Swing.jpeg",
  "/assets/work/SWAY_1.png",
  "/assets/work/SWAY_2.png",
  "/assets/work/SWAY_3.png",
  "/assets/work/swayyyyy.png",
  "/assets/work/TGRAdditional1.jpg",
  "/assets/work/TGRAdditional3.jpg",
  "/assets/work/TGRAdditional5.jpg",
  "/assets/work/TGRAdditonal4.jpg",
  "/assets/work/TGRAddtional2.jpg",
  "/assets/work/Work1.png",
  "/assets/work/Work2.png",
  "/assets/work/Work4.png",
  "/assets/work/Work5.png",
  "/assets/work/Yucca Coffee Table.jpeg",
];

interface ImageDisplay {
  id: number;
  src: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function WorkSection() {
  const [images, setImages] = useState<ImageDisplay[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageIdRef = useRef(0);

  const getRandomImage = () => {
    return workImages[Math.floor(Math.random() * workImages.length)];
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !headingRef.current) return;

    const sectionRect = containerRef.current.getBoundingClientRect();
    const headingRect = headingRef.current.getBoundingClientRect();
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    // Only show images if mouse is below the heading and within section
    if (mouseY <= headingRect.bottom) return;
    if (mouseX < sectionRect.left || mouseX > sectionRect.right) return;
    if (mouseY < sectionRect.top || mouseY > sectionRect.bottom) return;

    // Calculate position relative to section
    const x = mouseX - sectionRect.left;
    const y = mouseY - sectionRect.top;

    // Image dimensions for bounds checking (using md size)
    const imageWidth = 256; // md:w-64 = 256px
    const imageHeight = 256; // md:h-64 = 256px
    const padding = 20;

    // Calculate random offset but keep within bounds
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 200;
    
    // Heading bottom relative to section
    const headingBottom = headingRect.bottom - sectionRect.top;
    
    // Ensure image stays within section boundaries
    const finalX = Math.max(
      imageWidth / 2 + padding,
      Math.min(sectionRect.width - imageWidth / 2 - padding, x + offsetX)
    );
    const finalY = Math.max(
      headingBottom + imageHeight / 2 + padding,
      Math.min(sectionRect.height - imageHeight / 2 - padding, y + offsetY)
    );

    // Randomly show images as mouse moves
    if (Math.random() > 0.7) {
      const newImage: ImageDisplay = {
        id: imageIdRef.current++,
        src: getRandomImage(),
        x: finalX,
        y: finalY,
        opacity: 0,
        scale: 0.8,
      };

      setImages((prev) => [...prev, newImage]);

      // Fade in animation
      setTimeout(() => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id
              ? { ...img, opacity: 1, scale: 1 }
              : img
          )
        );
      }, 10);

      // Fade out and remove after animation
      setTimeout(() => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id
              ? { ...img, opacity: 0, scale: 0.8 }
              : img
          )
        );
        setTimeout(() => {
          setImages((prev) => prev.filter((img) => img.id !== newImage.id));
        }, 600);
      }, 1200);
    }
  };

  const handleMouseLeave = () => {
    setImages([]);
  };

  return (
    <section
      id="work"
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 text-center"
        >
          Products We've Built
        </h2>
      </div>

      {/* Animated Images Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {images.map((image) => (
          <div
            key={image.id}
            className="absolute transition-all duration-[600ms] ease-in-out"
            style={{
              left: `${image.x}px`,
              top: `${image.y}px`,
              transform: `translate(-50%, -50%) scale(${image.scale})`,
              opacity: image.opacity,
            }}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 py-4">
              <Image
                src={image.src}
                alt="Work Product"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

