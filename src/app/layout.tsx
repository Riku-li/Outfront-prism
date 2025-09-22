import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure Inter
const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bank Bot",
    description: "Explora las soluciones inteligentes para selección de talento: IA, automatización y análisis avanzado de CVs para encontrar a los candidatos ideales.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
