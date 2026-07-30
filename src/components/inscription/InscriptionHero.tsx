import { UserPlus, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

export function InscriptionHero() {
  return (
    <section className="mx-auto mt-6 w-[min(1200px,95%)]">
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-soft sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Bienvenue à la maison
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            Devenez membre, entrez dans la famille
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Un compte, c'est bien plus qu'un profil : c'est une place réservée, un berger qui vous connaît
            par votre nom et un département où vos dons portent du fruit.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: UserPlus, t: "4 étapes", d: "Inscription simple et guidée" },
              { Icon: HeartHandshake, t: "Un accueil", d: "Un serviteur vous contacte" },
              { Icon: ShieldCheck, t: "Confidentiel", d: "Vos données restent protégées" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Icon className="h-5 w-5" />
                <div className="mt-2 font-display text-sm font-semibold">{t}</div>
                <div className="text-xs text-white/70">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}