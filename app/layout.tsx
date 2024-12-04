import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat Assistant",
  description: "A chat application powered by Google's Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50`}>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
