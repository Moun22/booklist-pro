---
name: BookList Pro
description: La page des nouveautés — une liste typographique serrée où les filets d'un pixel font les lignes et les capitales espacées font les rubriques.
colors:
  page: "#FFFFFF"
  surface: "#F4F4F2"
  ink: "#1C1C1C"
  ink-secondary: "#6F6F6F"
  rule: "#E3E3E0"
  signal: "#1F5C3A"
  on-signal: "#FFFFFF"
  danger: "#B3261E"
  skeleton: "#ECECEA"
  page-dark: "#141414"
  surface-dark: "#1E1E1D"
  ink-dark: "#EDEDEA"
  ink-secondary-dark: "#A0A09B"
  rule-dark: "#2C2C2A"
  signal-dark: "#6FBF8E"
  on-signal-dark: "#141414"
  danger-dark: "#F28B82"
  skeleton-dark: "#242423"
typography:
  title:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "26px"
    fontFeature: "tabular-nums"
  lead:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "22px"
    fontFeature: "tabular-nums"
  body:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    fontFeature: "tabular-nums"
  body-strong:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
    fontFeature: "tabular-nums"
  small:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
    fontFeature: "tabular-nums"
  figure:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "18px"
    fontFeature: "tabular-nums"
  rubric:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.88px"
    fontFeature: "tabular-nums"
rounded:
  sm: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  chrome-band:
    backgroundColor: "{colors.surface}"
    height: "48px"
    padding: "0 8px"
  rubric-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.rubric}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
  rubric-tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    typography: "{typography.rubric}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
  button-text-ink:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
  button-text-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
  search-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "8px 0"
    height: "44px"
  tally-line:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.figure}"
    padding: "0 16px"
    height: "28px"
  book-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 16px"
    height: "56px"
  book-row-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 16px"
    height: "56px"
  book-row-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 16px"
    height: "56px"
  sync-mark:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    typography: "{typography.rubric}"
    padding: "0 12px"
  screen-header-ecran:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    padding: "0 8px"
    height: "48px"
  screen-header-volet:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    padding: "0 8px"
    height: "56px"
  field-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "8px 0"
    height: "44px"
  field-row-muted:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "8px 0"
    height: "44px"
  field-label:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.rubric}"
    width: "112px"
  toggle-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "8px 0"
    height: "44px"
  toggle-box:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    size: "20px"
  toggle-box-checked:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    size: "20px"
  state-message:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    padding: "32px 24px"
    width: "420px"
  skeleton:
    backgroundColor: "{colors.skeleton}"
    rounded: "{rounded.sm}"
---

# Design System: BookList Pro

## Overview

**Creative North Star: "La page des nouveautés"**

BookList Pro est mis en page comme la page des nouveautés d'un périodique professionnel du livre : une liste typographique serrée, lue au comptoir de caisse en plein jour, où les filets d'un pixel font les lignes et où les capitales espacées font les rubriques. La hiérarchie est portée par la graisse, la taille et le gris de l'encre, jamais par des fonds, des cartes ni des ombres. Chaque ligne d'ouvrage est un article de deux niveaux, titre en graisse puis auteur · éditeur · année en gris, avec sa note en chiffres tabulaires calée à droite comme une colonne de prix. La fiche d'un ouvrage prolonge la même page : un titre, l'auteur en gris, puis une liste de définitions sur filets où l'étiquette en capitales espacées précède la valeur.

La densité est celle d'un outil de métier : 56 px par ouvrage, bandeau de 48 px, ligne de compte de 28 px, lignes de champ de 44 px, tout aligné sur des filets. La couleur est retenue à l'extrême : une seule encre de signal, un vert bouteille, sert à la fois l'action primaire, la rubrique active, le coup de coeur et l'état « en ligne » ; le rouge n'existe que pour le destructif, l'erreur et le conflit. La scène par défaut est claire (la caisse en plein jour) ; le thème sombre suit la préférence système avec la même grammaire et une palette inversée, sans changer une seule règle.

Rejets confirmés par la direction et vérifiés dans le rendu : pas de table d'administration à cartes, pas de pastilles arrondies, pas de bouton bleu plein, aucun fond de carte, aucune icône décorative, aucun aplat de signal (la case à cocher cochée porte une coche en encre, jamais un fond vert).

