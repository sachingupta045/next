"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { drinkitProducts } from "../../data/drinkitData";
import { useWishlistCompare } from "../../context/WishlistCompareContext";
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
      <span className="w-10 text-right text-muted font-semibold shrink-0 text-xs">{label}</span>
      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber to-amber-glow rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-muted font-semibold shrink-0 text-xs">{pct}%</span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={onClose}>
      <div className="bg-surface rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber/20 animate-scaleUp" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-amber/15 flex items-center justify-center mx-auto mb-4 border border-amber/30">
              <CheckCircle className="w-9 h-9 text-amber" />
            </div>
            <h3 className="text-xl font-black text-cream mb-1 font-serif">Review Submitted!</h3>
            <p className="text-sm text-muted">Thank you for sharing your tasting experience.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-cream font-serif">Write a Review</h3>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-base flex items-center justify-center text-muted hover:text-cream hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-amber">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Stars */}
              <div>
                <p className="text-xs font-black uppercase text-muted tracking-widest mb-3">Your Rating *</p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button"
                      onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)} className="transition-transform hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber rounded">
                      <Star className={`w-8 h-8 ${star <= (hoverRating || selectedRating) ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
                    </button>
                  ))}
                  {selectedRating > 0 && (
                    <span className="ml-2 text-sm font-bold text-amber-glow">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selectedRating]}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase text-muted tracking-widest mb-2 block">Review Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Exceptional vintage, smooth finish..."
                  className="w-full px-4 py-3 bg-base border border-white/10 rounded-xl text-sm text-cream placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus:border-amber transition-colors" />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-muted tracking-widest mb-2 block">Your Experience *</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4}
                  placeholder="Share your tasting notes, food pairing experience, or delivery feedback..."
                  className="w-full px-4 py-3 bg-base border border-white/10 rounded-xl text-sm text-cream placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus:border-amber transition-colors resize-none" />
              </div>
              <button type="submit" disabled={!selectedRating || !comment.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber to-amber-glow text-base font-bold rounded-full text-sm shadow-[0_4px_18px_rgba(193,122,61,0.35)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus-visible:ring-2 focus-visible:ring-amber-glow">
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
      <div className="w-1 h-8 bg-gradient-to-b from-amber to-amber-glow rounded-full shrink-0 mt-0.5" />
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl sm:text-2xl font-black text-cream font-serif">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
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
    { icon: <Droplets className="w-4 h-4" />, label: "Alcohol (ABV)", value: drink.abv, color: "text-amber-glow bg-amber/10 border-amber/20" },
    { icon: <Clock className="w-4 h-4" />, label: "Volume", value: drink.volume, color: "text-cream bg-white/5 border-white/10" },
    { icon: <MapPin className="w-4 h-4" />, label: "Origin / Region", value: drink.origin, color: "text-amber bg-amber/10 border-amber/20" },
    { icon: <Thermometer className="w-4 h-4" />, label: "Serving Temp", value: drink.servingTemp, color: "text-amber-glow bg-amber/10 border-amber/20" },
    ...(drink.vintage ? [{ icon: <Award className="w-4 h-4" />, label: "Vintage / Year", value: drink.vintage, color: "text-sage bg-sage/10 border-sage/20" }] : []),
    ...(drink.type ? [{ icon: <Star className="w-4 h-4" />, label: "Drink Type", value: drink.type, color: "text-muted bg-white/5 border-white/10" }] : []),
  ];

  return (
    <div className="min-h-screen bg-transparent transition-colors">

      {/* Breadcrumb */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-muted flex-wrap">
          <Link href="/" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/drinkit" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Drinkit</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/category/${drink.categorySlug}`} className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">{drink.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cream font-semibold truncate max-w-[200px]">{drink.title}</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

        {/* Back */}
        <Link href="/drinkit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-amber transition-colors group focus-visible:ring-2 focus-visible:ring-amber rounded">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Drinkit
        </Link>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: PRODUCT HERO                                            */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl overflow-hidden group">
              <div className="aspect-square p-6 flex items-center justify-center bg-base/40">
                <img src={drink.image} alt={drink.title} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
              </div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-amber text-base text-xs font-black px-3 py-1 rounded-full shadow-sm">{drink.abv} ABV</span>
                {drink.badge && <span className="bg-amber-glow text-base text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">{drink.badge}</span>}
              </div>
              {savingsPct > 0 && <div className="absolute top-4 right-4 bg-oxblood text-cream text-xs font-black px-2.5 py-1 rounded-full">{savingsPct}% OFF</div>}
              <button onClick={() => toggleWishlist(drink)}
                className={`absolute bottom-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 border focus-visible:ring-2 focus-visible:ring-amber ${isLiked ? "bg-amber text-base border-amber" : "bg-surface/90 text-muted hover:text-amber border-white/10"}`}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-base" : ""}`} />
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-7">
            <div className="bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8 h-full flex flex-col">
              <p className="text-xs font-black text-amber-glow uppercase tracking-widest mb-2">
                <Link href={`/brand/${encodeURIComponent(drink.brand)}`} className="hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">{drink.brand}</Link> · <Link href={`/category/${drink.categorySlug}`} className="hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">{drink.category}</Link>
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-cream font-serif leading-tight mb-3">{drink.title}</h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-white/10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(drink.rating) ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-cream">{drink.rating.toFixed(1)}</span>
                </div>
                <a href="#reviews-section" className="text-sm text-amber font-bold hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">{drink.reviewCount} Reviews</a>
                <span className="text-xs bg-amber/10 text-amber border border-amber/20 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified Quality
                </span>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-amber font-serif">₹{drink.price.toLocaleString()}</span>
                  {drink.originalPrice && <span className="text-xl text-muted line-through">₹{drink.originalPrice.toLocaleString()}</span>}
                  {savings > 0 && <span className="text-sm font-bold text-sage bg-sage/10 border border-sage/20 px-2.5 py-1 rounded-full">You save ₹{savings.toLocaleString()}</span>}
                </div>
                <p className="text-xs text-muted mt-1">Inclusive of all taxes · Express dispatch available</p>
              </div>

              {/* Tasting Notes */}
              <div className="mb-5">
                <p className="text-[11px] font-black uppercase text-muted tracking-widest mb-2">Tasting Profile</p>
                <div className="flex flex-wrap gap-1.5">
                  {drink.tastingNotes.map((note, i) => (
                    <span key={i} className="text-xs bg-amber/10 text-amber border border-amber/20 px-3 py-1 rounded-full font-semibold">
                      🍷 {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <p className={`text-sm text-muted leading-relaxed ${!showFullDesc ? "line-clamp-3" : ""}`}>{drink.description}</p>
                <button onClick={() => setShowFullDesc(!showFullDesc)} className="mt-1.5 text-xs font-bold text-amber hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">
                  {showFullDesc ? "Show less ▲" : "Read more ▼"}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-5 border-t border-white/10 flex flex-wrap gap-3">
                <button onClick={() => toggleWishlist(drink)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-amber ${isLiked ? "bg-amber/15 border-amber text-amber" : "border-white/15 text-cream hover:border-amber hover:text-amber"}`}>
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-amber text-amber" : ""}`} />
                  {isLiked ? "Saved ✓" : "Add to Wishlist"}
                </button>

                <button
                  onClick={() => { toggleCompare(drink); if (!isCompared) setTimeout(() => setIsCompareModalOpen(true), 300); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-amber ${isCompared ? "bg-amber border-amber text-base" : "border-white/15 text-cream hover:border-amber hover:text-amber"}`}>
                  <Scale className="w-4 h-4" />
                  {isCompared ? "Comparing ✓" : "+ Compare Drink"}
                </button>

                <button onClick={() => setShowReviewModal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-sm shadow-[0_4px_16px_rgba(193,122,61,0.3)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.4)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow">
                  <Star className="w-4 h-4" /> Rate &amp; Review
                </button>

                <Link href={`/brand/${encodeURIComponent(drink.brand)}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-amber/30 text-amber font-bold text-sm hover:bg-amber/10 transition-all focus-visible:ring-2 focus-visible:ring-amber">
                  <Building2 className="w-4 h-4" /> Brand History
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: PRODUCT DETAILS                                         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8">
          <SectionHeading icon={<Award className="w-5 h-5 text-amber" />} title="Product Details" subtitle="Full beverage specifications and flavor breakdown" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spec Table */}
            <div>
              <h3 className="text-sm font-black uppercase text-muted tracking-widest mb-4">Beverage Specifications</h3>
              <div className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5 bg-base/30">
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
                  <div key={row.label} className="flex items-center px-4 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <span className="w-44 text-xs font-bold text-muted uppercase tracking-wide shrink-0">{row.label}</span>
                    <span className="text-sm font-bold text-cream">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Spec Cards + Flavor Profile */}
            <div className="space-y-6">
              {/* Quick spec tiles */}
              <div className="grid grid-cols-2 gap-3">
                {specs.slice(0, 4).map((s, i) => (
                  <div key={i} className={`rounded-2xl p-4 border ${s.color}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      {s.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                    </div>
                    <p className="text-sm font-black text-cream">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Flavor profile bars */}
              <div>
                <h3 className="text-sm font-black uppercase text-muted tracking-widest mb-4">Flavor Intensity</h3>
                <div className="space-y-3">
                  {drink.tastingNotes.map((note, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-cream w-28 shrink-0">{note}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber to-amber-glow rounded-full" style={{ width: `${92 - i * 13}%` }} />
                      </div>
                      <span className="text-[10px] text-muted font-bold w-8 text-right">{92 - i * 13}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: FOOD PAIRINGS                                           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {drink.foodPairings.length > 0 && (
          <div className="bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
              <SectionHeading
                icon={<Utensils className="w-5 h-5 text-amber" />}
                title="Recommended Food Pairings"
                subtitle={`Sommelier-curated dishes that pair beautifully with ${drink.brand}`}
              />
              <span className="text-xs bg-sage/10 text-sage border border-sage/20 px-3 py-1.5 rounded-full font-bold shrink-0 self-start">
                {drink.foodPairings.length} Pairings
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {drink.foodPairings.map(food => (
                <div key={food.id} className="group bg-base/70 rounded-2xl overflow-hidden border border-white/10 hover:border-amber/40 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={food.image} alt={food.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 bg-amber text-base text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">{food.category}</span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-cream leading-tight">{food.title}</h4>
                      <span className="bg-surface/90 text-amber text-xs font-black px-2 py-0.5 rounded-lg shrink-0 ml-2 border border-white/10">₹{food.price}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-glow text-amber-glow" />
                      <span className="text-xs font-bold text-cream">{food.rating.toFixed(1)}</span>
                      <span className="text-xs text-muted">pairing score</span>
                    </div>
                    <div className="bg-surface/60 border border-white/5 rounded-xl p-3 mb-3">
                      <p className="text-[11px] text-muted leading-relaxed italic">&quot;{food.pairingReason}&quot;</p>
                    </div>
                    <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-dashed border-amber/30 text-amber text-xs font-bold hover:bg-amber/10 transition-colors focus-visible:ring-2 focus-visible:ring-amber">
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
        <div id="reviews-section" className="bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <SectionHeading icon={<Star className="w-5 h-5 text-amber" />} title="Customer Reviews" subtitle={`${drink.reviewCount} verified tasting experiences`} />
            <button onClick={() => setShowReviewModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-sm shadow-[0_4px_16px_rgba(193,122,61,0.3)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.4)] hover:-translate-y-0.5 transition-all shrink-0 self-start focus-visible:ring-2 focus-visible:ring-amber-glow">
              <Star className="w-4 h-4" /> Write a Review
            </button>
          </div>

          {/* Rating Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="bg-base/60 rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center text-center">
              <span className="text-6xl font-black text-amber font-serif mb-1">{drink.rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(drink.rating) ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
                ))}
              </div>
              <span className="text-xs text-muted font-medium">{drink.reviewCount} reviews</span>
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
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Star className="w-8 h-8 text-muted" />
              </div>
              <h4 className="text-base font-bold text-cream mb-1">No reviews yet</h4>
              <p className="text-sm text-muted mb-5">Be the first to share your tasting notes!</p>
              <button onClick={() => setShowReviewModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-amber to-amber-glow text-base font-bold rounded-full text-sm shadow-md focus-visible:ring-2 focus-visible:ring-amber-glow">
                Write First Review
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {drink.reviewsList.map(rev => (
                <div key={rev.id} className="bg-base/60 rounded-2xl border border-white/10 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber to-amber-glow text-base flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-cream">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-sage bg-sage/10 border border-sage/20 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                              <CheckCircle className="w-2.5 h-2.5" /> Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-glow text-amber-glow" : "text-white/10"}`} />
                      ))}
                    </div>
                  </div>
                  {rev.title && <p className="text-sm font-bold text-cream mb-1.5">{rev.title}</p>}
                  <p className="text-sm text-muted leading-relaxed mb-3">{rev.comment}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-xs text-muted">
                    <button className="flex items-center gap-1.5 hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">
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
          <SectionHeading icon={<Star className="w-5 h-5 text-amber" />} title="You Might Also Like" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {drinkitProducts.filter(p => p.id !== drink.id).slice(0, 4).map(p => (
              <Link key={p.id} href={`/drink/${p.id}`} className="group bg-surface/85 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-sm hover:border-amber/40 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] hover:-translate-y-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber">
                <div className="h-36 overflow-hidden bg-base/50">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5">
                  <p className="text-[10px] font-bold text-amber-glow uppercase tracking-wider mb-0.5">{p.brand}</p>
                  <p className="text-xs font-bold text-cream line-clamp-2 leading-snug group-hover:text-amber transition-colors mb-2">{p.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-amber font-serif">₹{p.price.toLocaleString()}</span>
                    <span className="text-[10px] text-muted font-bold bg-white/5 px-1.5 py-0.5 rounded">{p.abv}</span>
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
