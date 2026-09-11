# ADR 003 — Routes de couverture ajoutées à l'API

## Statut

Accepté — 11/09/2026. Livré avec le lot 3, versionné `api-books-v2` 2.1.0, consigné dans
[api-books-v2/CHANGELOG.md](../../api-books-v2/CHANGELOG.md).

## Contexte

Le lot 3 demande d'afficher les couvertures dans la liste et sur la fiche, d'en remplacer une par
un fichier envoyé en base64 à `POST /books/:id/cover`, et de pouvoir revenir à la couverture
d'origine. Le sujet décrit une API qui « sert une couverture générée pour la plupart des ouvrages,
mais pas pour tous », avec un champ pouvant contenir un chemin relatif ou une URL externe.

L'API livrée (2.0.0) ne le fait pas : `couverture` vaut `null` pour les 500 livres et aucune route
d'image n'existe. Le sujet prévoit ce cas : toute route ajoutée doit être justifiée en ADR, et toute
modification versionnée dans un `CHANGELOG.md` pour qu'un correcteur lance le client contre notre
API.

Contraintes :

- ne rien changer au contrat existant : mêmes routes, mêmes codes, même format d'erreur ;
- respecter la forme des erreurs de l'API (`{ erreur, message, champs }`), distinguer un format
  refusé d'une image trop lourde, honorer `If-Match` comme sur `PUT` ;
- des images qu'une balise `<img>` peut charger sans jeton, car elle n'en envoie pas ;
- un client qui doit tenir sans réseau externe : les trois formes du champ (relatif, absolu,
  `null`) doivent exister dans le jeu de données.

## Options envisagées

1. **Ne rien ajouter et simuler côté client** (couverture générée dans l'application). Le client
   ne pourrait pas remplacer une couverture, et la fiche mentirait sur ce que le serveur sait.
2. **Stocker les images en base64 dans `db.json`.** Aucun système de fichiers à gérer, mais chaque
   lecture de la liste transporterait les images, et un fichier JSON de plusieurs mégaoctets se
   réécrit à chaque écriture.
3. **Générer une couverture SVG à la volée et stocker les images téléversées sur disque.** Aucun
   asset à livrer, un rendu déterministe par identifiant, des fichiers servis avec un cache HTTP,
   et le JSON ne contient que des chemins.

## Décision

Option 3, dans un module dédié `api-books-v2/src/couvertures.js` :

- `GET /covers/:id.svg` génère la couverture d'un livre connu (teinte choisie par empreinte de
  l'identifiant, titre et auteur en texte) ; `GET /covers/:id.(png|jpg|webp)` sert un fichier
  téléversé depuis `data/covers/`, dossier ignoré par Git comme la base. Pas d'authentification,
  `Cache-Control: public, max-age=86400`.
- `POST /books/:id/cover` reçoit `{ image: "data:image/…;base64,…" }`. Refus **415**
  `format_non_supporte` hors png, jpeg, webp ; refus **413** `image_trop_lourde` au-delà de
  300 Ko décodés (et pour tout corps JSON au-delà de 2 Mo, avant lecture) ; **422** si le corps
  n'est pas une data URL ; **409** si `If-Match` est périmé. Réponse **200** avec le livre,
  `version` incrémentée, `couverture` valant le chemin relatif du fichier.
- `DELETE /books/:id/cover` supprime le fichier et rétablit la couverture d'origine. Pour la
  connaître, le livre porte `couvertureOrigine` tant qu'une image téléversée le recouvre ; le
  champ disparaît au retour à l'origine.
- Le seed attribue environ 80 % de chemins relatifs, 10 % d'URL externes réelles (OpenLibrary)
  et 10 % de `null`, pour que le client traite les trois cas ; une URL externe injoignable hors
  réseau tombe sur le repli, ce qui est le comportement attendu.
- `DELETE /books/:id` supprime aussi le fichier du livre ; le test de fumée couvre les nouvelles
  routes ; `/health` annonce `2.1.0`.

Côté client, une seule fonction, `resoudreCouverture` dans `services/api/couvertures.ts`,
transforme la valeur du champ en source affichable ; les composants ne connaissent que le résultat.

## Conséquences

Positives :

- le contrat 2.0.0 est intact : un client écrit pour l'API d'origine fonctionne toujours ;
- l'extension est petite (un module, trois routes), testée, et son histoire tient dans le
  changelog ;
- la limite de 300 Ko oblige le client à redimensionner avant l'envoi, exactement ce que le sujet
  attend d'une photo de téléphone.

Négatives :

- `couvertureOrigine` est un champ que le client doit ignorer : nos schémas zod le font par défaut ;
- une couverture téléversée n'est pas versionnée : remplacer deux fois écrase la première image,
  seule l'origine du seed reste récupérable ;
- les images vivent sur le disque du poste qui héberge l'API, non dans `db.json` : `npm run seed`
  régénère la base mais ne vide pas `data/covers/`.

À revoir si :

- l'API devait tourner sur plusieurs instances : les fichiers devraient rejoindre un stockage
  partagé ;
- la génération SVG devait refléter le vrai visuel d'un ouvrage : une couverture de secours
  OpenLibrary pourrait remplacer le SVG généré.
