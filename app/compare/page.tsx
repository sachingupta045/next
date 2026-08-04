"use client";

import React, { useState } from "react";
import Link from "next/link";
import { drinkitProducts } from "@/app/data/drinkitData";
import { useWishlistCompare } from "@/app/context/WishlistCompareContext";
import { FloatingCompareBar } from "@/app/components/drinkit/FloatingCompareBar";
import { WishlistDrawer } from "@/app/components/drinkit/WishlistDrawer";
import {
  Scale, ArrowLeft, X, Star, Heart, Trash2, Plus,
  Droplets, MapPin, Thermometer, Clock, Award, ChevronRight
} from "lucide-react";
import { DrinkProduct } from "@/app/types/drinkit";

// ─── Cell: renders value safely ───────────────────────────────────────────────
function Cell({ value }: { value: React.ReactNode }) {
  return (
    <td className="p-4 text-sm text-slate-800 dark:text-slate-200 border-l border-slate-100 dark:border-slate-800 align-top">
      {value}
    </td>
  );
}

// ─── Compare Page ─────────────────────────────────────────────────────────────
export default function ComparePage() {
  const { compareItems, toggleCompare, clearCompare, toggleWishlist, isInWishlist } = useWishlistCompare();

  const emptySlots = Math.max(0, 4 - compareItems.length);

  const rows: { label: string; icon: React.ReactNode; render: (p: DrinkProduct) => React.ReactNode }[] = [
    {
      label: "Price",
      icon: <span className="text-base">₹</span>,
      render: p => (
        <div>
          <span className="text-xl font-black text-[#e8281a] dark:text-red-400 font-serif">₹{p.price.toLocaleString()}</span>
          {p.originalPrice && <div className="text-xs text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</div>}
          {p.discountPercent && <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{p.discountPercent}% savings</div>}
        </div>
      ),
    },
    {
      label: "Rating",
      icon: <Star className="w-3.5 h-3.5" />,
      render: p => (
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(p.rating) ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-700"}`} />
            ))}
          </div>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{p.rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({p.reviewCount})</span>
        </div>
      ),
    },
    {
      label: "ABV",
      icon: <Droplets className="w-3.5 h-3.5" />,
      render: p => <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">{p.abv}</span>,
    },
    {
      label: "Volume",
      icon: <Clock className="w-3.5 h-3.5" />,
      render: p => <span className="font-bold">{p.volume}</span>,
    },
    {
      label: "Type",
      icon: <Award className="w-3.5 h-3.5" />,
      render: p => <span>{p.type || "—"}</span>,
    },
    {
      label: "Origin",
      icon: <MapPin className="w-3.5 h-3.5" />,
      render: p => <span>{p.origin}</span>,
    },
    {
      label: "Vintage",
      icon: <Award className="w-3.5 h-3.5" />,
      render: p => <span>{p.vintage || "—"}</span>,
    },
    {
      label: "Serving Temp",
      icon: <Thermometer className="w-3.5 h-3.5" />,
      render: p => <span className="font-medium text-amber-600 dark:text-amber-400">{p.servingTemp}</span>,
    },
    {
      label: "Tasting Notes",
      icon: <span className="text-sm">🍷</span>,
      render: p => (
        <div className="flex flex-wrap gap-1">
          {p.tastingNotes.slice(0, 4).map((note: string, i: number) => (
            <span key={i} className="text-[10px] bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 px-1.5 py-0.5 rounded-full font-medium">{note}</span>
          ))}
        </div>
      ),
    },
    {
      label: "Food Pairings",
      icon: <span className="text-sm">🍽️</span>,
      render: p => (
        <ul className="space-y-1">
          {p.foodPairings.slice(0, 3).map((f: { id: string; title: string }) => (
            <li key={f.id} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-[#f6a623] shrink-0 mt-0.5">▪</span>
              {f.title}
            </li>
          ))}
          {p.foodPairings.length === 0 && <li className="text-xs text-slate-400">—</li>}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f0] dark:bg-slate-950 transition-colors">

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#e8281a] transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/drinkit" className="hover:text-[#e8281a] transition-colors font-medium">Drinkit</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white font-semibold">Compare</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Back */}
        <Link href="/drinkit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#e8281a] transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Drinkit
        </Link>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-6 h-6 text-[#e8281a]" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">Drink Comparison</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Compare up to 4 beverages side-by-side · {compareItems.length} of 4 selected
            </p>
          </div>

          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button onClick={clearCompare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-red-400 hover:text-red-500 transition-all">
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            )}
            <Link href="/drinkit"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md shadow-red-600/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <Plus className="w-4 h-4" /> Add More Drinks
            </Link>
          </div>
        </div>

        {/* ── Empty State ── */}
        {compareItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <Scale className="w-14 h-14 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-black text-slate-800 dark:text-white mb-2 font-serif">No Drinks Selected Yet</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Browse Drinkit and click <strong>"+ Compare"</strong> on any drink card to add it here. You can compare up to 4 at once.
            </p>
            <Link href="/drinkit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold rounded-full text-sm shadow-lg shadow-red-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Plus className="w-4 h-4" /> Browse Beverages
            </Link>
          </div>
        ) : (
          <>
            {/* ── Comparison Table ── */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[520px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      {/* Label column header */}
                      <th className="p-4 w-36 bg-slate-50 dark:bg-slate-800/50 text-left">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Attribute</span>
                      </th>

                      {/* Product columns */}
                      {compareItems.map(item => (
                        <th key={item.id} className="p-4 align-top border-l border-slate-100 dark:border-slate-800 group relative bg-white dark:bg-slate-900">
                          {/* Remove button */}
                          <button onClick={() => toggleCompare(item)}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition-all">
                            <X className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex flex-col items-center text-center pr-4 gap-2">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#f6a623] uppercase tracking-wider block mb-0.5">{item.brand}</span>
                              <Link href={`/drink/${item.id}`} className="text-xs font-bold text-slate-900 dark:text-white hover:text-[#e8281a] dark:hover:text-red-400 transition-colors line-clamp-2">{item.title}</Link>
                              {item.badge && <span className="mt-1 inline-block text-[9px] font-black uppercase bg-[#e8281a] text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                            </div>
                          </div>
                        </th>
                      ))}

                      {/* Empty slots */}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <th key={`empty-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800 align-middle">
                          <Link href="/drinkit"
                            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-[#e8281a] hover:text-[#e8281a] transition-all group">
                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold">Add Drink</span>
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                    {rows.map(row => (
                      <tr key={row.label} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="p-4 bg-slate-50 dark:bg-slate-800/30">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">{row.icon}</span>
                            <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide">{row.label}</span>
                          </div>
                        </td>
                        {compareItems.map((item: DrinkProduct) => (
                          <Cell key={item.id} value={row.render(item)} />
                        ))}
                        {Array.from({ length: emptySlots }).map((_, i) => (
                          <td key={`empty-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
                            <span className="text-slate-300 dark:text-slate-700 text-sm">—</span>
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Actions row */}
                    <tr className="border-t-2 border-slate-100 dark:border-slate-800">
                      <td className="p-4 bg-slate-50 dark:bg-slate-800/30">
                        <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-wide">Actions</span>
                      </td>
                      {compareItems.map(item => (
                        <td key={item.id} className="p-4 border-l border-slate-100 dark:border-slate-800">
                          <div className="flex flex-col gap-2">
                            <Link href={`/drink/${item.id}`}
                              className="w-full text-center py-2 rounded-xl bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-xs shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                              View Details
                            </Link>
                            <button onClick={() => toggleWishlist(item)}
                              className={`w-full py-2 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-1.5 ${isInWishlist(item.id) ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-500"}`}>
                              <Heart className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? "fill-rose-600 dark:fill-rose-400 text-rose-600 dark:text-rose-400" : ""}`} />
                              {isInWishlist(item.id) ? "Wishlisted ✓" : "Add to Wishlist"}
                            </button>
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <td key={`empty-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10" />
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Browse more section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-[#e8281a] to-[#f6a623] rounded-full" />
                <h3 className="text-base font-black text-slate-900 dark:text-white font-serif">Add More to Compare</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {drinkitProducts
                  .filter((p: DrinkProduct) => !compareItems.some((c: DrinkProduct) => c.id === p.id))
                  .slice(0, 4)
                  .map((p: DrinkProduct) => (
                    <div key={p.id} className="group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:border-[#e8281a]/30 transition-all">
                      <div className="h-28 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] font-bold text-[#f6a623] uppercase tracking-wider mb-0.5 truncate">{p.brand}</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug">{p.title}</p>
                        <button onClick={() => toggleCompare(p)}
                          className="w-full py-1.5 rounded-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors flex items-center justify-center gap-1">
                          <Plus className="w-3 h-3" /> Compare
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      <FloatingCompareBar />
      <WishlistDrawer />
    </div>
  );
}
