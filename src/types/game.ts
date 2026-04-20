export interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costScale: number;
  effectType: 'clickPower' | 'autoRate' | 'multiplier';
  effectValue: number;
  icon: string;
}

export interface BoosterItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number;
  multiplier: number;
  cooldown: number;
  icon: string;
  colorFrom: string;
  colorTo: string;
}

export interface ToastSkin {
  id: string;
  name: string;
  description: string;
  cost: number;
  bonusType: 'multiplier' | 'clickPower' | 'autoRate' | 'none';
  bonusValue: number;
  bonusLabel: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SecretCodeReward {
  crumbs?: number;
  booster?: { id: string; multiplier: number; duration: number };
  autoBonus?: number;
  clickBonus?: number;
  skinUnlock?: string;
}

export interface SecretCode {
  code: string;
  label: string;
  message: string;
  reward: SecretCodeReward;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  value: number;
}
