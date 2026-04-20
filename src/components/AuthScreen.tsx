import { useState } from 'react';
import StarField from './StarField';

interface Props {
  onLogin: (username: string, password: string, rememberMe: boolean) => Promise<{ error?: string }>;
  onRegister: (username: string, password: string, confirmPassword: string) => Promise<{ error?: string }>;
}

type Mode = 'login' | 'register';

export default function AuthScreen({ onLogin, onRegister }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    let result: { error?: string };
    if (mode === 'login') {
      result = await onLogin(username, password, rememberMe);
    } else {
      result = await onRegister(username, password, confirmPassword);
    }
    setLoading(false);
    if (result.error) setError(result.error);
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0a0608 0%, #050305 60%, #000000 100%)' }}
    >
      <StarField />

      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="text-4xl">🍞</span>
            <h1
              className="text-3xl font-black tracking-wider uppercase"
              style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.6)', letterSpacing: '0.15em' }}
            >
              Toast Tap
            </h1>
          </div>
          <p className="text-white/30 text-sm tracking-widest uppercase">Click. Crumble. Conquer.</p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(10,6,8,0.95)',
            border: '1px solid rgba(251,146,60,0.2)',
            boxShadow: '0 0 40px rgba(251,146,60,0.08), inset 0 0 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {(['login', 'register'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: mode === m ? 'rgba(251,146,60,0.2)' : 'transparent',
                  border: mode === m ? '1px solid rgba(251,146,60,0.4)' : '1px solid transparent',
                  color: mode === m ? '#fb923c' : 'rgba(255,255,255,0.35)',
                }}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="your_name"
                autoComplete="username"
                maxLength={20}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  caretColor: '#fb923c',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(251,146,60,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  caretColor: '#fb923c',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(251,146,60,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    caretColor: '#fb923c',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(251,146,60,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            )}

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all"
                  style={{
                    background: rememberMe ? 'rgba(251,146,60,0.3)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${rememberMe ? 'rgba(251,146,60,0.6)' : 'rgba(255,255,255,0.15)'}`,
                  }}
                >
                  {rememberMe && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Remember me</span>
            </label>

            {error && (
              <div
                className="px-3 py-2 rounded-xl text-xs font-medium"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(239,68,68,0.25))',
                border: '1px solid rgba(251,146,60,0.4)',
                color: '#fbbf24',
                boxShadow: '0 0 20px rgba(251,146,60,0.1)',
              }}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Enter the Bakery' : 'Create Account'}
            </button>
          </form>
        </div>

        {mode === 'register' && (
          <p className="text-center text-white/20 text-xs mt-4">
            2–20 chars, letters/numbers/underscores only
          </p>
        )}
      </div>
    </div>
  );
}
