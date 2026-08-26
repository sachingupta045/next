"use client";

import React from "react";
import { X, SlidersHorizontal, Star, Check } from "lucide-react";
import { FilterState } from "../../types/category";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-sm bg-surface text-cream h-full flex flex-col shadow-2xl z-10 animate-slide-left border-l border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-base">
            <SlidersHorizontal className="w-5 h-5 text-amber" />
            <span>Filter Products</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/5 text-muted hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-amber"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Diet Preference */}
          <div>
            <h4 className="text-xs font-black uppercase text-muted mb-3 tracking-wider">
              Diet Preference
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  onApplyFilters({ isVegOnly: !filters.isVegOnly })
                }
                className={`flex-1 p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-amber ${
                  filters.isVegOnly
                    ? "border-amber bg-amber/15 text-amber"
                    : "border-white/10 text-cream hover:border-amber/40"
                }`}
              >
                <span className="w-3 h-3 rounded-xs border-2 border-sage flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                </span>
                <span>Veg Only</span>
                {filters.isVegOnly && <Check className="w-4 h-4 text-amber" />}
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-black uppercase text-muted mb-3 tracking-wider">
              Max Price: ₹{filters.maxPrice}
            </h4>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={filters.maxPrice}
              onChange={(e) =>
                onApplyFilters({ maxPrice: Number(e.target.value) })
              }
              className="w-full accent-amber cursor-pointer"
            />
            <div className="flex justify-between text-xs font-semibold text-muted mt-1">
              <span>₹20</span>
              <span>₹500+</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-xs font-black uppercase text-muted mb-3 tracking-wider">
              Minimum Rating
            </h4>
            <div className="flex flex-wrap gap-2">
              {[4.5, 4.0, 3.5, 0].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => onApplyFilters({ minRating: ratingVal })}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-amber ${
                    filters.minRating === ratingVal
                      ? "border-amber bg-amber text-base"
                      : "border-white/10 text-cream hover:border-amber"
                  }`}
                >
                  {ratingVal === 0 ? (
                    "All Ratings"
                  ) : (
                    <>
                      <span>{ratingVal}+</span>
                      <Star className="w-3 h-3 fill-current text-amber-glow" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex gap-3">
          <button
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl border border-white/15 text-cream font-bold text-xs hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-amber"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-xs transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-amber-glow"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
