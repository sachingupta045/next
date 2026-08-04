"use client";

import React from "react";
import { X, Heart, Trash2, ArrowRight, Star } from "lucide-react";
import { useWishlistCompare } from "../../context/WishlistCompareContext";
import Link from "next/link";

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistItems, toggleWishlist, clearWishlist } = useWishlistCompare();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div onClick={() => setIsWishlistOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white h-full flex flex-col shadow-2xl z-10 animate-slide-left">

        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-rose-50 dark:bg-rose-950/20">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-black text-base text-slate-900 dark:text-white">Wishlist ({wishlistItems.length})</h3>
          </div>
          <div className="flex items-center gap-3">
            {wishlistItems.length > 0 && (
              <button onClick={clearWishlist} className="text-xs text-rose-500 hover:text-rose-700 font-bold transition-colors">
                Clear All
              </button>
            )}
            <button onClick={() => setIsWishlistOpen(false)} className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shadow-sm">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center text-rose-400 mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">Your Wishlist is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
                Tap the heart icon on any drink to save it here for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Explore Beverages
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#f6a623] uppercase tracking-wider block">{item.abv} ABV · {item.volume}</span>
                  <Link
                    href={`/drink/${item.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-xs font-bold text-slate-900 dark:text-white hover:text-[#e8281a] dark:hover:text-red-400 truncate block leading-tight mt-0.5 transition-colors"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 fill-[#f6a623] text-[#f6a623]" />
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.rating.toFixed(1)}</span>
                    <span className="text-xs font-black text-[#e8281a] dark:text-red-400 font-serif ml-1">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shrink-0"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        {wishlistItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/drinkit"
              onClick={() => setIsWishlistOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
