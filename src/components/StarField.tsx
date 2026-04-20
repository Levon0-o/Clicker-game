import { useMemo } from 'react';

interface Star {
  id: string;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
}

interface MilkyWayStar {
  id: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 220 }, (_, i) => ({
      id: `s_${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.75 ? 1 : Math.random() < 0.6 ? 2 : Math.random() < 0.4 ? 3 : 4,
      duration: `${2 + Math.random() * 5}s`,
      delay: `${Math.random() * 6}s`,
      color: Math.random() < 0.08
        ? `rgba(255,220,180,1)`
        : Math.random() < 0.05
        ? `rgba(180,210,255,1)`
        : `rgba(255,255,255,1)`,
    }));
  }, []);

  const milkyWayStars = useMemo<MilkyWayStar[]>(() => {
    return Array.from({ length: 350 }, (_, i) => {
      const t = i / 350;
      const centerLeft = t * 115 - 8;
      const centerTop = 85 - t * 68;
      const spread = 14;
      const offset = (Math.random() - 0.5) * spread * 2;
      const angle = Math.atan2(-68, 115);
      const perpLeft = centerLeft + offset * Math.sin(angle);
      const perpTop = centerTop + offset * Math.cos(angle);
      return {
        id: `mw_${i}`,
        left: `${perpLeft}%`,
        top: `${perpTop}%`,
        size: 1,
        opacity: 0.2 + Math.random() * 0.5,
        duration: `${3 + Math.random() * 5}s`,
        delay: `${Math.random() * 7}s`,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(118deg, transparent 25%, rgba(180,210,255,0.028) 38%, rgba(210,230,255,0.055) 48%, rgba(180,210,255,0.035) 58%, transparent 72%)',
            'radial-gradient(ellipse at 20% 50%, rgba(30,20,10,0.35) 0%, transparent 55%)',
            'radial-gradient(ellipse at 80% 15%, rgba(10,8,25,0.3) 0%, transparent 45%)',
          ].join(', '),
        }}
      />

      {milkyWayStars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: `rgba(210,228,255,${star.opacity})`,
            '--duration': star.duration,
            '--delay': star.delay,
          } as React.CSSProperties}
        />
      ))}

      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            '--duration': star.duration,
            '--delay': star.delay,
          } as React.CSSProperties}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 25% at 45% 42%, rgba(180,210,255,0.04) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
