'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartPulse, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

type Mode = 'login' | 'register';
type Role = 'trainee' | 'mentor';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<Role>('trainee');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Registration failed.'); return; }
        setSuccess('Account created! Please sign in.');
        setMode('login');
        setName('');
        setPassword('');
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Login failed.'); return; }
        router.push(data.role === 'mentor' ? '/mentor' : '/training');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-16">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-10 text-blue-500">
        <HeartPulse size={28} strokeWidth={2} />
        <span className="text-2xl font-bold text-white tracking-tight">Aroha</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8">

        {/* Tab switcher */}
        <div className="flex rounded-xl overflow-hidden border border-zinc-700 mb-8">
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                mode === m
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h1 className="text-xl font-bold text-white mb-1">
          {mode === 'login' ? 'Welcome back' : 'Join Aroha'}
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          {mode === 'login'
            ? 'Enter your credentials to continue.'
            : 'Create your account to get started.'}
        </p>

        {error && (
          <div className="mb-5 bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 bg-green-950 border border-green-800 text-green-300 text-sm rounded-lg px-4 py-3">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role selection (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {(['trainee', 'mentor'] as Role[]).map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      role === r
                        ? 'border-blue-500 bg-blue-950 text-blue-300'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                      className="sr-only"
                    />
                    <span className="text-lg">{r === 'trainee' ? '🧑‍🎓' : '🧑‍🏫'}</span>
                    <span className="text-sm font-semibold capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Processing...</>
              : <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
            }
          </button>
        </form>
      </div>

      <p className="mt-6 text-zinc-600 text-xs text-center">
        © {new Date().getFullYear()} Aroha · Youth Mental Health Support
      </p>
    </div>
  );
}
