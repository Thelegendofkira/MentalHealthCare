'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartPulse, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useGameMode } from '../context/GameModeContext';

const navLinks = [
  { href: '/',          label: 'Home',        emoji: '🏠' },
  { href: '/dashboard', label: 'Resources',   emoji: '📚' },
  { href: '/training',  label: 'Training',    emoji: '🎓' },
  { href: '/mentor',    label: 'Mentor',      emoji: '🧙' },
  { href: '/actions',   label: 'NGO Actions', emoji: '🌍' },
];

export default function Navbar() {
  const router = useRouter();
  const { isGameMode, toggleGameMode } = useGameMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm game-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg text-blue-700 hover:text-blue-800 tracking-tight transition-colors">
            {isGameMode
              ? <span style={{ fontSize: '1.5rem' }}>🌈</span>
              : <HeartPulse size={22} strokeWidth={2} />
            }
            <span className="game-brand-text">
              {isGameMode ? '✨ Aroha ✨' : 'Aroha'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors game-nav-link"
              >
                {isGameMode ? `${link.emoji} ${link.label}` : link.label}
              </Link>
            ))}

            {/* Kids mode toggle */}
            <button
              onClick={toggleGameMode}
              className="game-toggle-btn ml-2"
              aria-label={isGameMode ? 'Exit Kids Mode' : 'Enter Kids Mode'}
            >
              {isGameMode ? '🌙 Normal Mode' : '🎮 Kids Mode'}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              aria-label="Logout"
            >
              <LogOut size={15} />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="sm:hidden flex items-center gap-2">
            <button onClick={toggleGameMode} className="game-toggle-btn-mobile" aria-label="Toggle kids mode">
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

        {/* Mobile dropdown */}
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
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 text-left"
            >
              <LogOut size={15} />
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
