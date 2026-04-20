import ToastSkinSVG from './ToastSkinSVG';
import { SKINS } from '../data/gameData';

interface Props {
  crumbs: number;
  ownedSkins: string[];
  equippedSkin: string;
  onBuy: (id: string) => void;
  onEquip: (id: string) => void;
}

const RARITY_COLORS = {
  common: { border: 'rgba(156,163,175,0.4)', text: '#9ca3af', bg: 'rgba(156,163,175,0.08)' },
  rare: { border: 'rgba(96,165,250,0.5)', text: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
  epic: { border: 'rgba(251,146,60,0.5)', text: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  legendary: { border: 'rgba(251,191,36,0.7)', text: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
};

function fmt(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function SkinSelector({ crumbs, ownedSkins, equippedSkin, onBuy, onEquip }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-lg">🎨</span>
        <h2 className="text-white font-bold text-base tracking-wide uppercase">Skins</h2>
        <span className="text-white/30 text-xs ml-auto">{ownedSkins.length}/{SKINS.length} owned</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {SKINS.map(skin => {
          const owned = ownedSkins.includes(skin.id);
          const equipped = equippedSkin === skin.id;
          const canAfford = crumbs >= skin.cost;
          const colors = RARITY_COLORS[skin.rarity];

          return (
            <div
              key={skin.id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                border: equipped
                  ? `1px solid ${colors.border}`
                  : `1px solid rgba(255,255,255,0.08)`,
                background: equipped ? colors.bg : 'rgba(255,255,255,0.03)',
                boxShadow: equipped ? `0 0 12px ${colors.border}` : 'none',
              }}
            >
              <div className="flex items-center gap-3 p-2.5">
                <div
                  className="flex-shrink-0 rounded-lg overflow-hidden"
                  style={{ width: 52, height: 52, background: 'rgba(0,0,0,0.4)' }}
                >
                  <div style={{ transform: 'scale(0.236)', transformOrigin: 'top left', width: 220, height: 220 }}>
                    <ToastSkinSVG skinId={skin.id} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-white font-semibold text-sm truncate">{skin.name}</span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-bold uppercase"
                      style={{ color: colors.text, background: colors.bg, border: `1px solid ${colors.border}` }}
                    >
                      {skin.rarity}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs leading-snug">{skin.description}</p>
                  {skin.bonusType !== 'none' && (
                    <p className="text-xs font-semibold mt-0.5" style={{ color: colors.text }}>
                      {skin.bonusLabel}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {equipped ? (
                    <div
                      className="px-3 py-1.5 rounded-lg text-xs font-bold"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      Equipped
                    </div>
                  ) : owned ? (
                    <button
                      onClick={() => onEquip(skin.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
                      style={{
                        background: 'rgba(251,146,60,0.2)',
                        color: '#fb923c',
                        border: '1px solid rgba(251,146,60,0.4)',
                      }}
                    >
                      Equip
                    </button>
                  ) : (
                    <button
                      onClick={() => canAfford && onBuy(skin.id)}
                      disabled={!canAfford}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex flex-col items-center"
                      style={{
                        background: canAfford ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                        color: canAfford ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                        border: `1px solid ${canAfford ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      <span>{fmt(skin.cost)}</span>
                      <span className="text-xs opacity-70">crumbs</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
