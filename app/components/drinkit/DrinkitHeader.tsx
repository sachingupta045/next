"use client";

import React from "react";
import Link from "next/link";
import { Search, Heart, Scale, Zap, ArrowLeft, Wine } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white transition-colors">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Delivery Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group text-white hover:text-emerald-400 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <Wine className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight flex items-center gap-1">
                  Drinkit<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                  Tasting & Sommelier
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full text-xs">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-slate-950" />
                10 MINS
              </span>
              <span className="text-slate-300 font-medium">
                Chilled Delivery
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search wines, craft beers, single malts, coffees..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-900 text-white rounded-xl border border-slate-800 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Header Action Buttons (Wishlist & Compare) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Compare Trigger Button */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3 py-2 rounded-xl transition-all text-xs font-bold"
              title="Compare Drinks"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Compare</span>
              {compareItems.length > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </button>

            {/* Wishlist Trigger Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex items-center gap-1.5 bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-900/40 px-3 py-2 rounded-xl transition-all text-xs font-bold"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlistItems.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
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
