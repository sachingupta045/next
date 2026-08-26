"use client";

import React, { useState } from "react";
import Link from "next/link";
import { drinkitProducts } from "../data/drinkitData";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { Scale, Heart, Sparkles, ArrowRight, ShieldCheck, Tag } from "lucide-react";

export const BudgetTiers: React.FC = () => {
  const [activeTier, setActiveTier] = useState<"under-1000" | "1000-2500" | "2500-5000" | "5000-plus">("2500-5000");
  const { toggleCompare, isInCompare, toggleWishlist, isInWishlist } = useWishlistCompare();

  const tiers = [
    {
      id: "under-1000",
      label: "Under ₹1,000",
      subtitle: "Everyday Sips & Chillers",
      theme: "emerald",
      tabActive: "bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-emerald-950/40",
      pillBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      cardBorderHover: "hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]",
      buttonColor: "bg-gradient-to-r from-emerald-600 to-teal-500 text-white",
      badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
    },
    {
      id: "1000-2500",
      label: "₹1,000 – ₹2,500",
      subtitle: "Weekend Gatherings & Gins",
      theme: "blue",
      tabActive: "bg-indigo-500/15 border-indigo-500 text-indigo-300 shadow-indigo-950/40",
      pillBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      cardBorderHover: "hover:border-indigo-500/40 hover:shadow-[0_0_24px_rgba(99,102,241,0.18)]",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-blue-500 text-white",
      badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/40",
    },
    {
      id: "2500-5000",
      label: "₹2,500 – ₹5,000",
      subtitle: "Craft Malts & Celebrations",
      theme: "amber",
      tabActive: "bg-amber-500/15 border-amber-500 text-amber-300 shadow-amber-950/40",
      pillBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      cardBorderHover: "hover:border-amber-500/40 hover:shadow-[0_0_24px_rgba(245,158,11,0.18)]",
      buttonColor: "bg-gradient-to-r from-amber-600 to-amber-500 text-base",
      badgeColor: "text-amber-400 bg-amber-950/60 border-amber-800/40",
    },
    {
      id: "5000-plus",
      label: "₹5,000+",
      subtitle: "Luxury Single Malts & Prestige",
      theme: "purple",
      tabActive: "bg-purple-500/15 border-purple-500 text-purple-300 shadow-purple-950/40",
      pillBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      cardBorderHover: "hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)]",
      buttonColor: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800/40",
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
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
        </div>

        {/* 4 Distinct Color Tier Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {tiers.map((t) => {
            const isActive = activeTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id as typeof activeTier)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? `${t.tabActive} shadow-lg scale-[1.02]`
                    : "bg-surface/80 hover:bg-surface border-white/10 text-muted hover:text-cream"
                }`}
              >
                <span className={`text-sm sm:text-base font-extrabold block ${isActive ? "" : "text-cream"}`}>
                  {t.label}
                </span>
                <span className="text-[11px] font-medium text-muted mt-1 line-clamp-1">
                  {t.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((drink) => {
            const compared = isInCompare(drink.id);
            const wishlisted = isInWishlist(drink.id);

            return (
              <div
                key={drink.id}
                className={`group bg-surface/90 backdrop-blur-md rounded-2xl border border-white/10 ${currentTierConfig.cardBorderHover} p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]`}
              >
                <div>
                  {/* Top Badges & Actions */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${currentTierConfig.badgeColor}`}>
                      {drink.badge || drink.category}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Compare Icon Button */}
                      <button
                        onClick={() => toggleCompare(drink)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          compared
                            ? "bg-amber text-base border-amber"
                            : "bg-base/80 text-muted hover:text-cream border-white/5"
                        }`}
                        title={compared ? "Remove from comparison" : "Add to comparison"}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(drink)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          wishlisted
                            ? "bg-amber/20 text-amber border-amber/30"
                            : "bg-base/80 text-muted hover:text-cream border-white/5"
                        }`}
                        title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                      >
                        <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-amber text-amber" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Bottle Image */}
                  <Link href={`/drink/${drink.id}`} className="block relative aspect-square rounded-xl overflow-hidden bg-base/50 p-2 mb-3">
                    <img
                      src={drink.image}
                      alt={drink.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* ABV Chip */}
                    <span className="absolute bottom-2 left-2 bg-base/90 text-cream text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                      {drink.abv}
                    </span>
                    {/* Volume */}
                    <span className="absolute bottom-2 right-2 bg-base/90 text-muted text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
                      {drink.volume}
                    </span>
                  </Link>

                  {/* Title & Brand */}
                  <span className="text-[11px] font-bold text-muted block uppercase tracking-wider mb-0.5">
                    {drink.brand}
                  </span>
                  <Link href={`/drink/${drink.id}`}>
                    <h3 className="text-sm font-bold text-cream line-clamp-2 group-hover:text-amber transition-colors mb-1.5">
                      {drink.title}
                    </h3>
                  </Link>

                  {/* Tasting Note Chips */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {drink.tastingNotes.slice(0, 3).map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-base/60 text-muted px-2 py-0.5 rounded border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Bar & View Specs Button */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-black text-cream font-serif">
                      ₹{drink.price}
                    </span>
                    {drink.originalPrice && drink.originalPrice > drink.price && (
                      <span className="text-[10px] text-muted line-through">
                        ₹{drink.originalPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/drink/${drink.id}`}
                    className={`${currentTierConfig.buttonColor} font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md active:scale-95`}
                  >
                    View Specs
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BudgetTiers;
