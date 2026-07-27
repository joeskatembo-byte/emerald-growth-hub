import { Sparkles, Users, History as HistoryIcon, CalendarDays } from "lucide-react";

const stats = [
  { icon: HistoryIcon, label: "Années au service", value: "27+" },
  { icon: Users, label: "Membres actifs", value: "3 200" },
  { icon: Sparkles, label: "Ministères", value: "12" },
  { icon: CalendarDays, label: "Cultes / semaine", value: "6" },
];

export function AboutHero() {
  return (
    <section className="mx-auto mt-6 w-[min(1200px,95%)]">
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-soft sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> À propos
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Une famille, une mission,<br className="hidden sm:block" /> un même Sauveur.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Depuis 1998, l'Église Emmanuel accueille, restaure et envoie. Découvre notre histoire, notre vision, nos serviteurs et le rythme de notre communauté à Kinshasa.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/15">
                  <Icon className="h-5 w-5 text-white/80" />
                  <div className="mt-2 font-numeric text-2xl font-bold">{s.value}</div>
                  <div className="text-xs uppercase tracking-widest text-white/70">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}