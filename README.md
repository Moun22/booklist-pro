# BookList Pro

Cahier de lecture numérique des Comptoirs du Livre : application React Native (Expo) exécutée
dans le navigateur, adossée à l'API `api-books-v2` fournie pour l'évaluation et étendue en
version 2.1 pour les couvertures (voir [api-books-v2/CHANGELOG.md](api-books-v2/CHANGELOG.md)).

## Prérequis

- Node.js 20 ou plus récent
- npm 10 ou plus récent
- un navigateur récent (Chrome, Edge, Firefox ou Safari)

## Lancer le projet

Deux terminaux.

1. L'API. La base est générée une seule fois, le serveur est relancé à chaque session :

   ```bash
   cd api-books-v2
   npm install
   npm run seed
   npm start
   ```

   Vérification : <http://localhost:3000/health> doit annoncer la version `2.1.0`. Les modes
   `auth`, `chaos` et `final` sont décrits dans [api-books-v2/README.md](api-books-v2/README.md).

2. L'application :

   ```bash
   npm install
   npm run web
   ```

   Elle s'ouvre sur <http://localhost:8081>.

Pour vérifier le comportement en mode dégradé (celui de la recette), remplacez `npm start` par
`npm run chaos` dans le dossier de l'API : 1,5 s de latence et 30 % de réponses 503. Sous
Windows, les scripts `chaos`, `auth` et `final` utilisent la syntaxe d'environnement de bash ;
dans PowerShell, lancez plutôt :

```powershell
$env:CHAOS_LATENCE=1500; $env:CHAOS_ECHEC=0.3; npm start
```

## Configuration

L'application lit l'URL de l'API dans `EXPO_PUBLIC_API_URL`, avec `http://localhost:3000` par
défaut. Pour une autre adresse, copiez [.env.example](.env.example) en `.env` et ajustez la valeur
avant de lancer `npm run web`. L'enrichissement bibliographique interroge `openlibrary.org` ;
sans accès à Internet, la fiche affiche « OpenLibrary injoignable » et tout le reste fonctionne.

## Scripts

| Commande               | Effet                                                       |
| ---------------------- | ----------------------------------------------------------- |
| `npm run web`          | Serveur de développement Expo, cible navigateur             |
| `npm start`            | Serveur de développement Expo, choix de la cible            |
| `npm run typecheck`    | Vérification TypeScript en mode strict                      |
| `npm run lint`         | ESLint, dont les règles de frontières entre couches         |
| `npm test`             | Tests Jest                                                  |
| `npx jest --coverage`  | Tests avec couverture, mesurée sur `domain/` et `services/` |
| `npm run format`       | Formatage Prettier                                          |
| `npm run format:check` | Vérifie le formatage sans modifier les fichiers             |

Les quatre vérifications (`typecheck`, `lint`, `test`, `format:check`) passent sur `main` à
chaque fusion. Dans `api-books-v2/`, `npm run test:api` rejoue le test de fumée de toutes les
routes, couvertures comprises.

## Ce que fait l'application

- Le fonds : liste paginée par le serveur, chargée page par page en fin de liste ; recherche
  sur le titre et l'auteur ; rubriques « Lus », « Non lus », « Coups de coeur » ; tri par titre,
  auteur, année ou note. Le client ne filtre, ne trie et ne pagine jamais lui-même.
- La fiche d'un ouvrage : couverture, note par étoiles, coup de coeur et statut « Lu » basculés
  sans attendre le serveur et remis en place s'il refuse, nombre d'éditions référencées sur
  OpenLibrary, notes de lecture horodatées (ajout, suppression).
- La couverture : servie par l'API (générée, externe ou absente, jamais d'image cassée),
  remplaçable par un fichier redimensionné avant l'envoi, avec retour à la couverture d'origine.
- La création et la modification dans un formulaire validé par zod, avec les erreurs 422 du
  serveur réparties champ par champ et la détection de conflit de version (`If-Match`, 409).
- La suppression avec confirmation en place et cinq secondes pour annuler avant que la requête
  ne parte.
- Thème clair ou sombre (réglage du système par défaut, bascule persistée) et interface en
  français ou en anglais à chaud, dates et nombres compris.
- Au-dessus de 960 px, la fiche s'ouvre dans un volet à côté du fonds ; en dessous, chaque écran
  prend toute la largeur.
- Les comptes (lot 4, volet 4.1) : écran de connexion, session persistée, rafraîchissement
  silencieux du jeton d'accès, déconnexion ; un compte lecteur ne voit aucune action d'écriture.

## Depuis la revue intermédiaire

Ce qui a été ajouté après la revue de mi-parcours, dans l'ordre.

