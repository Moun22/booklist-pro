# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Libraire titulaire** : ajoute, modifie et note les ouvrages, rédige les notes de lecture. Droits d'écriture complets (rôle `editeur` de l'API).
- **Libraire saisonnier** : consulte le fonds et les notes de lecture pour conseiller un client. Lecture seule (rôle `lecteur`), jamais d'écriture.
- **Responsable réseau** : consulte les statistiques de lecture de l'ensemble du réseau (tableau de bord chiffré).

Situations réelles : poste de caisse (PC, wifi partagé avec la caisse, souris pas toujours confortable), réserve en sous-sol sans réseau, salons du livre sans couverture. Usage sur PC et sur mobile à égalité, confirmé par l'utilisateur : ni l'un ni l'autre n'est secondaire.

## Product Purpose

Numériser le cahier de lecture des Comptoirs du Livre, réseau de dix-sept librairies indépendantes sur trois régions. Le cahier consigne ce que les libraires ont lu, ce qu'ils en pensent, ce qu'ils recommandent à quel type de client. C'est l'outil de vente le plus précieux du réseau, aujourd'hui en papier, illisible, et perdu dès qu'un libraire change de boutique.

Succès : un libraire retrouve un ouvrage et ses notes en quelques secondes, saisit hors ligne sans rien perdre, et les fiches restent cohérentes entre plusieurs postes qui modifient les mêmes ouvrages.

## Positioning

Un cahier de lecture partagé qui reste utilisable sans réseau et se resynchronise ensuite en détectant et résolvant les conflits, avec une règle absolue : la saisie du libraire ne se perd jamais. Ni un catalogue, ni une application de lecture grand public : un outil de conseil en librairie.

Contexte : projet d'évaluation finale React Native (M2) ; le responsable produit est joué par le formateur.

## Operating Context

