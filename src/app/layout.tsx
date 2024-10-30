import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cineamo API Viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Cineamo API viewer</h1>
          <ul className="flex space-x-6">
            <li>
              <Link href="/cinemas" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300">
                Cinemas
              </Link>
            </li>
            <li>
              <Link href="/movies" className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300">
                Movies
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            © Kateryna Boiko 2024
          </footer>
        </div>
      </body>
    </html>
  );
}
