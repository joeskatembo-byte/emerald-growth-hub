export type Department =
  | "E" | "Jeunesse" | "Femmes" | "Hommes" | "Louange" | "Enfants" | "Intercession";

export const departmentColor: Record<Department, string> = {
  E: "from-emerald-600 to-emerald-800",
  Jeunesse: "from-amber-500 to-orange-600",
  Femmes: "from-rose-500 to-pink-600",
  Hommes: "from-indigo-500 to-blue-700",
  Louange: "from-violet-500 to-purple-700",
  Enfants: "from-sky-400 to-cyan-600",
  Intercession: "from-emerald-500 to-teal-700",
};

export const VERSES_KEY = "ee.verses.v1";

export type Verse = { id: string; text: string; ref: string };

export const verses: Verse[] = [
  { id: "v1", text: "Bienvenue à la maison.", ref: "" },
  { id: "v2", text: "La foi en action.", ref: "" },
  { id: "v3", text: "Une église, plusieurs nations.", ref: "" },
  { id: "v4", text: "L'Éternel est mon berger, je ne manquerai de rien.", ref: "Psaume 23:1" },
  { id: "v5", text: "Car Dieu a tant aimé le monde…", ref: "Jean 3:16" },
];

export const NEWS_KEY = "ee.news.v1";

export type NewsItem = {
  id: string;
  kind: string;
  dept: Department;
  body: string;
  when: string;
};

export const news: NewsItem[] = [
  {
    id: "1",
    kind: "Culte",
    dept: "E" as Department,
    body: "Culte de consécration ce dimanche à 09h00. Venez expérimenter la présence de Dieu.",
    when: "Aujourd'hui · 07:30",
  },
  {
    id: "2",
    kind: "Séminaire",
    dept: "Jeunesse" as Department,
    body: "Séminaire des jeunes : 'Bâtir ma génération'. Samedi 15h.",
    when: "Il y a 2 h",
  },
  {
    id: "3",
    kind: "Intercession",
    dept: "Intercession" as Department,
    body: "Chaîne de prière 24h pour la nation. Rejoignez un créneau.",
    when: "Hier · 21:10",
  },
  {
    id: "4",
    kind: "Anniversaire",
    dept: "Femmes" as Department,
    body: "Joyeux anniversaire à Maman Grâce, servante fidèle du Seigneur.",
    when: "Hier · 08:00",
  },
  {
    id: "5",
    kind: "Évangélisation",
    dept: "Hommes" as Department,
    body: "Sortie d'évangélisation dans la commune de Limete, samedi 07h.",
    when: "Il y a 3 j",
  },
  {
    id: "6",
    kind: "Réunion",
    dept: "Louange" as Department,
    body: "Répétition du chœur ce vendredi 18h au sanctuaire.",
    when: "Il y a 4 j",
  },
];

export const TESTIMONIALS_KEY = "ee.testimonials.v1";
export const testimonyStatuses = ["En attente", "Validé"] as const;
export type TestimonyStatus = (typeof testimonyStatuses)[number];

export type Testimony = {
  id: string;
  name: string;
  initial: string;
  body: string;
  when: string;
  likes: number;
  status: TestimonyStatus;
};

export const testimonials: Testimony[] = [
  { id: "t1", name: "Grâce Mbayo", initial: "G", body: "Le Seigneur a guéri ma fille après la prière du pasteur. Toute la gloire à Jésus.", when: "12 mars · 21:04", likes: 148, status: "Validé" },
  { id: "t2", name: "Jonathan K.", initial: "J", body: "J'ai retrouvé un emploi après 2 ans. Dieu est fidèle à ses promesses.", when: "10 mars · 14:22", likes: 96, status: "Validé" },
  { id: "t3", name: "Esther N.", initial: "E", body: "Depuis mon baptême, ma vie n'est plus la même. Merci Jésus.", when: "8 mars · 09:11", likes: 212, status: "Validé" },
  { id: "t4", name: "Papa Célestin", initial: "C", body: "Réconciliation dans ma famille après des années de silence. Alléluia.", when: "6 mars · 18:47", likes: 74, status: "Validé" },
  { id: "t5", name: "Sarah Ilunga", initial: "S", body: "Le Seigneur m'a délivrée de l'angoisse. Je veux le témoigner à toute l'assemblée.", when: "Aujourd'hui · 08:12", likes: 0, status: "En attente" },
];

