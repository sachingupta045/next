"use client";

import React from "react";
import { Utensils, Star, Sparkles, Plus } from "lucide-react";
import { FoodPairing } from "../../types/drinkit";

interface FoodPairingSectionProps {
  pairings: FoodPairing[];
  drinkTitle: string;
}

export const FoodPairingSection: React.FC<FoodPairingSectionProps> = ({
  pairings,
  drinkTitle,
}) => {
  if (!pairings || pairings.length === 0) return null;

  return (
    <section className="bg-surface/85 border border-white/10 rounded-3xl p-5 sm:p-8 my-8 backdrop-blur-md">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber text-base px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide mb-1.5 shadow-sm">
            <Utensils className="w-3.5 h-3.5" />
            Sommelier Recommendation
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-cream tracking-tight font-serif">
            Grab with Foods (Perfect Pairings)
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Curated gourmet dishes scientifically paired to complement <span className="text-amber font-bold">{drinkTitle}</span>
          </p>
        </div>

        <span className="text-xs text-sage bg-sage/10 px-3 py-1.5 rounded-xl border border-sage/20 font-medium shrink-0 self-start sm:self-auto">
          {pairings.length} Recommended Dishes
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {pairings.map((food) => (
          <div
            key={food.id}
            className="group bg-base/70 border border-white/10 hover:border-amber/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)]"
          >
            <div>
              {/* Image & Price */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-base">
                <img
                  src={food.image}
                  alt={food.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-base/80 backdrop-blur-md text-amber-glow border border-amber/30 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  {food.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-surface text-cream font-extrabold text-xs px-2 py-1 rounded-lg border border-white/10">
                  ₹{food.price}
                </span>
              </div>

              {/* Title & Rating */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-extrabold text-cream group-hover:text-amber transition-colors leading-tight">
                  {food.title}
                </h4>
                <div className="flex items-center gap-0.5 bg-amber/15 text-amber px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
                  <span>{food.rating.toFixed(1)}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-glow text-amber-glow" />
                </div>
              </div>

              {/* Pairing Reason Box */}
              <div className="bg-surface/60 rounded-xl p-2.5 border border-white/5 text-[11px] text-muted leading-relaxed mb-3">
                <span className="text-amber font-bold block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Pairing Note:
                </span>
                &quot;{food.pairingReason}&quot;
              </div>
            </div>

            {/* Quick Add Pairing button */}
            <button
              onClick={() => alert(`Added "${food.title}" pairing note to your order tasting menu!`)}
              className="w-full bg-base hover:bg-amber hover:text-base text-amber font-bold text-xs py-2 rounded-xl border border-amber/30 hover:border-amber transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Pair This Food</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
