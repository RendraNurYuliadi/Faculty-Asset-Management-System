"use client";

import type { FormEvent } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
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
          <h1 className="text-2xl font-bold">Lupa Password?</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Masukkan email akun kamu untuk mendapatkan instruksi
            reset password.
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Kirim Link Reset
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