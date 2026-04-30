import { useReveal } from "@/hooks/use-reveal";

export const ChapterFinale = () => {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(var(--ivory-soft)) 0%, hsl(25 15% 12%) 100%)" }}
    >
      <div className={`relative z-10 text-center max-w-3xl reveal reveal-slow ${visible ? "is-visible" : ""}`}>
        <p className="font-serif-light tracking-[0.5em] text-gold/80 text-xs mb-8">FINAL SCENE</p>
        <h2 className="font-display text-ivory text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
          And so, the story
          <span className="block italic text-gold-glow font-serif-light">begins.</span>
        </h2>

        <div className="my-12 ornament-line">
          <span className="font-script text-gold-glow text-3xl">A &amp; J</span>
        </div>

        <p className="font-serif-light italic text-ivory/70 text-xl md:text-2xl leading-relaxed max-w-xl mx-auto">
          With love, gratitude, and endless light — thank you for being a part of our chapter.
        </p>

        <p className="mt-16 font-serif-light tracking-[0.5em] uppercase text-ivory/40 text-[10px]">
          Fin · 14 . 09 . 2026
        </p>
      </div>

      {/* soft bottom dissolve */}
      <div className="absolute inset-0 bg-gradient-vignette pointer-events-none" />
    </section>
  );
};
