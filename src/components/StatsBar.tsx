interface Props {
  crumbs: number;
  totalCrumbs: number;
  perClick: number;
  perSecond: number;
  activeBooster: { multiplier: number; endsAt: number } | null;
}

function fmt(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return Math.floor(n).toLocaleString();
}

export default function StatsBar({ crumbs, totalCrumbs, perClick, perSecond, activeBooster }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-2">
        <span
          className="font-bold text-5xl tabular-nums"
          style={{
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251,191,36,0.6), 0 2px 8px rgba(0,0,0,0.8)',
            fontFamily: 'monospace',
          }}
        >
          {fmt(crumbs)}
        </span>
        <span className="text-amber-400/70 text-lg font-semibold">crumbs</span>
      </div>

      <div className="flex items-center gap-6 mt-1">
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest">per click</div>
          <div className="text-orange-300 font-bold text-sm">{fmt(perClick)}</div>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest">per sec</div>
          <div className="text-orange-300 font-bold text-sm">{fmt(perSecond)}</div>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="text-center">
          <div className="text-white/40 text-xs uppercase tracking-widest">all time</div>
          <div className="text-orange-300 font-bold text-sm">{fmt(totalCrumbs)}</div>
        </div>
      </div>

      {activeBooster && (
        <div
          className="mt-2 px-4 py-1.5 rounded-full text-sm font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(239,68,68,0.3))',
            border: '1px solid rgba(251,191,36,0.6)',
            color: '#fbbf24',
            textShadow: '0 0 8px rgba(251,191,36,0.6)',
          }}
        >
          {activeBooster.multiplier}x BOOST ACTIVE!
        </div>
      )}
    </div>
  );
}
