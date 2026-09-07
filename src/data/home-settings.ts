/** Réglages éditables de la page d'accueil et de la section Vision & Mission. */

export const HERO_KEY = "ee.hero.v1";

export type HeroSettings = {
  verseLabel: string;
  membersLabel: string;
  membersCount: number;
  membersGrowth: string;
  serviceLabel: string;
  serviceDay: string;
  serviceTime: string;
  communityLabel: string;
  communityTitle: string;
  extraMembers: string;
  ctaLabel: string;
  ctaTitle: string;
  ctaAction: string;
  quote: string;
  quoteAuthor: string;
};

export const heroSettings: HeroSettings = {
  verseLabel: "Parole du jour",
  membersLabel: "Membres",
  membersCount: 1247,
  membersGrowth: "+34 ce mois",
  serviceLabel: "Prochain culte",
  serviceDay: "Dimanche",
  serviceTime: "09h00 · Sanctuaire",
  communityLabel: "La communauté",
  communityTitle: "Une église, plusieurs nations.",
  extraMembers: "+1.2k",
  ctaLabel: "Rejoindre",
  ctaTitle: "Nous rejoindre",
  ctaAction: "Commencer",
  quote: "Dieu ne cherche pas des géants, mais des cœurs disponibles.",
  quoteAuthor: "Pasteur Emmanuel",
};

export const VISION_KEY = "ee.vision.v1";

export type VisionSettings = {
  label: string;
  heading: string;
  reasonTitle: string;
  reasonBody: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
};

export const visionSettings: VisionSettings = {
  label: "Vision & Mission",
  heading: "Pourquoi existons-nous ?",
  reasonTitle: "Notre raison d'être",
  reasonBody:
    "Faire de Kinshasa — et bien au-delà — un lieu où Jésus est connu, aimé et suivi. Chaque vie touchée devient un vecteur d'espérance pour la génération suivante.",
  visionTitle: "La Vision",
  visionBody:
    "Voir une multitude d'hommes, de femmes et d'enfants restaurés par la grâce, formés par la Parole et envoyés dans leurs sphères d'influence — familles, écoles, entreprises, quartiers.",
  missionTitle: "La Mission",
  missionBody:
    "Accueillir — chaque âme est précieuse. Restaurer — par la Parole, la prière et la communion fraternelle. Envoyer — chaque disciple devient à son tour un serviteur.",
};
