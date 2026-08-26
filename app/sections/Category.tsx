"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Category: React.FC = () => {
  const categoriesWithColors = [
    { id: "single-malts", name: "Single Malts", slug: "single-malts", icon: "🍸", color: "from-amber-500/20 to-amber-600/5", border: "hover:border-amber-500/50", text: "group-hover:text-amber-400", badge: "bg-amber-500/15 text-amber-300" },
    { id: "blended-scotch", name: "Blended Scotch", slug: "blended-scotch", icon: "🥃", color: "from-orange-500/20 to-orange-600/5", border: "hover:border-orange-500/50", text: "group-hover:text-orange-400", badge: "bg-orange-500/15 text-orange-300" },
    { id: "whisky", name: "Indian Whiskies", slug: "spirits", icon: "🏺", color: "from-yellow-500/20 to-yellow-600/5", border: "hover:border-yellow-500/50", text: "group-hover:text-yellow-400", badge: "bg-yellow-500/15 text-yellow-300" },
    { id: "beer", name: "Craft & Beers", slug: "craft-beers", icon: "🍺", color: "from-emerald-500/20 to-emerald-600/5", border: "hover:border-emerald-500/50", text: "group-hover:text-emerald-400", badge: "bg-emerald-500/15 text-emerald-300" },
    { id: "gin", name: "Gin & Botanicals", slug: "gin", icon: "🌿", color: "from-teal-500/20 to-teal-600/5", border: "hover:border-teal-500/50", text: "group-hover:text-teal-400", badge: "bg-teal-500/15 text-teal-300" },
    { id: "vodka", name: "Vodka", slug: "vodka", icon: "🧊", color: "from-cyan-500/20 to-cyan-600/5", border: "hover:border-cyan-500/50", text: "group-hover:text-cyan-400", badge: "bg-cyan-500/15 text-cyan-300" },
    { id: "rum", name: "Aged Rum", slug: "rum", icon: "🏴‍☠️", color: "from-red-500/20 to-red-600/5", border: "hover:border-red-500/50", text: "group-hover:text-red-400", badge: "bg-red-500/15 text-red-300" },
    { id: "wine", name: "Fine Wines", slug: "fine-wines", icon: "🍷", color: "from-rose-500/20 to-rose-600/5", border: "hover:border-rose-500/50", text: "group-hover:text-rose-400", badge: "bg-rose-500/15 text-rose-300" },
    { id: "tequila", name: "Tequila & Agave", slug: "tequila", icon: "🌵", color: "from-lime-500/20 to-lime-600/5", border: "hover:border-lime-500/50", text: "group-hover:text-lime-400", badge: "bg-lime-500/15 text-lime-300" },
    { id: "champagne", name: "Champagne", slug: "champagne", icon: "🥂", color: "from-purple-500/20 to-purple-600/5", border: "hover:border-purple-500/50", text: "group-hover:text-purple-400", badge: "bg-purple-500/15 text-purple-300" },
    { id: "ready-to-drink", name: "Ready To Drink", slug: "ready-to-drink", icon: "🍹", color: "from-pink-500/20 to-pink-600/5", border: "hover:border-pink-500/50", text: "group-hover:text-pink-400", badge: "bg-pink-500/15 text-pink-300" },
  ];

  return (
    <section className="py-6 sm:py-8 bg-surface/30 border-y border-white/5 relative z-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber to-rose-500 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold font-serif text-cream">
              Browse by Category
            </h2>
            <span className="text-xs text-muted hidden sm:inline">
              Curated by flavor profiles &amp; distillation styles
            </span>
          </div>

          <Link
            href="/drinkit"
            className="text-xs font-bold text-amber hover:text-amber-glow flex items-center gap-1 transition-colors"
          >
            <span>View All ({categoriesWithColors.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categoriesWithColors.map((cat) => (
            <Link
              key={cat.id}
              href={`/drinkit?category=${cat.slug}`}
              className={`group flex flex-col items-center justify-center p-3.5 min-w-[105px] sm:min-w-[118px] rounded-2xl bg-gradient-to-b ${cat.color} bg-surface/85 backdrop-blur-md border border-white/10 ${cat.border} transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 text-center shadow-sm hover:shadow-xl focus-visible:ring-2 focus-visible:ring-amber`}
            >
              <div className="w-12 h-12 rounded-xl bg-base/80 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform border border-white/10 shadow-inner">
                {cat.icon}
              </div>
              <span className={`text-xs font-bold text-cream ${cat.text} transition-colors line-clamp-1`}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;