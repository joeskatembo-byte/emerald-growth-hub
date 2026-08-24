import { useCallback, useEffect, useState } from "react";
import { QUARTIERS_CUSTOM_KEY, quartiersParCommune } from "@/data/quartiers";

const EVT = "ee-quartiers-change";

type CustomMap = Record<string, string[]>;

function readCustom(): CustomMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(QUARTIERS_CUSTOM_KEY) || "{}") as CustomMap;
  } catch {
    return {};
  }
}

const same = (a: string, b: string) =>
  a.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
  b.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Ajoute un quartier saisi par un utilisateur : il devient sélectionnable pour tout le monde. */
export function addQuartier(commune: string, quartier: string) {
  const q = quartier.trim();
  if (!commune || q.length < 2) return;
  const custom = readCustom();
  const base = quartiersParCommune[commune] ?? [];
  const existing = [...base, ...(custom[commune] ?? [])];
  if (existing.some((x) => same(x, q))) return;
  custom[commune] = [...(custom[commune] ?? []), q];
  localStorage.setItem(QUARTIERS_CUSTOM_KEY, JSON.stringify(custom));
  window.dispatchEvent(new Event(EVT));
}

/** Liste des quartiers d'une commune (référentiel + ajouts des utilisateurs). */
export function useQuartiers(commune: string) {
  const [custom, setCustom] = useState<CustomMap>({});

  useEffect(() => {
    const sync = () => setCustom(readCustom());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const list = [...(quartiersParCommune[commune] ?? []), ...(custom[commune] ?? [])].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );

  const add = useCallback((q: string) => addQuartier(commune, q), [commune]);

  return { quartiers: list, add };
}
