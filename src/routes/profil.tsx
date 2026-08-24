import { FancySelect } from "@/components/ui/fancy-select";
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LogOut, Save, ShieldCheck, Users, CalendarClock, Phone, MapPin, Pencil, X,
  Sparkles, HeartHandshake, BadgeCheck, Cake, UsersRound,
} from "lucide-react";
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
      { name: "description", content: "Espace membre : consultez et modifiez vos informations, votre département et votre parcours dans la famille Emmanuel." },
      { property: "og:title", content: "Mon profil — Église Emmanuel" },
      { property: "og:description", content: "Votre espace personnel de membre." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="group/row flex items-center justify-between gap-4 border-b border-border/70 py-3 last:border-0">
      <span className="text-sm text-muted-foreground transition group-hover/row:text-brand">{label}</span>
      <span className="min-w-0 truncate text-right text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function Page() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string | number> | null>(null);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const { quartiers } = useQuartiers(String(form?.commune ?? ""));

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
    setEditing(false);
    setTimeout(() => setSaved(false), 2400);
  };

  const dept = departments.find((d) => d.name === user.departement);
  const initials = `${user.prenom[0] ?? ""}${user.nom[0] ?? ""}`;
  const roleLabel = user.role === "chef" ? "Chef de département" : user.role === "admin" ? "Administration" : "Membre";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-6 w-[min(1200px,95%)] pb-14">
        {/* ── Bannière signature ───────────────────────────────── */}
        <section className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-6 text-white shadow-soft sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 animate-pulse rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex min-w-0 flex-wrap items-center gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-1.5 rounded-[1.9rem] bg-white/30 blur-md" />
                <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-[1.7rem] bg-white/20 font-display text-3xl font-bold ring-2 ring-white/50 backdrop-blur">
                  {user.photo ? <img src={user.photo} alt={`Photo de ${user.prenom} ${user.nom}`} className="h-full w-full object-cover" /> : initials}
                </div>
                <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-white text-brand shadow-soft">
                  <BadgeCheck className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
                  <Sparkles className="h-3.5 w-3.5" /> Espace membre
                </p>
                <h1 className="mt-1.5 truncate font-display text-3xl font-bold sm:text-4xl">{user.prenom} {user.nom}</h1>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-white/20 px-3 py-1 uppercase tracking-widest backdrop-blur">{roleLabel}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono backdrop-blur">{user.departement}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-mono backdrop-blur">Depuis {user.createdAt}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.role === "admin" && (
                <Link to="/admin" className="hover-lift flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/30">
                  <ShieldCheck className="h-4 w-4" /> Administration
                </Link>
              )}
              <button
                onClick={() => setEditing((v) => !v)}
                className="hover-lift flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-brand shadow-soft"
              >
                {editing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />} {editing ? "Fermer" : "Modifier"}
              </button>
            </div>
          </div>

          {/* Chiffres clés */}
          <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { Icon: CalendarClock, k: user.createdAt, v: "membre depuis" },
              { Icon: UsersRound, k: String(user.enfants ?? 0), v: "enfants déclarés" },
              { Icon: HeartHandshake, k: user.departement, v: "département" },
              { Icon: Cake, k: user.naissance, v: "anniversaire" },
            ].map(({ Icon, k, v }) => (
              <div key={v} className="group hover-tilt rounded-2xl bg-white/12 p-4 backdrop-blur">
                <Icon className="icon-pop h-4.5 w-4.5 text-white/80" />
                <div className="mt-2 truncate font-numeric font-mono text-sm font-bold">{k}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">{v}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* ── Mes informations ─────────────────────────────── */}
          <div className="hover-lift glass-card rounded-3xl p-6 shadow-soft sm:p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className="truncate font-display text-xl font-bold">Mes informations</h2>
              <button
                onClick={() => setEditing((v) => !v)}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:border-brand hover:text-brand"
              >
                {editing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />} {editing ? "Annuler" : "Modifier"}
              </button>
            </div>

            {!editing ? (
              <div className="mt-4 animate-fade-in">
                <Row label="Nom complet" value={`${user.prenom} ${user.nom}`} />
                <Row label="Téléphone" value={<span className="font-mono">{String(form.telephone)}</span>} />
                <Row label="Commune" value={String(form.commune)} />
                <Row label="Avenue / parcelle" value={`${form.avenue} · ${form.parcelle}`} />
                <Row label="État civil" value={String(form.etatCivil)} />
                <Row label="Enfants" value={<span className="font-mono">{Number(form.enfants ?? 0)}</span>} />
                <Row label="Contact d'urgence" value={<span className="font-mono">{String(form.urgence)}</span>} />
                <Row label="Date de naissance" value={<span className="font-mono">{String(form.naissance)}</span>} />
                <Row label="Membre depuis" value={<span className="font-mono">{user.createdAt}</span>} />
                {saved && <p className="mt-4 animate-fade-in rounded-2xl bg-brand-soft px-4 py-3 text-sm font-semibold text-brand">Modifications enregistrées ✓</p>}
              </div>
            ) : (
              <div className="mt-5 animate-fade-in">
                <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button onClick={save} className="hover-lift flex items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft">
                    <Save className="h-4 w-4" /> Enregistrer
                  </button>
                  <button onClick={() => setEditing(false)} className="rounded-2xl bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-brand-soft hover:text-brand">
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Colonne latérale ─────────────────────────────── */}
          <div className="space-y-6">
            <div className={`hover-tilt relative overflow-hidden rounded-3xl bg-gradient-to-br ${dept?.hue ?? "from-emerald-600 to-emerald-900"} p-6 text-white shadow-soft`}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
              <div className="relative">
                <h3 className="font-display text-lg font-bold">Mon département</h3>
                <p className="mt-2 flex items-center gap-2 font-display text-2xl font-bold">
                  <span className="text-2xl">{dept?.icon ?? "✨"}</span> {user.departement}
                </p>
                <p className="mt-2 text-sm text-white/85">{dept?.mission ?? "Choisissez un département pour servir selon votre don."}</p>
                {dept && (
                  <>
                    <p className="mt-4 text-sm"><span className="font-semibold">Horaire habituel :</span> {dept.schedule}</p>
                    <p className="mt-1 text-sm"><span className="font-semibold">Prochaine activité :</span> {dept.next}</p>
                  </>
                )}
              </div>
            </div>

            <div className="hover-lift glass-card rounded-3xl p-6 shadow-soft">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Coordonnées</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-brand" /> <span className="min-w-0 truncate">{form.commune}, av. {form.avenue} n°{form.parcelle}</span></li>
                <li className="flex items-center gap-2 font-mono"><Phone className="h-4 w-4 shrink-0 text-brand" /> {form.telephone}</li>
                <li className="flex items-center gap-2 font-mono"><CalendarClock className="h-4 w-4 shrink-0 text-brand" /> {form.naissance}</li>
              </ul>
            </div>

            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              className="hover-lift glass-card flex w-full items-center justify-center gap-2 rounded-3xl px-6 py-6 text-sm font-semibold shadow-soft transition hover:text-brand"
            >
              <LogOut className="h-4 w-4" /> Se déconnecter
            </button>

            {(user.role === "chef" || user.role === "admin") && dept && <DeptPanel deptName={dept.name} />}
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
        className="hover-lift mt-4 w-full rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
      >
        Mettre à jour le département
      </button>
      {ok && <p className="animate-fade-in mt-2 text-center text-sm text-brand">Département mis à jour ✓</p>}
    </div>
  );
}
