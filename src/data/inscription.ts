export const communes = [
  "Bandalungwa", "Barumbu", "Bumbu", "Gombe", "Kalamu", "Kasa-Vubu", "Kimbanseke",
  "Kinshasa", "Kintambo", "Kisenso", "Lemba", "Limete", "Lingwala", "Makala",
  "Maluku", "Masina", "Matete", "Mont-Ngafula", "Ndjili", "Ngaba", "Ngaliema",
  "Ngiri-Ngiri", "Nsele", "Selembao",
];

export const etatsCivils = ["Célibataire", "Marié(e)", "Veuf/Veuve"] as const;
export type EtatCivil = (typeof etatsCivils)[number];

export const departmentNames = [
  "Jeunesse", "Femmes", "Hommes", "Louange", "Enfants", "Intercession", "Accueil", "Aucun",
];