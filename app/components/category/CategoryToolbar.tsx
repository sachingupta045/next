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
    <div className="flex flex-wrap items-center justify-between gap-3 bg-surface/85 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 mb-4">
      {/* Product Count */}
      <div className="text-xs sm:text-sm font-bold text-cream">
        <span className="text-amber font-extrabold">
          {totalProducts}
        </span>{" "}
        Products Available
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
        {/* Veg Only Toggle Switch */}
        <label className="flex items-center gap-2 cursor-pointer bg-base/60 px-3 py-1.5 rounded-xl border border-white/10 hover:border-amber/30 transition-colors">
          <span className="w-3 h-3 rounded-xs border-2 border-sage flex items-center justify-center p-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
          </span>
          <span className="text-xs font-semibold text-cream">
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
                ? "bg-amber"
                : "bg-white/20"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-base transition-transform ${
                filters.isVegOnly ? "translate-x-3" : "translate-x-0"
              }`}
            />
          </div>
        </label>

        {/* Sort By Dropdown */}
        <div className="relative flex items-center bg-base/60 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-cream">
          <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted" />
          <span className="text-muted mr-1 hidden sm:inline">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as FilterState["sortBy"],
              })
            }
            className="bg-transparent font-bold focus:outline-none cursor-pointer text-cream"
          >
            <option value="relevance" className="bg-surface text-cream">Relevance</option>
            <option value="price-low" className="bg-surface text-cream">Price: Low to High</option>
            <option value="price-high" className="bg-surface text-cream">Price: High to Low</option>
            <option value="rating" className="bg-surface text-cream">Top Rated</option>
            <option value="discount" className="bg-surface text-cream">Biggest Discount</option>
          </select>
        </div>

        {/* Filter Modal Trigger */}
        <button
          onClick={onOpenFilterModal}
          className="flex items-center gap-1.5 bg-base/60 hover:bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-cream transition-colors focus-visible:ring-2 focus-visible:ring-amber"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};
