import { HandHeart, ShieldCheck, TrendingUp } from "lucide-react";

export function DonHero() {
  return (
    <section className="mx-auto mt-6 w-[min(1200px,95%)]">
      <div className="glass-card relative overflow-hidden rounded-3xl p-6 shadow-soft sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
              <HandHeart className="h-3.5 w-3.5" /> Soutenir l'œuvre
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Chaque centime devient <span className="bg-gradient-to-r from-brand to-emerald-600 bg-clip-text text-transparent">une bénédiction</span>.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Dîme, offrande, don ponctuel ou engagement mensuel — vous soutenez un temple, un orphelinat, un dispensaire et des vies transformées. Zéro opacité, cent pour cent d'impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projets" className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:brightness-110">
                <TrendingUp className="h-4 w-4" /> Voir les projets
              </a>
              <a href="#faq" className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-foreground/80 transition hover:bg-brand-soft hover:text-brand">
                <ShieldCheck className="h-4 w-4" /> Transparence
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "1 200", v: "familles aidées / an" },
              { k: "27 ans", v: "d'histoire" },
              { k: "100 %", v: "traçabilité" },
              { k: "48", v: "diplômés envoyés" },
            ].map((s) => (
              <div key={s.v} className="glass-card rounded-2xl p-4">
                <div className="font-numeric text-2xl font-bold text-brand">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
