const stats = [
  { label: "Total Aset", value: "128", note: "Seluruh aset terdaftar" },
  { label: "Aset Tersedia", value: "96", note: "Siap digunakan" },
  { label: "Sedang Dipinjam", value: "24", note: "Dalam peminjaman" },
  { label: "Perlu Perhatian", value: "8", note: "Pemeliharaan atau keluhan" },
];

const activities = [
  {
    title: "Pengajuan peminjaman",
    detail: "Pengajuan menunggu pemeriksaan",
    status: "Menunggu",
    date: "—",
  },
  {
    title: "Pemeliharaan aset",
    detail: "Pemeriksaan kondisi aset",
    status: "Diproses",
    date: "—",
  },
  {
    title: "Pengembalian aset",
    detail: "Pengembalian menunggu verifikasi",
    status: "Menunggu",
    date: "—",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section>
        <p className="text-sm font-medium text-gray-500">
          Ringkasan sistem
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
          Dashboard FAMS
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Pantau kondisi aset, peminjaman, dan aktivitas fakultas.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-400"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.label}
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-gray-400">{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
          <h3 className="font-semibold text-gray-900">
            Ringkasan Aktivitas
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Gambaran aktivitas pengelolaan aset.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {activity.detail}
                </p>
              </div>

              <span className="w-fit rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                {activity.status}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 px-5 py-4 sm:px-6">
          <p className="text-xs text-gray-400">
            Data di atas merupakan data demo, belum terhubung ke database.
          </p>
        </div>
      </section>
    </div>
  );
}