"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingBag, MapPin, Zap, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface CategoryTopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryName?: string;
}

export const CategoryTopHeader: React.FC<CategoryTopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  categoryName = "Category",
}) => {
  const { totalCount, totalPrice, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Back Button & Delivery Location Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Back to home"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                  <Zap className="w-3 h-3 fill-slate-950" />
                  10 MINS
                </span>
                <span className="hidden xs:inline text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Deliver to
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold text-xs sm:text-sm cursor-pointer group">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[110px] xs:max-w-[160px] sm:max-w-[220px]">
                  Home - Sector 45, DLF Phase 4
                </span>
              </div>
            </div>
          </div>

          {/* Middle: Quick Search Input */}
          <div className="flex-1 max-w-xl mx-1 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Search in ${categoryName}...`}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right: Cart Summary Button */}
          <div className="shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 sm:gap-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 sm:px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/20 font-semibold"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider">
                  {totalCount === 0 ? "My Cart" : `${totalCount} Items`}
                </span>
                <span className="text-xs font-bold">
                  {totalCount === 0 ? "Empty" : `₹${totalPrice.toFixed(0)}`}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
