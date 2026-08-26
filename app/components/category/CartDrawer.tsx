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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-surface text-cream h-full flex flex-col shadow-2xl z-10 animate-slide-left transition-colors border-l border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-base/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber" />
            <h3 className="font-extrabold text-base text-cream">
              My Cart ({totalCount} {totalCount === 1 ? "Item" : "Items"})
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-oxblood hover:text-amber font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded"
              >
                Clear Cart
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/5 text-muted hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-amber"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ETA & Location Pill */}
        <div className="bg-amber/10 px-4 py-2.5 border-b border-amber/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber text-base text-[10px] font-black uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-base" />
              10 MINS
            </span>
            <span className="text-xs font-bold text-amber-glow">
              Instant Delivery to Home
            </span>
          </div>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {totalCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 bg-base rounded-full flex items-center justify-center text-muted mb-4 border border-white/10">
                <ShoppingBag className="w-10 h-10 text-amber/40" />
              </div>
              <h4 className="text-base font-bold text-cream mb-1">Your Cart is Empty</h4>
              <p className="text-xs text-muted max-w-xs mb-6">
                Explore our catalog and add fresh items delivered in 10 minutes!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-amber-glow"
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
                    className="flex items-center justify-between gap-3 p-3 bg-base/60 rounded-2xl border border-white/10"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-contain bg-base p-1 shrink-0 border border-white/5"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-cream truncate">
                        {product.title}
                      </h5>
                      <span className="text-[10px] text-muted font-semibold block">
                        {product.unit}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-extrabold text-amber">
                          ₹{product.price * quantity}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-muted line-through">
                            ₹{product.originalPrice * quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper counter */}
                    <div className="flex items-center bg-amber text-base rounded-xl text-xs font-extrabold overflow-hidden shrink-0 shadow-xs">
                      <button
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="p-1.5 hover:bg-amber-glow active:bg-amber transition-colors"
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
                        className="p-1.5 hover:bg-amber-glow active:bg-amber transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Box */}
              <div className="flex items-center justify-between p-3 bg-amber/10 rounded-xl border border-amber/25 text-cream">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Ticket className="w-4 h-4 text-amber" />
                  <span>Use Coupon &quot;WHISKEY100&quot; for ₹100 Off</span>
                </div>
                <button className="text-xs font-black text-amber hover:underline">
                  Apply
                </button>
              </div>

              {/* Bill Details */}
              <div className="p-4 bg-base/50 rounded-2xl border border-white/10 space-y-2.5">
                <h5 className="text-xs font-black uppercase tracking-wider text-muted">
                  Bill Details
                </h5>

                <div className="flex justify-between text-xs font-medium text-cream">
                  <span>Item Total</span>
                  <div className="flex items-center gap-1.5">
                    {totalOriginalPrice > totalPrice && (
                      <span className="line-through text-muted text-[11px]">
                        ₹{totalOriginalPrice}
                      </span>
                    )}
                    <span className="font-bold text-cream">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-xs font-medium text-cream">
                  <span className="flex items-center gap-1">
                    <span>Delivery Charge</span>
                    <Zap className="w-3 h-3 text-amber-glow fill-amber-glow" />
                  </span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-sage">
                      FREE
                    </span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between text-xs font-medium text-cream">
                  <span>Handling Fee</span>
                  <span>₹{handlingFee}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="p-2 bg-sage/10 text-sage border border-sage/20 rounded-lg text-xs font-bold text-center">
                    🎉 You save ₹{totalSavings + (deliveryFee === 0 ? 25 : 0)} on this order!
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-extrabold text-cream">
                  <span>To Pay</span>
                  <span className="text-amber font-serif text-base">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Safety badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted font-semibold py-1">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>100% Quality Assured &amp; Sealed Packaged</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {totalCount > 0 && (
          <div className="p-4 bg-surface border-t border-white/10">
            <button
              onClick={() => alert(`Proceeding to checkout with total ₹${grandTotal}`)}
              className="w-full bg-gradient-to-r from-amber to-amber-glow text-base font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-between transition-all shadow-lg shadow-amber/20 active:scale-95 text-sm focus-visible:ring-2 focus-visible:ring-amber-glow"
            >
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs font-black">
                  ₹{grandTotal}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">
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
