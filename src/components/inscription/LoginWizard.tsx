import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye, EyeOff, LogIn, User, KeyRound, AlertCircle } from "lucide-react";
import { login } from "@/lib/session";

export function LoginWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [names, setNames] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = () => {
    setBusy(true);
    setError(null);
    const res = login(names, password);
    if (!res.ok) {
      setBusy(false);
      setError(res.error);
      return;
    }
    const dest = res.user.role === "admin" ? "/admin" : "/profil";
    setTimeout(() => navigate({ to: dest }), 350);
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-white">
          <LogIn className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Se connecter</h2>
          <p className="text-xs text-muted-foreground">Déjà membre ? Retrouvez votre espace.</p>
        </div>
      </div>

      <div className="mt-5 flex gap-1.5">
        {[0, 1].map((i) => (
          <div key={i} className={"h-1.5 flex-1 rounded-full transition-all " + (i <= step ? "bg-brand" : "bg-border")} />
        ))}
      </div>

      <div className="mt-5 min-h-[168px]">
        {step === 0 ? (
          <div className="animate-fade-in space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-brand" /> Vos noms
            </label>
            <input
              autoFocus
              value={names}
              onChange={(e) => { setNames(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && names.trim().length > 1 && setStep(1)}
              placeholder="Nom, prénom, ou les deux"
              maxLength={80}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <p className="text-xs text-muted-foreground">
              Ex. « Mbayo », « Josué » ou « Mbayo Josué » — les trois fonctionnent.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <KeyRound className="h-4 w-4 text-brand" /> Mot de passe
            </label>
            <div className="relative">
              <input
                autoFocus
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                onKeyDown={(e) => e.key === "Enter" && password.length > 0 && submit()}
                maxLength={64}
                className="w-full rounded-2xl border border-border bg-card px-4 py-3 pr-12 font-mono text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Masquer" : "Afficher"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Bonjour <span className="font-semibold text-foreground">{names}</span> — heureux de vous revoir.
            </p>
          </div>
        )}

        {error && (
          <div className="animate-fade-in mt-3 flex items-start gap-2 rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep(0)}
          disabled={step === 0}
          className="flex items-center gap-1 rounded-2xl px-3 py-2 text-sm text-muted-foreground transition disabled:opacity-0"
        >
          <ChevronLeft className="h-4 w-4" /> Retour
        </button>
        {step === 0 ? (
          <button
            onClick={() => setStep(1)}
            disabled={names.trim().length < 2}
            className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:opacity-40"
          >
            Continuer <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={password.length < 1 || busy}
            className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 disabled:opacity-40"
          >
            {busy ? "Connexion…" : "Se connecter"} <LogIn className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-4 rounded-2xl bg-brand-soft p-3 text-xs text-brand">
        Comptes de démonstration : <span className="font-mono">Pasteur / admin</span> (administration),
        <span className="font-mono"> Josué / jeunesse</span> (chef de département),
        <span className="font-mono"> Marie / marie</span> (membre).
      </p>
    </div>
  );
}