
'use client';

import Link from 'next/link';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useGameMode } from '../context/GameModeContext';

const navLinks = [
  { href: '/', label: 'Home', emoji: '🏠' },
  { href: '/dashboard', label: 'Dashboard', emoji: '📊' },
  { href: '/training', label: 'Training', emoji: '🎓' },
  { href: '/mentor', label: 'Mentor', emoji: '🧙' },
];

export default function Navbar() {
  const { isGameMode, toggleGameMode } = useGameMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm game-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

     
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg text-blue-700 hover:text-blue-800 tracking-tight transition-colors">
            {isGameMode
              ? <span style={{ fontSize: '1.5rem' }}>🌈</span>
              : <HeartPulse size={22} strokeWidth={2} />
            }
            <span className="game-brand-text">
              {isGameMode ? '✨ Aroha ✨' : 'Aroha'}
            </span>
          </Link>

          
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors game-nav-link"
              >
                {isGameMode ? `${link.emoji} ${link.label}` : link.label}
              </Link>
            ))}

            <button
              onClick={toggleGameMode}
              className="game-toggle-btn ml-3"
              aria-label={isGameMode ? 'Exit Kids Mode' : 'Enter Kids Mode'}
            >
              {isGameMode ? '🌙 Normal Mode' : '🎮 Kids Mode'}
            </button>
          </nav>

          
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={toggleGameMode}
              className="game-toggle-btn-mobile"
              aria-label="Toggle kids mode"
            >
              {isGameMode ? '🌙' : '🎮'}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>


        {mobileOpen && (
          <nav className="sm:hidden pb-3 flex flex-col gap-1 border-t border-slate-100 mt-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors game-nav-link"
              >
                {isGameMode ? `${link.emoji} ${link.label}` : link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}