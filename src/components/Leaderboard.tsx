import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Entry {
  id: string;
  player_name: string;
  total_crumbs: number;
  created_at: string;
}

interface Props {
  totalCrumbs: number;
  username: string;
  onClose: () => void;
}

function fmt(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return Math.floor(n).toLocaleString();
}

export default function Leaderboard({ totalCrumbs, username, onClose }: Props) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (username && !submitted && !submitting) {
      handleAutoSubmit();
    }
  }, []);

  async function loadEntries() {
    setLoading(true);
    const { data } = await supabase
      .from('leaderboard')
      .select('id, player_name, total_crumbs, created_at')
      .order('total_crumbs', { ascending: false })
      .limit(10);
    if (data) setEntries(data);
    setLoading(false);
  }

  async function handleAutoSubmit() {
    setSubmitting(true);
    await supabase.from('leaderboard').insert({
      player_name: username.slice(0, 20),
      total_crumbs: Math.floor(totalCrumbs),
    });
    setSubmitted(true);
    setSubmitting(false);
    await loadEntries();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 relative"
        style={{
          background: 'linear-gradient(135deg, rgba(15,10,5,0.98), rgba(30,15,5,0.98))',
          border: '1px solid rgba(251,146,60,0.3)',
          boxShadow: '0 0 40px rgba(251,146,60,0.15)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors text-xl"
        >
          ✕
        </button>

        <h2
          className="text-2xl font-bold text-center mb-1"
          style={{ color: '#fbbf24', textShadow: '0 0 12px rgba(251,191,36,0.5)' }}
        >
          Hall of Toast
        </h2>
        <p className="text-white/40 text-sm text-center mb-5">Top crumb collectors</p>

        {!submitted && (
          <div className="mb-5 text-center py-3 rounded-xl text-sm"
            style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)' }}>
            <p className="text-white/70 font-medium">Submitting your score as <span style={{ color: '#fbbf24' }}>{username}</span>...</p>
          </div>
        )}

        {submitted && (
          <div className="mb-5 text-center py-2 rounded-xl text-sm font-semibold text-amber-300"
            style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)' }}>
            Score submitted!
          </div>
        )}

        <div className="space-y-2">
          {loading ? (
            <div className="text-center text-white/40 py-6">Loading...</div>
          ) : entries.length === 0 ? (
            <div className="text-center text-white/40 py-6">No scores yet. Be the first!</div>
          ) : (
            entries.map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5"
                style={{
                  background: i === 0 ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.04)',
                  border: i === 0 ? '1px solid rgba(251,191,36,0.3)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="w-7 text-center font-bold text-sm flex-shrink-0"
                  style={{ color: i === 0 ? '#fbbf24' : i === 1 ? '#e2e8f0' : i === 2 ? '#cd7f32' : 'rgba(255,255,255,0.4)' }}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-white/80 text-sm font-medium truncate">{entry.player_name}</span>
                <span className="font-bold text-sm" style={{ color: '#fb923c' }}>
                  {fmt(entry.total_crumbs)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
