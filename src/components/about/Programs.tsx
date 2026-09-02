import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { weeklyProgram, upcomingEvents, EVENTS_KEY, type UpcomingEvent } from "@/data/about";
import { useCollection } from "@/lib/collections";
import { CalendarDays, Clock, Sparkles, X } from "lucide-react";

const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"] as const;

function getTodayIndex() {
  const jsDay = new Date().getDay(); // 0 = Sunday
  return jsDay;
}

export function Programs() {
  const [selected, setSelected] = useState<number>(getTodayIndex());
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
  const { rows: events } = useCollection<UpcomingEvent>(EVENTS_KEY, upcomingEvents);
  const grouped = useMemo(() => {
    const map = new Map<string, typeof weeklyProgram>();
    for (const d of days) map.set(d, []);
    for (const p of weeklyProgram) map.get(p.day)?.push(p);
    return map;
  }, []);
  const dayName = days[selected];
  const slots = grouped.get(dayName) ?? [];

  return (
    <section id="programmes" className="mx-auto mt-16 w-[min(1200px,95%)] scroll-mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand">Programmes</div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Le pouls de la semaine</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Choisis un jour, découvre les rendez-vous. Précision chirurgicale, cœur pastoral.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-sm text-brand">
          <Sparkles className="h-4 w-4" /> Mise à jour hebdomadaire
        </div>
      </div>

      {/* Day switcher */}
      <div className="flex flex-wrap gap-2 pb-1">
        {days.map((d, i) => {
          const isActive = i === selected;
          const isToday = i === getTodayIndex();
          return (
            <button
              key={d}
              onClick={() => setSelected(i)}
              className={
                "flex min-w-[92px] shrink-0 flex-col items-center gap-0.5 rounded-2xl px-4 py-2.5 text-sm transition " +
                (isActive
                  ? "bg-brand-gradient text-white shadow-soft"
                  : "bg-white text-foreground/80 hover:bg-brand-soft hover:text-brand")
              }
            >
              <span className="text-[10px] uppercase tracking-widest opacity-70">{isToday ? "Aujourd'hui" : "Jour"}</span>
              <span className="font-display font-semibold">{d}</span>
            </button>
          );
        })}
      </div>

      {/* Slots */}
      <div key={dayName} className="animate-fade-in mt-4 grid gap-3 sm:grid-cols-2">
        {slots.length === 0 && (
          <div className="glass-card col-span-full rounded-3xl p-6 text-center text-sm text-muted-foreground">
            Pas d'activité programmée ce jour — un temps pour se reposer et méditer 🙏
          </div>
        )}
        {slots.map((s, i) => (
          <article
            key={`${s.day}-${s.time}-${i}`}
            className="group relative overflow-hidden rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
          >
            <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${s.hue}`} />
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                <Clock className="h-3.5 w-3.5" /> <span className="font-numeric">{s.time}</span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.dept}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">{s.title}</h3>
          </article>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brand" />
          <h3 className="font-display text-xl font-bold">À venir</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedEvent(e)}
              className="hover-lift glass-card rounded-3xl p-5 text-left shadow-soft"
            >
              <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${e.hue} px-3 py-1 text-xs font-semibold text-white`}>
                <span className="font-numeric">{e.date}</span>
              </div>
              <div className="mt-3 font-display text-base font-bold text-foreground">{e.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{e.where}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedEvent && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9998] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="animate-fade-in no-scrollbar w-[min(480px,100%)] rounded-3xl bg-card p-6 shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{selectedEvent.where}</p>
                  <h3 className="font-display text-xl font-bold">{selectedEvent.title}</h3>
                </div>
                <button onClick={() => setSelectedEvent(null)} aria-label="Fermer" className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary text-muted-foreground transition hover:text-brand">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className={`mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${selectedEvent.hue} px-3 py-1 text-xs font-semibold text-white`}>
                <CalendarDays className="h-3.5 w-3.5" />
                <span className="font-numeric">{selectedEvent.date}</span>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{selectedEvent.description}</p>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}