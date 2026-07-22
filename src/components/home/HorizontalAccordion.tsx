import { useState } from "react";
import { faq } from "@/data/mock";
import { Plus } from "lucide-react";

export function HorizontalAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto mt-16 w-[min(1200px,95%)]">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-brand">Questions fréquentes</div>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Vous vous demandez peut-être…</h2>
      </div>
      <div className="space-y-3">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="glass-card overflow-hidden rounded-3xl">
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-4 p-5 text-left" aria-expanded={isOpen}>
                <span className="font-numeric text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-base font-semibold text-foreground sm:text-lg">{item.q}</span>
                <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform duration-500 " + (isOpen ? "rotate-[135deg]" : "")}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div className="flex px-5 pb-1">
                <div className="w-10 shrink-0" />
                <div className="h-accordion-panel flex-1" data-open={isOpen}>
                  <div><p className="pb-5 pr-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}