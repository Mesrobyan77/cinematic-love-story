import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { Check, Heart } from "lucide-react";

export const ChapterRSVP = () => {
  const { ref, visible } = useReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 bg-gradient-cinematic overflow-hidden">
      <div className={`relative max-w-2xl mx-auto reveal ${visible ? "is-visible" : ""}`}>
        <header className="text-center mb-12">
          <p className="font-serif-light tracking-[0.5em] text-charcoal-mute text-xs mb-4">ՀԱՍՏԱՏՈՒՄ</p>
          <h2 className="font-display text-5xl md:text-7xl text-charcoal mb-4">Միացե՛ք Պատմությանը</h2>
          <p className="font-script text-gold text-2xl">Ձեր ներկայությունը մեր նվերն է</p>
        </header>

        <div className="glass-panel rounded-sm p-8 md:p-12 shadow-soft">
          {submitted ? (
            <div className="text-center py-10 animate-fade-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-gold flex items-center justify-center mb-6 animate-pulse-glow">
                <Check className="w-8 h-8 text-ivory" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-charcoal mb-3">Շնորհակալություն, {form.name || "սիրելի՛ ընկեր"}։</h3>
              <p className="font-serif-light italic text-charcoal-mute text-lg">Ձեր պատասխանը կնքված է։ Անհամբեր սպասում ենք այս օրը Ձեզ հետ կիսելուն։</p>
              <Heart className="w-5 h-5 mx-auto mt-6 text-gold fill-gold" />
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <Field label="Ձեր անուն ազգանունը">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border px-0 py-2 font-serif-light text-lg text-charcoal placeholder:text-charcoal-mute/60 focus:outline-none focus:border-gold transition-colors duration-500"
                  placeholder="Ամելիա Ռոուզ"
                />
              </Field>

              <div className="grid grid-cols-2 gap-6">
                <Field label="Կներկայանա՞ք">
                  <select
                    value={form.attending}
                    onChange={(e) => setForm({ ...form, attending: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-2 font-serif-light text-lg text-charcoal focus:outline-none focus:border-gold transition-colors duration-500"
                  >
                    <option value="yes">Ուրախությամբ ընդունում եմ</option>
                    <option value="no">Ցավոք, չեմ կարող</option>
                  </select>
                </Field>
                <Field label="Հյուրերի քանակը">
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full bg-transparent border-b border-border px-0 py-2 font-serif-light text-lg text-charcoal focus:outline-none focus:border-gold transition-colors duration-500"
                  >
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Մաղթանք զույգին">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border-b border-border px-0 py-2 font-serif-light text-lg text-charcoal placeholder:text-charcoal-mute/60 focus:outline-none focus:border-gold transition-colors duration-500 resize-none"
                  placeholder="Մաղթում եմ ձեզ ողջ կյանք լի սիրով…"
                />
              </Field>

              <button
                type="submit"
                className="group w-full mt-4 py-4 bg-charcoal text-ivory font-serif-light tracking-[0.4em] uppercase text-sm relative overflow-hidden transition-all duration-700 ease-cinema hover:bg-gold-accent hover:tracking-[0.5em]"
              >
                <span className="relative z-10">Ուղարկել պատասխանը</span>
                <span className="absolute inset-0 bg-gradient-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-cinema" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block font-serif-light tracking-[0.3em] uppercase text-[10px] text-charcoal-mute mb-1">{label}</span>
    {children}
  </label>
);
