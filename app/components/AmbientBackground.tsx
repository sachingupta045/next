"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./motion/useReducedMotion";

export const AmbientBackground: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ── 1. Subtle Film Grain / Noise Overlay ───────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* ── 2. Atmospheric Bombay Sapphire Light Orbs / Aurora Glows ────────── */}
      <motion.div
        className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.14)_0%,rgba(13,148,136,0.05)_45%,transparent_70%)] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[35%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,rgba(3,105,161,0.06)_50%,transparent_70%)] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                x: [0, -50, 20, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.95, 1.1, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08)_0%,rgba(2,132,199,0.04)_50%,transparent_70%)] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── 3. Luxury Geometric Constellation Grid ──────────────────────────── */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(241, 245, 249, 0.8) 1.5px, transparent 0),
            linear-gradient(to right, rgba(56, 189, 248, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── 4. Elegant Distillery & Botanical Line Art Watermarks ─────────── */}
      {/* Top Right: Vintage Copper Pot Still Illustration */}
      <svg
        className="absolute -top-10 right-4 w-[380px] h-[480px] opacity-[0.04] text-sky-400 pointer-events-none transform rotate-6"
        viewBox="0 0 200 240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Pot Still Swan Neck & Dome */}
        <path d="M100 210 C50 210 30 180 30 140 C30 110 50 85 80 80 L80 40 C80 30 90 20 100 20 C110 20 120 30 120 40 L120 45 C120 50 140 50 165 65 C180 75 185 95 185 130 L185 220" />
        <ellipse cx="100" cy="210" rx="70" ry="16" />
        <ellipse cx="100" cy="140" rx="65" ry="12" />
        <path d="M70 82 C80 80 120 80 130 82" />
        <path d="M85 40 L115 40" />
        <circle cx="100" cy="115" r="14" strokeDasharray="3 3" />
        <path d="M100 105 L100 125 M90 115 L110 115" />
        {/* Condenser coils */}
        <path d="M175 140 C175 150 195 150 195 160 C195 170 175 170 175 180 C175 190 195 190 195 200 L195 230" />
      </svg>

      {/* Left Mid: Botanical Barley & Oak Leaf Flourish */}
      <svg
        className="absolute top-[40%] -left-12 w-[340px] h-[500px] opacity-[0.045] text-cyan-300 pointer-events-none transform -rotate-12"
        viewBox="0 0 160 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Stalk */}
        <path d="M80 290 Q85 160 75 20" />
        {/* Barley Grains */}
        {[30, 60, 90, 120, 150, 180, 210].map((y, i) => (
          <React.Fragment key={y}>
            {/* Left grain */}
            <path d={`M${78 - i * 1.5} ${y} C${55 - i} ${y - 12} ${50 - i} ${y + 8} ${78 - i * 1.5} ${y + 12}`} />
            <path d={`M${52 - i} ${y - 8} Q${20 - i} ${y - 35} ${10} ${y - 45}`} strokeWidth="0.8" />
            {/* Right grain */}
            <path d={`M${80 + i * 1.5} ${y + 14} C${105 + i} ${y + 2} ${110 + i} ${y + 22} ${80 + i * 1.5} ${y + 26}`} />
            <path d={`M${108 + i} ${y + 6} Q${140 + i} ${y - 20} ${150} ${y - 30}`} strokeWidth="0.8" />
          </React.Fragment>
        ))}
      </svg>

      {/* Bottom Right: Oak Aging Barrel & Decanter Line Illustration */}
      <svg
        className="absolute bottom-10 -right-8 w-[400px] h-[400px] opacity-[0.035] text-sky-400 pointer-events-none"
        viewBox="0 0 240 240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Barrel Staves & Hoops */}
        <ellipse cx="120" cy="120" rx="90" ry="105" />
        <ellipse cx="120" cy="120" rx="40" ry="105" />
        <line x1="120" y1="15" x2="120" y2="225" />
        <path d="M35 50 Q120 70 205 50" />
        <path d="M30 85 Q120 108 210 85" />
        <path d="M30 155 Q120 132 210 155" />
        <path d="M35 190 Q120 170 205 190" />
        <circle cx="120" cy="120" r="8" fill="currentColor" fillOpacity="0.3" />
      </svg>

      {/* ── 5. Subtle Vignette Border ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(8,13,20,0.85)_100%)] pointer-events-none" />
    </div>
  );
};

export default AmbientBackground;
