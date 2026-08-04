import { FancySelect } from "@/components/ui/fancy-select";
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Users, Newspaper, Quote, Image, HandHeart, MessageCircle, Building2, LogOut, Trash2, ShieldCheck, X, User } from "lucide-react";
import { createPortal } from "react-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CrudSection, type Column } from "@/components/admin/CrudSection";
import { news, testimonials, media } from "@/data/mock";
import { projects } from "@/data/don";
import { departments } from "@/data/about";
import { departmentNames, communes } from "@/data/inscription";
import { useSession, useMembers, removeMember, updateMember, logout } from "@/lib/session";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Administration — Église Emmanuel" },
      { name: "description", content: "Tableau de bord des dirigeants : gestion des fidèles, actualités, témoignages, médiathèque et projets." },
      { property: "og:title", content: "Administration — Église Emmanuel" },
      { property: "og:description", content: "Outil de contrôle des dirigeants de l'Église Emmanuel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

type TabKey = "membres" | "news" | "temoignages" | "medias" | "projets" | "departements" | "messages";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "membres", label: "Fidèles", icon: Users },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "temoignages", label: "Témoignages", icon: Quote },
  { key: "medias", label: "Médiathèque", icon: Image },
  { key: "projets", label: "Projets & dons", icon: HandHeart },
  { key: "departements", label: "Départements", icon: Building2 },
  { key: "messages", label: "Messages", icon: MessageCircle },
];

