import { useState } from "react";
import { departments } from "@/data/about";
import { Clock, User, Mail, CalendarClock, ChevronRight } from "lucide-react";

export function Departments() {
  const [active, setActive] = useState(departments[0].key);
  const current = departments.find((d) => d.key === active) ?? departments[0];

  return (
    <section id="departements" className="mx-auto mt-16 w-[min(1200px,95%)] scroll-mt-24">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-brand">Départements</div>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Chaque appel a sa maison</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Six ministères, une seule vision. Choisis un département pour découvrir sa vision, ses dirigeants, ses horaires et ses actualités.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          {departments.map((d) => {
            const isActive = d.key === active;
            return (
              <button
                key={d.key}
                onClick={() => setActive(d.key)}
                className={
                  "group flex items-center gap-3 rounded-2xl border p-3 text-left transition " +
                  (isActive
                    ? "border-transparent bg-brand-gradient text-white shadow-soft"
                    : "border-border bg-white text-foreground hover:border-brand/40 hover:bg-brand-soft")
                }
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/20 text-lg">
                  <span aria-hidden>{d.icon}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{d.name}</div>
                  <div className={"truncate text-[11px] " + (isActive ? "text-white/80" : "text-muted-foreground")}>{d.leader}</div>
                </div>
                <ChevronRight className={"hidden h-4 w-4 md:block " + (isActive ? "text-white" : "text-muted-foreground")} />
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div key={current.key} className="animate-fade-in glass-card rounded-3xl p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-start gap-4">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${current.hue} text-2xl text-white shadow-soft`}>
              <span aria-hidden>{current.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-widest text-brand">Département</div>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{current.name}</h3>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-brand-soft/60 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-brand">Vision</div>
              <p className="mt-1 text-sm text-foreground/90">{current.vision}</p>
            </div>
            <div className="rounded-2xl bg-secondary p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Mission</div>
              <p className="mt-1 text-sm text-foreground/90">{current.mission}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoRow icon={User} label="Dirigeant" value={current.leader} />
            <InfoRow icon={Mail} label="Contact" value={current.contact} />
            <InfoRow icon={Clock} label="Horaire" value={current.schedule} />
            <InfoRow icon={CalendarClock} label="Prochainement" value={current.next} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}