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
  form-field:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 0 0 28px"
    height: "44px"
  form-field-invalid:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 0 0 28px"
    height: "44px"
  form-field-label:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.rubric}"
    width: "112px"
  form-field-label-invalid:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.rubric}"
    width: "112px"
  form-field-message:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.small}"
    padding: "4px 0 0 152px"
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
  book-row-sortante:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 16px"
    height: "56px"
  confirm-inline:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0"
  undo-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 8px 0 16px"
    height: "48px"
  undo-bar-danger:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 8px 0 16px"
    height: "48px"
---

# Design System: BookList Pro

## Overview

**Creative North Star: "La page des nouveautés"**

BookList Pro est mis en page comme la page des nouveautés d'un périodique professionnel du livre : une liste typographique serrée, lue au comptoir de caisse en plein jour, où les filets d'un pixel font les lignes et où les capitales espacées font les rubriques. La hiérarchie est portée par la graisse, la taille et le gris de l'encre, jamais par des fonds, des cartes ni des ombres. Chaque ligne d'ouvrage est un article de deux niveaux, titre en graisse puis auteur · éditeur · année en gris, avec sa note en chiffres tabulaires calée à droite comme une colonne de prix. La fiche d'un ouvrage prolonge la même page : un titre, l'auteur en gris, puis une liste de définitions sur filets où l'étiquette en capitales espacées précède la valeur. Le formulaire de création ou de modification prolonge la fiche à son tour : les mêmes lignes de champ sur filets, où la valeur est simplement devenue saisissable, et le texte tapé commence exactement là où la fiche pose ses valeurs.

La densité est celle d'un outil de métier : 56 px par ouvrage, bandeau de 48 px, ligne de compte de 28 px, lignes de champ de 44 px, tout aligné sur des filets. La couleur est retenue à l'extrême : une seule encre de signal, un vert bouteille, sert à la fois l'action primaire, la rubrique active, le coup de coeur et l'état « en ligne » ; le rouge n'existe que pour le destructif, l'erreur et le conflit. La scène par défaut est claire (la caisse en plein jour) ; le thème sombre suit la préférence système avec la même grammaire et une palette inversée, sans changer une seule règle.

Rejets confirmés par la direction et vérifiés dans le rendu : pas de table d'administration à cartes, pas de pastilles arrondies, pas de bouton bleu plein, aucun fond de carte, aucune icône décorative, aucun aplat de signal (la case à cocher cochée porte une coche en encre, jamais un fond vert), aucun champ de saisie à contour ou à fond.

