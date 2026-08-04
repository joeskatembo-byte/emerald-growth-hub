import { HeartHandshake, CalendarClock, Church, ArrowRight } from "lucide-react";
import type { ContactKind } from "./ContactModal";

const cards: { key: ContactKind; title: string; desc: string; Icon: typeof HeartHandshake; hue: string }[] = [
  {
    key: "intercession",
    title: "Intercession",
    desc: "Confiez un sujet de prière — l'équipe d'intercession se joint à vous et vous répond une fois le combat porté.",
    Icon: HeartHandshake,
    hue: "from-emerald-500 to-teal-700",
  },
  {
    key: "rendez-vous",
    title: "Rendez-vous pasteur",
    desc: "Réservez un créneau confidentiel de 45 minutes. Le pasteur valide personnellement chaque rencontre.",
    Icon: CalendarClock,
    hue: "from-amber-500 to-orange-700",
  },
  {
    key: "message",
    title: "Contacter l'église",
    desc: "Toute autre demande — administrative, partenariat, presse. Le secrétariat vous répond sous 48 h.",
    Icon: Church,
    hue: "from-indigo-600 to-blue-900",
  },
];

export function ContactChoices({ onOpen }: { onOpen: (kind: ContactKind) => void }) {
  return (
    <section className="mx-auto mt-14 w-[min(1200px,95%)]">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-brand">Choisissez votre canal</div>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Comment pouvons-nous vous accompagner ?</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ key, title, desc, Icon, hue }) => (
          <button
            key={key}
            onClick={() => onOpen(key)}
            className="group glass-card hover-tilt relative overflow-hidden rounded-3xl p-6 text-left shadow-soft"
          >
            <div className={"pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-30 blur-2xl transition group-hover:opacity-60 " + hue} />
            <div className={"relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft " + hue}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="relative mt-4 font-display text-xl font-bold text-foreground">{title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            <div className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              Ouvrir le formulaire
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
