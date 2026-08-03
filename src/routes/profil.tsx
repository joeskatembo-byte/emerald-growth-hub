import { FancySelect } from "@/components/ui/fancy-select";
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { LogOut, Save, ShieldCheck, UserCog, Users, CalendarClock, Phone, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { communes, etatsCivils, departmentNames } from "@/data/inscription";
import { departments } from "@/data/about";
import { useSession, updateMember, logout } from "@/lib/session";

export const Route = createFileRoute("/profil")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mon profil — Église Emmanuel" },
      { name: "description", content: "Espace membre : modifiez vos informations personnelles et gérez votre département." },
      { property: "og:title", content: "Mon profil — Église Emmanuel" },
      { property: "og:description", content: "Votre espace personnel de membre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

function Page() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string | number> | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/inscription" });
    if (user && !form) {
      const { password: _p, ...rest } = user;
      setForm(rest as unknown as Record<string, string | number>);
    }
  }, [ready, user, form, navigate]);

  if (!user || !form) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto mt-16 w-[min(900px,92%)] text-center text-muted-foreground">Chargement de votre espace…</main>
        <Footer />
      </div>
    );
  }

  const set = (k: string, v: string | number) => setForm((p) => ({ ...(p as object), [k]: v }) as Record<string, string | number>);
  const save = () => {
    updateMember(user.id, form as never);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const dept = departments.find((d) => d.name === user.departement);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-6 w-[min(1200px,95%)] pb-10">
        {/* En-tête profil */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
          <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center gap-5">
            <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-3xl bg-white/15 font-display text-2xl font-bold backdrop-blur">
              {user.photo ? <img src={user.photo} alt="" className="h-full w-full object-cover" /> : `${user.prenom[0] ?? ""}${user.nom[0] ?? ""}`}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-3xl font-bold">{user.prenom} {user.nom}</h1>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/15 px-3 py-1 uppercase tracking-widest">{user.role === "chef" ? "Chef de département" : user.role === "admin" ? "Administration" : "Membre"}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-mono">{user.departement}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-mono">Depuis {user.createdAt}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {user.role === "admin" && (
                <Link to="/admin" className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
                  <ShieldCheck className="h-4 w-4" /> Administration
                </Link>
              )}
              <button
                onClick={() => { logout(); navigate({ to: "/" }); }}
                className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Informations */}
          <div className="hover-lift glass-card rounded-3xl p-6 shadow-soft lg:col-span-2">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-brand" />
              <h2 className="font-display text-lg font-bold">Mes informations personnelles</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["nom", "Nom"], ["prenom", "Prénom"], ["avenue", "Avenue"], ["parcelle", "N° parcelle"],
                ["telephone", "Téléphone"], ["urgence", "Contact d'urgence"],
              ].map(([k, label]) => (
                <div key={k}>
                  <label className="text-sm font-medium">{label}</label>
                  <input className={field + " mt-1"} maxLength={60} value={String(form[k] ?? "")} onChange={(e) => set(k, e.target.value)} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium">Commune</label>
                <FancySelect className="mt-1" searchable ariaLabel="Commune" value={String(form.commune)} onChange={(v) => set("commune", v)} options={communes} />
              </div>
              <div>
                <label className="text-sm font-medium">État civil</label>
                <FancySelect className="mt-1" ariaLabel="État civil" value={String(form.etatCivil)} onChange={(v) => set("etatCivil", v)} options={etatsCivils} />
              </div>
              {form.etatCivil === "Marié(e)" && (
                <div className="animate-fade-in">
                  <label className="text-sm font-medium">Nombre d'enfants</label>
                  <input type="number" min={0} max={20} className={field + " mt-1 font-mono"} value={Number(form.enfants ?? 0)} onChange={(e) => set("enfants", Number(e.target.value))} />
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Date de naissance</label>
                <input type="date" className={field + " mt-1 font-mono"} value={String(form.naissance ?? "")} onChange={(e) => set("naissance", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium">Département</label>
                <FancySelect className="mt-1" ariaLabel="Département" value={String(form.departement)} onChange={(v) => set("departement", v)} options={departmentNames} />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <button onClick={save} className="flex items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95">
                <Save className="h-4 w-4" /> Enregistrer
              </button>
              {saved && <span className="animate-fade-in text-sm font-medium text-brand">Modifications enregistrées ✓</span>}
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            <div className="hover-lift glass-card rounded-3xl p-6 shadow-soft">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Coordonnées</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> {form.commune}, av. {form.avenue} n°{form.parcelle}</li>
                <li className="flex items-center gap-2 font-mono"><Phone className="h-4 w-4 text-brand" /> {form.telephone}</li>
                <li className="flex items-center gap-2 font-mono"><CalendarClock className="h-4 w-4 text-brand" /> {form.naissance}</li>
              </ul>
            </div>

            {(user.role === "chef" || user.role === "admin") && dept && (
              <DeptPanel deptName={dept.name} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DeptPanel({ deptName }: { deptName: string }) {
  const d = departments.find((x) => x.name === deptName)!;
  const [state, setState] = useState({ vision: d.vision, mission: d.mission, schedule: d.schedule, next: d.next });
  const [ok, setOk] = useState(false);

  return (
    <div className="hover-lift glass-card rounded-3xl p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-brand" />
        <h3 className="font-display text-lg font-bold">Gérer le département {d.name}</h3>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Réservé aux chefs de département.</p>
      <div className="mt-4 space-y-3">
        {([
          ["vision", "Vision"], ["mission", "Mission"], ["schedule", "Horaire habituel"], ["next", "Prochaine activité"],
        ] as const).map(([k, label]) => (
          <div key={k}>
            <label className="text-sm font-medium">{label}</label>
            <textarea
              rows={2}
              maxLength={280}
              className={field + " mt-1 resize-none"}
              value={state[k]}
              onChange={(e) => setState((p) => ({ ...p, [k]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => { setOk(true); setTimeout(() => setOk(false), 2000); }}
        className="mt-4 w-full rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
      >
        Mettre à jour le département
      </button>
      {ok && <p className="animate-fade-in mt-2 text-center text-sm text-brand">Département mis à jour ✓</p>}
    </div>
  );
}