**Key Characteristics:**
- Filets de 1 px (`hairline = 1`) comme seule structure visible : entre les lignes, sous le bandeau, sous la ligne de compte, sous chaque ligne de champ de la fiche et du formulaire, sous l'en-tête du volet, et vertical devant la fiche.
- Rubriques en capitales espacées de 11 px, soulignées d'un filet vert de 1 px quand elles sont actives ; les mêmes capitales, en gris, étiquettent les champs de la fiche et du formulaire.
- Chiffres tabulaires (`fontVariant: ['tabular-nums']`) sur tout texte, pas seulement sur les figures.
- Un seul signal coloré, vert bouteille, sur ≤ 5 % de l'écran ; le rouge réservé au danger, au conflit et au champ invalide.
- Pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`) et échelle fixe 11 / 13 / 14 / 16 / 20.
- Icônes Feather à 16 px, trait unique, toujours dans une case fixe : 16 px dans la liste (`iconSize`), 20 px dans la fiche (`layout.iconCase`).
- Aucune ombre, aucun rayon supérieur à 2 px ; les bascules d'état durent 150 ms.
- Un champ de saisie est une ligne de champ : aucun contour, son filet est son seul trait, et l'invalidité se lit par ce filet et son étiquette passés en rouge.
- Une action destructive se confirme en place et se rattrape dans le flux : la question remplace la rangée d'actions de la fiche, et l'annulation est une bande de chrome de 48 px en bas de la fenêtre dont le seul minuteur est une ligne de signal de 2 px qui se retire en cinq secondes.

## Colors

Une palette d'imprimerie : blanc de page, encre noire, gris de légende, filets gris chaud, et un seul vert bouteille qui fait tout le travail de signal.

### Primary
- **Vert bouteille** (`signal`, #1F5C3A ; sombre #6FBF8E) : l'unique couleur de signal. Elle porte l'action primaire en texte (« Ajouter un ouvrage », « Enregistrer » avec sa coche), le libellé et le soulignement de la rubrique active, le coeur « coup de coeur » dans la colonne d'état de la liste et dans la case d'icône de la fiche, le point plein et les capitales EN LIGNE de la marque de synchronisation, l'anneau de focus (2 px, décalé de 2 px), le curseur de saisie et la sélection de texte à 22 % (dans le champ de recherche comme dans les champs du formulaire, `selectionColor`). Depuis la suppression : le libellé « Annuler » de la barre d'annulation avec sa flèche `rotate-ccw`, et la ligne de 2 px qui, le long du bord haut de cette barre, est tout le minuteur.
- **Sur signal** (`on-signal`, #FFFFFF ; sombre #141414) : réservé à un texte posé sur un aplat de signal. Aucun aplat de signal n'existe dans le rendu livré et le ton `onSignal` a été retiré de `theme/tone.ts` ; le jeton reste défini dans `theme/tokens.ts` et exposé en `--bl-onSignal`, sans aucun consommateur. Il n'est ni un ton ni une règle : un lot qui en aurait besoin le réintroduirait à partir de son rendu.

### Neutral
- **Page** (`page`, #FFFFFF ; sombre #141414) : fond de la liste, de la fiche et du formulaire, fond des lignes au repos, fond de l'en-tête du volet.
- **Surface** (`surface`, #F4F4F2 ; sombre #1E1E1D) : la seule surface secondaire. Bandeau de tête, bandeau de la fiche et du formulaire en écran (sous 960 px), fond de ligne au survol et à la sélection, barre d'annulation en bas de la fenêtre. Elle n'est jamais un fond de carte ni un fond de champ.
- **Encre** (`ink`, #1C1C1C ; sombre #EDEDEA) : titres d'ouvrage, notes présentes, saisie (recherche et champs du formulaire), texte de premier niveau, valeurs de champ de la fiche, coche et bordure de la case cochée, boutons neutres « Fonds », « Fermer », « Modifier », « Annuler » et « Reprendre la version du serveur », « Garder » dans la question de suppression et « Fermer » dans la barre d'échec, texte de la barre d'annulation (« Titre » supprimé), contour du point « en attente ».
- **Encre secondaire** (`ink-secondary`, #6F6F6F ; sombre #A0A09B) : auteur · éditeur · année, auteur en tête de fiche, étiquettes de champ (fiche et formulaire), valeurs absentes (« Sans note », « Éditeur inconnu »), texte indicatif de tout champ de saisie (« Rechercher un titre ou un auteur », « Titre de l'ouvrage », « Prénom Nom », « Facultatif », « 1965 »), bordure de la case non cochée, ligne de compte, rubriques inactives, tiret de note absente, coche « lu » de la liste, icône de recherche, contour du point « hors ligne ».
- **Filet** (`rule`, #E3E3E0 ; sombre #2C2C2A) : tous les filets de 1 px, y compris le filet d'un champ de saisie valide, et la couleur de l'ascenseur.
- **Squelette** (`skeleton`, #ECECEA ; sombre #242423) : blocs de chargement uniquement.
- **Danger** (`danger`, #B3261E ; sombre #F28B82) : état d'erreur (icône et titre du message), bouton texte destructif (« Supprimer » sous la fiche, puis dans la question en ligne), texte et « Réessayer » de la barre d'échec de suppression, message en ligne « Modification annulée : … » sous les champs de la fiche, point plein et capitales de l'état de conflit ; dans le formulaire, le filet et l'étiquette d'un champ invalide, le message sous ce champ et la ligne d'alerte globale. Jamais une couleur d'accent.

Les deux palettes sont exposées au navigateur en variables CSS `--bl-<nom>` (`--bl-page`, `--bl-surface`, `--bl-ink`, `--bl-inkSecondary`, `--bl-rule`, `--bl-signal`, `--bl-onSignal`, `--bl-danger`, `--bl-skeleton`) écrites sur `document.documentElement` par `ThemeProvider`, avec `color-scheme` aligné sur le schéma actif. `theme/global.css` est le seul consommateur : fond de `body`, sélection, anneau de focus, curseur de saisie, ascenseur.

### Named Rules
**La règle du signal unique.** Une seule couleur de signal, le vert bouteille, et une seule sémantique : ce qui est actif, recommandé, en ligne ou à faire. Si un nouvel élément a besoin d'une deuxième couleur d'accent, c'est la hiérarchie qui est fausse, pas la palette.

**La règle du rouge gardé.** Le rouge n'apparaît que pour une erreur, une destruction ou un conflit de synchronisation. Il n'est jamais un accent, une étoile, ni un compteur. Le champ invalide est une erreur : son filet, son étiquette et son message passent en rouge, rien d'autre. La suppression est une destruction : seul le bouton « Supprimer » est rouge ; la question qui le précède et la barre d'annulation qui le suit restent en encre, et seule la barre d'échec, qui est une erreur, passe en rouge.

**La règle de la surface sans carte.** `surface` colore le bandeau et la ligne survolée ou sélectionnée. Elle ne délimite jamais un bloc de contenu ni un champ ; les blocs sont délimités par des filets.

**La règle de la coche en encre.** Un état coché se lit par une coche en encre dans une case bordée d'encre ; jamais par un aplat de signal ni par un texte sur signal. Le vert dit « recommandé ou actif », pas « oui ».

## Typography

**Display Font:** aucune. Le plus grand corps du système est le titre à 20 px.
**Body Font:** pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`), choix délibéré et confirmé en mode Operate ; à revoir uniquement si les chiffres tabulaires ou les capitales espacées rendent mal sur un poste donné.
**Label/Mono Font:** aucune famille distincte ; les figures utilisent la même pile avec `tabular-nums`.

**Character :** une seule famille, une échelle fixe et courte (11 / 13 / 14 / 16 / 20), des interlignes entiers (16 / 18 / 20 / 22 / 26) et trois graisses (400, 500, 600). Le contraste vient de la graisse et du gris, pas de la taille. Le texte se lit comme une colonne de périodique, pas comme une interface.

