"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { drinkitProducts } from "../data/drinkitData";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { Scale, Heart, Sparkles, ArrowRight, Tag } from "lucide-react";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { useState } from "react";

type TierId = "under-1000" | "1000-2500" | "2500-5000" | "5000-plus";

export const BudgetTiers: React.FC = () => {
  const [activeTier, setActiveTier] = useState<TierId>("2500-5000");
  const { toggleCompare, isInCompare, toggleWishlist, isInWishlist } = useWishlistCompare();

  const tiers = [
    {
      id: "under-1000" as TierId,
      label: "Under ₹1,000",
      subtitle: "Everyday Sips & Chillers",
      theme: "emerald",
      pillBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      cardBorderHover: "hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]",
      buttonColor: "bg-gradient-to-r from-emerald-600 to-teal-500 text-white",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
      tabHover: "hover:border-emerald-500/40 hover:text-emerald-300",
      activeRing: "border-emerald-500 text-emerald-300",
      activeBg: "bg-emerald-500/15",
    },
    {
      id: "1000-2500" as TierId,
      label: "₹1,000 – ₹2,500",
      subtitle: "Weekend Gatherings & Gins",
      theme: "blue",
      pillBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      cardBorderHover: "hover:border-indigo-500/40 hover:shadow-[0_0_24px_rgba(99,102,241,0.18)]",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-blue-500 text-white",
      badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/40",
      tabHover: "hover:border-indigo-500/40 hover:text-indigo-300",
      activeRing: "border-indigo-500 text-indigo-300",
      activeBg: "bg-indigo-500/15",
    },
    {
      id: "2500-5000" as TierId,
      label: "₹2,500 – ₹5,000",
      subtitle: "Craft Malts & Celebrations",
      theme: "amber",
      pillBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      cardBorderHover: "hover:border-amber-500/40 hover:shadow-[0_0_24px_rgba(245,158,11,0.18)]",
      buttonColor: "bg-gradient-to-r from-amber-600 to-amber-500 text-base",
      badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800/40",
      tabHover: "hover:border-amber-500/40 hover:text-amber-300",
      activeRing: "border-amber-500 text-amber-300",
      activeBg: "bg-amber-500/15",
    },
    {
      id: "5000-plus" as TierId,
      label: "₹5,000+",
      subtitle: "Luxury Single Malts & Prestige",
      theme: "purple",
      pillBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      cardBorderHover: "hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)]",
      buttonColor: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800/40",
      tabHover: "hover:border-purple-500/40 hover:text-purple-300",
      activeRing: "border-purple-500 text-purple-300",
      activeBg: "bg-purple-500/15",
    },
  ];

  const currentTierConfig = tiers.find((t) => t.id === activeTier) || tiers[2];

  const filteredProducts = drinkitProducts.filter((p) => {
    if (activeTier === "under-1000") return p.price < 1000;
    if (activeTier === "1000-2500") return p.price >= 1000 && p.price <= 2500;
    if (activeTier === "2500-5000") return p.price > 2500 && p.price <= 5000;
    if (activeTier === "5000-plus") return p.price > 5000;
    return true;
  });

  return (
    <section id="budget-tiers" className="py-12 sm:py-16 bg-transparent relative z-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${currentTierConfig.pillBg}`}>
              <Tag className="w-3.5 h-3.5" />
              <span>Budget &amp; Occasion Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-cream tracking-tight">
              Find the Perfect Sip for Your Pocket
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Explore bottles curated by price tiers and drinking occasions with verified state prices.
            </p>
          </div>
          <Link
            href="/drinkit"
            className="text-xs font-bold text-amber hover:text-amber-glow flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Explore All Spirits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        {/* ── Layout-animated tab switcher ── */}
        <AnimatedSection delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {tiers.map((t) => {
            const isActive = activeTier === t.id;
            return (
              <motion.button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={`relative p-3.5 sm:p-4 rounded-2xl text-left border flex flex-col justify-between overflow-hidden transition-colors duration-200 ${
                  isActive
                    ? `${t.activeRing} shadow-lg`
                    : `bg-surface/80 border-white/10 text-muted ${t.tabHover}`
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Layout-animated active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="budgetTabActive"
                    className={`absolute inset-0 ${t.activeBg} rounded-2xl`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative text-sm sm:text-base font-extrabold block ${isActive ? "" : "text-cream"}`}>
                  {t.label}
                </span>
                <span className="relative text-[11px] font-medium text-muted mt-1 line-clamp-1">
                  {t.subtitle}
                </span>
              </motion.button>
            );
          })}
        </AnimatedSection>

        {/* ── AnimatePresence product grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
          >
            {filteredProducts.map((drink, idx) => {
              const compared = isInCompare(drink.id);
              const wishlisted = isInWishlist(drink.id);

              return (
                <motion.div
                  key={drink.id}
                  className={`group bg-surface/90 backdrop-blur-md rounded-2xl border border-white/10 ${currentTierConfig.cardBorderHover} p-4 flex flex-col justify-between transition-colors duration-300`}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: idx * 0.04,
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  whileHover={{ y: -7, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    {/* Top Badges & Actions */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${currentTierConfig.badgeColor}`}>
                        {drink.badge || drink.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <motion.button
                          onClick={() => toggleCompare(drink)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            compared ? "bg-amber text-base border-amber" : "bg-base/80 text-muted hover:text-cream border-white/5"
                          }`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.88 }}
                          title={compared ? "Remove from comparison" : "Add to comparison"}
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </motion.button>
                        <motion.button
                          onClick={() => toggleWishlist(drink)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            wishlisted ? "bg-amber/20 text-amber border-amber/30" : "bg-base/80 text-muted hover:text-cream border-white/5"
                          }`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.88 }}
                          title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-amber text-amber" : ""}`} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Bottle Image */}
                    <Link href={`/drink/${drink.id}`} className="block relative aspect-square rounded-xl overflow-hidden bg-base/50 p-2 mb-3">
                      <motion.img
                        src={drink.image}
                        alt={drink.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                      <span className="absolute bottom-2 left-2 bg-base/90 text-cream text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                        {drink.abv}
                      </span>
                      <span className="absolute bottom-2 right-2 bg-base/90 text-muted text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
                        {drink.volume}
                      </span>
                    </Link>

                    <span className="text-[11px] font-bold text-muted block uppercase tracking-wider mb-0.5">
                      {drink.brand}
                    </span>
                    <Link href={`/drink/${drink.id}`}>
                      <h3 className="text-sm font-bold text-cream line-clamp-2 group-hover:text-amber transition-colors mb-1.5">
                        {drink.title}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {drink.tastingNotes.slice(0, 3).map((note, i) => (
                        <span key={i} className="text-[10px] bg-base/60 text-muted px-2 py-0.5 rounded border border-white/5">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-cream font-serif">₹{drink.price}</span>
                      {drink.originalPrice && drink.originalPrice > drink.price && (
                        <span className="text-[10px] text-muted line-through">₹{drink.originalPrice}</span>
                      )}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/drink/${drink.id}`}
                        className={`${currentTierConfig.buttonColor} font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md`}
                      >
                        View Specs
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BudgetTiers;
