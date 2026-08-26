"use client";

import React from "react";
import Link from "next/link";
import { Search, Heart, Scale, Wine } from "lucide-react";
import { useWishlistCompare } from "../../context/WishlistCompareContext";

interface DrinkitHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DrinkitHeader: React.FC<DrinkitHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const {
    wishlistItems,
    setIsWishlistOpen,
    compareItems,
    setIsCompareModalOpen,
  } = useWishlistCompare();

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-white/10 text-cream transition-colors shadow-lg shadow-black/20">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group text-cream hover:text-sky-400 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <Wine className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight flex items-center gap-1 font-serif">
                  Drinkit<span className="text-sky-400">.</span>
                </span>
                <span className="text-[10px] text-sky-300/80 font-bold tracking-widest uppercase">
                  Tasting &amp; Sommelier
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search wines, craft beers, single malts, coffees..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-base text-cream rounded-xl border border-white/10 focus:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400 outline-none transition-all placeholder:text-muted"
              />
            </div>
          </div>

          {/* Header Action Buttons (Wishlist & Compare) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Compare Trigger Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative flex items-center gap-1.5 bg-base/80 hover:bg-sky-950/40 text-cream border border-white/10 px-3.5 py-2 rounded-xl transition-all text-xs font-bold focus-visible:ring-2 focus-visible:ring-sky-400"
              title="Compare Drinks"
            >
              <Scale className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareItems.length > 0 && (
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {compareItems.length}
                </span>
              )}
            </button>

            {/* Wishlist Trigger Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex items-center gap-1.5 bg-base/80 hover:bg-sky-950/40 text-cream border border-white/10 px-3.5 py-2 rounded-xl transition-all text-xs font-bold focus-visible:ring-2 focus-visible:ring-sky-400"
              title="View Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistItems.length > 0 ? "fill-sky-400 text-sky-400" : "text-muted"}`} />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DrinkitHeader;