### Hierarchy
- **Title** (600, 20 px / 26 px) : titre de la fiche d'ouvrage (première ligne sous l'en-tête) et titre d'écran du formulaire (« Nouvel ouvrage », « Modifier l'ouvrage »), avec 16 px en dessous avant la première ligne de champ. Non utilisé dans la liste.
- **Lead** (500, 16 px / 22 px) : titre d'un message d'état (« Aucun ouvrage ouvert », « Le fonds est vide »), centré, largeur maximale 420 px ; auteur en tête de fiche, en encre secondaire, 12 px sous le titre.
- **Body** (400, 14 px / 20 px) : saisie de recherche, saisie d'un champ de formulaire et son texte indicatif, texte courant, valeur d'une ligne de champ (encre ; encre secondaire quand la valeur est absente), libellé de valeur d'un interrupteur (« Lu » / « Non lu »), question de confirmation (« Supprimer cet ouvrage du fonds ? ») et texte de la barre d'annulation (« Titre » supprimé, en encre ; « Titre » n'a pas pu être supprimé, en danger).
- **Body strong** (600, 14 px / 20 px) : titre d'ouvrage dans la liste (une ligne, tronquée), libellé de tout bouton texte, y compris « Fonds » et « Fermer » dans l'en-tête, « Supprimer » et « Modifier » sous la fiche, « Garder » et « Supprimer » dans la question, « Annuler » et « Enregistrer » sous le formulaire, « Annuler », « Réessayer » et « Fermer » dans la barre d'annulation.
- **Small** (400, 13 px / 18 px) : seconde ligne d'un ouvrage (auteur · éditeur · année) en encre secondaire, description d'un message d'état, message en ligne de retour arrière (« Modification annulée : … ») en danger, message d'un champ invalide et alerte globale du formulaire en danger.
- **Figure** (400, 13 px / 18 px, `tabular-nums`) : la note d'un ouvrage (« 4/5 », tiret « – » en encre secondaire quand elle est absente, calée à droite sur 32 px minimum) et la ligne de compte (« 500 ouvrages »). Même métrique que Small ; la variante existe pour nommer l'intention chiffrée. Dans la fiche, la note est une valeur de champ en Body (« 1/5 »), pas une Figure.
- **Rubric** (600, 11 px / 16 px, `letterSpacing 0.88` soit 0,08 em, capitales) : trois usages, et seulement trois. Les rubriques de navigation FONDS · LUS · NON LUS · COUPS DE COEUR ; le libellé de l'état de synchronisation (EN LIGNE) ; l'étiquette d'une ligne de champ, dans la fiche (ÉDITEUR, ANNÉE, NOTE, COUP DE COEUR, LECTURE) comme dans le formulaire (TITRE, AUTEUR, ÉDITEUR, ANNÉE, LECTURE), en encre secondaire (danger si le champ est invalide), sur une colonne de 112 px, à côté de la valeur et jamais au-dessus d'un titre.

Les variantes sont exposées par `components/AppText.tsx` (`title | lead | body | bodyStrong | small | rubric | figure`) et les tons par `theme/tone.ts` (`ink | secondary | signal | danger`). La seule autre lecture des tailles est celle des deux `TextInput` (`SearchField`, `FormField`), qui ne peuvent pas passer par `AppText` et composent leur style de Body à partir de `fontFamily`, `fontSize.body` et `lineHeight.body` de `theme/tokens.ts` ; aucune couleur ni taille n'est écrite en dur hors de ces fichiers.

### Named Rules
**La règle des chiffres tabulaires.** Tout texte est composé en `tabular-nums`, pas seulement les notes : les colonnes de chiffres restent alignées où qu'elles apparaissent, sans variante à activer. Le texte tapé dans un champ y compris.

**La règle des capitales espacées.** Les capitales espacées à 11 px sont réservées à trois emplois : les rubriques de navigation, l'état de synchronisation et l'étiquette d'un champ dans une liste de définitions, lue ou saisie. Elles nomment une section, un état ou un champ, toujours à côté ou en ligne ; elles ne servent jamais de surtitre décoratif au-dessus d'un titre.

**La règle des guillemets.** Un ouvrage est cité entre guillemets français à espaces insécables, puis vient le verbe : « Titre » supprimé, « Titre » conservé, « Titre » n'a pas pu être supprimé. Trois annonces, pas une de plus, et la même phrase pour l'oeil et pour le lecteur d'écran. Dans la barre d'annulation, le titre est dans son propre bloc de texte et cède seul quand la place manque (une ligne, tronquée au milieu) ; le guillemet fermant et le verbe ne rétrécissent jamais.

## Layout

L'écran est une colonne pleine largeur sur `page`, sans conteneur centré ni marge extérieure, structurée de haut en bas par des filets :

1. **Bandeau de tête** (`chromeHeight = 48`, `minHeight`) sur `surface`, rembourrage horizontal 8 px. À 960 px et plus (`twoPaneMin`), une seule rangée : rubriques à gauche, champ de recherche au centre (`flex: 1`, rembourrage 8 px), bouton texte « Ajouter un ouvrage » puis marque de synchronisation à droite. En dessous de 960 px, deux rangées de 48 px : recherche (« Titre ou auteur ») + « Ajouter » + synchronisation, puis les rubriques en défilement horizontal sans indicateur.
2. **Filet.**
3. **Ligne de compte** (`tallyHeight = 28`, `minHeight`), rembourrage horizontal 16 px, figures en encre secondaire séparées par « · ». Pendant le chargement initial, un squelette de 96 × 10 px la remplace.
4. **Filet.**
5. **Corps** en rangée : la liste (`flex: 1`) et, à 960 px et plus, un **filet vertical** puis la **colonne de fiche** de 400 px (`detailPane`). Sous 960 px la fiche prend l'écran entier.

**Deux volets ou une pile** (`app/(fonds)/_layout.tsx`) : à 960 px et plus, le groupe de routes rend `FondsPane` avec la fiche en `Slot` dans la colonne de droite ; en dessous, un `Stack` sans en-tête natif, fond `page`, où la fiche est un écran à part entière. La colonne de droite reçoit indifféremment la fiche (`/ouvrages/:id`), la création (`/ouvrages/nouveau`) et la modification (`/ouvrages/:id/modifier`) ; seul `useWindowDimensions` décide de la disposition (`hooks/useModeOuvrage.ts`).

**Cadre d'ouvrage** (`features/books/CadreOuvrage.tsx`) : la fiche et les deux écrans de formulaire partagent le même cadre, une colonne `flex: 1` sur `page` ouverte par le `ScreenHeader` en mode `ecran` ou `volet` (voir Components › Navigation) ; en écran, la marque de synchronisation est dans l'en-tête et un filet le suit. La touche Échap ferme le volet sur les trois écrans.

**Fiche d'ouvrage** (`features/books/FicheOuvrage.tsx`) : en-tête, puis un contenu défilant rembourré à 16 px avec un écart vertical de 8 px : titre en Title, auteur en Lead encre secondaire avec 12 px en dessous, puis les lignes de champ. Avec l'écart de 8 px du conteneur, deux lignes de champ de 44 px se suivent à un pas de 52 px. Sous la dernière ligne (« Lecture »), une rangée d'actions calée à droite, 16 px au-dessus, écart 8 px, porte « Supprimer » (icône `trash-2`, danger) puis « Modifier » (icône `edit-2`, encre). Quand on presse « Supprimer », la question « Supprimer cet ouvrage du fonds ? » remplace la rangée à la même place, sous la même marge de 16 px : la question en Body sur sa propre ligne, puis 4 px dessous une rangée calée à droite, « Garder » (encre) et « Supprimer » (danger, `trash-2`), écart 8 px. Rien ne s'ouvre, rien ne se superpose ; la fiche s'allonge de la hauteur de la question, et « Garder » rend la rangée d'actions telle qu'elle était.

**Formulaire d'ouvrage** (`features/books/FormulaireOuvrage.tsx`, routes `nouveau.tsx` et `[id]/modifier.tsx`) : même cadre, même contenu défilant rembourré à 16 px. Titre d'écran en Title avec 16 px en dessous, puis le formulaire en colonne à écart 8 px : quatre lignes de saisie (Titre, Auteur, Éditeur, Année) et l'interrupteur « Lecture », toutes de 44 px, au même pas de 52 px que la fiche. La ligne de saisie est de hauteur fixe 44 px (le filet est compris dedans), étiquette de 112 px, écart 12 px, puis la zone de saisie `flex: 1` dont le retrait gauche de 28 px (case d'icône 20 + écart 8) fait commencer le texte tapé à 152 px du bord du contenu, exactement sur la colonne des valeurs de la fiche. Le message d'un champ invalide se pose 4 px sous la ligne, retiré de 152 px pour tomber sur la même colonne. L'alerte globale a 12 px au-dessus ; le bouton de reprise après conflit est sur sa propre ligne, calé au bord du contenu par une marge négative de 12 px qui annule son rembourrage. La rangée d'actions vient 16 px sous la dernière ligne, calée à droite, écart 8 px entre « Annuler » et « Enregistrer ».

