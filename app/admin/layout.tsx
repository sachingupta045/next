"use client";

import React, { useState } from "react";
import { QueryProvider } from "./components/QueryProvider";
import { ToastProvider } from "./components/ToastContext";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <QueryProvider>
      <ToastProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-row">
          {/* Sidebar */}
          <AdminSidebar
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-900/60">
            <AdminHeader
              onMobileMenuToggle={() =>
                setMobileSidebarOpen(!mobileSidebarOpen)
              }
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-[1400px] mx-auto w-full">{children}</div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </QueryProvider>
  );
}
