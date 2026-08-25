"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { healthApi } from "@/lib/api/health";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      const start = performance.now();
      try {
        const res = await healthApi.check();
        const duration = Math.round(performance.now() - start);
        if (isMounted) {
          setIsOnline(res.status === "online" || !!res.project);
          setLatency(duration);
        }
      } catch {
        if (isMounted) {
          setIsOnline(false);
          setLatency(null);
        }
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Compute breadcrumbs
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const url = "/" + pathParts.slice(0, index + 1).join("/");
    const label =
      part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
    return { url, label };
  });

  return (
    <header className="h-16 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* ── Left: Mobile Toggle & Breadcrumbs ────────── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open sidebar"
        >
          <i className="fas fa-bars text-sm" />
        </button>

        <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-2 text-xs">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.url}>
                {idx > 0 && (
                  <i className="fas fa-chevron-right text-[9px] text-slate-400" />
                )}
                {isLast ? (
                  <span className="font-bold text-slate-900 dark:text-white">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.url}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* ── Right: Status & Quick Actions ───────────── */}
      <div className="flex items-center gap-3">
        {/* Backend Status Pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
            isOnline === true
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : isOnline === false
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              : "bg-slate-500/10 text-slate-500 border-slate-500/20"
          }`}
          title="Backend FastAPI Health Status"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline === true
                ? "bg-emerald-500 animate-pulse"
                : isOnline === false
                ? "bg-rose-500"
                : "bg-slate-400"
            }`}
          />
          <span className="hidden md:inline">
            {isOnline === true
              ? `API Online ${latency ? `(${latency}ms)` : ""}`
              : isOnline === false
              ? "API Offline"
              : "Checking API..."}
          </span>
        </div>

        {/* Quick Add Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setAddMenuOpen(!addMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white text-xs font-bold shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all"
          >
            <i className="fas fa-plus text-xs" />
            <span className="hidden sm:inline">Create</span>
            <i className="fas fa-chevron-down text-[10px] opacity-80" />
          </button>

          {addMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setAddMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-fade-in-up">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Create
                </div>
                <Link
                  href="/admin/products?action=new"
                  onClick={() => setAddMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-wine-bottle text-red-500 w-4" />
                  <span>New Product</span>
                </Link>
                <Link
                  href="/admin/brands?action=new"
                  onClick={() => setAddMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-award text-amber-500 w-4" />
                  <span>New Brand</span>
                </Link>
                <Link
                  href="/admin/categories?action=new"
                  onClick={() => setAddMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-tags text-emerald-500 w-4" />
                  <span>New Category</span>
                </Link>
                <Link
                  href="/admin/countries?action=new"
                  onClick={() => setAddMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-globe-americas text-sky-500 w-4" />
                  <span>New Country</span>
                </Link>
                <Link
                  href="/admin/users?action=new"
                  onClick={() => setAddMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-user-plus text-purple-500 w-4" />
                  <span>New User</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
