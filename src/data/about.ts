export type TimelineEntry = {
  year: string;
  title: string;
  body: string;
  hue: string;
};

export const timeline: TimelineEntry[] = [
  {
    year: "1998",
    title: "La graine est semée",
    body: "Un petit groupe de prière se réunit dans un salon de Kinshasa. Douze cœurs, une seule vision : voir Jésus glorifié en RDC.",
    hue: "from-emerald-600 to-emerald-900",
  },
  {
    year: "2003",
    title: "Premier sanctuaire",
    body: "L'assemblée franchit le cap des 300 membres. Le premier temple est inauguré à Kinshasa avec une convention nationale.",
    hue: "from-amber-500 to-orange-700",
  },
  {
    year: "2010",
    title: "L'école biblique",
    body: "Ouverture de l'école Emmanuel — formation pastorale, diaconale et évangélisation urbaine. Plus de 400 diplômés à ce jour.",
    hue: "from-indigo-600 to-blue-900",
  },
  {
    year: "2017",
    title: "Ministères sociaux",
    body: "Lancement des œuvres : orphelinat, dispensaire, distribution alimentaire mensuelle. La foi devient action.",
    hue: "from-rose-500 to-pink-800",
  },
  {
    year: "2024",
    title: "Nouvelle génération",
    body: "Ouverture de trois assemblées filles en province. Diffusion numérique des cultes, podcast, application communautaire.",
    hue: "from-violet-600 to-purple-900",
  },
];

export type Leader = {
  id: string;
  name: string;
  role: string;
  initial: string;
  hue: string;
  quote: string;
  bio: string;
};

export const leaders: Leader[] = [
  {
    id: "l1",
    name: "Pasteur Emmanuel Kabongo",
    role: "Fondateur & Pasteur principal",
    initial: "E",
    hue: "from-emerald-600 to-emerald-900",
    quote: "L'Église n'est pas un bâtiment, c'est une famille en marche.",
    bio: "Serviteur de Dieu depuis plus de 25 ans, Pasteur Emmanuel a fondé l'Église Emmanuel en 1998 après un appel clair reçu lors d'un jeûne prolongé. Docteur en théologie pratique (Institut Biblique de Kinshasa), il enseigne la Parole avec profondeur et simplicité, marié à sœur Marie depuis 30 ans, père de quatre enfants.",
  },
  {
    id: "l2",
    name: "Sœur Marie Kabongo",
    role: "Responsable Femmes & Intercession",
    initial: "M",
    hue: "from-rose-500 to-pink-800",
    quote: "Toute prière déposée devant Dieu porte du fruit — tôt ou tard.",
    bio: "Co-fondatrice de l'Église Emmanuel, sœur Marie dirige le département des femmes et supervise la chaîne d'intercession 24/7. Sage-femme de formation, elle a servi dans les hôpitaux publics avant de se consacrer entièrement au ministère en 2007.",
  },
  {
    id: "l3",
    name: "Pasteur Josué Mbayo",
    role: "Pasteur associé — Jeunesse",
    initial: "J",
    hue: "from-amber-500 to-orange-700",
    quote: "Une génération qui prie est une génération qui règne.",
    bio: "Ancien ingénieur télécom, Josué a quitté sa carrière en 2015 pour répondre à l'appel du ministère. Il supervise aujourd'hui la jeunesse (plus de 600 membres), les cellules de quartier et le pôle digital.",
  },
  {
    id: "l4",
    name: "Diacre Célestin Ngoy",
    role: "Conseil d'administration",
    initial: "C",
    hue: "from-indigo-600 to-blue-900",
    quote: "Servir dans l'ombre, c'est déjà être à la lumière du Père.",
    bio: "Expert-comptable agréé, Célestin veille sur la transparence financière et l'intendance des œuvres sociales. Membre depuis 2001, il siège au conseil d'administration et coordonne les partenariats.",
  },
  {
    id: "l5",
    name: "Sœur Esther Nzeba",
    role: "Responsable Louange",
    initial: "E",
    hue: "from-violet-600 to-purple-900",
    quote: "Le chant d'un cœur brisé fait trembler les cieux.",
    bio: "Chef de chœur, compositrice et pédagogue musicale. Esther dirige la chorale principale, l'orchestre et forme les jeunes talents. Auteure de trois albums live diffusés dans toute l'Afrique centrale.",
  },
  {
    id: "l6",
    name: "Pasteur Daniel Ilunga",
    role: "Missions & Évangélisation",
    initial: "D",
    hue: "from-teal-600 to-emerald-900",
    quote: "Chaque rue de Kinshasa est un champ mûr pour la moisson.",
    bio: "Ancien avocat converti lors d'une croisade en 2009. Daniel coordonne les sorties d'évangélisation, les plantations d'églises filles et le suivi des nouveaux disciples.",
  },
];

export type DeptDetail = {
  key: string;
  name: string;
  icon: string;
  hue: string;
  vision: string;
  mission: string;
  leader: string;
  contact: string;
  schedule: string;
  next: string;
};

