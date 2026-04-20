import { useState, useEffect, useRef, useCallback } from 'react';
import { Particle } from '../types/game';
import { UPGRADES, BOOSTERS, SKINS, SECRET_CODES, HIDDEN_ADMIN_CODE, getUpgradeCost } from '../data/gameData';
import { supabase } from '../lib/supabase';

interface ActiveBooster {
  id: string;
  multiplier: number;
  endsAt: number;
}

interface GameState {
  crumbs: number;
  totalCrumbs: number;
  upgrades: Record<string, number>;
  activeBooster: ActiveBooster | null;
  boosterLastUsed: Record<string, number>;
  particles: Particle[];
  isClicking: boolean;
  usedCodes: string[];
  secretAutoBonus: number;
  secretClickBonus: number;
  ownedSkins: string[];
  equippedSkin: string;
  godMode: boolean;
}

type SaveData = Pick<GameState, 'crumbs' | 'totalCrumbs' | 'upgrades' | 'usedCodes' | 'secretAutoBonus' | 'secretClickBonus' | 'ownedSkins' | 'equippedSkin' | 'godMode'>;

const DEFAULT_STATE: GameState = {
  crumbs: 0,
  totalCrumbs: 0,
  upgrades: {},
  activeBooster: null,
  boosterLastUsed: {},
  particles: [],
  isClicking: false,
  usedCodes: [],
  secretAutoBonus: 0,
  secretClickBonus: 0,
  ownedSkins: ['classic'],
  equippedSkin: 'classic',
  godMode: false,
};

function computeStats(
  upgrades: Record<string, number>,
  secretClickBonus: number,
  secretAutoBonus: number,
  equippedSkin: string,
  godMode: boolean,
) {
  let clickPower = 1 + secretClickBonus;
  let autoRate = secretAutoBonus;
  let multiplier = 1;

  const skin = SKINS.find(s => s.id === equippedSkin);
  if (skin) {
    if (skin.bonusType === 'clickPower') clickPower += skin.bonusValue;
    if (skin.bonusType === 'autoRate') autoRate += skin.bonusValue;
    if (skin.bonusType === 'multiplier') multiplier *= skin.bonusValue;
  }

  for (const upg of UPGRADES) {
    const owned = upgrades[upg.id] ?? 0;
    if (owned === 0) continue;
    if (upg.effectType === 'clickPower') clickPower += upg.effectValue * owned;
    if (upg.effectType === 'autoRate') autoRate += upg.effectValue * owned;
    if (upg.effectType === 'multiplier') multiplier *= Math.pow(upg.effectValue, owned);
  }

  if (godMode) multiplier *= 9999;
  return { clickPower, autoRate, multiplier };
}

async function loadSave(userId: string): Promise<Partial<SaveData> | null> {
  const { data } = await supabase
    .from('game_saves')
    .select('game_data')
    .eq('user_id', userId)
    .maybeSingle();
  return data?.game_data ?? null;
}

async function persistSave(userId: string, state: GameState) {
  const saveData: SaveData = {
    crumbs: state.crumbs,
    totalCrumbs: state.totalCrumbs,
    upgrades: state.upgrades,
    usedCodes: state.usedCodes,
    secretAutoBonus: state.secretAutoBonus,
    secretClickBonus: state.secretClickBonus,
    ownedSkins: state.ownedSkins,
    equippedSkin: state.equippedSkin,
    godMode: state.godMode,
  };
  await supabase.from('game_saves').upsert({ user_id: userId, game_data: saveData, updated_at: new Date().toISOString() });
}

let particleCounter = 0;

