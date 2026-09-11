# ADR 001 — Gestion de l'état serveur

## Statut

Accepté — 11/09/2026. Appliqué depuis la première liste d'ouvrages (issue #4) et respecté par
la fiche, le formulaire et la suppression qui ont suivi.

## Contexte

L'application affiche un fonds de 500 ouvrages servi par `api-books-v2`, avec pagination,
recherche, filtres et tri **côté serveur** : le sujet interdit de refaire ces opérations dans le
client. La recette se déroule en mode dégradé (latence de 1,5 s avec gigue, 30 % de réponses 503),
ce qui révèle immédiatement une absence de délai d'expiration, une mise à jour optimiste sans
retour arrière, des réessais sans temporisation ou une double soumission.

Contraintes retenues :

- quatre états par écran de données (chargement, erreur avec réessai, vide, contenu), y compris
  le chargement de la page suivante et l'actualisation en arrière-plan ;
- une réponse 422 se traite champ par champ, une 503 se réessaie : les erreurs sont typées
  (`domain/erreurs.ts`) avant d'atteindre l'interface ;
- aucun `fetch` ni URL dans `app/` ou `components/` ; seul `services/` connaît l'API ;
- les réponses de l'API sont validées à l'exécution avec zod, pas seulement typées ;
- des fichiers de moins de 250 lignes, un projet mené seul en trois jours ;
- le lot 4 ajoutera une file de mutations hors ligne et un intercepteur d'authentification : la
  solution du lot 1 ne doit pas les rendre impossibles.

## Options envisagées

1. **`useState` + `useEffect` + `fetch` dans chaque écran.** Aucune dépendance, mais chaque
   écran réinvente le cache, l'annulation d'une requête périmée, le réessai et la
   déduplication. La liste et la fiche afficheraient deux copies du même ouvrage sans se
   prévenir. C'est précisément la classe de bugs que le mode chaos fait apparaître.
2. **Redux Toolkit + RTK Query.** Cache et invalidation solides, mais un store global, des slices
   et une cérémonie disproportionnés pour une équipe d'une personne et trois jours ; l'état
   serveur finirait mélangé à l'état d'interface.
3. **Zustand (ou Jotai) comme store maison de données serveur.** Léger pour l'état d'interface,
   mais il faudrait réécrire à la main la fraîcheur, l'invalidation, l'annulation et le retour
   arrière optimiste, sans garantie d'être meilleur qu'une bibliothèque spécialisée.
4. **TanStack Query.** Conçu pour l'état serveur : cache par clé, déduplication, « périmé mais
   affiché » puis revalidation, réessais avec temporisation exponentielle, annulation via
   `AbortSignal`, mises à jour optimistes avec instantané, requêtes infinies pour la pagination.
   Testable avec un `QueryClient` neuf par test. Même famille d'outils que SWR, avec en plus les
   mutations et les listes paginées prêtes à l'emploi.

## Décision

Nous retenons **TanStack Query v5** pour tout ce qui vient du serveur, et **rien d'autre** pour
cet état : pas de store global. L'état d'interface (rubrique active, texte de recherche, question
de confirmation ouverte) reste dans des `useState` locaux ; l'état de la suppression différée vit
dans un contexte React dédié (`SuppressionProvider`), car il n'est ni serveur ni local à un écran.

Règles d'application, toutes visibles dans le code :

