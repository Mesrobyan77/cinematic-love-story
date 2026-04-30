import { useReveal } from "@/hooks/use-reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import j2 from "@/assets/journey-2.jpg";
import j3 from "@/assets/journey-3.jpg";

const items = [
  { src: g2, span: "md:row-span-2", caption: "golden hour" },
  { src: g1, span: "", caption: "in bloom" },
  { src: g4, span: "", caption: "candlelight" },
  { src: g3, span: "md:row-span-2", caption: "promise" },
  { src: j3, span: "", caption: "the question" },
  { src: j2, span: "", caption: "laughter" },
];

const Tile = ({ it, i }: { it: typeof items[number]; i: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-sm shadow-soft cursor-pointer ${it.span} reveal`}
      style={{ transitionDelay: `${(i % 4) * 0.12}s` }}
    >
      <img
        src={it.src}
        alt={it.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-[2200ms] ease-cinema group-hover:scale-110 group-hover:brightness-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-1000 ease-cinema" />
      <div className="absolute bottom-5 left-5 right-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-cinema">
        <p className="font-script text-ivory text-2xl drop-shadow-lg">{it.caption}</p>
      </div>
    </div>
  );
};

export const ChapterGallery = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-4">CHAPTER · 05</p>
          <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-4">The Gallery</h2>
          <p className="font-script text-gold text-2xl">moments framed in light</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[200px] md:auto-rows-[260px]">
          {items.map((it, i) => <Tile key={i} it={it} i={i} />)}
        </div>
      </div>
    </section>
  );
};
