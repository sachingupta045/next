"use client";

import React from "react";
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
import { motion } from "motion/react";
import { useReducedMotion } from "@/app/components/motion/useReducedMotion";
import { PourLoader } from "@/app/components/PourLoader";

// ─── Cell: renders value safely ───────────────────────────────────────────────
function Cell({ value }: { value: React.ReactNode }) {
  return (
    <td className="p-4 text-sm text-cream border-l border-white/5 align-top">
      {value}
    </td>
  );
}

// ─── Compare Page ─────────────────────────────────────────────────────────────
export default function ComparePage() {
  const { compareItems, toggleCompare, clearCompare, toggleWishlist, isInWishlist } = useWishlistCompare();
  const reduced = useReducedMotion();

  const emptySlots = Math.max(0, 4 - compareItems.length);

  const rows: { label: string; icon: React.ReactNode; render: (p: DrinkProduct) => React.ReactNode }[] = [
    {
      label: "Price",
      icon: <span className="text-base">₹</span>,
      render: p => (
        <div>
          <span className="text-xl font-black text-amber font-serif">₹{p.price.toLocaleString()}</span>
          {p.originalPrice && <div className="text-xs text-muted line-through">₹{p.originalPrice.toLocaleString()}</div>}
          {p.discountPercent && <div className="text-xs font-bold text-sage">{p.discountPercent}% savings</div>}
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
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(p.rating) ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
            ))}
          </div>
          <span className="font-bold text-sm text-cream">{p.rating.toFixed(1)}</span>
          <span className="text-xs text-muted">({p.reviewCount})</span>
        </div>
      ),
    },
    {
      label: "ABV",
      icon: <Droplets className="w-3.5 h-3.5" />,
      render: p => <span className="font-black text-amber-glow text-base">{p.abv}</span>,
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
      render: p => <span className="font-medium text-amber">{p.servingTemp}</span>,
    },
    {
      label: "Tasting Notes",
      icon: <span className="text-sm">🍷</span>,
      render: p => (
        <div className="flex flex-wrap gap-1">
          {p.tastingNotes.slice(0, 4).map((note: string, i: number) => (
            <span key={i} className="text-[10px] bg-amber/10 text-amber border border-amber/20 px-1.5 py-0.5 rounded-full font-medium">{note}</span>
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
            <li key={f.id} className="flex items-start gap-1.5 text-xs text-muted">
              <span className="text-sage shrink-0 mt-0.5">▪</span>
              {f.title}
            </li>
          ))}
          {p.foodPairings.length === 0 && <li className="text-xs text-muted">—</li>}
        </ul>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-base transition-colors">

      {/* Breadcrumb */}
      <div className="bg-surface border-b border-white/5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/drinkit" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Drinkit</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cream font-semibold">Compare</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Back */}
        <Link href="/drinkit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-amber transition-colors mb-6 group focus-visible:ring-2 focus-visible:ring-amber rounded">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Drinkit
        </Link>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-6 h-6 text-amber" />
              <h1 className="text-2xl sm:text-3xl font-black text-cream font-serif">Drink Comparison</h1>
            </div>
            <p className="text-sm text-muted">
              Compare up to 4 beverages side-by-side · {compareItems.length} of 4 selected
            </p>
          </div>

          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button onClick={clearCompare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-muted hover:border-oxblood hover:text-oxblood transition-all focus-visible:ring-2 focus-visible:ring-amber">
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            )}
            <Link href="/drinkit"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-amber to-amber-glow text-base font-bold text-sm shadow-[0_4px_16px_rgba(193,122,61,0.25)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.35)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow">
              <Plus className="w-4 h-4" /> Add More Drinks
            </Link>
          </div>
        </div>

        {/* ── Empty State ── */}
        {compareItems.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-3xl border border-white/5">
            <PourLoader size="lg" className="mb-6" />
            <h2 className="text-xl font-black text-cream mb-2 font-serif">No Drinks Selected Yet</h2>
            <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
              Browse Drinkit and click <strong>&quot;+ Compare&quot;</strong> on any drink card to add it here. You can compare up to 4 at once.
            </p>
            <Link href="/drinkit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber to-amber-glow text-base font-bold rounded-full text-sm shadow-[0_8px_24px_rgba(193,122,61,0.25)] hover:shadow-[0_12px_32px_rgba(193,122,61,0.35)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow">
              <Plus className="w-4 h-4" /> Browse Beverages
            </Link>
          </div>
        ) : (
          <>
            {/* ── Comparison Table ── */}
            <motion.div
              className="bg-surface rounded-3xl border border-white/5 overflow-hidden mb-8"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? {} : { duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[520px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      {/* Label column header */}
                      <th className="p-4 w-36 bg-white/[0.02] text-left">
                        <span className="text-[10px] font-black uppercase text-muted tracking-widest">Attribute</span>
                      </th>

                      {/* Product columns */}
                      {compareItems.map((item, idx) => (
                        <motion.th
                          key={item.id}
                          className="p-4 align-top border-l border-white/5 group relative bg-surface"
                          initial={reduced ? {} : { opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={reduced ? {} : { duration: 0.4, delay: idx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                        >
                          {/* Remove button */}
                          <button onClick={() => toggleCompare(item)}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-base flex items-center justify-center text-muted hover:bg-oxblood hover:text-cream transition-all focus-visible:ring-2 focus-visible:ring-amber">
                            <X className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex flex-col items-center text-center pr-4 gap-2">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/5 shadow-sm">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-amber-glow uppercase tracking-wider block mb-0.5">{item.brand}</span>
                              <Link href={`/drink/${item.id}`} className="text-xs font-bold text-cream hover:text-amber transition-colors line-clamp-2 focus-visible:ring-2 focus-visible:ring-amber rounded">{item.title}</Link>
                              {item.badge && <span className="mt-1 inline-block text-[9px] font-black uppercase bg-amber text-base px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                            </div>
                          </div>
                        </motion.th>
                      ))}

                      {/* Empty slots */}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <th key={`empty-${i}`} className="p-4 border-l border-white/5 align-middle">
                          <Link href="/drinkit"
                            className="flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 border-dashed border-amber/20 text-muted hover:border-amber hover:text-amber transition-all group focus-visible:ring-2 focus-visible:ring-amber">
                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold">Add Drink</span>
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.03]">
                    {rows.map(row => (
                      <tr key={row.label} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <span className="text-muted">{row.icon}</span>
                            <span className="text-xs font-black text-muted uppercase tracking-wide">{row.label}</span>
                          </div>
                        </td>
                        {compareItems.map((item: DrinkProduct) => (
                          <Cell key={item.id} value={row.render(item)} />
                        ))}
                        {Array.from({ length: emptySlots }).map((_, i) => (
                          <td key={`empty-${i}`} className="p-4 border-l border-white/5 bg-white/[0.01]">
                            <span className="text-white/10 text-sm">—</span>
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Actions row */}
                    <tr className="border-t-2 border-white/5">
                      <td className="p-4 bg-white/[0.02]">
                        <span className="text-xs font-black text-muted uppercase tracking-wide">Actions</span>
                      </td>
                      {compareItems.map(item => (
                        <td key={item.id} className="p-4 border-l border-white/5">
                          <div className="flex flex-col gap-2">
                            <Link href={`/drink/${item.id}`}
                              className="w-full text-center py-2 rounded-xl bg-gradient-to-br from-amber to-amber-glow text-base font-bold text-xs shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow">
                              View Details
                            </Link>
                            <button onClick={() => toggleWishlist(item)}
                              className={`w-full py-2 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber ${isInWishlist(item.id) ? "bg-amber/10 text-amber border-amber/30" : "border-white/10 text-muted hover:border-amber hover:text-amber"}`}>
                              <Heart className={`w-3.5 h-3.5 ${isInWishlist(item.id) ? "fill-amber text-amber" : ""}`} />
                              {isInWishlist(item.id) ? "Wishlisted ✓" : "Add to Wishlist"}
                            </button>
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <td key={`empty-${i}`} className="p-4 border-l border-white/5 bg-white/[0.01]" />
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Browse more section */}
            <div className="bg-surface rounded-3xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-amber to-amber-glow rounded-full" />
                <h3 className="text-base font-black text-cream font-serif">Add More to Compare</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {drinkitProducts
                  .filter((p: DrinkProduct) => !compareItems.some((c: DrinkProduct) => c.id === p.id))
                  .slice(0, 4)
                  .map((p: DrinkProduct) => (
                    <div key={p.id} className="group bg-base rounded-2xl overflow-hidden border border-white/5 hover:border-amber/20 transition-all">
                      <div className="h-28 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <p className="text-[9px] font-bold text-amber-glow uppercase tracking-wider mb-0.5 truncate">{p.brand}</p>
                        <p className="text-xs font-bold text-cream line-clamp-2 mb-2 leading-snug">{p.title}</p>
                        <button onClick={() => toggleCompare(p)}
                          className="w-full py-1.5 rounded-xl border-2 border-dashed border-amber/30 text-amber text-[10px] font-bold hover:bg-amber/5 transition-colors flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-amber">
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
