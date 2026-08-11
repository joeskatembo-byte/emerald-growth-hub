import { useState } from "react";
import { createPortal } from "react-dom";
import { Plus, Pencil, Trash2, X, Check, RotateCcw, ChevronRight, ChevronLeft, Star, BookOpen } from "lucide-react";
import { useCollection } from "@/lib/collections";
import { useConfirm } from "@/components/ui/confirm";
import { MEDITATION_KEY, meditations as seed, type Meditation } from "@/data/mock";

const field =
  "w-full rounded-2xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const empty = { book: "", verse: "", body: "", servant: "", initial: "", active: "Non" as const };

/** Gestion complète de la méditation du jour, via un formulaire pas à pas. */
export function MeditationSection() {
  const { rows, create, update, remove, reset } = useCollection<Meditation>(MEDITATION_KEY, seed);
  const { confirmDelete, notifySuccess } = useConfirm();
  const [open, setOpen] = useState<false | { id: string | "new" }>(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Omit<Meditation, "id">>({ ...empty });

  const startNew = () => { setDraft({ ...empty }); setStep(0); setOpen({ id: "new" }); };
  const startEdit = (m: Meditation) => {
    const { id: _id, ...rest } = m;
    setDraft(rest); setStep(0); setOpen({ id: m.id });
  };

  const publish = (id: string) => {
    rows.forEach((r) => update(r.id, { active: r.id === id ? "Oui" : "Non" } as Partial<Meditation>));
    notifySuccess("Méditation mise en avant", "Elle est désormais affichée sur la page d'accueil.");
  };

  const save = () => {
    if (!open) return;
    if (draft.active === "Oui") rows.forEach((r) => update(r.id, { active: "Non" } as Partial<Meditation>));
    if (open.id === "new") create(draft as Omit<Meditation, "id">);
    else update(open.id, draft as Partial<Meditation>);
    setOpen(false);
    notifySuccess("Méditation enregistrée", "Le contenu à méditer a bien été mis à jour.");
  };

  const steps = ["Référence", "Parole", "Serviteur"];
  const canNext =
    step === 0 ? draft.book.trim() !== "" && draft.verse.trim() !== "" : step === 1 ? draft.body.trim().length > 10 : true;

  return (
    <div className="animate-fade-in glass-card rounded-3xl p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">Méditation du jour</h2>
          <p className="text-xs text-muted-foreground">Carte « À méditer » affichée sur la page d'accueil.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset} title="Réinitialiser" className="hover-lift grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-muted-foreground hover:text-brand">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button onClick={startNew} className="hover-lift flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {rows.map((m) => (
          <article key={m.id} className={"hover-lift rounded-3xl p-5 shadow-soft " + (m.active === "Oui" ? "bg-brand-gradient text-white" : "bg-card")}>
            <div className="flex items-start justify-between gap-3">
              <div className="font-display text-lg font-bold">{m.book}</div>
              <div className="font-mono text-sm">{m.verse}</div>
            </div>
            <div className={"mt-2 flex items-center gap-2 text-xs uppercase tracking-widest " + (m.active === "Oui" ? "text-white/70" : "text-muted-foreground")}>
              <BookOpen className="h-3.5 w-3.5" /> {m.active === "Oui" ? "En ligne" : "Brouillon"}
            </div>
            <p className={"mt-3 text-sm leading-relaxed " + (m.active === "Oui" ? "text-white/95" : "text-foreground/80")}>{m.body}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className={"grid h-8 w-8 place-items-center rounded-full font-bold " + (m.active === "Oui" ? "bg-white text-brand" : "bg-brand-soft text-brand")}>{m.initial || "?"}</span>
                {m.servant || "—"}
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => publish(m.id)}
                  aria-label="Mettre en avant"
                  title="Afficher sur l'accueil"
                  className={"grid h-8 w-8 place-items-center rounded-xl transition " + (m.active === "Oui" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700 hover:bg-amber-200")}
                >
                  <Star className={"h-3.5 w-3.5 " + (m.active === "Oui" ? "fill-current" : "")} />
                </button>
                <button onClick={() => startEdit(m)} aria-label="Modifier" className={"grid h-8 w-8 place-items-center rounded-xl transition " + (m.active === "Oui" ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground hover:text-brand")}>
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={async () => {
                    const ok = await confirmDelete({
                      title: "Supprimer cette méditation ?",
                      description: `Voulez-vous vraiment supprimer la méditation « ${m.book} ${m.verse} » ? Cette action est définitive.`,
                      successDescription: "La méditation a bien été supprimée.",
                    });
                    if (ok) remove(m.id);
                  }}
                  aria-label="Supprimer"
                  className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
        {rows.length === 0 && (
          <p className="rounded-2xl bg-card px-3 py-8 text-center text-muted-foreground">Aucune méditation.</p>
        )}
      </div>

      {open && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9998] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="animate-fade-in no-scrollbar max-h-[90vh] w-[min(520px,100%)] overflow-y-auto rounded-3xl bg-card p-6 shadow-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-1.5">
                  {steps.map((_, i) => (
                    <div key={i} className={"h-1.5 flex-1 rounded-full transition-all " + (i <= step ? "bg-brand" : "bg-foreground/10")} />
                  ))}
                </div>
                <button onClick={() => setOpen(false)} aria-label="Fermer" className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary text-muted-foreground transition hover:text-brand">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Étape {step + 1} / 3</p>
              <h3 className="font-display text-xl font-bold">{steps[step]}</h3>

              {step === 0 && (
                <div className="animate-fade-in mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Livre</label>
                    <input className={field + " mt-1"} placeholder="Ex. Matthieu" value={draft.book} onChange={(e) => setDraft((d) => ({ ...d, book: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Verset</label>
                    <input className={field + " mt-1 font-mono"} placeholder="Ex. 11 : 28" value={draft.verse} onChange={(e) => setDraft((d) => ({ ...d, verse: e.target.value }))} />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="animate-fade-in mt-4">
                  <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Parole à méditer</label>
                  <textarea rows={5} maxLength={500} className={field + " mt-1 resize-none"} placeholder="Texte du verset et exhortation…" value={draft.body} onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))} />
                </div>
              )}
              {step === 2 && (
                <div className="animate-fade-in mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Serviteur</label>
                    <input className={field + " mt-1"} placeholder="Ex. Pasteur Emmanuel" value={draft.servant} onChange={(e) => setDraft((d) => ({ ...d, servant: e.target.value, initial: d.initial || e.target.value.trim().charAt(0).toUpperCase() }))} />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Initiale</label>
                    <input maxLength={1} className={field + " mt-1"} value={draft.initial} onChange={(e) => setDraft((d) => ({ ...d, initial: e.target.value.toUpperCase() }))} />
                  </div>
                  <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-soft/40 px-3 py-2 text-sm sm:mt-6">
                    <input type="checkbox" className="h-4 w-4 accent-[oklch(var(--brand))]" checked={draft.active === "Oui"} onChange={(e) => setDraft((d) => ({ ...d, active: e.target.checked ? "Oui" : "Non" }))} />
                    Afficher sur l'accueil
                  </label>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-2">
                <button
                  onClick={() => (step === 0 ? setOpen(false) : setStep((s) => s - 1))}
                  className="flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-medium"
                >
                  <ChevronLeft className="h-4 w-4" /> {step === 0 ? "Annuler" : "Retour"}
                </button>
                {step < 2 ? (
                  <button disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft disabled:opacity-50">
                    Suivant <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={save} className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
                    <Check className="h-4 w-4" /> Enregistrer
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}