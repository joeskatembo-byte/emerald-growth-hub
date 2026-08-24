import { FancySelect } from "@/components/ui/fancy-select";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft, ChevronRight, Check, UserPlus, MapPin, HeartPulse, Camera,
  CalendarDays, Users, KeyRound, PartyPopper, Eye, EyeOff,
} from "lucide-react";
import { communes, etatsCivils, departmentNames } from "@/data/inscription";
import { signup } from "@/lib/session";
import { useQuartiers } from "@/lib/quartiers";

const steps = [
  { label: "Identité", Icon: UserPlus },
  { label: "Adresse", Icon: MapPin },
  { label: "Famille & contacts", Icon: HeartPulse },
  { label: "Profil & accès", Icon: KeyRound },
];

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export function SignupWizard() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);

  const [f, setF] = useState({
    nom: "", prenom: "", commune: "", quartier: "", avenue: "", parcelle: "",
    etatCivil: "", enfants: 0, telephone: "", urgence: "",
    photo: null as string | null, naissance: "", departement: "", password: "",
  });
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  const { quartiers, add: addQuartierToList } = useQuartiers(f.commune);
  const [newQuartier, setNewQuartier] = useState("");
  const [addingQuartier, setAddingQuartier] = useState(false);

  const confirmQuartier = () => {
    const q = newQuartier.trim();
    if (q.length < 2) return;
    addQuartierToList(q);
    set("quartier", q);
    setNewQuartier("");
    setAddingQuartier(false);
  };

  const valid = useMemo(() => {
    const phoneOk = (v: string) => /^[+0-9 ()-]{8,20}$/.test(v.trim());
    return [
      f.nom.trim().length > 1 && f.prenom.trim().length > 1,
      f.commune !== "" && f.quartier !== "" && f.avenue.trim().length > 1 && f.parcelle.trim().length > 0,
      f.etatCivil !== "" && phoneOk(f.telephone) && phoneOk(f.urgence) &&
        (f.etatCivil !== "Marié(e)" || f.enfants >= 0),
      f.naissance !== "" && f.departement !== "" && f.password.length >= 4,
    ][step];
  }, [f, step]);

  const onPhoto = (file?: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => set("photo", String(reader.result));
    reader.readAsDataURL(file);
  };

  const finish = () => {
    signup({ ...f, enfants: f.etatCivil === "Marié(e)" ? Number(f.enfants) : 0 });
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 2600);
  };

  if (done) {
    return (
      <div className="glass-card animate-scale-in relative overflow-hidden rounded-3xl p-10 text-center shadow-soft">
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-brand/70"
              style={{
                left: `${(i * 37) % 100}%`,
                top: "-8px",
                animation: `fade-in 0.6s ease-out ${i * 60}ms both, slide-in-right 1.4s ease-in ${i * 60}ms both`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <div className="relative">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-gradient text-white shadow-soft">
            <PartyPopper className="h-9 w-9" />
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold">Bienvenue dans la famille, {f.prenom} !</h2>
          <p className="mt-3 text-muted-foreground">
            Votre compte est créé. Un serviteur du département {f.departement} vous contactera très bientôt.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-border">
            <div className="h-full w-full origin-left animate-[slide-in-right_2.4s_linear] bg-brand" />
          </div>
          <p className="mt-3 font-mono text-xs text-muted-foreground">Redirection vers l'accueil…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
          <UserPlus className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Créer mon compte</h2>
          <p className="text-xs text-muted-foreground">4 étapes, deux minutes, une famille.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="mt-6 flex items-center gap-2">
        {steps.map((s, i) => {
          const SIcon = s.Icon;
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <div
                className={
                  "grid h-9 w-9 shrink-0 place-items-center rounded-2xl transition-all " +
                  (state === "done"
                    ? "bg-brand text-white"
                    : state === "current"
                      ? "scale-110 bg-brand-gradient text-white shadow-soft"
                      : "bg-secondary text-muted-foreground")
                }
              >
                {state === "done" ? <Check className="h-4 w-4" /> : <SIcon className="h-4 w-4" />}
              </div>
              {i < steps.length - 1 && (
                <div className={"h-1 flex-1 rounded-full transition-all " + (i < step ? "bg-brand" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 font-display text-sm font-semibold text-brand">
        Étape {step + 1} / 4 — {steps[step].label}
      </div>

      <div key={step} className="animate-fade-in mt-5 space-y-4">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nom</label>
              <input className={field + " mt-1"} value={f.nom} maxLength={40} onChange={(e) => set("nom", e.target.value)} placeholder="Kabongo" />
            </div>
            <div>
              <label className="text-sm font-medium">Prénom</label>
              <input className={field + " mt-1"} value={f.prenom} maxLength={40} onChange={(e) => set("prenom", e.target.value)} placeholder="Marie" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Commune</label>
              <FancySelect
                className="mt-1"
                searchable
                ariaLabel="Commune"
                placeholder="Sélectionnez votre commune…"
                value={f.commune}
                onChange={(v) => { set("commune", v); set("quartier", ""); setAddingQuartier(false); }}
                options={communes}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Quartier</label>
              {!addingQuartier ? (
                <>
                  <FancySelect
                    className="mt-1"
                    searchable
                    ariaLabel="Quartier"
                    placeholder={f.commune ? "Sélectionnez votre quartier…" : "Choisissez d'abord la commune"}
                    value={f.quartier}
                    onChange={(v) => set("quartier", v)}
                    options={quartiers}
                  />
                  <button
                    type="button"
                    disabled={!f.commune}
                    onClick={() => setAddingQuartier(true)}
                    className="mt-2 text-xs font-medium text-brand transition hover:underline disabled:opacity-40"
                  >
                    + Mon quartier n'est pas dans la liste
                  </button>
                </>
              ) : (
                <div className="animate-fade-in mt-1 flex flex-wrap items-center gap-2">
                  <input
                    className={field + " flex-1 min-w-[180px]"}
                    value={newQuartier}
                    maxLength={40}
                    autoFocus
                    onChange={(e) => setNewQuartier(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); confirmQuartier(); } }}
                    placeholder="Nom de votre quartier"
                  />
                  <button
                    type="button"
                    onClick={confirmQuartier}
                    disabled={newQuartier.trim().length < 2}
                    className="rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:opacity-40"
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAddingQuartier(false); setNewQuartier(""); }}
                    className="rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    Annuler
                  </button>
                  <p className="w-full text-xs text-muted-foreground">
                    Il sera ajouté à la liste et proposé aux prochains fidèles de {f.commune}.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Avenue</label>
              <input className={field + " mt-1"} value={f.avenue} maxLength={60} onChange={(e) => set("avenue", e.target.value)} placeholder="Av. Kianza" />
            </div>
            <div>
              <label className="text-sm font-medium">N° de la parcelle</label>
              <input className={field + " mt-1 font-mono"} value={f.parcelle} maxLength={10} onChange={(e) => set("parcelle", e.target.value)} placeholder="45" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">État civil</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {etatsCivils.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => set("etatCivil", e)}
                    className={
                      "rounded-2xl px-4 py-2 text-sm transition " +
                      (f.etatCivil === e ? "bg-brand-gradient text-white shadow-soft" : "bg-secondary text-foreground/70 hover:bg-brand-soft hover:text-brand")
                    }
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            {f.etatCivil === "Marié(e)" && (
              <div className="animate-fade-in sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium"><Users className="h-4 w-4 text-brand" /> Nombre d'enfants</label>
                <input type="number" min={0} max={20} className={field + " mt-1 font-mono"} value={f.enfants} onChange={(e) => set("enfants", Number(e.target.value))} />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Téléphone</label>
              <input className={field + " mt-1 font-mono"} value={f.telephone} maxLength={20} onChange={(e) => set("telephone", e.target.value)} placeholder="+243 …" />
            </div>
            <div>
              <label className="text-sm font-medium">Contact en cas d'urgence</label>
              <input className={field + " mt-1 font-mono"} value={f.urgence} maxLength={20} onChange={(e) => set("urgence", e.target.value)} placeholder="+243 …" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-3xl bg-brand-soft text-brand">
                {f.photo ? <img src={f.photo} alt="Photo de profil" className="h-full w-full object-cover" /> : <Camera className="h-7 w-7" />}
              </div>
              <div>
                <button type="button" onClick={() => fileRef.current?.click()} className="rounded-2xl bg-secondary px-4 py-2 text-sm font-medium transition hover:bg-brand-soft hover:text-brand">
                  Choisir une photo
                </button>
                <p className="mt-1 text-xs text-muted-foreground">Facultatif — depuis votre galerie, 2 Mo max.</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium"><CalendarDays className="h-4 w-4 text-brand" /> Date de naissance</label>
              <input type="date" className={field + " mt-1 font-mono"} value={f.naissance} onChange={(e) => set("naissance", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Département</label>
              <FancySelect
                className="mt-1"
                ariaLabel="Département"
                placeholder="Choisissez un département…"
                value={f.departement}
                onChange={(v) => set("departement", v)}
                options={departmentNames}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  className={field + " pr-12 font-mono"}
                  value={f.password}
                  maxLength={64}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="4 caractères minimum"
                />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label="Afficher" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition disabled:opacity-0"
        >
          <ChevronLeft className="h-4 w-4" /> Retour
        </button>
        <button
          onClick={() => (step === 3 ? finish() : setStep((s) => s + 1))}
          disabled={!valid}
          className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:opacity-40"
        >
          {step === 3 ? "Valider mon inscription" : "Continuer"}
          {step === 3 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}