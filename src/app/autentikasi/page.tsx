import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] px-6 text-center text-black">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-2xl font-bold text-white">
        F
      </div>

      <p className="text-sm font-medium text-gray-500">
        Faculty Asset Management System
      </p>

      <h1 className="mt-2 text-4xl font-bold tracking-tight">FAMS</h1>

      <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
        Sistem pengelolaan aset fakultas yang terorganisasi,
        efisien, dan mudah digunakan.
      </p>

      <Link
        href="/autentikasi/login"
        className="mt-8 rounded-xl bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
      >
        Masuk ke FAMS
      </Link>

      <p className="mt-10 text-xs text-gray-400">
        FAMS · Noventra · Informatika 5A
      </p>
    </main>
  );
}