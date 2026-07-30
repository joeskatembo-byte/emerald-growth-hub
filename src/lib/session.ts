import { useEffect, useState } from "react";

export type Role = "admin" | "chef" | "membre";

export type Member = {
  id: string;
  nom: string;
  prenom: string;
  commune: string;
  avenue: string;
  parcelle: string;
  etatCivil: string;
  enfants: number;
  telephone: string;
  urgence: string;
  photo: string | null;
  naissance: string;
  departement: string;
  password: string;
  role: Role;
  createdAt: string;
};

const MKEY = "ee.members.v1";
const SKEY = "ee.session.v1";
const EVT = "ee-session-change";

const seed: Member[] = [
  {
    id: "m-admin", nom: "Emmanuel", prenom: "Pasteur", commune: "Gombe", avenue: "de la Paix",
    parcelle: "45", etatCivil: "Marié(e)", enfants: 3, telephone: "+243 000 000 001",
    urgence: "+243 000 000 002", photo: null, naissance: "1970-04-12", departement: "Aucun",
    password: "admin", role: "admin", createdAt: "2024-01-01",
  },
  {
    id: "m-chef", nom: "Mbayo", prenom: "Josué", commune: "Limete", avenue: "Kasaï",
    parcelle: "12", etatCivil: "Marié(e)", enfants: 2, telephone: "+243 000 000 003",
    urgence: "+243 000 000 004", photo: null, naissance: "1988-09-03", departement: "Jeunesse",
    password: "jeunesse", role: "chef", createdAt: "2024-02-10",
  },
  {
    id: "m-1", nom: "Kabongo", prenom: "Marie", commune: "Lemba", avenue: "Kianza",
    parcelle: "7", etatCivil: "Veuf/Veuve", enfants: 0, telephone: "+243 000 000 005",
    urgence: "+243 000 000 006", photo: null, naissance: "1979-11-21", departement: "Femmes",
    password: "marie", role: "membre", createdAt: "2025-03-04",
  },
];

const isBrowser = () => typeof window !== "undefined";

export function listMembers(): Member[] {
  if (!isBrowser()) return seed;
  try {
    const raw = localStorage.getItem(MKEY);
    if (!raw) {
      localStorage.setItem(MKEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Member[];
  } catch {
    return seed;
  }
}

export function saveMembers(list: Member[]) {
  if (!isBrowser()) return;
  localStorage.setItem(MKEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVT));
}

function normalize(v: string) {
  return v.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Le champ « noms » accepte : nom seul, prénom seul, ou « nom prénom » / « prénom nom ». */
export function matchName(m: Member, input: string) {
  const q = normalize(input);
  const nom = normalize(m.nom);
  const prenom = normalize(m.prenom);
  return [nom, prenom, `${nom} ${prenom}`, `${prenom} ${nom}`].includes(q);
}

export function login(names: string, password: string): { ok: true; user: Member } | { ok: false; error: string } {
  const found = listMembers().find((m) => matchName(m, names));
  if (!found) return { ok: false, error: "Aucun compte ne correspond à ce nom." };
  if (found.password !== password) return { ok: false, error: "Mot de passe incorrect." };
  if (isBrowser()) {
    localStorage.setItem(SKEY, found.id);
    window.dispatchEvent(new Event(EVT));
  }
  return { ok: true, user: found };
}

export function signup(data: Omit<Member, "id" | "role" | "createdAt">): Member {
  const member: Member = {
    ...data,
    id: `m-${Date.now()}`,
    role: "membre",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  const list = [...listMembers(), member];
  saveMembers(list);
  if (isBrowser()) localStorage.setItem(SKEY, member.id);
  if (isBrowser()) window.dispatchEvent(new Event(EVT));
  return member;
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(SKEY);
  window.dispatchEvent(new Event(EVT));
}

export function currentUser(): Member | null {
  if (!isBrowser()) return null;
  const id = localStorage.getItem(SKEY);
  if (!id) return null;
  return listMembers().find((m) => m.id === id) ?? null;
}

export function updateMember(id: string, patch: Partial<Member>) {
  saveMembers(listMembers().map((m) => (m.id === id ? { ...m, ...patch } : m)));
}

export function removeMember(id: string) {
  saveMembers(listMembers().filter((m) => m.id !== id));
}

export function useSession() {
  const [user, setUser] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(currentUser());
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, ready };
}

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    const sync = () => setMembers(listMembers());
    sync();
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);
  return members;
}