import { useEffect, useState } from "react";

interface Particle { id: number; left: number; size: number; duration: number; delay: number; }

export const Atmosphere = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const arr: Particle[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 18 + Math.random() * 22,
      delay: -Math.random() * 30,
    }));
    setParticles(arr);
  }, []);

  return (
    <>
      {/* Floating gold particles */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-gold-glow/60 blur-[1px]"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              bottom: `-10vh`,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 3}px hsl(var(--gold-glow) / 0.6)`,
            }}
          />
        ))}
      </div>
      {/* Film grain */}
      <div className="film-grain" aria-hidden />
    </>
  );
};
