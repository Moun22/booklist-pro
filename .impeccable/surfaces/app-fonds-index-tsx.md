---
version: 1
slug: "app-fonds-index-tsx"
primary_target: "app/(fonds)/index.tsx"
related_targets: ["app/(fonds)/_layout.tsx","app/(fonds)/ouvrages/[id].tsx","features/books/FondsPane.tsx"]
---

# Surface : le fonds et la fiche (groupe de routes app/(fonds))

## Scope et mode

Operate. Écran principal de BookList Pro : la liste paginée des ouvrages, avec recherche, filtres, tri, état de synchronisation, et l'ouverture d'une fiche. Le groupe de routes `app/(fonds)` porte la liste (`index.tsx`), la fiche (`ouvrages/[id].tsx`) et le layout qui les dispose côte à côte dès 960 pixels ou en pile en dessous ; le panneau du fonds vit dans `features/books/FondsPane.tsx`. La coquille (bandeau fixe, thème, navigation) est décidée ici et héritée par le formulaire, la connexion et le tableau de bord.

## Audience, tâche, contraintes

- Libraire titulaire et saisonnier, au poste de caisse ou en réserve, PC et mobile à égalité.
- Tâche : retrouver un ouvrage en quelques secondes, lire son état (lu, coup de coeur, note), ouvrir sa fiche sans perdre la liste, basculer le statut de lecture, savoir en permanence si le poste est en ligne.
- Contraintes du sujet : quatre états (squelette, erreur avec réessai, vide contextualisé, succès), pagination serveur, indicateur de synchronisation permanent, rôle lecteur sans action d'écriture visible, zones tactiles 44 pt, clavier, aucune couleur ni chaîne en dur dans components/.
- Préférence confirmée : dense, sobre, jamais décoratif, barre de comparaison Linear et Notion.

## Direction contract

THESIS: Le fonds est une page de nouveautés de la presse professionnelle du livre : une liste typographique serrée où les filets d'un pixel font les lignes et les capitales espacées font les rubriques. Elle refuse la table d'administration à cartes, pastilles arrondies et bouton bleu, et refuse tout fond de carte.

OWN-WORLD: Page blanche #FFFFFF, encre #1C1C1C, gris #6F6F6F, filets #E3E3E0, surface secondaire #F4F4F2 pour le bandeau et la sélection ; un seul signal vert bouteille #1F5C3A pour l'action primaire, la rubrique active, le coup de coeur et l'état en ligne ; rouge #B3261E réservé au destructif et au conflit. Sombre : #141414, #EDEDEA, #A0A09B, filets #2C2C2A, surface #1E1E1D, signal #6FBF8E, rouge #F28B82. Une seule famille, la pile système ; échelle fixe 11 / 13 / 14 / 16 / 20 ; rubriques en capitales espacées de 0,08 em à 11 pour les onglets, l'état de synchronisation et les étiquettes de champ de la fiche ; chiffres tabulaires sur tout texte. Icônes Feather à 16, trait unique, dans des cases fixes de 16 en liste et de 20 en fiche. Rayons 2 au plus, ombres uniquement sur les surcouches. Bascule d'état (fond de ligne, soulignement de rubrique, bordure de la case à cocher) en 150 ms.

STORY: Le libraire tape trois lettres, la liste se réduit sans se re-rendre entière, il lit lu et coup de coeur en icônes dans la colonne d'état, ouvre une fiche à droite sans perdre sa place, bascule « lu » d'un geste et voit la liste suivre, et le coin supérieur droit lui dit toujours si le poste est en ligne, hors ligne, ou avec des modifications en attente.

FIRST VIEWPORT: Bandeau fixe de 48 sur surface secondaire : à gauche les rubriques FONDS · LUS · NON LUS · COUPS DE COEUR, soulignement vert d'un pixel sous l'active ; au centre la recherche, champ sans bordure avec une icône loupe, dont le filet est le filet inférieur du bandeau lui-même (un second filet à deux pixels ferait doublon) ; à droite l'action « Ajouter un ouvrage » en texte vert avec icône plus, puis l'état de synchronisation, point plein vert et capitales EN LIGNE. Filet. Ligne de compte de 28 en chiffres tabulaires gris : le total du fonds, puis lus et coups de coeur quand /stats sera consommé au lot 4. Liste : lignes de 56 à deux niveaux, colonne d'état de 40 à gauche avec deux emplacements fixes, coche « lu » puis coeur « coup de coeur » ; titre à 14 en graisse 600, dessous auteur · éditeur · année à 13 en gris ; à droite la note en chiffres tabulaires, tiret gris quand elle est absente. Filet entre les lignes, aucun fond. À 960 et plus, la fiche s'ouvre en colonne droite de 400 derrière un filet vertical : un en-tête de 56 avec « Fermer » à droite, dont le filet s'aligne sur celui de la première ligne de la liste ; puis le titre à 20, l'auteur à 16 en gris, et des lignes de champ sur filets : étiquette en capitales espacées sur 112, case d'icône fixe de 20, valeur à 14 ; la ligne « Lecture » est un interrupteur dont la case de 20 porte une coche en encre, jamais un aplat de signal. En dessous de 960, le bandeau passe sur deux rangées (recherche à texte court, « Ajouter », état de synchronisation, puis rubriques défilantes) parce que 390 pixels ne tiennent pas les quatre rubriques, la recherche et l'action sur une rangée, et la fiche prend l'écran avec un bandeau de 48 portant le retour « Fonds » et l'état de synchronisation. La touche Échap ferme le volet.

FORM: La page des nouveautés, candidat 3 de ma liste classée, verrouillé par l'utilisateur en main « safer » après deux relances ; seed key 5878f586 ; construction pilotée par le code.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Moment mémorable

La liste qui se filtre sous les doigts pendant la frappe, l'état en icônes lu au premier coup d'oeil, et la fiche qui s'ouvre à côté sans jamais faire perdre la liste.

## Non résolu

- Nombre de notes de lecture par ouvrage dans la liste : GET /books ne le fournit pas, et le charger fiche par fiche coûterait une requête par ligne. Décision reportée au lot 2 : ajouter un champ à l'API avec CHANGELOG et ADR, ou n'afficher ce compte que sur la fiche.
- Police auto-hébergée ou pile système : pile système retenue, à revoir si les chiffres tabulaires ou les capitales espacées rendent mal sur un poste donné.
- Présence du nom du réseau dans le bandeau.
- Stratégie d'affichage des couvertures dans la liste quand elles existeront (lot 3) : vignette de 24 dans la colonne d'état, ou aucune vignette en liste.
- Navigation de ligne en ligne au clavier avec la fiche ouverte (flèches), non câblée.
