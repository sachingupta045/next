"use client";

import React from "react";
import { motion } from "motion/react";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

/**
 * Child component for StaggerContainer — fades + rises into view.
 * Must be a direct child of StaggerContainer.
 */
export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