**Barre d'annulation** (`components/UndoBar.tsx`, rendue par `features/books/SuppressionProvider.tsx` depuis `app/_layout.tsx`, sous tout le contenu) : une bande de 48 px (`chromeHeight`, `minHeight`) sur `surface` en bas de la fenêtre, fermée en haut par un filet, rembourrage 16 px à gauche et 8 px à droite, écart 8 px. Elle est dans le flux, pas au-dessus : la colonne de contenu (liste et volet) fait `flex: 1` et se raccourcit de 48 px pendant que la barre est là. À gauche le texte en Body sur `flex: 1` ; à droite le bouton texte de rattrapage, et, dans la variante d'échec, « Fermer » avant lui. Une seule suppression est en attente à la fois (`SuppressionProvider`), donc une seule barre ; une deuxième demande envoie la première sans attendre.

**Ligne de champ** (`FieldRow`, `ToggleRow`) : rangée `minHeight 44` (`touchTarget`), rembourrage vertical 8 px, écart 12 px entre étiquette et valeur, filet inférieur de 1 px. Étiquette en Rubric encre secondaire sur une colonne fixe de 112 px (`layout.fieldLabel`). Zone de valeur `flex: 1` : une case d'icône fixe de 20 px (`layout.iconCase`, toujours présente, même vide, pour que les valeurs s'alignent) puis la valeur en Body, écart 8 px. Dans l'interrupteur, la case de 20 px est la case à cocher elle-même. Dans la ligne de saisie (`FormField`), la case n'existe pas comme élément : sa largeur et son écart deviennent le retrait gauche de 28 px du champ.

**Ligne d'ouvrage** (`rowHeight = 56`) : rembourrage horizontal 16 px, écart 12 px entre les trois zones. Colonne d'état de 40 px (`statusColumn`) contenant deux cases fixes de 16 px espacées de 4 px : la coche « lu » (encre secondaire) puis le coeur « coup de coeur » (signal) ; les cases restent en place même vides pour que les titres s'alignent. Zone de texte `flex: 1` avec 2 px entre titre et légende. Note à droite, 32 px minimum, alignée à droite. Filet inférieur de 1 px. La liste est virtualisée (`FlatList`, `getItemLayout` sur 56 px, 20 lignes initiales).

**Rythme d'espacement** (`space`) : 4 / 8 / 12 / 16 / 24 / 32. Les rembourrages horizontaux de contenu sont à 16, les écarts internes à 12 ou 8, les micro-écarts (icône-libellé, cases d'état, message sous un champ) à 4, les messages d'état à 32 vertical / 24 horizontal. Toute cible interactive fait au moins 44 px (`touchTarget`) en hauteur, et en largeur pour les onglets.

**Points de rupture** : un seul, 960 px, décidé par `useWindowDimensions` et non par une requête média.

## Elevation & Depth

Le système est plat. Aucune ombre n'est définie dans `theme/tokens.ts`, aucun composant livré n'en porte. La profondeur est rendue par deux moyens seulement : le passage de `page` à `surface` (bandeau, ligne survolée ou sélectionnée) et les filets de 1 px. Le bandeau n'est pas « au-dessus » de la liste ; il est une bande de surface fermée par un filet. Le volet de fiche n'est pas non plus « au-dessus » de la liste : il est une colonne de `page` derrière un filet vertical, et son en-tête de 56 px porte un filet qui rejoint celui de la première ligne de la liste à la même ordonnée. Le formulaire occupe la même colonne avec le même en-tête ; il n'est ni une boîte de dialogue ni une surcouche.

La direction prévoit des ombres « uniquement sur les surcouches » (menus, confirmations). Aucune surcouche n'existe dans le rendu livré : la confirmation de suppression se pose en ligne dans la fiche, et la barre d'annulation est une bande de chrome dans le flux, pas une carte flottante. Aucun jeton d'ombre n'est donc enregistré ici. Il sera ajouté par le lot qui livre la première surcouche, à partir de son rendu.

### Named Rules
**La règle du plat.** Pas d'ombre, pas de dégradé, pas de bordure de plus d'un pixel. Un état se lit par un changement de fond (`page` → `surface`), de couleur d'encre ou de filet, en 150 ms.

**La règle des filets qui se rejoignent.** Quand deux zones se côtoient derrière un filet vertical, leurs filets horizontaux tombent à la même ordonnée : l'en-tête du volet fait la hauteur d'une ligne d'ouvrage (56 px) pour cette seule raison.

## Shapes

