import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAMS — Faculty Asset Management System",
  description: "Sistem Manajemen Aset Fakultas",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}