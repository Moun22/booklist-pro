# BookList Pro

Cahier de lecture numérique des Comptoirs du Livre : application React Native (Expo) exécutée
dans le navigateur, adossée à l'API `api-books-v2` fournie pour l'évaluation.

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

   Vérification : <http://localhost:3000/health>. Les modes `auth`, `chaos` et `final` sont
   décrits dans [api-books-v2/README.md](api-books-v2/README.md).

2. L'application :

   ```bash
   npm install
   npm run web
   ```

   Elle s'ouvre sur <http://localhost:8081>.

Pour vérifier le comportement en mode dégradé (celui de la recette), remplacez `npm start` par
`npm run chaos` dans le dossier de l'API : 1,5 s de latence et 30 % de réponses 503.

## Configuration

L'application lit l'URL de l'API dans `EXPO_PUBLIC_API_URL`, avec `http://localhost:3000` par
défaut. Pour une autre adresse, copiez [.env.example](.env.example) en `.env` et ajustez la valeur
avant de lancer `npm run web`.

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
chaque fusion.

## Ce que fait l'application

- Le fonds : liste paginée par le serveur, chargée page par page en fin de liste ; recherche
  sur le titre et l'auteur ; rubriques « Lus », « Non lus », « Coups de coeur ». Le client ne
  filtre, ne trie et ne pagine jamais lui-même.
- La fiche d'un ouvrage, avec la case « Lu » basculée sans attendre le serveur et remise en
  place s'il refuse.
- La création et la modification dans un formulaire validé par zod, avec les erreurs 422 du
  serveur réparties champ par champ et la détection de conflit de version (`If-Match`, 409).
- La suppression avec confirmation en place et cinq secondes pour annuler avant que la requête
  ne parte.
- Au-dessus de 960 px, la fiche s'ouvre dans un volet à côté du fonds ; en dessous, chaque écran
  prend toute la largeur. Thème clair ou sombre suivant le réglage du système.

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) : le schéma des couches, ce qui les fait
  respecter, et le parcours complet d'une modification de fiche, du clic jusqu'au serveur.
- [docs/ADR/001-gestion-etat-serveur.md](docs/ADR/001-gestion-etat-serveur.md) : pourquoi
  TanStack Query porte tout l'état serveur, et comment.
- [DESIGN.md](DESIGN.md) : le système visuel (couleurs, typographie, composants, règles).
- [PRODUCT.md](PRODUCT.md) : le produit, ses utilisateurs et son vocabulaire.

## Structure du dépôt

Les responsabilités de chaque dossier sont vérifiées par ESLint : un import qui traverse une
frontière interdite fait échouer `npm run lint`.

| Dossier         | Rôle                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `app/`          | Écrans et routage Expo Router. Aucune logique métier, aucun appel réseau |
| `components/`   | Interface pure, sans dépendance à l'API ni au store                      |
| `features/`     | Découpage par domaine : books, erreurs, query ; notes et auth à venir    |
| `hooks/`        | Logique réutilisable                                                     |
| `services/`     | Réseau, stockage, plateforme : seul endroit qui connaît l'API            |
| `domain/`       | Types, schémas zod et règles métier, sans dépendance technique           |
| `theme/`        | Tokens de design et thème                                                |
| `docs/`         | Architecture et décisions d'architecture (ADR)                           |
| `__tests__/`    | Tests Jest, rangés comme le code qu'ils couvrent                         |
| `api-books-v2/` | API Express fournie                                                      |

## Tests

`npm test` lance les suites Jest sous le préréglage `jest-expo` :

- le domaine pur : schémas d'ouvrage, règles de formulaire, rubriques, manipulation du cache ;
- les composants avec Testing Library : ligne d'ouvrage, barre de rubriques, champ de recherche,
  message d'état, interrupteur, question de confirmation, barre d'annulation ;
- les hooks de données avec un `fetch` simulé : liste paginée, retouche optimiste, suppression
  différée avec faux timers ;
- les services : client HTTP avec transport injecté, délai, traduction des erreurs.
