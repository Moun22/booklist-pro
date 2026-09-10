# BookList Pro

Cahier de lecture numérique des Comptoirs du Livre : application React Native (Expo) exécutée
dans le navigateur, adossée à l'API `api-books-v2` fournie pour l'évaluation.

## Prérequis

- Node.js 20 ou plus récent
- npm 10 ou plus récent

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

## Configuration

L'application lit l'URL de l'API dans `EXPO_PUBLIC_API_URL`, avec `http://localhost:3000` par
défaut. Pour une autre adresse, copiez [.env.example](.env.example) en `.env` et ajustez la valeur
avant de lancer `npm run web`.

## Scripts

| Commande            | Effet                                               |
| ------------------- | --------------------------------------------------- |
| `npm run web`       | Serveur de développement Expo, cible navigateur     |
| `npm start`         | Serveur de développement Expo, choix de la cible    |
| `npm run typecheck` | Vérification TypeScript en mode strict              |
| `npm run lint`      | ESLint, dont les règles de frontières entre couches |
| `npm test`          | Tests Jest                                          |
| `npm run format`    | Formatage Prettier                                  |

## Structure cible

Les dossiers apparaissent au fil des fonctionnalités ; leurs responsabilités sont fixées dès
maintenant et vérifiées par ESLint : un import qui traverse une frontière interdite fait échouer
`npm run lint`.

| Dossier         | Rôle                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| `app/`          | Écrans et routage Expo Router. Aucune logique métier, aucun appel réseau |
| `components/`   | Interface pure, sans dépendance à l'API ni au store                      |
| `features/`     | Découpage par domaine : books, notes, auth, sync                         |
| `hooks/`        | Logique réutilisable                                                     |
| `services/`     | Réseau, stockage, plateforme : seul endroit qui connaît l'API            |
| `domain/`       | Types et règles métier, sans dépendance technique                        |
| `theme/`        | Tokens de design                                                         |
| `api-books-v2/` | API Express fournie                                                      |
