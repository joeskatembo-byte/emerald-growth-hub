import { useEffect, useState } from "react";
import { X, ChevronRight, ChevronLeft, Check, HeartHandshake, CalendarClock, Church } from "lucide-react";

export type ContactKind = "intercession" | "rendez-vous" | "message";

const config: Record<ContactKind, {
  title: string;
  intro: string;
  Icon: typeof HeartHandshake;
  hue: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  bodyLabel: string;
  bodyPlaceholder: string;
  successTitle: string;
  successBody: string;
}> = {
  intercession: {
    title: "Sujet de prière",
    intro: "Votre demande est confiée à l'équipe d'intercession, dans la plus stricte confidentialité.",
    Icon: HeartHandshake,
    hue: "from-emerald-500 to-teal-700",
    subjectLabel: "Objet de la prière",
    subjectPlaceholder: "Ex. Santé, famille, travail…",
    bodyLabel: "Détail (facultatif)",
    bodyPlaceholder: "Partagez ce que vous souhaitez, avec la liberté du cœur…",
    successTitle: "Nous prions pour vous",
    successBody: "L'équipe d'intercession a reçu votre sujet. Un signal vous sera envoyé une fois le combat porté.",
  },
  "rendez-vous": {
    title: "Rendez-vous avec le pasteur",
    intro: "Le pasteur reçoit toutes les demandes et valide personnellement chaque rencontre.",
    Icon: CalendarClock,
    hue: "from-amber-500 to-orange-700",
    subjectLabel: "Motif du rendez-vous",
    subjectPlaceholder: "Ex. Accompagnement, conseil, projet…",
    bodyLabel: "Disponibilités & précisions",
    bodyPlaceholder: "Vos disponibilités, urgence éventuelle, informations utiles…",
    successTitle: "Demande transmise",
    successBody: "Le pasteur examinera personnellement votre demande et reviendra vers vous sous peu.",
  },
  message: {
    title: "Contacter l'église",
    intro: "Toute demande arrive à l'administration — un serviteur vous répond sous 48 h.",
    Icon: Church,
    hue: "from-indigo-600 to-blue-900",
    subjectLabel: "Objet du message",
    subjectPlaceholder: "Ex. Partenariat, information, presse…",
    bodyLabel: "Votre message",
    bodyPlaceholder: "Écrivez librement, avec autant de détails que nécessaire…",
    successTitle: "Message reçu",
    successBody: "Merci ! Votre message est arrivé au secrétariat. Un serviteur vous répondra rapidement.",
  },
};

export function ContactModal({ kind, onClose }: { kind: ContactKind; onClose: () => void }) {
  const c = config[kind];
  const [step, setStep] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const canNext =
    step === 0 ? (anonymous || name.trim().length > 1) :
    step === 1 ? subject.trim().length > 1 :
    step === 2 ? body.trim().length > 4 : true;

  const Icon = c.Icon;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-fade-in overflow-hidden rounded-3xl bg-background shadow-2xl">
        <div className={"relative overflow-hidden bg-gradient-to-br p-5 text-white " + c.hue}>
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold">{c.title}</div>
                <div className="text-xs text-white/85">{c.intro}</div>
              </div>
            </div>
            <button onClick={onClose} aria-label="Fermer" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={"h-1.5 flex-1 rounded-full transition-all duration-500 " + (i <= step ? "bg-brand" : "bg-foreground/10")} />
            ))}
          </div>

          {step === 0 && (
            <div className="animate-fade-in space-y-4">
              <h3 className="font-display text-lg font-bold">Qui êtes-vous ?</h3>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-secondary/60 p-3">
                <div>
                  <div className="text-sm font-semibold">Rester anonyme</div>
                  <div className="text-xs text-muted-foreground">Votre demande est traitée sans identification.</div>
                </div>
                <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-5 w-5 accent-emerald-700" />
              </label>
              {!anonymous && (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom ou prénom"
                  className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                />
              )}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Téléphone (facultatif)"
                inputMode="tel"
                className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in space-y-3">
              <h3 className="font-display text-lg font-bold">{c.subjectLabel}</h3>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={c.subjectPlaceholder}
                className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-3">
              <h3 className="font-display text-lg font-bold">{c.bodyLabel}</h3>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder={c.bodyPlaceholder}
                className="w-full resize-none rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none"
              />
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Autre information utile (facultatif)"
                className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-3 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold">{c.successTitle}</h3>
              <p className="text-sm text-muted-foreground">{c.successBody}</p>
              <button onClick={onClose} className="mt-2 w-full rounded-2xl bg-brand-gradient py-2.5 text-sm font-semibold text-white">Fermer</button>
            </div>
          )}

          {step < 3 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-2xl bg-secondary px-4 py-2 text-sm disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext}
                className="inline-flex items-center gap-1 rounded-2xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft disabled:opacity-50"
              >
                {step === 2 ? "Envoyer" : "Suivant"} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