export const departments: DeptDetail[] = [
  {
    key: "jeunesse",
    name: "Jeunesse",
    icon: "🔥",
    hue: "from-amber-500 to-orange-700",
    vision: "Une génération transformée, ancrée en Christ et audacieuse dans son époque.",
    mission: "Discipuler, former et envoyer les 15-35 ans par des rencontres hebdomadaires et des retraites.",
    leader: "Pasteur Josué Mbayo",
    contact: "jeunesse@emmanuel-rdc.org",
    schedule: "Samedi 15h — Rencontre principale",
    next: "Séminaire « Bâtir ma génération » — samedi 15h",
  },
  {
    key: "femmes",
    name: "Femmes",
    icon: "🌸",
    hue: "from-rose-500 to-pink-800",
    vision: "Des femmes debout, épouses, mères et servantes accomplies dans leur appel.",
    mission: "Enseignement, accompagnement personnalisé, œuvres sociales et intercession.",
    leader: "Sœur Marie Kabongo",
    contact: "femmes@emmanuel-rdc.org",
    schedule: "Mardi 15h — Étude biblique",
    next: "Retraite spirituelle — 12-14 avril",
  },
  {
    key: "hommes",
    name: "Hommes",
    icon: "🛡️",
    hue: "from-indigo-600 to-blue-900",
    vision: "Des hommes de foi, protecteurs et bâtisseurs de leur famille et de leur nation.",
    mission: "Fraternité, mentorat, service et déploiement communautaire.",
    leader: "Diacre Célestin Ngoy",
    contact: "hommes@emmanuel-rdc.org",
    schedule: "Vendredi 18h — Cellule",
    next: "Sortie évangélisation Limete — samedi 07h",
  },
  {
    key: "louange",
    name: "Louange",
    icon: "🎵",
    hue: "from-violet-600 to-purple-900",
    vision: "Une adoration qui ouvre les cieux et guérit les cœurs.",
    mission: "Diriger l'assemblée dans la présence de Dieu par le chant, la musique et l'écriture.",
    leader: "Sœur Esther Nzeba",
    contact: "louange@emmanuel-rdc.org",
    schedule: "Vendredi 18h — Répétition",
    next: "Nuit de louange — dernier vendredi du mois",
  },
  {
    key: "enfants",
    name: "Enfants",
    icon: "🌱",
    hue: "from-sky-500 to-blue-800",
    vision: "Voir chaque enfant rencontrer Jésus et grandir dans sa Parole.",
    mission: "École du dimanche, club des vainqueurs, camps de vacances.",
    leader: "Maman Grâce Mbayo",
    contact: "enfants@emmanuel-rdc.org",
    schedule: "Dimanche 09h — École du dimanche",
    next: "Camp d'été — juillet 2026",
  },
  {
    key: "intercession",
    name: "Intercession",
    icon: "🕊️",
    hue: "from-emerald-500 to-teal-800",
    vision: "Une muraille de prière au-dessus de la RDC et des nations.",
    mission: "Chaîne 24/7, veillées mensuelles, formation à la prière stratégique.",
    leader: "Sœur Marie Kabongo",
    contact: "intercession@emmanuel-rdc.org",
    schedule: "Chaque jour — Chaîne 24h",
    next: "Nuit d'intercession pour la nation — 30 avril",
  },
];

export type ProgramSlot = {
  day: string;
  time: string;
  title: string;
  dept: string;
  hue: string;
};

export const weeklyProgram: ProgramSlot[] = [
  { day: "Dimanche", time: "09:00", title: "Culte principal", dept: "Église entière", hue: "from-emerald-600 to-emerald-900" },
  { day: "Dimanche", time: "09:00", title: "École du dimanche", dept: "Enfants", hue: "from-sky-500 to-blue-800" },
  { day: "Lundi", time: "18:00", title: "Cellule des cadres", dept: "Hommes", hue: "from-indigo-600 to-blue-900" },
  { day: "Mardi", time: "15:00", title: "Étude biblique", dept: "Femmes", hue: "from-rose-500 to-pink-800" },
  { day: "Mercredi", time: "18:00", title: "Enseignement", dept: "Église entière", hue: "from-emerald-600 to-emerald-900" },
  { day: "Jeudi", time: "19:00", title: "Chaîne d'intercession", dept: "Intercession", hue: "from-teal-600 to-emerald-900" },
  { day: "Vendredi", time: "18:00", title: "Répétition louange", dept: "Louange", hue: "from-violet-600 to-purple-900" },
  { day: "Vendredi", time: "19:00", title: "Adoration & délivrance", dept: "Église entière", hue: "from-emerald-600 to-emerald-900" },
  { day: "Samedi", time: "07:00", title: "Évangélisation", dept: "Hommes", hue: "from-indigo-600 to-blue-900" },
  { day: "Samedi", time: "15:00", title: "Rencontre jeunesse", dept: "Jeunesse", hue: "from-amber-500 to-orange-700" },
];

export const upcomingEvents = [
  { date: "12 avril", title: "Retraite des femmes", where: "Kinshasa" },
  { date: "26 avril", title: "Convention Emmanuel 2026", where: "Sanctuaire principal" },
  { date: "30 avril", title: "Nuit d'intercession pour la nation", where: "En direct + présentiel" },
  { date: "18 mai", title: "Baptêmes 2026", where: "Fleuve Congo" },
];