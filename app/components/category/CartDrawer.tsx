"use client";

import React from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, Zap, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import { useCart } from "../../context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalOriginalPrice,
    totalSavings,
    totalCount,
  } = useCart();

  if (!isCartOpen) return null;

  const deliveryFee = totalPrice >= 199 || totalCount === 0 ? 0 : 25;
  const handlingFee = totalCount > 0 ? 4 : 0;
  const grandTotal = totalPrice + deliveryFee + handlingFee;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-full flex flex-col shadow-2xl z-10 animate-slide-left transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-base">
              My Cart ({totalCount} {totalCount === 1 ? "Item" : "Items"})
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                Clear Cart
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ETA & Location Pill */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2.5 border-b border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-slate-950" />
              10 MINS
            </span>
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
              Instant Delivery to Home
            </span>
          </div>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {totalCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold mb-1">Your Cart is Empty</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                Explore our catalog and add fresh items delivered in 10 minutes!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-800"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1 shrink-0 border border-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold truncate">
                        {product.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        {product.unit}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          ₹{product.price * quantity}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{product.originalPrice * quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper counter */}
                    <div className="flex items-center bg-emerald-600 text-white rounded-xl text-xs font-extrabold overflow-hidden shrink-0 shadow-xs">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="p-1.5 hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
                      >
                        {quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="px-2">{quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="p-1.5 hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Box */}
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Ticket className="w-4 h-4 text-amber-600" />
                  <span>Use Coupon "ZEPTO100" for ₹100 Off</span>
                </div>
                <button className="text-xs font-black text-amber-700 dark:text-amber-400 underline">
                  Apply
                </button>
              </div>

              {/* Bill Details */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <h5 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Bill Details
                </h5>

                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>Item Total</span>
                  <div className="flex items-center gap-1.5">
                    {totalOriginalPrice > totalPrice && (
                      <span className="line-through text-slate-400 text-[11px]">
                        ₹{totalOriginalPrice}
                      </span>
                    )}
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <span>Delivery Charge</span>
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  </span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      FREE
                    </span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>Handling Fee</span>
                  <span>₹{handlingFee}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="p-2 bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 rounded-lg text-xs font-bold text-center">
                    🎉 You save ₹{totalSavings + (deliveryFee === 0 ? 25 : 0)} on this order!
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>To Pay</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-base">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Safety badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Quality Assured & Sealed Packaged</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {totalCount > 0 && (
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => alert(`Proceeding to checkout with total ₹${grandTotal}`)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-between transition-all shadow-lg shadow-emerald-600/30 active:scale-95 text-sm"
            >
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-emerald-100">
                  ₹{grandTotal}
                </span>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                  TOTAL PAYABLE
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
