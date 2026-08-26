"use client";

import React from "react";
import { Zap, Star, Plus, Minus } from "lucide-react";
import { QuickProduct } from "../../types/category";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: QuickProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div className="group bg-surface/85 backdrop-blur-md rounded-2xl p-3 border border-white/10 hover:border-amber/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden">
      {/* Top Badges Header */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        {/* ETA Badge */}
        <span className="bg-base text-muted text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/5">
          <Zap className="w-3 h-3 text-amber-glow fill-amber-glow" />
          {product.eta}
        </span>

        {/* Veg / Non-Veg Indicator */}
        <span
          className={`w-4 h-4 rounded-xs border-2 flex items-center justify-center p-0.5 ${
            product.isVeg ? "border-sage" : "border-oxblood"
          }`}
          title={product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.isVeg ? "bg-sage" : "bg-oxblood"
            }`}
          />
        </span>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square mb-2.5 rounded-xl overflow-hidden bg-base/50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="absolute bottom-2 left-2 bg-oxblood text-cream text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* Special Custom Badge */}
        {product.badge && !product.discountPercent && (
          <span className="absolute bottom-2 left-2 bg-amber text-base text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Unit / Quantity Label */}
          <span className="text-[11px] font-semibold text-muted block mb-0.5">
            {product.unit}
          </span>

          {/* Title */}
          <h4 className="text-xs sm:text-sm font-bold text-cream line-clamp-2 leading-tight group-hover:text-amber transition-colors mb-1">
            {product.title}
          </h4>

          {/* Subtitle / Description */}
          {product.subtitle && (
            <p className="text-[11px] text-muted line-clamp-1 mb-2">
              {product.subtitle}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5 bg-amber/10 text-amber px-1.5 py-0.2 rounded text-[10px] font-bold border border-amber/20">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-amber-glow text-amber-glow" />
            </div>
            <span className="text-[10px] text-muted font-medium">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Add Button Bar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold text-cream">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-muted line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* ADD / Quantity Controller Button */}
          <div>
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="bg-amber/15 hover:bg-amber text-amber hover:text-base border border-amber/30 font-extrabold text-xs px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-amber"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            ) : (
              <div className="flex items-center bg-amber text-base rounded-xl font-bold text-xs shadow-md shadow-amber/30 overflow-hidden">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="px-2 py-1.5 hover:bg-amber-glow active:bg-amber transition-colors"
                >
                  <Minus className="w-3 h-3 stroke-[3]" />
                </button>
                <span className="px-2 text-xs font-extrabold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="px-2 py-1.5 hover:bg-amber-glow active:bg-amber transition-colors"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
