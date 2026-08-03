import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type FancyOption = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: (string | FancyOption)[];
  placeholder?: string;
  className?: string;
  /** Affiche un champ de recherche (utile pour les longues listes, ex. communes). */
  searchable?: boolean;
  size?: "md" | "sm";
  ariaLabel?: string;
};

function norm(o: string | FancyOption): FancyOption {
  return typeof o === "string" ? { value: o, label: o } : o;
}

/** Liste déroulante haut de gamme : panneau blanc arrondi, items en pilule au survol. */
export function FancySelect({
  value,
  onChange,
  options,
  placeholder = "Sélectionnez…",
  className,
  searchable,
  size = "md",
  ariaLabel,
}: Props) {
  const items = useMemo(() => options.map(norm), [options]);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = items.find((i) => i.value === value);
  const filtered = q.trim()
    ? items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase()))
    : items;

  const trigger =
    size === "sm"
      ? "rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs"
      : "rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm";

  return (
    <div ref={wrap} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => { setOpen((o) => !o); setQ(""); }}
        className={cn(
          "flex w-full items-center justify-between gap-2 text-left outline-none transition",
          trigger,
          open ? "border-brand ring-2 ring-brand/15" : "hover:border-brand/40",
        )}
      >
        <span className={cn("min-w-0 truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300", open && "rotate-180 text-brand")} />
      </button>

      {open && (
        <div
          role="listbox"
          className="animate-fade-in absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-3xl border border-border/60 bg-card p-1.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25),0_2px_8px_-3px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          {searchable && (
            <div className="mb-1 flex items-center gap-2 rounded-2xl bg-secondary/70 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher…"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            {filtered.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">Aucun résultat</div>
            )}
            {filtered.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition",
                    active ? "bg-brand-soft font-semibold text-brand" : "text-foreground/85 hover:bg-secondary",
                  )}
                >
                  <span className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition",
                    active ? "border-brand bg-brand text-white" : "border-border text-transparent",
                  )}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 truncate">{o.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
