"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Fitur reset password belum diaktifkan.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4 py-10 text-black">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-xl font-bold text-white">
            F
          </div>
          <h1 className="text-2xl font-bold">Buat Password Baru</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Buat password baru untuk mengamankan akun FAMS kamu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password Baru
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Konfirmasi Password Baru
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Ulangi password baru"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              className="accent-black"
            />
            Tampilkan password
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Simpan Password Baru
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
          >
            ← Kembali ke Login
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-5 text-center">
          <p className="text-xs text-gray-400">
            FAMS · Noventra · Informatika 5A
          </p>
        </div>
      </div>
    </main>
  );
}