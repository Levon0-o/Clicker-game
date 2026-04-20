import { useState, useEffect } from 'react';
import { BOOSTERS } from '../data/gameData';

interface Props {
  crumbs: number;
  activeBooster: { id: string; multiplier: number; endsAt: number } | null;
  boosterLastUsed: Record<string, number>;
  onActivate: (id: string) => void;
}

function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function BoostersPanel({ crumbs, activeBooster, boosterLastUsed, onActivate }: Props) {
  const now = useNow();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-lg">🚀</span>
        <h2 className="text-white font-bold text-base tracking-wide uppercase">Boosters</h2>
      </div>
      <div className="space-y-3">
        {BOOSTERS.map(b => {
          const isActive = activeBooster?.id === b.id;
          const lastUsed = boosterLastUsed[b.id] ?? 0;
          const cooldownRemaining = Math.max(0, lastUsed + b.cooldown - now);
          const isOnCooldown = cooldownRemaining > 0 && !isActive;
          const canAfford = crumbs >= b.cost;
          const anotherActive = activeBooster && activeBooster.id !== b.id;
          const timeLeft = isActive ? Math.max(0, activeBooster!.endsAt - now) : 0;
          const cooldownSec = Math.ceil(cooldownRemaining / 1000);
          const timeSec = Math.ceil(timeLeft / 1000);

          const clickable = canAfford && !isOnCooldown && !anotherActive && !isActive;

          return (
            <button
              key={b.id}
              onClick={() => clickable && onActivate(b.id)}
              disabled={!clickable}
              className={`w-full rounded-xl p-3 border transition-all duration-200 text-left ${
                isActive
                  ? 'border-amber-400/70 bg-amber-950/50 booster-active cursor-default'
                  : clickable
                  ? 'border-orange-500/50 bg-orange-950/40 hover:bg-orange-900/50 hover:border-orange-400/70 cursor-pointer hover:scale-[1.02]'
                  : 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isActive ? 'text-amber-300' : 'text-orange-100'}`}>
                      {b.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-orange-500/30 text-orange-300 font-bold">
                      {b.multiplier}x
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{b.description}</p>
                  <div className="mt-1.5">
                    {isActive ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-amber-400 font-bold">ACTIVE</span>
                          <span className="text-amber-300">{timeSec}s left</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-amber-950/60 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all duration-250"
                            style={{ width: `${(timeLeft / b.duration) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : isOnCooldown ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/40">Cooldown</span>
                          <span className="text-white/40">{cooldownSec}s</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-white/20 transition-all duration-250"
                            style={{ width: `${(cooldownRemaining / b.cooldown) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-bold ${canAfford ? 'text-amber-400' : 'text-white/30'}`}>
                          {b.cost.toLocaleString()} crumbs
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
