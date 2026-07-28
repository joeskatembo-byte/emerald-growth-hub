import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export function ContactHero() {
  return (
    <section className="mx-auto mt-6 w-[min(1200px,95%)]">
      <div className="glass-card relative overflow-hidden rounded-3xl p-6 shadow-soft sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
              <MessageCircle className="h-3.5 w-3.5" /> Nous écrire
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Une porte toujours <span className="bg-gradient-to-r from-brand to-emerald-600 bg-clip-text text-transparent">ouverte</span>.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Confiez un sujet de prière, réservez un rendez-vous avec le pasteur, ou envoyez-nous simplement un message. Chaque demande est reçue avec attention et confidentialité.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { Icon: MapPin, k: "Adresse", v: "Av. de la Paix 45, Kinshasa, RDC" },
              { Icon: Phone, k: "Téléphone", v: "+243 000 000 000" },
              { Icon: Mail, k: "E-mail", v: "contact@emmanuel-rdc.org" },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="glass-card flex items-center gap-3 rounded-2xl p-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                  <div className="truncate font-numeric text-sm font-semibold text-foreground">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
