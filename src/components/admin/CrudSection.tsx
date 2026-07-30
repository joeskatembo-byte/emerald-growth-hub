import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, RotateCcw, Search } from "lucide-react";
import { useCollection, type Row } from "@/lib/collections";

export type Column = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "date";
  options?: readonly string[];
  mono?: boolean;
  hideOnMobile?: boolean;
};

const field =
  "w-full rounded-2xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export function CrudSection<T extends Row>({
  title, description, storageKey, seed, columns,
}: {
  title: string;
  description: string;
  storageKey: string;
  seed: T[];
  columns: Column[];
}) {
  const { rows, create, update, remove, reset } = useCollection<T>(storageKey, seed);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [q, setQ] = useState("");

  const startNew = () => {
    setDraft(Object.fromEntries(columns.map((c) => [c.key, c.type === "number" ? 0 : c.options?.[0] ?? ""])));
    setEditing("new");
  };
  const startEdit = (row: T) => { setDraft({ ...row }); setEditing(row.id); };
  const save = () => {
    if (editing === "new") create(draft as Omit<T, "id">);
    else if (editing) update(editing, draft as Partial<T>);
    setEditing(null);
  };

  const filtered = rows.filter((r) =>
    q.trim() === "" || JSON.stringify(r).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="animate-fade-in glass-card rounded-3xl p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className={field + " w-44 pl-9"} />
          </div>
          <button onClick={reset} title="Réinitialiser" className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-muted-foreground transition hover:text-brand">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button onClick={startNew} className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>

      {editing && (
        <div className="animate-fade-in mt-4 rounded-3xl border border-brand/20 bg-brand-soft/40 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {columns.map((c) => (
              <div key={c.key} className={c.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{c.label}</label>
                {c.type === "textarea" ? (
                  <textarea rows={3} maxLength={500} className={field + " mt-1 resize-none"} value={String(draft[c.key] ?? "")} onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.value }))} />
                ) : c.type === "select" ? (
                  <select className={field + " mt-1"} value={String(draft[c.key] ?? "")} onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.value }))}>
                    {(c.options ?? []).map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={c.type === "number" ? "number" : c.type === "date" ? "date" : "text"}
                    maxLength={120}
                    className={field + " mt-1 " + (c.mono || c.type === "number" ? "font-mono" : "")}
                    value={String(draft[c.key] ?? "")}
                    onChange={(e) => setDraft((d) => ({ ...d, [c.key]: c.type === "number" ? Number(e.target.value) : e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={save} className="flex items-center gap-1.5 rounded-2xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft">
              <Check className="h-4 w-4" /> Enregistrer
            </button>
            <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-2 text-sm">
              <X className="h-4 w-4" /> Annuler
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              {columns.map((c) => (
                <th key={c.key} className={"px-3 pb-1 font-medium " + (c.hideOnMobile ? "hidden md:table-cell" : "")}>{c.label}</th>
              ))}
              <th className="px-3 pb-1 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="bg-card transition hover:bg-brand-soft/40">
                {columns.map((c, i) => (
                  <td
                    key={c.key}
                    className={
                      "max-w-[280px] truncate px-3 py-3 " +
                      (i === 0 ? "rounded-l-2xl font-medium" : "") +
                      (c.mono || c.type === "number" ? " font-mono text-xs" : "") +
                      (c.hideOnMobile ? " hidden md:table-cell" : "")
                    }
                  >
                    {String(r[c.key] ?? "—")}
                  </td>
                ))}
                <td className="rounded-r-2xl px-3 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <button onClick={() => startEdit(r)} aria-label="Modifier" className="grid h-8 w-8 place-items-center rounded-xl bg-secondary text-muted-foreground transition hover:text-brand">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => remove(r.id)} aria-label="Supprimer" className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive/20">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="rounded-2xl bg-card px-3 py-8 text-center text-muted-foreground">Aucun enregistrement.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}