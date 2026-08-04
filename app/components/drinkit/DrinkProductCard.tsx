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
    <div className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20">
      {/* Top Bar (ETA & Wishlist Heart) */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-700">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          {product.eta}
        </span>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-full transition-all active:scale-90 ${
            isLiked
              ? "bg-rose-950/80 text-rose-500 border border-rose-800/60"
              : "bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-slate-800"
          }`}
          title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link
        href={`/drink/${product.id}`}
        className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* ABV Badge */}
        <span className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
          {product.abv} ABV
        </span>

        {/* Custom Badge */}
        {product.badge && (
          <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Drink Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
            <span>{product.volume}</span>
            <span>{product.origin}</span>
          </div>

          <Link href={`/drink/${product.id}`}>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors mb-1.5">
              {product.title}
            </h4>
          </Link>

          {/* Tasting Notes Pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tastingNotes.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-medium"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 px-1.5 py-0.2 rounded text-[10px] font-bold">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Pricing & Compare Toggle Bar */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-800">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* COMPARE BUTTON (NO CART BUTTON!) */}
          <button
            onClick={() => toggleCompare(product)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all active:scale-95 border ${
              isCompared
                ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            }`}
          >
            {isCompared ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Compared</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
