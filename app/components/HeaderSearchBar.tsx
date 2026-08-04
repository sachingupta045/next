"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { drinkitProducts } from "../data/drinkitData";
import { brandStories } from "../data/brandHistory";
import { categorySpotlightList } from "../data/categorySpotlightData";

export const HeaderSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], brands: [], categories: [] };
    const q = query.toLowerCase().trim();

    const matchedProducts = drinkitProducts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tastingNotes.some(t => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const matchedBrands = brandStories.filter(
      b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedCategories = categorySpotlightList.filter(
      c => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    ).slice(0, 2);

    return { products: matchedProducts, brands: matchedBrands, categories: matchedCategories };
  }, [query]);

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.brands.length > 0 ||
    searchResults.categories.length > 0;

  return (
    <div ref={containerRef} className="relative flex-1 max-w-lg mx-2 sm:mx-6 z-30">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search drinks, single malts, brands, wines..."
          className="w-full h-10 pl-10 pr-9 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-full text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e8281a]/40 focus:border-[#e8281a] transition-all shadow-inner"
        />
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <i className="fas fa-search text-xs" />
        </div>

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[420px] overflow-y-auto z-50 divide-y divide-slate-100 dark:divide-slate-800">
          {!hasResults ? (
            <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
              <p className="text-xl mb-1">🍷</p>
              No matching drinks or brands found for "{query}"
            </div>
          ) : (
            <>
              {/* Product Results */}
              {searchResults.products.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-[#e8281a] uppercase tracking-wider block px-2 mb-2">
                    Drinks & Spirits ({searchResults.products.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.products.map(p => (
                      <Link
                        key={p.id}
                        href={`/drink/${p.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#e8281a] transition-colors">{p.title}</p>
                          <p className="text-[10px] text-slate-400">{p.brand} · {p.abv} ABV</p>
                        </div>
                        <span className="text-xs font-black text-[#e8281a] font-serif shrink-0">₹{p.price.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand Results */}
              {searchResults.brands.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider block px-2 mb-2">
                    Brand Heritage ({searchResults.brands.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.brands.map(b => (
                      <Link
                        key={b.id}
                        href={`/brand/${encodeURIComponent(b.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center font-serif shrink-0">
                          {b.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">{b.name}</p>
                          <p className="text-[10px] text-slate-400">Est. {b.foundingYear} · {b.origin}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Spotlight Results */}
              {searchResults.categories.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block px-2 mb-2">
                    Category Spotlights ({searchResults.categories.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.categories.map(c => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs flex items-center justify-center font-serif shrink-0">
                          🍷
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">{c.name}</p>
                          <p className="text-[10px] text-slate-400">{c.subtitle}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
