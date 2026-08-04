"use client";

import React from "react";
import { navs } from "../data/nav";
import { NavbarProps } from "../types";
import Link from "next/link";
import { HeaderSearchBar } from "./HeaderSearchBar";

export const Navbar: React.FC<NavbarProps> = ({
  activeNav,
  setActiveNav,
  onItemClick,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 p-1">
        <HeaderSearchBar />
        <div className="flex flex-col space-y-1">
          {navs.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveNav(link.id);
                  if (onItemClick) onItemClick();
                }}
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "text-amber-500 font-semibold bg-amber-50 dark:bg-amber-950/30"
                    : "text-slate-700 dark:text-slate-200 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return <HeaderSearchBar />;
};
