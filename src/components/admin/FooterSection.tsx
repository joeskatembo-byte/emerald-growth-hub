import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Check, RotateCcw, ChevronRight, ChevronLeft, Church } from "lucide-react";
import { useSettings } from "@/lib/collections";
import { useConfirm } from "@/components/ui/confirm";
import { CrudSection, type Column } from "@/components/admin/CrudSection";
import {
  FOOTER_KEY, FOOTER_LINKS_KEY, FOOTER_SOCIALS_KEY, FOOTER_PARTNERS_KEY,
  footerSettings, footerLinks, footerSocials, footerPartners, socialNetworks,
  type FooterSettings,
} from "@/data/footer";

const field =
  "w-full rounded-2xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const linkCols: Column[] = [
  { key: "label", label: "Libellé" },
  { key: "to", label: "Lien", mono: true },
];
const socialCols: Column[] = [
  { key: "network", label: "Réseau", type: "select", options: socialNetworks },
  { key: "url", label: "Adresse", mono: true },
];
const partnerCols: Column[] = [{ key: "name", label: "Partenaire" }];

const steps = ["Identité", "Coordonnées", "Titres & mentions"];

/** Pilotage complet du pied de page : textes (pas à pas) et trois listes réordonnables. */
export function FooterSection() {
  const { value, save, reset } = useSettings<FooterSettings>(FOOTER_KEY, footerSettings);
  const { notifySuccess } = useConfirm();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<FooterSettings>(value);

  useEffect(() => { if (!open) setDraft(value); }, [value, open]);

  const set = (patch: Partial<FooterSettings>) => setDraft((d) => ({ ...d, ...patch }));
  const canNext = step === 0 ? draft.name.trim() !== "" : true;

  const submit = () => {
    save(draft);
    setOpen(false);
    notifySuccess("Pied de page enregistré", "Les textes sont désormais visibles sur tout le site.");
  };

  return (
    <div className="space-y-4">
      <div className="animate-fade-in glass-card rounded-3xl p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold">Pied de page</h2>
            <p className="text-xs text-muted-foreground">Nom, slogan, coordonnées, titres de colonnes et mention légale.</p>
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

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl bg-brand-gradient p-5 text-white shadow-soft">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Church className="h-5 w-5" /></div>
              <div className="font-display text-lg font-bold">{value.name}</div>
            </div>
            <p className="mt-3 text-sm text-white/80">{value.tagline}</p>
            <p className="mt-4 text-xs text-white/60">© {new Date().getFullYear()} {value.legal}</p>
          </div>
          <div className="grid gap-2 rounded-3xl bg-card p-5 text-sm shadow-soft">
            {[
              ["Adresse", value.address],
              ["Téléphone", value.phone],
              ["E-mail", value.email],
              ["Titres", `${value.navTitle} · ${value.contactTitle} · ${value.socialTitle} · ${value.partnersTitle}`],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="truncate">{v || "—"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CrudSection title="Liens de navigation" description="Colonne « Navigation » du pied de page." storageKey={FOOTER_LINKS_KEY} seed={footerLinks.map((l) => ({ ...l }))} columns={linkCols} reorderable />
      <CrudSection title="Réseaux sociaux" description="Icônes et adresses des réseaux." storageKey={FOOTER_SOCIALS_KEY} seed={footerSocials.map((s) => ({ ...s }))} columns={socialCols} reorderable />
      <CrudSection title="Partenaires" description="Organisations affichées en bas de page." storageKey={FOOTER_PARTNERS_KEY} seed={footerPartners.map((p) => ({ ...p }))} columns={partnerCols} reorderable />

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
              <h3 className="font-display text-xl font-bold">{steps[step]}</h3>

              {step === 0 && (
                <div className="animate-fade-in mt-4 grid gap-3">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Nom de l'église</label>
                    <input className={field + " mt-1"} value={draft.name} onChange={(e) => set({ name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Slogan</label>
                    <textarea rows={3} maxLength={200} className={field + " mt-1 resize-none"} value={draft.tagline} onChange={(e) => set({ tagline: e.target.value })} />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="animate-fade-in mt-4 grid gap-3">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Adresse</label>
                    <input className={field + " mt-1"} value={draft.address} onChange={(e) => set({ address: e.target.value })} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Téléphone</label>
                      <input className={field + " mt-1 font-mono"} value={draft.phone} onChange={(e) => set({ phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">E-mail</label>
                      <input className={field + " mt-1"} value={draft.email} onChange={(e) => set({ email: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="animate-fade-in mt-4 grid gap-3 sm:grid-cols-2">
                  {([
                    ["navTitle", "Titre navigation"],
                    ["contactTitle", "Titre contact"],
                    ["socialTitle", "Titre réseaux"],
                    ["partnersTitle", "Titre partenaires"],
                  ] as const).map(([k, label]) => (
                    <div key={k}>
                      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</label>
                      <input className={field + " mt-1"} value={draft[k]} onChange={(e) => set({ [k]: e.target.value } as Partial<FooterSettings>)} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Mention légale</label>
                    <input className={field + " mt-1"} value={draft.legal} onChange={(e) => set({ legal: e.target.value })} />
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-2">
                <button onClick={() => (step === 0 ? setOpen(false) : setStep((s) => s - 1))} className="flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-medium">
                  <ChevronLeft className="h-4 w-4" /> {step === 0 ? "Annuler" : "Retour"}
                </button>
                {step < steps.length - 1 ? (
                  <button disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft disabled:opacity-50">
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
