"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps content in a fade + rise animation triggered on scroll.
 * Fires once per element. Respects prefers-reduced-motion.
 */
export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
