import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { useCollection } from "@/lib/collections";
import { INVITES_KEY, MEDITATION_KEY, meditations as seed, type Meditation, type PreachInvite } from "@/data/mock";

export const Route = createFileRoute("/precher/$token")({
  head: () => ({
    meta: [
      { title: "Prêcher à distance — Église Emmanuel" },
      { name: "description", content: "Espace réservé aux pasteurs invités pour partager une parole à méditer avec les fidèles." },
      { property: "og:title", content: "Prêcher à distance — Église Emmanuel" },
      { property: "og:description", content: "Partagez une parole à méditer avec les fidèles de l'Église Emmanuel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreachPage,
});

const field = "w-full rounded-2xl border border-border bg-card px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "text-xs font-medium uppercase tracking-widest text-muted-foreground";

function PreachPage() {
  const { token } = Route.useParams();
  const invites = useCollection<PreachInvite>(INVITES_KEY, []);
  const meds = useCollection<Meditation>(MEDITATION_KEY, seed);
  const invite = invites.rows.find((i) => i.token === token);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [d, setD] = useState({ book: "", verse: "", body: "", servant: invite?.guest ?? "" });
  const servant = d.servant || invite?.guest || "";

  if (done) {
    return (
      <Shell>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-100 text-blue-600"><Check className="h-7 w-7" /></div>
        <h1 className="mt-4 font-display text-2xl font-bold">Merci, serviteur de Dieu !</h1>
        <p className="mt-2 text-sm text-muted-foreground">Votre parole a été transmise au pasteur titulaire. Elle sera visible par les fidèles dès sa validation.</p>
        <Link to="/" className="tap-motion mt-6 inline-flex rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">Retour à l'accueil</Link>
      </Shell>
    );
  }

  if (!invite || invite.used === "Oui") {
    return (
      <Shell>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-rose-600"><ShieldAlert className="h-7 w-7" /></div>
        <h1 className="mt-4 font-display text-2xl font-bold">Lien invalide ou déjà utilisé</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demandez un nouveau lien d'invitation au pasteur titulaire de l'Église Emmanuel.</p>
      </Shell>
    );
  }

  const steps = ["Référence", "Parole", "Serviteur"];
  const canNext = step === 0 ? d.book.trim() && d.verse.trim() : step === 1 ? d.body.trim().length > 10 : servant.trim();

  const submit = () => {
    meds.create({
      book: d.book.trim(), verse: d.verse.trim(), body: d.body.trim(), servant: servant.trim(),
      initial: servant.trim().charAt(0).toUpperCase(), active: "Non", status: "pending", guest: invite.guest,
    } as Omit<Meditation, "id">);
    invites.update(invite.id, { used: "Oui" });
    setDone(true);
  };

  return (
    <Shell>
      <div className="text-xs uppercase tracking-widest text-brand"><BookOpen className="mr-1 inline h-3.5 w-3.5" />Invitation à prêcher</div>
      <h1 className="mt-1 font-display text-2xl font-bold">Bienvenue, {invite.guest}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Nourrissez les brebis même de loin : partagez le livre et la parole à méditer.</p>
      <div className="mt-5 flex gap-1.5">
        {steps.map((_, i) => <div key={i} className={"h-1.5 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-foreground/10")} />)}
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Étape {step + 1} / 3</p>
      <h2 className="font-display text-lg font-bold">{steps[step]}</h2>
      <div className="mt-3 grid gap-3 text-left">
        {step === 0 && (<>
          <div><label className={label}>Livre</label><input className={field + " mt-1"} placeholder="Ex. Jean" value={d.book} onChange={(e) => setD({ ...d, book: e.target.value })} /></div>
          <div><label className={label}>Verset</label><input className={field + " mt-1 font-mono"} placeholder="Ex. 3 : 16" value={d.verse} onChange={(e) => setD({ ...d, verse: e.target.value })} /></div>
        </>)}
        {step === 1 && (<div><label className={label}>Parole à méditer</label><textarea rows={6} maxLength={500} className={field + " mt-1 resize-none"} value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} /></div>)}
        {step === 2 && (<div><label className={label}>Votre nom (serviteur)</label><input className={field + " mt-1"} value={servant} onChange={(e) => setD({ ...d, servant: e.target.value })} /></div>)}
      </div>
      <div className="mt-6 flex justify-between gap-2">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="tap-motion flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm disabled:opacity-40"><ChevronLeft className="h-4 w-4" />Retour</button>
        {step < 2
          ? <button disabled={!canNext} onClick={() => setStep(step + 1)} className="tap-motion flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Suivant<ChevronRight className="h-4 w-4" /></button>
          : <button disabled={!canNext} onClick={submit} className="tap-motion flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"><Check className="h-4 w-4" />Envoyer pour validation</button>}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto my-12 w-[min(560px,92%)]">
      <div className="glass-card animate-fade-in rounded-3xl p-6 text-center shadow-soft sm:p-8 [&>*]:mx-auto">{children}</div>
    </main>
  );
}
