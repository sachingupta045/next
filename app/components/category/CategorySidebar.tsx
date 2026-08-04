"use client";

import React from "react";
import Link from "next/link";
import { Category } from "../../types/category";

interface CategorySidebarProps {
  categories: Category[];
  activeCategorySlug: string;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategorySlug,
}) => {
  return (
    <aside className="w-full md:w-56 lg:w-64 shrink-0 bg-white dark:bg-slate-900 md:border-r border-slate-200 dark:border-slate-800 md:sticky md:top-[61px] md:h-[calc(100vh-61px)] overflow-y-auto custom-scrollbar transition-colors">
      <div className="p-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-3 hidden md:block">
          Categories
        </h3>

        {/* Categories List */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible no-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategorySlug === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all shrink-0 md:shrink border text-left ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border-emerald-500/30 shadow-sm"
                    : "border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg overflow-hidden shrink-0 transition-transform ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm truncate leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-normal">
                    {cat.itemCount} items
                  </p>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden md:block shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
