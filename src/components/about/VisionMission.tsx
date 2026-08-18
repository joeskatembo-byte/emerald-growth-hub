import { useState } from "react";
import { Compass, Target, Sparkles, ArrowRight } from "lucide-react";

type Step = 0 | 1 | 2;

export function VisionMission() {
  const [selectedStep, setSelectedStep] = useState<Step>(0);
  const [hoveredStep, setHoveredStep] = useState<Step | null>(null);

  const visibleStep = hoveredStep ?? selectedStep;

  const goToStep = (n: Step) => setSelectedStep(n);
  const nextStep = (selectedStep + 1) % 3 as Step;

  return (
    <section className="mx-auto mt-16 w-[min(1200px,95%)]">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-stretch">
        <div className="glass-card rounded-3xl p-8 shadow-soft sm:p-10">
          <div className="text-xs uppercase tracking-widest text-brand">Vision & Mission</div>
          <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Pourquoi existons-nous ?</h2>

          <div className="mt-6 grid gap-3">
            <StepDot n={0} label="Notre raison d'être" active={visibleStep === 0} selected={selectedStep === 0} onClick={() => goToStep(0)} onHover={() => setHoveredStep(0)} onLeave={() => setHoveredStep(null)} />
            <StepDot n={1} label="La Vision" active={visibleStep === 1} selected={selectedStep === 1} onClick={() => goToStep(1)} onHover={() => setHoveredStep(1)} onLeave={() => setHoveredStep(null)} />
            <StepDot n={2} label="La Mission" active={visibleStep === 2} selected={selectedStep === 2} onClick={() => goToStep(2)} onHover={() => setHoveredStep(2)} onLeave={() => setHoveredStep(null)} />
          </div>

          <button
            onClick={() => goToStep(nextStep)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110"
          >
            {selectedStep === 0 ? "Découvrir la vision" : selectedStep === 1 ? "Voir la mission" : "Revenir au début"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <RevealCard show={visibleStep === 0} icon={Sparkles} title="Notre raison d'être" hue="from-emerald-600 to-emerald-900">
            Faire de Kinshasa — et bien au-delà — un lieu où Jésus est connu, aimé et suivi. Chaque vie touchée devient un vecteur d'espérance pour la génération suivante.
          </RevealCard>
          <RevealCard show={visibleStep === 1} icon={Compass} title="La Vision" hue="from-indigo-600 to-blue-900">
            Voir une multitude d'hommes, de femmes et d'enfants restaurés par la grâce, formés par la Parole et envoyés dans leurs sphères d'influence — familles, écoles, entreprises, quartiers.
          </RevealCard>
          <RevealCard show={visibleStep === 2} icon={Target} title="La Mission" hue="from-amber-500 to-orange-700">
            <span className="font-semibold text-white">Accueillir</span> — chaque âme est précieuse.
            <br />
            <span className="font-semibold text-white">Restaurer</span> — par la Parole, la prière et la communion fraternelle.
            <br />
            <span className="font-semibold text-white">Envoyer</span> — chaque disciple devient à son tour un serviteur.
          </RevealCard>
        </div>
      </div>
    </section>
  );
}

function StepDot({ n, label, active, selected, onHover, onLeave }: { n: number; label: string; active: boolean; selected: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
    >
      <div
        className={
          "grid h-8 w-8 shrink-0 place-items-center rounded-full font-numeric text-xs font-bold transition " +
          (active ? "bg-brand text-white" : "bg-muted text-muted-foreground")
        }
      >
        {n + 1}
      </div>
      <div className={"text-sm font-medium transition " + (active ? "text-foreground" : "text-muted-foreground")}>{label}</div>
      {selected && <span className="ml-auto h-2 w-2 rounded-full bg-brand" aria-hidden="true" />}
    </button>
  );
}

function RevealCard({ show, icon: Icon, title, hue, children }: { show: boolean; icon: React.ComponentType<{ className?: string }>; title: string; hue: string; children: React.ReactNode }) {
  return (
    <div
      aria-hidden={!show}
      className={
        "absolute inset-0 rounded-3xl bg-gradient-to-br p-8 text-white shadow-soft transition-all duration-500 sm:p-10 " +
        hue +
        " " +
        (show ? "opacity-100 translate-y-0 scale-100" : "pointer-events-none opacity-0 translate-y-4 scale-[0.98]")
      }
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{title}</h3>
      <p className="mt-3 text-white/90 leading-relaxed">{children}</p>
    </div>
  );
}