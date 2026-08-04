"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { drinkitProducts } from "../../data/drinkitData";
import { WishlistCompareProvider, useWishlistCompare } from "../../context/WishlistCompareContext";
import { FloatingCompareBar } from "../../components/drinkit/FloatingCompareBar";
import { CompareModal } from "../../components/drinkit/CompareModal";
import { WishlistDrawer } from "../../components/drinkit/WishlistDrawer";
import {
  Heart, Scale, Star, ArrowLeft, CheckCircle, ThumbsUp,
  Thermometer, Droplets, MapPin, Clock, Award, Send,
  Utensils, Plus, Building2, ChevronRight
} from "lucide-react";
import BrandSpotlightNew from "../../components/BrandSpotlightNew";

interface DrinkDetailPageProps {
  params: Promise<{ id: string }>;
}

// ─── Rating Distribution Bar ──────────────────────────────────────────────────
function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-10 text-right text-slate-500 dark:text-slate-400 font-semibold shrink-0 text-xs">{label}</span>
      <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#f6a623] to-[#e8281a] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-slate-400 font-semibold shrink-0 text-xs">{pct}%</span>
    </div>
  );
}

// ─── Review Modal ─────────────────────────────────────────────────────────────
function ReviewModal({ onClose }: { onClose: () => void }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating || !comment.trim()) return;
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-scaleUp" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 font-serif">Review Submitted!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Thank you for sharing your tasting experience.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif">Write a Review</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Stars */}
              <div>
                <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Your Rating *</p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button"
                      onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)} className="transition-transform hover:scale-110 active:scale-95">
                      <Star className={`w-8 h-8 ${star <= (hoverRating || selectedRating) ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-700"}`} />
                    </button>
                  ))}
                  {selectedRating > 0 && (
                    <span className="ml-2 text-sm font-bold text-[#f6a623]">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selectedRating]}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Review Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Exceptional vintage, smooth finish..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#e8281a] transition-colors" />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Your Experience *</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4}
                  placeholder="Share your tasting notes, food pairing experience, or delivery feedback..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#e8281a] transition-colors resize-none" />
              </div>
              <button type="submit" disabled={!selectedRating || !comment.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold rounded-full text-sm shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                <Send className="w-4 h-4" /> Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-1 h-8 bg-gradient-to-b from-[#e8281a] to-[#f6a623] rounded-full shrink-0 mt-0.5" />
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────────────────────
function DrinkDetailContent({ id }: { id: string }) {
  const drink = drinkitProducts.find(d => d.id === id) || drinkitProducts[0];
  const { isInWishlist, toggleWishlist, isInCompare, toggleCompare, setIsCompareModalOpen } = useWishlistCompare();

  const isLiked = isInWishlist(drink.id);
  const isCompared = isInCompare(drink.id);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const savings = drink.originalPrice ? drink.originalPrice - drink.price : 0;
  const savingsPct = drink.originalPrice ? Math.round((savings / drink.originalPrice) * 100) : 0;

  const specs = [
    { icon: <Droplets className="w-4 h-4" />, label: "Alcohol (ABV)", value: drink.abv, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30" },
    { icon: <Clock className="w-4 h-4" />, label: "Volume", value: drink.volume, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30" },
    { icon: <MapPin className="w-4 h-4" />, label: "Origin / Region", value: drink.origin, color: "text-[#f6a623] bg-amber-50 dark:bg-amber-950/30" },
    { icon: <Thermometer className="w-4 h-4" />, label: "Serving Temp", value: drink.servingTemp, color: "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30" },
    ...(drink.vintage ? [{ icon: <Award className="w-4 h-4" />, label: "Vintage / Year", value: drink.vintage, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30" }] : []),
    ...(drink.type ? [{ icon: <Star className="w-4 h-4" />, label: "Drink Type", value: drink.type, color: "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800" }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#fff8f0] dark:bg-slate-950 transition-colors">

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-[#e8281a] transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/drinkit" className="hover:text-[#e8281a] transition-colors font-medium">Drinkit</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/category/${drink.categorySlug}`} className="hover:text-[#e8281a] transition-colors font-medium">{drink.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px]">{drink.title}</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

        {/* Back */}
        <Link href="/drinkit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#e8281a] transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Drinkit
        </Link>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: PRODUCT HERO                                            */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="aspect-square p-6 flex items-center justify-center">
                <img src={drink.image} alt={drink.title} className="w-full h-full object-cover rounded-2xl" />
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">{drink.abv} ABV</span>
                {drink.badge && <span className="bg-[#f6a623] text-slate-900 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">{drink.badge}</span>}
              </div>
              {savingsPct > 0 && <div className="absolute top-4 right-4 bg-[#e8281a] text-white text-xs font-black px-2.5 py-1 rounded-full">{savingsPct}% OFF</div>}
              <button onClick={() => toggleWishlist(drink)}
                className={`absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 border ${isLiked ? "bg-red-600 text-white border-red-600" : "bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 border-slate-200 dark:border-slate-700"}`}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8 h-full flex flex-col">
              <p className="text-xs font-black text-[#f6a623] uppercase tracking-widest mb-2">
                <Link href={`/brand/${encodeURIComponent(drink.brand)}`} className="hover:underline">{drink.brand}</Link> · <Link href={`/category/${drink.categorySlug}`} className="hover:underline">{drink.category}</Link>
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-serif leading-tight mb-3">{drink.title}</h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(drink.rating) ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-700"}`} />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">{drink.rating.toFixed(1)}</span>
                </div>
                <a href="#reviews-section" className="text-sm text-[#e8281a] font-semibold hover:underline">{drink.reviewCount} Reviews</a>
                <span className="text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified Quality
                </span>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-[#e8281a] dark:text-red-400 font-serif">₹{drink.price.toLocaleString()}</span>
                  {drink.originalPrice && <span className="text-xl text-slate-400 line-through">₹{drink.originalPrice.toLocaleString()}</span>}
                  {savings > 0 && <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">You save ₹{savings.toLocaleString()}</span>}
                </div>
                <p className="text-xs text-slate-400 mt-1">Inclusive of all taxes · Free delivery over ₹999</p>
              </div>

              {/* Tasting Notes */}
              <div className="mb-5">
                <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-2">Tasting Profile</p>
                <div className="flex flex-wrap gap-1.5">
                  {drink.tastingNotes.map((note, i) => (
                    <span key={i} className="text-xs bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 px-3 py-1 rounded-full font-semibold">
                      🍷 {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <p className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${!showFullDesc ? "line-clamp-3" : ""}`}>{drink.description}</p>
                <button onClick={() => setShowFullDesc(!showFullDesc)} className="mt-1.5 text-xs font-bold text-[#e8281a] hover:underline">
                  {showFullDesc ? "Show less ▲" : "Read more ▼"}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                <button onClick={() => toggleWishlist(drink)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-bold text-sm transition-all ${isLiked ? "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-600 dark:text-rose-400" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-500"}`}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600 dark:fill-rose-400 text-rose-600 dark:text-rose-400" : ""}`} />
                  {isLiked ? "Saved ✓" : "Add to Wishlist"}
                </button>

                <button
                  onClick={() => { toggleCompare(drink); if (!isCompared) setTimeout(() => setIsCompareModalOpen(true), 300); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-bold text-sm transition-all ${isCompared ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600"}`}>
                  <Scale className="w-4 h-4" />
                  {isCompared ? "Comparing ✓" : "+ Compare Drink"}
                </button>

                <button onClick={() => setShowReviewModal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all">
                  <Star className="w-4 h-4" /> Rate & Review
                </button>

                <Link href={`/brand/${encodeURIComponent(drink.brand)}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 font-bold text-sm hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all">
                  <Building2 className="w-4 h-4" /> Brand History
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: PRODUCT DETAILS (SPECS TABLE + FLAVOR PROFILE)          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <SectionHeading icon={<Award className="w-5 h-5 text-[#f6a623]" />} title="Product Details" subtitle="Full beverage specifications and flavor breakdown" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spec Table */}
            <div>
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Beverage Specifications</h3>
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/80">
                {[
                  { label: "Brand", value: drink.brand },
                  { label: "Category", value: drink.category },
                  { label: "Type", value: drink.type || "—" },
                  { label: "Volume", value: drink.volume },
                  { label: "Alcohol (ABV)", value: drink.abv },
                  { label: "Origin / Region", value: drink.origin },
                  { label: "Vintage / Year", value: drink.vintage || "—" },
                  { label: "Serving Temperature", value: drink.servingTemp },
                ].map(row => (
                  <div key={row.label} className="flex items-center px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <span className="w-44 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide shrink-0">{row.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Spec Cards + Flavor Profile */}
            <div className="space-y-6">
              {/* Quick spec tiles */}
              <div className="grid grid-cols-2 gap-3">
                {specs.slice(0, 4).map((s, i) => (
                  <div key={i} className={`rounded-2xl p-4 border border-transparent ${s.color.split(" ").slice(2).join(" ")}`}>
                    <div className={`flex items-center gap-1.5 mb-1 ${s.color.split(" ").slice(0, 2).join(" ")}`}>
                      {s.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                    </div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Flavor profile bars */}
              <div>
                <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Flavor Intensity</h3>
                <div className="space-y-3">
                  {drink.tastingNotes.map((note, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-28 shrink-0">{note}</span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#e8281a] to-[#f6a623] rounded-full" style={{ width: `${92 - i * 13}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold w-8 text-right">{92 - i * 13}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: GRAB WITH FOODS (Color UI updated from Section 3)       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {drink.foodPairings.length > 0 && (
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 rounded-3xl border border-amber-100 dark:border-slate-800 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
              <SectionHeading
                icon={<Utensils className="w-5 h-5 text-[#f6a623]" />}
                title="Grab with Foods"
                subtitle={`Sommelier-curated dishes that pair beautifully with ${drink.brand}`}
              />
              <span className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 px-3 py-1.5 rounded-full font-bold shrink-0 self-start">
                {drink.foodPairings.length} Pairings
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {drink.foodPairings.map(food => (
                <div key={food.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={food.image} alt={food.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#f6a623] text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">{food.category}</span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white leading-tight">{food.title}</h4>
                      <span className="bg-white/90 text-slate-900 text-xs font-black px-2 py-0.5 rounded-lg shrink-0 ml-2">₹{food.price}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 fill-[#f6a623] text-[#f6a623]" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{food.rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">pairing score</span>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-3 mb-3">
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed italic">"{food.pairingReason}"</p>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-xs font-bold hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Order This Pairing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: BRAND SPOTLIGHT                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <BrandSpotlightNew />

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: REVIEWS & RATINGS                                       */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div id="reviews-section" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <SectionHeading icon={<Star className="w-5 h-5 text-[#f6a623]" />} title="Customer Reviews" subtitle={`${drink.reviewCount} verified tasting experiences`} />
            <button onClick={() => setShowReviewModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all shrink-0 self-start">
              <Star className="w-4 h-4" /> Write a Review
            </button>
          </div>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-amber-100 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-black text-[#e8281a] dark:text-red-400 font-serif mb-1">{drink.rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(drink.rating) ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-600"}`} />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{drink.reviewCount} reviews</span>
            </div>
            <div className="md:col-span-3 flex flex-col justify-center space-y-3">
              <RatingBar label="5 ★" pct={82} />
              <RatingBar label="4 ★" pct={12} />
              <RatingBar label="3 ★" pct={4} />
              <RatingBar label="2 ★" pct={1} />
              <RatingBar label="1 ★" pct={1} />
            </div>
          </div>

          {/* Reviews list */}
          {drink.reviewsList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">No reviews yet</h4>
              <p className="text-sm text-slate-400 mb-5">Be the first to share your tasting notes!</p>
              <button onClick={() => setShowReviewModal(true)}
                className="px-6 py-2.5 bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold rounded-full text-sm shadow-md">
                Write First Review
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {drink.reviewsList.map(rev => (
                <div key={rev.id} className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e8281a] to-[#f6a623] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                              <CheckCircle className="w-2.5 h-2.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-[#f6a623] text-[#f6a623]" : "text-slate-200 dark:text-slate-700"}`} />
                      ))}
                    </div>
                  </div>
                  {rev.title && <p className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{rev.title}</p>}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{rev.comment}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
                    <button className="flex items-center gap-1.5 hover:text-[#e8281a] transition-colors font-medium">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: YOU MIGHT ALSO LIKE                                     */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div>
          <SectionHeading icon={<Star className="w-5 h-5 text-[#f6a623]" />} title="You Might Also Like" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {drinkitProducts.filter(p => p.id !== drink.id).slice(0, 4).map(p => (
              <Link key={p.id} href={`/drink/${p.id}`} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5">
                  <p className="text-[10px] font-bold text-[#f6a623] uppercase tracking-wider mb-0.5">{p.brand}</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#e8281a] transition-colors mb-2">{p.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#e8281a] dark:text-red-400 font-serif">₹{p.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{p.abv}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}
      <FloatingCompareBar />
      <WishlistDrawer />
      <CompareModal />
    </div>
  );
}

export default function DrinkDetailPage({ params }: DrinkDetailPageProps) {
  const { id } = use(params);
  return <DrinkDetailContent id={id} />;
}
