export type Project = {
  id: string;
  title: string;
  status: "en-cours" | "termine";
  description: string;
  budget: number;
  raised: number;
  hue: string;
  icon: string;
  since: string;
  where?: string;
  responsible?: string;
  details?: string;
};

export const PROJECTS_KEY = "ee.projects.v1";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Extension du sanctuaire principal",
    status: "en-cours",
    description: "Agrandissement de la salle de culte pour accueillir 500 fidèles supplémentaires, avec sonorisation et climatisation.",
    budget: 180000,
    raised: 112500,
    hue: "from-emerald-600 to-emerald-900",
    icon: "🏛️",
    since: "Depuis janvier 2026",
  },
  {
    id: "p2",
    title: "Orphelinat Emmanuel — phase 2",
    status: "en-cours",
    description: "Construction d'un dortoir supplémentaire et d'une salle de classe pour 40 enfants accueillis à plein temps.",
    budget: 95000,
    raised: 61200,
    hue: "from-amber-500 to-orange-700",
    icon: "🌱",
    since: "Depuis mars 2026",
  },
  {
    id: "p3",
    title: "Dispensaire communautaire",
    status: "en-cours",
    description: "Équipement médical de base et pharmacie sociale pour les familles du quartier — soins gratuits ou à prix coûtant.",
    budget: 42000,
    raised: 37800,
    hue: "from-rose-500 to-pink-800",
    icon: "🩺",
    since: "Depuis février 2026",
  },
  {
    id: "p4",
    title: "École biblique — nouvelle promotion",
    status: "termine",
    description: "Formation pastorale complète de 48 diplômés envoyés en mission dans 6 provinces. Objectif atteint à 108 %.",
    budget: 28000,
    raised: 30240,
    hue: "from-indigo-600 to-blue-900",
    icon: "📖",
    since: "Achevé — décembre 2025",
  },
  {
    id: "p5",
    title: "Studio de diffusion & podcast",
    status: "termine",
    description: "Studio complet pour la retransmission en direct des cultes et l'enregistrement du podcast « Marcher par la foi ».",
    budget: 22000,
    raised: 24500,
    hue: "from-violet-600 to-purple-900",
    icon: "🎙️",
    since: "Achevé — octobre 2025",
  },
  {
    id: "p6",
    title: "Distribution alimentaire mensuelle",
    status: "termine",
    description: "1 200 familles bénéficiaires sur l'année 2025 — vivres, produits d'hygiène et accompagnement spirituel.",
    budget: 18000,
    raised: 19100,
    hue: "from-teal-600 to-emerald-900",
    icon: "🍞",
    since: "Achevé — année 2025",
  },
];

export const DON_FAQ_KEY = "ee.donfaq.v1";

export type DonFaqItem = { id: string; q: string; a: string };

export const donFaq: DonFaqItem[] = [
  {
    id: "df1",
    q: "Comment mon don est-il utilisé ?",
    a: "Chaque contribution est fléchée à l'avance : 60 % pour les projets, 25 % pour les œuvres sociales, 15 % pour le fonctionnement (loyer, énergie, salaires diaconaux). Un rapport public est publié chaque trimestre.",
  },
  {
    id: "df2",
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Mobile money (M-Pesa, Airtel Money, Orange Money), virement bancaire, carte bancaire via passerelle sécurisée, et espèces en présentiel avec reçu numéroté.",
  },
  {
    id: "df3",
    q: "Puis-je mettre en place un don mensuel automatique ?",
    a: "Oui. L'engagement mensuel est ajustable ou annulable à tout moment depuis votre espace membre. Un rappel doux vous est envoyé chaque mois avec le récapitulatif.",
  },
  {
    id: "df4",
    q: "Comment garantissez-vous la transparence ?",
    a: "Comptabilité tenue par un expert-comptable agréé, audit externe annuel, publication du bilan sur le site, et registre des projets consultable par tout membre inscrit.",
  },
  {
    id: "df5",
    q: "Puis-je flécher mon don vers un projet précis ?",
    a: "Absolument. Vous choisissez le projet (sanctuaire, orphelinat, dispensaire, école biblique…) et recevez des nouvelles ciblées sur son avancement.",
  },
  {
    id: "df6",
    q: "Recevrai-je un reçu ?",
    a: "Un reçu numéroté vous est envoyé automatiquement par e-mail après chaque don, avec la mention légale requise pour vos démarches.",
  },
];
