/** Contenu du pied de page — entièrement pilotable depuis le tableau de bord. */

export const FOOTER_KEY = "ee.footer.v1";
export const FOOTER_LINKS_KEY = "ee.footer.links.v1";
export const FOOTER_SOCIALS_KEY = "ee.footer.socials.v1";
export const FOOTER_PARTNERS_KEY = "ee.footer.partners.v1";

export type FooterSettings = {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  navTitle: string;
  contactTitle: string;
  socialTitle: string;
  partnersTitle: string;
  legal: string;
};

export const footerSettings: FooterSettings = {
  name: "Église Emmanuel",
  tagline: "Une famille de foi au cœur de Kinshasa — accueillir, restaurer, envoyer.",
  address: "Av. de la Paix 45, Kinshasa, RDC",
  phone: "+243 000 000 000",
  email: "contact@emmanuel-rdc.org",
  navTitle: "Navigation",
  contactTitle: "Contact",
  socialTitle: "Suivez-nous",
  partnersTitle: "Partenaires",
  legal: "Église Emmanuel — Tous droits réservés.",
};

export type FooterLink = { id: string; label: string; to: string };
export const footerLinks: FooterLink[] = [
  { id: "fl1", label: "Accueil", to: "/" },
  { id: "fl2", label: "À propos", to: "/a-propos" },
  { id: "fl3", label: "Don", to: "/don" },
  { id: "fl4", label: "Contact", to: "/contact" },
  { id: "fl5", label: "Inscription", to: "/inscription" },
];

export const socialNetworks = ["Facebook", "YouTube", "Instagram", "WhatsApp", "TikTok"] as const;

export type FooterSocial = { id: string; network: string; url: string };
export const footerSocials: FooterSocial[] = [
  { id: "fs1", network: "Facebook", url: "https://facebook.com" },
  { id: "fs2", network: "YouTube", url: "https://youtube.com" },
  { id: "fs3", network: "Instagram", url: "https://instagram.com" },
  { id: "fs4", network: "WhatsApp", url: "https://wa.me/243000000000" },
  { id: "fs5", network: "TikTok", url: "https://tiktok.com" },
];

export type FooterPartner = { id: string; name: string };
export const footerPartners: FooterPartner[] = [
  { id: "fp1", name: "Compassion" },
  { id: "fp2", name: "Alliance" },
  { id: "fp3", name: "Vision" },
];
