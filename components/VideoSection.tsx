"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[70vh] bg-white overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://ebbandflo.in/wp-content/uploads/2026/05/1.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Subtle overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

      {/* Control Buttons */}
      <div className="absolute bottom-6 right-6 md:right-10 lg:right-16 flex items-center gap-4 z-10">
        {/* Play/Pause control */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-matte-black/40 backdrop-blur-sm border border-warm-white/10 flex items-center justify-center text-warm-white hover:bg-matte-black/60 transition-colors duration-300"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M0 0h3v12H0zm7 0h3v12H7z" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M0 0l12 6-12 6z" />
            </svg>
          )}
        </button>

        {/* Mute/Unmute control */}
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-matte-black/40 backdrop-blur-sm border border-warm-white/10 flex items-center justify-center text-warm-white hover:bg-matte-black/60 transition-colors duration-300"
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </button>
      </div>

      {/* Subtle label overlay */}
      <div className="absolute top-6 left-6 md:left-10 lg:left-16 z-10 pointer-events-none">
        <span className="text-[10px] font-mono text-warm-white/60 tracking-widest uppercase bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
          Studio Atmosphere
        </span>
      </div>
    </div>
  );
}
