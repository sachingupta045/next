"use client";

import React from "react";
import Link from "next/link";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { Scale, Heart, Wine } from "lucide-react";

export const Header: React.FC = () => {
  const { compareItems, wishlistItems, setIsWishlistOpen, setIsCompareModalOpen } = useWishlistCompare();

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-white/10 text-cream transition-colors shadow-lg shadow-black/30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <Wine className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black font-serif tracking-tight text-cream">
                Drink<span className="text-sky-400">it</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-sky-300/80 mt-0.5">
                Liquor &amp; Taste Guide
              </span>
            </div>
          </Link>
        </div>

        {/* Global Live Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <HeaderSearchBar />
        </div>

        {/* Action Buttons: Compare & Wishlist */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Compare Button */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-base/80 hover:bg-sky-950/40 border border-white/10 hover:border-sky-400/40 text-cream text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Compare Drinks"
          >
            <Scale className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Compare</span>
            {compareItems.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {compareItems.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative px-3.5 py-2 rounded-full bg-base/80 hover:bg-sky-950/40 border border-white/10 hover:border-sky-400/40 text-cream text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-sky-400 flex items-center gap-1.5"
            title="My Saved Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistItems.length > 0 ? "text-sky-400 fill-sky-400" : "text-muted"}`} />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {wishlistItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar below */}
      <div className="md:hidden px-4 pb-3">
        <HeaderSearchBar />
      </div>
    </header>
  );
};

export default Header;