function Page() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("membres");
  const members = useMembers();

  useEffect(() => {
    if (ready && (!user || user.role !== "admin")) navigate({ to: "/inscription" });
  }, [ready, user, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto mt-16 w-[min(900px,92%)] text-center text-muted-foreground">Accès réservé à l'administration…</main>
        <Footer />
      </div>
    );
  }

  const kpis = [
    { label: "Fidèles enregistrés", value: members.length, tone: "text-brand" },
    { label: "Projets en cours", value: projects.filter((p) => p.status === "en-cours").length, tone: "text-amber-600" },
    { label: "Médias publiés", value: media.length, tone: "text-indigo-600" },
    { label: "Témoignages", value: testimonials.length, tone: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto mt-6 w-[min(1200px,95%)] pb-10">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70"><ShieldCheck className="h-4 w-4" /> Tableau de bord</div>
              <h1 className="mt-1 font-display text-3xl font-bold">Administration</h1>
              <p className="mt-1 text-sm text-white/75">Contrôle total des contenus et des membres de l'église.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/profil" className="rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">Mon profil</Link>
              <button onClick={() => { logout(); navigate({ to: "/" }); }} className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
                <LogOut className="h-4 w-4" /> Déconnexion
              </button>
            </div>
          </div>
          <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="hover-lift cursor-default rounded-2xl bg-white/10 p-4 backdrop-blur hover:bg-white/20">
                <div className="font-mono text-2xl font-bold">{k.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/70">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={
                "hover-lift flex min-w-0 items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-center text-xs font-medium sm:text-sm " +
                (tab === key ? "bg-brand-gradient text-white shadow-soft" : "bg-secondary text-muted-foreground hover:text-brand")
              }
            >
              <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === "membres" && (
            <div className="animate-fade-in glass-card rounded-3xl p-5 shadow-soft sm:p-6">
              <h2 className="font-display text-lg font-bold">Fidèles de l'église</h2>
              <p className="text-xs text-muted-foreground">Modifier le rôle, le département ou retirer un membre.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-y-2 text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                      <th className="px-3 pb-1 font-medium">Nom</th>
                      <th className="px-3 pb-1 font-medium">Commune</th>
                      <th className="hidden px-3 pb-1 font-medium md:table-cell">Téléphone</th>
                      <th className="px-3 pb-1 font-medium">Département</th>
                      <th className="px-3 pb-1 font-medium">Rôle</th>
                      <th className="px-3 pb-1 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m.id} className="bg-card transition duration-300 hover:bg-brand-soft/60">
                        <td className="rounded-l-2xl px-3 py-3 font-medium">{m.prenom} {m.nom}</td>
                        <td className="px-3 py-3">{m.commune}</td>
                        <td className="hidden px-3 py-3 font-mono text-xs md:table-cell">{m.telephone}</td>
                        <td className="px-3 py-3">
                          <FancySelect
                            size="sm"
                            className="min-w-[8rem]"
                            ariaLabel="Département"
                            value={m.departement}
                            onChange={(v) => updateMember(m.id, { departement: v })}
                            options={["Aucun", ...departmentNames]}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <FancySelect
                            size="sm"
                            className="min-w-[7rem]"
                            ariaLabel="Rôle"
                            value={m.role}
                            onChange={(v) => updateMember(m.id, { role: v as "admin" | "chef" | "membre" })}
                            options={[
                              { value: "membre", label: "Membre" },
                              { value: "chef", label: "Chef" },
                              { value: "admin", label: "Admin" },
                            ]}
                          />
                        </td>
                        <td className="rounded-r-2xl px-3 py-3 text-right">
                          <button
                            onClick={() => m.id !== user.id && removeMember(m.id)}
                            aria-label="Supprimer"
                            className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive/20 disabled:opacity-30"
                            disabled={m.id === user.id}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Communes disponibles : {communes.length}.</p>
            </div>
          )}

          {tab === "news" && (
            <CrudSection
              title="Actualités"
              description="Publications affichées en stories sur la page d'accueil."
              storageKey="ee.news.v1"
              seed={news.map((n) => ({ ...n }))}
              columns={newsCols}
            />
          )}
          {tab === "temoignages" && (
            <CrudSection
              title="Témoignages"
              description="Témoignages des fidèles publiés sur l'accueil."
              storageKey="ee.testimonials.v1"
              seed={testimonials.map((t) => ({ ...t }))}
              columns={testiCols}
            />
          )}
          {tab === "medias" && (
            <CrudSection
              title="Médiathèque"
              description="Photos, affiches, vidéos et podcasts."
              storageKey="ee.media.v1"
              seed={media.map((m) => ({ ...m }))}
              columns={mediaCols}
            />
          )}
          {tab === "projets" && (
            <CrudSection
              title="Projets & dons"
              description="Budgets, montants récoltés et statut des projets."
              storageKey="ee.projects.v1"
              seed={projects.map((p) => ({ ...p }))}
              columns={projectCols}
            />
          )}
          {tab === "departements" && (
            <CrudSection
              title="Départements"
              description="Vision, mission, dirigeants et horaires."
              storageKey="ee.departments.v1"
              seed={departments.map((d) => ({ ...d, id: d.key }))}
              columns={deptCols}
            />
          )}
          {tab === "messages" && (
            <CrudSection
              title="Messages reçus"
              description="Intercessions, rendez-vous et messages à l'administration."
              storageKey="ee.messages.v1"
              seed={seedMessages}
              columns={msgCols}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const newsCols: Column[] = [
  { key: "kind", label: "Type" },
  { key: "dept", label: "Département", type: "select", options: departmentNames },
  { key: "when", label: "Quand", mono: true, hideOnMobile: true },
  { key: "body", label: "Contenu", type: "textarea", detailOnly: true },
];

const testiCols: Column[] = [
  { key: "name", label: "Nom" },
  { key: "when", label: "Date", mono: true, hideOnMobile: true },
  { key: "likes", label: "J'aime", type: "number" },
  { key: "body", label: "Témoignage", type: "textarea", detailOnly: true },
];

const mediaCols: Column[] = [
  { key: "title", label: "Titre" },
  { key: "type", label: "Type", type: "select", options: ["Photo", "Affiche", "Vidéo", "Podcast"] },
  { key: "category", label: "Catégorie", type: "select", options: ["evenements", "quotidien"] },
  { key: "date", label: "Date", mono: true, hideOnMobile: true },
];

const projectCols: Column[] = [
  { key: "title", label: "Projet" },
  { key: "status", label: "Statut", type: "select", options: ["en-cours", "termine"] },
  { key: "budget", label: "Budget ($)", type: "number" },
  { key: "raised", label: "Récolté ($)", type: "number" },
  { key: "since", label: "Période", hideOnMobile: true },
  { key: "description", label: "Description", type: "textarea", detailOnly: true },
];

const deptCols: Column[] = [
  { key: "name", label: "Département" },
  { key: "leader", label: "Dirigeant" },
  { key: "next", label: "Prochaine activité", hideOnMobile: true },
  { key: "vision", label: "Vision", type: "textarea", detailOnly: true },
  { key: "mission", label: "Mission", type: "textarea", detailOnly: true },
  { key: "schedule", label: "Horaire", detailOnly: true },
];

const msgCols: Column[] = [
  { key: "type", label: "Type", type: "select", options: ["Intercession", "Rendez-vous", "Message"] },
  { key: "name", label: "Expéditeur" },
  { key: "status", label: "Statut", type: "select", options: ["Nouveau", "En cours", "Traité"] },
  { key: "date", label: "Date", mono: true, hideOnMobile: true },
  { key: "content", label: "Contenu", type: "textarea", detailOnly: true },
];

const seedMessages = [
  { id: "msg1", type: "Intercession", name: "Grâce Mbayo", content: "Prière pour la santé de ma mère hospitalisée.", status: "Nouveau", date: "2026-03-22" },
  { id: "msg2", type: "Rendez-vous", name: "Jonathan K.", content: "Demande d'entretien confidentiel avec le pasteur.", status: "En cours", date: "2026-03-20" },
  { id: "msg3", type: "Message", name: "Esther N.", content: "Proposition de partenariat pour l'orphelinat.", status: "Traité", date: "2026-03-18" },
];