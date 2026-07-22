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

export const verses = [
  { text: "Bienvenue à la maison.", ref: "" },
  { text: "La foi en action.", ref: "" },
  { text: "Une église, plusieurs nations.", ref: "" },
  { text: "L'Éternel est mon berger, je ne manquerai de rien.", ref: "Psaume 23:1" },
  { text: "Car Dieu a tant aimé le monde…", ref: "Jean 3:16" },
];

export const news = [
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

export const testimonials = [
  { id: "t1", name: "Grâce Mbayo", initial: "G", body: "Le Seigneur a guéri ma fille après la prière du pasteur. Toute la gloire à Jésus.", when: "12 mars · 21:04", likes: 148 },
  { id: "t2", name: "Jonathan K.", initial: "J", body: "J'ai retrouvé un emploi après 2 ans. Dieu est fidèle à ses promesses.", when: "10 mars · 14:22", likes: 96 },
  { id: "t3", name: "Esther N.", initial: "E", body: "Depuis mon baptême, ma vie n'est plus la même. Merci Jésus.", when: "8 mars · 09:11", likes: 212 },
  { id: "t4", name: "Papa Célestin", initial: "C", body: "Réconciliation dans ma famille après des années de silence. Alléluia.", when: "6 mars · 18:47", likes: 74 },
];

export const meditation = {
  book: "Matthieu",
  verse: "11 : 28",
  body: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. Prenez le temps de méditer cette parole aujourd'hui.",
  servant: "Pasteur Emmanuel",
  initial: "E",
};

export type Media = {
  id: string;
  title: string;
  type: "Affiche" | "Podcast" | "Vidéo" | "Photo";
  date: string;
  hue: string;
};

export const media: Record<string, Media[]> = {
  Affiches: [
    { id: "a1", title: "Convention 2026", type: "Affiche", date: "01 avr.", hue: "from-emerald-700 to-emerald-900" },
    { id: "a2", title: "Nuit de louange", type: "Affiche", date: "12 mars", hue: "from-indigo-700 to-slate-900" },
    { id: "a3", title: "Camp jeunesse", type: "Affiche", date: "22 mars", hue: "from-amber-500 to-rose-700" },
    { id: "a4", title: "Retraite pastorale", type: "Affiche", date: "05 avr.", hue: "from-teal-600 to-emerald-900" },
    { id: "a5", title: "Séminaire couples", type: "Affiche", date: "18 avr.", hue: "from-rose-500 to-purple-800" },
  ],
  Podcasts: [
    { id: "p1", title: "Marcher par la foi", type: "Podcast", date: "10 mars", hue: "from-slate-700 to-slate-900" },
    { id: "p2", title: "La prière qui déplace", type: "Podcast", date: "03 mars", hue: "from-emerald-600 to-teal-900" },
    { id: "p3", title: "L'école du Saint-Esprit", type: "Podcast", date: "25 fév.", hue: "from-indigo-600 to-blue-900" },
    { id: "p4", title: "Bâtir sa maison", type: "Podcast", date: "18 fév.", hue: "from-amber-600 to-orange-900" },
  ],
  Vidéos: [
    { id: "v1", title: "Résumé — Culte du dimanche", type: "Vidéo", date: "10 mars", hue: "from-emerald-600 to-emerald-900" },
    { id: "v2", title: "Témoignage — Chantal", type: "Vidéo", date: "07 mars", hue: "from-rose-600 to-pink-900" },
    { id: "v3", title: "Sortie évangélisation", type: "Vidéo", date: "02 mars", hue: "from-teal-600 to-cyan-900" },
    { id: "v4", title: "Louange en direct", type: "Vidéo", date: "24 fév.", hue: "from-violet-600 to-purple-900" },
  ],
  Photos: [
    { id: "ph1", title: "Baptêmes 2026", type: "Photo", date: "01 mars", hue: "from-sky-500 to-blue-800" },
    { id: "ph2", title: "Sortie ministérielle", type: "Photo", date: "15 fév.", hue: "from-emerald-500 to-teal-800" },
    { id: "ph3", title: "Fête des mères", type: "Photo", date: "10 fév.", hue: "from-pink-500 to-rose-800" },
    { id: "ph4", title: "Réunion des anciens", type: "Photo", date: "02 fév.", hue: "from-slate-500 to-slate-800" },
  ],
};

export const faq = [
  { q: "Quels sont les horaires des cultes ?", a: "Dimanche 09h00 (culte principal), mercredi 18h00 (enseignement), vendredi 19h00 (adoration & délivrance)." },
  { q: "Comment devenir membre ?", a: "Remplissez le formulaire d'inscription, puis suivez le parcours 'Nouveaux disciples' (4 sessions). Un accompagnateur vous sera assigné." },
  { q: "Puis-je rencontrer le pasteur ?", a: "Oui. Prenez rendez-vous depuis la page Contact — créneau confidentiel de 45 minutes." },
  { q: "Comment soutenir l'œuvre ?", a: "Par la dîme, l'offrande, un don ponctuel ou un engagement mensuel via la page Don. Chaque contribution est tracée." },
  { q: "Y a-t-il un programme pour les enfants ?", a: "Oui. École du dimanche 09h00, club des vainqueurs le samedi 15h. Encadrement formé et bienveillant." },
];