"use client";

import React from "react";
import { ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const FloatingCartBar: React.FC = () => {
  const { totalCount, totalPrice, setIsCartOpen, cartItems } = useCart();

  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl animate-fade-in-up">
      <div className="bg-slate-900 dark:bg-emerald-950 text-white p-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl shadow-slate-950/40 border border-slate-700/80 dark:border-emerald-700/50 flex items-center justify-between gap-3 backdrop-blur-lg">
        {/* Left: Item Thumbnails & Total */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Stack of item images */}
          <div className="flex -space-x-2 overflow-hidden shrink-0">
            {cartItems.slice(0, 3).map((item) => (
              <img
                key={item.product.id}
                src={item.product.image}
                alt={item.product.title}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-slate-900 bg-white"
              />
            ))}
            {cartItems.length > 3 && (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-300">
                +{cartItems.length - 3}
              </div>
            )}
          </div>

          {/* Pricing Info */}
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {totalCount} {totalCount === 1 ? "Item" : "Items"}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                ₹{totalPrice.toFixed(0)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-300 font-medium">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span>Arriving in 10 MINS</span>
            </div>
          </div>
        </div>

        {/* Right: View Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