**Key Characteristics:**
- Filets de 1 px (`hairline = 1`) comme seule structure visible : entre les lignes, sous le bandeau, sous la ligne de compte, sous chaque ligne de champ de la fiche, sous l'en-tête du volet, et vertical devant la fiche.
- Rubriques en capitales espacées de 11 px, soulignées d'un filet vert de 1 px quand elles sont actives ; les mêmes capitales, en gris, étiquettent les champs de la fiche.
- Chiffres tabulaires (`fontVariant: ['tabular-nums']`) sur tout texte, pas seulement sur les figures.
- Un seul signal coloré, vert bouteille, sur ≤ 5 % de l'écran ; le rouge réservé au danger et au conflit.
- Pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`) et échelle fixe 11 / 13 / 14 / 16 / 20.
- Icônes Feather à 16 px, trait unique, toujours dans une case fixe : 16 px dans la liste (`iconSize`), 20 px dans la fiche (`layout.iconCase`).
- Aucune ombre, aucun rayon supérieur à 2 px ; les bascules d'état durent 150 ms.

## Colors

Une palette d'imprimerie : blanc de page, encre noire, gris de légende, filets gris chaud, et un seul vert bouteille qui fait tout le travail de signal.

### Primary
- **Vert bouteille** (`signal`, #1F5C3A ; sombre #6FBF8E) : l'unique couleur de signal. Elle porte l'action primaire en texte (« Ajouter un ouvrage »), le libellé et le soulignement de la rubrique active, le coeur « coup de coeur » dans la colonne d'état de la liste et dans la case d'icône de la fiche, le point plein et les capitales EN LIGNE de la marque de synchronisation, l'anneau de focus (2 px, décalé de 2 px), le curseur de saisie et la sélection de texte à 22 %.
- **Sur signal** (`on-signal`, #FFFFFF ; sombre #141414) : réservé à un texte posé sur un aplat de signal. Aucun aplat de signal n'existe dans le rendu livré et le ton `onSignal` a été retiré de `theme/tone.ts` ; le jeton reste défini dans `theme/tokens.ts` et exposé en `--bl-onSignal`, sans aucun consommateur. Il n'est ni un ton ni une règle : un lot qui en aurait besoin le réintroduirait à partir de son rendu.

### Neutral
- **Page** (`page`, #FFFFFF ; sombre #141414) : fond de la liste et de la fiche, fond des lignes au repos, fond de l'en-tête du volet.
- **Surface** (`surface`, #F4F4F2 ; sombre #1E1E1D) : la seule surface secondaire. Bandeau de tête, bandeau de la fiche en écran (sous 960 px), fond de ligne au survol et à la sélection. Elle n'est jamais un fond de carte.
- **Encre** (`ink`, #1C1C1C ; sombre #EDEDEA) : titres d'ouvrage, notes présentes, saisie, texte de premier niveau, valeurs de champ de la fiche, coche et bordure de la case cochée, boutons « Fonds » et « Fermer » de la fiche, contour du point « en attente ».
- **Encre secondaire** (`ink-secondary`, #6F6F6F ; sombre #A0A09B) : auteur · éditeur · année, auteur en tête de fiche, étiquettes de champ, valeurs absentes (« Sans note », « Éditeur inconnu »), bordure de la case non cochée, ligne de compte, rubriques inactives, tiret de note absente, coche « lu » de la liste, icône de recherche, texte d'indication, contour du point « hors ligne ».
- **Filet** (`rule`, #E3E3E0 ; sombre #2C2C2A) : tous les filets de 1 px et la couleur de l'ascenseur.
- **Squelette** (`skeleton`, #ECECEA ; sombre #242423) : blocs de chargement uniquement.
- **Danger** (`danger`, #B3261E ; sombre #F28B82) : état d'erreur (icône et titre du message), bouton texte destructif, message en ligne « Modification annulée : … » sous les champs de la fiche, point plein et capitales de l'état de conflit. Jamais une couleur d'accent.

Les deux palettes sont exposées au navigateur en variables CSS `--bl-<nom>` (`--bl-page`, `--bl-surface`, `--bl-ink`, `--bl-inkSecondary`, `--bl-rule`, `--bl-signal`, `--bl-onSignal`, `--bl-danger`, `--bl-skeleton`) écrites sur `document.documentElement` par `ThemeProvider`, avec `color-scheme` aligné sur le schéma actif. `theme/global.css` est le seul consommateur : fond de `body`, sélection, anneau de focus, curseur de saisie, ascenseur.

### Named Rules
**La règle du signal unique.** Une seule couleur de signal, le vert bouteille, et une seule sémantique : ce qui est actif, recommandé, en ligne ou à faire. Si un nouvel élément a besoin d'une deuxième couleur d'accent, c'est la hiérarchie qui est fausse, pas la palette.

**La règle du rouge gardé.** Le rouge n'apparaît que pour une erreur, une destruction ou un conflit de synchronisation. Il n'est jamais un accent, une étoile, ni un compteur.

**La règle de la surface sans carte.** `surface` colore le bandeau et la ligne survolée ou sélectionnée. Elle ne délimite jamais un bloc de contenu ; les blocs sont délimités par des filets.

**La règle de la coche en encre.** Un état coché se lit par une coche en encre dans une case bordée d'encre ; jamais par un aplat de signal ni par un texte sur signal. Le vert dit « recommandé ou actif », pas « oui ».

## Typography

**Display Font:** aucune. Le plus grand corps du système est le titre à 20 px.
**Body Font:** pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`), choix délibéré et confirmé en mode Operate ; à revoir uniquement si les chiffres tabulaires ou les capitales espacées rendent mal sur un poste donné.
**Label/Mono Font:** aucune famille distincte ; les figures utilisent la même pile avec `tabular-nums`.

