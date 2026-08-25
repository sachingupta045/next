"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: "fa-chart-pie",
      exact: true,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: "fa-wine-bottle",
      badge: "CRUD",
    },
    {
      label: "Brands",
      href: "/admin/brands",
      icon: "fa-award",
      badge: "CRUD",
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: "fa-tags",
      badge: "Tree",
    },
    {
      label: "Countries",
      href: "/admin/countries",
      icon: "fa-globe-americas",
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: "fa-users-cog",
    },
    {
      label: "API Diagnostics",
      href: "/admin/api-status",
      icon: "fa-network-wired",
    },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 select-none">
      {/* ── Brand Header ────────────────────────────────────── */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-3 group"
          onClick={onMobileClose}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform shrink-0">
            <i className="fas fa-shield-alt text-base" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span className="text-red-500">WJunction</span> Admin
              </span>
              <span className="text-[9px] tracking-widest uppercase font-bold text-slate-400 mt-1">
                Control Hub v1.0
              </span>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i
            className={`fas fa-chevron-${
              collapsed ? "right" : "left"
            } text-xs`}
          />
        </button>
      </div>

      {/* ── Nav Links ────────────────────────────────────────── */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {!collapsed && "Management Modules"}
        </div>

        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                active
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md shadow-red-600/25"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="w-5 text-center shrink-0">
                <i
                  className={`fas ${item.icon} text-sm ${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-red-400 transition-colors"
                  }`}
                />
              </div>

              {!collapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>{item.label}</span>
                  {item.badge && !active && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 group-hover:bg-slate-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg border border-slate-700">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {!collapsed && "Developer & Links"}
        </div>

        <a
          href="http://127.0.0.1:8080/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60 transition-all group"
          title={collapsed ? "FastAPI Swagger Docs" : undefined}
        >
          <div className="w-5 text-center shrink-0">
            <i className="fas fa-file-code text-sm text-slate-400 group-hover:text-emerald-400" />
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Swagger API Docs</span>
              <i className="fas fa-external-link-alt text-[10px] text-slate-500" />
            </div>
          )}
        </a>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-all group"
          title={collapsed ? "Public Storefront" : undefined}
        >
          <div className="w-5 text-center shrink-0">
            <i className="fas fa-store text-sm text-slate-400 group-hover:text-red-400" />
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Storefront</span>
              <i className="fas fa-arrow-right text-[10px] text-slate-500" />
            </div>
          )}
        </Link>
      </div>

      {/* ── Footer Server Status ─────────────────────────────── */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50 shrink-0">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          {!collapsed && (
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-slate-200">Backend API</p>
              <p className="text-[10px] text-slate-500 font-mono">127.0.0.1:8080</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10 animate-slide-left">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
