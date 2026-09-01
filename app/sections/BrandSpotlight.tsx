"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";
import { Sparkles, ArrowRight } from "lucide-react";

const BrandSpotlight = () => {
  const brandItems = [
    { name: "Indri", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
    { name: "Dalmore", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
    { name: "Glenfiddich", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
    { name: "Paul John", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
    { name: "Laphroaig", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
    { name: "Amrut", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
    { name: "Macallan", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
    { name: "Talisker", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
    { name: "Château Margaux", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=300&q=80" },
    { name: "BrewDog", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=300&q=80" },
    { name: "Bombay Sapphire", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" },
    { name: "Jack Daniels", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <section
      id="brand-spotlight"
      className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent relative transition-colors"
    >
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold mb-2">
              <motion.span
                animate={{ rotate: [0, 20, -10, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
              <span>Heritage &amp; Distilleries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream font-serif leading-tight">
              Iconic Houses,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400">
                One Shelf
              </span>
            </h2>
          </div>
          <Link
            href="/drinkit"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors group self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
          >
            <span>View all collections</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </AnimatedSection>

        {/* Brand Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {brandItems.map((brand, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -7, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <Link
                  href={`/brand/${encodeURIComponent(brand.name)}`}
                  className="group flex flex-col items-center cursor-pointer text-center focus-visible:ring-2 focus-visible:ring-rose-400 rounded-2xl"
                >
                  <div className="w-full aspect-square bg-surface/90 backdrop-blur-md rounded-2xl border border-rose-500/15 p-3 flex items-center justify-center hover:shadow-[0_0_28px_rgba(244,63,94,0.22)] hover:border-rose-500/50 transition-all duration-300 overflow-hidden relative">
                    <motion.img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-xl"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-25 transition-opacity duration-300 rounded-xl" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-cream mt-2 line-clamp-1 group-hover:text-rose-300 transition-colors">
                    {brand.name}
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

export default BrandSpotlight;
