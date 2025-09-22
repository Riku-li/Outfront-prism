import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oufront Solutions",
  description:
    "Outfront Solutions' Prism Assistant is a text-based AI chatbot: a simple, web-embedded channel that answers questions directly from Outfront’s documents. Streamlines access to knowledge while staying focused on clarity and reliability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