**Character :** une seule famille, une échelle fixe et courte (11 / 13 / 14 / 16 / 20), des interlignes entiers (16 / 18 / 20 / 22 / 26) et trois graisses (400, 500, 600). Le contraste vient de la graisse et du gris, pas de la taille. Le texte se lit comme une colonne de périodique, pas comme une interface.

### Hierarchy
- **Title** (600, 20 px / 26 px) : titre de la fiche d'ouvrage (première ligne sous l'en-tête). Non utilisé dans la liste.
- **Lead** (500, 16 px / 22 px) : titre d'un message d'état (« Aucun ouvrage ouvert », « Le fonds est vide »), centré, largeur maximale 420 px ; auteur en tête de fiche, en encre secondaire, 12 px sous le titre.
- **Body** (400, 14 px / 20 px) : saisie de recherche, texte courant, valeur d'une ligne de champ (encre ; encre secondaire quand la valeur est absente) et libellé de valeur d'un interrupteur (« Lu » / « Non lu »).
- **Body strong** (600, 14 px / 20 px) : titre d'ouvrage dans la liste (une ligne, tronquée), libellé de tout bouton texte, y compris « Fonds » et « Fermer » dans l'en-tête de la fiche.
- **Small** (400, 13 px / 18 px) : seconde ligne d'un ouvrage (auteur · éditeur · année) en encre secondaire, description d'un message d'état, message en ligne de retour arrière (« Modification annulée : … ») en danger.
- **Figure** (400, 13 px / 18 px, `tabular-nums`) : la note d'un ouvrage (« 4/5 », tiret « – » en encre secondaire quand elle est absente, calée à droite sur 32 px minimum) et la ligne de compte (« 500 ouvrages »). Même métrique que Small ; la variante existe pour nommer l'intention chiffrée. Dans la fiche, la note est une valeur de champ en Body (« 1/5 »), pas une Figure.
- **Rubric** (600, 11 px / 16 px, `letterSpacing 0.88` soit 0,08 em, capitales) : trois usages, et seulement trois. Les rubriques de navigation FONDS · LUS · NON LUS · COUPS DE COEUR ; le libellé de l'état de synchronisation (EN LIGNE) ; l'étiquette d'une ligne de champ de la fiche (ÉDITEUR, ANNÉE, NOTE, COUP DE COEUR, LECTURE), en encre secondaire, sur une colonne de 112 px, à côté de la valeur et jamais au-dessus d'un titre.

Les variantes sont exposées par `components/AppText.tsx` (`title | lead | body | bodyStrong | small | rubric | figure`) et les tons par `theme/tone.ts` (`ink | secondary | signal | danger`) ; aucune couleur ni taille n'est écrite hors de ces deux fichiers.

### Named Rules
**La règle des chiffres tabulaires.** Tout texte est composé en `tabular-nums`, pas seulement les notes : les colonnes de chiffres restent alignées où qu'elles apparaissent, sans variante à activer.

