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
    <div className="bg-surface/85 backdrop-blur-md border-b border-white/5 px-4 py-2.5 sticky top-[57px] sm:top-[61px] z-30 transition-colors">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {subcategories.map((sub) => {
          const isActive = activeSubcategorySlug === sub.slug;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubcategory(sub.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border focus-visible:ring-2 focus-visible:ring-amber ${
                isActive
                  ? "bg-amber text-base border-amber shadow-sm scale-[1.02]"
                  : "bg-base/60 text-muted border-white/5 hover:border-amber/30 hover:text-cream"
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-base/20 text-base"
                    : "bg-white/5 text-muted"
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
