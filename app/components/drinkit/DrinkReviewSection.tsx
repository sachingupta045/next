"use client";

import React from "react";
import { Star, ThumbsUp, CheckCircle, MessageSquare } from "lucide-react";
import { DrinkReview } from "../../types/drinkit";

interface DrinkReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviews: DrinkReview[];
}

export const DrinkReviewSection: React.FC<DrinkReviewSectionProps> = ({
  rating,
  reviewCount,
  reviews,
}) => {
  return (
    <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 sm:p-8 my-8 backdrop-blur-md">
      {/* Section Header */}
      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-6">
        Customer Ratings & Reviews
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-800">
        {/* Rating Summary Box */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
          <span className="text-4xl sm:text-5xl font-black text-emerald-400 mb-1">
            {rating.toFixed(1)}
          </span>
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Based on {reviewCount} Sommelier & Customer Reviews
          </span>
        </div>

        {/* Rating Distribution Bars */}
        <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
          {[
            { stars: 5, pct: 85 },
            { stars: 4, pct: 10 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3 text-xs font-bold text-slate-300">
              <span className="w-12">{stars} Stars</span>
              <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-slate-400 font-normal">
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs font-medium">
            Be the first sommelier to leave a review for this beverage!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-xs font-bold">
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded flex items-center gap-0.5 border border-emerald-900/40">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 bg-amber-950/40 px-2 py-1 rounded-lg text-xs font-bold">
                  <span>{rev.rating}</span>
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
              </div>

              <h6 className="text-xs font-extrabold text-slate-200">
                {rev.title}
              </h6>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {rev.comment}
              </p>

              <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-400">
                <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
