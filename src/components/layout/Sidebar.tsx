"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onLogoClick: () => void;
  onClose: () => void;
};

const menuGroups = [
  {
    label: "Dashboard",
    icon: "▦",
    href: "/dashboard",
    children: [],
  },
  {
    label: "Manajemen Aset",
    icon: "▣",
    children: [
      { label: "Data Aset", href: "/dashboard/aset" },
      { label: "Kategori Aset", href: "/dashboard/kategori-aset" },
      { label: "Ruangan", href: "/dashboard/ruangan" },
      { label: "Lokasi", href: "/dashboard/lokasi" },
    ],
  },
  {
    label: "Peminjaman",
    icon: "⇄",
    children: [
      { label: "Pengajuan Peminjaman", href: "/dashboard/peminjaman" },
      { label: "Riwayat Peminjaman", href: "/dashboard/riwayat-peminjaman" },
    ],
  },
  {
    label: "Pengembalian",
    icon: "↩",
    href: "/dashboard/pengembalian",
    children: [],
  },
  {
    label: "Keluhan",
    icon: "◉",
    href: "/dashboard/keluhan",
    children: [],
  },
  {
    label: "Pemeliharaan",
    icon: "⚙",
    href: "/dashboard/pemeliharaan",
    children: [],
  },
  {
    label: "Laporan",
    icon: "▤",
    href: "/dashboard/laporan",
    children: [],
  },
  {
    label: "Pengguna",
    icon: "♙",
    href: "/dashboard/pengguna",
    children: [],
  },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onLogoClick,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const activeGroup = menuGroups.find((group) =>
    group.children.some(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`),
    ),
  );
  const defaultOpenMenus = activeGroup ? [activeGroup.label] : [];
  const [openMenusByPath, setOpenMenusByPath] = useState<
    Record<string, string[]>
  >({});
  const openMenus = openMenusByPath[pathname] ?? defaultOpenMenus;

  function toggleSubmenu(label: string) {
    setOpenMenusByPath((current) => {
      const currentOpenMenus = current[pathname] ?? defaultOpenMenus;

      return {
        ...current,
        [pathname]: currentOpenMenus.includes(label)
          ? currentOpenMenus.filter((item) => item !== label)
          : [...currentOpenMenus, label],
      };
    });
  }

  function openSubmenu(label: string) {
    setOpenMenusByPath((current) => {
      const currentOpenMenus = current[pathname] ?? defaultOpenMenus;

      if (currentOpenMenus.includes(label)) return current;

      return {
        ...current,
        [pathname]: [...currentOpenMenus, label],
      };
    });
  }

  function isActive(href?: string) {
    if (!href) return false;

    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 flex flex-col
        border-r border-gray-200 bg-white
        transition-all duration-300 ease-in-out
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${collapsed ? "lg:w-[76px]" : "lg:w-64"}
        ${mobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}
      `}
    >
      {/* Logo */}
      <button
        type="button"
        onClick={onLogoClick}
        title={collapsed ? "Lebarkan sidebar" : "Ciutkan sidebar"}
        className="flex h-[72px] shrink-0 items-center gap-3 border-b border-gray-200 px-5 text-left transition hover:bg-gray-50"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black font-bold text-white">
          F
        </span>

        <span className={collapsed ? "lg:hidden" : ""}>
          <span className="block font-bold tracking-wide text-gray-900">
            FAMS
          </span>
          <span className="block text-xs text-gray-500">
            Asset Management
          </span>
        </span>
      </button>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p
          className={`mb-3 px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-gray-400 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          Menu Utama
        </p>

        {menuGroups.map((group) => {
          const hasChildren = group.children.length > 0;

          const active =
            isActive("href" in group ? group.href : undefined) ||
            group.children.some((child) => isActive(child.href));

          const submenuOpen = openMenus.includes(group.label);

          // Menu aktif: background hitam, teks putih.
          const itemClass = `
            flex w-full items-center gap-3 rounded-xl px-3 py-3
            text-sm transition-colors duration-200
            ${
              active
                ? "bg-black font-semibold text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }
          `;

          return (
            <div key={group.label}>
              {hasChildren ? (
                <button
                  type="button"
                  title={collapsed ? group.label : undefined}
                  aria-expanded={submenuOpen}
                  onClick={() => {
                    if (collapsed) {
                      onLogoClick();
                      openSubmenu(group.label);
                      return;
                    }

                    toggleSubmenu(group.label);
                  }}
                  className={itemClass}
                >
                  <span className="flex w-7 shrink-0 justify-center text-lg">
                    {group.icon}
                  </span>

                  <span className={collapsed ? "lg:hidden" : ""}>
                    {group.label}
                  </span>

                  <span
                    className={`ml-auto text-xs transition-transform ${
                      submenuOpen ? "rotate-180" : ""
                    } ${collapsed ? "lg:hidden" : ""}`}
                  >
                    ⌄
                  </span>
                </button>
              ) : "href" in group && group.href ? (
                <Link
                  href={group.href}
                  title={collapsed ? group.label : undefined}
                  onClick={onClose}
                  className={itemClass}
                >
                  <span className="flex w-7 shrink-0 justify-center text-lg">
                    {group.icon}
                  </span>

                  <span className={collapsed ? "lg:hidden" : ""}>
                    {group.label}
                  </span>
                </Link>
              ) : null}

              {/* Submenu */}
              {hasChildren && submenuOpen && (
                <div
                  className={`mt-1 space-y-1 ${
                    collapsed ? "lg:hidden" : ""
                  }`}
                >
                  {group.children.map((child) => {
                    const childActive = isActive(child.href);

                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className={`
                          ml-5 block rounded-xl px-3 py-2.5
                          text-sm transition-colors duration-200
                          ${
                            childActive
                              ? "bg-black font-medium text-white"
                              : "text-gray-500 hover:bg-gray-100 hover:text-black"
                          }
                        `}
                      >
                        <span
                          className={`mr-2 ${
                            childActive ? "text-white" : "text-gray-400"
                          }`}
                        >
                          └
                        </span>
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profil pengguna */}
      <div className="shrink-0 border-t border-gray-200 p-3">
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700">
            R
          </div>

          <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
            <p className="truncate text-sm font-medium text-gray-800">
              Pengguna FAMS
            </p>
            <p className="text-xs text-gray-500">Akun Demo</p>
          </div>
        </div>
      </div>
    </aside>
  );
}