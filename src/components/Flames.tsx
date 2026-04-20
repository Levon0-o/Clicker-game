interface FlameProps {
  boostActive?: boolean;
  skinId?: string;
}

interface SingleFlame {
  left: string;
  width: number;
  height: number;
  colorOuter: string;
  colorInner: string;
  colorCore: string;
  animClass: string;
  speed: string;
  delay: string;
  zIndex: number;
}

const BASE_FLAMES: SingleFlame[] = [
  { left: '5%',  width: 28, height: 55, colorOuter: '#7f1d1d', colorInner: '#ef4444', colorCore: '#fbbf24', animClass: 'flame-2', speed: '0.9s', delay: '0s',    zIndex: 1 },
  { left: '15%', width: 22, height: 42, colorOuter: '#991b1b', colorInner: '#f97316', colorCore: '#fef08a', animClass: 'flame-3', speed: '0.7s', delay: '0.15s', zIndex: 2 },
  { left: '26%', width: 32, height: 70, colorOuter: '#7f1d1d', colorInner: '#dc2626', colorCore: '#fbbf24', animClass: 'flame-1', speed: '0.8s', delay: '0.05s', zIndex: 1 },
  { left: '37%', width: 26, height: 52, colorOuter: '#92400e', colorInner: '#f97316', colorCore: '#fef9c3', animClass: 'flame-2', speed: '1.0s', delay: '0.25s', zIndex: 2 },
  { left: '47%', width: 36, height: 80, colorOuter: '#7f1d1d', colorInner: '#ef4444', colorCore: '#fde68a', animClass: 'flame-1', speed: '0.75s', delay: '0s',   zIndex: 1 },
  { left: '58%', width: 28, height: 60, colorOuter: '#991b1b', colorInner: '#f97316', colorCore: '#fbbf24', animClass: 'flame-3', speed: '0.85s', delay: '0.1s', zIndex: 2 },
  { left: '68%', width: 30, height: 65, colorOuter: '#7f1d1d', colorInner: '#dc2626', colorCore: '#fef08a', animClass: 'flame-2', speed: '0.95s', delay: '0.2s', zIndex: 1 },
  { left: '78%', width: 22, height: 48, colorOuter: '#92400e', colorInner: '#fb923c', colorCore: '#fef9c3', animClass: 'flame-1', speed: '0.7s', delay: '0.3s',  zIndex: 2 },
  { left: '88%', width: 26, height: 54, colorOuter: '#7f1d1d', colorInner: '#ef4444', colorCore: '#fbbf24', animClass: 'flame-3', speed: '0.8s', delay: '0.08s', zIndex: 1 },
];

export default function Flames({ boostActive = false, skinId = 'classic' }: FlameProps) {
  const isGalaxy = skinId === 'galaxy';
  const isBurnt = skinId === 'burnt';
  const scale = boostActive ? 1.5 : 1;

  return (
    <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ height: 0 }}>
      {BASE_FLAMES.map((f, i) => (
        <div
          key={i}
          className={`absolute ${f.animClass}`}
          style={{
            left: f.left,
            bottom: 0,
            width: f.width * scale,
            height: f.height * scale,
            transformOrigin: 'bottom center',
            '--speed': f.speed,
            '--delay': f.delay,
            zIndex: f.zIndex,
            background: isGalaxy
              ? `radial-gradient(ellipse 60% 80% at 50% 100%, #0e7490 0%, #22d3ee 40%, #a7f3d0 80%, transparent 100%)`
              : isBurnt
              ? `radial-gradient(ellipse 60% 80% at 50% 100%, #7f1d1d 0%, #b91c1c 35%, #f97316 70%, #fef08a 90%, transparent 100%)`
              : `radial-gradient(ellipse 60% 80% at 50% 100%, ${f.colorOuter} 0%, ${f.colorInner} 40%, ${f.colorCore} 80%, transparent 100%)`,
            borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
            transition: 'width 0.3s, height 0.3s',
          } as React.CSSProperties}
        />
      ))}
      {boostActive && BASE_FLAMES.map((f, i) => (
        <div
          key={`boost-${i}`}
          className={`absolute ${f.animClass}`}
          style={{
            left: f.left,
            bottom: 0,
            width: f.width * 0.6,
            height: f.height * 2.2,
            transformOrigin: 'bottom center',
            '--speed': f.speed,
            '--delay': `${parseFloat(f.delay) + 0.12}s`,
            zIndex: 0,
            background: `radial-gradient(ellipse 60% 80% at 50% 100%, rgba(251,191,36,0.8) 0%, rgba(251,146,60,0.5) 50%, transparent 100%)`,
            borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