Formes carrées et filets droits. Le seul rayon du système est `radius.sm = 2`, appliqué aux blocs de squelette et à la case à cocher de 20 × 20 px de l'interrupteur (bordure 1 px, aucun fond dans les deux états). Deux formes rondes existent par calcul, pas par jeton : le point de synchronisation (8 px, `borderRadius: 4`) et le bloc de squelette de la colonne d'état (16 px, `borderRadius: height / 2`). Les boutons, onglets, champs et lignes n'ont aucun rayon et aucune bordure propre : le champ de recherche n'a pas de contour, son filet est le filet inférieur du bandeau ; un champ du formulaire n'a pas de contour non plus, son filet est le filet inférieur de sa ligne, le même que celui d'une ligne de la fiche. La case à cocher est la seule bordure fermée du système, et elle reste à 1 px.

Les icônes sont Feather (`@expo/vector-icons/Feather`), 16 px, trait unique de 2 px, dans une case fixe : 16 px dans la colonne d'état de la liste, 20 px (`layout.iconCase`) dans la zone de valeur de la fiche, où l'icône est centrée ; la seule exception de taille est l'icône d'un message d'état à 24 px. Elles sont décoratives (`aria-hidden`) sauf quand un libellé leur est fourni. Les boutons texte du formulaire et de la fiche en portent une à gauche du libellé (`check` pour « Enregistrer », `edit-2` pour « Modifier », `trash-2` pour « Supprimer », dans la rangée comme dans la question, `refresh-cw` pour la reprise du serveur et pour « Réessayer », `rotate-ccw` pour « Annuler » dans la barre d'annulation) ; « Annuler » sous le formulaire, « Garder » et « Fermer » n'en portent pas. La ligne de progression de la barre d'annulation est un trait de 2 px de signal posé sous le filet, à l'intérieur de la barre, sans rayon ; ce n'est pas une bordure, et elle se retire par `scaleX` ancré à gauche.

## Components

Grammaire commune : tout élément pressé passe à `opacity 0.7`, tout élément désactivé à `opacity 0.5`, tout changement de fond, de couleur de bordure ou d'opacité dure 150 ms en `ease-out` (`theme/transitions.ts`, web uniquement). Le focus clavier est l'anneau global : 2 px de signal, décalé de 2 px.

