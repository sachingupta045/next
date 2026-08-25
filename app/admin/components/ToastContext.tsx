"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const bgColors = {
          success: "bg-emerald-950/90 border-emerald-500/40 text-emerald-100",
          error: "bg-rose-950/90 border-rose-500/40 text-rose-100",
          warning: "bg-amber-950/90 border-amber-500/40 text-amber-100",
          info: "bg-slate-900/95 border-slate-700 text-slate-100",
        }[toast.type];

        const icons = {
          success: "fa-check-circle text-emerald-400",
          error: "fa-exclamation-circle text-rose-400",
          warning: "fa-triangle-exclamation text-amber-400",
          info: "fa-info-circle text-sky-400",
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl shadow-black/40 transition-all duration-300 animate-slide-left ${bgColors}`}
          >
            <i className={`fas ${icons} text-lg mt-0.5 shrink-0`} />
            <div className="flex-1 text-sm">
              {toast.title && (
                <h5 className="font-semibold text-white mb-0.5">
                  {toast.title}
                </h5>
              )}
              <p className="leading-snug text-xs sm:text-sm opacity-90 break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-white transition-colors ml-1 -mt-1 p-1"
              aria-label="Close notification"
            >
              <i className="fas fa-times text-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