**La règle des capitales espacées.** Les capitales espacées à 11 px sont réservées à trois emplois : les rubriques de navigation, l'état de synchronisation et l'étiquette d'un champ dans une liste de définitions. Elles nomment une section, un état ou un champ, toujours à côté ou en ligne ; elles ne servent jamais de surtitre décoratif au-dessus d'un titre.

## Layout

L'écran est une colonne pleine largeur sur `page`, sans conteneur centré ni marge extérieure, structurée de haut en bas par des filets :

1. **Bandeau de tête** (`chromeHeight = 48`, `minHeight`) sur `surface`, rembourrage horizontal 8 px. À 960 px et plus (`twoPaneMin`), une seule rangée : rubriques à gauche, champ de recherche au centre (`flex: 1`, rembourrage 8 px), bouton texte « Ajouter un ouvrage » puis marque de synchronisation à droite. En dessous de 960 px, deux rangées de 48 px : recherche (« Titre ou auteur ») + « Ajouter » + synchronisation, puis les rubriques en défilement horizontal sans indicateur.
2. **Filet.**
3. **Ligne de compte** (`tallyHeight = 28`, `minHeight`), rembourrage horizontal 16 px, figures en encre secondaire séparées par « · ». Pendant le chargement initial, un squelette de 96 × 10 px la remplace.
4. **Filet.**
5. **Corps** en rangée : la liste (`flex: 1`) et, à 960 px et plus, un **filet vertical** puis la **colonne de fiche** de 400 px (`detailPane`). Sous 960 px la fiche prend l'écran entier.

**Deux volets ou une pile** (`app/(fonds)/_layout.tsx`) : à 960 px et plus, le groupe de routes rend `FondsPane` avec la fiche en `Slot` dans la colonne de droite ; en dessous, un `Stack` sans en-tête natif, fond `page`, où la fiche est un écran à part entière. L'adresse est la même dans les deux cas (`/ouvrages/:id`) ; seul `useWindowDimensions` décide de la disposition.

**Fiche d'ouvrage** (`features/books/FicheOuvrage.tsx`) : en-tête (voir Components › Navigation), puis un contenu défilant rembourré à 16 px avec un écart vertical de 8 px : titre en Title, auteur en Lead encre secondaire avec 12 px en dessous, puis les lignes de champ. Avec l'écart de 8 px du conteneur, deux lignes de champ de 44 px se suivent à un pas de 52 px.

**Ligne de champ** (`FieldRow`, `ToggleRow`) : rangée `minHeight 44` (`touchTarget`), rembourrage vertical 8 px, écart 12 px entre étiquette et valeur, filet inférieur de 1 px. Étiquette en Rubric encre secondaire sur une colonne fixe de 112 px (`layout.fieldLabel`). Zone de valeur `flex: 1` : une case d'icône fixe de 20 px (`layout.iconCase`, toujours présente, même vide, pour que les valeurs s'alignent) puis la valeur en Body, écart 8 px. Dans l'interrupteur, la case de 20 px est la case à cocher elle-même.

**Ligne d'ouvrage** (`rowHeight = 56`) : rembourrage horizontal 16 px, écart 12 px entre les trois zones. Colonne d'état de 40 px (`statusColumn`) contenant deux cases fixes de 16 px espacées de 4 px : la coche « lu » (encre secondaire) puis le coeur « coup de coeur » (signal) ; les cases restent en place même vides pour que les titres s'alignent. Zone de texte `flex: 1` avec 2 px entre titre et légende. Note à droite, 32 px minimum, alignée à droite. Filet inférieur de 1 px. La liste est virtualisée (`FlatList`, `getItemLayout` sur 56 px, 20 lignes initiales).

**Rythme d'espacement** (`space`) : 4 / 8 / 12 / 16 / 24 / 32. Les rembourrages horizontaux de contenu sont à 16, les écarts internes à 12 ou 8, les micro-écarts (icône-libellé, cases d'état) à 4, les messages d'état à 32 vertical / 24 horizontal. Toute cible interactive fait au moins 44 px (`touchTarget`) en hauteur, et en largeur pour les onglets.

**Points de rupture** : un seul, 960 px, décidé par `useWindowDimensions` et non par une requête média.

## Elevation & Depth

