"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navs } from "../data/nav";

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
    if (href.startsWith("/#")) return false; // hash links on home page are never "active" from other pages
    return pathname === href;
  };

  const isDrinkitPage =
    pathname === "/drinkit" ||
    pathname.startsWith("/drink/") ||
    pathname.startsWith("/brand/") ||
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <i className="fas fa-utensils text-sm" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Sar<span className="text-amber-500">ab</span>
              </div>
              <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                Food &amp; Drinks
              </span>
            </div>
            {/* Drinkit pill — shown when inside drinkit pages */}
            {isDrinkitPage && (
              <span className="ml-1 hidden sm:inline-flex items-center gap-1 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-[#e8281a] dark:text-red-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wide">
                🍷 Drinkit
              </span>
            )}
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navs.map((link) => {
              const isActive = getActiveId(link.href, link.id);
              const isDrinkitLink = link.id === "drinkit" || link.id === "compare";

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                      ? isDrinkitLink
                        ? "text-[#e8281a] dark:text-red-400 bg-red-50 dark:bg-red-950/30 font-bold"
                        : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                >
                  {link.name}
                  {/* Active dot indicator */}
                  {isActive && (
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDrinkitLink ? "bg-[#e8281a]" : "bg-amber-500"}`} />
                  )}
                  {/* Drinkit badge */}
                  {link.id === "drinkit" && (
                    <span className="ml-1 inline-flex text-[8px] font-black uppercase bg-red-100 dark:bg-red-950/40 text-[#e8281a] dark:text-red-400 px-1 py-0.5 rounded-full align-middle">🍷</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Actions ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {isDrinkitPage ? (
              /* Drinkit context actions */
              <div className="flex items-center gap-2">
                <Link
                  href="/compare"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${pathname === "/compare"
                      ? "bg-[#e8281a] border-[#e8281a] text-white shadow-md shadow-red-600/20"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#e8281a] hover:text-[#e8281a]"
                    }`}
                >
                  <i className="fas fa-balance-scale text-xs" />
                  Compare
                </Link>
                <Link
                  href="/drinkit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all"
                >
                  <span>🍷</span>
                  <span>Explore Drinks</span>
                </Link>
              </div>
            ) : (
              /* Restaurant context actions */
              <div className="flex items-center gap-2">
                <button
                  title="Search"
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <i className="fas fa-search text-xs" />
                </button>
                <Link
                  href="/#menu"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:-translate-y-0.5"
                >
                  <i className="fas fa-shopping-bag text-xs" />
                  <span>Order Now</span>
                </Link>
              </div>
            )}
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
                  {link.id === "drinkit" && <span className="ml-auto text-[9px] font-black bg-red-100 dark:bg-red-950/40 text-[#e8281a] dark:text-red-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">New</span>}
                  {link.id === "compare" && <span className="ml-auto text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Beta</span>}
                </Link>
              );
            })}

            {/* Mobile CTA */}
            <div className="pt-3 px-1 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {isDrinkitPage ? (
                <>
                  <Link href="/compare" onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#e8281a] text-[#e8281a] font-bold text-sm hover:bg-red-50 transition-colors">
                    <i className="fas fa-balance-scale text-sm" />
                    Compare Drinks
                  </Link>
                  <Link href="/drinkit" onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-md">
                    🍷 Explore Drinkit
                  </Link>
                </>
              ) : (
                <Link href="/#menu" onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md">
                  <i className="fas fa-shopping-bag" />
                  Order Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
