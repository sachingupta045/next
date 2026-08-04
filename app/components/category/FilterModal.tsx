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
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-full flex flex-col shadow-2xl z-10 animate-slide-left">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-base">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Filter Products</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Diet Preference */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-wider">
              Diet Preference
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  onApplyFilters({ isVegOnly: !filters.isVegOnly })
                }
                className={`flex-1 p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  filters.isVegOnly
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <span className="w-3 h-3 rounded-xs border-2 border-emerald-600 flex items-center justify-center p-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                </span>
                <span>Veg Only</span>
                {filters.isVegOnly && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-wider">
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
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-400 mt-1">
              <span>₹20</span>
              <span>₹500+</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-400 mb-3 tracking-wider">
              Minimum Rating
            </h4>
            <div className="flex flex-wrap gap-2">
              {[4.5, 4.0, 3.5, 0].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => onApplyFilters({ minRating: ratingVal })}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                    filters.minRating === ratingVal
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                  }`}
                >
                  {ratingVal === 0 ? (
                    "All Ratings"
                  ) : (
                    <>
                      <span>{ratingVal}+</span>
                      <Star className="w-3 h-3 fill-current" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
          <button
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
