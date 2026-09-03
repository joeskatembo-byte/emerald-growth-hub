import { useCallback, useEffect, useState } from "react";
import { verses } from "@/data/mock";
import { ArrowRight, Users, CalendarClock, Sparkles, Quote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TypedVerse } from "@/components/ui/typed-verse";

export function HeroBento() {
  const [verseIdx, setVerseIdx] = useState(0);
  const [count, setCount] = useState(0);
  const target = 1247;
  const handleIndexChange = useCallback((i: number) => setVerseIdx(i), []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setCount(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="mx-auto mt-6 w-[min(1200px,95%)]">
      <div className="grid auto-rows-[minmax(120px,auto)] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {/* Main verse tile */}
        <div className="col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white shadow-soft sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80">
            <Sparkles className="h-3.5 w-3.5" /> Parole du jour
          </div>
          <div className="min-h-[120px]">
            <TypedVerse
              items={verses}
              onIndexChange={handleIndexChange}
              className="font-display text-2xl font-bold leading-tight sm:text-4xl"
              refClassName="mt-2 font-numeric text-xs tracking-wider text-white/70"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {verses.map((_, i) => (
              <span key={i} className={"h-1 rounded-full transition-all " + (i === verseIdx ? "w-8 bg-white" : "w-3 bg-white/30")} />
            ))}
          </div>
        </div>

        {/* Members counter */}
        <div className="hover-lift glass-card flex flex-col justify-between rounded-3xl p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="h-4 w-4" /> Membres</div>
          <div>
            <div className="font-numeric text-3xl font-bold text-foreground sm:text-4xl">{count.toLocaleString("fr-FR")}</div>
            <div className="text-xs text-emerald-700">+34 ce mois</div>
          </div>
        </div>

        {/* Next service */}
        <div className="hover-lift glass-card flex flex-col justify-between rounded-3xl p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarClock className="h-4 w-4" /> Prochain culte</div>
          <div>
            <div className="font-display text-lg font-bold text-foreground">Dimanche</div>
            <div className="font-numeric text-sm text-brand">09h00 · Sanctuaire</div>
          </div>
        </div>

        {/* Community photo tile */}
        <div className="col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-rose-500 to-emerald-700 p-5 pb-12 text-white shadow-soft">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_70%,white_0,transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="text-xs uppercase tracking-widest text-white/80">La communauté</div>
            <div className="font-display text-xl font-bold leading-tight sm:text-2xl">Une église, plusieurs nations.</div>
            <div className="group/av flex -space-x-2 pt-5">

              {[
                { l: "G", n: "Grâce", d: "Louange" },
                { l: "J", n: "Josué", d: "Jeunesse" },
                { l: "E", n: "Esther", d: "Chorale" },
                { l: "M", n: "Marie", d: "Intercession" },
                { l: "C", n: "Célestin", d: "Diaconat" },
              ].map((m, i) => (
                <div
                  key={m.l}
                  className="group/one relative transition-all duration-500 ease-out hover:z-30 group-hover/av:space-x-0 group-hover/av:ml-1 hover:!ml-2"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/50 opacity-0 blur-md transition duration-500 group-hover/one:scale-150 group-hover/one:opacity-100" />
                  <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/70 opacity-0 group-hover/one:animate-ping group-hover/one:opacity-100" />
                  <div className="relative grid h-8 w-8 cursor-pointer place-items-center rounded-full border-2 border-white bg-white/20 backdrop-blur text-[11px] font-bold transition-all duration-500 ease-out group-hover/one:-translate-y-1.5 group-hover/one:scale-125 group-hover/one:bg-white group-hover/one:text-rose-600 group-hover/one:shadow-soft">
                    {m.l}
                  </div>
                  <div className="pointer-events-none absolute -top-1 left-1/2 z-40 -translate-x-1/2 -translate-y-full scale-90 whitespace-nowrap rounded-xl bg-white/95 px-2.5 py-1 text-center opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover/one:scale-100 group-hover/one:opacity-100">
                    <div className="text-[11px] font-bold text-foreground">{m.n}</div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{m.d}</div>
                  </div>
                </div>
              ))}
              <div className="group/one relative">
                <span className="pointer-events-none absolute inset-0 rounded-full bg-white/50 opacity-0 blur-md transition duration-500 group-hover/one:scale-125 group-hover/one:opacity-100" />
                <div className="relative grid h-8 cursor-pointer place-items-center rounded-full border-2 border-white bg-white/20 px-2 backdrop-blur text-[11px] font-bold transition-all duration-500 group-hover/one:-translate-y-1.5 group-hover/one:scale-110 group-hover/one:bg-white group-hover/one:text-rose-600">
                  +1.2k
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <Link to="/inscription" className="glass-card group flex flex-col justify-between rounded-3xl p-4 transition hover:bg-brand-soft sm:p-5">
          <div className="text-xs uppercase tracking-widest text-brand">Rejoindre</div>
          <div>
            <div className="font-display text-lg font-bold text-foreground">Nous rejoindre</div>
            <div className="mt-1 flex items-center gap-1 text-sm text-brand">
              Commencer <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Pastor quote */}
        <div className="col-span-2 hover-lift glass-card flex items-start gap-3 rounded-3xl p-4 sm:p-5">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
            <Quote className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm italic text-foreground/80">« Dieu ne cherche pas des géants, mais des cœurs disponibles. »</p>
            <div className="mt-1 text-xs text-muted-foreground">Pasteur Emmanuel</div>
          </div>
        </div>
      </div>
    </section>
  );
}