# Performance de la liste

Le fonds compte 500 ouvrages. Deux exigences du sujet sont mesurables : « la frappe dans la barre
de recherche ne doit pas re-rendre toute la liste » et « liste fluide, lignes mémoïsées, images
dimensionnées et mises en cache ». Ce document donne la méthode, une mesure avant et après
l'optimisation de la frappe, et ce qui a été fait pour les images.

## Ce qui a été optimisé

1. **La liste ne se re-rend plus quand on tape.** Avant le lot 2, `useFonds` renvoyait un objet
   neuf à chaque rendu du panneau, et `FondsListe` n'était pas mémoïsée : chaque lettre tapée
   dans la recherche re-rendait le panneau (normal, il porte l'état du champ), donc la liste, donc
   la `FlatList` et ses vingt cellules visibles, alors que les données n'avaient pas changé
   (l'anti-rebond de 300 ms n'avait pas encore lancé la requête). Après : `useFonds` renvoie un
   objet stable (`useMemo` sur toutes ses parties) et `FondsListe` est enveloppée dans `memo` ;
   ses props ne changeant pas pendant la frappe, React saute son rendu.
2. **Lignes mémoïsées** depuis le lot 1 : `BookRow` est un `memo`, le rappel de rendu et les
   rappels de pression sont stables (`useCallback`), la clé est l'identifiant, et
   `getItemLayout` donne la hauteur fixe de 56 px pour que la `FlatList` n'ait pas à mesurer.
3. **Images dimensionnées et mises en cache** (lot 3) : chaque vignette est rendue par
   `expo-image` à une taille fixe (28 × 40 en liste, 80 × 120 en fiche), avec
   `cachePolicy="memory-disk"` et une `recyclingKey` ; la couverture générée par l'API est un SVG
   de quelques centaines d'octets servi avec `Cache-Control: public, max-age=86400`. Une image
   absente ou cassée est remplacée par un repli de la même taille, donc aucune ligne ne change de
   hauteur en cours de chargement.

## Méthode

Mesure par le protocole Chrome DevTools sur un Chrome headless (1440 × 900, échelle 1), contre
l'API locale sans mode chaos, avec le script `mesure-perf.mjs` (dossier de travail, non versionné) :

1. ouvrir `http://localhost:8081/`, attendre 10 s ;
2. donner le focus au champ de recherche, relever `Performance.getMetrics` ;
3. insérer cinq lettres (`archi`) à 120 ms d'intervalle, sous l'anti-rebond de 300 ms, puis
   attendre 150 ms et relever à nouveau ;
4. lire la différence de `ScriptDuration` (temps d'exécution JavaScript) et le nombre de rendus
   de `FondsListe`, compté par un compteur global ajouté temporairement dans le composant pour
   la mesure, puis retiré.

Chaque configuration a été mesurée trois fois pour le temps script ; les valeurs varient d'une
exécution à l'autre (compilation à la volée, cache), la médiane est retenue.

## Résultat

| Configuration                      | Rendus de la liste pour 5 lettres | Temps script (médiane de 3) |
| ---------------------------------- | --------------------------------- | --------------------------- |
| Avant (objet neuf, liste non mémo) | 5                                 | 102 ms                      |
| Après (objet stable, liste `memo`) | 0                                 | 68 ms                       |

Le compteur est la mesure décisive : avant, chaque lettre re-rendait la liste et sa `FlatList` ;
après, la liste n'est pas rendue une seule fois pendant la frappe, et le temps script restant est
celui du bandeau (champ, rubriques) qui, lui, doit se re-rendre. Le gain en temps (environ un
tiers) est modeste sur un poste de développement ; il compte davantage sur un poste de caisse
ancien, et surtout il ne croît plus avec le nombre de lignes visibles.

À reproduire soi-même avec React DevTools : onglet Profiler, cocher « Highlight updates when
components render », taper dans la recherche : seul le bandeau clignote, aucune ligne de la liste.

## Ce qui n'a pas été mesuré

Le défilement : les relevés ne montrent ni recalcul de style ni layout supplémentaire pendant
huit crans de 600 px, mais le script ne reproduit pas fidèlement un défilement au doigt ; la
fluidité se constate à l'oeil sur les 500 ouvrages, avec les vignettes chargées à la volée.
