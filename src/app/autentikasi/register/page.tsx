"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("UI pendaftaran berhasil dicoba! Fitur pendaftaran belum aktif.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4 py-10 text-black">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
            F
          </div>
          <h1 className="text-2xl font-bold">Buat Akun FAMS</h1>
          <p className="mt-2 text-sm text-gray-500">
            Faculty Asset Management System
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-24 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-black"
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Ulangi password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/autentikasi/login" className="font-semibold text-black hover:underline">
            Masuk
          </Link>
        </p>

        <div className="mt-8 border-t border-gray-200 pt-5 text-center">
          <p className="text-xs text-gray-400">
            FAMS · Noventra · Informatika 5A
          </p>
        </div>
      </div>
    </main>
  );
}