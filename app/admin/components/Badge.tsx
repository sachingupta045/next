import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info" | "neutral" | "brand";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    danger:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    warning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    neutral:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    brand:
      "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  }[variant];

  const dotColors = {
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    neutral: "bg-slate-400",
    brand: "bg-red-500",
  }[variant];

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs font-semibold",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
}
