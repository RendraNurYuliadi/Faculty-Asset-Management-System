"use client";

import { useMemo, useState } from "react";

type Room = {
  id: number;
  kode: string;
  nama: string;
  gedung: string;
  lantai: string;
  kapasitas: number;
  jenis: string;
  status: "Tersedia" | "Digunakan" | "Perbaikan";
};

const initialRooms: Room[] = [
  {
    id: 1,
    kode: "RNG-001",
    nama: "Ruang Kelas 101",
    gedung: "Gedung A",
    lantai: "Lantai 1",
    kapasitas: 40,
    jenis: "Kelas",
    status: "Tersedia",
  },
  {
    id: 2,
    kode: "RNG-002",
    nama: "Lab Komputer",
    gedung: "Gedung A",
    lantai: "Lantai 2",
    kapasitas: 30,
    jenis: "Laboratorium",
    status: "Digunakan",
  },
  {
    id: 3,
    kode: "RNG-003",
    nama: "Ruang Dosen",
    gedung: "Gedung B",
    lantai: "Lantai 1",
    kapasitas: 15,
    jenis: "Kantor",
    status: "Tersedia",
  },
  {
    id: 4,
    kode: "RNG-004",
    nama: "Ruang Seminar",
    gedung: "Gedung C",
    lantai: "Lantai 3",
    kapasitas: 80,
    jenis: "Seminar",
    status: "Perbaikan",
  },
  {
    id: 5,
    kode: "RNG-005",
    nama: "Ruang Rapat",
    gedung: "Gedung B",
    lantai: "Lantai 2",
    kapasitas: 20,
    jenis: "Rapat",
    status: "Digunakan",
  },
];

const emptyForm = {
  nama: "",
  gedung: "",
  lantai: "",
  kapasitas: "30",
  jenis: "Kelas",
  status: "Tersedia" as Room["status"],
};

const statusStyles: Record<Room["status"], string> = {
  Tersedia: "bg-gray-100 text-gray-700",
  Digunakan: "bg-black text-white",
  Perbaikan: "border border-gray-300 bg-white text-gray-600",
};

