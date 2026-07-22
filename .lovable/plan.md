# Plan — Page d'accueil de l'église (RDC)

Portée de ce plan : uniquement la **page principale** (Header, Body, Footer) telle que décrite. Les pages À-propos, Don, Contact, Inscription et Admin seront traitées dans des itérations suivantes. Les fonctionnalités dynamiques (médiathèque, témoignages, likes, admin) nécessiteront **Lovable Cloud** — je l'activerai au moment où on attaquera ces parties. Pour cette itération, les contenus sont statiques (mock data) mais structurés pour brancher le back-end sans refonte.

## Design system appliqué

- Polices : Plus Jakarta Sans (corps), Space Grotesk (titres), JetBrains Mono (chiffres) — chargées via `<link>` dans `__root.tsx`, référencées dans `@theme` de `src/styles.css`.
- Palette : fond `#f1f4f6`, cartes blanches glass, texte `#1e293b`, marque émeraude `#0f5a3e`, sémantiques (emerald/amber/rose/indigo) — tokens définis dans `@theme` + `@theme inline` pour shadcn.
- Composants : glass-cards avec `backdrop-blur`, ombres douces, `rounded-2xl` / `rounded-3xl`, approche mobile-first.

## 1. Header — Méga menu à étapes (choix #1)

Barre supérieure épurée avec logo église à gauche + icônes de menu à droite. Chaque item est représenté par une **icône Lucide significative** (Home, Info, HandHeart, MessageCircle, UserPlus).

