"use client";

import React from "react";
import Link from "next/link";
import { drinkitProducts } from "../data/drinkitData";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { Flame, Star, Scale, ArrowRight, TrendingUp } from "lucide-react";

export const TrendingLineup: React.FC = () => {
  const { toggleCompare, isInCompare } = useWishlistCompare();

  // Pick top 5 trending drinks
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold mb-2 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400 animate-bounce" />
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
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>View Full Leaderboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trending List Cards with Coral/Flame Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {trendingList.map((drink, index) => {
            const compared = isInCompare(drink.id);

            return (
              <div
                key={drink.id}
                className="group relative bg-surface/90 backdrop-blur-md rounded-2xl border border-orange-500/15 hover:border-orange-500/50 p-4 transition-all duration-300 hover:shadow-[0_0_28px_rgba(249,115,22,0.18)] flex gap-4 items-center"
              >
                {/* Ranking Position Badge */}
                <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-orange-950/50 border border-orange-300/30">
                  #{index + 1}
                </div>

                {/* Bottle Thumbnail */}
                <Link
                  href={`/drink/${drink.id}`}
                  className="w-20 h-24 rounded-xl bg-base/60 p-1.5 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform"
                >
                  <img
                    src={drink.image}
                    alt={drink.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
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
                    <span className="bg-orange-500/10 text-orange-300 px-1.5 py-0.2 rounded border border-orange-500/20 font-semibold">
                      {drink.abv}
                    </span>
                    <span>{drink.type}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                    <span className="text-sm sm:text-base font-extrabold text-cream font-serif">
                      ₹{drink.price}
                    </span>

                    <button
                      onClick={() => toggleCompare(drink)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                        compared
                          ? "bg-orange-500 text-white border-orange-400"
                          : "bg-base text-muted hover:text-cream border-white/10 hover:border-orange-400/40"
                      }`}
                    >
                      <Scale className="w-3 h-3" />
                      <span>{compared ? "Compared" : "Compare"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingLineup;
