import { useMemo, useState } from "react";
import { projects, PROJECTS_KEY, type Project } from "@/data/don";
import { useCollection } from "@/lib/collections";
import { Sparkles, CheckCircle2 } from "lucide-react";

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " $";

export function ProjectsStack() {
  const [tab, setTab] = useState<"en-cours" | "termine">("en-cours");
  const { rows } = useCollection<Project>(PROJECTS_KEY, projects);
  const list = useMemo(() => rows.filter((p) => p.status === tab), [tab, rows]);
  const [order, setOrder] = useState(0);
  const items = list.length ? list.map((_, i) => list[(i + order) % list.length]) : [];
  const rotate = () => setOrder((o) => (o + 1) % Math.max(1, list.length));

  return (
    <section id="projets" className="mx-auto mt-16 w-[min(1200px,95%)]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand">Finances de l'œuvre</div>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Projets & réalisations</h2>
        </div>
        <div className="glass-card inline-flex rounded-full p-1">
          {[
            { k: "en-cours", label: "En cours", icon: Sparkles },
            { k: "termine", label: "Terminés", icon: CheckCircle2 },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.k;
            return (
              <button
                key={t.k}
                onClick={() => { setTab(t.k as "en-cours" | "termine"); setOrder(0); }}
                className={"inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition " + (active ? "bg-brand-gradient text-white shadow-soft" : "text-foreground/70 hover:text-brand")}
              >
                <Icon className="h-3.5 w-3.5" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto h-[460px] max-w-2xl select-none">
        {items.slice(0, 4).map((p, i) => {
          const isTop = i === 0;
          const scale = 1 - i * 0.04;
          const y = i * 14;
          const rot = i * -1.2;
          return (
            <ProjectCard
              key={p.id + "-" + i}
              p={p}
              isTop={isTop}
              onNext={rotate}
              style={{ transform: `translateY(${y}px) scale(${scale}) rotate(${rot}deg)`, zIndex: 10 - i, opacity: 1 - i * 0.12 }}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({ p, isTop, onNext, style }: { p: Project; isTop: boolean; onNext: () => void; style: React.CSSProperties }) {
  const pct = Math.min(100, Math.round((p.raised / p.budget) * 100));
  return (
    <article
      onClick={() => isTop && onNext()}
      className={"absolute inset-x-0 top-0 mx-auto glass-card overflow-hidden rounded-3xl shadow-soft transition-all duration-500 " + (isTop ? "cursor-pointer" : "pointer-events-none")}
      style={style}
    >
      <div className={"relative h-40 w-full bg-gradient-to-br " + p.hue}>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,.35), transparent 50%)" }} />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground backdrop-blur">
          {p.status === "en-cours" ? "En cours" : "Terminé"}
        </div>
        <div className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/25 text-2xl backdrop-blur">
          {p.icon}
        </div>
        <div className="absolute bottom-3 left-4 font-numeric text-xs text-white/85">{p.since}</div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{p.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-4">
          <div className="flex items-baseline justify-between font-numeric text-xs text-muted-foreground">
            <span>Récolté : <span className="font-semibold text-foreground">{fmt(p.raised)}</span></span>
            <span>Objectif : <span className="font-semibold text-foreground">{fmt(p.budget)}</span></span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-brand-gradient transition-all duration-700" style={{ width: pct + "%" }} />
          </div>
          <div className="mt-1.5 font-numeric text-[11px] font-semibold text-brand">{pct}% financé</div>
        </div>
        {isTop && <div className="mt-3 text-center text-[11px] text-muted-foreground">Toucher la carte pour la suivante →</div>}
      </div>
    </article>
  );
}
