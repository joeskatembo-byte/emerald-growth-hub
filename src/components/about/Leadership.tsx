import { useState } from "react";
import { leaders, type Leader } from "@/data/about";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Quote, X } from "lucide-react";

export function Leadership() {
  const [open, setOpen] = useState<Leader | null>(null);

  return (
    <section id="leadership" className="mx-auto mt-16 w-[min(1200px,95%)] scroll-mt-24">
      <div className="mb-6 text-center">
        <div className="text-xs uppercase tracking-widest text-brand">Leadership</div>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Les serviteurs à ton service</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">Un conseil pastoral et administratif engagé, formé et transparent. Clique une carte pour lire la biographie complète.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((l) => (
          <button
            key={l.id}
            onClick={() => setOpen(l)}
            className="group relative overflow-hidden rounded-3xl text-left transition hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${l.hue}`} />
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{
              backgroundImage: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.35), transparent 45%)",
            }} />
            <div className="relative p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur font-display text-2xl font-bold shadow-soft">
                  {l.initial}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-display text-lg font-bold">{l.name}</div>
                  <div className="truncate text-xs uppercase tracking-widest text-white/80">{l.role}</div>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Quote className="h-4 w-4 text-white/70" />
                <p className="mt-1 text-sm italic text-white/95">« {l.quote} »</p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/90 transition group-hover:gap-2">
                Lire la bio →
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg overflow-hidden rounded-3xl p-0">
          {open && (
            <>
              <div className={`relative bg-gradient-to-br ${open.hue} p-6 text-white`}>
                <button onClick={() => setOpen(null)} aria-label="Fermer" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25">
                  <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 backdrop-blur font-display text-2xl font-bold">
                    {open.initial}
                  </div>
                  <div>
                    <DialogTitle className="font-display text-xl font-bold text-white">{open.name}</DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-widest text-white/80">{open.role}</DialogDescription>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="rounded-2xl bg-brand-soft p-4">
                  <Quote className="h-4 w-4 text-brand" />
                  <p className="mt-1 text-sm italic text-foreground">« {open.quote} »</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">{open.bio}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}