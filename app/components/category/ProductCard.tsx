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
    <div className="group bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5 flex flex-col justify-between relative overflow-hidden">
      {/* Top Badges Header */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        {/* ETA Badge */}
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-200/50 dark:border-slate-700">
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
          {product.eta}
        </span>

        {/* Veg / Non-Veg Indicator */}
        <span
          className={`w-4 h-4 rounded-xs border-2 flex items-center justify-center p-0.5 ${
            product.isVeg ? "border-emerald-600" : "border-red-600"
          }`}
          title={product.isVeg ? "Vegetarian" : "Non-Vegetarian"}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              product.isVeg ? "bg-emerald-600" : "bg-red-600"
            }`}
          />
        </span>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square mb-2.5 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 && (
          <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}

        {/* Special Custom Badge */}
        {product.badge && !product.discountPercent && (
          <span className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Unit / Quantity Label */}
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
            {product.unit}
          </span>

          {/* Title */}
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
            {product.title}
          </h4>

          {/* Subtitle / Description */}
          {product.subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
              {product.subtitle}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded text-[10px] font-bold">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Add Button Bar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* ADD / Quantity Controller Button */}
          <div>
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white dark:hover:text-white border border-emerald-500/50 font-extrabold text-xs px-3 py-1.5 rounded-xl transition-all shadow-2xs hover:shadow-md hover:shadow-emerald-600/20 active:scale-95 flex items-center gap-1"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            ) : (
              <div className="flex items-center bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/30 overflow-hidden">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="px-2 py-1.5 hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
                >
                  <Minus className="w-3 h-3 stroke-[3]" />
                </button>
                <span className="px-2 text-xs font-extrabold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="px-2 py-1.5 hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
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
