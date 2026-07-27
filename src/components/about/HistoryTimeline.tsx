import { useState } from "react";
import { timeline } from "@/data/about";
import { useReveal } from "@/hooks/use-reveal";
import { History as HistoryIcon } from "lucide-react";

export function HistoryTimeline() {
  const [active, setActive] = useState<number>(0);
  const current = timeline[active];

  return (
    <section id="histoire" className="mx-auto mt-16 w-[min(1200px,95%)] scroll-mt-24">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand">Histoire</div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Une frise chronologique vivante</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Survole une date pour revivre l'étape. Chaque année a bâti la maison où tu entres aujourd'hui.</p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-sm text-brand sm:inline-flex">
          <HistoryIcon className="h-4 w-4" /> 1998 → aujourd'hui
        </div>
      </div>

      {/* Featured card with archive image behind */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${current.hue} p-8 text-white shadow-soft transition-all duration-500 sm:p-12`}>
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.4), transparent 55%)",
        }} />
        <div className="pointer-events-none absolute right-6 top-6 font-numeric text-[6rem] font-black leading-none text-white/10 sm:text-[9rem]">{current.year}</div>
        <div className="relative max-w-2xl">
          <div className="font-numeric text-sm tracking-widest text-white/70">{current.year}</div>
          <h3 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{current.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/90">{current.body}</p>
        </div>
      </div>

      {/* Timeline rail */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="relative flex min-w-max items-center gap-3 px-1">
          <div className="absolute left-0 right-0 top-6 h-px bg-border" />
          {timeline.map((t, i) => {
            const isActive = i === active;
            return (
              <TimelineDot key={t.year} entry={t} index={i} active={isActive} onActivate={() => setActive(i)} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineDot({ entry, index, active, onActivate }: { entry: typeof timeline[number]; index: number; active: boolean; onActivate: () => void }) {
  const { ref, visible } = useReveal<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={
        "relative z-10 flex w-40 shrink-0 flex-col items-center gap-2 rounded-2xl p-2 transition-all duration-500 " +
        (visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")
      }
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span
        className={
          "grid h-12 w-12 place-items-center rounded-full border-2 font-numeric text-xs font-bold transition " +
          (active
            ? "border-brand bg-brand text-white scale-110 shadow-soft"
            : "border-border bg-white text-foreground hover:border-brand hover:text-brand")
        }
      >
        {entry.year.slice(-2)}
      </span>
      <span className={"text-center text-xs font-semibold " + (active ? "text-brand" : "text-muted-foreground")}>{entry.title}</span>
    </button>
  );
}