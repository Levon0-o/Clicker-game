import { useRef } from 'react';
import Flames from './Flames';
import FloatingParticle from './FloatingParticle';
import ToastSkinSVG from './ToastSkinSVG';
import { Particle } from '../types/game';

interface Props {
  isClicking: boolean;
  boostActive: boolean;
  equippedSkin: string;
  particles: Particle[];
  onRemoveParticle: (id: number) => void;
  onToastClick: (x: number, y: number) => void;
}

export default function ToastButton({ isClicking, boostActive, equippedSkin, particles, onRemoveParticle, onToastClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    onToastClick(e.clientX - rect.left, e.clientY - rect.top);
  }

  return (
    <div ref={containerRef} className="relative select-none" style={{ width: 220, height: 220 }}>
      {particles.map(p => (
        <FloatingParticle key={p.id} particle={p} onDone={onRemoveParticle} />
      ))}

      <div
        className={`cursor-pointer relative z-10 ${isClicking ? 'toast-clicking' : 'toast-idle'}`}
        style={{ width: 220, height: 220 }}
        onClick={handleClick}
      >
        <ToastSkinSVG skinId={equippedSkin} />

        <div className="absolute inset-x-0 bottom-0" style={{ height: 110 }}>
          <Flames boostActive={boostActive} skinId={equippedSkin} />
        </div>
      </div>
    </div>
  );
}
