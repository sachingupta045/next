"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { drinkCategories, drinkitProducts } from "../data/drinkitData";
import { useWishlistCompare } from "../context/WishlistCompareContext";
import { FloatingCompareBar } from "../components/drinkit/FloatingCompareBar";
import { CompareModal } from "../components/drinkit/CompareModal";
import { WishlistDrawer } from "../components/drinkit/WishlistDrawer";
import {
  Heart, Scale, Star, ArrowRight, Search, X, Check,
  ChevronDown, RotateCcw, Filter, SlidersHorizontal
} from "lucide-react";
import { DrinkProduct } from "../types/drinkit";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

// ─── Product Card ─────────────────────────────────────────────────────────────
function DrinkCard({ product }: { product: DrinkProduct }) {
  const { isInWishlist, toggleWishlist, isInCompare, toggleCompare } = useWishlistCompare();
  const liked = isInWishlist(product.id);
  const compared = isInCompare(product.id);

  return (
    <div className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-base overflow-hidden flex-shrink-0">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between">
          {product.badge ? (
            <span className="bg-amber text-base text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.badge}</span>
          ) : product.discountPercent ? (
            <span className="bg-oxblood text-cream text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.discountPercent}% OFF</span>
          ) : <span />}

          <button
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-amber ${liked ? "bg-amber text-base" : "bg-surface/90 text-muted hover:text-amber"}`}>
            <Heart className={`w-3 h-3 ${liked ? "fill-base" : ""}`} />
          </button>
        </div>

        <span className="absolute bottom-2.5 left-2.5 bg-base/80 backdrop-blur-sm text-cream text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white/10">
          {product.abv} ABV
        </span>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-amber-glow uppercase tracking-wider mb-0.5 truncate">{product.brand} · {product.origin}</p>
        <Link href={`/drink/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-bold text-cream line-clamp-2 leading-snug group-hover:text-amber transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tastingNotes.slice(0, 2).map((note, i) => (
            <span key={i} className="text-[9px] bg-white/5 text-cream px-1.5 py-0.5 rounded-full font-medium">{note}</span>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-cream">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-amber font-serif leading-none">₹{product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="text-[10px] text-muted line-through">₹{product.originalPrice.toLocaleString()}</div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleCompare(product)}
              title={compared ? "Remove from compare" : "Add to compare"}
              className={`h-7 px-2 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all focus-visible:ring-2 focus-visible:ring-amber ${compared ? "bg-amber text-base border-amber" : "border-white/10 text-muted hover:border-amber hover:text-amber"}`}>
              {compared ? <Check className="w-2.5 h-2.5" /> : <Scale className="w-2.5 h-2.5" />}
              {compared ? "Added" : "Compare"}
            </button>
            <Link href={`/drink/${product.id}`}
              className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber to-amber-glow text-base flex items-center justify-center shadow-[0_4px_12px_rgba(193,122,61,0.25)] hover:shadow-[0_6px_16px_rgba(193,122,61,0.35)] hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow">
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
      <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden sticky top-[140px]">

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-amber" />
            <span className="text-sm font-black text-cream">Filters</span>
          </div>
          <button onClick={onReset} className="text-[10px] font-bold text-amber hover:text-amber-glow hover:underline flex items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-amber rounded">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-3">Beverage Type</p>
            <div className="space-y-1">
              {drinkCategories.map(cat => {
                const isActive = activeCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategorySlug(cat.slug)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left focus-visible:ring-2 focus-visible:ring-amber ${isActive ? "bg-amber text-base shadow-sm" : "text-cream hover:bg-white/5"}`}>
                    <span className="text-base">{cat.icon}</span>
                    <span className="flex-1">{cat.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-white/5 pt-5">
            <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-3">Max Price</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted">₹100</span>
              <span className="text-sm font-black text-amber">₹{maxPrice.toLocaleString()}</span>
            </div>
            <input type="range" min={100} max={10000} step={100} value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber cursor-pointer" />
            <div className="flex justify-end mt-1">
              <span className="text-xs font-semibold text-muted">₹10,000</span>
            </div>
          </div>

          {/* Rating Quick Filters */}
          <div className="border-t border-white/5 pt-5">
            <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-3">Min Rating</p>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ val: 0, label: "All" }, { val: 3.5, label: "3.5+ ★" }, { val: 4.0, label: "4.0+ ★" }, { val: 4.5, label: "4.5+ ★" }].map(r => (
                <button key={r.val} onClick={() => setMinRating(r.val)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border-2 transition-all focus-visible:ring-2 focus-visible:ring-amber ${minRating === r.val ? "bg-amber border-amber text-base" : "border-white/10 text-muted hover:border-amber hover:text-amber"}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Count */}
          <div className="border-t border-white/5 pt-4">
            <p className="text-center text-sm text-muted">
              <span className="font-black text-amber text-base">{resultCount}</span> beverages found
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
    <div className="min-h-screen bg-base transition-colors">

      {/* ─── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-surface border-b border-white/5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Logo / Title */}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl">🍷</span>
                <h1 className="text-2xl sm:text-3xl font-black text-cream font-serif">
                  Drink<span className="text-amber">it</span>
                </h1>
                <span className="bg-amber text-base text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">Premium</span>
              </div>
              <p className="text-sm text-muted">Fine wines, craft beers & single malts — compare & discover</p>
            </div>

            {/* Right: Search + Wishlist + Compare */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search beverages..."
                  className="pl-9 pr-8 py-2 bg-base border border-white/10 rounded-full text-sm text-cream placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus:border-amber transition-colors w-44 sm:w-52"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-cream focus-visible:ring-2 focus-visible:ring-amber rounded">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative hidden sm:block">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none pl-3 pr-7 py-2 bg-base border border-white/10 rounded-full text-sm font-semibold text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-amber cursor-pointer transition-colors">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Deal</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted pointer-events-none" />
              </div>

              {/* Wishlist */}
              <button onClick={() => setIsWishlistOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-amber/30 bg-amber/5 text-amber font-bold text-sm hover:bg-amber/10 transition-all focus-visible:ring-2 focus-visible:ring-amber">
                <Heart className="w-3.5 h-3.5 fill-amber" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber text-base text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{wishlistItems.length}</span>
                )}
              </button>

              {/* Compare */}
              <button onClick={() => setIsCompareModalOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-amber-glow/30 bg-amber-glow/5 text-amber-glow font-bold text-sm hover:bg-amber-glow/10 transition-all focus-visible:ring-2 focus-visible:ring-amber">
                <Scale className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compare</span>
                {compareItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-glow text-base text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{compareItems.length}</span>
                )}
              </button>

              {/* Mobile filter toggle */}
              <button onClick={() => setShowMobileFilter(!showMobileFilter)}
                className={`lg:hidden relative flex items-center gap-1.5 px-3 py-2 rounded-full border-2 font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-amber ${showMobileFilter ? "bg-amber border-amber text-base" : "border-white/10 text-cream bg-surface"}`}>
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber text-base text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Category Sticky Bar ──────────────────────────────────────────── */}
      <div className="bg-surface border-b border-white/5 sticky top-[80px] z-30">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {drinkCategories.map(cat => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <button key={cat.id} onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 border-2 focus-visible:ring-2 focus-visible:ring-amber ${isActive ? "bg-amber border-amber text-base shadow-sm shadow-amber/20" : "bg-surface border-white/10 text-muted hover:border-amber hover:text-amber"}`}>
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
          <div className="lg:hidden mb-5 bg-surface rounded-2xl border border-white/5 shadow-lg p-5 space-y-5">
            {/* Sort on mobile */}
            <div>
              <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-2">Sort By</p>
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full appearance-none pl-4 pr-8 py-2.5 bg-base border border-white/10 rounded-xl text-sm font-semibold text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-amber">
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>
            {/* Categories */}
            <div>
              <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {drinkCategories.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategorySlug(cat.slug)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all focus-visible:ring-2 focus-visible:ring-amber ${activeCategorySlug === cat.slug ? "bg-amber border-amber text-base" : "border-white/10 text-muted"}`}>
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Price */}
            <div>
              <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-2">Max Price: <span className="text-amber">₹{maxPrice.toLocaleString()}</span></p>
              <input type="range" min={100} max={10000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-amber" />
            </div>
            {/* Rating */}
            <div>
              <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-2">Min Rating</p>
              <div className="flex gap-2">
                {[{ val: 0, label: "All" }, { val: 3.5, label: "3.5+" }, { val: 4.0, label: "4.0+" }, { val: 4.5, label: "4.5+" }].map(r => (
                  <button key={r.val} onClick={() => setMinRating(r.val)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all focus-visible:ring-2 focus-visible:ring-amber ${minRating === r.val ? "bg-amber border-amber text-base" : "border-white/10 text-muted"}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-sm font-bold text-muted"><span className="text-amber font-black">{filteredProducts.length}</span> results</span>
              <button onClick={resetFilters} className="text-xs font-bold text-amber hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-amber rounded"><RotateCcw className="w-3 h-3" /> Reset all</button>
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
                <h2 className="text-base font-black text-cream">
                  {activeCategorySlug === "all" ? "All Beverages" : drinkCategories.find(c => c.slug === activeCategorySlug)?.name}
                </h2>
                <p className="text-xs text-muted">
                  Showing <span className="font-bold text-amber">{filteredProducts.length}</span> of {drinkitProducts.length} drinks
                </p>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-amber font-bold hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">
                  <RotateCcw className="w-3 h-3" /> Clear filters ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-surface rounded-2xl border border-white/5">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-lg font-bold text-cream mb-2">No beverages found</h3>
                <p className="text-sm text-muted mb-5">Try adjusting your search or filters.</p>
                <button onClick={resetFilters} className="px-5 py-2.5 bg-amber text-base font-bold rounded-full text-sm shadow-md hover:bg-amber-glow transition-colors focus-visible:ring-2 focus-visible:ring-amber-glow">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 pb-28">
                {filteredProducts.map(p => (
                  <StaggerItem key={p.id}>
                    <DrinkCard product={p} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
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
