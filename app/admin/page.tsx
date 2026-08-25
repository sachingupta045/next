"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  productsApi,
  brandsApi,
  categoriesApi,
  countryApi,
  usersApi,
  healthApi,
  ProductResponse,
  BrandResponse,
  HealthCheckResponse,
} from "@/lib/api";
import { StatCard } from "./components/StatCard";
import { Badge } from "./components/Badge";
import { formatDate, formatAbv } from "@/lib/utils/formatters";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [brandCount, setBrandCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [countryCount, setCountryCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  const [recentProducts, setRecentProducts] = useState<ProductResponse[]>([]);
  const [recentBrands, setRecentBrands] = useState<BrandResponse[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [
          healthRes,
          productsRes,
          brandsRes,
          categoriesRes,
          countriesRes,
          usersRes,
        ] = await Promise.allSettled([
          healthApi.check(),
          productsApi.list({ limit: 100 }),
          brandsApi.list({ limit: 100 }),
          categoriesApi.list({ limit: 100 }),
          countryApi.list({ limit: 100 }),
          usersApi.list(),
        ]);

        if (healthRes.status === "fulfilled") {
          setHealth(healthRes.value);
        }

        if (productsRes.status === "fulfilled") {
          const prods = productsRes.value;
          setProductCount(prods.length);
          setRecentProducts(prods.slice(0, 5));
        }

        if (brandsRes.status === "fulfilled") {
          const brs = brandsRes.value;
          setBrandCount(brs.length);
          setRecentBrands(brs.slice(0, 5));
        }

        if (categoriesRes.status === "fulfilled") {
          setCategoryCount(categoriesRes.value.length);
        }

        if (countriesRes.status === "fulfilled") {
          setCountryCount(countriesRes.value.length);
        }

        if (usersRes.status === "fulfilled") {
          setUserCount(usersRes.value.length);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-red-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Production Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              WJunction Administration Panel
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Full backend control for products, distillery brands, drink categories,
              countries, and authentication. Real-time synchronisation with FastAPI backend.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white font-bold text-xs shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all"
            >
              <i className="fas fa-plus text-xs" />
              <span>New Product</span>
            </Link>
            <Link
              href="/admin/brands"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <i className="fas fa-award text-amber-400 text-xs" />
              <span>Manage Brands</span>
            </Link>
            <Link
              href="/admin/api-status"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700/80 transition-all"
              title="API Diagnostics"
            >
              <i className="fas fa-heartbeat text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ── Metric Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Products"
          value={productCount}
          icon="fa-wine-bottle"
          href="/admin/products"
          accentColor="red"
          changeText="Catalog entries"
          isLoading={loading}
        />
        <StatCard
          title="Brands"
          value={brandCount}
          icon="fa-award"
          href="/admin/brands"
          accentColor="amber"
          changeText="Distilleries & labels"
          isLoading={loading}
        />
        <StatCard
          title="Categories"
          value={categoryCount}
          icon="fa-tags"
          href="/admin/categories"
          accentColor="emerald"
          changeText="Spirits & sub-types"
          isLoading={loading}
        />
        <StatCard
          title="Countries"
          value={countryCount}
          icon="fa-globe-americas"
          href="/admin/countries"
          accentColor="sky"
          changeText="Origins & currencies"
          isLoading={loading}
        />
        <StatCard
          title="Users"
          value={userCount}
          icon="fa-users-cog"
          href="/admin/users"
          accentColor="purple"
          changeText="Registered accounts"
          isLoading={loading}
        />
      </div>

      {/* ── System Status & Quick Modules ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System & API Status Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <i className="fas fa-server text-emerald-400" />
              <span>Backend Service State</span>
            </h3>
            <Badge variant="success" dot>
              Connected
            </Badge>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Endpoint Root:</span>
              <span className="font-mono text-slate-200">http://127.0.0.1:8080</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Service Project:</span>
              <span className="font-semibold text-slate-200">
                {health?.project || "WJunction"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Environment:</span>
              <span className="font-mono text-amber-400">
                {health?.environment || "development"}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">Swagger OpenAPI:</span>
              <a
                href="http://127.0.0.1:8080/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1"
              >
                <span>/docs</span>
                <i className="fas fa-external-link-alt text-[10px]" />
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/api-status"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <i className="fas fa-network-wired text-sky-400" />
              <span>Run API Diagnostics &amp; Latency Test</span>
            </Link>
          </div>
        </div>

        {/* Quick Create Modules */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <i className="fas fa-bolt text-amber-400" />
              <span>Quick Actions &amp; Navigation</span>
            </h3>
            <span className="text-xs text-slate-400">Direct Entry</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/products"
              className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-red-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <i className="fas fa-wine-bottle" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                    Manage Products
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Add new drinks, set ABV, prices &amp; descriptions
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/brands"
              className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <i className="fas fa-award" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    Manage Brands
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Update distillery stories, logos &amp; origin countries
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <i className="fas fa-tags" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Drink Categories
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Configure spirits, scotch, rum, gin hierarchies
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/countries"
              className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <i className="fas fa-globe-americas" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                    Country Directory
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Manage ISO country codes, flags &amp; currencies
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recent Items Data Tables ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">Recent Products</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Latest drinks registered in catalog
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              View All ({productCount}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-800/40 rounded-lg">
                <tr>
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">ABV</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-slate-500"
                    >
                      {loading ? "Loading products..." : "No products found."}
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-200">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {p.slug}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-amber-400">
                        {formatAbv(p.abv)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={p.status ? "success" : "neutral"}
                          dot
                        >
                          {p.status ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400">
                        {formatDate(p.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Brands */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">Recent Brands</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distilleries and beverage makers
              </p>
            </div>
            <Link
              href="/admin/brands"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              View All ({brandCount}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-800/40 rounded-lg">
                <tr>
                  <th className="py-2.5 px-3">Brand</th>
                  <th className="py-2.5 px-3">Founded</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentBrands.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-slate-500"
                    >
                      {loading ? "Loading brands..." : "No brands found."}
                    </td>
                  </tr>
                ) : (
                  recentBrands.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-200">
                          {b.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {b.slug}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        {b.founded_year || "N/A"}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={b.is_active ? "success" : "neutral"}
                          dot
                        >
                          {b.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/brands?edit=${b.id}`}
                          className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                        >
                          <i className="fas fa-edit" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
