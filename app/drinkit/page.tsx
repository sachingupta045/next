"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { drinkCategories, drinkitProducts } from "../data/drinkitData";
import { WishlistCompareProvider, useWishlistCompare } from "../context/WishlistCompareContext";
import { FloatingCompareBar } from "../components/drinkit/FloatingCompareBar";
import { CompareModal } from "../components/drinkit/CompareModal";
import { WishlistDrawer } from "../components/drinkit/WishlistDrawer";
import {
  Heart, Scale, Star, ArrowRight, Search, X, Check,
  ChevronDown, RotateCcw, Filter, SlidersHorizontal
} from "lucide-react";
import { DrinkProduct } from "../types/drinkit";

// ─── Product Card ─────────────────────────────────────────────────────────────
function DrinkCard({ product }: { product: DrinkProduct }) {
  const { isInWishlist, toggleWishlist, isInCompare, toggleCompare } = useWishlistCompare();
  const liked = isInWishlist(product.id);
  const compared = isInCompare(product.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between">
          {product.badge ? (
            <span className="bg-[#e8281a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.badge}</span>
          ) : product.discountPercent ? (
            <span className="bg-[#e8281a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.discountPercent}% OFF</span>
          ) : <span />}

          <button
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 ${liked ? "bg-red-600 text-white" : "bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500"}`}>
            <Heart className={`w-3 h-3 ${liked ? "fill-white" : ""}`} />
          </button>
        </div>

        <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white/10">
          {product.abv} ABV
        </span>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#f6a623] uppercase tracking-wider mb-0.5 truncate">{product.brand} · {product.origin}</p>
        <Link href={`/drink/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#e8281a] dark:group-hover:text-red-400 transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tastingNotes.slice(0, 2).map((note, i) => (
            <span key={i} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full font-medium">{note}</span>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-700"}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-[#e8281a] dark:text-red-400 font-serif leading-none">₹{product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="text-[10px] text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleCompare(product)}
              title={compared ? "Remove from compare" : "Add to compare"}
              className={`h-7 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all ${compared ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600"}`}>
              {compared ? <Check className="w-2.5 h-2.5" /> : <Scale className="w-2.5 h-2.5" />}
              {compared ? "Added" : "Compare"}
            </button>
            <Link href={`/drink/${product.id}`}
              className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white flex items-center justify-center shadow-md shadow-red-600/25 hover:shadow-lg hover:scale-105 transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
interface FilterSidebarProps {
  activeCategorySlug: string;
  setActiveCategorySlug: (s: string) => void;
  maxPrice: number;
  setMaxPrice: (n: number) => void;
  minRating: number;
  setMinRating: (n: number) => void;
  onReset: () => void;
  resultCount: number;
}
function FilterSidebar({ activeCategorySlug, setActiveCategorySlug, maxPrice, setMaxPrice, minRating, setMinRating, onReset, resultCount }: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-60 xl:w-64 shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden sticky top-[140px]">

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#e8281a]" />
            <span className="text-sm font-black text-slate-900 dark:text-white">Filters</span>
          </div>
          <button onClick={onReset} className="text-[10px] font-bold text-[#e8281a] hover:underline flex items-center gap-0.5">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Beverage Type</p>
            <div className="space-y-1">
              {drinkCategories.map(cat => {
                const isActive = activeCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategorySlug(cat.slug)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left ${isActive ? "bg-[#e8281a] text-white shadow-sm" : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                    <span className="text-base">{cat.icon}</span>
                    <span className="flex-1">{cat.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Max Price</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">₹100</span>
              <span className="text-sm font-black text-[#e8281a]">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={10000} step={100} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#e8281a] cursor-pointer" />
            <div className="flex justify-end mt-1">
              <span className="text-xs font-semibold text-slate-500">₹10,000</span>
            </div>
          </div>

          {/* ABV Quick Filters */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Min Rating</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ val: 0, label: "All" }, { val: 3.5, label: "3.5+ ★" }, { val: 4.0, label: "4.0+ ★" }, { val: 4.5, label: "4.5+ ★" }].map(r => (
                <button key={r.val} onClick={() => setMinRating(r.val)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border-2 transition-all ${minRating === r.val ? "bg-[#e8281a] border-[#e8281a] text-white" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#e8281a] hover:text-[#e8281a]"}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Count */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              <span className="font-black text-[#e8281a] text-base">{resultCount}</span> beverages found
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function DrinkitContent() {
  const { wishlistItems, setIsWishlistOpen, compareItems, setIsCompareModalOpen } = useWishlistCompare();
  const [activeCategorySlug, setActiveCategorySlug] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-low" | "price-high" | "rating" | "discount">("relevance");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredProducts = useMemo(() => {
    return drinkitProducts
      .filter(p => {
        if (activeCategorySlug !== "all" && p.categorySlug !== activeCategorySlug) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          if (!p.title.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.tastingNotes.some(n => n.toLowerCase().includes(q))) return false;
        }
        if (p.price > maxPrice) return false;
        if (p.rating < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
        return 0;
      });
  }, [activeCategorySlug, searchQuery, sortBy, maxPrice, minRating]);

  const resetFilters = () => {
    setActiveCategorySlug("all");
    setSearchQuery("");
    setSortBy("relevance");
    setMaxPrice(10000);
    setMinRating(0);
  };

  const activeFilterCount = [
    activeCategorySlug !== "all",
    searchQuery.trim() !== "",
    maxPrice < 10000,
    minRating > 0,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#fff8f0] dark:bg-slate-950 transition-colors">

      {/* ─── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Logo / Title */}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl">🍷</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
                  Drink<span className="text-[#e8281a]">it</span>
                </h1>
                <span className="bg-[#e8281a] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">Premium</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Fine wines, craft beers & single malts — compare & discover</p>
            </div>

            {/* Right: Search + Wishlist + Compare */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search beverages..."
                  className="pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#e8281a] transition-colors w-44 sm:w-52"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative hidden sm:block">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none pl-3 pr-7 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#e8281a] cursor-pointer transition-colors">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Deal</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>

              {/* Wishlist */}
              <button onClick={() => setIsWishlistOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-sm hover:bg-rose-100 transition-all">
                <Heart className="w-3.5 h-3.5 fill-rose-600 dark:fill-rose-400" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{wishlistItems.length}</span>
                )}
              </button>

              {/* Compare */}
              <button onClick={() => setIsCompareModalOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm hover:bg-emerald-100 transition-all">
                <Scale className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compare</span>
                {compareItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{compareItems.length}</span>
                )}
              </button>

              {/* Mobile filter toggle */}
              <button onClick={() => setShowMobileFilter(!showMobileFilter)}
                className={`lg:hidden relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 font-bold text-sm transition-all ${showMobileFilter ? "bg-[#e8281a] border-[#e8281a] text-white" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900"}`}>
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#e8281a] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Category Sticky Bar ──────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-[80px] z-30">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {drinkCategories.map(cat => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <button key={cat.id} onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 border-2 ${isActive ? "bg-[#e8281a] border-[#e8281a] text-white shadow-sm shadow-red-600/20" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#e8281a] hover:text-[#e8281a]"}`}>
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Body: Sidebar + Grid ──────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">

        {/* Mobile filter drawer */}
        {showMobileFilter && (
          <div className="lg:hidden mb-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-5 space-y-5">
            {/* Sort on mobile */}
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Sort By</p>
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full appearance-none pl-4 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            {/* Categories */}
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {drinkCategories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategorySlug(cat.slug)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${activeCategorySlug === cat.slug ? "bg-[#e8281a] border-[#e8281a] text-white" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}`}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Price */}
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Max Price: <span className="text-[#e8281a]">₹{maxPrice.toLocaleString()}</span></p>
              <input type="range" min={100} max={10000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-[#e8281a]" />
            </div>
            {/* Rating */}
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Min Rating</p>
              <div className="flex gap-2">
                {[{ val: 0, label: "All" }, { val: 3.5, label: "3.5+" }, { val: 4.0, label: "4.0+" }, { val: 4.5, label: "4.5+" }].map(r => (
                  <button key={r.val} onClick={() => setMinRating(r.val)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${minRating === r.val ? "bg-[#e8281a] border-[#e8281a] text-white" : "border-slate-200 text-slate-600"}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300"><span className="text-[#e8281a] font-black">{filteredProducts.length}</span> results</span>
              <button onClick={resetFilters} className="text-xs font-bold text-[#e8281a] hover:underline flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Reset all</button>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Left sidebar: desktop only */}
          <div className="hidden lg:block">
            <FilterSidebar
              activeCategorySlug={activeCategorySlug}
              setActiveCategorySlug={setActiveCategorySlug}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              onReset={resetFilters}
              resultCount={filteredProducts.length}
            />
          </div>

          {/* Right: Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  {activeCategorySlug === "all" ? "All Beverages" : drinkCategories.find(c => c.slug === activeCategorySlug)?.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing <span className="font-bold text-[#e8281a]">{filteredProducts.length}</span> of {drinkitProducts.length} drinks
                </p>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-[#e8281a] font-bold hover:underline">
                  <RotateCcw className="w-3 h-3" /> Clear filters ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No beverages found</h3>
                <p className="text-sm text-slate-500 mb-5">Try adjusting your search or filters.</p>
                <button onClick={resetFilters} className="px-5 py-2.5 bg-[#e8281a] text-white font-bold rounded-full text-sm shadow-md hover:bg-red-700 transition-colors">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 pb-28">
                {filteredProducts.map(p => <DrinkCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingCompareBar />
      <WishlistDrawer />
      <CompareModal />
    </div>
  );
}

export default function DrinkitMainPage() {
  return <DrinkitContent />;
}
