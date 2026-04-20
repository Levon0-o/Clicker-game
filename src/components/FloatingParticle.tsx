import { useEffect } from 'react';
import { Particle } from '../types/game';

interface Props {
  particle: Particle;
  onDone: (id: number) => void;
}

export default function FloatingParticle({ particle, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(particle.id), 900);
    return () => clearTimeout(timer);
  }, [particle.id, onDone]);

  return (
    <div
      className="particle absolute pointer-events-none z-20 font-bold text-sm select-none"
      style={{
        left: particle.x - 20,
        top: particle.y - 30,
        color: particle.value >= 100 ? '#fbbf24' : particle.value >= 10 ? '#fb923c' : '#fde68a',
        textShadow: '0 0 8px rgba(251,146,60,0.8), 0 1px 3px rgba(0,0,0,0.9)',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      }}
    >
      +{particle.value.toLocaleString()}
    </div>
  );
}
