import { FancySelect } from "@/components/ui/fancy-select";
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Users, Newspaper, Quote, Image, HandHeart, MessageCircle, Building2, History, LogOut, Trash2, ShieldCheck, X, User, BookOpen, CheckCircle2, Clock, CalendarDays, HelpCircle, CalendarClock, UserCog, PanelBottom } from "lucide-react";
import { createPortal } from "react-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CrudSection, type Column } from "@/components/admin/CrudSection";
import { news, NEWS_KEY, faq, FAQ_KEY, type FaqItem, testimonials, media, MEDIA_KEY, verses, VERSES_KEY, type Verse, TESTIMONIALS_KEY, testimonyStatuses, type Testimony } from "@/data/mock";
import { MeditationSection } from "@/components/admin/MeditationSection";
import { FooterSection } from "@/components/admin/FooterSection";
import { projects, PROJECTS_KEY, donFaq, DON_FAQ_KEY, type DonFaqItem } from "@/data/don";
import { departments, DEPARTMENTS_KEY, timeline, timelineHues, TIMELINE_KEY, upcomingEvents, EVENTS_KEY, type UpcomingEvent, leaders, LEADERS_KEY, type Leader, weeklyProgram, PROGRAM_KEY, programDays, type ProgramSlot } from "@/data/about";
import { departmentNames, communes } from "@/data/inscription";
import { useSession, useMembers, removeMember, updateMember, logout, type Member } from "@/lib/session";
import { useConfirm } from "@/components/ui/confirm";

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

type TabKey = "membres" | "news" | "temoignages" | "meditation" | "medias" | "projets" | "departements" | "histoire" | "evenements" | "messages" | "faq" | "donfaq" | "programme" | "leadership" | "versets" | "footer";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "membres", label: "Fidèles", icon: Users },
  { key: "news", label: "Actualités", icon: Newspaper },
  { key: "temoignages", label: "Témoignages", icon: Quote },
  { key: "meditation", label: "Méditation", icon: BookOpen },
  { key: "medias", label: "Médiathèque", icon: Image },
  { key: "projets", label: "Projets & dons", icon: HandHeart },
  { key: "departements", label: "Départements", icon: Building2 },
  { key: "histoire", label: "Frise historique", icon: History },
  { key: "evenements", label: "Événements", icon: CalendarDays },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "faq", label: "FAQ accueil", icon: HelpCircle },
  { key: "donfaq", label: "FAQ dons", icon: HelpCircle },
  { key: "programme", label: "Programme", icon: CalendarClock },
  { key: "leadership", label: "Leadership", icon: UserCog },
  { key: "versets", label: "Versets", icon: Quote },
  { key: "footer", label: "Pied de page", icon: PanelBottom },
];

