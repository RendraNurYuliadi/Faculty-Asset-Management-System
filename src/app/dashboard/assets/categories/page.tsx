"use client";

import { useMemo, useState } from "react";

type Category = {
  id: number;
  nama: string;
  kode: string;
  deskripsi: string;
};

const initialCategories: Category[] = [
  {
    id: 1,
    nama: "Elektronik",
    kode: "KAT-001",
    deskripsi: "Laptop, komputer, printer, proyektor, dan perangkat elektronik lainnya.",
  },
  {
    id: 2,
    nama: "Furnitur",
    kode: "KAT-002",
    deskripsi: "Meja, kursi, lemari, dan perlengkapan ruangan.",
  },
  {
    id: 3,
    nama: "Peralatan Laboratorium",
    kode: "KAT-003",
    deskripsi: "Peralatan praktikum dan perlengkapan laboratorium.",
  },
  {
    id: 4,
    nama: "Kendaraan",
    kode: "KAT-004",
    deskripsi: "Kendaraan operasional milik institusi.",
  },
  {
    id: 5,
    nama: "Peralatan Kantor",
    kode: "KAT-005",
    deskripsi: "Peralatan administrasi dan perlengkapan kantor.",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800";

export default function KategoriAsetPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
  });

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase();

    return categories.filter(
      (category) =>
        category.nama.toLowerCase().includes(keyword) ||
        category.kode.toLowerCase().includes(keyword) ||
        category.deskripsi.toLowerCase().includes(keyword),
    );
  }, [categories, search]);

  function openAddForm() {
    setEditingId(null);
    setForm({ nama: "", deskripsi: "" });
    setShowForm(true);
  }

  function openEditForm(category: Category) {
    setEditingId(category.id);
    setForm({
      nama: category.nama,
      deskripsi: category.deskripsi,
    });
    setShowForm(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nama = form.nama.trim();
    const deskripsi = form.deskripsi.trim();

    if (!nama) return;

    const duplicate = categories.some(
      (category) =>
        category.nama.toLowerCase() === nama.toLowerCase() &&
        category.id !== editingId,
    );

    if (duplicate) {
      window.alert("Nama kategori sudah digunakan.");
      return;
    }

    if (editingId !== null) {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? { ...category, nama, deskripsi }
            : category,
        ),
      );
    } else {
      const nextId =
        categories.length > 0
          ? Math.max(...categories.map((category) => category.id)) + 1
          : 1;

      setCategories((current) => [
        ...current,
        {
          id: nextId,
          kode: `KAT-${String(nextId).padStart(3, "0")}`,
          nama,
          deskripsi,
        },
      ]);
    }

    setShowForm(false);
  }

  function handleDelete() {
    if (deleteId === null) return;

    setCategories((current) =>
      current.filter((category) => category.id !== deleteId),
    );

    setDeleteId(null);
  }

  function exportCsv() {
    const headers = ["Kode Kategori", "Nama Kategori", "Deskripsi"];

    const rows = filteredCategories.map((category) => [
      category.kode,
      category.nama,
      category.deskripsi,
    ]);

    const escapeCsv = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "kategori-aset-fams.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-5 my-5 w-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span>Manajemen Aset</span>
            <span>/</span>
            <span className="font-medium text-gray-900">
              Kategori Aset
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Kategori Aset
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Kelola pengelompokan aset agar data barang lebih terorganisir.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className={primaryButton}
        >
          <span className="text-lg leading-none">+</span>
          Tambah Kategori
        </button>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Kategori"
          value={categories.length}
          description="Kategori yang terdaftar"
          icon="▦"
        />

        <StatCard
          title="Kategori dengan Deskripsi"
          value={categories.filter((item) => item.deskripsi.trim()).length}
          description="Kategori yang memiliki keterangan"
          icon="≡"
        />

        <StatCard
          title="Hasil Pencarian"
          value={filteredCategories.length}
          description="Kategori sesuai kata kunci"
          icon="⌕"
        />
      </div>

      {/* Tabel kategori */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Daftar Kategori
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Menampilkan {filteredCategories.length} dari{" "}
              {categories.length} kategori.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCsv}
            className={secondaryButton}
          >
            <span>↓</span>
            Ekspor CSV
          </button>
        </div>

        <div className="border-b border-gray-100 p-5">
          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama, kode, atau deskripsi..."
              aria-label="Cari kategori"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4 font-semibold">Kategori</th>
                <th className="px-5 py-4 font-semibold">Kode</th>
                <th className="px-5 py-4 font-semibold">Deskripsi</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 font-semibold text-gray-700">
                        {category.nama.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-semibold text-gray-900">
                        {category.nama}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600">
                      {category.kode}
                    </span>
                  </td>

                  <td className="max-w-md px-5 py-4 leading-6 text-gray-500">
                    {category.deskripsi || "Belum ada deskripsi"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(category)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(category.id)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <p className="font-medium text-gray-900">
                      Kategori tidak ditemukan
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Coba kata kunci lain atau tambahkan kategori baru.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-3 text-sm font-medium text-gray-900 underline underline-offset-4"
                    >
                      Reset pencarian
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-5 py-4 text-xs text-gray-500">
          FAMS · Manajemen Kategori Aset
        </div>
      </section>

      {/* Form tambah / edit */}
      {showForm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-form-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2
                  id="category-form-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {editingId !== null ? "Edit Kategori" : "Tambah Kategori"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Masukkan informasi kategori aset.
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
                  htmlFor="category-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nama Kategori
                </label>

                <input
                  id="category-name"
                  required
                  maxLength={100}
                  value={form.nama}
                  onChange={(event) =>
                    setForm({ ...form, nama: event.target.value })
                  }
                  placeholder="Contoh: Elektronik"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="category-description"
                  className="text-sm font-medium text-gray-700"
                >
                  Deskripsi
                </label>

                <textarea
                  id="category-description"
                  rows={4}
                  maxLength={500}
                  value={form.deskripsi}
                  onChange={(event) =>
                    setForm({ ...form, deskripsi: event.target.value })
                  }
                  placeholder="Jelaskan jenis aset yang termasuk kategori ini..."
                  className={`${inputClass} resize-y`}
                />

                <p className="text-right text-xs text-gray-400">
                  {form.deskripsi.length}/500 karakter
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={secondaryButton}
                >
                  Batal
                </button>

                <button type="submit" className={primaryButton}>
                  {editingId !== null ? "Simpan Perubahan" : "Simpan Kategori"}
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
            aria-labelledby="delete-category-title"
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl font-semibold text-gray-800">
              !
            </div>

            <h2
              id="delete-category-title"
              className="mt-4 text-lg font-semibold text-gray-900"
            >
              Hapus kategori?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Kategori akan dihapus dari daftar sementara. Tindakan ini tidak
              bisa dibatalkan.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className={secondaryButton}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className={primaryButton}
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