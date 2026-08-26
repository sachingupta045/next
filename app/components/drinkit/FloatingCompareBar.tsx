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
      {/* ── Bottom Compare Tray ─────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-white/5 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] animate-slide-up">
        {/* Tray Top Header */}
        <div className="max-w-[1320px] mx-auto px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs sm:text-sm">
          <div className="text-muted font-medium">
            <span className="font-bold text-cream">
              {compareItems.length} {compareItems.length === 1 ? "product" : "products"}
            </span>{" "}
            in your{" "}
            <Link
              href="/compare"
              className="text-amber font-bold hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded"
            >
              compare queue
            </Link>
          </div>
          <button
            onClick={() => setIsCompareTrayOpen(false)}
            className="w-7 h-7 rounded-full bg-base border border-white/10 hover:bg-white/5 flex items-center justify-center text-muted hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-amber"
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
                className="relative bg-base border border-white/5 rounded-2xl p-2.5 flex items-center gap-3 transition-all"
              >
                {/* Remove item cross button */}
                <button
                  onClick={() => toggleCompare(item)}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/5 hover:bg-amber hover:text-base text-muted flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-amber"
                  title="Remove product"
                >
                  <X className="w-3 h-3" />
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl border border-white/5 shrink-0"
                />

                <div className="min-w-0 pr-4">
                  <h4 className="text-xs font-bold text-cream truncate leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs sm:text-sm font-black text-amber font-serif mt-1">
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
                className="border-2 border-dashed border-amber/30 hover:border-amber rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-muted hover:text-amber transition-all bg-base/30 group h-[74px] sm:h-[82px] focus-visible:ring-2 focus-visible:ring-amber"
              >
                <div className="w-8 h-8 rounded-full bg-amber group-hover:bg-amber-glow text-base flex items-center justify-center group-hover:scale-110 transition-all shadow-md shadow-amber/20">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-cream group-hover:text-amber">
                  Add Product
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 pt-1.5 pb-1 border-t border-white/5">
            <Link
              href="/compare"
              className="px-7 py-2.5 bg-gradient-to-br from-amber to-amber-glow hover:from-amber-glow hover:to-amber text-base font-black text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-[0_4px_16px_rgba(193,122,61,0.25)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.35)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow"
            >
              COMPARE NOW
            </Link>

            {compareItems.length < 4 && (
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="px-4 py-2.5 text-amber hover:text-amber-glow font-black text-xs sm:text-sm tracking-wider uppercase transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded"
              >
                ADD PRODUCT
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Search & Add Drink Modal ───────────────── */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="bg-surface rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-white/5 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber" />
                <h3 className="text-lg font-black text-cream font-serif">
                  Add Beverage to Compare
                </h3>
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-base flex items-center justify-center text-muted hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-amber"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wine, beer, whisky, gin..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-base border border-white/10 rounded-full text-sm text-cream placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus:border-amber transition-colors"
              />
            </div>

            {/* Product List */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {availableProducts.length === 0 ? (
                <div className="text-center py-8 text-muted text-sm font-medium">
                  No matching beverages found.
                </div>
              ) : (
                availableProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleAddProduct(p)}
                    className="flex items-center justify-between p-3 rounded-2xl border border-white/5 hover:border-amber/30 hover:bg-white/[0.02] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover border border-white/5 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-extrabold uppercase text-amber-glow tracking-wide block">
                          {p.brand} · {p.category}
                        </span>
                        <h4 className="text-xs font-bold text-cream truncate">
                          {p.title}
                        </h4>
                        <span className="text-xs font-black text-amber font-serif">
                          ₹{p.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button className="px-3.5 py-1.5 bg-amber hover:bg-amber-glow text-base rounded-full text-xs font-bold shrink-0 transition-transform group-hover:scale-105 shadow-sm focus-visible:ring-2 focus-visible:ring-amber-glow">
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
