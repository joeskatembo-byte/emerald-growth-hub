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

  return { rows, create, update, remove, reset };
}