import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Check, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";
import { useSettings } from "@/lib/collections";
import { useConfirm } from "@/components/ui/confirm";

const field =
  "w-full rounded-2xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export type SettingsField<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "number";
  rows?: number;
  wide?: boolean;
};

export type SettingsStep<T> = { title: string; fields: SettingsField<T>[] };

/** Formulaire pas à pas générique pour un bloc de réglages unique (textes d'une section). */
export function SettingsSection<T extends Record<string, unknown>>({
  title,
  description,
  storageKey,
  seed,
  steps,
  successMessage,
}: {
  title: string;
  description: string;
  storageKey: string;
  seed: T;
  steps: SettingsStep<T>[];
  successMessage?: string;
}) {
  const { value, save, reset } = useSettings<T>(storageKey, seed);
  const { notifySuccess } = useConfirm();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<T>(value);

  useEffect(() => { if (!open) setDraft(value); }, [value, open]);

  const set = (key: string, v: string | number) => setDraft((d) => ({ ...d, [key]: v }) as T);

  const submit = () => {
    save(draft);
    setOpen(false);
    notifySuccess("Modifications enregistrées", successMessage ?? "Le site public est déjà à jour.");
  };

  const allFields = steps.flatMap((s) => s.fields);

  return (
    <div className="space-y-4">
      <div className="animate-fade-in glass-card rounded-3xl p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">{title}</h2>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reset} title="Réinitialiser" className="hover-lift grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-muted-foreground hover:text-brand">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={() => { setDraft(value); setStep(0); setOpen(true); }} className="hover-lift flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
              <Pencil className="h-4 w-4" /> Modifier
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-2 rounded-3xl bg-card p-5 text-sm shadow-soft sm:grid-cols-2">
          {allFields.map((f) => (
            <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{f.label}</div>
              <div className="text-foreground/90">{String(value[f.key] ?? "") || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {open && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9998] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="animate-fade-in no-scrollbar max-h-[90vh] w-[min(560px,100%)] overflow-y-auto rounded-3xl bg-card p-6 shadow-soft">
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
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Étape {step + 1} / {steps.length}</p>
              <h3 className="font-display text-xl font-bold">{steps[step].title}</h3>

              <div className="animate-fade-in mt-4 grid gap-3 sm:grid-cols-2">
                {steps[step].fields.map((f) => (
                  <div key={f.key} className={f.type === "textarea" || f.wide ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        rows={f.rows ?? 3}
                        className={field + " mt-1 resize-none"}
                        value={String(draft[f.key] ?? "")}
                        onChange={(e) => set(f.key, e.target.value)}
                      />
                    ) : (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        className={field + " mt-1" + (f.type === "number" ? " font-mono" : "")}
                        value={String(draft[f.key] ?? "")}
                        onChange={(e) => set(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-2">
                <button onClick={() => (step === 0 ? setOpen(false) : setStep((s) => s - 1))} className="flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-medium">
                  <ChevronLeft className="h-4 w-4" /> {step === 0 ? "Annuler" : "Retour"}
                </button>
                {step < steps.length - 1 ? (
                  <button onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
                    Suivant <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={submit} className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
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