- Cible d'exécution : navigateur, via `npx expo start --web`, sur les postes de caisse existants. iOS et Android suivront sur la même base de code ; Expo Go sur appareil physique est un bonus.
- API fournie, `api-books-v2/` (Express), étendue en 2.1 pour les couvertures (routes `GET /covers/:fichier`, `POST` et `DELETE /books/:id/cover`, consignées dans son `CHANGELOG.md` et l'ADR 003) : pagination et filtres côté serveur, versionnement des fiches (`If-Match`, 409), synchronisation par lot idempotente (`POST /sync`), JWT avec jeton d'accès de 120 s, mode dégradé (latence 1,5 s, 30 % de 503). La recette finale se déroule en mode `npm run final` : authentification et chaos combinés.
- Scénario de recette rejoué devant le jury : connexion, passage hors ligne, création et modification d'ouvrages hors ligne, modification concurrente côté serveur, expiration du jeton, retour du réseau. Attendu : rafraîchissement silencieux, aucun doublon, conflit détecté et résolu selon la stratégie annoncée, rien de perdu.
- Évaluation : comité de recette de cinq minutes (démonstration, revue de code, questions), dépôt Git, README, ADR, IA.md, vidéo de démonstration.

## Capabilities and Constraints

- Lots de livraison cumulatifs : (1) fonds des ouvrages, fiche, ajout, modification, suppression, statut lu / non lu ; (2) notes de lecture, coups de coeur, recherche, filtres et tri serveur, pagination ; (3) note interne 0 à 5 par étoiles, couvertures, enrichissement OpenLibrary, thème clair et sombre, français et anglais ; (4) comptes et rôles, mode hors ligne, file de mutations, résolution des conflits, tableau de bord des statistiques ; (5) intégration continue, tests de bout en bout, déploiement.
- Terminologie confirmée : « ouvrage » pour un livre du fonds ; « fonds » pour la collection ; « note » pour la note interne de 0 à 5 (étoiles) ; « note de lecture » pour le texte horodaté ; « coup de coeur » pour le favori ; « lu / non lu » pour le statut.
- Champs d'un ouvrage : titre, auteur, éditeur, année, lu, coup de coeur, note (0 à 5 ou nulle), couverture (chemin relatif, URL absolue ou nulle), `updatedAt`, `version`.
- Exigences d'interface imposées par le sujet : quatre états sur chaque écran de données (chargement en squelette, erreur avec réessai, vide contextualisé, succès) ; suppression avec confirmation et annulation possible pendant cinq secondes ; mises à jour optimistes avec retour arrière visible ; indicateur de synchronisation permanent (en ligne, hors ligne, N modifications en attente, conflit à traiter) ; thème centralisé, aucune couleur ni chaîne visible en dur dans les composants ; bilingue à chaud avec formats de date et de nombre ; erreurs 422 affichées champ par champ, 503 avec réessai.
- Le rôle lecteur ne voit aucune action d'écriture : masquée, jamais simplement désactivée.
- Contraintes techniques : React Native (Expo SDK 57) rendu par react-native-web ; pas d'`Alert.alert`, pas d'API matérielle ; liste virtualisée pour 500 ouvrages ; aucun fichier de plus de 250 lignes ; architecture en couches `app/ components/ features/ hooks/ services/ domain/ theme/`.
- Décidé (ADR 002) : en cas de conflit d'écriture, le serveur gagne et le libraire garde sa saisie pour arbitrer ; la fusion assistée est reportée aux champs longs. Le projet s'arrête au lot 3 : pas de comptes, pas de mode hors ligne, pas de file de mutations.
- Non décidé : présence et forme du nom du réseau dans l'interface.

## Brand Commitments

- Nom du produit : BookList Pro. Réseau : Les Comptoirs du Livre. Aucun logo, aucune couleur, aucune charte n'ont été fournis (confirmé) : l'identité est à créer.
- Contrainte posée par l'utilisateur : une interface de niche, propre, simple à utiliser, agréable à regarder, et clairement différente du rendu d'une IA par défaut.
- Préférence confirmée lors du choix de direction : registre sobre, jamais décoratif ni trop marqué, l'identité dans les détails ; la barre de comparaison est celle des SaaS sobres, Linear et Notion.
- Langue par défaut : français ; anglais en bascule.

## Evidence on Hand

- Données : 500 ouvrages générés par `api-books-v2/src/seed.js` (titres et auteurs de science-fiction francophone synthétiques ; éditeurs réels : Denoël, Le Bélial, Actes Sud, Gallimard, Bragelonne, Mnémos, Folio SF, La Volte, Albin Michel, Robert Laffont), 381 notes de lecture, deux comptes de test (`editeur@booklist.fr`, `lecteur@booklist.fr`). Couvertures depuis l'API 2.1 : environ 80 % des ouvrages ont une couverture SVG générée par l'API (chemin relatif `/covers/:id.svg`), 10 % une URL externe OpenLibrary, 10 % aucune ; un libraire peut téléverser la sienne (png, jpeg, webp, 300 Ko décodés au plus) et revenir à l'origine.
- Documents : le sujet et le support de cours, en PDF à la racine, non versionnés.
- Absences à ne pas inventer : librairies réelles du réseau, témoignages, chiffres d'activité, logo.

## Product Principles

1. La saisie du libraire ne se perd jamais : chaque action a un retour visible, un réessai, une annulation.
2. Le serveur fait le tri : recherche, filtres, tri et pagination ne se font jamais côté client.
3. L'état du réseau est toujours lisible : en ligne, hors ligne, en attente, conflit.
4. Scannable avant expressif : le fonds se balaie en quelques secondes, au clavier comme au doigt.
5. Un outil de métier, pas une application de lecture grand public : le libraire conseille un client, il ne consomme pas.

## Accessibility & Inclusion

- Navigation clavier complète : les postes de caisse n'ont pas tous une souris confortable.
- Zones tactiles d'au moins 44 points ; rôle, libellé et état sur chaque élément interactif ; contraste d'au moins 4,5:1.
- Thème sombre respectant la préférence système, bascule manuelle persistée : les boutiques ouvrent tôt et ferment tard.
- Français et anglais avec dates et nombres localisés : deux boutiques sont en zone frontalière.
