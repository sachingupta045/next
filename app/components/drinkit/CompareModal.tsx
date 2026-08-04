"use client";

import React from "react";
import { X, Scale, Star, Heart, Trash2, Check } from "lucide-react";
import { useWishlistCompare } from "../../context/WishlistCompareContext";
import Link from "next/link";

export const CompareModal: React.FC = () => {
  const { compareItems, isCompareModalOpen, setIsCompareModalOpen, toggleCompare, clearCompare, toggleWishlist, isInWishlist } = useWishlistCompare();

  if (!isCompareModalOpen) return null;

  const attrs = [
    { key: "price", label: "Price", render: (p: typeof compareItems[0]) => (
      <div>
        <span className="font-black text-[#e8281a] dark:text-red-400 font-serif">₹{p.price.toLocaleString()}</span>
        {p.originalPrice && <span className="block text-[10px] text-slate-400 line-through">₹{p.originalPrice.toLocaleString()}</span>}
      </div>
    )},
    { key: "abv", label: "Alcohol (ABV)", render: (p: typeof compareItems[0]) => <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{p.abv}</span> },
    { key: "volume", label: "Volume", render: (p: typeof compareItems[0]) => p.volume },
    { key: "origin", label: "Origin / Region", render: (p: typeof compareItems[0]) => p.origin },
    { key: "type", label: "Drink Type", render: (p: typeof compareItems[0]) => p.type || "—" },
    { key: "servingTemp", label: "Serving Temp", render: (p: typeof compareItems[0]) => <span className="text-amber-600 dark:text-amber-400 font-medium">{p.servingTemp}</span> },
    { key: "rating", label: "Rating", render: (p: typeof compareItems[0]) => (
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-[#f6a623] text-[#f6a623]" />
        <span className="font-bold">{p.rating.toFixed(1)}</span>
        <span className="text-slate-400 text-[10px]">({p.reviewCount})</span>
      </div>
    )},
    { key: "tastingNotes", label: "Tasting Notes", render: (p: typeof compareItems[0]) => (
      <div className="flex flex-wrap gap-1">
        {p.tastingNotes.slice(0, 3).map((n, i) => (
          <span key={i} className="text-[9px] bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 px-1.5 py-0.5 rounded-full font-medium">{n}</span>
        ))}
      </div>
    )},
    { key: "foodPairings", label: "Best Food Pairings", render: (p: typeof compareItems[0]) => (
      <ul className="space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
        {p.foodPairings.slice(0, 3).map((f) => <li key={f.id} className="flex items-center gap-1"><span className="text-[#f6a623]">▪</span>{f.title}</li>)}
      </ul>
    )},
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div onClick={() => setIsCompareModalOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] border border-slate-100 dark:border-slate-800">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#e8281a] dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-black text-lg font-serif leading-none text-slate-900 dark:text-white">Drink Comparison</h3>
              <p className="text-xs text-slate-400 mt-0.5">{compareItems.length} of max 4 beverages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button onClick={clearCompare} className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center gap-1 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />Clear All
              </button>
            )}
            <button onClick={() => setIsCompareModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors text-sm">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {compareItems.length === 0 ? (
            <div className="text-center py-16">
              <Scale className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">No drinks selected</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">Click "+ Compare" on any drink card to add it here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="p-3 w-36 text-left text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Attribute</th>
                    {compareItems.map((item) => (
                      <th key={item.id} className="p-3 align-top border-l border-slate-100 dark:border-slate-800 relative group">
                        <button
                          onClick={() => toggleCompare(item)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#e8281a] hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center text-center pr-4">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl mb-2 border border-slate-100 dark:border-slate-700 shadow-sm" />
                          <span className="text-[10px] font-bold text-[#f6a623] uppercase tracking-wider mb-0.5">{item.brand}</span>
                          <Link href={`/drink/${item.id}`} onClick={() => setIsCompareModalOpen(false)} className="text-xs font-bold text-slate-900 dark:text-white hover:text-[#e8281a] dark:hover:text-red-400 transition-colors line-clamp-2">{item.title}</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50 dark:divide-slate-800/60">
                  {attrs.map((attr) => (
                    <tr key={attr.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 text-xs font-bold text-slate-500 dark:text-slate-400">{attr.label}</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3 text-xs text-slate-800 dark:text-slate-200 border-l border-slate-50 dark:border-slate-800/60">
                          {attr.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Actions row */}
                  <tr>
                    <td className="p-3 text-xs font-bold text-slate-500 dark:text-slate-400">Actions</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-3 border-l border-slate-50 dark:border-slate-800/60">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleWishlist(item)}
                            className={`w-full py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border transition-all ${isInWishlist(item.id) ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-500"}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? "fill-rose-600 dark:fill-rose-400 text-rose-600 dark:text-rose-400" : ""}`} />
                            {isInWishlist(item.id) ? "Wishlisted" : "Add to Wishlist"}
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