- Au clic sur "À-propos" → panneau méga-menu en deux étapes : étape 1 catégories (Historique / Départements / Programmes), étape 2 sous-liens contextuels.
- Au clic sur "Contact" → méga-menu à 3 cartes (Intercession / RDV pasteur / Contacter l'église).
- Mobile : le méga-menu devient un drawer plein écran avec la même logique par étapes.
- Fallback discret : pilule flottante en scroll (choix #2), visible seulement après scroll > 200px.

## 2. Body

### 2.1 Hero — Bento Grid animé (choix #1)
Grille asymétrique de tuiles (mobile : 2 col, desktop : 4 col × 3 rangs) :
- Tuile principale (span 2×2) : versets qui défilent avec transition typographique fluide.
- Tuile photo communauté (auto-carousel doux).
- Tuile compteur de membres (JetBrains Mono, count-up animé).
- Tuile CTA principal ("Nous rejoindre").
- Tuile prochain culte (jour + heure).
- Tuile citation courte / message du pasteur.

Micro-animations : fade-in échelonné à l'entrée, hover-scale léger sur tuiles cliquables. Aucune vidéo lourde.

### 2.2 Barre d'actualités — Carrousel story-style (choix #1)
Rangée horizontale de "stories" style Instagram :
- Barres de progression fines en haut qui se remplissent auto (5s/story), avec pause au survol.
- Chaque story : titre (Séminaire, Prière, Culte, Anniversaire…), pastille département à droite (lettre initiale sur avatar coloré, "E" = église entière), contenu court, date+heure en bas.
- Navigation : tap gauche/droite, swipe mobile.
- Composant conçu pour lire une liste (mock pour l'instant, brancher Cloud plus tard).

### 2.3 Appel au christianisme — Tiered cards (3 cartes)
Trois cartes alignées, celle du milieu plus grande + surélevée + halo émeraude.
- **Besoin d'aide ?** — message d'encouragement, bouton "Nous écrire" → `/contact`.
- **À méditer** (carte centrale) — en-tête : livre à gauche / verset à droite (mono), corps du message, pied : avatar initiale + nom du serviteur.
- **Rendez-vous** — message chaleureux, bouton "Prendre RDV" → `/contact`.
Hover desktop : la carte se soulève, révèle un liseré d'avantages spirituels.

### 2.4 Témoignages — Carrousel cards stack
Pile de cartes empilées avec léger décalage/rotation. Swipe/clic → la carte du dessus glisse avec rotation, la suivante remonte.
- Chaque carte : avatar à gauche, nom à droite, message, date+heure, bouton like (cœur) avec compteur.
- Bouton "Témoigner" au-dessus du carrousel → ouvre un dialog **formulaire step-by-step** (Nom → Message → Confirmation). Soumission désactivée cette itération (brancher Cloud ensuite).

### 2.5 Médiathèque — Style Netflix sérielle
Rangées horizontales scrollables par catégorie (Affiches, Podcasts, Vidéos, Photos), tuiles avec hover-zoom, badge type de média, titre + date.
- Clic sur une tuile : dialog aperçu (page détail dédiée arrivera avec le routage média).
- Actions par média : like, partager, télécharger.
- Ajout média = réservé à l'admin (formulaire step-by-step à construire dans l'itération admin + Cloud).
- Cette itération : contenus mock, structure prête pour Cloud Storage.

### 2.6 Accordéon FAQ — ouverture horizontale
- Une seule section ouverte à la fois (les autres se ferment auto).
- Ouverture **gauche → droite** (largeur/opacité animées), pas vers le bas.
- Icône `+` qui pivote fluidement à 180° / se transforme en `×`.

## 3. Footer
Bloc glass sombre teinté émeraude :
- Colonne identité (nom église, courte mission).
- Colonne navigation (mêmes items que le header).
- Colonne contact (adresse RDC, téléphone, email).
- Rangée réseaux sociaux (icônes Lucide : Facebook, Youtube, Instagram, WhatsApp, TikTok) + logos partenaires en niveaux de gris.
- Bas : copyright + mentions.

## Détails techniques

- **Route** : réécriture de `src/routes/index.tsx` (remplace le placeholder). `head()` unique : titre, description, og:title, og:description, twitter:card. og:image ajoutée plus tard quand un hero visuel définitif existe.
- **Structure fichiers** :
  - `src/components/site/Header.tsx` (méga menu à étapes + drawer mobile)
  - `src/components/site/Footer.tsx`
  - `src/components/home/HeroBento.tsx`
  - `src/components/home/NewsStories.tsx`
  - `src/components/home/CallCards.tsx`
  - `src/components/home/TestimonialsStack.tsx`
  - `src/components/home/MediaLibrary.tsx`
  - `src/components/home/HorizontalAccordion.tsx`
  - `src/data/mock.ts` (news, testimonials, media, verses)
- **Tokens** : `src/styles.css` — `@theme` avec couleurs de marque, familles de polices, radius (`--radius-2xl`, `--radius-3xl`), ombres douces, gradient émeraude.
- **Polices** : `<link>` Google Fonts (Plus Jakarta Sans, Space Grotesk, JetBrains Mono) dans `src/routes/__root.tsx` head, préconnexion incluse.
- **Animations** : classes utilitaires existantes (`animate-fade-in`, `hover-scale`) + variantes ciblées (progress bar stories, stack transforms, accordéon horizontal) via CSS custom + tokens.
- **Icônes** : Lucide React uniquement, cohérence garantie.
- **Accessibilité** : aria sur méga-menu, focus visibles, contrôles clavier pour stories/stack, `prefers-reduced-motion` respecté.
- **Performance mobile RDC** : zéro vidéo, images optimisées (générées à la demande, format compressé), lazy-loading, animations GPU-friendly.

## Ce que je ne fais PAS dans cette itération
- Activation Lovable Cloud, tables, auth, admin, formulaires réellement soumis.
- Pages `/a-propos`, `/don`, `/contact`, `/inscription`, `/admin` (seront des routes stub liées depuis le header pour éviter des liens morts, sans design finalisé).
- Génération d'images définitives : je poserai des placeholders `data-lov-image-placeholder` avec des prompts précis (communauté, cultes, portraits) et remplacerai lors de l'itération suivante ou immédiatement si vous confirmez.

Confirmez, ou dites-moi ce que vous voulez ajuster (ex : générer les images tout de suite, activer Cloud dès maintenant, ou traiter aussi une autre page dans la foulée).