Le système est plat. Aucune ombre n'est définie dans `theme/tokens.ts`, aucun composant livré n'en porte. La profondeur est rendue par deux moyens seulement : le passage de `page` à `surface` (bandeau, ligne survolée ou sélectionnée) et les filets de 1 px. Le bandeau n'est pas « au-dessus » de la liste ; il est une bande de surface fermée par un filet. Le volet de fiche n'est pas non plus « au-dessus » de la liste : il est une colonne de `page` derrière un filet vertical, et son en-tête de 56 px porte un filet qui rejoint celui de la première ligne de la liste à la même ordonnée.

La direction prévoit des ombres « uniquement sur les surcouches » (menus, confirmations). Aucune surcouche n'existe dans le rendu livré ; aucun jeton d'ombre n'est donc enregistré ici. Il sera ajouté par le lot qui livre la première surcouche, à partir de son rendu.

### Named Rules
**La règle du plat.** Pas d'ombre, pas de dégradé, pas de bordure de plus d'un pixel. Un état se lit par un changement de fond (`page` → `surface`), de couleur d'encre ou de filet, en 150 ms.

**La règle des filets qui se rejoignent.** Quand deux zones se côtoient derrière un filet vertical, leurs filets horizontaux tombent à la même ordonnée : l'en-tête du volet fait la hauteur d'une ligne d'ouvrage (56 px) pour cette seule raison.

## Shapes

Formes carrées et filets droits. Le seul rayon du système est `radius.sm = 2`, appliqué aux blocs de squelette et à la case à cocher de 20 × 20 px de l'interrupteur (bordure 1 px, aucun fond dans les deux états). Deux formes rondes existent par calcul, pas par jeton : le point de synchronisation (8 px, `borderRadius: 4`) et le bloc de squelette de la colonne d'état (16 px, `borderRadius: height / 2`). Les boutons, onglets, champs et lignes n'ont aucun rayon et aucune bordure propre : le champ de recherche n'a pas de contour, son filet est le filet inférieur du bandeau. La case à cocher est la seule bordure fermée du système, et elle reste à 1 px.

Les icônes sont Feather (`@expo/vector-icons/Feather`), 16 px, trait unique de 2 px, dans une case fixe : 16 px dans la colonne d'état de la liste, 20 px (`layout.iconCase`) dans la zone de valeur de la fiche, où l'icône est centrée ; la seule exception de taille est l'icône d'un message d'état à 24 px. Elles sont décoratives (`aria-hidden`) sauf quand un libellé leur est fourni.

## Components

Grammaire commune : tout élément pressé passe à `opacity 0.7`, tout élément désactivé à `opacity 0.5`, tout changement de fond, de couleur de bordure ou d'opacité dure 150 ms en `ease-out` (`theme/transitions.ts`, web uniquement). Le focus clavier est l'anneau global : 2 px de signal, décalé de 2 px.