export default function RuanganPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredRooms = useMemo(() => {
    const keyword = search.toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch = [
        room.kode,
        room.nama,
        room.gedung,
        room.lantai,
        room.jenis,
      ].some((value) => value.toLowerCase().includes(keyword));

      const matchesStatus =
        filterStatus === "Semua" || room.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [rooms, search, filterStatus]);

  function openAddModal() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(room: Room) {
    setEditing(room);
    setForm({
      nama: room.nama,
      gedung: room.gedung,
      lantai: room.lantai,
      kapasitas: String(room.kapasitas),
      jenis: room.jenis,
      status: room.status,
    });
    setModalOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const duplicate = rooms.some(
      (room) =>
        room.nama.toLowerCase() === form.nama.trim().toLowerCase() &&
        room.id !== editing?.id,
    );

    if (duplicate) {
      alert("Nama ruangan sudah digunakan.");
      return;
    }

    if (editing) {
      setRooms((current) =>
        current.map((room) =>
          room.id === editing.id
            ? {
                ...room,
                ...form,
                nama: form.nama.trim(),
                kapasitas: Number(form.kapasitas),
              }
            : room,
        ),
      );
    } else {
      const nextId = Math.max(0, ...rooms.map((room) => room.id)) + 1;

      setRooms((current) => [
        ...current,
        {
          id: nextId,
          kode: `RNG-${String(nextId).padStart(3, "0")}`,
          ...form,
          nama: form.nama.trim(),
          kapasitas: Number(form.kapasitas),
        },
      ]);
    }

    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function handleDelete() {
    if (deleteId === null) return;

    setRooms((current) => current.filter((room) => room.id !== deleteId));
    setDeleteId(null);
  }

  function exportCSV() {
    const headers = [
      "Kode",
      "Nama Ruangan",
      "Gedung",
      "Lantai",
      "Kapasitas",
      "Jenis",
      "Status",
    ];

    const rows = filteredRooms.map((room) => [
      room.kode,
      room.nama,
      room.gedung,
      room.lantai,
      room.kapasitas,
      room.jenis,
      room.status,
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
    link.download = "data-ruangan.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-5 my-5 w-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span>Manajemen Aset</span>
            <span>/</span>
            <span className="font-medium text-black">Ruangan</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-black">
            Data Ruangan
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola ruangan dan kapasitas yang tersedia di fakultas.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <span className="text-lg">+</span>
          Tambah Ruangan
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Ruangan</p>
          <p className="mt-3 text-3xl font-bold text-black">{rooms.length}</p>
          <p className="mt-1 text-xs text-gray-500">Ruangan terdaftar</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Tersedia</p>
          <p className="mt-3 text-3xl font-bold text-black">
            {rooms.filter((room) => room.status === "Tersedia").length}
          </p>
          <p className="mt-1 text-xs text-gray-500">Siap digunakan</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Digunakan</p>
          <p className="mt-3 text-3xl font-bold text-black">
            {rooms.filter((room) => room.status === "Digunakan").length}
          </p>
          <p className="mt-1 text-xs text-gray-500">Sedang digunakan</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Perbaikan</p>
          <p className="mt-3 text-3xl font-bold text-black">
            {rooms.filter((room) => room.status === "Perbaikan").length}
          </p>
          <p className="mt-1 text-xs text-gray-500">Perlu penanganan</p>
        </div>
      </div>

      {/* Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold text-black">Daftar Ruangan</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredRooms.length} ruangan ditemukan
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari ruangan..."
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-black sm:w-52"
            />

            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
            >
              <option value="Semua">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Digunakan">Digunakan</option>
              <option value="Perbaikan">Perbaikan</option>
            </select>

            <button
              onClick={exportCSV}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              ↓ Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Kode</th>
                <th className="px-5 py-4 font-semibold">Nama Ruangan</th>
                <th className="px-5 py-4 font-semibold">Lokasi</th>
                <th className="px-5 py-4 font-semibold">Kapasitas</th>
                <th className="px-5 py-4 font-semibold">Jenis</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="transition hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-600">
                    {room.kode}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-black">
                    {room.nama}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-700">{room.gedung}</p>
                    <p className="mt-1 text-xs text-gray-500">{room.lantai}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {room.kapasitas} orang
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {room.jenis}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[room.status]}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(room)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(room.id)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-black hover:text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <p className="font-medium text-gray-700">
                      Ruangan tidak ditemukan
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Coba ubah kata kunci atau filter status.
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
                  {editing ? "Edit Ruangan" : "Tambah Ruangan"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Lengkapi informasi ruangan berikut.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                aria-label="Tutup modal"
                className="rounded-lg px-2 py-1 text-xl text-gray-500 hover:bg-gray-100 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Ruangan *
                </label>
                <input
                  required
                  value={form.nama}
                  onChange={(event) =>
                    setForm({ ...form, nama: event.target.value })
                  }
                  placeholder="Contoh: Ruang Kelas 101"
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
                    placeholder="Gedung A"
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
                    placeholder="Lantai 1"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kapasitas *
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={form.kapasitas}
                    onChange={(event) =>
                      setForm({ ...form, kapasitas: event.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Ruangan *
                  </label>
                  <select
                    required
                    value={form.jenis}
                    onChange={(event) =>
                      setForm({ ...form, jenis: event.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                  >
                    <option value="Kelas">Kelas</option>
                    <option value="Laboratorium">Laboratorium</option>
                    <option value="Kantor">Kantor</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Rapat">Rapat</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  required
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as Room["status"],
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Digunakan">Digunakan</option>
                  <option value="Perbaikan">Perbaikan</option>
                </select>
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
                  {editing ? "Simpan Perubahan" : "Simpan Ruangan"}
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

            <h2 className="text-lg font-bold text-black">Hapus Ruangan?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Data ruangan ini akan dihapus dari daftar. Yakin ingin
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