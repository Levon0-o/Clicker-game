import { UPGRADES, getUpgradeCost } from '../data/gameData';

interface Props {
  crumbs: number;
  upgrades: Record<string, number>;
  onBuy: (id: string) => void;
}

export default function UpgradesPanel({ crumbs, upgrades, onBuy }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-lg">⚡</span>
        <h2 className="text-white font-bold text-base tracking-wide uppercase">Upgrades</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {UPGRADES.map(upg => {
          const owned = upgrades[upg.id] ?? 0;
          const cost = getUpgradeCost(upg, owned);
          const canAfford = crumbs >= cost;

          return (
            <button
              key={upg.id}
              onClick={() => onBuy(upg.id)}
              disabled={!canAfford}
              className={`w-full text-left rounded-xl p-3 border transition-all duration-200 ${
                canAfford
                  ? 'border-orange-500/50 bg-orange-950/40 hover:bg-orange-900/50 hover:border-orange-400/70 cursor-pointer hover:scale-[1.02]'
                  : 'border-white/10 bg-white/5 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-xl flex-shrink-0 mt-0.5">{upg.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm truncate ${canAfford ? 'text-orange-100' : 'text-white/50'}`}>
                        {upg.name}
                      </span>
                      {owned > 0 && (
                        <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-orange-500/30 text-orange-300 font-bold">
                          ×{owned}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">{upg.description}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-xs font-bold ${canAfford ? 'text-amber-400' : 'text-white/30'}`}>
                    {cost >= 1000000
                      ? `${(cost / 1000000).toFixed(1)}M`
                      : cost >= 1000
                      ? `${(cost / 1000).toFixed(1)}K`
                      : cost}
                  </div>
                  <div className="text-xs text-white/30">crumbs</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
