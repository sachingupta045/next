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
          className="w-full h-10 pl-10 pr-9 text-xs sm:text-sm bg-base border border-white/10 rounded-full text-cream placeholder-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus:border-sky-400 transition-all"
        />
        <div className="absolute left-3.5 text-muted pointer-events-none">
          <i className="fas fa-search text-xs text-sky-400/80" />
        </div>

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-muted hover:text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[420px] overflow-y-auto z-50 divide-y divide-white/5">
          {!hasResults ? (
            <div className="p-6 text-center text-xs text-muted">
              <p className="text-xl mb-1">🍷</p>
              No matching drinks or brands found for &quot;{query}&quot;
            </div>
          ) : (
            <>
              {/* Product Results */}
              {searchResults.products.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider block px-2 mb-2">
                    Drinks &amp; Spirits ({searchResults.products.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.products.map(p => (
                      <Link
                        key={p.id}
                        href={`/drink/${p.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-sky-950/30 transition-colors group focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-cream line-clamp-1 group-hover:text-sky-300 transition-colors">{p.title}</p>
                          <p className="text-[10px] text-muted">{p.brand} · {p.abv} ABV</p>
                        </div>
                        <span className="text-xs font-black text-sky-400 font-serif shrink-0">₹{p.price.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand Results */}
              {searchResults.brands.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-sky-300 uppercase tracking-wider block px-2 mb-2">
                    Brand Heritage ({searchResults.brands.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.brands.map(b => (
                      <Link
                        key={b.id}
                        href={`/brand/${encodeURIComponent(b.name)}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-sky-950/30 transition-colors group focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 font-black text-xs flex items-center justify-center font-serif shrink-0">
                          {b.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-cream line-clamp-1 group-hover:text-sky-300 transition-colors">{b.name}</p>
                          <p className="text-[10px] text-muted">Est. {b.foundingYear} · {b.origin}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Spotlight Results */}
              {searchResults.categories.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider block px-2 mb-2">
                    Category Spotlights ({searchResults.categories.length})
                  </span>
                  <div className="space-y-1">
                    {searchResults.categories.map(c => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-sky-950/30 transition-colors group focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 font-black text-xs flex items-center justify-center font-serif shrink-0">
                          🍷
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-cream line-clamp-1 group-hover:text-teal-300 transition-colors">{c.name}</p>
                          <p className="text-[10px] text-muted">{c.subtitle}</p>
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

export default HeaderSearchBar;
