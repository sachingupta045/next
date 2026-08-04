"use client";

import React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { FilterState } from "../../types/category";

interface CategoryToolbarProps {
  totalProducts: number;
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onOpenFilterModal: () => void;
}

export const CategoryToolbar: React.FC<CategoryToolbarProps> = ({
  totalProducts,
  filters,
  onFilterChange,
  onOpenFilterModal,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-4">
      {/* Product Count */}
      <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
          {totalProducts}
        </span>{" "}
        Products Available
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
        {/* Veg Only Toggle Switch */}
        <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-emerald-500 transition-colors">
          <span className="w-3 h-3 rounded-sm border-2 border-emerald-600 flex items-center justify-center p-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Veg Only
          </span>
          <input
            type="checkbox"
            checked={filters.isVegOnly}
            onChange={(e) => onFilterChange({ isVegOnly: e.target.checked })}
            className="sr-only"
          />
          <div
            className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
              filters.isVegOnly
                ? "bg-emerald-600"
                : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                filters.isVegOnly ? "translate-x-3" : "translate-x-0"
              }`}
            />
          </div>
        </label>

        {/* Sort By Dropdown */}
        <div className="relative flex items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
          <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
          <span className="text-slate-400 mr-1 hidden sm:inline">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as FilterState["sortBy"],
              })
            }
            className="bg-transparent font-bold focus:outline-none cursor-pointer text-slate-900 dark:text-white"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>

        {/* Filter Modal Trigger */}
        <button
          onClick={onOpenFilterModal}
          className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};
