"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./motion/useReducedMotion";

interface PourLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { w: 24, h: 32 },
  md: { w: 40, h: 56 },
  lg: { w: 64, h: 88 },
};

/**
 * SVG glass with amber liquid pour animation.
 * Used as a loading state / spinner replacement.
 */
export function PourLoader({ size = "md", className = "" }: PourLoaderProps) {
  const reduced = useReducedMotion();
  const { w, h } = sizes[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 40 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loading"
        role="img"
      >
        {/* Glass outline */}
        <path
          d="M6 4 L6 2 L34 2 L34 4 L32 44 C32 48 28 52 24 52 L16 52 C12 52 8 48 8 44 Z"
          stroke="#F5EDE0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.3"
        />
        {/* Liquid fill */}
        <motion.path
          d="M9 14 L8.5 42 C8.5 46.5 12 50 16 50 L24 50 C28 50 31.5 46.5 31.5 42 L31 14 Z"
          fill="url(#pourGradient)"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 1.2,
                  ease: [0.33, 1, 0.68, 1],
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }
          }
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="pourGradient" x1="20" y1="14" x2="20" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E8A05C" />
            <stop offset="1" stopColor="#C17A3D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
