"use client";

import React from "react";
import { Zap, Sparkles } from "lucide-react";

interface CategoryBannerProps {
  categoryName: string;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({ categoryName }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface via-amber/20 to-surface p-4 sm:p-6 text-cream mb-5 border border-amber/30 shadow-xl">
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber text-base px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide mb-2 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-base" />
            Special Reserve Deals
          </div>
          <h2 className="text-lg sm:text-2xl font-black leading-tight tracking-tight font-serif">
            Exclusive Offers on {categoryName}
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 font-medium max-w-lg">
            Curated and handled with exceptional care. Delivered directly to your door.
          </p>
        </div>

        <button className="bg-gradient-to-r from-amber to-amber-glow text-base text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-amber-glow">
          <Sparkles className="w-4 h-4" />
          <span>Claim Deals</span>
        </button>
      </div>

      {/* Decorative background glow circles */}
      <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-amber/15 blur-xl pointer-events-none" />
      <div className="absolute right-32 -top-10 w-32 h-32 rounded-full bg-amber-glow/10 blur-xl pointer-events-none" />
    </div>
  );
};
