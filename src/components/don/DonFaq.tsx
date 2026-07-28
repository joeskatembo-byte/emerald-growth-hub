import { useState } from "react";
import { donFaq } from "@/data/don";
import { Plus } from "lucide-react";

export function DonFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto mt-16 w-[min(1200px,95%)]">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-brand">Vos questions</div>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Où va chaque centime ?</h2>
      </div>
      <div className="space-y-3">
        {donFaq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="glass-card overflow-hidden rounded-3xl">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-numeric text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-base font-semibold text-foreground sm:text-lg">{item.q}</span>
                <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform duration-500 " + (isOpen ? "rotate-[135deg] scale-110" : "")}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="flex px-5 pb-5">
                    <div className="w-10 shrink-0" />
                    <p className={"pr-4 text-sm leading-relaxed text-muted-foreground transition-all duration-500 " + (isOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