function Page() {
  const { user, ready } = useSession();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("membres");
  const [detailMember, setDetailMember] = useState<Member | null>(null);
  const { confirmDelete, notifySuccess } = useConfirm();
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
              <div className="mt-4 no-scrollbar overflow-x-auto">
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
                      <tr
                        key={m.id}
                        onClick={() => setDetailMember(m)}
                        className="cursor-pointer bg-card transition duration-300 hover:bg-brand-soft/60"
                      >
                        <td className="rounded-l-2xl px-3 py-3 font-medium">{m.prenom} {m.nom}</td>
                        <td className="px-3 py-3">{m.commune}</td>
                        <td className="hidden px-3 py-3 font-mono text-xs md:table-cell">{m.telephone}</td>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <FancySelect
                            size="sm"
                            className="min-w-[8rem]"
                            ariaLabel="Département"
                            value={m.departement}
                            onChange={(v) => updateMember(m.id, { departement: v })}
                            options={["Aucun", ...departmentNames]}
                          />
                        </td>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
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
                        <td className="rounded-r-2xl px-3 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={async () => {
                              if (m.id === user.id) return;
                              const ok = await confirmDelete({
                                title: "Supprimer ce fidèle ?",
                                description: `Voulez-vous vraiment supprimer le compte de ${m.prenom} ${m.nom} ? Cette action est définitive.`,
                                successTitle: "Fidèle supprimé",
                                successDescription: "Le compte a bien été retiré de la liste des fidèles.",
                              });
                              if (ok) removeMember(m.id);
                            }}
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

          {detailMember && typeof document !== "undefined" &&
            createPortal(
              <div className="fixed inset-0 z-[9998] grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setDetailMember(null)}>
                <div
                  role="dialog"
                  aria-modal="true"
                  onClick={(e) => e.stopPropagation()}
                  className="animate-fade-in no-scrollbar max-h-[90vh] w-[min(620px,100%)] overflow-y-auto rounded-3xl bg-card p-5 shadow-soft sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Fidèle</p>
                      <h3 className="font-display text-xl font-bold">{detailMember.prenom} {detailMember.nom}</h3>
                    </div>
                    <button onClick={() => setDetailMember(null)} aria-label="Fermer" className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary text-muted-foreground transition hover:text-brand">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex justify-center sm:justify-start">
                      {detailMember.photo ? (
                        <img src={detailMember.photo} alt={`${detailMember.prenom} ${detailMember.nom}`} className="h-24 w-24 rounded-2xl object-cover shadow-soft sm:h-28 sm:w-28" />
                      ) : (
                        <div className="grid h-24 w-24 place-items-center rounded-2xl bg-brand-soft/40 text-brand shadow-soft sm:h-28 sm:w-28">
                          <User className="h-12 w-12" />
                        </div>
                      )}
                    </div>
                    <div className="grid min-w-0 flex-1 gap-2.5 sm:grid-cols-2">
                      <div className="hover-lift rounded-2xl bg-brand-soft/40 p-3">
                        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">État civil</div>
                        <p className="mt-1 text-sm font-medium">{detailMember.etatCivil}</p>
                      </div>
                      {detailMember.etatCivil === "Marié(e)" && (
                        <div className="hover-lift rounded-2xl bg-brand-soft/40 p-3">
                          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Enfants</div>
                          <p className="mt-1 text-sm font-medium">{detailMember.enfants}</p>
                        </div>
                      )}
                      <div className="hover-lift rounded-2xl bg-brand-soft/40 p-3">
                        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Numéro d'urgence</div>
                        <p className="mt-1 truncate font-mono text-sm">{detailMember.urgence}</p>
                      </div>
                      <div className="hover-lift rounded-2xl bg-brand-soft/40 p-3">
                        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Anniversaire</div>
                        <p className="mt-1 font-mono text-sm">{detailMember.naissance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              document.body,
            )}

          {tab === "news" && (
            <CrudSection
              title="Actualités"
              description="Publications affichées en stories sur la page d'accueil."
              storageKey={NEWS_KEY}
              seed={news.map((n) => ({ ...n }))}
              columns={newsCols}
            />
          )}
          {tab === "temoignages" && (
            <CrudSection<Testimony>
              title="Témoignages"
              description="Chaque témoignage écrit par un fidèle arrive ici. Il n'apparaît publiquement qu'après validation."
              storageKey={TESTIMONIALS_KEY}
              seed={testimonials.map((t) => ({ ...t }))}
              columns={testiCols}
              rowAction={(row, update) => (
                <button
                  onClick={() => {
                    const next = row.status === "Validé" ? "En attente" : "Validé";
                    update(row.id, { status: next });
                    notifySuccess(
                      next === "Validé" ? "Témoignage validé" : "Témoignage retiré",
                      next === "Validé"
                        ? "Il est désormais visible publiquement sur la page d'accueil."
                        : "Il n'est plus visible publiquement et repasse en attente.",
                    );
                  }}
                  aria-label={row.status === "Validé" ? "Retirer la validation" : "Valider le témoignage"}
                  title={row.status === "Validé" ? "Retirer de l'accueil" : "Valider et publier"}
                  className={
                    "grid h-8 w-8 place-items-center rounded-xl transition " +
                    (row.status === "Validé"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200")
                  }
                >
                  {row.status === "Validé" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                </button>
              )}
            />
          )}
          {tab === "meditation" && <MeditationSection />}
          {tab === "footer" && <FooterSection />}
          {tab === "medias" && (
            <CrudSection
              title="Médiathèque"
              description="Photos, affiches, vidéos et podcasts."
              storageKey={MEDIA_KEY}
              seed={media.map((m) => ({ ...m }))}
              columns={mediaCols}
              reorderable
            />
          )}
          {tab === "projets" && (
            <CrudSection
              title="Projets & dons"
              description="Budgets, montants récoltés et statut des projets."
              storageKey={PROJECTS_KEY}
              seed={projects.map((p) => ({ ...p }))}
              columns={projectCols}
              reorderable
            />
          )}
          {tab === "departements" && (
            <CrudSection
              title="Départements"
              description="Vision, mission, dirigeants et horaires."
              storageKey={DEPARTMENTS_KEY}
              seed={departments.map((d) => ({ ...d, id: d.key }))}
              columns={deptCols}
              reorderable
            />
          )}
          {tab === "histoire" && (
            <CrudSection
              title="Frise chronologique vivante"
              description="Étapes affichées sur la frise interactive de la page « À propos »."
              storageKey={TIMELINE_KEY}
              seed={timeline.map((t) => ({ ...t }))}
              columns={timelineCols}
            />
          )}
          {tab === "evenements" && (
            <CrudSection<UpcomingEvent>
              title="Événements à venir"
              description="Cartes affichées dans la section « À venir » de la page Programmes."
              storageKey={EVENTS_KEY}
              seed={upcomingEvents.map((e) => ({ ...e }))}
              columns={eventCols}
            />
          )}
          {tab === "faq" && (
            <CrudSection<FaqItem>
              title="FAQ de la page d'accueil"
              description="Questions fréquentes affichées dans l'accordéon de la page d'accueil. Glissez la poignée pour changer l'ordre."
              storageKey={FAQ_KEY}
              seed={faq.map((f) => ({ ...f }))}
              columns={faqCols}
              reorderable
            />
          )}
          {tab === "donfaq" && (
            <CrudSection<DonFaqItem>
              title="FAQ de la page Don"
              description="Questions affichées dans la section « Où va chaque centime ? ». Glissez la poignée pour changer l'ordre."
              storageKey={DON_FAQ_KEY}
              seed={donFaq.map((f) => ({ ...f }))}
              columns={faqCols}
              reorderable
            />
          )}
          {tab === "programme" && (
            <CrudSection<ProgramSlot>
              title="Programme hebdomadaire"
              description="Créneaux Dimanche → Samedi affichés sur la page « À propos ». Glissez la poignée pour changer l'ordre."
              storageKey={PROGRAM_KEY}
              seed={weeklyProgram.map((p) => ({ ...p }))}
              columns={programCols}
              reorderable
            />
          )}
          {tab === "leadership" && (
            <CrudSection<Leader>
              title="Leadership"
              description="Pasteurs, diacres et responsables affichés sur la page « À propos ». Glissez la poignée pour changer l'ordre."
              storageKey={LEADERS_KEY}
              seed={leaders.map((l) => ({ ...l }))}
              columns={leaderCols}
              reorderable
            />
          )}
          {tab === "versets" && (
            <CrudSection<Verse>
              title="Versets & accroches"
              description="Phrases défilantes de la carte « Parole du jour » sur la page d'accueil. Glissez la poignée pour changer l'ordre."
              storageKey={VERSES_KEY}
              seed={verses.map((v) => ({ ...v }))}
              columns={verseCols}
              reorderable
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
  { key: "status", label: "Statut", type: "select", options: testimonyStatuses },
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
  { key: "where", label: "Lieu", detailOnly: true },
  { key: "responsible", label: "Responsable", detailOnly: true },
  { key: "details", label: "Détails du projet", type: "textarea", detailOnly: true },
];

const deptCols: Column[] = [
  { key: "name", label: "Département" },
  { key: "leader", label: "Dirigeant" },
  { key: "next", label: "Prochaine activité", hideOnMobile: true },
  { key: "vision", label: "Vision", type: "textarea", detailOnly: true },
  { key: "mission", label: "Mission", type: "textarea", detailOnly: true },
  { key: "schedule", label: "Horaire", detailOnly: true },
];

const verseCols: Column[] = [
  { key: "text", label: "Texte", type: "textarea" },
  { key: "ref", label: "Référence", mono: true },
];

const timelineCols: Column[] = [
  { key: "year", label: "Année", mono: true },
  { key: "title", label: "Titre" },
  { key: "hue", label: "Dégradé", type: "select", options: timelineHues, hideOnMobile: true },
  { key: "body", label: "Récit", type: "textarea", detailOnly: true },
];

const msgCols: Column[] = [
  { key: "type", label: "Type", type: "select", options: ["Intercession", "Rendez-vous", "Message"] },
  { key: "name", label: "Expéditeur" },
  { key: "status", label: "Statut", type: "select", options: ["Nouveau", "En cours", "Traité"] },
  { key: "date", label: "Date", mono: true, hideOnMobile: true },
  { key: "content", label: "Contenu", type: "textarea", detailOnly: true },
];

const eventCols: Column[] = [
  { key: "date", label: "Date", mono: true },
  { key: "title", label: "Titre" },
  { key: "where", label: "Lieu" },
  { key: "hue", label: "Dégradé", type: "select", options: timelineHues, hideOnMobile: true },
  { key: "description", label: "Description", type: "textarea", detailOnly: true },
];

const faqCols: Column[] = [
  { key: "q", label: "Question" },
  { key: "a", label: "Réponse", type: "textarea", detailOnly: true },
];

const programCols: Column[] = [
  { key: "day", label: "Jour", type: "select", options: [...programDays] },
  { key: "time", label: "Heure", mono: true },
  { key: "title", label: "Activité" },
  { key: "dept", label: "Département", hideOnMobile: true },
  { key: "hue", label: "Dégradé", type: "select", options: timelineHues, hideOnMobile: true },
];

const leaderCols: Column[] = [
  { key: "name", label: "Nom" },
  { key: "role", label: "Fonction" },
  { key: "initial", label: "Initiale", hideOnMobile: true },
  { key: "hue", label: "Dégradé", type: "select", options: timelineHues, hideOnMobile: true },
  { key: "quote", label: "Citation", type: "textarea", detailOnly: true },
  { key: "bio", label: "Biographie", type: "textarea", detailOnly: true },
];

const seedMessages = [
  { id: "msg1", type: "Intercession", name: "Grâce Mbayo", content: "Prière pour la santé de ma mère hospitalisée.", status: "Nouveau", date: "2026-03-22" },
  { id: "msg2", type: "Rendez-vous", name: "Jonathan K.", content: "Demande d'entretien confidentiel avec le pasteur.", status: "En cours", date: "2026-03-20" },
  { id: "msg3", type: "Message", name: "Esther N.", content: "Proposition de partenariat pour l'orphelinat.", status: "Traité", date: "2026-03-18" },
];