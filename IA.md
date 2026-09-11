# IA.md — Usage de l'assistant de génération de code

Auteur : Mohamed Lezhari Khorissi (projet mené seul). Assistant : Claude Code, utilisé pour
générer, refactorer, tester et documenter, chaque proposition étant relue et exécutée avant d'être
gardée. Fonctionnalité documentée ici : **la suppression d'un ouvrage avec confirmation en place et
annulation pendant cinq secondes** (`features/books/SuppressionProvider.tsx`,
`components/UndoBar.tsx`, `components/ConfirmInline.tsx`), choisie parce que c'est la partie la
plus délicate du lot 1 : deux minuteurs, un cache partagé entre la liste et la fiche, et un retour
arrière qui doit toujours remettre exactement ce qu'il a enlevé.

## Le prompt utilisé

> Implémente l'issue #7 : supprimer un ouvrage depuis sa fiche, avec confirmation, et possibilité
> d'annuler pendant cinq secondes. Contraintes : pas d'`Alert.alert` (inerte sur le web), la
> question se pose en place dans la fiche à la place des actions ; la ligne quitte la liste tout de
> suite et le `DELETE` ne part qu'à la fin des cinq secondes ; « Annuler » remet la ligne sans
> aucune requête ; si le serveur refuse, la ligne revient avec un message et un bouton Réessayer ;
> une seule suppression en attente à la fois. TanStack Query pour le cache (clés dans
> `features/books/cles.ts`), aucun `fetch` hors de `services/`, fichiers de moins de 250 lignes,
> zéro `any`, tests Jest avec faux timers pour les trois cas : envoi après le délai, annulation,
> refus du serveur.

## Trois défauts relevés dans le résultat

1. **Condition de concurrence sur l'instantané du cache.** La première version prenait la copie des
   listes en cache au moment de `programmer()`, mais ne retirait la ligne que 150 ms plus tard, à
   la fin du fondu. Une liste chargée entre les deux (cas réel : ouverture d'une fiche par son
   adresse sur mobile, la liste n'existe pas encore quand on supprime) se voyait retirer l'ouvrage
   sans jamais avoir été copiée ; après « Annuler », l'ouvrage ne revenait pas. Trouvé en mesurant
   le parcours mobile dans un Chrome sans interface : la ligne était absente du DOM après l'annulation.
2. **Fermeture périmée dans le minuteur d'envoi.** Le `setTimeout` de cinq secondes appelait
   `executer(nouvelle)` avec l'objet créé au départ, dont la copie du cache était encore vide ;
   en cas de 503, `restaurer(cible)` n'avait donc rien à remettre. Le minuteur capturait une valeur
   figée alors que l'état avait avancé entre-temps.
3. **Effet non nettoyé.** Les deux minuteurs n'étaient pas annulés au démontage du composant : un
   `DELETE` pouvait partir après la disparition de l'écran, et Jest signalait un processus qui ne
   se terminait pas à cause de minuteurs actifs.

Deux défauts secondaires, corrigés dans la même passe : la région `role="status" aria-live` était
posée sur la barre elle-même, montée déjà remplie, donc jamais annoncée par un lecteur d'écran (une
région vivante n'annonce que ce qui change) ; et `useRef(new Animated.Value(1)).current` lisait une
référence pendant le rendu, ce que la règle `react-hooks/refs` refuse.

## Corrections et justification

1. La copie et le retrait sont devenus une seule opération, `retirer(cible)`, exécutée au même
   instant : l'instantané couvre exactement les listes dont on enlève la ligne, y compris une liste
   arrivée pendant le fondu. Un test le fixe (« also puts back an ouvrage in a list that arrived
   during the fade ») : il pose la liste en cache **après** `programmer()` et vérifie qu'elle
   retrouve l'ouvrage après `annuler()`.
2. Le minuteur ne capture plus d'objet : il relit `attenteRef.current`, l'état à jour, et vérifie
   l'identifiant avant d'envoyer. La référence mutable est la seule source de vérité que les deux
   minuteurs consultent ; le `useState` ne sert qu'à faire réagir l'interface.
3. `useEffect(() => arreterMinuteries, [arreterMinuteries])` : au démontage, tout minuteur en cours
   est annulé. C'est cohérent avec le produit : une suppression non confirmée au moment où
   l'application se ferme n'est pas envoyée, et la ligne sera là au prochain lancement.
4. Une région vivante unique, visuellement cachée, montée en permanence dans le fournisseur, dont
   le texte change (« Titre » supprimé / conservé / n'a pas pu être supprimé) ; et
   `useState(() => new Animated.Value(1))` pour créer la valeur animée une seule fois sans lire de
   référence pendant le rendu.

Ce que ces défauts ont en commun : ils ne se voient ni à la compilation ni à l'oeil, seulement en
raisonnant sur **quand** chaque valeur est lue par rapport à **quand** elle est écrite. C'est le
travail que l'assistant ne fait pas à ma place.
