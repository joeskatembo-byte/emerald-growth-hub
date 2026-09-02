import { useEffect, useRef, useState } from "react";
import { news as newsSeed, departmentColor, NEWS_KEY, type NewsItem } from "@/data/mock";
import { useCollection } from "@/lib/collections";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const DURATION = 5000;

export function NewsStories() {
  const { rows } = useCollection<NewsItem>(NEWS_KEY, newsSeed);
  const news = rows.length ? rows : newsSeed;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (idx > news.length - 1) setIdx(0);
  }, [idx, news.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % news.length);
      setKey((k) => k + 1);
    }, DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, paused]);

  const go = (delta: number) => {
    setIdx((i) => (i + delta + news.length) % news.length);
    setKey((k) => k + 1);
  };
  const item = news[Math.min(idx, news.length - 1)];

  return (
    <section className="mx-auto mt-10 w-[min(1200px,95%)]">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand">En direct</div>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Actualités de l'église</h2>
        </div>
        <div className="hidden gap-1 sm:flex">
          <button onClick={() => go(-1)} className="grid h-9 w-9 place-items-center rounded-full glass-card hover:bg-brand-soft" aria-label="Précédent"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setPaused((p) => !p)} className="grid h-9 w-9 place-items-center rounded-full glass-card hover:bg-brand-soft" aria-label="Pause">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
          <button onClick={() => go(1)} className="grid h-9 w-9 place-items-center rounded-full glass-card hover:bg-brand-soft" aria-label="Suivant"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="glass-card overflow-hidden rounded-3xl p-4 sm:p-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="mb-4 flex gap-1">
          {news.map((_, i) => (
            <div key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
              <div
                key={i === idx ? key : `s-${i}`}
                className={i < idx ? "absolute inset-0 bg-brand" : i === idx ? "story-bar-fill absolute inset-0 bg-brand" : "absolute inset-0"}
                style={i === idx ? { animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" } : undefined}
              />
            </div>
          ))}
        </div>
        <div key={idx} className="animate-fade-in grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">{item.kind}</div>
            <p className="font-display text-lg font-semibold leading-snug text-foreground sm:text-2xl">{item.body}</p>
            <div className="mt-3 font-numeric text-xs text-muted-foreground">{item.when}</div>
          </div>
          <div className={"grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft " + departmentColor[item.dept]}>
            <span className="font-display text-xl font-bold">{item.dept === "E" ? "E" : item.dept[0]}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-1 sm:hidden">
          <button onClick={() => go(-1)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary" aria-label="Précédent"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setPaused((p) => !p)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary" aria-label="Pause">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
          <button onClick={() => go(1)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary" aria-label="Suivant"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}