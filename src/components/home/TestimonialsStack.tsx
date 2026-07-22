import { useState } from "react";
import { testimonials as initial } from "@/data/mock";
import { Heart, Plus, ChevronRight, Check } from "lucide-react";

export function TestimonialsStack() {
  const [items, setItems] = useState(initial);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);

  const rotate = () => setItems(([first, ...rest]) => [...rest, first]);
  const toggleLike = (id: string) => {
    setLiked((s) => ({ ...s, [id]: !s[id] }));
    setItems((arr) => arr.map((t) => (t.id === id ? { ...t, likes: t.likes + (liked[id] ? -1 : 1) } : t)));
  };

  return (
    <section className="mx-auto mt-16 w-[min(1200px,95%)]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-brand">Action de grâce</div>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Ce que Dieu fait parmi nous</h2>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110"><Plus className="h-4 w-4" /> Témoigner</button>
      </div>
      <div className="relative mx-auto h-[340px] max-w-xl select-none">
        {items.slice(0, 4).map((t, i) => {
          const isTop = i === 0;
          const scale = 1 - i * 0.045;
          const y = i * 12;
          const rot = i * -1.5;
          return (
            <article
              key={t.id}
              onClick={() => isTop && rotate()}
              className={"absolute inset-x-0 top-0 mx-auto glass-card rounded-3xl p-6 shadow-soft transition-all duration-500 " + (isTop ? "cursor-pointer" : "pointer-events-none")}
              style={{ transform: `translateY(${y}px) scale(${scale}) rotate(${rot}deg)`, zIndex: 10 - i, opacity: 1 - i * 0.12 }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient text-white font-bold">{t.initial}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-semibold text-foreground">{t.name}</div>
                  <div className="font-numeric text-xs text-muted-foreground">{t.when}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }} className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition " + (liked[t.id] ? "bg-rose-100 text-rose-700" : "bg-secondary text-foreground/70 hover:bg-rose-50")} aria-label="J'aime">
                  <Heart className={"h-3.5 w-3.5 " + (liked[t.id] ? "fill-current" : "")} />
                  <span className="font-numeric font-semibold">{t.likes}</span>
                </button>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">« {t.body} »</p>
              {isTop && <div className="mt-4 text-center text-xs text-muted-foreground">Toucher la carte pour la suivante →</div>}
            </article>
          );
        })}
      </div>
      {open && <TestimonyWizard onClose={() => setOpen(false)} />}
    </section>
  );
}

function TestimonyWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md animate-fade-in rounded-3xl bg-background p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (<div key={i} className={"h-1.5 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-foreground/10")} />))}
        </div>
        {step === 0 && (
          <div className="animate-fade-in space-y-3">
            <h3 className="font-display text-xl font-bold">Ton prénom</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Grâce" className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
            <div className="flex justify-end"><button disabled={!name.trim()} onClick={() => setStep(1)} className="inline-flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Suivant <ChevronRight className="h-4 w-4" /></button></div>
          </div>
        )}
        {step === 1 && (
          <div className="animate-fade-in space-y-3">
            <h3 className="font-display text-xl font-bold">Ton témoignage</h3>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder="Raconte simplement ce que Dieu a fait…" className="w-full resize-none rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none" />
            <div className="flex justify-between">
              <button onClick={() => setStep(0)} className="rounded-2xl bg-secondary px-4 py-2 text-sm">Retour</button>
              <button disabled={body.trim().length < 10} onClick={() => setStep(2)} className="inline-flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Valider <ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="animate-fade-in space-y-3 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-7 w-7" /></div>
            <h3 className="font-display text-xl font-bold">Merci, {name || "bien-aimé(e)"} !</h3>
            <p className="text-sm text-muted-foreground">Ton témoignage a été reçu. Il sera publié après relecture par un serviteur.</p>
            <button onClick={onClose} className="mt-2 w-full rounded-2xl bg-brand-gradient py-2.5 text-sm font-semibold text-white">Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}