"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scale, Star, Zap, Check } from "lucide-react";
import { DrinkProduct } from "../../types/drinkit";
import { useWishlistCompare } from "../../context/WishlistCompareContext";

interface DrinkProductCardProps {
  product: DrinkProduct;
}

export const DrinkProductCard: React.FC<DrinkProductCardProps> = ({ product }) => {
  const {
    isInWishlist,
    toggleWishlist,
    isInCompare,
    toggleCompare,
  } = useWishlistCompare();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group bg-surface border border-white/5 hover:border-amber/30 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] hover:scale-[1.02]">
      {/* Top Bar (ETA & Wishlist Heart) */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <span className="bg-base text-muted text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
          <Zap className="w-3 h-3 text-amber-glow fill-amber-glow" />
          {product.eta}
        </span>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-full transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-amber ${
            isLiked
              ? "bg-amber/10 text-amber border border-amber/30"
              : "bg-base text-muted hover:text-amber hover:bg-white/5"
          }`}
          title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-amber text-amber" : ""}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        href={`/drink/${product.id}`}
        className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden bg-base flex items-center justify-center group-hover:scale-105 transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-amber"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* ABV Badge */}
        <span className="absolute bottom-2 left-2 bg-base/90 backdrop-blur-md text-amber-glow border border-amber/20 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
          {product.abv} ABV
        </span>

        {/* Custom Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-amber text-base text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Drink Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted mb-1">
            <span>{product.volume}</span>
            <span>{product.origin}</span>
          </div>

          <Link href={`/drink/${product.id}`}>
            <h4 className="text-xs sm:text-sm font-bold text-cream line-clamp-2 leading-tight group-hover:text-amber transition-colors mb-1.5">
              {product.title}
            </h4>
          </Link>

          {/* Tasting Notes Pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tastingNotes.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[9px] bg-white/5 text-cream px-1.5 py-0.5 rounded font-medium"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5 bg-amber/10 text-amber border border-amber/20 px-1.5 py-0.2 rounded text-[10px] font-bold">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-amber text-amber" />
            </div>
            <span className="text-[10px] text-muted font-medium">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Pricing & Compare Toggle Bar */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold text-cream">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-muted line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* COMPARE BUTTON */}
          <button
            onClick={() => toggleCompare(product)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all active:scale-95 border focus-visible:ring-2 focus-visible:ring-amber ${
              isCompared
                ? "bg-amber text-base border-amber shadow-md shadow-amber/30"
                : "bg-base hover:bg-white/5 text-cream border-white/10 hover:border-amber"
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Compared</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5 text-amber" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
