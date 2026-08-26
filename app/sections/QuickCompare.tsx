"use client";

import React, { useState } from "react";
import Link from "next/link";
import { drinkitProducts } from "../data/drinkitData";
import { Scale, ArrowRight, Swords, Sparkles } from "lucide-react";

export const QuickCompare: React.FC = () => {
  const matchUps = [
    {
      title: "Indri Trini vs Glenfiddich 12",
      drinkAId: "drink-indri",
      drinkBId: "drink-glenfiddich-12",
    },
    {
      title: "Monkey Shoulder vs Amrut Fusion",
      drinkAId: "drink-monkey-shoulder",
      drinkBId: "drink-amrut-fusion",
    },
    {
      title: "The Macallan 12 vs Château Margaux",
      drinkAId: "drink-macallan-12",
      drinkBId: "drink-chateau-margaux",
    },
  ];

  const [selectedMatchUpIndex, setSelectedMatchUpIndex] = useState(0);
  const currentMatch = matchUps[selectedMatchUpIndex];

  const drinkA = drinkitProducts.find((d) => d.id === currentMatch.drinkAId) || drinkitProducts[0];
  const drinkB = drinkitProducts.find((d) => d.id === currentMatch.drinkBId) || drinkitProducts[1];

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent relative z-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2 shadow-sm">
            <Swords className="w-3.5 h-3.5" />
            <span>Interactive Battle of Spirits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-cream tracking-tight">
            Compare Specs Side-by-Side
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Compare flavor profiles, alcohol strength (ABV), state pricing, and cask types before buying.
          </p>
        </div>

        {/* Matchup Selector Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {matchUps.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMatchUpIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedMatchUpIndex === idx
                  ? "bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-white border-cyan-400/50 shadow-md shadow-cyan-950/30 scale-105"
                  : "bg-surface/80 text-muted hover:text-cream border-white/10 hover:border-white/30"
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* 2-Bottle Dual Contrast Comparison Card (Amber vs Cyan) */}
        <div className="max-w-4xl mx-auto bg-surface/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Bloom */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Central VS Badge (Crimson Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white font-black text-sm flex items-center justify-center shadow-2xl border-4 border-surface z-20 hidden sm:flex animate-pulse">
            VS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 relative z-10">
            {/* Drink A (Amber Flame Side) */}
            <div className="flex flex-col justify-between bg-amber-950/20 p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {drinkA.badge || drinkA.category}
                  </span>
                  <span className="text-xs font-bold text-amber-200 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {drinkA.abv} ABV
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl bg-base/60 p-2 mb-4 flex items-center justify-center border border-amber-500/10">
                  <img
                    src={drinkA.image}
                    alt={drinkA.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider mb-0.5">
                  {drinkA.brand}
                </span>
                <h3 className="text-base font-bold text-cream mb-2 font-serif">
                  {drinkA.title}
                </h3>

                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between text-muted border-b border-amber-500/10 pb-1">
                    <span>Origin</span>
                    <span className="font-semibold text-cream">{drinkA.origin}</span>
                  </div>
                  <div className="flex justify-between text-muted border-b border-amber-500/10 pb-1">
                    <span>Volume</span>
                    <span className="font-semibold text-cream">{drinkA.volume}</span>
                  </div>
                  <div className="flex justify-between text-muted border-b border-amber-500/10 pb-1">
                    <span>Type</span>
                    <span className="font-semibold text-cream">{drinkA.type}</span>
                  </div>
                </div>

                {/* Tasting notes */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {drinkA.tastingNotes.slice(0, 3).map((note, i) => (
                    <span key={i} className="text-[10px] bg-amber-500/10 text-amber-200 px-2 py-0.5 rounded border border-amber-500/20">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-amber-500/15">
                <span className="text-lg font-black text-amber-300 font-serif">
                  ₹{drinkA.price}
                </span>
                <Link
                  href={`/drink/${drinkA.id}`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                >
                  Full Profile →
                </Link>
              </div>
            </div>

            {/* Drink B (Ice Cyan Side) */}
            <div className="flex flex-col justify-between bg-cyan-950/20 p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {drinkB.badge || drinkB.category}
                  </span>
                  <span className="text-xs font-bold text-cyan-200 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {drinkB.abv} ABV
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl bg-base/60 p-2 mb-4 flex items-center justify-center border border-cyan-500/10">
                  <img
                    src={drinkB.image}
                    alt={drinkB.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider mb-0.5">
                  {drinkB.brand}
                </span>
                <h3 className="text-base font-bold text-cream mb-2 font-serif">
                  {drinkB.title}
                </h3>

                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between text-muted border-b border-cyan-500/10 pb-1">
                    <span>Origin</span>
                    <span className="font-semibold text-cream">{drinkB.origin}</span>
                  </div>
                  <div className="flex justify-between text-muted border-b border-cyan-500/10 pb-1">
                    <span>Volume</span>
                    <span className="font-semibold text-cream">{drinkB.volume}</span>
                  </div>
                  <div className="flex justify-between text-muted border-b border-cyan-500/10 pb-1">
                    <span>Type</span>
                    <span className="font-semibold text-cream">{drinkB.type}</span>
                  </div>
                </div>

                {/* Tasting notes */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {drinkB.tastingNotes.slice(0, 3).map((note, i) => (
                    <span key={i} className="text-[10px] bg-cyan-500/10 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/20">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-cyan-500/15">
                <span className="text-lg font-black text-cyan-300 font-serif">
                  ₹{drinkB.price}
                </span>
                <Link
                  href={`/drink/${drinkB.id}`}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                >
                  Full Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Full Compare Table CTA */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95 text-xs sm:text-sm hover:shadow-cyan-950/40"
            >
              <Scale className="w-4 h-4" />
              <span>Launch Custom Side-by-Side Comparison Tool</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickCompare;
