"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

export const Category: React.FC = () => {
  const categoriesWithColors = [
    { id: "single-malts", name: "Single Malts", slug: "single-malts", icon: "🍸", color: "from-amber-500/20 to-amber-600/5", border: "hover:border-amber-500/50", text: "group-hover:text-amber-400", glow: "rgba(245,158,11,0.22)" },
    { id: "blended-scotch", name: "Blended Scotch", slug: "blended-scotch", icon: "🥃", color: "from-orange-500/20 to-orange-600/5", border: "hover:border-orange-500/50", text: "group-hover:text-orange-400", glow: "rgba(249,115,22,0.22)" },
    { id: "whisky", name: "Indian Whiskies", slug: "spirits", icon: "🏺", color: "from-yellow-500/20 to-yellow-600/5", border: "hover:border-yellow-500/50", text: "group-hover:text-yellow-400", glow: "rgba(234,179,8,0.22)" },
    { id: "beer", name: "Craft & Beers", slug: "craft-beers", icon: "🍺", color: "from-emerald-500/20 to-emerald-600/5", border: "hover:border-emerald-500/50", text: "group-hover:text-emerald-400", glow: "rgba(16,185,129,0.22)" },
    { id: "gin", name: "Gin & Botanicals", slug: "gin", icon: "🌿", color: "from-teal-500/20 to-teal-600/5", border: "hover:border-teal-500/50", text: "group-hover:text-teal-400", glow: "rgba(20,184,166,0.22)" },
    { id: "vodka", name: "Vodka", slug: "vodka", icon: "🧊", color: "from-cyan-500/20 to-cyan-600/5", border: "hover:border-cyan-500/50", text: "group-hover:text-cyan-400", glow: "rgba(6,182,212,0.22)" },
    { id: "rum", name: "Aged Rum", slug: "rum", icon: "🏴‍☠️", color: "from-red-500/20 to-red-600/5", border: "hover:border-red-500/50", text: "group-hover:text-red-400", glow: "rgba(239,68,68,0.22)" },
    { id: "wine", name: "Fine Wines", slug: "fine-wines", icon: "🍷", color: "from-rose-500/20 to-rose-600/5", border: "hover:border-rose-500/50", text: "group-hover:text-rose-400", glow: "rgba(244,63,94,0.22)" },
    { id: "tequila", name: "Tequila & Agave", slug: "tequila", icon: "🌵", color: "from-lime-500/20 to-lime-600/5", border: "hover:border-lime-500/50", text: "group-hover:text-lime-400", glow: "rgba(132,204,22,0.22)" },
    { id: "champagne", name: "Champagne", slug: "champagne", icon: "🥂", color: "from-purple-500/20 to-purple-600/5", border: "hover:border-purple-500/50", text: "group-hover:text-purple-400", glow: "rgba(168,85,247,0.22)" },
    { id: "ready-to-drink", name: "Ready To Drink", slug: "ready-to-drink", icon: "🍹", color: "from-pink-500/20 to-pink-600/5", border: "hover:border-pink-500/50", text: "group-hover:text-pink-400", glow: "rgba(236,72,153,0.22)" },
  ];

  return (
    <section className="py-6 sm:py-8 bg-surface/30 border-y border-white/5 relative z-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber to-rose-500"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="text-lg sm:text-xl font-bold font-serif text-cream">
              Browse by Category
            </h2>
            <span className="text-xs text-muted hidden sm:inline">
              Curated by flavor profiles &amp; distillation styles
            </span>
          </div>
          <Link
            href="/drinkit"
            className="text-xs font-bold text-amber hover:text-amber-glow flex items-center gap-1 transition-colors group"
          >
            <span>View All ({categoriesWithColors.length})</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.span>
          </Link>
        </AnimatedSection>

        {/* Categories Row */}
        <StaggerContainer className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2" staggerDelay={0.05}>
          {categoriesWithColors.map((cat) => (
            <StaggerItem key={cat.id}>
              <motion.div whileHover={{ y: -5, scale: 1.06 }} whileTap={{ scale: 0.93 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                <Link
                  href={`/drinkit?category=${cat.slug}`}
                  className={`group flex flex-col items-center justify-center p-3.5 min-w-[105px] sm:min-w-[118px] rounded-2xl bg-gradient-to-b ${cat.color} bg-surface/85 backdrop-blur-md border border-white/10 ${cat.border} transition-colors duration-300 shrink-0 text-center shadow-sm focus-visible:ring-2 focus-visible:ring-amber`}
                  style={{ "--glow": cat.glow } as React.CSSProperties}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-base/80 flex items-center justify-center text-2xl mb-2 border border-white/10 shadow-inner"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {cat.icon}
                  </motion.div>
                  <span className={`text-xs font-bold text-cream ${cat.text} transition-colors line-clamp-1`}>
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Category;