1. **Tests du lot 3 complétés.** Le redimensionnement et l'encodage de l'image choisie
   (`services/plateforme/image.ts`), les hooks de couverture (propagation du cache, conflit 409),
   le composant de couverture (retour à l'origine, refus du serveur, lecture seule), la notation
   par étoiles dans la fiche et le bouton d'envoi du formulaire désactivé pendant la soumission
   sont maintenant couverts. La couverture mesurée sur `domain/` et `services/` est de 95 % des
   instructions et 86 % des branches (`npx jest --coverage`).
2. **Lot 4 amorcé : les comptes.** Écran de connexion (`app/connexion.tsx`), session persistée
   et restaurée au démarrage (`features/auth/SessionProvider.tsx`), jetons rangés derrière
   `services/stockageSecurise.ts` (trousseau de l'appareil sur mobile ; sur navigateur, repli sur
   le stockage local, sans coffre possible, ce qui est documenté ici), intercepteur unique dans
   `services/api/intercepteurAuth.ts` : injection du jeton, détection du 401, rafraîchissement,
   rejeu de la requête, et **un seul rafraîchissement** quand plusieurs requêtes reçoivent un 401
   en même temps. Une route protégée redirige vers la connexion puis revient à l'écran demandé.
   Le rôle `lecteur` ne voit aucune action d'écriture : elles sont masquées, pas désactivées.
   Le tout est testé : intercepteur (dont dix 401 simultanés), service d'authentification,
   stockage sécurisé, fournisseur de session, formulaire de connexion, fiche en lecture seule.
3. **Ce qui n'est pas couvert du lot 4**, par choix : mode hors ligne, file de mutations,
   synchronisation par `POST /sync`, résolution différée des conflits, tableau de bord.

Pour l'essayer en mode recette (`npm run final` dans `api-books-v2/`, authentification et chaos
combinés), les comptes du seed sont `editeur@booklist.fr` / `editeur123` et
`lecteur@booklist.fr` / `lecteur123`. Le jeton d'accès expire toutes les 120 secondes : le
rafraîchissement se fait sans que le libraire ne s'en aperçoive.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) : le schéma des couches, ce qui les fait
  respecter, et le parcours complet d'une modification de fiche, du clic jusqu'au serveur.
- [docs/ADR/001-gestion-etat-serveur.md](docs/ADR/001-gestion-etat-serveur.md) : pourquoi
  TanStack Query porte tout l'état serveur, et comment.
- [docs/ADR/002-resolution-des-conflits.md](docs/ADR/002-resolution-des-conflits.md) : le
  serveur gagne, le libraire garde sa saisie et arbitre.
- [docs/ADR/003-routes-de-couverture.md](docs/ADR/003-routes-de-couverture.md) : pourquoi et
  comment l'API a été étendue pour les couvertures.
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md) : mesure avant et après optimisation de la liste.
- [DESIGN.md](DESIGN.md) : le système visuel (couleurs, typographie, composants, règles).
- [PRODUCT.md](PRODUCT.md) : le produit, ses utilisateurs et son vocabulaire.
- [IA.md](IA.md) : l'usage de l'assistant de génération de code sur une fonctionnalité.

## Structure du dépôt

Les responsabilités de chaque dossier sont vérifiées par ESLint : un import qui traverse une
frontière interdite fait échouer `npm run lint`.

| Dossier         | Rôle                                                                           |
| --------------- | ------------------------------------------------------------------------------ |
| `app/`          | Écrans et routage Expo Router. Aucune logique métier, aucun appel réseau       |
| `components/`   | Interface pure, sans dépendance à l'API ni au store                            |
| `features/`     | Découpage par domaine : books, notes, auth, enrichissement, preferences, i18n  |
| `hooks/`        | Logique réutilisable                                                           |
| `services/`     | Réseau, stockage, plateforme : seul endroit qui connaît l'API et les capacités |
| `domain/`       | Types, schémas zod et règles métier, sans dépendance technique                 |
| `theme/`        | Tokens de design et thème                                                      |
| `docs/`         | Architecture, décisions d'architecture (ADR), mesure de performance            |
| `__tests__/`    | Tests Jest, rangés comme le code qu'ils couvrent                               |
| `api-books-v2/` | API Express fournie, étendue en 2.1 (couvertures)                              |

## Tests

`npm test` lance les suites Jest sous le préréglage `jest-expo` :

- le domaine pur : schémas d'ouvrage et de note de lecture dans les deux langues, règles de
  formulaire, rubriques et tri, manipulation du cache, horodatage ;
- les composants avec Testing Library : ligne d'ouvrage, barre de rubriques, champ de recherche,
  message d'état, interrupteur, étoiles, couverture, question de confirmation, barre
  d'annulation, menu de tri ;
- les hooks de données avec un `fetch` simulé : liste paginée, retouche optimiste, notes,
  couvertures, enrichissement OpenLibrary, suppression différée avec faux timers, préférences
  persistées, session (restauration, connexion, déconnexion, demande de connexion sur un 401) ;
- les services : client HTTP avec transport injecté, délai, traduction des erreurs,
  intercepteur d'authentification (un seul rafraîchissement pour dix 401 simultanés),
  authentification, couvertures, choix et redimensionnement d'image, OpenLibrary, stockage et
  stockage sécurisé.