export function useGameState(userId: string | null) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);
  const [saveLoaded, setSaveLoaded] = useState(false);
  const stateRef = useRef(state);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  stateRef.current = state;

  useEffect(() => {
    if (!userId) {
      setState(DEFAULT_STATE);
      setSaveLoaded(true);
      return;
    }
    setSaveLoaded(false);
    loadSave(userId).then(saved => {
      if (saved) {
        setState(prev => ({
          ...prev,
          crumbs: saved.crumbs ?? prev.crumbs,
          totalCrumbs: saved.totalCrumbs ?? prev.totalCrumbs,
          upgrades: saved.upgrades ?? prev.upgrades,
          usedCodes: saved.usedCodes ?? prev.usedCodes,
          secretAutoBonus: saved.secretAutoBonus ?? prev.secretAutoBonus,
          secretClickBonus: saved.secretClickBonus ?? prev.secretClickBonus,
          ownedSkins: saved.ownedSkins ?? prev.ownedSkins,
          equippedSkin: saved.equippedSkin ?? prev.equippedSkin,
          godMode: saved.godMode ?? false,
        }));
      }
      setSaveLoaded(true);
    });
  }, [userId]);

  useEffect(() => {
    if (!userId || !saveLoaded) return;
    const interval = setInterval(() => {
      persistSave(userId, stateRef.current);
    }, 30000);
    return () => clearInterval(interval);
  }, [userId, saveLoaded]);

  useEffect(() => {
    if (!userId || !saveLoaded) return;
    const handleUnload = () => persistSave(userId, stateRef.current);
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [userId, saveLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;
      const { autoRate, multiplier } = computeStats(s.upgrades, s.secretClickBonus, s.secretAutoBonus, s.equippedSkin, s.godMode);
      if (autoRate === 0) return;
      const boostMult = s.activeBooster && Date.now() < s.activeBooster.endsAt ? s.activeBooster.multiplier : 1;
      const earned = (autoRate * multiplier * boostMult) / 10;
      setState(prev => {
        let newBooster = prev.activeBooster;
        if (newBooster && Date.now() >= newBooster.endsAt) newBooster = null;
        return { ...prev, crumbs: prev.crumbs + earned, totalCrumbs: prev.totalCrumbs + earned, activeBooster: newBooster };
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleClick = useCallback((x: number, y: number) => {
    setState(prev => {
      const { clickPower, multiplier } = computeStats(prev.upgrades, prev.secretClickBonus, prev.secretAutoBonus, prev.equippedSkin, prev.godMode);
      const boostMult = prev.activeBooster && Date.now() < prev.activeBooster.endsAt ? prev.activeBooster.multiplier : 1;
      const earned = clickPower * multiplier * boostMult;
      const particle: Particle = { id: ++particleCounter, x, y, value: Math.round(earned) };
      let newBooster = prev.activeBooster;
      if (newBooster && Date.now() >= newBooster.endsAt) newBooster = null;
      return {
        ...prev,
        crumbs: prev.crumbs + earned,
        totalCrumbs: prev.totalCrumbs + earned,
        particles: [...prev.particles.slice(-20), particle],
        isClicking: true,
        activeBooster: newBooster,
      };
    });
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setState(prev => ({ ...prev, isClicking: false })), 120);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setState(prev => ({ ...prev, particles: prev.particles.filter(p => p.id !== id) }));
  }, []);

  const buyUpgrade = useCallback((upgradeId: string) => {
    setState(prev => {
      const upg = UPGRADES.find(u => u.id === upgradeId);
      if (!upg) return prev;
      const owned = prev.upgrades[upgradeId] ?? 0;
      const cost = getUpgradeCost(upg, owned);
      if (prev.crumbs < cost) return prev;
      return { ...prev, crumbs: prev.crumbs - cost, upgrades: { ...prev.upgrades, [upgradeId]: owned + 1 } };
    });
  }, []);

  const activateBooster = useCallback((boosterId: string) => {
    setState(prev => {
      const booster = BOOSTERS.find(b => b.id === boosterId);
      if (!booster) return prev;
      if (prev.crumbs < booster.cost) return prev;
      if (prev.activeBooster) return prev;
      const lastUsed = prev.boosterLastUsed[boosterId] ?? 0;
      if (Date.now() - lastUsed < booster.cooldown) return prev;
      return {
        ...prev,
        crumbs: prev.crumbs - booster.cost,
        activeBooster: { id: boosterId, multiplier: booster.multiplier, endsAt: Date.now() + booster.duration },
        boosterLastUsed: { ...prev.boosterLastUsed, [boosterId]: Date.now() },
      };
    });
  }, []);

  const buySkin = useCallback((skinId: string) => {
    setState(prev => {
      const skin = SKINS.find(s => s.id === skinId);
      if (!skin) return prev;
      if (prev.ownedSkins.includes(skinId)) return prev;
      if (prev.crumbs < skin.cost) return prev;
      return { ...prev, crumbs: prev.crumbs - skin.cost, ownedSkins: [...prev.ownedSkins, skinId] };
    });
  }, []);

  const equipSkin = useCallback((skinId: string) => {
    setState(prev => {
      if (!prev.ownedSkins.includes(skinId)) return prev;
      return { ...prev, equippedSkin: skinId };
    });
  }, []);

  const redeemCode = useCallback((code: string): { success: boolean; message: string; isAdmin?: boolean } => {
    const normalized = code.toLowerCase().trim();
    if (normalized === HIDDEN_ADMIN_CODE) return { success: true, message: 'Admin access granted.', isAdmin: true };

    const secretCode = SECRET_CODES.find(c => c.code === normalized);
    if (!secretCode) return { success: false, message: 'Unknown code. Keep digging...' };
    if (stateRef.current.usedCodes.includes(normalized)) return { success: false, message: 'Already redeemed. One per toaster!' };

    setState(prev => {
      if (prev.usedCodes.includes(normalized)) return prev;
      const crumbBonus = secretCode.reward.crumbs ?? 0;
      let newBooster = prev.activeBooster;
      if (secretCode.reward.booster) {
        newBooster = { id: secretCode.reward.booster.id, multiplier: secretCode.reward.booster.multiplier, endsAt: Date.now() + secretCode.reward.booster.duration };
      }
      const newOwnedSkins = secretCode.reward.skinUnlock && !prev.ownedSkins.includes(secretCode.reward.skinUnlock)
        ? [...prev.ownedSkins, secretCode.reward.skinUnlock]
        : prev.ownedSkins;
      return {
        ...prev,
        crumbs: prev.crumbs + crumbBonus,
        totalCrumbs: prev.totalCrumbs + crumbBonus,
        usedCodes: [...prev.usedCodes, normalized],
        activeBooster: newBooster,
        secretAutoBonus: prev.secretAutoBonus + (secretCode.reward.autoBonus ?? 0),
        secretClickBonus: prev.secretClickBonus + (secretCode.reward.clickBonus ?? 0),
        ownedSkins: newOwnedSkins,
      };
    });

    return { success: true, message: secretCode.message };
  }, []);

  const grantCrumbs = useCallback((amount: number) => {
    setState(prev => ({ ...prev, crumbs: prev.crumbs + amount, totalCrumbs: prev.totalCrumbs + amount }));
  }, []);

  const toggleGodMode = useCallback(() => {
    setState(prev => ({ ...prev, godMode: !prev.godMode }));
  }, []);

  const maxAllUpgrades = useCallback(() => {
    setState(prev => {
      const maxed: Record<string, number> = {};
      for (const upg of UPGRADES) maxed[upg.id] = 10;
      return { ...prev, upgrades: maxed };
    });
  }, []);

  const unlockAllSkins = useCallback(() => {
    setState(prev => ({ ...prev, ownedSkins: SKINS.map(s => s.id) }));
  }, []);

  const stats = computeStats(state.upgrades, state.secretClickBonus, state.secretAutoBonus, state.equippedSkin, state.godMode);

  return {
    state, stats, saveLoaded,
    handleClick, removeParticle,
    buyUpgrade, activateBooster,
    buySkin, equipSkin,
    redeemCode,
    grantCrumbs, toggleGodMode, maxAllUpgrades, unlockAllSkins,
  };
}
