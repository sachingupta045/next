"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Flame, DollarSign, Scale, Utensils, Sparkles, ArrowRight } from "lucide-react";

export const Hero: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const trendingTags = [
    { label: "Indri Trini", slug: "drink-indri" },
    { label: "Glenfiddich 12", slug: "drink-glenfiddich-12" },
    { label: "Monkey Shoulder", slug: "drink-monkey-shoulder" },
    { label: "Amrut Fusion", slug: "drink-amrut-fusion" },
    { label: "Old Monk", slug: "drink-old-monk-legend" },
    { label: "Corona Extra", slug: "drink-corona" },
    { label: "Bombay Sapphire", slug: "drink-bombay-sapphire" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/drinkit?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden bg-transparent">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Center Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Sommelier Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-sky-500/30 text-sky-300 text-xs font-bold mb-4 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>India&apos;s Independent Liquor Price &amp; Taste Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-cream leading-[1.15] mb-4">
            Compare Prices. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text">
              Discover Fine Spirits.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            Search verified state prices, ABV strengths, tasting notes, and sommelier food pairings for over 500+ Indian &amp; international bottles.
          </p>

          {/* Central Search Form with Bombay Sapphire Focus */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 max-w-2xl mx-auto relative flex items-center shadow-2xl"
          >
            <div className="relative w-full flex items-center bg-surface/95 backdrop-blur-xl border-2 border-white/10 focus-within:border-sky-400 focus-within:shadow-[0_0_24px_rgba(56,189,248,0.25)] rounded-2xl transition-all overflow-hidden p-1">
              <Search className="w-5 h-5 text-muted ml-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Single Malts, Gin, Craft Beers, Rum, Wine..."
                className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-cream placeholder:text-muted outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 text-xs sm:text-sm shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Trending Search Chips */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-3.5 text-xs">
            <span className="text-muted text-[11px] font-semibold mr-1">Trending:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag.slug}
                onClick={() => router.push(`/drinkit?search=${encodeURIComponent(tag.label)}`)}
                className="bg-surface/80 hover:bg-surface border border-white/10 hover:border-sky-400/40 text-cream px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Clean Action Cards with Distinctive Color Accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* Card 1: The Pour Lineup (Flame Orange) */}
          <a
            href="#trending-lineup"
            className="group p-4 rounded-2xl bg-surface/80 hover:bg-orange-950/20 border border-white/10 hover:border-orange-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.18)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-black text-orange-300 bg-orange-500/15 px-2 py-0.5 rounded-md border border-orange-500/30">
                Trending
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-orange-300 transition-colors">
                The Pour Lineup
              </h3>
              <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                India&apos;s most popular sips
              </p>
            </div>
          </a>

          {/* Card 2: Budget Explorer (Emerald Green) */}
          <a
            href="#budget-tiers"
            className="group p-4 rounded-2xl bg-surface/80 hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.18)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-black text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
                ₹ Price Tiers
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-emerald-300 transition-colors">
                Budget Explorer
              </h3>
              <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                Under ₹1k, ₹2.5k &amp; Luxury
              </p>
            </div>
          </a>

          {/* Card 3: Compare Spirits (Ice Cyan) */}
          <Link
            href="/compare"
            className="group p-4 rounded-2xl bg-surface/80 hover:bg-cyan-950/20 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.18)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-black text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                Side-by-Side
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-cyan-300 transition-colors">
                Compare Spirits
              </h3>
              <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                ABV, flavor notes &amp; price
              </p>
            </div>
          </Link>

          {/* Card 4: Brand Stories (Rose Gold & Burgundy) */}
          <a
            href="#brand-spotlight"
            className="group p-4 rounded-2xl bg-surface/80 hover:bg-rose-950/20 border border-white/10 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(244,63,94,0.18)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-black text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded-md border border-rose-500/30">
                Distilleries
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-rose-300 transition-colors">
                Brand Stories
              </h3>
              <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                Heritage &amp; distilleries
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;