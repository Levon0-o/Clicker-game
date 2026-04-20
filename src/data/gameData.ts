import { UpgradeItem, BoosterItem, SecretCode, ToastSkin } from '../types/game';

export const UPGRADES: UpgradeItem[] = [
  { id: 'butter',     name: 'Butter Spread',       description: '+1 crumb per click',   baseCost: 10,        costScale: 1.15, effectType: 'clickPower', effectValue: 1,    icon: '🧈' },
  { id: 'toaster',    name: 'Pop-Up Toaster',       description: '+0.5 crumbs/sec',      baseCost: 50,        costScale: 1.15, effectType: 'autoRate',  effectValue: 0.5,  icon: '🍞' },
  { id: 'sesame',     name: 'Sesame Crunch',        description: '+3 crumbs per click',  baseCost: 200,       costScale: 1.2,  effectType: 'clickPower', effectValue: 3,    icon: '🌾' },
  { id: 'conveyor',   name: 'Bakery Conveyor',      description: '+5 crumbs/sec',        baseCost: 500,       costScale: 1.2,  effectType: 'autoRate',  effectValue: 5,    icon: '⚙️' },
  { id: 'golden',     name: 'Golden Crust',         description: '2x click multiplier',  baseCost: 1000,      costScale: 1.5,  effectType: 'multiplier', effectValue: 2,   icon: '✨' },
  { id: 'farm',       name: 'Wheat Farm',           description: '+20 crumbs/sec',       baseCost: 5000,      costScale: 1.25, effectType: 'autoRate',  effectValue: 20,   icon: '🌻' },
  { id: 'sourdough',  name: 'Sourdough Secret',     description: '+10 crumbs per click', baseCost: 10000,     costScale: 1.3,  effectType: 'clickPower', effectValue: 10,  icon: '🔬' },
  { id: 'factory',    name: 'Toast Factory',        description: '+50 crumbs/sec',       baseCost: 50000,     costScale: 1.3,  effectType: 'autoRate',  effectValue: 50,   icon: '🏭' },
  { id: 'divine',     name: 'Divine Recipe',        description: '5x click multiplier',  baseCost: 100000,    costScale: 2.0,  effectType: 'multiplier', effectValue: 5,   icon: '👑' },
  { id: 'hypertoast', name: 'Hyper Toast',          description: '+200 crumbs/sec',      baseCost: 500000,    costScale: 1.5,  effectType: 'autoRate',  effectValue: 200,  icon: '⚡' },
  { id: 'crumbmagnet',name: 'Crumb Magnet',         description: '+25 crumbs per click', baseCost: 250000,    costScale: 1.35, effectType: 'clickPower', effectValue: 25,  icon: '🧲' },
  { id: 'galactic',   name: 'Galactic Toaster',     description: '+500 crumbs/sec',      baseCost: 1000000,   costScale: 1.4,  effectType: 'autoRate',  effectValue: 500,  icon: '🌌' },
  { id: 'eternalflame',name: 'Eternal Flame',       description: '3x click multiplier',  baseCost: 5000000,   costScale: 2.0,  effectType: 'multiplier', effectValue: 3,   icon: '🕯️' },
  { id: 'voidbakery', name: 'Void Bakery',          description: '+2,000 crumbs/sec',    baseCost: 50000000,  costScale: 1.5,  effectType: 'autoRate',  effectValue: 2000, icon: '🌀' },
  { id: 'breadgod',   name: 'Bread God Mode',       description: '10x click multiplier', baseCost: 500000000, costScale: 2.5,  effectType: 'multiplier', effectValue: 10,  icon: '🌟' },
];

