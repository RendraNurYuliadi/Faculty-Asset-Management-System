"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("UI login berhasil! Autentikasi belum diaktifkan.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4 py-10 text-black">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
            F
          </div>
          <h1 className="text-2xl font-bold tracking-tight">FAMS</h1>
          <p className="mt-2 text-sm text-gray-500">
            Faculty Asset Management System
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Selamat Datang</h2>
          <p className="mt-1 text-sm text-gray-500">
            Silakan masuk ke akun Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-24 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
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

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
          >
            Masuk
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-black hover:underline">
            Daftar
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