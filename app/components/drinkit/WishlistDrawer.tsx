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
      <div onClick={() => setIsWishlistOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm bg-surface border-l border-white/5 text-cream h-full flex flex-col shadow-2xl z-10 animate-slide-left">

        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-amber/5">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-amber fill-amber" />
            <h3 className="font-black text-base text-cream">Wishlist ({wishlistItems.length})</h3>
          </div>
          <div className="flex items-center gap-3">
            {wishlistItems.length > 0 && (
              <button onClick={clearWishlist} className="text-xs text-amber hover:text-amber-glow font-bold transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">
                Clear All
              </button>
            )}
            <button onClick={() => setIsWishlistOpen(false)} className="w-7 h-7 rounded-full bg-base flex items-center justify-center text-muted hover:text-cream transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-amber">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center text-amber mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-cream mb-1">Your Wishlist is Empty</h4>
              <p className="text-xs text-muted max-w-xs mb-6 leading-relaxed">
                Tap the heart icon on any drink to save it here for later.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-gradient-to-br from-amber to-amber-glow text-base font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-amber-glow"
              >
                Explore Beverages
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-base rounded-2xl border border-white/5 hover:border-amber/20 transition-colors">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/5"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-amber-glow uppercase tracking-wider block">{item.abv} ABV · {item.volume}</span>
                  <Link
                    href={`/drink/${item.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="text-xs font-bold text-cream hover:text-amber truncate block leading-tight mt-0.5 transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 fill-amber-glow text-amber-glow" />
                    <span className="text-[10px] font-semibold text-muted">{item.rating.toFixed(1)}</span>
                    <span className="text-xs font-black text-amber font-serif ml-1">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="p-2 text-muted hover:text-oxblood transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-amber rounded"
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
          <div className="p-4 border-t border-white/5">
            <Link
              href="/drinkit"
              onClick={() => setIsWishlistOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-br from-amber to-amber-glow text-base font-bold text-sm shadow-[0_4px_16px_rgba(193,122,61,0.25)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.35)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-amber-glow"
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
