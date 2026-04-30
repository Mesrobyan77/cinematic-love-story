import { ChapterIntro } from "@/components/chapters/ChapterIntro";
import { ChapterJourney } from "@/components/chapters/ChapterJourney";
import { ChapterInvitation } from "@/components/chapters/ChapterInvitation";
import { ChapterCountdown } from "@/components/chapters/ChapterCountdown";
import { ChapterGallery } from "@/components/chapters/ChapterGallery";
import { ChapterTheDay } from "@/components/chapters/ChapterTheDay";
import { ChapterRSVP } from "@/components/chapters/ChapterRSVP";
import { ChapterFinale } from "@/components/chapters/ChapterFinale";
import { Atmosphere } from "@/components/Atmosphere";
import { MusicToggle } from "@/components/MusicToggle";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Ամելիա և Ջուլիան — Կինեմատոգրաֆիկ Հարսանյաց Հրավեր";
    const desc = document.querySelector('meta[name="description"]');
    const content = "Միացե՛ք Ամելիային և Ջուլիանին 2026 թվականի սեպտեմբերի 14-ին Վիլլա Բելմոնտեում, Կոմո լիճ — կինեմատոգրաֆիկ հարսանյաց հրավեր:";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="relative bg-ivory text-charcoal overflow-x-hidden">
      <Atmosphere />
      <MusicToggle />

      <ChapterIntro />
      <ChapterJourney />
      <ChapterInvitation />
      <ChapterCountdown />
      <ChapterGallery />
      <ChapterTheDay />
      <ChapterRSVP />
      <ChapterFinale />
    </main>
  );
};

export default Index;
