"use client";

import React from "react";
import { QuickProduct } from "../../types/category";
import { ProductCard } from "./ProductCard";
import { ShoppingBag, RefreshCw } from "lucide-react";

interface ProductGridProps {
  products: QuickProduct[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 dark:border-slate-800 my-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          No Products Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
          We couldn't find any items matching your selected category, search query, or filters. Try adjusting your filters or search term.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 pb-24">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
