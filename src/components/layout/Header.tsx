"use client";

import { usePathname } from "next/navigation";

type HeaderProps = {
  onMobileMenuClick: () => void;
};

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Menu Utama",
  },
  "/dashboard/aset": {
    title: "Data Aset",
    subtitle: "Manajemen Aset / Data Aset",
  },
  "/dashboard/aset/katalog": {
    title: "Katalog Aset",
    subtitle: "Manajemen Aset / Katalog Aset",
  },
  "/dashboard/aset/kategori": {
    title: "Kategori Aset",
    subtitle: "Manajemen Aset / Kategori Aset",
  },
  "/dashboard/aset/ruangan": {
    title: "Ruangan",
    subtitle: "Manajemen Aset / Ruangan",
  },
  "/dashboard/aset/lokasi": {
    title: "Lokasi",
    subtitle: "Manajemen Aset / Lokasi",
  },
  "/dashboard/peminjaman": {
    title: "Pengajuan Peminjaman",
    subtitle: "Peminjaman / Pengajuan Peminjaman",
  },
  "/dashboard/riwayat-peminjaman": {
    title: "Riwayat Peminjaman",
    subtitle: "Peminjaman / Riwayat Peminjaman",
  },
  "/dashboard/pengembalian": {
    title: "Pengembalian",
    subtitle: "Menu Utama / Pengembalian",
  },
  "/dashboard/keluhan": {
    title: "Keluhan",
    subtitle: "Menu Utama / Keluhan",
  },
  "/dashboard/pemeliharaan": {
    title: "Pemeliharaan",
    subtitle: "Menu Utama / Pemeliharaan",
  },
  "/dashboard/laporan": {
    title: "Laporan",
    subtitle: "Menu Utama / Laporan",
  },
  "/dashboard/pengguna": {
    title: "Pengguna",
    subtitle: "Menu Utama / Pengguna",
  },
};

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const currentPage = pageInfo[pathname] ?? {
    title: "Dashboard",
    subtitle: "Menu Utama",
  };

  return (
    <header className="sticky top-5 z-30 mx-5 flex h-[72px] shrink-0 items-center justify-between rounded-2xl border border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuClick}
          aria-label="Buka sidebar"
          className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {currentPage.title}
          </h1>
          <p className="mt-1 truncate text-xs text-gray-500">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Pusat bantuan"
          title="Pusat bantuan"
          className="hidden rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black sm:block"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2-2.4 4"
              strokeLinecap="round"
            />
            <path d="M12 17.5h.01" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Notifikasi"
          title="Notifikasi"
          className="relative rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-5 w-5"
          >
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
              strokeLinejoin="round"
            />
            <path d="M10 21h4" strokeLinecap="round" />
          </svg>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-black ring-2 ring-white" />
        </button>

        <div className="mx-1 hidden h-8 w-px bg-gray-200 sm:block" />

        <button
          type="button"
          title="Profil pengguna"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-800 ring-1 ring-gray-200">
            R
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium text-gray-800">
              Pengguna FAMS
            </span>
            <span className="block text-xs text-gray-500">Demo</span>
          </span>

          <span className="hidden text-xs text-gray-400 sm:block">
            ⌄
          </span>
        </button>
      </div>
    </header>
  );
}