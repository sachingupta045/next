"use client";

import React from "react";
import { Zap, Sparkles } from "lucide-react";

interface CategoryBannerProps {
  categoryName: string;
}

export const CategoryBanner: React.FC<CategoryBannerProps> = ({ categoryName }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-4 sm:p-6 text-white mb-5 shadow-lg shadow-emerald-950/10">
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wide mb-2 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            Super Savings Deals
          </div>
          <h2 className="text-lg sm:text-2xl font-black leading-tight tracking-tight">
            Up to 40% OFF on {categoryName}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium max-w-lg">
            Freshly delivered to your doorstep in 10 minutes with zero delivery charge on orders above ₹199!
          </p>
        </div>

        <button className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Claim Deals</span>
        </button>
      </div>

      {/* Decorative background glow circles */}
      <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute right-32 -top-10 w-32 h-32 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
    </div>
  );
};
