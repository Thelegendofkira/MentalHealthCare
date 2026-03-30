import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import FloatingEmojis from "./components/FloatingEmojis";
import { GameModeProvider } from "./context/GameModeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindBridge — Youth Mental Health Support",
  description:
    "A safe, accessible platform for youth mental health awareness, early intervention, and NGO support. Built for communities that need it most.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-slate-800 antialiased">
        <GameModeProvider>
          <FloatingEmojis />
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="bg-white border-t border-slate-200 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
              © {new Date().getFullYear()} MindBridge · Built for community wellbeing.
            </div>
          </footer>
        </GameModeProvider>
      </body>
    </html>
  );
}
