"use client";

import React from "react";
import { X, Scale, Star, Heart, Trash2 } from "lucide-react";
import { useWishlistCompare } from "../../context/WishlistCompareContext";
import Link from "next/link";

export const CompareModal: React.FC = () => {
  const { compareItems, isCompareModalOpen, setIsCompareModalOpen, toggleCompare, clearCompare, toggleWishlist, isInWishlist } = useWishlistCompare();

  if (!isCompareModalOpen) return null;

  const attrs = [
    { key: "price", label: "Price", render: (p: typeof compareItems[0]) => (
      <div>
        <span className="font-black text-amber font-serif">₹{p.price.toLocaleString()}</span>
        {p.originalPrice && <span className="block text-[10px] text-muted line-through">₹{p.originalPrice.toLocaleString()}</span>}
      </div>
    )},
    { key: "abv", label: "Alcohol (ABV)", render: (p: typeof compareItems[0]) => <span className="font-extrabold text-amber-glow">{p.abv}</span> },
    { key: "volume", label: "Volume", render: (p: typeof compareItems[0]) => p.volume },
    { key: "origin", label: "Origin / Region", render: (p: typeof compareItems[0]) => p.origin },
    { key: "type", label: "Drink Type", render: (p: typeof compareItems[0]) => p.type || "—" },
    { key: "servingTemp", label: "Serving Temp", render: (p: typeof compareItems[0]) => <span className="text-amber font-medium">{p.servingTemp}</span> },
    { key: "rating", label: "Rating", render: (p: typeof compareItems[0]) => (
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-amber-glow text-amber-glow" />
        <span className="font-bold">{p.rating.toFixed(1)}</span>
        <span className="text-muted text-[10px]">({p.reviewCount})</span>
      </div>
    )},
    { key: "tastingNotes", label: "Tasting Notes", render: (p: typeof compareItems[0]) => (
      <div className="flex flex-wrap gap-1">
        {p.tastingNotes.slice(0, 3).map((n: string, i: number) => (
          <span key={i} className="text-[9px] bg-amber/10 text-amber border border-amber/20 px-1.5 py-0.5 rounded-full font-medium">{n}</span>
        ))}
      </div>
    )},
    { key: "foodPairings", label: "Best Food Pairings", render: (p: typeof compareItems[0]) => (
      <ul className="space-y-0.5 text-[11px] text-muted">
        {p.foodPairings.slice(0, 3).map((f: { id: string; title: string }) => <li key={f.id} className="flex items-center gap-1"><span className="text-amber-glow">▪</span>{f.title}</li>)}
      </ul>
    )},
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div onClick={() => setIsCompareModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-surface text-cream rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] border border-white/5">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h3 className="font-black text-lg font-serif leading-none text-cream">Drink Comparison</h3>
              <p className="text-xs text-muted mt-0.5">{compareItems.length} of max 4 beverages</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button onClick={clearCompare} className="text-xs text-amber hover:text-amber-glow font-bold flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">
                <Trash2 className="w-3.5 h-3.5" />Clear All
              </button>
            )}
            <button onClick={() => setIsCompareModalOpen(false)} className="w-8 h-8 rounded-full bg-base flex items-center justify-center text-muted hover:text-cream transition-colors text-sm focus-visible:ring-2 focus-visible:ring-amber">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {compareItems.length === 0 ? (
            <div className="text-center py-16">
              <Scale className="w-12 h-12 text-muted/30 mx-auto mb-3" />
              <h4 className="text-base font-bold text-muted mb-1">No drinks selected</h4>
              <p className="text-xs text-muted max-w-xs mx-auto">Click &quot;+ Compare&quot; on any drink card to add it here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-3 w-36 text-left text-xs font-black uppercase text-muted tracking-wider">Attribute</th>
                    {compareItems.map((item) => (
                      <th key={item.id} className="p-3 align-top border-l border-white/5 relative group">
                        <button
                          onClick={() => toggleCompare(item)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-base flex items-center justify-center text-muted hover:bg-amber hover:text-base transition-all opacity-0 group-hover:opacity-100 focus-visible:ring-2 focus-visible:ring-amber"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center text-center pr-4">
                          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl mb-2 border border-white/5 shadow-sm" />
                          <span className="text-[10px] font-bold text-amber-glow uppercase tracking-wider mb-0.5">{item.brand}</span>
                          <Link href={`/drink/${item.id}`} onClick={() => setIsCompareModalOpen(false)} className="text-xs font-bold text-cream hover:text-amber transition-colors line-clamp-2 focus-visible:ring-2 focus-visible:ring-amber rounded">{item.title}</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/[0.03]">
                  {attrs.map((attr) => (
                    <tr key={attr.key} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3 text-xs font-bold text-muted">{attr.label}</td>
                      {compareItems.map((item) => (
                        <td key={item.id} className="p-3 text-xs text-cream border-l border-white/[0.03]">
                          {attr.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Actions row */}
                  <tr>
                    <td className="p-3 text-xs font-bold text-muted">Actions</td>
                    {compareItems.map((item) => (
                      <td key={item.id} className="p-3 border-l border-white/[0.03]">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleWishlist(item)}
                            className={`w-full py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border transition-all focus-visible:ring-2 focus-visible:ring-amber ${isInWishlist(item.id) ? "bg-amber/10 text-amber border-amber/30" : "border-white/10 text-muted hover:border-amber hover:text-amber"}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? "fill-amber text-amber" : ""}`} />
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
