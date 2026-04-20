import { useState, useRef, useEffect } from 'react';
import { SECRET_CODES } from '../data/gameData';

interface Props {
  usedCodes: string[];
  onRedeem: (code: string) => { success: boolean; message: string; isAdmin?: boolean };
  onAdminAccess: () => void;
}

interface FeedbackEntry {
  id: number;
  success: boolean;
  message: string;
}

let feedbackCounter = 0;

export default function CodeInput({ usedCodes, onRedeem, onAdminAccess }: Props) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    const result = onRedeem(value.trim());
    if (result.isAdmin) {
      setValue('');
      onAdminAccess();
      return;
    }
    const entry: FeedbackEntry = { id: ++feedbackCounter, success: result.success, message: result.message };
    setFeedback(entry);
    setValue('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback(null), 4000);
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const redeemedSet = new Set(usedCodes);

  return (
    <div
      className="rounded-2xl p-4 w-full"
      style={{
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(251,146,60,0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🔐</span>
        <h3 className="text-white/70 font-bold text-xs uppercase tracking-widest">Secret Codes</h3>
        <span className="text-white/30 text-xs ml-auto">{usedCodes.length}/{SECRET_CODES.length} found</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500/60 text-xs font-mono select-none"
          >
            &gt;_
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="enter code..."
            autoComplete="off"
            spellCheck={false}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-xs font-mono text-orange-200 placeholder-white/20 outline-none focus:ring-1 focus:ring-orange-500/50 transition-all"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!value.trim()}
          className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
          style={{
            background: value.trim()
              ? 'linear-gradient(135deg, rgba(251,146,60,0.8), rgba(220,38,38,0.8))'
              : 'rgba(255,255,255,0.08)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Enter
        </button>
      </form>

      {feedback && (
        <div
          key={feedback.id}
          className="milestone-toast rounded-lg px-3 py-2 text-xs font-medium mb-3"
          style={{
            background: feedback.success
              ? 'rgba(251,146,60,0.15)'
              : 'rgba(239,68,68,0.12)',
            border: `1px solid ${feedback.success ? 'rgba(251,146,60,0.4)' : 'rgba(239,68,68,0.3)'}`,
            color: feedback.success ? '#fdba74' : '#fca5a5',
          }}
        >
          {feedback.message}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {SECRET_CODES.map(sc => {
          const used = redeemedSet.has(sc.code);
          return (
            <div
              key={sc.code}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all"
              style={{
                background: used ? 'rgba(251,146,60,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${used ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: used ? '#fdba74' : 'rgba(255,255,255,0.3)',
              }}
            >
              <span>{used ? '✓' : '?'}</span>
              <span className="font-medium">{used ? sc.label : '???'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
