import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Music } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-reveal";

const events = [
  {
    time: "16:00",
    title: "Ceremony",
    place: "Villa Belmonte · Garden Pavilion",
    desc: "Vows beneath an arch of white peonies, as the lake catches the late afternoon light.",
    Icon: Heart,
  },
  {
    time: "18:30",
    title: "Reception",
    place: "The Grand Terrace",
    desc: "Champagne, candlelight, and a six-course dinner overlooking the water.",
    Icon: Sparkles,
  },
  {
    time: "21:00",
    title: "Celebration",
    place: "The Ballroom",
    desc: "Live orchestra, first dance, and dancing until the stars fade.",
    Icon: Music,
  },
];

export const ChapterTheDay = () => {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  // active event index based on progress
  const totalEvents = events.length;
  const activeIndex = Math.min(totalEvents - 1, Math.floor(progress * totalEvents * 1.2));
  const pathProgress = Math.min(1, progress * 1.4);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 bg-gradient-to-b from-ivory via-ivory-deep to-ivory overflow-hidden">
      <header className="text-center mb-20">
        <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-4">CHAPTER · 06</p>
        <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-4">The Day</h2>
        <p className="font-script text-gold text-2xl">a roadmap of joy</p>
      </header>

      <div className="relative max-w-3xl mx-auto">
        {/* The vertical path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-24 pointer-events-none"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* base path */}
          <path
            d="M50 0 C 20 200, 80 400, 50 500 S 20 800, 50 1000"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4 8"
          />
          {/* progress overlay */}
          <path
            d="M50 0 C 20 200, 80 400, 50 500 S 20 800, 50 1000"
            fill="none"
            stroke="hsl(var(--gold-accent))"
            strokeWidth="2.5"
            strokeDasharray="2000"
            strokeDashoffset={2000 - pathProgress * 2000}
            style={{ transition: "stroke-dashoffset 0.2s linear", filter: "drop-shadow(0 0 8px hsl(var(--gold-glow) / 0.6))" }}
          />
        </svg>

        {/* Moving icon */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{
            top: `${pathProgress * 100}%`,
            transform: `translate(-50%, -50%)`,
            transition: "top 0.2s linear",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-gold shadow-glow flex items-center justify-center animate-pulse-glow">
            <Heart className="w-5 h-5 text-ivory fill-ivory" />
          </div>
        </div>

        {/* Events */}
        <div className="space-y-32 relative z-10">
          {events.map((e, i) => {
            const isActive = i <= activeIndex;
            const isLeft = i % 2 === 0;
            const Icon = e.Icon;
            return (
              <div
                key={e.title}
                className={`grid grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center transition-all duration-1000 ease-cinema ${isActive ? "opacity-100" : "opacity-30"}`}
              >
                <div className={`${isLeft ? "" : "invisible"} text-right`}>
                  {isLeft && <EventCard e={e} active={isActive} />}
                </div>
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ease-cinema ${isActive ? "bg-gradient-gold shadow-glow scale-100" : "bg-ivory border border-border scale-90"}`}>
                  <Icon className={`w-5 h-5 transition-colors duration-700 ${isActive ? "text-ivory" : "text-charcoal-mute"}`} />
                </div>
                <div className={`${!isLeft ? "" : "invisible"}`}>
                  {!isLeft && <EventCard e={e} active={isActive} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ e, active }: { e: typeof events[number]; active: boolean }) => (
  <div className={`glass-panel rounded-sm p-6 md:p-8 transition-all duration-1000 ease-cinema ${active ? "translate-y-0 opacity-100 shadow-soft" : "translate-y-6 opacity-70"}`}>
    <p className="font-serif-light text-gold tracking-[0.4em] text-xs mb-2">{e.time}</p>
    <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">{e.title}</h3>
    <p className="font-serif-light italic text-charcoal-mute text-sm mb-3">{e.place}</p>
    <p className="font-body text-charcoal-mute text-sm leading-relaxed">{e.desc}</p>
  </div>
);