### Buttons
- **Shape :** rectangle sans rayon ni fond (0 px), hauteur minimale 44 px, rembourrage horizontal 12 px, écart icône-libellé 4 px.
- **Primary (`button-text`) :** texte en Body strong, ton signal, icône Feather 16 px optionnelle du même ton (« + Ajouter un ouvrage »). C'est l'action primaire du système : un texte vert, jamais un aplat.
- **Ink / Danger (`button-text-ink`, `button-text-danger`) :** même forme, ton encre pour une action neutre (« ‹ Fonds », « × Fermer » dans l'en-tête de la fiche), ton danger pour une action destructive.
- **Hover / Focus :** aucun changement de fond au survol ; pressé à 0,7 d'opacité ; focus par l'anneau global.
- **Disabled :** 0,5 d'opacité, `aria-disabled`.

Il n'existe ni bouton plein, ni bouton contour dans le rendu livré.

### Chips (SyncMark)
- **Style :** point de 8 px + libellé en Rubric, écart 8 px, rembourrage horizontal 12 px, `role="status"`, `aria-live="polite"`.
- **State :** en ligne = point plein signal et capitales signal ; hors ligne = point creux (bordure 1 px encre secondaire) et capitales encre secondaire ; en attente = point creux bordé d'encre et capitales encre ; conflit = point plein danger et capitales danger. Le plein contre le creux dit « connecté ou non » avant même la couleur.

### Cards / Containers
Il n'y a pas de carte. Le seul conteneur est la **ligne d'ouvrage** (`book-row`) :
- **Corner Style :** aucun rayon.
- **Background :** `page` au repos ; `surface` au survol et quand la ligne est sélectionnée (même valeur pour les deux états).
- **Shadow Strategy :** aucune (voir Elevation & Depth).
- **Border :** filet inférieur de 1 px en `rule`.
- **Internal Padding :** 16 px horizontal, hauteur fixe 56 px, écart 12 px entre colonne d'état, texte et note.
- **Content :** titre en Body strong encre, légende en Small encre secondaire, note en Figure (encre si présente, encre secondaire et « – » sinon). `role="button"`, `aria-selected`, libellé complet en `aria-label`.

### Inputs / Fields (SearchField)
- **Style :** aucun contour, aucun fond, aucun rayon ; icône loupe 16 px encre secondaire, écart 8 px, saisie en Body encre, hauteur minimale 44 px, rembourrage vertical 8 px ; texte indicatif en encre secondaire.
- **Focus :** anneau global 2 px signal ; curseur et sélection en signal.
- **Error / Disabled :** non livrés dans ce rendu.

### Inputs / Fields (ToggleRow)
Un interrupteur qui a la forme d'une ligne de champ : c'est la ligne entière qui se presse.
- **Style :** rangée `role="switch"`, `aria-checked`, `aria-label` = étiquette, hauteur minimale 44 px, rembourrage vertical 8 px, filet inférieur de 1 px ; étiquette en Rubric encre secondaire sur 112 px ; case de 20 × 20 px à rayon 2 px et bordure de 1 px, sans fond ; libellé de valeur en Body encre (« Lu » / « Non lu ») à 8 px de la case.
- **Off :** bordure encre secondaire, case vide.
- **On :** bordure encre et coche Feather de 16 px en encre. Jamais un aplat de signal.
- **Transition :** la couleur de la bordure bascule en 150 ms (`transitionEtat`) ; pressé à 0,7 d'opacité.
- **Busy :** `aria-busy` pendant la mutation optimiste ; la ligne ne change pas d'aspect. Si la modification est annulée par le serveur, un message en Small danger (« Modification annulée : … »), `role="alert"`, s'affiche 12 px sous la dernière ligne ; aucun fond, aucune icône.

### Navigation (RubricBar)
- **Style :** onglets `role="tab"` dans un `tablist`, 44 × 44 px minimum, rembourrage horizontal 12 px, libellé en Rubric, filet inférieur de 1 px.
- **Default :** libellé encre secondaire, filet transparent.
- **Active :** libellé signal, filet signal. C'est le seul soulignement du système.
- **Hover :** aucun ; pressé à 0,7.
- **Mobile :** sous 960 px, la barre devient un `ScrollView` horizontal sans indicateur, sur sa propre rangée de 48 px.

### Navigation (ScreenHeader)
L'en-tête d'une fiche a deux modes, décidés par la largeur, jamais par la plateforme.
- **Écran (`screen-header-ecran`, sous 960 px) :** bande de 48 px (`minHeight`) sur `surface`, rembourrage horizontal 8 px, comme le bandeau de tête. À gauche un bouton texte encre « ‹ Fonds » (icône `chevron-left`) qui ramène à la liste ; à droite la marque de synchronisation. Un filet suit la bande.
- **Volet (`screen-header-volet`, à 960 px et plus) :** rangée de 56 px (`rowHeight`), hauteur fixe, sur `page`, rembourrage horizontal 8 px, avec son propre filet inférieur pour qu'il rejoigne celui de la première ligne d'ouvrage. Un seul bouton texte encre « × Fermer » (icône `x`) calé à droite ; pas de marque de synchronisation, le bandeau de la liste la porte déjà. La touche Échap ferme le volet (`hooks/useEscape.ts`, web uniquement, actif seulement en mode volet).

### Field row (FieldRow)
La ligne d'une liste de définitions ; c'est le composant signature de la fiche.
- **Style :** rangée non pressable, hauteur minimale 44 px, rembourrage vertical 8 px, aucun rembourrage horizontal propre (les 16 px viennent du conteneur), écart 12 px, filet inférieur de 1 px en `rule`.
- **Étiquette :** Rubric encre secondaire, colonne fixe de 112 px (`layout.fieldLabel`), texte tel quel (« Éditeur », « Coup de coeur ») mis en capitales par la variante.
- **Case d'icône :** 20 px de large (`layout.iconCase`), centrée, toujours rendue même vide ; quand une icône est fournie (le coeur du coup de coeur), elle est en Feather 16 px ton signal.
- **Valeur :** Body encre, à 8 px de la case ; `muted` la passe en encre secondaire pour une valeur absente (« Sans note », « Éditeur inconnu »). Aucune valeur n'est mise en graisse.

### Tally line
Ligne de compte de 28 px sous le bandeau : figures en encre secondaire, séparées par « · » (`aria-hidden`), `role="summary"`, retour à la ligne autorisé. Elle dit combien d'ouvrages ou de résultats, et « actualisation » quand une page se recharge.

### State message
Un seul composant pour le vide, l'erreur et la fiche non ouverte : icône 24 px centrée (encre secondaire, ou danger pour une erreur), titre en Lead (`role="alert"` en erreur), description en Small encre secondaire, action optionnelle en bouton texte. Centré, largeur de texte 420 px maximum, rembourrage 32 / 24, écart 8 px. Aucun fond, aucune bordure. La fiche l'emploie en erreur (« Réessayer » avec icône `refresh-cw`) et quand l'adresse ne désigne aucun ouvrage.

### Skeleton
Blocs `skeleton` à rayon 2 px. La liste de chargement rejoue exactement la géométrie de la ligne (56 px, colonne d'état 40 px, rond de 16 px, barres de 45 % × 12 et 65 % × 10, note 32 × 10, filet), 8 lignes au premier chargement, 2 en pied de page pour la page suivante ; `role="progressbar"`, `aria-busy`. Le squelette de la fiche rejoue de même la fiche : une barre de titre 70 % × 16, une barre d'auteur 45 % × 12 avec 12 px en dessous, puis cinq lignes de champ de 44 px sur filet, chacune avec une barre d'étiquette de 64 × 10 dans la colonne de 112 px et une barre de valeur de 40 % × 10.

## Do's and Don'ts

### Do:
- **Do** structurer avec des filets de 1 px en `rule` et des fonds `page` / `surface` ; c'est toute la structure visible.
- **Do** réserver le vert bouteille au signal : action primaire en texte, rubrique active, coup de coeur, état en ligne, focus, curseur et sélection.
- **Do** composer tout texte en `tabular-nums` via `AppText` et prendre la couleur dans `theme/tone.ts` ; aucune couleur ni taille en dur dans `components/`.
- **Do** garder les icônes Feather à 16 px dans une case fixe (16 px en liste, 20 px en fiche), et n'agrandir à 24 px que l'icône d'un message d'état.
- **Do** donner 44 px minimum à toute cible interactive et un libellé, un rôle et un état à chaque élément pressable.
- **Do** faire durer toute bascule d'état 150 ms (`transitionEtat`) et signaler le pressé par `opacity 0.7`.
- **Do** décliner tout nouvel écran dans les deux palettes en lisant `useTheme().colors` ; les valeurs sombres sont dans `theme/tokens.ts`, pas dans les composants.
- **Do** présenter un détail d'ouvrage comme une liste de définitions sur filets (`FieldRow`, `ToggleRow`) : étiquette Rubric sur 112 px, case d'icône de 20 px, valeur en Body ; et aligner l'en-tête d'un volet sur la première ligne de la liste (56 px, filet propre).
- **Do** dire « oui » par une coche en encre dans une case bordée d'encre ; réserver le vert au coeur du coup de coeur.

### Don't:
- **Don't** poser un fond de carte, une ombre, un dégradé ou une bordure de plus d'un pixel autour d'un bloc de contenu.
- **Don't** introduire une deuxième couleur d'accent, ni un bouton plein bleu ou vert ; l'action primaire est un texte vert.
- **Don't** employer le rouge ailleurs que pour une erreur, une destruction ou un conflit.
- **Don't** arrondir au-delà de 2 px, sauf le point de 8 px et le rond de squelette qui sont des cercles.
- **Don't** ajouter un filet propre au champ de recherche du bandeau ; le filet du bandeau lui suffit.
- **Don't** utiliser les capitales espacées comme surtitre au-dessus d'un titre ; elles nomment une rubrique, un état de synchronisation ou l'étiquette d'un champ, toujours en ligne avec ce qu'elles nomment.
- **Don't** remplir la case à cocher d'un aplat de signal ni poser du texte en `on-signal` ; aucun aplat de signal n'existe dans le système.
- **Don't** écrire une couleur, une taille ou une chaîne visible en dur dans `components/` ou `features/`.
