"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { drinkitProducts } from "../data/drinkitData";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { Flame, Star, Scale, ArrowRight } from "lucide-react";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

export const TrendingLineup: React.FC = () => {
  const { toggleCompare, isInCompare } = useWishlistCompare();

  const trendingList = [
    drinkitProducts.find((d) => d.id === "drink-indri") || drinkitProducts[0],
    drinkitProducts.find((d) => d.id === "drink-glenfiddich-12") || drinkitProducts[1],
    drinkitProducts.find((d) => d.id === "drink-amrut-fusion") || drinkitProducts[2],
    drinkitProducts.find((d) => d.id === "drink-monkey-shoulder") || drinkitProducts[3],
    drinkitProducts.find((d) => d.id === "drink-old-monk-legend") || drinkitProducts[4],
  ];

  return (
    <section id="trending-lineup" className="py-14 sm:py-18 bg-gradient-to-b from-orange-950/20 via-surface/40 to-transparent border-y border-orange-500/10 relative z-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold mb-2 shadow-sm">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
              </motion.span>
              <span>The Pour Lineup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-cream tracking-tight">
              India&apos;s Top Trending Spirits This Week
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Real-time popular bottles rated by sommeliers and community drinkers across India.
            </p>
          </div>
          <Link
            href="/drinkit"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 shrink-0 self-start sm:self-auto group"
          >
            <span>View Full Leaderboard</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </AnimatedSection>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.1}>
          {trendingList.map((drink, index) => {
            const compared = isInCompare(drink.id);
            return (
              <StaggerItem key={drink.id}>
                <motion.div
                  className="group relative bg-surface/90 backdrop-blur-md rounded-2xl border border-orange-500/15 hover:border-orange-500/50 p-4 flex gap-4 items-center"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 0 32px rgba(249,115,22,0.22)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* Rank Badge */}
                  <motion.div
                    className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-orange-950/50 border border-orange-300/30 z-10"
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 14,
                    }}
                  >
                    #{index + 1}
                  </motion.div>

                  {/* Bottle Thumbnail */}
                  <Link
                    href={`/drink/${drink.id}`}
                    className="w-20 h-24 rounded-xl bg-base/60 p-1.5 flex items-center justify-center shrink-0 border border-white/5"
                  >
                    <motion.img
                      src={drink.image}
                      alt={drink.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      whileHover={{ scale: 1.12, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider truncate">
                        {drink.brand} • {drink.origin}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{drink.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <Link href={`/drink/${drink.id}`}>
                      <h3 className="text-xs sm:text-sm font-bold text-cream line-clamp-1 group-hover:text-orange-300 transition-colors mb-1">
                        {drink.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-[11px] text-muted mb-2">
                      <span className="bg-orange-500/10 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/20 font-semibold">
                        {drink.abv}
                      </span>
                      <span>{drink.type}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                      <span className="text-sm sm:text-base font-extrabold text-cream font-serif">
                        ₹{drink.price}
                      </span>
                      <motion.button
                        onClick={() => toggleCompare(drink)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                          compared
                            ? "bg-orange-500 text-white border-orange-400"
                            : "bg-base text-muted hover:text-cream border-white/10 hover:border-orange-400/40"
                        }`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 350, damping: 16 }}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{compared ? "Compared" : "Compare"}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TrendingLineup;
