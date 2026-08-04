"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navs } from "../data/nav";
import { HeaderSearchBar } from "./HeaderSearchBar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for shadow enhancement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Determine active nav item from current path
  const getActiveId = (href: string, id: string) => {
    if (id === "hero" && pathname === "/") return true;
    if (id === "drinkit" && (pathname === "/drinkit" || pathname.startsWith("/drink/"))) return true;
    if (id === "compare" && pathname === "/compare") return true;
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const isDrinkitPage =
    pathname === "/drinkit" ||
    pathname.startsWith("/drink/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/category/") ||
    pathname === "/compare";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-md shadow-black/[0.06]"
        : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm"
        } border-b border-slate-100 dark:border-slate-800`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-[68px] gap-4">

          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <i className="fas fa-glass-whiskey text-sm" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                <span className="text-red-600">Whiskey</span>Junction
              </div>
              <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                Whiskies &amp; Spirits
              </span>
            </div>
          </Link>

          {/* ── Search Bar ─────────────────────────────────────────────── */}
          <HeaderSearchBar />

          {/* ── Desktop Actions ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/compare"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${pathname === "/compare"
                ? "bg-[#e8281a] border-[#e8281a] text-white shadow-md shadow-red-600/20"
                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#e8281a] hover:text-[#e8281a]"
                }`}
            >
              <i className="fas fa-balance-scale text-xs" />
              <span>Compare</span>
            </Link>
            <Link
              href="/drinkit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all"
            >
              <span>🍷</span>
              <span>Explore</span>
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className={`block w-5 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}>
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 mb-1 ${isOpen ? "opacity-0 translate-x-1" : ""}`} />
              <span className="block h-0.5 w-full bg-current rounded-full mb-1" />
              <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isOpen ? "-rotate-90 -translate-y-2" : ""}`} />
            </span>
          </button>
        </div>

        {/* ── Mobile Drawer ────────────────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] pb-5" : "max-h-0"
            }`}
        >
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-0.5">
            {navs.map((link) => {
              const isActive = getActiveId(link.href, link.id);
              const isDrinkitLink = link.id === "drinkit" || link.id === "compare";

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? isDrinkitLink
                      ? "text-[#e8281a] dark:text-red-400 bg-red-50 dark:bg-red-950/30 font-bold"
                      : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 font-bold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                >
                  <i className={`fas ${link.icon} text-sm w-4 text-center ${isActive ? (isDrinkitLink ? "text-[#e8281a]" : "text-amber-500") : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <div className="pt-3 px-1 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link href="/compare" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md">
                <i className="fas fa-balance-scale text-sm" />
                Compare Drinks
              </Link>
              <Link href="/drinkit" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm">
                🍷 Explore Drinks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
