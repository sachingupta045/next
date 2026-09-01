"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wraps content with a subtle magnetic cursor-tracking effect.
 * On mouse hover the card tilts and follows the cursor using spring physics.
 * Falls back to a plain div when reduced motion is preferred.
 */
export function MagneticCard({
  children,
  className = "",
  strength = 0.18,
}: MagneticCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 160, damping: 20, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-50, 50], [4, -4]);
  const rotateY = useTransform(x, [-50, 50], [-4, 4]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * strength * 3);
    mouseY.set((e.clientY - centerY) * strength * 3);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic-card ${className}`}
      style={{ rotateX, rotateY, x, y, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticCard;