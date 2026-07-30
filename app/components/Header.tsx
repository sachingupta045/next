"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <i className="fas fa-utensils text-lg"></i>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Sar<span className="text-amber-500">ab</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Fast Food & Restaurant
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links Component */}
          <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search button */}
            <button
              id="navSearchBtn"
              title="Search"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <i className="fas fa-search text-sm"></i>
            </button>

            {/* Order Now CTA */}
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:-translate-y-0.5"
            >
              <i className="fas fa-shopping-bag text-sm"></i>
              <span>Order Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggler Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="navSearchBtnMobile"
              title="Search"
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <i className="fas fa-search text-sm"></i>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle navigation"
            >
              <i
                className={`fas ${
                  isOpen ? "fa-times" : "fa-bars"
                } text-xl text-amber-500`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <Navbar
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              onItemClick={() => setIsOpen(false)}
              isMobile={true}
            />

            <div className="pt-2 px-4 flex flex-col gap-2">
              <a
                href="#menu"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base transition-colors shadow-md"
              >
                <i className="fas fa-shopping-bag"></i>
                <span>Order Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
