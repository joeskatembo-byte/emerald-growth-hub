import { useCallback, useEffect, useState } from "react";

const EVT = "ee-collection-change";

export type Row = Record<string, unknown> & { id: string };

function read<T extends Row>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

/** Petit magasin local (démo) : CRUD complet, persisté dans le navigateur. */
export function useCollection<T extends Row>(key: string, seed: T[]) {
  const [rows, setRows] = useState<T[]>(seed);

  useEffect(() => {
    const sync = () => setRows(read<T>(key, seed));
    sync();
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const commit = useCallback(
    (next: T[]) => {
      localStorage.setItem(key, JSON.stringify(next));
      setRows(next);
      window.dispatchEvent(new Event(EVT));
    },
    [key],
  );

  const create = useCallback((row: Omit<T, "id">) => {
    commit([{ ...(row as T), id: `x-${Date.now()}` }, ...read<T>(key, seed)]);
  }, [commit, key, seed]);

  const update = useCallback((id: string, patch: Partial<T>) => {
    commit(read<T>(key, seed).map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, [commit, key, seed]);

  const remove = useCallback((id: string) => {
    commit(read<T>(key, seed).filter((r) => r.id !== id));
  }, [commit, key, seed]);

  const reset = useCallback(() => commit(seed), [commit, seed]);

  /** Déplace un élément (glisser-déposer) : réordonne l'affichage public. */
  const reorder = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return;
    const list = [...read<T>(key, seed)];
    const from = list.findIndex((r) => r.id === fromId);
    const to = list.findIndex((r) => r.id === toId);
    if (from < 0 || to < 0) return;
    const [moved] = list.splice(from, 1);
    list.splice(to, 0, moved);
    commit(list);
  }, [commit, key, seed]);

  return { rows, create, update, remove, reset, reorder };
}
/** Réglages uniques (objet unique persisté), ex. le pied de page. */
export function useSettings<T extends Record<string, unknown>>(key: string, seed: T) {
  const [value, setValue] = useState<T>(seed);

  useEffect(() => {
    const sync = () => {
      if (typeof window === "undefined") return;
      try {
        const raw = localStorage.getItem(key);
        setValue(raw ? { ...seed, ...(JSON.parse(raw) as T) } : seed);
      } catch {
        setValue(seed);
      }
    };
    sync();
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = useCallback(
    (next: T) => {
      localStorage.setItem(key, JSON.stringify(next));
      setValue(next);
      window.dispatchEvent(new Event(EVT));
    },
    [key],
  );

  const reset = useCallback(() => {
    localStorage.removeItem(key);
    setValue(seed);
    window.dispatchEvent(new Event(EVT));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { value, save, reset };
}
