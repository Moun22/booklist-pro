# Changelog de l'API

Toutes les modifications apportées à l'API fournie sont consignées ici, pour qu'un correcteur
puisse lancer le client contre **cette** version. La justification détaillée est dans
[docs/ADR/003-routes-de-couverture.md](../docs/ADR/003-routes-de-couverture.md).

## 2.1.0 — 2026-09-11

Ajout des couvertures, que le sujet décrit mais que la v2.0.0 ne servait pas
(`couverture` valait `null` pour tout le fonds et aucune route d'image n'existait).

### Ajouté

- `GET /covers/:fichier` : sert une couverture. `:id.svg` est générée à la volée pour tout livre
  connu (fond et texte déterministes à partir de l'identifiant) ; `:id.png|jpg|webp` est une image
  téléversée. Sans authentification, car une balise `<img>` n'envoie pas de jeton. En-tête
  `Cache-Control: public, max-age=86400`.
- `POST /books/:id/cover` avec le corps `{ "image": "data:image/jpeg;base64,…" }` : remplace la
  couverture par l'image envoyée. Formats acceptés : `image/png`, `image/jpeg`, `image/webp`
  (sinon **415** `format_non_supporte`). Taille décodée maximale 300 Ko (sinon **413**
  `image_trop_lourde`) ; un corps JSON au-delà de 2 Mo est refusé avec le même **413** avant même
  d'être lu. `If-Match` est honoré comme sur `PUT` (**409** en cas de version périmée). Répond
  **200** avec le livre mis à jour, `version` incrémentée, `couverture` valant
  `/covers/:id.<ext>`.
- `DELETE /books/:id/cover` : retire l'image téléversée et rétablit la couverture d'origine
  (celle du seed : SVG générée, URL externe ou `null`). Répond **200** avec le livre mis à jour.
- Le seed attribue désormais une couverture à la plupart des livres : environ 80 % un chemin relatif
  `/covers/:id.svg`, 10 % une URL externe absolue (OpenLibrary), 10 % aucune. Les trois formes
  sont volontaires : le client doit les traiter sans jamais afficher une image cassée.

### Modifié

- Un livre porte `couvertureOrigine` tant qu'une image téléversée remplace sa couverture du seed ;
  le champ disparaît quand la couverture d'origine est rétablie. Les clients qui valident les
  réponses doivent ignorer les champs inconnus.
- `DELETE /books/:id` supprime aussi l'image téléversée du livre.
- `/health` annonce la version `2.1.0`.
- Le test de fumée couvre les nouvelles routes (`npm run test:api`).

### Inchangé

Toutes les routes de la v2.0.0, leurs codes d'erreur et le format des erreurs.
