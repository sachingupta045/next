"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../components/motion/useReducedMotion";

const stats = [
  { label: "Bottles Listed", value: "500+", icon: "Bottle" },
  { label: "Indian States", value: "18", icon: "Map" },
  { label: "Price Range", value: "200 - 25K INR", icon: "Money" },
  { label: "Categories", value: "11+", icon: "Tag" },
  { label: "Verified Prices", value: "Real-Time", icon: "Check" },
  { label: "Sommelier Rated", value: "Expert Notes", icon: "Star" },
  { label: "Food Pairings", value: "200+", icon: "Food" },
  { label: "Single Malts", value: "Top Picks", icon: "Glass" },
  { label: "ABV Tracked", value: "Every Drop", icon: "Lab" },
  { label: "Community", value: "Growing", icon: "People" },
];

const iconMap: Record<string, string> = {
  Bottle: "\uD83C\uDF7E",
  Map: "\uD83D\uDDFA\uFE0F",
  Money: "\uD83D\uDCB0",
  Tag: "\uD83C\uDFF7\uFE0F",
  Check: "\u2705",
  Star: "\uD83C\uDF78",
  Food: "\uD83C\uDF7D\uFE0F",
  Glass: "\uD83E\uDD43",
  Lab: "\uD83D\uDD2C",
  People: "\uD83C\uDF1F",
};

const doubled = [...stats, ...stats];

export const StatsMarquee: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Platform highlights"
      className="relative py-5 overflow-hidden border-y border-sky-500/10 bg-gradient-to-r from-base via-sky-950/20 to-base"
    >
      {/* Left fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-base to-transparent" />
      {/* Right fade mask */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-base to-transparent" />

      <div className="pause-on-hover overflow-hidden" aria-hidden="true">
        <div className={reduced ? "flex gap-8 w-max" : "flex gap-8 w-max animate-marquee"}>
          {doubled.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-surface/60 backdrop-blur-sm border border-sky-500/15 shrink-0 select-none"
            >
              <span className="text-lg leading-none" role="img" aria-label={stat.label}>
                {iconMap[stat.icon]}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-black text-cream leading-tight animate-text-glow">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated line accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"
        animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default StatsMarquee;