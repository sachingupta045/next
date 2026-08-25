import React from "react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  href?: string;
  accentColor?: "red" | "amber" | "emerald" | "sky" | "purple" | "indigo";
  changeText?: string;
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  href,
  accentColor = "red",
  changeText,
  isLoading = false,
}: StatCardProps) {
  const colorMap = {
    red: {
      bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
      glow: "hover:border-red-500/30 shadow-red-500/5",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
    },
    amber: {
      bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      glow: "hover:border-amber-500/30 shadow-amber-500/5",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    emerald: {
      bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      glow: "hover:border-emerald-500/30 shadow-emerald-500/5",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    sky: {
      bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      glow: "hover:border-sky-500/30 shadow-sky-500/5",
      iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    },
    purple: {
      bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      glow: "hover:border-purple-500/30 shadow-purple-500/5",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
    },
    indigo: {
      bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      glow: "hover:border-indigo-500/30 shadow-indigo-500/5",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-700",
    },
  }[accentColor];

  const content = (
    <div
      className={`relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colorMap.glow} group`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isLoading ? (
              <span className="inline-block w-12 h-7 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
            ) : (
              value
            )}
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-md ${colorMap.iconBg} group-hover:scale-105 transition-transform shrink-0`}
        >
          <i className={`fas ${icon} text-lg`} />
        </div>
      </div>

      {changeText && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{changeText}</span>
          {href && (
            <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors inline-flex items-center gap-1">
              Manage <i className="fas fa-arrow-right text-[10px]" />
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
