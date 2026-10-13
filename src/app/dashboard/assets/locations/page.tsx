"use client";

import { useMemo, useState } from "react";

type Location = {
  id: number;
  kode: string;
  nama: string;
  gedung: string;
  lantai: string;
  deskripsi: string;
};

const initialLocations: Location[] = [
  {
    id: 1,
    kode: "LOK-001",
    nama: "Lab Komputer",
    gedung: "Gedung A",
    lantai: "Lantai 1",
    deskripsi: "Laboratorium komputer mahasiswa",
  },
  {
    id: 2,
    kode: "LOK-002",
    nama: "Ruang Dosen",
    gedung: "Gedung B",
    lantai: "Lantai 2",
    deskripsi: "Ruang kerja dosen",
  },
  {
    id: 3,
    kode: "LOK-003",
    nama: "Ruang Administrasi",
    gedung: "Gedung C",
    lantai: "Lantai 1",
    deskripsi: "Ruang administrasi fakultas",
  },
  {
    id: 4,
    kode: "LOK-004",
    nama: "Ruang Kelas 101",
    gedung: "Gedung A",
    lantai: "Lantai 1",
    deskripsi: "Ruang pembelajaran",
  },
];

const emptyForm = {
  nama: "",
  gedung: "",
  lantai: "",
  deskripsi: "",
};

export default function LokasiPage() {
  const [locations, setLocations] = useState(initialLocations);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredLocations = useMemo(() => {
    const keyword = search.toLowerCase();

    return locations.filter((location) =>
      [
        location.kode,
        location.nama,
        location.gedung,
        location.lantai,
        location.deskripsi,
      ].some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [locations, search]);

  function openAddModal() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(location: Location) {
    setEditing(location);
    setForm({
      nama: location.nama,
      gedung: location.gedung,
      lantai: location.lantai,
      deskripsi: location.deskripsi,
    });
    setModalOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const duplicate = locations.some(
      (location) =>
        location.nama.toLowerCase() === form.nama.trim().toLowerCase() &&
        location.id !== editing?.id,
    );

    if (duplicate) {
      alert("Nama lokasi sudah digunakan.");
      return;
    }

    if (editing) {
      setLocations((current) =>
        current.map((location) =>
          location.id === editing.id
            ? { ...location, ...form, nama: form.nama.trim() }
            : location,
        ),
      );
    } else {
      const nextNumber =
        Math.max(0, ...locations.map((location) => location.id)) + 1;

      setLocations((current) => [
        ...current,
        {
          id: nextNumber,
          kode: `LOK-${String(nextNumber).padStart(3, "0")}`,
          ...form,
          nama: form.nama.trim(),
        },
      ]);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditing(null);
  }

  function handleDelete() {
    if (deleteId === null) return;

    setLocations((current) =>
      current.filter((location) => location.id !== deleteId),
    );
    setDeleteId(null);
  }

  function exportCSV() {
    const headers = [
      "Kode Lokasi",
      "Nama Lokasi",
      "Gedung",
      "Lantai",
      "Deskripsi",
    ];

    const rows = filteredLocations.map((location) => [
      location.kode,
      location.nama,
      location.gedung,
      location.lantai,
      location.deskripsi,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data-lokasi.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-5 my-5 w-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span>Manajemen Aset</span>
            <span>/</span>
            <span className="font-medium text-black">Lokasi</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-black">
            Data Lokasi
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola lokasi penyimpanan dan penempatan aset fakultas.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <span className="text-lg">+</span>
          Tambah Lokasi
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Lokasi</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xl">
              ⌖
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-black">
            {locations.length}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Lokasi terdaftar dalam sistem
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Gedung</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-xl">
              ▦
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-black">
            {new Set(locations.map((location) => location.gedung)).size}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Gedung yang memiliki lokasi terdaftar
          </p>
        </div>
      </div>

      {/* Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-black">Daftar Lokasi</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredLocations.length} lokasi ditemukan
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                ⌕
              </span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari lokasi..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-black sm:w-64"
              />
            </div>

            <button
              onClick={exportCSV}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              ↓ Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Kode</th>
                <th className="px-5 py-4 font-semibold">Nama Lokasi</th>
                <th className="px-5 py-4 font-semibold">Gedung</th>
                <th className="px-5 py-4 font-semibold">Lantai</th>
                <th className="px-5 py-4 font-semibold">Deskripsi</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLocations.map((location) => (
                <tr key={location.id} className="transition hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-700">
                    {location.kode}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-black">
                    {location.nama}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {location.gedung}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {location.lantai}
                  </td>
                  <td className="max-w-xs px-5 py-4 text-gray-500">
                    <p className="truncate">{location.deskripsi || "-"}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(location)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(location.id)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-black hover:bg-black hover:text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLocations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="font-medium text-gray-700">
                      Lokasi tidak ditemukan
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Coba gunakan kata kunci lain.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-black">
                  {editing ? "Edit Lokasi" : "Tambah Lokasi"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Isi informasi lokasi di bawah ini.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg px-2 py-1 text-xl text-gray-500 hover:bg-gray-100 hover:text-black"
                aria-label="Tutup modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Lokasi *
                </label>
                <input
                  required
                  value={form.nama}
                  onChange={(event) =>
                    setForm({ ...form, nama: event.target.value })
                  }
                  placeholder="Contoh: Lab Komputer"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Gedung *
                  </label>
                  <input
                    required
                    value={form.gedung}
                    onChange={(event) =>
                      setForm({ ...form, gedung: event.target.value })
                    }
                    placeholder="Contoh: Gedung A"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Lantai *
                  </label>
                  <input
                    required
                    value={form.lantai}
                    onChange={(event) =>
                      setForm({ ...form, lantai: event.target.value })
                    }
                    placeholder="Contoh: Lantai 1"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  rows={3}
                  value={form.deskripsi}
                  onChange={(event) =>
                    setForm({ ...form, deskripsi: event.target.value })
                  }
                  placeholder="Tambahkan keterangan lokasi..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {editing ? "Simpan Perubahan" : "Simpan Lokasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
              !
            </div>

            <h2 className="text-lg font-bold text-black">Hapus Lokasi?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Data lokasi yang dihapus akan hilang dari daftar ini. Yakin ingin
              melanjutkan?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}