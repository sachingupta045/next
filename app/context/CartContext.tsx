"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { QuickProduct, CartItem } from "../types/category";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: QuickProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  clearCart: () => void;
  totalPrice: number;
  totalOriginalPrice: number;
  totalSavings: number;
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zepto_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to parse saved cart", e);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("zepto_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [cartItems]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addToCart = (product: QuickProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(`Added "${product.title}" to cart ⚡`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getItemQuantity = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (sum, item) =>
      sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const totalSavings = totalOriginalPrice - totalPrice;

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        totalPrice,
        totalOriginalPrice,
        totalSavings,
        totalCount,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
