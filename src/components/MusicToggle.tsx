import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

// Embedded ambient cinematic loop (royalty-free style placeholder)
// Using a gentle SoundHelix track as a stand-in until user provides their own.
const TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const toggle = async () => {
    if (!audioRef.current) {
      const a = new Audio(TRACK_URL);
      a.loop = true;
      a.volume = 0.28;
      audioRef.current = a;
    }
    const a = audioRef.current;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        /* autoplay blocked silently */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Դադարեցնել երաժշտությունը" : "Միացնել երաժշտությունը"}
      className={`fixed bottom-6 right-6 z-50 glass-panel rounded-full w-14 h-14 flex items-center justify-center text-charcoal hover:text-gold transition-all duration-700 ease-cinema ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${playing ? "animate-pulse-glow" : ""}`}
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
};
