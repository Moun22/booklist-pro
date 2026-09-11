# ADR 002 — Résolution des conflits d'écriture

## Statut

Accepté — 11/09/2026. Appliqué depuis le formulaire de modification (issue #6) et étendu aux
bascules de la fiche, à la note par étoiles et aux couvertures.

## Contexte

Plusieurs postes modifient le même fonds : deux libraires peuvent corriger la même fiche à
quelques secondes d'intervalle. L'API versionne chaque livre (`version` incrémentée à chaque
écriture) et accepte l'en-tête `If-Match` : une écriture portant une version périmée est refusée
par un **409** qui renvoie la fiche telle que le serveur la connaît et la version attendue. Sans
`If-Match`, le dernier écrivain gagne en silence, ce que le sujet tolère jusqu'au lot 3 et refuse
au lot 4.

Contraintes retenues :

- la saisie du libraire ne se perd jamais (principe produit n° 1) ;
- le libraire doit comprendre ce qui s'est passé, sans vocabulaire technique ;
- le projet s'arrête au lot 3 : pas de file de mutations hors ligne, donc pas de conflit différé ;
  le conflit survient toujours en ligne, au moment de l'écriture.

## Options envisagées

1. **Le dernier écrivain gagne** (pas d'`If-Match`). Aucun code, mais la correction d'un collègue
   disparaît sans que personne ne le sache : contraire au principe n° 1.
2. **Le serveur gagne, avec reprise assistée.** Chaque écriture porte `If-Match` ; sur un 409 la
   version du serveur remplace la nôtre à l'écran, le libraire est prévenu et sa saisie reste dans
   le formulaire pour qu'il décide : reprendre la version du serveur, ou réappliquer ses
   modifications par-dessus et enregistrer à nouveau.
3. **Le client gagne** : sur un 409, recharger la version serveur puis réécrire par-dessus. Simple,
   mais efface le travail du collègue, et le libraire ne voit même pas qu'il y a eu conflit.
4. **Fusion assistée champ par champ.** La plus valorisée par le sujet, mais son écran de
   comparaison n'a de sens que pour des textes longs ; nos champs sont un titre, un auteur, un
   éditeur, une année et des booléens. Le coût d'interface dépasse le bénéfice pour ce lot.

## Décision

Nous retenons l'option 2 : **le serveur gagne, le libraire garde sa saisie et arbitre**.

- Toute écriture d'un ouvrage envoie `If-Match: <version connue>` : `PUT` du formulaire, `PATCH`
  des bascules « Lu », « Coup de coeur » et de la note par étoiles, `POST` et `DELETE` de la
  couverture (`services/api/ouvrages.ts`, `services/api/couvertures.ts`).
- Un 409 devient une `ErreurConflit` typée (`domain/erreurs.ts`) qui transporte la fiche serveur,
  validée par zod, et la version attendue (`services/api/traduireErreurs.ts`).
- Dans le formulaire, la fiche serveur est propagée dans le cache (liste et fiche affichent la
  vérité du serveur) et le message « Cette fiche a été modifiée entre temps » apparaît avec le
  bouton « Reprendre la version du serveur ». Tant qu'il ne l'a pas pressé, le libraire voit
  encore ses valeurs et peut enregistrer à nouveau : la nouvelle tentative porte la version
  fraîche et passe (`features/books/FormulaireOuvrage.tsx`, `useEnregistrerOuvrage.ts`).
- Pour une bascule optimiste (« Lu », coeur, étoiles), le 409 annule la bascule à l'écran, comme
  toute erreur, propage la fiche serveur et affiche « Modification annulée : … » sous la fiche
  (`features/books/useRetoucheOuvrage.ts`). Le libraire rejoue son geste s'il le maintient.
- Le rôle lecteur n'écrit jamais : ses refus 403 sont un autre cas, traité par `ErreurAuth`.

## Conséquences

Positives :

- aucune perte silencieuse : la règle est visible dans le code (un en-tête sur chaque écriture),
  dans l'interface (un message et un bouton), et se démontre en recette avec un `PATCH` en ligne
  de commande pendant la modification ;
- la stratégie est la même pour toutes les écritures, formulaire compris, donc une seule chose à
  expliquer au libraire ;
- la détection repose sur la version du serveur, jamais sur `updatedAt` ni sur l'horloge du poste,
  qui peut être fausse.

Négatives :

- pour un conflit sur un champ que le libraire n'a pas touché, on lui demande quand même
  d'arbitrer ; une fusion automatique par champ l'éviterait ;
- deux bascules rapides sur la même fiche (« Lu » puis coeur avant la réponse) enverraient la
  même version : la fiche désactive la seconde bascule tant que la première n'est pas revenue.

À revoir si :

- le lot 4 est entrepris : la file de mutations hors ligne devra porter `baseVersion` sur chaque
  mutation et appliquer cette même stratégie aux résultats `conflit` de `POST /sync`, par une
  fonction pure et testée ;
- des champs longs arrivent (notes de lecture éditables) : la fusion assistée deviendrait
  justifiée pour eux.
