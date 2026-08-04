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
    <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-8 my-8 backdrop-blur-md">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide mb-1.5">
            <Utensils className="w-3.5 h-3.5" />
            Sommelier Recommendation
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Grab with Foods (Perfect Pairings)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Curated gourmet dishes scientifically paired to complement <span className="text-emerald-400 font-bold">{drinkTitle}</span>
          </p>
        </div>

        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-medium shrink-0 self-start sm:self-auto">
          {pairings.length} Recommended Dishes
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {pairings.map((food) => (
          <div
            key={food.id}
            className="group bg-slate-950 border border-slate-800/90 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/20"
          >
            <div>
              {/* Image & Price */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900">
                <img
                  src={food.image}
                  alt={food.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  {food.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-slate-950 text-white font-extrabold text-xs px-2 py-1 rounded-lg border border-slate-800">
                  ₹{food.price}
                </span>
              </div>

              {/* Title & Rating */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {food.title}
                </h4>
                <div className="flex items-center gap-0.5 bg-amber-950/50 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">
                  <span>{food.rating.toFixed(1)}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Pairing Reason Box */}
              <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed mb-3">
                <span className="text-amber-400 font-bold block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Pairing Note:
                </span>
                "{food.pairingReason}"
              </div>
            </div>

            {/* Quick Add Pairing button */}
            <button
              onClick={() => alert(`Added "${food.title}" pairing note to your order tasting menu!`)}
              className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs py-2 rounded-xl border border-amber-500/30 hover:border-amber-500 transition-all flex items-center justify-center gap-1.5"
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
