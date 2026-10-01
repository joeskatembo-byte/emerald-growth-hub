# Plan — Animations cohérentes sur mobile, tablette et ordinateur

## Objectif
Conserver les animations déjà visibles aux formats actuels et tablette, tout en leur donnant un équivalent tactile fluide sur mobile, sans dépendre uniquement du survol de la souris.

## Changements
- Centraliser les états animés pour couvrir survol, focus clavier, pression tactile et éléments ouverts.
- Adapter les interactions immersives spécifiques, notamment les avatars de la carte communauté, afin qu’un toucher déclenche clairement l’animation et les informations associées.
- Préserver les animations automatiques existantes (texte, carrousels, apparition, progression) et désactiver proprement les mouvements lorsque l’utilisateur préfère moins d’animations.
- Vérifier les pages principales et le tableau de bord aux formats mobile, tablette et ordinateur, en corrigeant tout débordement ou chevauchement lié aux animations.

## Validation
- Vérifier la compilation après les changements.
- Tester les interactions tactiles et le rendu à plusieurs largeurs d’écran dans l’aperçu.