### Buttons
- **Shape :** rectangle sans rayon ni fond (0 px), hauteur minimale 44 px, rembourrage horizontal 12 px, écart icône-libellé 4 px.
- **Primary (`button-text`) :** texte en Body strong, ton signal, icône Feather 16 px optionnelle du même ton (« + Ajouter un ouvrage », « ✓ Enregistrer »). C'est l'action primaire du système : un texte vert, jamais un aplat.
- **Ink / Danger (`button-text-ink`, `button-text-danger`) :** même forme, ton encre pour une action neutre (« ‹ Fonds », « × Fermer » dans l'en-tête, « Modifier » sous la fiche, « Annuler » et « Reprendre la version du serveur » sous le formulaire), ton danger pour une action destructive.
- **Hover / Focus :** aucun changement de fond au survol ; pressé à 0,7 d'opacité ; focus par l'anneau global.
- **Disabled :** 0,5 d'opacité, `aria-disabled`. Pendant une soumission, le bouton primaire est désactivé et son libellé devient un libellé de progression (« Enregistrement… ») ; aucun indicateur d'attente distinct.
- **Focus à l'arrivée :** `autoFocus` (référence + effet appelant `focus()`) porte le focus sur le bouton dès son montage. Il sert à l'action de refuge, jamais à l'action destructive : « Garder » quand la question apparaît, « Annuler » quand la barre d'annulation apparaît, et « Supprimer » quand la rangée d'actions revient après « Garder », pour rendre le focus au bouton qui a posé la question.

Il n'existe ni bouton plein, ni bouton contour dans le rendu livré.

**Rangée d'actions.** Sous une fiche ou un formulaire, les actions se présentent en rangée calée à droite, 16 px sous la dernière ligne de champ, écart 8 px, sans filet ni fond : l'action neutre en encre à gauche (« Annuler »), l'action primaire en signal avec sa coche à droite (« Enregistrer ») ; sous la fiche, la destructive en danger à gauche (« Supprimer », `trash-2`) et la neutre en encre à droite (« Modifier », `edit-2`) : l'action la plus à droite est toujours celle qui ne détruit rien. Une action de récupération (« Reprendre la version du serveur ») ne se mêle pas à cette rangée : elle prend sa propre ligne, alignée au bord du contenu par une marge négative de 12 px.

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
- **Sortante (`book-row-sortante`) :** la ligne dont la suppression vient d'être demandée passe à `opacity 0` par `transitionEtat` (150 ms), sans changer de hauteur ; puis les listes en cache la retirent (`useFonds` la masque même dans une page rechargée entre-temps) et la ligne de compte baisse d'un. Elle disparaît avant que la barre ne propose de la ravoir.

### Inputs / Fields (SearchField)
- **Style :** aucun contour, aucun fond, aucun rayon ; icône loupe 16 px encre secondaire, écart 8 px, saisie en Body encre, hauteur minimale 44 px, rembourrage vertical 8 px ; texte indicatif en encre secondaire.
- **Focus :** anneau global 2 px signal ; curseur et sélection en signal.
- **Error / Disabled :** non livrés dans ce rendu.

### Inputs / Fields (FormField)
La ligne de saisie du formulaire (`components/FormField.tsx`) : une ligne de champ de la fiche dont la valeur se tape.
- **Style :** rangée non pressable de hauteur fixe 44 px, filet inférieur de 1 px compris dans cette hauteur, écart 12 px ; étiquette en Rubric encre secondaire centrée verticalement sur 112 px (`layout.fieldLabel`), `aria-label` du champ ; `TextInput` étiré sur toute la hauteur de la ligne, sans rembourrage vertical, retrait gauche de 28 px (`layout.iconCase + space.sm`) pour que le texte tapé commence sur la colonne des valeurs de la fiche ; saisie en Body encre (`fontFamily`, `fontSize.body`, `lineHeight.body`, `tabular-nums`), aucun contour, aucun fond, aucun rayon, `autoCorrect` désactivé.
- **Texte indicatif :** en encre secondaire, toujours présent ; il donne la forme attendue (« Titre de l'ouvrage », « Prénom Nom », « 1965 ») et c'est lui qui nomme le champ facultatif (« Facultatif ») : aucune mention « (optionnel) » dans l'étiquette, aucune astérisque sur les champs requis.
- **Focus :** anneau global 2 px signal ; curseur et sélection en signal (`selectionColor`).
- **Error :** quand un message est fourni, le filet passe de `rule` à `danger` et l'étiquette de l'encre secondaire à `danger`, en 150 ms (`transitionEtat`) ; un message en Small danger, `role="alert"`, apparaît 4 px sous la ligne, retiré de 152 px pour tomber sur la colonne des valeurs. Le texte tapé reste en encre ; aucune icône, aucun fond, aucun contour. Validation à la perte de focus (`mode: 'onBlur'`), et les erreurs du serveur sont réparties sur les champs concernés par le même mécanisme.
- **Disabled :** non livré dans ce rendu.

### Inputs / Fields (ToggleRow)
Un interrupteur qui a la forme d'une ligne de champ : c'est la ligne entière qui se presse.
- **Style :** rangée `role="switch"`, `aria-checked`, `aria-label` = étiquette, hauteur minimale 44 px, rembourrage vertical 8 px, filet inférieur de 1 px ; étiquette en Rubric encre secondaire sur 112 px ; case de 20 × 20 px à rayon 2 px et bordure de 1 px, sans fond ; libellé de valeur en Body encre (« Lu » / « Non lu ») à 8 px de la case.
- **Off :** bordure encre secondaire, case vide.
- **On :** bordure encre et coche Feather de 16 px en encre. Jamais un aplat de signal.
- **Transition :** la couleur de la bordure bascule en 150 ms (`transitionEtat`) ; pressé à 0,7 d'opacité.
- **Busy :** `aria-busy` pendant la mutation optimiste ; la ligne ne change pas d'aspect. Si la modification est annulée par le serveur, un message en Small danger (« Modification annulée : … »), `role="alert"`, s'affiche 12 px sous la dernière ligne ; aucun fond, aucune icône. Dans le formulaire, la même ligne sert de champ « Lecture », sans état busy.

### Navigation (RubricBar)
- **Style :** onglets `role="tab"` dans un `tablist`, 44 × 44 px minimum, rembourrage horizontal 12 px, libellé en Rubric, filet inférieur de 1 px.
- **Default :** libellé encre secondaire, filet transparent.
- **Active :** libellé signal, filet signal. C'est le seul soulignement du système.
- **Hover :** aucun ; pressé à 0,7.
- **Mobile :** sous 960 px, la barre devient un `ScrollView` horizontal sans indicateur, sur sa propre rangée de 48 px.

### Navigation (ScreenHeader)
L'en-tête d'un écran d'ouvrage (fiche, création, modification, via `CadreOuvrage`) a deux modes, décidés par la largeur, jamais par la plateforme.
- **Écran (`screen-header-ecran`, sous 960 px) :** bande de 48 px (`minHeight`) sur `surface`, rembourrage horizontal 8 px, comme le bandeau de tête. À gauche un bouton texte encre « ‹ Fonds » (icône `chevron-left`) qui ramène à la liste ; à droite la marque de synchronisation. Un filet suit la bande.
- **Volet (`screen-header-volet`, à 960 px et plus) :** rangée de 56 px (`rowHeight`), hauteur fixe, sur `page`, rembourrage horizontal 8 px, avec son propre filet inférieur pour qu'il rejoigne celui de la première ligne d'ouvrage. Un seul bouton texte encre « × Fermer » (icône `x`) calé à droite ; pas de marque de synchronisation, le bandeau de la liste la porte déjà. La touche Échap ferme le volet (`hooks/useEscape.ts`, web uniquement, actif seulement en mode volet), pour la fiche comme pour les deux formulaires.

### Field row (FieldRow)
La ligne d'une liste de définitions ; c'est le composant signature de la fiche, et la forme que reprennent l'interrupteur et la ligne de saisie.
- **Style :** rangée non pressable, hauteur minimale 44 px, rembourrage vertical 8 px, aucun rembourrage horizontal propre (les 16 px viennent du conteneur), écart 12 px, filet inférieur de 1 px en `rule`.
- **Étiquette :** Rubric encre secondaire, colonne fixe de 112 px (`layout.fieldLabel`), texte tel quel (« Éditeur », « Coup de coeur ») mis en capitales par la variante.
- **Case d'icône :** 20 px de large (`layout.iconCase`), centrée, toujours rendue même vide ; quand une icône est fournie (le coeur du coup de coeur), elle est en Feather 16 px ton signal.
- **Valeur :** Body encre, à 8 px de la case ; `muted` la passe en encre secondaire pour une valeur absente (« Sans note », « Éditeur inconnu »). Aucune valeur n'est mise en graisse.

### Tally line
Ligne de compte de 28 px sous le bandeau : figures en encre secondaire, séparées par « · » (`aria-hidden`), `role="summary"`, retour à la ligne autorisé. Elle dit combien d'ouvrages ou de résultats, et « actualisation » quand une page se recharge.

### State message
Un seul composant pour le vide, l'erreur et la fiche non ouverte : icône 24 px centrée (encre secondaire, ou danger pour une erreur), titre en Lead (`role="alert"` en erreur), description en Small encre secondaire, action optionnelle en bouton texte. Centré, largeur de texte 420 px maximum, rembourrage 32 / 24, écart 8 px. Aucun fond, aucune bordure. La fiche et l'écran de modification l'emploient en erreur (« Réessayer » avec icône `refresh-cw`) et quand l'adresse ne désigne aucun ouvrage.

### Skeleton
Blocs `skeleton` à rayon 2 px. La liste de chargement rejoue exactement la géométrie de la ligne (56 px, colonne d'état 40 px, rond de 16 px, barres de 45 % × 12 et 65 % × 10, note 32 × 10, filet), 8 lignes au premier chargement, 2 en pied de page pour la page suivante ; `role="progressbar"`, `aria-busy`. Le squelette de la fiche rejoue de même la fiche : une barre de titre 70 % × 16, une barre d'auteur 45 % × 12 avec 12 px en dessous, puis cinq lignes de champ de 44 px sur filet, chacune avec une barre d'étiquette de 64 × 10 dans la colonne de 112 px et une barre de valeur de 40 % × 10. L'écran de modification n'a pas de squelette propre : il ne rend rien tant que l'ouvrage n'est pas chargé.

### Confirmation en ligne (ConfirmInline)
La question d'une action destructive, posée à la place de la rangée d'actions qu'elle remplace ; ni boîte de dialogue, ni surcouche, ni carte.
- **Style :** bloc `role="group"` dont l'`aria-label` est la question ; la question en Body encre sur sa propre ligne ; 4 px dessous, une rangée calée à droite, écart 8 px, sans filet ni fond. Il prend la marge de 16 px de la rangée qu'il remplace.
- **Actions :** la réponse sûre en encre à gauche (« Garder »), la réponse destructive en danger à droite (« Supprimer », `trash-2`) ; même ordre gauche-droite que la rangée qu'il remplace, la destructive garde sa couleur et son icône.
- **Focus :** « Garder » reçoit le focus au montage ; Entrée sans réfléchir conserve. Après « Garder », la rangée d'actions revient et « Supprimer » reprend le focus.
- **Après « Supprimer » :** le volet se ferme, la ligne s'estompe en 150 ms, et la barre d'annulation prend le relais en bas de la fenêtre.

### Barre d'annulation (UndoBar)
Le rattrapage d'une suppression, rendu comme une bande de chrome, pas comme une notification.
- **Style (`undo-bar`) :** bande de 48 px (`chromeHeight`) sur `surface`, filet de 1 px en haut, rembourrage 16 px à gauche et 8 px à droite, écart 8 px, en bas de la fenêtre et dans le flux. Texte en Body encre : le titre cité entre guillemets dans son propre bloc (`flexShrink 1`, une ligne, tronqué au milieu), puis « » supprimé » dans un bloc qui ne rétrécit pas. À droite, « Annuler » en signal avec `rotate-ccw`.
- **Minuteur :** une ligne de 2 px de signal le long du bord haut, ancrée à gauche, qui rétrécit linéairement (`Animated.timing`, `scaleX` 1 → 0) pendant les 5 000 ms (`DELAI_ANNULATION_MS`) ; `aria-hidden`. Aucun chiffre de compte à rebours, aucun anneau, aucune seconde affichée : la ligne est tout le minuteur.
- **Focus :** « Annuler » reçoit le focus au montage ; le clavier rattrape sans chercher. Quand la barre se retire, le focus ne tombe jamais sur le vide : après « Annuler » il va sur la ligne remise dans le fonds, d'où Entrée rouvre la fiche ; si la barre expire alors qu'elle tient encore le focus, il va sur la ligne qui était voisine de celle qui a disparu ; « Fermer » de la barre d'échec le rend à la ligne reprise ; à défaut de cible dans la liste, la première ligne. Mécanique : `refuge` du `SuppressionProvider`, résolu par `useRefugeDeListe` (qui fait défiler jusqu'à la ligne si elle n'est pas rendue), `autoFocus` de `BookRow`.
- **Échec (`undo-bar-danger`) :** même bande, texte en danger (« Titre » n'a pas pu être supprimé), sans ligne de progression ni délai ; « Fermer » en encre puis « Réessayer » en danger avec `refresh-cw`. La liste a déjà repris l'ouvrage.
- **Annonces :** une région `role="status"` `aria-live="polite"` masquée visuellement (1 × 1 px, opacité 0), montée en permanence sous le contenu, reçoit les trois phrases : « Titre » supprimé, « Titre » conservé, « Titre » n'a pas pu être supprimé. Le texte visible de la barre est la même phrase.

### Named Rules
**La règle du champ sur filet.** Un champ de saisie est une ligne de champ dont la valeur se tape : même étiquette de 112 px, même filet, même hauteur de 44 px, et le texte tapé commence à 152 px, sur la colonne des valeurs de la fiche. Aucun contour, aucun fond, aucun rayon ne distingue « à lire » de « à saisir » ; seul le curseur le fait.

**La règle du filet rouge.** Un champ invalide se lit par son filet et son étiquette passés en danger, et par un message en Small danger sous la ligne, sur la colonne des valeurs. Rien d'autre ne change : pas d'icône, pas de fond, pas de contour, et le texte tapé reste en encre.

**La règle des actions à droite.** Les actions d'un écran d'ouvrage forment une rangée calée à droite, 16 px sous la dernière ligne, en boutons texte : le neutre en encre avant le primaire en signal sous le formulaire, la destructive en danger avant la neutre en encre sous la fiche ; l'action la plus à droite ne détruit jamais rien. Pendant la soumission, le primaire se désactive à 0,5 et son libellé dit ce qui se passe (« Enregistrement… »). Jamais un bouton plein, jamais une barre d'actions sur fond.

**La règle de la question en place.** Une action destructive se confirme là où elle a été demandée : la question remplace la rangée d'actions, en Body, avec ses deux réponses calées à droite dans le même ordre, la sûre en encre à gauche, la destructive en danger à droite. Aucune boîte de dialogue, aucune surcouche, aucun fond ; la fiche s'allonge, rien ne se superpose.

**La règle de la barre de chrome.** Le rattrapage d'une suppression est une bande de 48 px sur `surface` fermée par un filet, en bas de la fenêtre et dans le flux, comme le bandeau de tête l'est en haut. Son seul minuteur est une ligne de signal de 2 px qui se retire ; pas de carte flottante, pas de chiffres de compte à rebours, pas d'icône d'état. Une seule barre à la fois.

**La règle du refuge focalisé.** Quand une question ou une barre apparaît, le focus va sur l'action qui ne détruit rien : « Garder », « Annuler ». Quand la question se retire par « Garder », le focus revient au bouton qui l'a posée ; quand la barre se retire par « Annuler », il va sur la ligne remise dans le fonds ; quand elle expire en tenant encore le focus, sur la ligne voisine de celle qui a disparu, et à défaut sur la première ligne. Le bouton destructif n'a jamais le focus d'office, et le focus ne tombe jamais sur le vide.

## Do's and Don'ts

### Do:
- **Do** structurer avec des filets de 1 px en `rule` et des fonds `page` / `surface` ; c'est toute la structure visible.
- **Do** réserver le vert bouteille au signal : action primaire en texte, rubrique active, coup de coeur, état en ligne, focus, curseur et sélection.
- **Do** composer tout texte en `tabular-nums` via `AppText` et prendre la couleur dans `theme/tone.ts` ; les `TextInput` lisent leur taille dans `theme/tokens.ts` ; aucune couleur ni taille en dur dans `components/`.
- **Do** garder les icônes Feather à 16 px dans une case fixe (16 px en liste, 20 px en fiche), et n'agrandir à 24 px que l'icône d'un message d'état.
- **Do** donner 44 px minimum à toute cible interactive et un libellé, un rôle et un état à chaque élément pressable.
- **Do** faire durer toute bascule d'état 150 ms (`transitionEtat`) et signaler le pressé par `opacity 0.7`.
- **Do** décliner tout nouvel écran dans les deux palettes en lisant `useTheme().colors` ; les valeurs sombres sont dans `theme/tokens.ts`, pas dans les composants.
- **Do** présenter un détail d'ouvrage comme une liste de définitions sur filets (`FieldRow`, `ToggleRow`) : étiquette Rubric sur 112 px, case d'icône de 20 px, valeur en Body ; et aligner l'en-tête d'un volet sur la première ligne de la liste (56 px, filet propre).
- **Do** dire « oui » par une coche en encre dans une case bordée d'encre ; réserver le vert au coeur du coup de coeur.
- **Do** composer un formulaire comme la fiche qu'il édite : `FormField` sur filet, ligne de 44 px, texte tapé retiré de 28 px pour commencer sur la colonne des valeurs, écart 8 px entre les lignes, titre d'écran en Title avec 16 px en dessous, et le même `CadreOuvrage` en tête.
- **Do** signaler un champ invalide par son filet et son étiquette en `danger` (150 ms) et un message Small danger `role="alert"` 4 px sous la ligne, retiré de 152 px ; laisser le texte tapé en encre.
- **Do** donner à tout champ un texte indicatif en encre secondaire qui montre la forme attendue, et nommer le champ facultatif par « Facultatif » plutôt que par une mention dans l'étiquette.
- **Do** terminer une fiche ou un formulaire par une rangée d'actions calée à droite, 16 px sous la dernière ligne : neutre en encre, puis primaire en signal avec icône ; désactiver le primaire à 0,5 et le relibeller en progression (« Enregistrement… ») pendant la soumission.
- **Do** confirmer une action destructive en place : la question en Body remplace la rangée d'actions, ses réponses « Garder » (encre) puis « Supprimer » (danger, `trash-2`) calées à droite, `role="group"` étiqueté par la question ; aucune boîte de dialogue.
- **Do** placer la destructive à gauche de la neutre dans la rangée de la fiche (« Supprimer » puis « Modifier ») ; l'action la plus à droite ne détruit jamais rien.
- **Do** rattraper une suppression par une barre de chrome dans le flux : 48 px sur `surface`, filet en haut, 16 / 8 px de rembourrage, texte en Body, « Annuler » en signal avec `rotate-ccw`, et une ligne de signal de 2 px qui se retire linéairement en 5 000 ms comme seul minuteur.
- **Do** citer l'ouvrage entre guillemets français puis le verbe (« Titre » supprimé / conservé / n'a pas pu être supprimé), tronquer le titre seul au milieu, et porter la même phrase dans une région `role="status"` `aria-live="polite"` montée en permanence.
- **Do** donner le focus au montage à l'action de refuge (`autoFocus` sur « Garder », sur « Annuler »), le rendre au bouton qui a posé la question après « Garder », le poser sur la ligne remise dans le fonds après « Annuler », et sur la ligne voisine quand la barre expire en le tenant encore.
- **Do** faire sortir une ligne d'ouvrage par `opacity 0` en 150 ms (`sortante`) avant de la retirer des listes ; une seule suppression en attente à la fois.

### Don't:
- **Don't** poser un fond de carte, une ombre, un dégradé ou une bordure de plus d'un pixel autour d'un bloc de contenu.
- **Don't** introduire une deuxième couleur d'accent, ni un bouton plein bleu ou vert ; l'action primaire est un texte vert.
- **Don't** employer le rouge ailleurs que pour une erreur, une destruction ou un conflit.
- **Don't** arrondir au-delà de 2 px, sauf le point de 8 px et le rond de squelette qui sont des cercles.
- **Don't** ajouter un filet propre au champ de recherche du bandeau ; le filet du bandeau lui suffit.
- **Don't** utiliser les capitales espacées comme surtitre au-dessus d'un titre ; elles nomment une rubrique, un état de synchronisation ou l'étiquette d'un champ, toujours en ligne avec ce qu'elles nomment.
- **Don't** remplir la case à cocher d'un aplat de signal ni poser du texte en `on-signal` ; aucun aplat de signal n'existe dans le système.
- **Don't** écrire une couleur, une taille ou une chaîne visible en dur dans `components/` ou `features/`.
- **Don't** donner à un champ de saisie un contour, un fond, un rayon ou une étiquette au-dessus ; un champ est une ligne de champ sur filet, étiquette à gauche sur 112 px.
- **Don't** signaler une erreur de champ par une icône, un fond ou un contour rouge ; seuls le filet, l'étiquette et le message passent en danger.
- **Don't** mettre un bouton plein, une barre d'actions sur fond ou un indicateur d'attente distinct sous un formulaire ; deux boutons texte à droite, et le libellé du primaire dit la progression.
- **Don't** ouvrir une boîte de dialogue, une surcouche ou une carte pour confirmer une suppression ; la question se pose en ligne, à la place des actions.
- **Don't** rendre l'annulation en toast flottant, en carte ombrée ou avec des chiffres de compte à rebours ; une bande de chrome dans le flux, une ligne de 2 px, rien d'autre.
- **Don't** donner le focus d'office au bouton destructif, ni laisser le focus se perdre quand la question ou la barre se retire.
- **Don't** teinter en danger la question ou la barre d'annulation ; seul « Supprimer » est rouge, et seule la barre d'échec, qui est une erreur, le devient.
