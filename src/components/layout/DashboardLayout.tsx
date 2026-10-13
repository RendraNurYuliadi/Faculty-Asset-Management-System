"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <div className="flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onLogoClick={() => {
            if (window.innerWidth >= 1024) {
              setCollapsed((current) => !current);
            } else {
              setMobileOpen((current) => !current);
            }
          }}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMobileMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-xs text-gray-400 sm:px-6">
            FAMS · Noventra · Informatika 5A
          </footer>
        </div>
      </div>
    </div>
  );
}