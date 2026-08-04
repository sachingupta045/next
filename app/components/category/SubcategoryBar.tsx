"use client";

import React from "react";
import { SubCategory } from "../../types/category";

interface SubcategoryBarProps {
  subcategories: SubCategory[];
  activeSubcategorySlug: string;
  onSelectSubcategory: (slug: string) => void;
}

export const SubcategoryBar: React.FC<SubcategoryBarProps> = ({
  subcategories,
  activeSubcategorySlug,
  onSelectSubcategory,
}) => {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 sticky top-[57px] sm:top-[61px] z-30 transition-colors">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {subcategories.map((sub) => {
          const isActive = activeSubcategorySlug === sub.slug;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubcategory(sub.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                isActive
                  ? "bg-slate-900 dark:bg-emerald-500 text-white border-slate-900 dark:border-emerald-500 shadow-sm scale-[1.02]"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                }`}
              >
                {sub.itemCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
