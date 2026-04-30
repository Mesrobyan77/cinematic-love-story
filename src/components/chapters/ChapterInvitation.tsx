import { useReveal } from "@/hooks/use-reveal";

export const ChapterInvitation = () => {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center px-6 py-32 overflow-hidden bg-gradient-cinematic"
    >
      {/* soft light sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-0 -left-1/2 w-1/2 h-full bg-gradient-to-r from-transparent via-ivory/40 to-transparent animate-light-sweep" style={{ animationDuration: "8s" }} />
      </div>

      <div className={`relative z-10 text-center max-w-3xl reveal reveal-slow ${visible ? "is-visible" : ""}`}>
        <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-8">CHAPTER · 03</p>
        <p className="font-script text-gold text-3xl md:text-4xl mb-10">together with our families</p>

        <h2 className="font-display text-charcoal text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-12 text-balance">
          We invite you to
          <span className="block italic font-serif-light text-gold-glow text-4xl md:text-6xl my-3">
            celebrate the beginning
          </span>
          of forever
        </h2>

        <div className="flex items-center justify-center gap-8 my-12">
          <div className="h-px w-16 bg-gold/60" />
          <div className="text-center">
            <p className="font-serif-light text-charcoal-mute uppercase tracking-[0.4em] text-xs mb-2">Save the date</p>
            <p className="font-display text-charcoal text-3xl md:text-4xl">14 · 09 · 2026</p>
            <p className="font-serif-light italic text-charcoal-mute mt-2">Villa Belmonte · Lake Como</p>
          </div>
          <div className="h-px w-16 bg-gold/60" />
        </div>

        <p className="font-serif-light text-charcoal-mute text-xl md:text-2xl italic max-w-xl mx-auto leading-relaxed">
          "And in her smile, I saw something more beautiful than the stars."
        </p>
      </div>
    </section>
  );
};
