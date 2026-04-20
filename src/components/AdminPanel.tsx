interface Props {
  godMode: boolean;
  onGrantCrumbs: (amount: number) => void;
  onToggleGodMode: () => void;
  onMaxUpgrades: () => void;
  onUnlockSkins: () => void;
  onClose: () => void;
}

const CRUMB_AMOUNTS = [
  { label: '+100', value: 100 },
  { label: '+1K', value: 1_000 },
  { label: '+10K', value: 10_000 },
  { label: '+100K', value: 100_000 },
  { label: '+1M', value: 1_000_000 },
  { label: '+1B', value: 1_000_000_000 },
];

export default function AdminPanel({ godMode, onGrantCrumbs, onToggleGodMode, onMaxUpgrades, onUnlockSkins, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 relative"
        style={{
          background: 'linear-gradient(135deg, rgba(5,15,5,0.99), rgba(5,20,8,0.99))',
          border: '1px solid rgba(34,197,94,0.4)',
          boxShadow: '0 0 40px rgba(34,197,94,0.15), inset 0 0 40px rgba(0,0,0,0.4)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors text-lg leading-none"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}
          >
            ⚙
          </div>
          <div>
            <h2 className="font-bold text-base" style={{ color: '#4ade80' }}>
              Admin Console
            </h2>
            <p className="text-white/30 text-xs font-mono">t0a5t_core authenticated</p>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">Spawn Crumbs</p>
          <div className="grid grid-cols-3 gap-2">
            {CRUMB_AMOUNTS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => onGrantCrumbs(value)}
                className="py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: '#4ade80',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">Commands</p>

          <button
            onClick={onToggleGodMode}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] flex items-center justify-between px-4"
            style={{
              background: godMode ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${godMode ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.12)'}`,
              color: godMode ? '#fbbf24' : 'rgba(255,255,255,0.6)',
            }}
          >
            <span>God Mode (9999x)</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{
                background: godMode ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)',
                color: godMode ? '#fbbf24' : 'rgba(255,255,255,0.4)',
              }}
            >
              {godMode ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={onMaxUpgrades}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] text-left px-4"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
              color: 'rgba(134,239,172,0.8)',
            }}
          >
            Max All Upgrades (×10 each)
          </button>

          <button
            onClick={onUnlockSkins}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] text-left px-4"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
              color: 'rgba(134,239,172,0.8)',
            }}
          >
            Unlock All Skins
          </button>
        </div>

        {godMode && (
          <div
            className="mt-4 text-center py-2 rounded-xl text-xs font-bold"
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.3)',
              color: '#fbbf24',
            }}
          >
            GOD MODE ACTIVE — 9,999x ALL CRUMBS
          </div>
        )}
      </div>
    </div>
  );
}
