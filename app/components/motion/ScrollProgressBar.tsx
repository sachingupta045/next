"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * A fixed 3px glowing bar at the very top of the page that fills
 * as the user scrolls -- powered by useScroll + useSpring for
 * smooth, physics-based tracking.
 */
export function ScrollProgressBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export default ScrollProgressBar;