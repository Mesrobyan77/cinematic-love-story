import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const TARGET = new Date("2026-09-14T16:00:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="glass-panel rounded-sm px-4 py-6 md:px-8 md:py-10 text-center min-w-[78px] md:min-w-[130px]">
    <div className="font-display text-4xl md:text-7xl text-charcoal tabular-nums leading-none">
      {String(value).padStart(2, "0")}
    </div>
    <div className="mt-3 font-serif-light tracking-[0.3em] uppercase text-[10px] md:text-xs text-charcoal-mute">{label}</div>
  </div>
);

export const ChapterCountdown = () => {
  const [t, setT] = useState(calc);
  const { ref, visible } = useReveal<HTMLElement>();
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 bg-ivory-deep overflow-hidden">
      <div className="absolute inset-0 bg-gradient-focus opacity-40" aria-hidden />
      <div className={`relative max-w-5xl mx-auto text-center reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-4">CHAPTER · 04</p>
        <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-4">The Countdown</h2>
        <p className="font-script text-gold text-2xl mb-16">until we say "I do"</p>

        <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
          <Cell value={t.d} label="Days" />
          <Cell value={t.h} label="Hours" />
          <Cell value={t.m} label="Minutes" />
          <Cell value={t.s} label="Seconds" />
        </div>
      </div>
    </section>
  );
};