export const meditation = {
  book: "Matthieu",
  verse: "11 : 28",
  body: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. Prenez le temps de méditer cette parole aujourd'hui.",
  servant: "Pasteur Emmanuel",
  initial: "E",
};

export const MEDITATION_KEY = "ee.meditation.v1";

export type Meditation = {
  id: string;
  book: string;
  verse: string;
  body: string;
  servant: string;
  initial: string;
  /** "Oui" = méditation affichée sur la page d'accueil. */
  active: "Oui" | "Non";
};

export const meditations: Meditation[] = [
  { id: "m1", ...meditation, active: "Oui" },
  {
    id: "m2",
    book: "Psaume",
    verse: "27 : 1",
    body: "L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? Marche aujourd'hui dans cette assurance.",
    servant: "Past. Deborah",
    initial: "D",
    active: "Non",
  },
];

export type Media = {
  id: string;
  title: string;
  type: "Affiche" | "Podcast" | "Vidéo" | "Photo";
  date: string;
  hue: string;
  category: "evenements" | "quotidien";
};

export const media: Media[] = [
  { id: "e1", title: "Mariage Jean & Grâce", type: "Photo", date: "22 mars", hue: "from-rose-500 to-pink-800", category: "evenements" },
  { id: "e2", title: "Anniversaire Maman Esther", type: "Photo", date: "18 mars", hue: "from-amber-500 to-orange-700", category: "evenements" },
  { id: "e3", title: "Conférence 'Bâtir'", type: "Affiche", date: "10 mars", hue: "from-indigo-700 to-slate-900", category: "evenements" },
  { id: "e4", title: "Chantier temple — étape 3", type: "Photo", date: "02 mars", hue: "from-teal-600 to-emerald-900", category: "evenements" },
  { id: "e5", title: "Convention 2026", type: "Affiche", date: "01 avr.", hue: "from-emerald-700 to-emerald-900", category: "evenements" },
  { id: "e6", title: "Baptêmes 2026", type: "Photo", date: "01 mars", hue: "from-sky-500 to-blue-800", category: "evenements" },
  { id: "q1", title: "Culte du dimanche", type: "Vidéo", date: "10 mars", hue: "from-emerald-600 to-emerald-900", category: "quotidien" },
  { id: "q2", title: "Séminaire des jeunes", type: "Affiche", date: "22 mars", hue: "from-amber-500 to-rose-700", category: "quotidien" },
  { id: "q3", title: "Podcast — Marcher par la foi", type: "Podcast", date: "10 mars", hue: "from-slate-700 to-slate-900", category: "quotidien" },
  { id: "q4", title: "Louange en direct", type: "Vidéo", date: "24 fév.", hue: "from-violet-600 to-purple-900", category: "quotidien" },
  { id: "q5", title: "École du Saint-Esprit", type: "Podcast", date: "25 fév.", hue: "from-indigo-600 to-blue-900", category: "quotidien" },
  { id: "q6", title: "Réunion des anciens", type: "Photo", date: "02 fév.", hue: "from-slate-500 to-slate-800", category: "quotidien" },
];

export const FAQ_KEY = "ee.faq.v1";

export type FaqItem = { id: string; q: string; a: string };

export const faq: FaqItem[] = [
  { id: "f1", q: "Quels sont les horaires des cultes ?", a: "Dimanche 09h00 (culte principal), mercredi 18h00 (enseignement), vendredi 19h00 (adoration & délivrance)." },
  { id: "f2", q: "Comment devenir membre ?", a: "Remplissez le formulaire d'inscription, puis suivez le parcours 'Nouveaux disciples' (4 sessions). Un accompagnateur vous sera assigné." },
  { id: "f3", q: "Puis-je rencontrer le pasteur ?", a: "Oui. Prenez rendez-vous depuis la page Contact — créneau confidentiel de 45 minutes." },
  { id: "f4", q: "Comment soutenir l'œuvre ?", a: "Par la dîme, l'offrande, un don ponctuel ou un engagement mensuel via la page Don. Chaque contribution est tracée." },
  { id: "f5", q: "Y a-t-il un programme pour les enfants ?", a: "Oui. École du dimanche 09h00, club des vainqueurs le samedi 15h. Encadrement formé et bienveillant." },
];