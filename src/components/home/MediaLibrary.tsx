import { useMemo, useState } from "react";
import { media, type Media } from "@/data/mock";
import { Play, Image as ImageIcon, Mic, FileImage, Heart, Share2, Download, X } from "lucide-react";

const iconFor: Record<Media["type"], typeof Play> = {
  "Vidéo": Play, Podcast: Mic, Affiche: FileImage, Photo: ImageIcon,
};

type Tab = "tout" | "evenements" | "quotidien";
const tabs: { id: Tab; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "evenements", label: "Événements" },
  { id: "quotidien", label: "Quotidien" },
];

export function MediaLibrary() {
  const [selected, setSelected] = useState<Media | null>(null);
  const [tab, setTab] = useState<Tab>("tout");
  const items = useMemo(
    () => (tab === "tout" ? media : media.filter((m) => m.category === tab)),
    [tab]
  );
  return (
    <section className="mt-16">
      <div className="mx-auto mb-6 w-[min(1200px,95%)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand">Médiathèque</div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Vivre l'église en images et en sons</h2>
          </div>
          <div className="inline-flex rounded-2xl bg-white/70 p-1 shadow-soft backdrop-blur">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={
                  "rounded-xl px-4 py-2 text-sm font-semibold transition " +
                  (tab === t.id ? "bg-brand-gradient text-white shadow-soft" : "text-muted-foreground hover:text-foreground")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-[min(1200px,95%)] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map((m) => {
          const Icon = iconFor[m.type];
          return (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft transition hover:scale-[1.02]"
            >
              <div className={"absolute inset-0 bg-gradient-to-br " + m.hue} />
              <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35)_0,transparent_50%)]" />
              <div className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">{m.type}</div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
                <div className="flex items-center gap-2 text-white"><Icon className="h-4 w-4" /><span className="font-numeric text-[10px] uppercase tracking-widest text-white/70">{m.date}</span></div>
                <div className="mt-1 font-display text-base font-semibold leading-tight text-white line-clamp-2">{m.title}</div>
              </div>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-lg animate-fade-in overflow-hidden rounded-3xl bg-background shadow-2xl">
            <div className={"relative h-64 bg-gradient-to-br " + selected.hue}>
              <button onClick={() => setSelected(null)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur"><X className="h-4 w-4" /></button>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="text-[10px] uppercase tracking-widest text-white/70">{selected.type} · {selected.date}</div>
                <div className="font-display text-2xl font-bold">{selected.title}</div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">Un aperçu de ce média. La page détaillée arrivera avec le back-office.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-2 text-sm text-rose-700"><Heart className="h-4 w-4" /> J'aime</button>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2 text-sm"><Share2 className="h-4 w-4" /> Partager</button>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white"><Download className="h-4 w-4" /> Télécharger</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}