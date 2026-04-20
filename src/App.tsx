import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import StarField from './components/StarField';
import ToastButton from './components/ToastButton';
import StatsBar from './components/StatsBar';
import UpgradesPanel from './components/UpgradesPanel';
import BoostersPanel from './components/BoostersPanel';
import SkinSelector from './components/SkinSelector';
import Leaderboard from './components/Leaderboard';
import CodeInput from './components/CodeInput';
import AdminPanel from './components/AdminPanel';
import AuthScreen from './components/AuthScreen';

type CenterTab = 'skins' | 'codes';

export default function App() {
  const { user, username, loading: authLoading, login, register, logout } = useAuth();

  const {
    state, stats, saveLoaded,
    handleClick, removeParticle,
    buyUpgrade, activateBooster,
    buySkin, equipSkin,
    redeemCode,
    grantCrumbs, toggleGodMode, maxAllUpgrades, unlockAllSkins,
  } = useGameState(user?.id ?? null);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [centerTab, setCenterTab] = useState<CenterTab>('codes');

  if (authLoading) {
    return (
      <div
        className="min-h-screen w-full overflow-hidden relative flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, #0a0608 0%, #050305 60%, #000000 100%)' }}
      >
        <StarField />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="text-4xl" style={{ animation: 'toastBounce 0.6s ease-in-out infinite' }}>🍞</span>
          <p className="text-white/30 text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={login} onRegister={register} />;
  }

  const boostActive = !!(state.activeBooster && Date.now() < state.activeBooster.endsAt);
  const effectivePerClick = stats.clickPower * stats.multiplier * (boostActive ? (state.activeBooster?.multiplier ?? 1) : 1);
  const effectivePerSec = stats.autoRate * stats.multiplier * (boostActive ? (state.activeBooster?.multiplier ?? 1) : 1);

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse at center, #0a0608 0%, #050305 60%, #000000 100%)' }}
    >
      <StarField />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍞</span>
            <h1
              className="text-xl font-black tracking-wider uppercase"
              style={{ color: '#fbbf24', textShadow: '0 0 15px rgba(251,191,36,0.5)', letterSpacing: '0.15em' }}
            >
              Toast Tap
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {username && (
              <span
                className="hidden sm:block px-3 py-1 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              >
                {username}
              </span>
            )}
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)', color: '#fb923c' }}
            >
              <span>🏆</span>
              <span className="hidden sm:inline">Leaderboard</span>
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
            >
              Sign Out
            </button>
          </div>
        </header>

        {!saveLoaded ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/30 text-sm tracking-widest uppercase">Restoring save...</p>
          </div>
        ) : (
          <main className="flex-1 flex items-start justify-center gap-4 px-4 pb-8 pt-2">
            <aside
              className="hidden lg:flex flex-col w-64 rounded-2xl p-4 flex-shrink-0"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                height: 'calc(100vh - 140px)',
              }}
            >
              <UpgradesPanel crumbs={state.crumbs} upgrades={state.upgrades} onBuy={buyUpgrade} />
            </aside>

            <div className="flex flex-col items-center gap-5 flex-shrink-0 w-full max-w-sm lg:max-w-none lg:w-auto">
              <StatsBar
                crumbs={state.crumbs}
                totalCrumbs={state.totalCrumbs}
                perClick={effectivePerClick}
                perSecond={effectivePerSec}
                activeBooster={state.activeBooster}
              />

              <div className="relative" style={{ marginTop: 24 }}>
                <ToastButton
                  isClicking={state.isClicking}
                  boostActive={boostActive}
                  equippedSkin={state.equippedSkin}
                  particles={state.particles}
                  onRemoveParticle={removeParticle}
                  onToastClick={handleClick}
                />
              </div>

              <div className="w-full" style={{ maxWidth: 340 }}>
                <div className="flex gap-1 mb-2">
                  {(['codes', 'skins'] as CenterTab[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setCenterTab(tab)}
                      className="flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                      style={{
                        background: centerTab === tab ? 'rgba(251,146,60,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${centerTab === tab ? 'rgba(251,146,60,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: centerTab === tab ? '#fb923c' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {tab === 'codes' ? '🔐 Codes' : '🎨 Skins'}
                    </button>
                  ))}
                </div>

                {centerTab === 'codes' ? (
                  <CodeInput
                    usedCodes={state.usedCodes}
                    onRedeem={redeemCode}
                    onAdminAccess={() => setShowAdmin(true)}
                  />
                ) : (
                  <div
                    className="rounded-2xl p-3"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)',
                      maxHeight: 260,
                      overflowY: 'auto',
                    }}
                  >
                    <SkinSelector
                      crumbs={state.crumbs}
                      ownedSkins={state.ownedSkins}
                      equippedSkin={state.equippedSkin}
                      onBuy={buySkin}
                      onEquip={equipSkin}
                    />
                  </div>
                )}
              </div>

              <div className="lg:hidden w-full space-y-4">
                <div
                  className="rounded-2xl p-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <BoostersPanel
                    crumbs={state.crumbs}
                    activeBooster={state.activeBooster}
                    boosterLastUsed={state.boosterLastUsed}
                    onActivate={activateBooster}
                  />
                </div>
                <div
                  className="rounded-2xl p-4 max-h-80 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <UpgradesPanel crumbs={state.crumbs} upgrades={state.upgrades} onBuy={buyUpgrade} />
                </div>
              </div>
            </div>

            <aside
              className="hidden lg:flex flex-col w-64 rounded-2xl p-4 flex-shrink-0"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                height: 'calc(100vh - 140px)',
              }}
            >
              <BoostersPanel
                crumbs={state.crumbs}
                activeBooster={state.activeBooster}
                boosterLastUsed={state.boosterLastUsed}
                onActivate={activateBooster}
              />
            </aside>
          </main>
        )}
      </div>

      {showLeaderboard && (
        <Leaderboard totalCrumbs={state.totalCrumbs} username={username || 'Player'} onClose={() => setShowLeaderboard(false)} />
      )}

      {showAdmin && (
        <AdminPanel
          godMode={state.godMode}
          onGrantCrumbs={grantCrumbs}
          onToggleGodMode={toggleGodMode}
          onMaxUpgrades={maxAllUpgrades}
          onUnlockSkins={unlockAllSkins}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
