import { useReveal } from "@/hooks/use-reveal";
import j1 from "@/assets/journey-1.jpg";
import j2 from "@/assets/journey-2.jpg";
import j3 from "@/assets/journey-3.jpg";

const moments = [
  { year: "2019", title: "First Glance", text: "A rainy afternoon in a quiet café. Two strangers, one shared umbrella, and the start of everything.", img: j1, align: "left" },
  { year: "2021", title: "Becoming Us", text: "Late dinners, long conversations, and the realisation that home was no longer a place — but a person.", img: j2, align: "right" },
  { year: "2024", title: "The Promise", text: "On a cliff above the ocean, between sunlight and silence, one question changed everything.", img: j3, align: "left" },
];

const Moment = ({ m, i }: { m: typeof moments[number]; i: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isLeft = m.align === "left";
  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <div className={`${isLeft ? "md:order-1" : "md:order-2"} relative group`}>
        <div className="relative overflow-hidden rounded-sm shadow-soft aspect-[4/5]">
          <img
            src={m.img}
            alt={m.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[2200ms] ease-cinema group-hover:scale-105 ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>
        <div className="absolute -inset-1 -z-10 bg-gradient-focus blur-2xl opacity-60" />
      </div>
      <div className={`${isLeft ? "md:order-2" : "md:order-1"} space-y-6`}>
        <span className="font-serif-light text-gold tracking-[0.4em] text-sm">{m.year}</span>
        <h3 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">{m.title}</h3>
        <div className="w-16 h-px bg-gold/60" />
        <p className="font-serif-light text-charcoal-mute text-xl md:text-2xl leading-relaxed text-pretty">{m.text}</p>
      </div>
    </div>
  );
};

export const ChapterJourney = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-24">
          <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-4">CHAPTER · 02</p>
          <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-4">Our Journey</h2>
          <p className="font-script text-gold text-2xl">a story written in moments</p>
        </header>
        <div className="space-y-32 md:space-y-48">
          {moments.map((m, i) => <Moment key={m.year} m={m} i={i} />)}
        </div>
      </div>
    </section>
  );
};
