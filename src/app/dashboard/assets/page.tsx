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
};

const initialAssets: Asset[] = [
  {
    id: 1,
    kode: "AST-001",
    nama: "Laptop Lenovo ThinkPad",
    kategori: "Elektronik",
    lokasi: "Gedung A",
    ruangan: "Lab Komputer",
    kondisi: "Baik",
    jumlah: 15,
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
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black";

const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50";

const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800";

export default function AsetPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [conditionFilter, setConditionFilter] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama: "",
    kategori: "Elektronik",
    lokasi: "",
    ruangan: "",
    kondisi: "Baik" as Asset["kondisi"],
    jumlah: "1",
  });

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        asset.kode.toLowerCase().includes(keyword) ||
        asset.nama.toLowerCase().includes(keyword) ||
        asset.kategori.toLowerCase().includes(keyword) ||
        asset.lokasi.toLowerCase().includes(keyword) ||
        asset.ruangan.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "Semua" ||
        asset.kategori === categoryFilter;

      const matchesCondition =
        conditionFilter === "Semua" ||
        asset.kondisi === conditionFilter;

      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [assets, search, categoryFilter, conditionFilter]);

  const totalUnits = assets.reduce((total, asset) => total + asset.jumlah, 0);
  const goodAssets = assets.filter((asset) => asset.kondisi === "Baik").length;
  const repairAssets = assets.filter(
    (asset) => asset.kondisi === "Perlu Perbaikan",
  ).length;
  const damagedAssets = assets.filter(
    (asset) => asset.kondisi === "Rusak",
  ).length;

  function openAddForm() {
    setEditingId(null);
    setForm({
      nama: "",
      kategori: "Elektronik",
      lokasi: "",
      ruangan: "",
      kondisi: "Baik",
      jumlah: "1",
    });
    setShowForm(true);
  }

  function openEditForm(asset: Asset) {
    setEditingId(asset.id);
    setForm({
      nama: asset.nama,
      kategori: asset.kategori,
      lokasi: asset.lokasi,
      ruangan: asset.ruangan,
      kondisi: asset.kondisi,
      jumlah: String(asset.jumlah),
    });
    setShowForm(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.nama.trim() ||
      !form.lokasi.trim() ||
      !form.ruangan.trim() ||
      Number(form.jumlah) < 1
    ) {
      return;
    }

    if (editingId !== null) {
      setAssets((current) =>
        current.map((asset) =>
          asset.id === editingId
            ? {
                ...asset,
                nama: form.nama.trim(),
                kategori: form.kategori,
                lokasi: form.lokasi.trim(),
                ruangan: form.ruangan.trim(),
                kondisi: form.kondisi,
                jumlah: Number(form.jumlah),
              }
            : asset,
        ),
      );
    } else {
      const nextId =
        assets.length > 0
          ? Math.max(...assets.map((asset) => asset.id)) + 1
          : 1;

      setAssets((current) => [
        ...current,
        {
          id: nextId,
          kode: `AST-${String(nextId).padStart(3, "0")}`,
          nama: form.nama.trim(),
          kategori: form.kategori,
          lokasi: form.lokasi.trim(),
          ruangan: form.ruangan.trim(),
          kondisi: form.kondisi,
          jumlah: Number(form.jumlah),
        },
      ]);
    }

    setShowForm(false);
  }

  function handleDelete() {
    if (deleteId === null) return;

    setAssets((current) => current.filter((asset) => asset.id !== deleteId));
    setDeleteId(null);
  }

  function exportCsv() {
    const headers = [
      "Kode Aset",
      "Nama Aset",
      "Kategori",
      "Lokasi",
      "Ruangan",
      "Kondisi",
      "Jumlah",
    ];

    const rows = filteredAssets.map((asset) => [
      asset.kode,
      asset.nama,
      asset.kategori,
      asset.lokasi,
      asset.ruangan,
      asset.kondisi,
      asset.jumlah,
    ]);

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "data-aset-fams.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function conditionStyle(condition: Asset["kondisi"]) {
    if (condition === "Baik") {
      return "bg-gray-100 text-gray-700";
    }

    if (condition === "Perlu Perbaikan") {
      return "border border-gray-300 bg-white text-gray-700";
    }

    return "bg-black text-white";
  }

  return (
   <div className="mx-5 my-5 w-auto space-y-6">
      {/* Header halaman */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span>Manajemen Aset</span>
            <span>/</span>
            <span className="font-medium text-gray-900">Data Aset</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Data Aset
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Kelola dan pantau seluruh aset yang dimiliki institusi.
          </p>
        </div>

        <button type="button" onClick={openAddForm} className={buttonPrimary}>
          <span className="text-lg leading-none">+</span>
          Tambah Aset
        </button>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Jenis Aset"
          value={assets.length}
          description="Total data aset terdaftar"
          icon="▦"
        />

        <StatCard
          title="Total Unit"
          value={totalUnits}
          description="Jumlah seluruh barang"
          icon="▣"
        />

        <StatCard
          title="Kondisi Baik"
          value={goodAssets}
          description="Jenis aset dalam kondisi baik"
          icon="✓"
        />

        <StatCard
          title="Perlu Perhatian"
          value={repairAssets + damagedAssets}
          description={`${repairAssets} perlu perbaikan · ${damagedAssets} rusak`}
          icon="!"
        />
      </div>

      {/* Tabel aset */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Daftar Aset
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Menampilkan {filteredAssets.length} dari {assets.length} jenis
              aset.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className={buttonSecondary}
          >
            <span>↓</span>
            Ekspor CSV
          </button>
        </div>

        {/* Pencarian dan filter */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_190px_190px]">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari kode, nama, lokasi..."
              aria-label="Cari aset"
              className={`${inputClass} pl-10`}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter kategori"
            className={inputClass}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Furnitur">Furnitur</option>
            <option value="Kendaraan">Kendaraan</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <select
            value={conditionFilter}
            onChange={(event) => setConditionFilter(event.target.value)}
            aria-label="Filter kondisi"
            className={inputClass}
          >
            <option value="Semua">Semua Kondisi</option>
            <option value="Baik">Baik</option>
            <option value="Perlu Perbaikan">Perlu Perbaikan</option>
            <option value="Rusak">Rusak</option>
          </select>
        </div>

        {/* Isi tabel */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">Aset</th>
                <th className="px-5 py-4 font-semibold">Kategori</th>
                <th className="px-5 py-4 font-semibold">Lokasi / Ruangan</th>
                <th className="px-5 py-4 font-semibold">Kondisi</th>
                <th className="px-5 py-4 text-center font-semibold">Jumlah</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-700">
                        {asset.nama.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          {asset.nama}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {asset.kode}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600">
                      {asset.kategori}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800">{asset.lokasi}</p>
                    <p className="mt-1 text-xs text-gray-500">{asset.ruangan}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${conditionStyle(
                        asset.kondisi,
                      )}`}
                    >
                      {asset.kondisi}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-gray-900">
                    {asset.jumlah}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(asset)}
                        aria-label={`Edit ${asset.nama}`}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(asset.id)}
                        aria-label={`Hapus ${asset.nama}`}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl text-gray-500">
                      ⌕
                    </div>
                    <p className="mt-3 font-medium text-gray-900">
                      Data tidak ditemukan
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Coba ubah kata kunci atau filter pencarian.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCategoryFilter("Semua");
                        setConditionFilter("Semua");
                      }}
                      className="mt-3 text-sm font-medium text-gray-900 underline underline-offset-4"
                    >
                      Reset filter
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Total {filteredAssets.length} jenis aset ·{" "}
            {filteredAssets.reduce((total, asset) => total + asset.jumlah, 0)}{" "}
            unit pada hasil filter
          </span>
          <span>FAMS · Manajemen Aset</span>
        </div>
      </section>

      {/* Form tambah dan edit */}
      {showForm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="asset-form-title"
            className="my-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2
                  id="asset-form-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {editingId !== null ? "Edit Aset" : "Tambah Aset"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Lengkapi informasi aset di bawah ini.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Tutup formulir"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="asset-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nama Aset
                </label>
                <input
                  id="asset-name"
                  required
                  maxLength={150}
                  value={form.nama}
                  onChange={(event) =>
                    setForm({ ...form, nama: event.target.value })
                  }
                  placeholder="Contoh: Laptop Lenovo"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="asset-category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Kategori
                  </label>
                  <select
                    id="asset-category"
                    value={form.kategori}
                    onChange={(event) =>
                      setForm({ ...form, kategori: event.target.value })
                    }
                    className={inputClass}
                  >
                    <option>Elektronik</option>
                    <option>Furnitur</option>
                    <option>Kendaraan</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="asset-quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Jumlah Unit
                  </label>
                  <input
                    id="asset-quantity"
                    type="number"
                    required
                    min="1"
                    step="1"
                    value={form.jumlah}
                    onChange={(event) =>
                      setForm({ ...form, jumlah: event.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="asset-location"
                    className="text-sm font-medium text-gray-700"
                  >
                    Lokasi
                  </label>
                  <input
                    id="asset-location"
                    required
                    maxLength={100}
                    value={form.lokasi}
                    onChange={(event) =>
                      setForm({ ...form, lokasi: event.target.value })
                    }
                    placeholder="Contoh: Gedung A"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="asset-room"
                    className="text-sm font-medium text-gray-700"
                  >
                    Ruangan
                  </label>
                  <input
                    id="asset-room"
                    required
                    maxLength={100}
                    value={form.ruangan}
                    onChange={(event) =>
                      setForm({ ...form, ruangan: event.target.value })
                    }
                    placeholder="Contoh: Lab Komputer"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="asset-condition"
                  className="text-sm font-medium text-gray-700"
                >
                  Kondisi Aset
                </label>
                <select
                  id="asset-condition"
                  value={form.kondisi}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      kondisi: event.target.value as Asset["kondisi"],
                    })
                  }
                  className={inputClass}
                >
                  <option value="Baik">Baik</option>
                  <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                  <option value="Rusak">Rusak</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={buttonSecondary}
                >
                  Batal
                </button>

                <button type="submit" className={buttonPrimary}>
                  {editingId !== null ? "Simpan Perubahan" : "Simpan Aset"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {/* Konfirmasi hapus */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl text-gray-800">
              !
            </div>

            <h2
              id="delete-title"
              className="mt-4 text-lg font-semibold text-gray-900"
            >
              Hapus aset?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Data aset akan dihapus dari daftar sementara ini. Tindakan ini
              tidak bisa dibatalkan.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className={buttonSecondary}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className={buttonPrimary}
              >
                Ya, Hapus
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-800">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">{description}</p>
    </div>
  );
}