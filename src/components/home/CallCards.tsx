import { Link } from "@tanstack/react-router";
import { HeartHandshake, BookOpen, CalendarClock, ArrowRight } from "lucide-react";
import { meditation } from "@/data/mock";

export function CallCards() {
  return (
    <section className="mx-auto mt-14 w-[min(1200px,95%)]">
      <div className="mb-6 text-center">
        <div className="text-xs uppercase tracking-widest text-brand">Appel</div>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Là où la foi rencontre ta vie</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">Jésus t'attend. Peu importe ton chemin, il y a une place pour toi ici.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 md:items-center">
        <article className="group glass-card flex h-full flex-col justify-between rounded-3xl p-6 shadow-soft transition hover:-translate-y-1 md:mt-6">
          <div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-700"><HeartHandshake className="h-6 w-6" /></div>
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">Besoin d'aide ?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tu n'as pas à porter ce fardeau seul. Écris-nous — un intercesseur t'écoutera et priera pour toi, en toute confidentialité.</p>
          </div>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand story-link">Nous écrire <ArrowRight className="h-4 w-4" /></Link>
        </article>
        <article className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white shadow-soft md:scale-[1.04]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="flex items-start justify-between gap-3">
            <div className="font-display text-lg font-bold">{meditation.book}</div>
            <div className="font-numeric text-sm tracking-wider text-white/90">{meditation.verse}</div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-widest text-white/70"><BookOpen className="h-3.5 w-3.5" /> À méditer</div>
          <p className="mt-4 text-base leading-relaxed text-white/95">{meditation.body}</p>
          <div className="mt-6 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand font-bold">{meditation.initial}</div>
            <div className="text-sm">{meditation.servant}</div>
          </div>
        </article>
        <article className="group glass-card flex h-full flex-col justify-between rounded-3xl p-6 shadow-soft transition hover:-translate-y-1 md:mt-6">
          <div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><CalendarClock className="h-6 w-6" /></div>
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">Rendez-vous</h3>
            <p className="mt-2 text-sm text-muted-foreground">Un moment d'écoute avec le pasteur ou un serviteur. Prends rendez-vous, nous te répondrons rapidement.</p>
          </div>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand story-link">Prendre RDV <ArrowRight className="h-4 w-4" /></Link>
        </article>
      </div>
    </section>
  );
}