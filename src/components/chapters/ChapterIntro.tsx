import heroImg from "@/assets/hero.jpg";
import { useScrollProgress } from "@/hooks/use-reveal";

export const ChapterIntro = () => {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  // parallax on background
  const translateY = progress * 120;
  const scale = 1 + progress * 0.08;
  const overlay = 0.35 + progress * 0.4;

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`, transition: "transform 0.1s linear" }}
      >
        <img
          src={heroImg}
          alt="Cinematic portrait of the couple at golden hour"
          className="w-full h-full object-cover ken-burns"
          width={1920}
          height={1080}
        />
      </div>
      {/* Vignette + warm wash */}
      <div className="absolute inset-0 bg-gradient-vignette" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{ background: `linear-gradient(180deg, hsl(25 30% 10% / ${overlay * 0.5}) 0%, transparent 50%, hsl(35 30% 90% / ${overlay}) 100%)` }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="font-serif-light tracking-[0.5em] text-ivory/90 text-xs md:text-sm mb-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          CHAPTER · 01
        </p>
        <p className="font-script text-gold-glow text-2xl md:text-3xl mb-6 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          how it started
        </p>
        <h1 className="font-display text-ivory text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] text-balance">
          <span className="inline-block animate-letter-in" style={{ animationDelay: "1.2s" }}>Amelia</span>
          <span className="block font-serif-light italic text-3xl md:text-5xl my-3 text-gold-glow animate-letter-in" style={{ animationDelay: "1.6s" }}>
            &amp;
          </span>
          <span className="inline-block animate-letter-in" style={{ animationDelay: "2s" }}>Julian</span>
        </h1>
        <div className="mt-10 animate-fade-up" style={{ animationDelay: "2.6s" }}>
          <span className="ornament-line font-serif-light text-ivory/80 text-sm tracking-[0.4em] uppercase">
            A Love Film
          </span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-up" style={{ animationDelay: "3s" }}>
        <div className="flex flex-col items-center gap-3 text-ivory/70">
          <span className="font-serif-light text-xs tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-14 bg-gradient-to-b from-ivory/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};
