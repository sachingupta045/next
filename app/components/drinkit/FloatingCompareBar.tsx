"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Plus, Search, Scale } from "lucide-react";
import { useWishlistCompare } from "../../context/WishlistCompareContext";
import { drinkitProducts } from "../../data/drinkitData";
import { DrinkProduct } from "../../types/drinkit";

export const FloatingCompareBar: React.FC = () => {
  const {
    compareItems,
    toggleCompare,
    isCompareTrayOpen,
    setIsCompareTrayOpen,
  } = useWishlistCompare();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isCompareTrayOpen || compareItems.length === 0) return null;

  // Filter products for search modal (excluding products already in compare)
  const availableProducts = drinkitProducts.filter(
    (p) =>
      !compareItems.some((item) => item.id === p.id) &&
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProduct = (product: DrinkProduct) => {
    toggleCompare(product);
    setIsSearchModalOpen(false);
    setSearchQuery("");
  };

  const slotsCount = 4;
  const emptySlotsCount = slotsCount - compareItems.length;

  return (
    <>
      {/* ── Sarab/Drinkit Styled Bottom Compare Tray ─────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#fff8f0]/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-amber-200/60 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] animate-slide-up">
        {/* Tray Top Header */}
        <div className="max-w-[1320px] mx-auto px-4 py-2 border-b border-amber-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm">
          <div className="text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-bold text-slate-900 dark:text-white">
              {compareItems.length} {compareItems.length === 1 ? "product" : "products"}
            </span>{" "}
            in your{" "}
            <Link
              href="/compare"
              className="text-[#e8281a] dark:text-red-400 font-bold hover:underline"
            >
              compare queue
            </Link>
          </div>
          <button
            onClick={() => setIsCompareTrayOpen(false)}
            className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
            title="Minimize tray"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tray Slots Container */}
        <div className="max-w-[1320px] mx-auto px-4 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3">
            {/* Filled Item Slots */}
            {compareItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 rounded-2xl p-2.5 flex items-center gap-3 shadow-xs transition-all"
              >
                {/* Remove item cross button */}
                <button
                  onClick={() => toggleCompare(item)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-[#e8281a] hover:text-white text-slate-400 flex items-center justify-center transition-colors"
                  title="Remove product"
                >
                  <X className="w-3 h-3" />
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-slate-100 dark:border-slate-700 shrink-0"
                />

                <div className="min-w-0 pr-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs sm:text-sm font-black text-[#e8281a] dark:text-red-400 font-serif mt-1">
                    ₹{item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty Slots (+ Add Product) */}
            {Array.from({ length: emptySlotsCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setIsSearchModalOpen(true)}
                className="border-2 border-dashed border-amber-300/80 dark:border-amber-700/50 hover:border-[#e8281a] dark:hover:border-red-400 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-[#e8281a] transition-all bg-white/60 dark:bg-slate-800/30 group h-[74px] sm:h-[82px]"
              >
                <div className="w-8 h-8 rounded-full bg-[#f6a623] group-hover:bg-[#e8281a] text-white flex items-center justify-center group-hover:scale-110 transition-all shadow-md shadow-amber-500/20">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#e8281a]">
                  Add Product
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 pt-1.5 pb-1 border-t border-amber-100 dark:border-slate-800">
            <Link
              href="/compare"
              className="px-7 py-2.5 bg-gradient-to-br from-[#e8281a] to-[#c01e12] hover:from-red-700 hover:to-red-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all"
            >
              COMPARE NOW
            </Link>

            {compareItems.length < 4 && (
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="px-4 py-2.5 text-[#e8281a] hover:text-red-700 dark:text-red-400 font-black text-xs sm:text-sm tracking-wider uppercase transition-colors"
              >
                ADD PRODUCT
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Search & Add Drink Modal ─────────────────────────────────────── */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#e8281a]" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-serif">
                  Add Beverage to Compare
                </h3>
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wine, beer, whisky, gin..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#e8281a] transition-colors"
              />
            </div>

            {/* Product List */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {availableProducts.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm font-medium">
                  No matching beverages found.
                </div>
              ) : (
                availableProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleAddProduct(p)}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#e8281a] hover:bg-amber-50/30 dark:hover:bg-slate-800/80 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-extrabold uppercase text-[#f6a623] tracking-wide block">
                          {p.brand} · {p.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {p.title}
                        </h4>
                        <span className="text-xs font-black text-[#e8281a] dark:text-red-400 font-serif">
                          ₹{p.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button className="px-3.5 py-1.5 bg-[#e8281a] hover:bg-red-700 text-white rounded-full text-xs font-bold shrink-0 transition-transform group-hover:scale-105 shadow-sm">
                      + Add
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
