import type { Ouvrage, OuvrageFormulaire, OuvrageValide, SaisieFormulaire } from '@/domain/ouvrage';

export const SAISIE_VIDE: SaisieFormulaire = {
  titre: '',
  auteur: '',
  editeur: '',
  annee: '',
  lu: false,
};

export function versSaisie(ouvrage: Ouvrage): SaisieFormulaire {
  return {
    titre: ouvrage.titre,
    auteur: ouvrage.auteur,
    editeur: ouvrage.editeur,
    annee: String(ouvrage.annee),
    lu: ouvrage.lu,
  };
}

export function versValide(valeurs: OuvrageFormulaire, base?: Ouvrage): OuvrageValide {
  return {
    ...valeurs,
    favori: base?.favori ?? false,
    note: base?.note ?? null,
    couverture: base?.couverture ?? null,
  };
}