export const BOOSTERS: BoosterItem[] = [
  { id: 'burning',    name: 'Burning Hot!',  description: '3x crumbs for 20s',  cost: 100,    duration: 20000, multiplier: 3,  cooldown: 60000,   icon: '🔥', colorFrom: '#f97316', colorTo: '#dc2626' },
  { id: 'firestorm',  name: 'Fire Storm',    description: '5x crumbs for 15s',  cost: 500,    duration: 15000, multiplier: 5,  cooldown: 120000,  icon: '🌪️', colorFrom: '#fb923c', colorTo: '#b91c1c' },
  { id: 'solar',      name: 'Solar Flare',   description: '10x crumbs for 12s', cost: 2000,   duration: 12000, multiplier: 10, cooldown: 300000,  icon: '☀️', colorFrom: '#fbbf24', colorTo: '#ef4444' },
  { id: 'blazesurge', name: 'Blaze Surge',   description: '15x crumbs for 10s', cost: 5000,   duration: 10000, multiplier: 15, cooldown: 600000,  icon: '💥', colorFrom: '#ef4444', colorTo: '#7f1d1d' },
  { id: 'timewarp',   name: 'Time Warp',     description: '8x crumbs for 45s',  cost: 10000,  duration: 45000, multiplier: 8,  cooldown: 900000,  icon: '⌛', colorFrom: '#60a5fa', colorTo: '#1d4ed8' },
  { id: 'cosmictoast',name: 'Cosmic Toast',  description: '20x crumbs for 8s',  cost: 50000,  duration: 8000,  multiplier: 20, cooldown: 1800000, icon: '🌠', colorFrom: '#22d3ee', colorTo: '#0e7490' },
  { id: 'breadbang',  name: 'Bread Bang',    description: '50x crumbs for 6s',  cost: 200000, duration: 6000,  multiplier: 50, cooldown: 3600000, icon: '💫', colorFrom: '#fbbf24', colorTo: '#92400e' },
];

export const SKINS: ToastSkin[] = [
  {
    id: 'classic',
    name: 'Classic Toast',
    description: 'The original. Never gets old.',
    cost: 0,
    bonusType: 'none',
    bonusValue: 0,
    bonusLabel: 'No bonus',
    rarity: 'common',
  },
  {
    id: 'burnt',
    name: 'Burnt Toast',
    description: 'Charred to perfection. Surprisingly powerful.',
    cost: 500,
    bonusType: 'multiplier',
    bonusValue: 2,
    bonusLabel: '2x all crumbs',
    rarity: 'common',
  },
  {
    id: 'sourdough_skin',
    name: 'Sourdough Special',
    description: 'Ancient starter, artisan scoring. +20 click power.',
    cost: 3000,
    bonusType: 'clickPower',
    bonusValue: 20,
    bonusLabel: '+20 click power',
    rarity: 'rare',
  },
  {
    id: 'honey',
    name: 'Honey Drizzle',
    description: 'Sticky sweet and productive. +200 crumbs/sec.',
    cost: 20000,
    bonusType: 'autoRate',
    bonusValue: 200,
    bonusLabel: '+200 crumbs/sec',
    rarity: 'rare',
  },
  {
    id: 'avocado',
    name: 'Avocado Toast',
    description: 'Millennial power. 3x crumb multiplier.',
    cost: 75000,
    bonusType: 'multiplier',
    bonusValue: 3,
    bonusLabel: '3x all crumbs',
    rarity: 'epic',
  },
  {
    id: 'galaxy',
    name: 'Galaxy Toast',
    description: 'Forged in a dying star. 10x crumb multiplier.',
    cost: 1000000,
    bonusType: 'multiplier',
    bonusValue: 10,
    bonusLabel: '10x all crumbs',
    rarity: 'legendary',
  },
];

export const HIDDEN_ADMIN_CODE = 't0a5t_core';

export const SECRET_CODES: SecretCode[] = [
  {
    code: 'burnt',
    label: 'Burnt Unlock',
    message: 'The char speaks to you. Burnt Toast skin unlocked for free!',
    reward: { skinUnlock: 'burnt' },
  },
  {
    code: 'toast',
    label: 'Classic',
    message: 'Classic move. +2,500 crumbs rained from the sky!',
    reward: { crumbs: 2500 },
  },
  {
    code: 'tost',
    label: 'Typo Master',
    message: "Close enough, spelling champion. Here's +750 crumbs.",
    reward: { crumbs: 750 },
  },
  {
    code: 'toasty',
    label: 'TOASTY!',
    message: 'TOASTY! Free 8x Hellfire boost for 20 seconds!',
    reward: { booster: { id: 'secret_toasty', multiplier: 8, duration: 20000 } },
  },
  {
    code: 'levon',
    label: "Levon's Secret",
    message: "Levon's ancient recipe revealed: +25 crumbs/sec, forever.",
    reward: { autoBonus: 25 },
  },
  {
    code: 'sky',
    label: 'Starfall',
    message: 'The sky splits open! +15,000 crumbs + 25x Starfall for 12s!',
    reward: { crumbs: 15000, booster: { id: 'secret_sky', multiplier: 25, duration: 12000 } },
  },
];

export function getUpgradeCost(upgrade: UpgradeItem, owned: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costScale, owned));
}
