# Architecture

## Les couches

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ app/          écrans et routage Expo Router : compose, ne calcule rien    │
├───────────────────────────────────────────────────────────────────────────┤
│ features/     un dossier par domaine (books, erreurs, query) :            │
│               hooks de données, écrans composés, règles d'affichage       │
├────────────────────────┬──────────────────────────────────────────────────┤
│ components/            │ hooks/                                           │
│ interface pure,        │ logique réutilisable sans domaine                 │
│ données par props      │ (navigation, largeur d'écran, focus, Escape)     │
├────────────────────────┴──────────────────────────────────────────────────┤
│ services/     seul endroit qui connaît l'API : URL, méthodes HTTP,        │
│               en-têtes, délai, intercepteur, traduction des erreurs       │
├───────────────────────────────────────────────────────────────────────────┤
│ domain/       types, schémas zod, erreurs applicatives, règles métier     │
│               sans React, sans Expo, sans réseau                          │
├───────────────────────────────────────────────────────────────────────────┤
│ theme/        tokens (couleurs, tailles, espacements), thème clair/sombre │
└───────────────────────────────────────────────────────────────────────────┘
```

Les dépendances descendent : `app/` importe `features/`, `components/`, `hooks/` et `theme/` ;
`features/` importe `services/`, `domain/`, `components/`, `hooks/` et `theme/` ;
`services/` n'importe que `domain/` ; `domain/` n'importe rien du projet. Une couche
n'importe jamais celle du dessus.

### Ce qui empêche un composant d'appeler l'API

Ce ne sont pas des conventions mais des règles ESLint, dans [eslint.config.js](../eslint.config.js),
qui font échouer `npm run lint` :

| Dossier       | Interdit                                                                            |
| ------------- | ----------------------------------------------------------------------------------- |
| `app/`        | `fetch`, `XMLHttpRequest`, tout import de `services/` ou de `@tanstack/react-query` |
| `components/` | la même liste, plus tout import de `features/`                                      |
| `domain/`     | `react`, `react-native`, `expo*`, `services/`, `features/`                          |

Un composant reçoit donc ses données et ses rappels par props ; un écran de `app/` ne peut
qu'appeler un hook de `features/`. Le seul module qui construit une URL est
[services/api/config.ts](../services/api/config.ts), qui lit `EXPO_PUBLIC_API_URL`.

### Où placer une nouvelle entité

Pour des « collections thématiques », par exemple :

1. `domain/collection.ts` : le schéma zod de la collection et ses types dérivés.
2. `services/api/collections.ts` : les appels HTTP, validés par ce schéma. Si l'API fournie
   n'a pas la route, elle s'ajoute dans `api-books-v2/` avec une entrée de `CHANGELOG.md` et un
   ADR qui la justifie.
3. `features/collections/` : les clés de cache, les hooks `useCollections`, `useCollection`,
   les mutations, et les écrans composés à partir de `components/`.
4. `app/(fonds)/collections/…` : les routes, qui ne font que composer.
5. `components/` : uniquement si un élément d'interface vraiment nouveau est nécessaire ; une
   liste de collections réutilise `BookRow`, `RubricBar` ou `StateMessage` tels quels.

## Le parcours d'une modification de fiche, du clic jusqu'au serveur

Le libraire ouvre un ouvrage, presse « Modifier », change l'année, presse « Enregistrer ».

| Étape | Couche      | Fichier                                                               | Ce qui se passe                                                                                                                                                                                                         |
| ----- | ----------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `features/` | `features/books/FicheOuvrage.tsx`                                     | « Modifier » appelle le rappel `onModifier` reçu par props.                                                                                                                                                             |
| 2     | `hooks/`    | `hooks/useNavigationOuvrages.ts`                                      | `modifier(id)` pousse la route `/ouvrages/:id/modifier`.                                                                                                                                                                |
| 3     | `app/`      | `app/(fonds)/ouvrages/[id]/modifier.tsx`                              | L'écran lit l'id de l'URL, choisit volet ou plein écran selon la largeur (`hooks/useModeOuvrage.ts`), demande l'ouvrage à `useOuvrage(id)` et compose `FormulaireOuvrage`.                                              |
| 4     | `features/` | `features/books/useOuvrage.ts`                                        | `useQuery` sur la clé `['ouvrages', 'detail', id]` ; en attendant le serveur, l'ouvrage déjà présent dans une liste en cache sert de valeur provisoire.                                                                 |
| 5     | `domain/`   | `domain/ouvrage.ts`                                                   | `ouvrageFormulaireSchema` valide la saisie : l'année tapée est une chaîne, le schéma la convertit en nombre et vérifie ses bornes. Les messages d'erreur naissent ici.                                                  |
| 6     | `features/` | `features/books/FormulaireOuvrage.tsx`                                | react-hook-form avec `zodResolver`, validation à la perte de focus ; « Enregistrer » se désactive et se relibelle pendant la soumission, ce qui empêche un double envoi.                                                |
| 7     | `features/` | `features/books/useEnregistrerOuvrage.ts`                             | `useRemplacerOuvrage(id)` : une `useMutation` dont la fonction appelle le service avec la saisie validée et la `version` connue de l'ouvrage.                                                                           |
| 8     | `services/` | `services/api/ouvrages.ts`                                            | `remplacerOuvrage` construit `PUT /books/:id` avec l'en-tête `If-Match: <version>` et un corps sans champ `couverture` nul.                                                                                             |
| 9     | `services/` | `services/api/client.ts`                                              | `requeter` ajoute les en-têtes JSON, laisse l'intercepteur préparer la requête (jeton au lot 4), borne l'attente à 10 s en combinant son `AbortController` au signal de l'appelant, puis envoie.                        |
| 10    | API         | `api-books-v2/`                                                       | Le serveur valide (422 avec `champs`), compare la version (409 avec la fiche serveur), écrit, incrémente `version`, répond 200 avec l'ouvrage.                                                                          |
| 11    | `services/` | `services/api/traduireErreurs.ts` puis `client.ts`                    | Une réponse non 2xx devient une erreur typée de `domain/erreurs.ts` ; une réponse 2xx traverse `ouvrageSchema`, sinon `ErreurReseau('reponse-invalide')`. Le transport (panne, délai) devient aussi une `ErreurReseau`. |
| 12    | `features/` | `features/books/useEnregistrerOuvrage.ts`                             | Succès : `propagerOuvrage` remplace l'ouvrage dans la fiche et dans chaque page de liste en cache, puis invalide les listes. Conflit 409 : la fiche serveur est propagée, l'erreur remonte au formulaire.               |
| 13    | `features/` | `features/books/erreursFormulaire.ts`, `features/erreurs/messages.ts` | Une 422 est répartie champ par champ (`setError`), un conflit affiche « Reprendre la version du serveur », une 503 ou un délai deviennent une alerte globale avec le bouton toujours disponible pour réessayer.         |
| 14    | `hooks/`    | `hooks/useNavigationOuvrages.ts`                                      | `afficherApresEnregistrement(id)` remplace la route par `/ouvrages/:id` : la fiche et la ligne de liste affichent déjà la nouvelle valeur, sans requête supplémentaire.                                                 |

Le même chemin, en plus court, pour la case « Lu » de la fiche : `FicheOuvrage` →
`useRetoucheOuvrage` (mise à jour immédiate de la fiche et des listes en cache, instantané
conservé) → `retoucherOuvrage` (`PATCH` avec `If-Match`) → `client.ts` → API → retour arrière
sur l'instantané si le serveur refuse, sinon propagation de la réponse.

Et pour la suppression : `FicheOuvrage` → question en place → `SuppressionProvider.programmer`
(la ligne s'estompe, quitte les listes en cache, un instantané est pris) → cinq secondes plus
tard `supprimerOuvrage` (`DELETE`) ; « Annuler » remet l'instantané et n'envoie rien.

## Les transversaux

- **Racine** ([app/\_layout.tsx](../app/_layout.tsx)) : `PreferencesProvider` (langue et thème,
  lus et écrits par `services/stockage.ts`, qui rend le `ThemeProvider` avec la préférence) →
  `QueryProvider` (un `QueryClient`, réglé dans `features/query/`) → `SessionProvider` (compte
  connecté, jetons, connexion et déconnexion) → `SuppressionProvider` (une suppression en
  attente à la fois, barre d'annulation, région `aria-live`) → la pile de navigation.
- **Session et jetons** : `services/api/intercepteurAuth.ts` est installé sur le client HTTP dès
  l'import de `features/auth/SessionProvider.tsx`, avant toute requête. Il injecte le jeton
  d'accès dans chaque requête (`preparer`), et sur un 401 `jeton_expire` il lance **un seul**
  rafraîchissement, partagé par toutes les requêtes en attente, puis rejoue chacune avec le
  nouveau jeton (`reprendre`). Un 401 sans jeton ou un rafraîchissement refusé marquent la
  session comme perdue : le groupe de routes `app/(fonds)/_layout.tsx` redirige alors vers
  `/connexion?vers=<écran demandé>`, et la connexion ramène à cet écran. Le jeton de
  rafraîchissement ne passe jamais par un état React : il vit dans une boîte du module et dans
  `services/stockageSecurise.ts`. Le rôle est lu par `useSession().peutEcrire` : un compte
  lecteur ne reçoit aucune action d'écriture, elles ne sont pas rendues.
- **Langue** : aucune chaîne visible dans `components/` ; chaque écran lit un dictionnaire typé
  (`features/i18n/fr.ts`, `en.ts`) par `useTraduction()`. Les schémas zod du domaine reçoivent
  leurs messages en paramètre (`creerOuvrageFormulaireSchema(t.validation)`), donc le domaine ne
  connaît aucune langue. Dates et nombres passent par `Intl` avec la locale du dictionnaire.
- **Capacités de plateforme** : choisir une image et la redimensionner tient dans une seule
  fonction de `services/plateforme/image.ts` ; l'écran ne sait pas si un navigateur ou un
  téléphone est derrière. Le stockage local suit la même règle dans `services/stockage.ts`.
- **Sources externes** : OpenLibrary a son propre client HTTP (`services/api/openLibrary.ts`,
  délai de 5 s), interrogé après un anti-rebond de 300 ms et gardé en cache pour la session ; son
  indisponibilité est un état de la ligne « Éditions », jamais une erreur de la fiche.
- **Deux dispositions, une seule logique** : au-dessus de 960 px, le fonds reste à gauche et la
  fiche, le formulaire ou la question s'ouvrent dans un volet à droite ; en dessous, chaque
  route occupe l'écran. Le choix est fait dans `app/(fonds)/_layout.tsx` et
  `hooks/useModeOuvrage.ts`, les écrans ne le connaissent que par la prop `mode`.
- **Erreurs** : cinq classes discriminées par `type` (`reseau`, `validation`, `conflit`,
  `auth`, `introuvable`). Les services les produisent, les features les traduisent en phrases,
  les composants ne voient que du texte et un rappel « Réessayer ».
- **Tests** ([\_\_tests\_\_/](../__tests__)) : domaine (schémas, règles), composants avec Testing
  Library, hooks de données avec `fetch` simulé et un `QueryClient` neuf par test, services avec
  un transport injecté. Le contexte de suppression se teste avec les faux timers de Jest.
- **Design** : les tokens vivent dans `theme/tokens.ts` ; aucune couleur ni chaîne visible en
  dur dans un composant, les libellés sont regroupés en tête de chaque écran. Le système visuel
  est décrit dans [DESIGN.md](../DESIGN.md).
