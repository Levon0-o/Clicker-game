interface Props {
  skinId: string;
}

export default function ToastSkinSVG({ skinId }: Props) {
  if (skinId === 'burnt') return <BurntToast />;
  if (skinId === 'sourdough_skin') return <SourdoughToast />;
  if (skinId === 'honey') return <HoneyToast />;
  if (skinId === 'avocado') return <AvocadoToast />;
  if (skinId === 'galaxy') return <GalaxyToast />;
  return <ClassicToast />;
}

function ClassicToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="cg" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="65%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <radialGradient id="cr" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="transparent" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <filter id="ts"><feDropShadow dx="3" dy="5" stdDeviation="6" floodColor="#78350f" floodOpacity="0.5" /></filter>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#cg)" filter="url(#ts)" />
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#cr)" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#b45309" strokeWidth="3" strokeOpacity="0.5" />
      <ellipse cx="78" cy="75" rx="5" ry="4" fill="#b45309" fillOpacity="0.35" />
      <ellipse cx="95" cy="95" rx="4" ry="3" fill="#b45309" fillOpacity="0.3" />
      <ellipse cx="140" cy="70" rx="6" ry="4.5" fill="#b45309" fillOpacity="0.3" />
      <ellipse cx="160" cy="105" rx="4" ry="3" fill="#b45309" fillOpacity="0.25" />
      <ellipse cx="120" cy="140" rx="5" ry="4" fill="#b45309" fillOpacity="0.3" />
      <ellipse cx="75" cy="130" rx="4" ry="3" fill="#b45309" fillOpacity="0.25" />
      <ellipse cx="155" cy="145" rx="5" ry="3.5" fill="#b45309" fillOpacity="0.28" />
      <ellipse cx="108" cy="108" rx="7" ry="5.5" fill="#b45309" fillOpacity="0.2" />
      <ellipse cx="75" cy="65" rx="18" ry="12" fill="#fef9c3" fillOpacity="0.35" transform="rotate(-20 75 65)" />
    </svg>
  );
}

function BurntToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#292524" />
          <stop offset="50%" stopColor="#1c1917" />
          <stop offset="100%" stopColor="#0c0a09" />
        </radialGradient>
        <radialGradient id="bcr" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0c0a09" />
        </radialGradient>
        <filter id="bts">
          <feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#f97316" floodOpacity="0.4" />
        </filter>
        <radialGradient id="ember1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#bg)" filter="url(#bts)" />
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#bcr)" />
      <line x1="55" y1="40" x2="70" y2="80" stroke="#3b2e2a" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="30" x2="88" y2="75" stroke="#3b2e2a" strokeWidth="2" strokeLinecap="round" />
      <line x1="130" y1="35" x2="145" y2="70" stroke="#3b2e2a" strokeWidth="3" strokeLinecap="round" />
      <line x1="165" y1="55" x2="155" y2="95" stroke="#3b2e2a" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="110" x2="80" y2="150" stroke="#3b2e2a" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="140" y1="120" x2="125" y2="165" stroke="#3b2e2a" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="130" x2="115" y2="175" stroke="#3b2e2a" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="85" cy="80" rx="8" ry="6" fill="url(#ember1)" />
      <ellipse cx="148" cy="95" rx="6" ry="5" fill="url(#ember1)" />
      <ellipse cx="70" cy="145" rx="7" ry="5" fill="url(#ember1)" />
      <ellipse cx="140" cy="150" rx="5" ry="4" fill="url(#ember1)" />
      <ellipse cx="110" cy="65" rx="5" ry="4" fill="url(#ember1)" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#78350f" strokeWidth="2" strokeOpacity="0.4" />
    </svg>
  );
}

function SourdoughToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="sdg" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="35%" stopColor="#fde68a" />
          <stop offset="70%" stopColor="#d4a456" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
        <filter id="sds"><feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#92400e" floodOpacity="0.5" /></filter>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#sdg)" filter="url(#sds)" />
      <path d="M50 110 L110 50 L170 110" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
      <path d="M50 130 L110 70 L170 130" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.35" />
      <ellipse cx="72" cy="75" rx="9" ry="7" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="118" cy="58" rx="7" ry="5.5" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.35" />
      <ellipse cx="155" cy="82" rx="8" ry="6" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="62" cy="130" rx="9" ry="7" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.3" />
      <ellipse cx="110" cy="145" rx="11" ry="8" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.35" />
      <ellipse cx="158" cy="135" rx="8" ry="6" fill="none" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.3" />
      <ellipse cx="75" cy="60" rx="20" ry="13" fill="#fefce8" fillOpacity="0.4" transform="rotate(-15 75 60)" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#b45309" strokeWidth="3" strokeOpacity="0.55" />
    </svg>
  );
}

function HoneyToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="hg" cx="45%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="65%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <linearGradient id="honeyDrizzle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
        </linearGradient>
        <filter id="hts"><feDropShadow dx="3" dy="5" stdDeviation="7" floodColor="#78350f" floodOpacity="0.5" /></filter>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#hg)" filter="url(#hts)" />
      <path d="M75 30 Q78 65 72 100 Q76 140 70 185" stroke="url(#honeyDrizzle)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M105 18 Q108 55 102 90 Q106 130 100 185" stroke="url(#honeyDrizzle)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M140 25 Q143 60 137 95 Q141 135 135 185" stroke="url(#honeyDrizzle)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M62 55 Q90 50 85 75 Q80 100 55 90 Q35 80 62 55Z" fill="#fbbf24" fillOpacity="0.5" />
      <path d="M85 75 Q113 70 108 95 Q103 120 78 110 Q58 100 85 75Z" fill="#fbbf24" fillOpacity="0.4" />
      <path d="M128 45 Q156 40 151 65 Q146 90 121 80 Q101 70 128 45Z" fill="#fbbf24" fillOpacity="0.45" />
      <path d="M155 75 Q183 70 178 95 Q173 120 148 110 Q128 100 155 75Z" fill="#fbbf24" fillOpacity="0.4" />
      <path d="M62 100 Q90 95 85 120 Q80 145 55 135 Q35 125 62 100Z" fill="#fbbf24" fillOpacity="0.4" />
      <path d="M128 110 Q156 105 151 130 Q146 155 121 145 Q101 135 128 110Z" fill="#fbbf24" fillOpacity="0.38" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#d97706" strokeWidth="3" strokeOpacity="0.6" />
      <ellipse cx="75" cy="60" rx="20" ry="13" fill="#fefce8" fillOpacity="0.3" transform="rotate(-15 75 60)" />
    </svg>
  );
}

function AvocadoToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="ag" cx="45%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="40%" stopColor="#fde68a" />
          <stop offset="80%" stopColor="#d4a456" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <filter id="ats"><feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#92400e" floodOpacity="0.5" /></filter>
        <radialGradient id="avo" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#d9f99d" />
          <stop offset="50%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" />
        </radialGradient>
        <radialGradient id="avoPit" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#ag)" filter="url(#ats)" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#b45309" strokeWidth="2.5" strokeOpacity="0.4" />
      <ellipse cx="110" cy="95" rx="80" ry="62" fill="url(#avo)" fillOpacity="0.88" />
      <ellipse cx="110" cy="95" rx="30" ry="36" fill="url(#avoPit)" fillOpacity="0.85" />
      <ellipse cx="103" cy="88" rx="8" ry="10" fill="#fef9c3" fillOpacity="0.3" />
      <ellipse cx="110" cy="95" rx="80" ry="62" fill="none" stroke="#4ade80" strokeWidth="2" strokeOpacity="0.4" />
      <circle cx="65" cy="155" r="4" fill="#ef4444" fillOpacity="0.7" />
      <circle cx="80" cy="160" r="3" fill="#ef4444" fillOpacity="0.6" />
      <circle cx="150" cy="152" r="3.5" fill="#ef4444" fillOpacity="0.65" />
      <circle cx="140" cy="162" r="2.5" fill="#ef4444" fillOpacity="0.55" />
      <line x1="50" y1="170" x2="170" y2="170" stroke="#92400e" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" />
    </svg>
  );
}

function GalaxyToast() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <radialGradient id="gg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="60%" stopColor="#0c1124" />
          <stop offset="100%" stopColor="#060810" />
        </radialGradient>
        <radialGradient id="gcr" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <filter id="gts">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#22d3ee" floodOpacity="0.5" />
        </filter>
        <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#gg)" filter="url(#gts)" />
      <rect x="18" y="18" width="184" height="184" rx="22" fill="url(#gcr)" />
      <ellipse cx="100" cy="95" rx="55" ry="35" fill="url(#nebula1)" />
      <ellipse cx="130" cy="130" rx="45" ry="30" fill="url(#nebula2)" />
      <circle cx="55" cy="50" r="1.5" fill="white" fillOpacity="0.9" />
      <circle cx="80" cy="35" r="1" fill="white" fillOpacity="0.8" />
      <circle cx="140" cy="42" r="1.5" fill="#bfdbfe" fillOpacity="0.9" />
      <circle cx="170" cy="58" r="1" fill="white" fillOpacity="0.7" />
      <circle cx="45" cy="85" r="1" fill="white" fillOpacity="0.6" />
      <circle cx="95" cy="55" r="2" fill="white" fillOpacity="0.95" />
      <circle cx="160" cy="88" r="1.5" fill="#a7f3d0" fillOpacity="0.8" />
      <circle cx="65" cy="115" r="1" fill="white" fillOpacity="0.7" />
      <circle cx="150" cy="118" r="1.5" fill="#bfdbfe" fillOpacity="0.85" />
      <circle cx="45" cy="140" r="1" fill="white" fillOpacity="0.6" />
      <circle cx="175" cy="145" r="1" fill="white" fillOpacity="0.7" />
      <circle cx="100" cy="165" r="1.5" fill="white" fillOpacity="0.8" />
      <circle cx="130" cy="172" r="1" fill="#a7f3d0" fillOpacity="0.7" />
      <circle cx="60" cy="170" r="1" fill="white" fillOpacity="0.6" />
      <circle cx="120" cy="80" r="2.5" fill="white" fillOpacity="0.9" />
      <circle cx="80" cy="120" r="2" fill="#bfdbfe" fillOpacity="0.85" />
      <circle cx="155" cy="155" r="2" fill="white" fillOpacity="0.8" />
      <path d="M70 100 Q110 75 150 105 Q170 120 130 140 Q100 155 70 130 Q55 115 70 100Z" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="18" y="18" width="184" height="184" rx="22" fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.35" />
      <rect x="28" y="28" width="164" height="164" rx="16" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  );
}