- **Un seul client**, créé dans `features/query/creerQueryClient.ts` : `staleTime` de 30 s (une
  liste déjà vue s'affiche sans requête, puis se revalide en arrière-plan) ; réessai limité à
  deux tentatives et uniquement pour une `ErreurReseau` réessayable (hors ligne, délai, 503),
  jamais pour une 422, une 404, une 409 ou une réponse invalide ; la temporisation exponentielle
  par défaut de la bibliothèque (1 s, 2 s, plafonnée à 30 s) évite d'aggraver la panne. Les
  mutations ne sont **jamais** réessayées automatiquement : tant que la file de mutations du
  lot 4 n'existe pas, un `POST` rejoué pourrait créer un doublon.
- **Des clés hiérarchiques** dans `features/books/cles.ts` : la racine `ouvrages`, puis
  `liste` suivi de la requête complète, ou `detail` suivi de l'id. Invalider la branche `liste`
  touche toutes les listes, quelle que soit la recherche ou la rubrique ; la requête faisant
  partie de la clé, deux recherches ne partagent jamais un cache.
- **Pagination serveur** avec `useInfiniteQuery` (`useFonds`) : la page suivante se demande au
  serveur en fin de liste, `keepPreviousData` garde la liste visible pendant qu'un filtre change,
  le total vient de la réponse. Le client ne trie, ne filtre et ne pagine jamais.
- **Validation à l'exécution** dans `services/api/` : chaque réponse traverse un schéma zod ; une
  forme inattendue devient une `ErreurReseau` de cause `reponse-invalide`, non réessayable.
- **Erreurs typées** produites par `services/api/traduireErreurs.ts` (réseau, validation,
  conflit, auth, introuvable) et traduites en phrases pour l'écran par
  `features/erreurs/messages.ts` ; le formulaire répartit une 422 champ par champ.
- **Mises à jour du cache sans attendre le serveur** quand le geste est petit et réversible :
  basculer « lu » modifie la fiche et toutes les listes en cache, envoie un `PATCH` avec
  `If-Match`, et remet l'instantané si le serveur refuse (`useRetoucheOuvrage`). Le formulaire,
  lui, attend la réponse : une 422 ou une 409 doit être vue avant que la fiche change.
- **Suppression différée** : la ligne quitte les listes en cache tout de suite, le `DELETE` ne
  part qu'après cinq secondes, « Annuler » remet l'instantané sans requête. Le cache est ici
  l'outil, pas la règle : le délai appartient au produit, pas à la bibliothèque.
- **Propagation** après une écriture réussie : la réponse du serveur remplace l'ouvrage dans la
  fiche et dans chaque page de liste (`propagerOuvrage`), puis les listes sont invalidées pour se
  revalider en arrière-plan.

## Conséquences

Positives :

- les quatre états d'écran, l'annulation d'une requête à la fermeture d'un écran et la
  déduplication sont fournis, testés par la bibliothèque, et identiques d'un écran à l'autre ;
- la liste et la fiche partagent le même cache : ouvrir une fiche depuis la liste l'affiche
  immédiatement (`placeholderData` tiré des listes), puis la complète ;
- les hooks de données se testent avec un `fetch` simulé et un client neuf par test
  (`__tests__/features/useFonds.test.tsx`), sans store à monter ;
- l'intercepteur d'authentification du lot 4 se branche dans `services/api/client.ts`, sous
  TanStack Query, qui ne saura même pas qu'un jeton a été rafraîchi.

Négatives :

- la discipline des clés est à notre charge : une écriture qui oublie d'invalider ou de propager
  laisse une liste périmée jusqu'à la prochaine revalidation ;
- les mises à jour optimistes demandent un instantané et un retour arrière écrits à la main, et
  se raisonnent moins facilement qu'une simple attente ;
- TanStack Query n'est **pas** une file hors ligne : sans réseau, une mutation échoue et le
  libraire est prévenu. La file persistante et l'idempotence par identifiant client feront
  l'objet de l'ADR 002.

À revoir si :

- le lot 4 impose une file de mutations : l'ADR 002 décidera entre la persistance du client
  TanStack (`persistQueryClient`) et une file maison dans `services/`, seule capable de rejouer
  dans l'ordre et de conserver les identifiants de mutation ;
- une entité arrive avec des relations croisées (collections d'ouvrages) qui rendraient la
  propagation par clé trop fragile : une normalisation légère du cache serait alors à étudier.
