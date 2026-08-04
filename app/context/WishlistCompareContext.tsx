"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DrinkProduct } from "../types/drinkit";

interface WishlistCompareContextType {
  wishlistItems: DrinkProduct[];
  toggleWishlist: (drink: DrinkProduct) => void;
  isInWishlist: (drinkId: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  compareItems: DrinkProduct[];
  toggleCompare: (drink: DrinkProduct) => void;
  isInCompare: (drinkId: string) => boolean;
  clearCompare: () => void;

  // tray (slide-up bottom panel)
  isCompareTrayOpen: boolean;
  setIsCompareTrayOpen: (open: boolean) => void;

  // legacy modal (still kept for backward compat)
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  toastMessage: string | null;
}

const WishlistCompareContext = createContext<WishlistCompareContextType | undefined>(undefined);

export const WishlistCompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<DrinkProduct[]>([]);
  const [compareItems, setCompareItems] = useState<DrinkProduct[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCompareTrayOpen, setIsCompareTrayOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("drinkit_wishlist");
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
      const savedCompare = localStorage.getItem("drinkit_compare");
      if (savedCompare) setCompareItems(JSON.parse(savedCompare));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("drinkit_wishlist", JSON.stringify(wishlistItems)); } catch {}
  }, [wishlistItems]);

  useEffect(() => {
    try { localStorage.setItem("drinkit_compare", JSON.stringify(compareItems)); } catch {}
  }, [compareItems]);

  // Auto-open tray whenever something is added to compare
  useEffect(() => {
    if (compareItems.length > 0) setIsCompareTrayOpen(true);
  }, [compareItems]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  const isInWishlist = (drinkId: string) => wishlistItems.some(i => i.id === drinkId);
  const toggleWishlist = (drink: DrinkProduct) => {
    if (isInWishlist(drink.id)) {
      setWishlistItems(prev => prev.filter(i => i.id !== drink.id));
      triggerToast(`Removed "${drink.title}" from Wishlist`);
    } else {
      setWishlistItems(prev => [...prev, drink]);
      triggerToast(`Saved "${drink.title}" to Wishlist ❤️`);
    }
  };
  const clearWishlist = () => setWishlistItems([]);

  const isInCompare = (drinkId: string) => compareItems.some(i => i.id === drinkId);
  const toggleCompare = (drink: DrinkProduct) => {
    if (isInCompare(drink.id)) {
      setCompareItems(prev => prev.filter(i => i.id !== drink.id));
      triggerToast(`Removed from Compare`);
    } else {
      if (compareItems.length >= 4) {
        triggerToast("⚠️ Max 4 drinks can be compared!");
        return;
      }
      setCompareItems(prev => [...prev, drink]);
      triggerToast(`Added to Compare ⚖️`);
    }
  };
  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareTrayOpen(false);
  };

  return (
    <WishlistCompareContext.Provider value={{
      wishlistItems, toggleWishlist, isInWishlist, clearWishlist,
      isWishlistOpen, setIsWishlistOpen,
      compareItems, toggleCompare, isInCompare, clearCompare,
      isCompareTrayOpen, setIsCompareTrayOpen,
      isCompareModalOpen, setIsCompareModalOpen,
      toastMessage,
    }}>
      {children}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-56 left-1/2 -translate-x-1/2 z-[100] bg-slate-950 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 border border-slate-700 pointer-events-none">
          <span>{toastMessage}</span>
        </div>
      )}
    </WishlistCompareContext.Provider>
  );
};

export const useWishlistCompare = () => {
  const ctx = useContext(WishlistCompareContext);
  if (!ctx) throw new Error("useWishlistCompare must be used within a WishlistCompareProvider");
  return ctx;
};
