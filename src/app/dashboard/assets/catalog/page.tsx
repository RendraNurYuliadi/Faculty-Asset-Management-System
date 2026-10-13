
"use client";

import { useMemo, useState } from "react";

type Asset = {
  id: number;
  kode: string;
  nama: string;
  kategori: string;
  lokasi: string;
  ruangan: string;
  kondisi: "Baik" | "Perlu Perbaikan" | "Rusak";
  jumlah: number;
  deskripsi: string;
};

const assets: Asset[] = [
  {
    id: 1,
    kode: "AST-001",
    nama: "Laptop Lenovo ThinkPad",
    kategori: "Elektronik",
    lokasi: "Gedung A",
    ruangan: "Lab Komputer",
    kondisi: "Baik",
    jumlah: 15,
    deskripsi: "Laptop untuk kegiatan pembelajaran, praktikum, dan pekerjaan administrasi.",
  },
  {
    id: 2,
    kode: "AST-002",
    nama: "Proyektor Epson",
    kategori: "Elektronik",
    lokasi: "Gedung A",
    ruangan: "Ruang Kelas 101",
    kondisi: "Baik",
    jumlah: 5,
    deskripsi: "Perangkat proyeksi untuk presentasi materi dan kegiatan perkuliahan.",
  },
  {
    id: 3,
    kode: "AST-003",
    nama: "Meja Dosen",
    kategori: "Furnitur",
    lokasi: "Gedung B",
    ruangan: "Ruang Dosen",
    kondisi: "Perlu Perbaikan",
    jumlah: 3,
    deskripsi: "Meja kerja untuk mendukung aktivitas dosen dan staf akademik.",
  },
  {
    id: 4,
    kode: "AST-004",
    nama: "Kursi Kuliah",
    kategori: "Furnitur",
    lokasi: "Gedung B",
    ruangan: "Ruang Kelas 102",
    kondisi: "Rusak",
    jumlah: 8,
    deskripsi: "Kursi untuk menunjang kegiatan belajar mengajar di ruang kelas.",
  },
  {
    id: 5,
    kode: "AST-005",
    nama: "Printer Canon",
    kategori: "Elektronik",
    lokasi: "Gedung C",
    ruangan: "Ruang Administrasi",
    kondisi: "Baik",
    jumlah: 2,
    deskripsi: "Printer untuk mencetak dokumen administrasi dan kebutuhan akademik.",
  },
  {
    id: 6,
    kode: "AST-006",
    nama: "Komputer Desktop",
    kategori: "Elektronik",
    lokasi: "Gedung A",
    ruangan: "Lab Komputer",
    kondisi: "Baik",
    jumlah: 25,
    deskripsi: "Komputer desktop untuk praktikum pemrograman dan penggunaan aplikasi.",
  },
  {
    id: 7,
    kode: "AST-007",
    nama: "AC Ruangan",
    kategori: "Elektronik",
    lokasi: "Gedung C",
    ruangan: "Ruang Rapat",
    kondisi: "Perlu Perbaikan",
    jumlah: 2,
    deskripsi: "Pendingin ruangan untuk menjaga kenyamanan kegiatan rapat.",
  },
  {
    id: 8,
    kode: "AST-008",
    nama: "Kamera Dokumentasi",
    kategori: "Elektronik",
    lokasi: "Gedung B",
    ruangan: "Ruang Multimedia",
    kondisi: "Baik",
    jumlah: 4,
    deskripsi: "Kamera untuk dokumentasi kegiatan dan kebutuhan multimedia.",
  },
  {
    id: 9,
    kode: "AST-009",
    nama: "Mobil Operasional",
    kategori: "Kendaraan",
    lokasi: "Gedung C",
    ruangan: "Area Parkir",
    kondisi: "Baik",
    jumlah: 2,
    deskripsi: "Kendaraan operasional untuk menunjang mobilitas kegiatan institusi.",
  },
  {
    id: 10,
    kode: "AST-010",
    nama: "Lemari Arsip",
    kategori: "Furnitur",
    lokasi: "Gedung C",
    ruangan: "Ruang Administrasi",
    kondisi: "Baik",
    jumlah: 6,
    deskripsi: "Lemari penyimpanan dokumen dan arsip administrasi.",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100";

const conditionStyle: Record<Asset["kondisi"], string> = {
  Baik: "bg-gray-100 text-gray-700",
  "Perlu Perbaikan": "border border-gray-300 bg-white text-gray-700",
  Rusak: "bg-black text-white",
};

const categoryIcon: Record<string, string> = {
  Elektronik: "▣",
  Furnitur: "▤",
  Kendaraan: "▰",
  Lainnya: "◇",
};

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [condition, setCondition] = useState("Semua");
  const [location, setLocation] = useState("Semua");
  const [sort, setSort] = useState("nama-asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    const result = assets.filter((asset) => {
      const matchesSearch = [
        asset.kode,
        asset.nama,
        asset.kategori,
        asset.lokasi,
        asset.ruangan,
      ].some((value) => value.toLowerCase().includes(keyword));

      return (
        matchesSearch &&
        (category === "Semua" || asset.kategori === category) &&
        (condition === "Semua" || asset.kondisi === condition) &&
        (location === "Semua" || asset.lokasi === location)
      );
    });

    return result.sort((a, b) => {
      if (sort === "nama-asc") return a.nama.localeCompare(b.nama);
      if (sort === "nama-desc") return b.nama.localeCompare(a.nama);
      if (sort === "jumlah-desc") return b.jumlah - a.jumlah;
      if (sort === "jumlah-asc") return a.jumlah - b.jumlah;
      return a.kode.localeCompare(b.kode);
    });
  }, [search, category, condition, location, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAssets.length / Number(pageSize)),
  );

  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * Number(pageSize);
  const paginatedAssets = filteredAssets.slice(
    startIndex,
    startIndex + Number(pageSize),
  );

  const totalUnits = filteredAssets.reduce(
    (total, asset) => total + asset.jumlah,
    0,
  );

  const availableTypes = filteredAssets.filter(
    (asset) => asset.kondisi === "Baik",
  ).length;

  function resetFilters() {
    setSearch("");
    setCategory("Semua");
    setCondition("Semua");
    setLocation("Semua");
    setSort("nama-asc");
    setPage(1);
  }

  function changeFilter(callback: (value: string) => void, value: string) {
    callback(value);
    setPage(1);
  }

  return (
    <div className="mx-5 my-5 w-auto space-y-6">
      {/* Judul halaman */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-gray-900">Katalog Aset</span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600">
            <span className="h-2 w-2 rounded-full bg-black" />
            Pusat Informasi Aset
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Katalog Aset
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Temukan aset dengan mudah. Cari berdasarkan nama, kategori, lokasi,
            atau kondisi aset yang ingin kamu ketahui.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xl">
            ▦
          </span>
          <div>
            <p className="text-xs text-gray-500">Total katalog</p>
            <p className="text-lg font-bold text-gray-900">
              {assets.length} jenis aset
            </p>
          </div>
        </div>
      </section>

      {/* Ringkasan */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Jenis Aset"
          value={assets.length}
          description="Jenis aset terdaftar"
          icon="▦"
        />
        <SummaryCard
          label="Total Unit"
          value={assets.reduce((sum, asset) => sum + asset.jumlah, 0)}
          description="Jumlah seluruh barang"
          icon="▣"
        />
        <SummaryCard
          label="Kondisi Baik"
          value={assets.filter((asset) => asset.kondisi === "Baik").length}
          description="Jenis aset berkondisi baik"
          icon="✓"
        />
      </section>

      {/* Pencarian dan filter */}
      <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900">
              Temukan Aset
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Gunakan pencarian dan filter untuk mempersempit hasil.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            ↻ Reset filter
          </button>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
            ⌕
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Cari nama aset, kode, kategori, lokasi..."
            aria-label="Cari katalog aset"
            className={`${inputClass} pl-11`}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Kategori"
            value={category}
            onChange={(value) => changeFilter(setCategory, value)}
            options={["Semua", "Elektronik", "Furnitur", "Kendaraan", "Lainnya"]}
          />

          <FilterSelect
            label="Kondisi"
            value={condition}
            onChange={(value) => changeFilter(setCondition, value)}
            options={["Semua", "Baik", "Perlu Perbaikan", "Rusak"]}
          />

          <FilterSelect
            label="Lokasi"
            value={location}
            onChange={(value) => changeFilter(setLocation, value)}
            options={["Semua", "Gedung A", "Gedung B", "Gedung C"]}
          />

          <FilterSelect
            label="Urutkan berdasarkan"
            value={sort}
            onChange={(value) => changeFilter(setSort, value)}
            options={[
              "nama-asc",
              "nama-desc",
              "jumlah-desc",
              "jumlah-asc",
              "kode",
            ]}
            optionLabels={[
              "Nama A–Z",
              "Nama Z–A",
              "Jumlah terbanyak",
              "Jumlah tersedikit",
              "Kode aset",
            ]}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span>
            Menampilkan <strong className="text-gray-900">{filteredAssets.length}</strong>{" "}
            jenis aset
          </span>
          <span>
            <strong className="text-gray-900">{totalUnits}</strong> unit sesuai
            hasil filter
          </span>
        </div>
      </section>

      {/* Kartu katalog */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Jelajahi Aset</h2>
            <p className="mt-1 text-sm text-gray-500">
              Informasi aset dalam tampilan kartu.
            </p>
          </div>
          <span className="hidden rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 sm:inline-flex">
            {filteredAssets.length} hasil ditemukan
          </span>
        </div>

        {paginatedAssets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedAssets.map((asset) => (
              <article
                key={asset.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3 border-b border-gray-100 bg-gray-50/70 p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-2xl text-gray-800 shadow-sm">
                    {categoryIcon[asset.kategori] ?? "◇"}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${conditionStyle[asset.kondisi]}`}
                  >
                    {asset.kondisi}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{asset.kode}</span>
                    <span>·</span>
                    <span>{asset.kategori}</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900">
                    {asset.nama}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {asset.deskripsi}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    <InfoRow icon="⌖" label="Lokasi" value={asset.lokasi} />
                    <InfoRow icon="▤" label="Ruangan" value={asset.ruangan} />
                    <InfoRow
                      icon="▦"
                      label="Jumlah unit"
                      value={`${asset.jumlah} unit`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAsset(asset)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
                  >
                    Lihat Detail
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-500">
              ⌕
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">
              Aset tidak ditemukan
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Coba kata kunci lain atau ubah filter supaya aset yang kamu cari
              bisa ditemukan.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Tampilkan Semua Aset
            </button>
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>Baris per halaman</span>
          <select
            aria-label="Jumlah aset per halaman"
            value={pageSize}
            onChange={(event) => {
              setPageSize(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-sm text-gray-800 outline-none focus:border-black"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
          <span className="ml-1">
            Menampilkan {filteredAssets.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + Number(pageSize), filteredAssets.length)} dari{" "}
            {filteredAssets.length}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
            <span className="ml-1 hidden sm:inline">Sebelumnya</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                aria-current={currentPage === pageNumber ? "page" : undefined}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                  currentPage === pageNumber
                    ? "bg-black text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="mr-1 hidden sm:inline">Berikutnya</span>
            →
          </button>
        </div>
      </section>

      {/* Modal detail */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedAsset(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="catalog-detail-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-200 bg-gray-50 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl">
                  {categoryIcon[selectedAsset.kategori] ?? "◇"}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{selectedAsset.kode}</p>
                  <h2
                    id="catalog-detail-title"
                    className="mt-1 font-bold text-gray-900"
                  >
                    Detail Aset
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                aria-label="Tutup detail"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-gray-500 hover:bg-gray-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Nama aset
                </span>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedAsset.nama}
                </h3>
                <span className="mt-3 inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                  {selectedAsset.kategori}
                </span>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                {selectedAsset.deskripsi}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <DetailBox label="Jumlah unit" value={`${selectedAsset.jumlah} unit`} />
                <DetailBox label="Kondisi" value={selectedAsset.kondisi} />
                <DetailBox label="Lokasi" value={selectedAsset.lokasi} />
                <DetailBox label="Ruangan" value={selectedAsset.ruangan} />
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Informasi katalog</p>
                <p className="mt-1 text-sm leading-5 text-gray-700">
                  Informasi ini menggunakan data contoh lokal dan belum
                  terhubung ke database FAMS.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Tutup Detail
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-400">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-800">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-500">{description}</p>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  optionLabels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optionLabels?: string[];
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        {options.map((option, index) => (
          <option key={option} value={option}>
            {optionLabels?.[index] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}
