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
  sort-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.figure}"
    rounded: "0"
    padding: "0"
    height: "28px"
  sort-trigger-open:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.figure}"
    rounded: "0"
    padding: "0"
    height: "28px"
  sort-menu:
    backgroundColor: "{colors.page}"
    rounded: "0"
    padding: "0 0 8px"
    width: "220px"
  sort-option:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 16px"
    height: "44px"
  sort-option-checked:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 16px"
    height: "44px"
  sort-hint:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.small}"
    padding: "8px 16px 0"
  toggle-heart:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    size: "20px"
  toggle-heart-checked:
    backgroundColor: "transparent"
    textColor: "{colors.signal}"
    size: "20px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "0"
    padding: "0"
    size: "44px"
  textarea-field:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "12px 0 12px 28px"
    height: "44px"
  textarea-field-invalid:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "12px 0 12px 28px"
    height: "44px"
  notes-heading:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    padding: "0"
    height: "44px"
  notes-count:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.figure}"
  notes-status:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.small}"
  notes-alert:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.small}"
    padding: "4px 0 0"
  note-meta:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.figure}"
    padding: "0"
    height: "44px"
  note-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0 44px 12px 0"
  cover-thumb:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    width: "28px"
    height: "40px"
  cover-fiche:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    width: "80px"
    height: "120px"
  cover-standin:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
  cover-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0"
    height: "44px"
  cover-alert:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.small}"
    padding: "0 0 0 124px"
  star-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0"
    height: "44px"
  star-target:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "0"
    padding: "0"
    width: "32px"
    height: "44px"
  star-target-unlit:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "0"
    padding: "0"
    width: "32px"
    height: "44px"
  preference-language:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "0"
    padding: "0 12px"
    height: "44px"
---

# Design System: BookList Pro

## Overview

**Creative North Star: "La page des nouveautés"**

BookList Pro est mis en page comme la page des nouveautés d'un périodique professionnel du livre : une liste typographique serrée, lue au comptoir de caisse en plein jour, où les filets d'un pixel font les lignes et où les capitales espacées font les rubriques. La hiérarchie est portée par la graisse, la taille et le gris de l'encre, jamais par des fonds, des cartes ni des ombres. Chaque ligne d'ouvrage est un article de deux niveaux, titre en graisse puis auteur · éditeur · année en gris, avec sa note en chiffres tabulaires calée à droite comme une colonne de prix. La fiche d'un ouvrage prolonge la même page : un titre, l'auteur en gris, puis une liste de définitions sur filets où l'étiquette en capitales espacées précède la valeur. Le formulaire de création ou de modification prolonge la fiche à son tour : les mêmes lignes de champ sur filets, où la valeur est simplement devenue saisissable, et le texte tapé commence exactement là où la fiche pose ses valeurs. Le lot 2 prolonge la fiche vers le bas et la ligne de compte vers la droite sans changer de grammaire : les notes de lecture sont une section sur filets sous la rangée d'actions, et le tri est une commande de la ligne de compte dont le menu, seule surcouche du système, n'est fait que de lignes de 44 px sur filets. Le lot 3 ajoute l'image sans changer la page : une vignette de couverture de 28 × 40 px entre la colonne d'état et le titre de chaque ligne, la couverture de 80 × 120 px en tête de fiche à gauche du titre, cinq étoiles en encre dans une ligne de champ « Note », une ligne « Éditions » nourrie par OpenLibrary, et, au bout du bandeau, les deux préférences de la boutique, thème et langue, en bouton-icône et en bouton texte derrière un filet vertical.

La densité est celle d'un outil de métier : 56 px par ouvrage, bandeau de 48 px, ligne de compte de 28 px, lignes de champ de 44 px, tout aligné sur des filets. La couleur est retenue à l'extrême : une seule encre de signal, un vert bouteille, sert à la fois l'action primaire, la rubrique active, le coup de coeur et l'état « en ligne » ; le rouge n'existe que pour le destructif, l'erreur et le conflit. La scène par défaut est claire (la caisse en plein jour) ; le thème sombre suit la préférence système avec la même grammaire et une palette inversée, sans changer une seule règle ; depuis le lot 3, la lune ou le soleil au bout du bandeau la fixe à la main, et la préférence est retenue d'une session à l'autre, comme la langue.

Rejets confirmés par la direction et vérifiés dans le rendu : pas de table d'administration à cartes, pas de pastilles arrondies, pas de bouton bleu plein, aucun fond de carte, aucune icône décorative, aucun aplat de signal (la case à cocher cochée porte une coche en encre, jamais un fond vert), aucun champ de saisie à contour ou à fond.

**Key Characteristics:**
- Filets de 1 px (`hairline = 1`) comme seule structure visible : entre les lignes, sous le bandeau, sous la ligne de compte, sous chaque ligne de champ de la fiche et du formulaire, sous l'en-tête du volet, vertical devant la fiche, et depuis le lot 2 sous la ligne « Notes de lecture », sous le champ « Nouvelle note », en tête de la liste des notes et sous chaque note, entre les rangées du menu de tri et en bordure de ce menu.
- Rubriques en capitales espacées de 11 px, soulignées d'un filet vert de 1 px quand elles sont actives ; les mêmes capitales, en gris, étiquettent les champs de la fiche et du formulaire.
- Chiffres tabulaires (`fontVariant: ['tabular-nums']`) sur tout texte, pas seulement sur les figures.
- Un seul signal coloré, vert bouteille, sur ≤ 5 % de l'écran ; le rouge réservé au danger, au conflit et au champ invalide.
- Pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`) et échelle fixe 11 / 13 / 14 / 16 / 20.
- Icônes Feather à 16 px, trait unique, toujours dans une case fixe : 16 px dans la liste (`iconSize`), 20 px dans la fiche (`layout.iconCase`).
- Une seule ombre, `overlayShadow`, portée par la seule surcouche du système, le menu de tri ; aucun rayon supérieur à 2 px ; les bascules d'état durent 150 ms.
- Un champ de saisie est une ligne de champ : aucun contour, son filet est son seul trait, et l'invalidité se lit par ce filet et son étiquette passés en rouge.
- Une action destructive se confirme en place et se rattrape dans le flux : la question remplace la rangée d'actions de la fiche, et l'annulation est une bande de chrome de 48 px en bas de la fenêtre dont le seul minuteur est une ligne de signal de 2 px qui se retire en cinq secondes.
- Une commande de la liste vit dans la ligne de compte : « Tri : Titre » et sa flèche, en Figure encre secondaire, passent en encre quand le menu est ouvert ; le menu s'ancre dessous, sur `page`, bordé d'un filet, avec des rangées de 44 px sur filets et la cochée sur `surface`.
- Une section de la fiche (les notes de lecture) se titre en Body strong sur une ligne de 44 px fermée par un filet, jamais en capitales espacées ; ses notes sont des blocs sur filets ouverts par un horodatage en Figure et fermés par une corbeille de 44 px.
- Une couverture est une image cadrée à taille fixe (28 × 40 px en liste, 80 × 120 px en fiche), rayon 2 px, sur `surface`, remplacée à la même taille par un substitut (`surface`, filet `rule`, glyphe `book` en encre secondaire) quand elle manque ou échoue ; jamais une image cassée.
- La note se lit et se donne en cinq étoiles de 16 px, pleines en encre quand elles sont allumées, en contour encre secondaire quand elles sont éteintes, jamais en signal ; l'étoile est le tracé Feather dessiné en SVG (`components/StarIcon.tsx`) pour pouvoir se remplir sans quitter le système.
- Toute chaîne visible vient d'un dictionnaire typé (`features/i18n/fr.ts`, `en.ts`) ; les dates et les nombres passent par `Intl` avec la locale du dictionnaire ; le thème et la langue se règlent au bout du bandeau, derrière un filet vertical, et sont retenus.

## Colors

Une palette d'imprimerie : blanc de page, encre noire, gris de légende, filets gris chaud, et un seul vert bouteille qui fait tout le travail de signal.

### Primary
- **Vert bouteille** (`signal`, #1F5C3A ; sombre #6FBF8E) : l'unique couleur de signal. Elle porte l'action primaire en texte (« Ajouter un ouvrage », « Enregistrer » avec sa coche), le libellé et le soulignement de la rubrique active, le coeur « coup de coeur » dans la colonne d'état de la liste et dans la case de l'interrupteur « Coup de coeur » de la fiche (à « Oui » seulement), « Ajouter la note » avec son `plus`, le point plein et les capitales EN LIGNE de la marque de synchronisation, l'anneau de focus (2 px, décalé de 2 px), le curseur de saisie et la sélection de texte à 22 % (dans le champ de recherche comme dans les champs du formulaire, `selectionColor`). Depuis la suppression : le libellé « Annuler » de la barre d'annulation avec sa flèche `rotate-ccw`, et la ligne de 2 px qui, le long du bord haut de cette barre, est tout le minuteur.
- **Sur signal** (`on-signal`, #FFFFFF ; sombre #141414) : réservé à un texte posé sur un aplat de signal. Aucun aplat de signal n'existe dans le rendu livré et le ton `onSignal` a été retiré de `theme/tone.ts` ; le jeton reste défini dans `theme/tokens.ts` et exposé en `--bl-onSignal`, sans aucun consommateur. Il n'est ni un ton ni une règle : un lot qui en aurait besoin le réintroduirait à partir de son rendu.

### Neutral
- **Page** (`page`, #FFFFFF ; sombre #141414) : fond de la liste, de la fiche et du formulaire, fond des lignes au repos, fond de l'en-tête du volet, fond du menu de tri et de ses rangées non cochées.
- **Surface** (`surface`, #F4F4F2 ; sombre #1E1E1D) : la seule surface secondaire. Bandeau de tête, bandeau de la fiche et du formulaire en écran (sous 960 px), fond de ligne au survol et à la sélection, rangée cochée du menu de tri, barre d'annulation en bas de la fenêtre, fond d'une couverture pendant son chargement et fond de son substitut. Elle n'est jamais un fond de carte ni un fond de champ.
- **Encre** (`ink`, #1C1C1C ; sombre #EDEDEA) : titres d'ouvrage, notes présentes, saisie (recherche et champs du formulaire), texte de premier niveau, valeurs de champ de la fiche, coche et bordure de la case cochée, boutons neutres « Fonds », « Fermer », « Modifier », « Annuler » et « Reprendre la version du serveur », « Garder » dans la question de suppression et « Fermer » dans la barre d'échec, texte de la barre d'annulation (« Titre » supprimé), contour du point « en attente » ; depuis le lot 2, « Tri : Titre » et sa flèche pendant que le menu est ouvert, libellé des critères du menu et coche de la rangée cochée, titre « Notes de lecture », contenu d'une note, « Oui » / « Non » du coup de coeur, « Garder » dans la question d'une note ; depuis le lot 3, les étoiles allumées de la note et sa valeur « 2/5 », « Remplacer la couverture » et « Revenir à la couverture d'origine » avec leurs icônes, la valeur de la ligne « Éditions » quand des éditions sont trouvées, et « EN » / « FR » au bout du bandeau.
- **Encre secondaire** (`ink-secondary`, #6F6F6F ; sombre #A0A09B) : auteur · éditeur · année, auteur en tête de fiche, étiquettes de champ (fiche et formulaire), valeurs absentes (« Sans note », « Éditeur inconnu »), texte indicatif de tout champ de saisie (« Rechercher un titre ou un auteur », « Titre de l'ouvrage », « Prénom Nom », « Facultatif », « 1965 »), bordure de la case non cochée, ligne de compte, rubriques inactives, tiret de note absente, coche « lu » de la liste, icône de recherche, contour du point « hors ligne » ; depuis le lot 2, « Tri : Titre » et sa flèche au repos, flèche de sens à droite de la rangée cochée, indication en bas du menu, coeur du coup de coeur à « Non », compte « 3 notes », horodatage d'une note, corbeille d'une note, texte indicatif « À qui le conseiller, et pourquoi », « Note ajoutée » ; depuis le lot 3, les étoiles éteintes, « Sans note » à côté des étoiles, le glyphe `book` du substitut de couverture, la lune ou le soleil du bouton de thème, et la ligne « Éditions » tant qu'elle cherche, ne trouve rien ou ne joint pas OpenLibrary.
- **Filet** (`rule`, #E3E3E0 ; sombre #2C2C2A) : tous les filets de 1 px, y compris le filet d'un champ de saisie valide, la bordure du menu de tri et les filets entre ses rangées, les filets de la section des notes, la couleur de l'ascenseur, et la bordure du substitut de couverture.
- **Squelette** (`skeleton`, #ECECEA ; sombre #242423) : blocs de chargement uniquement.
- **Danger** (`danger`, #B3261E ; sombre #F28B82) : état d'erreur (icône et titre du message), bouton texte destructif (« Supprimer » sous la fiche, puis dans la question en ligne), texte et « Réessayer » de la barre d'échec de suppression, message en ligne « Modification annulée : … » sous les champs de la fiche, point plein et capitales de l'état de conflit ; dans le formulaire, le filet et l'étiquette d'un champ invalide, le message sous ce champ et la ligne d'alerte globale ; dans la section des notes, le filet et l'étiquette du champ « Nouvelle note » invalide et son message, « Supprimer » dans la question d'une note, et « Suppression annulée : … » sous la liste ; sous la ligne « Couverture », « Couverture refusée : … » quand l'envoi ou le retrait échoue. Jamais une couleur d'accent : ni une étoile, ni un compteur.

Les deux palettes sont exposées au navigateur en variables CSS `--bl-<nom>` (`--bl-page`, `--bl-surface`, `--bl-ink`, `--bl-inkSecondary`, `--bl-rule`, `--bl-signal`, `--bl-onSignal`, `--bl-danger`, `--bl-skeleton`) écrites sur `document.documentElement` par `ThemeProvider`, avec `color-scheme` aligné sur le schéma actif. `theme/global.css` est le seul consommateur : fond de `body`, sélection, anneau de focus, curseur de saisie, ascenseur.

### Named Rules
**La règle du signal unique.** Une seule couleur de signal, le vert bouteille, et une seule sémantique : ce qui est actif, recommandé, en ligne ou à faire. Si un nouvel élément a besoin d'une deuxième couleur d'accent, c'est la hiérarchie qui est fausse, pas la palette.

**La règle du rouge gardé.** Le rouge n'apparaît que pour une erreur, une destruction ou un conflit de synchronisation. Il n'est jamais un accent, une étoile, ni un compteur. Le champ invalide est une erreur : son filet, son étiquette et son message passent en rouge, rien d'autre. La suppression est une destruction : seul le bouton « Supprimer » est rouge ; la question qui le précède et la barre d'annulation qui le suit restent en encre, et seule la barre d'échec, qui est une erreur, passe en rouge.

**La règle de la surface sans carte.** `surface` colore le bandeau et la ligne survolée ou sélectionnée. Elle ne délimite jamais un bloc de contenu ni un champ ; les blocs sont délimités par des filets.

**La règle de la coche en encre.** Un état coché se lit par une coche en encre dans une case bordée d'encre ; jamais par un aplat de signal ni par un texte sur signal. Le vert dit « recommandé ou actif », pas « oui ». L'interrupteur « Coup de coeur » ne fait pas exception : sa case porte le coeur, pas une coche, et le coeur passe en signal parce qu'un coup de coeur est une recommandation ; le « Oui » à côté reste en encre.

**La règle de l'encre éveillée.** Une commande posée dans une ligne de compte se lit en Figure encre secondaire au repos, comme le compte qu'elle accompagne, et passe en encre quand elle est ouverte (« Tri : Titre » et sa flèche pendant que le menu est là). Ouvert n'est pas actif : la commande ne prend jamais le signal, réservé à l'action primaire et à la rubrique active.

**La règle de l'étoile en encre.** Une étoile allumée est pleine, remplie et tracée en encre ; une étoile éteinte est un contour en encre secondaire ; ni l'une ni l'autre ne prend le signal, le rouge ou un jaune. La note est une valeur que le libraire lit et pose, pas une recommandation : le vert reste au coeur du coup de coeur, seule marque de conseil de la fiche.

## Typography

**Display Font:** aucune. Le plus grand corps du système est le titre à 20 px.
**Body Font:** pile système (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`), choix délibéré et confirmé en mode Operate ; à revoir uniquement si les chiffres tabulaires ou les capitales espacées rendent mal sur un poste donné.
**Label/Mono Font:** aucune famille distincte ; les figures utilisent la même pile avec `tabular-nums`.

**Character :** une seule famille, une échelle fixe et courte (11 / 13 / 14 / 16 / 20), des interlignes entiers (16 / 18 / 20 / 22 / 26) et trois graisses (400, 500, 600). Le contraste vient de la graisse et du gris, pas de la taille. Le texte se lit comme une colonne de périodique, pas comme une interface.

### Hierarchy
- **Title** (600, 20 px / 26 px) : titre de la fiche d'ouvrage (première ligne sous l'en-tête) et titre d'écran du formulaire (« Nouvel ouvrage », « Modifier l'ouvrage »), avec 16 px en dessous avant la première ligne de champ. Non utilisé dans la liste.
- **Lead** (500, 16 px / 22 px) : titre d'un message d'état (« Aucun ouvrage ouvert », « Le fonds est vide »), centré, largeur maximale 420 px ; auteur en tête de fiche, en encre secondaire, 4 px sous le titre, tous deux à droite de la couverture.
- **Body** (400, 14 px / 20 px) : saisie de recherche, saisie d'un champ de formulaire et son texte indicatif, texte courant, valeur d'une ligne de champ (encre ; encre secondaire quand la valeur est absente), libellé de valeur d'un interrupteur (« Lu » / « Non lu », « Oui » / « Non »), question de confirmation (« Supprimer cet ouvrage du fonds ? », « Supprimer cette note ? »), texte de la barre d'annulation (« Titre » supprimé, en encre ; « Titre » n'a pas pu être supprimé, en danger), libellé d'un critère du menu de tri (« Titre », « Auteur », « Année », « Note »), saisie d'une note et son texte indicatif, contenu d'une note de lecture ; depuis le lot 3, la valeur de la ligne « Note » à droite des étoiles (« 2/5 » en encre ; « Sans note » en encre secondaire) et la valeur de la ligne « Éditions » (« 12 référencées · première en 1965 » en encre ; « Recherche sur OpenLibrary… », « Aucune édition référencée », « OpenLibrary injoignable » en encre secondaire).
- **Body strong** (600, 14 px / 20 px) : titre d'ouvrage dans la liste (une ligne, tronquée), libellé de tout bouton texte, y compris « Fonds » et « Fermer » dans l'en-tête, « Supprimer » et « Modifier » sous la fiche, « Garder » et « Supprimer » dans la question, « Annuler » et « Enregistrer » sous le formulaire, « Annuler », « Réessayer » et « Fermer » dans la barre d'annulation, « Ajouter la note » et son libellé de progression « Ajout… », « Remplacer la couverture » et son libellé de progression « Envoi… », « Revenir à la couverture d'origine », « EN » / « FR » au bout du bandeau ; et le titre de section « Notes de lecture », seul emploi hors bouton et hors liste.
- **Small** (400, 13 px / 18 px) : seconde ligne d'un ouvrage (auteur · éditeur · année) en encre secondaire, description d'un message d'état, message en ligne de retour arrière (« Modification annulée : … ») en danger, message d'un champ invalide et alerte globale du formulaire en danger ; indication en bas du menu de tri (« Choisir à nouveau le même critère inverse l'ordre. ») et « Note ajoutée » en encre secondaire ; « Suppression annulée : … » sous les notes en danger ; « Couverture refusée : … » sous la ligne « Couverture » en danger.
- **Figure** (400, 13 px / 18 px, `tabular-nums`) : la note d'un ouvrage (« 4/5 », tiret « – » en encre secondaire quand elle est absente, calée à droite sur 32 px minimum) et la ligne de compte (« 500 ouvrages », le nombre par `toLocaleString(locale)`), le déclencheur de tri dans cette même ligne (« Tri : Titre »), le compte des notes (« 3 notes ») et l'horodatage d'une note (« 28 juil. 2026, 21:22 », `Intl.DateTimeFormat` avec la locale du dictionnaire, fr-FR ou en-GB, date `medium`, heure `short`, `domain/horodatage.ts`). Même métrique que Small ; la variante existe pour nommer l'intention chiffrée. Dans la fiche, la note est une valeur de champ en Body (« 1/5 »), pas une Figure.
- **Rubric** (600, 11 px / 16 px, `letterSpacing 0.88` soit 0,08 em, capitales) : trois usages, et seulement trois. Les rubriques de navigation FONDS · LUS · NON LUS · COUPS DE COEUR ; le libellé de l'état de synchronisation (EN LIGNE) ; l'étiquette d'une ligne de champ, dans la fiche (COUVERTURE, ÉDITEUR, ANNÉE, NOTE, COUP DE COEUR, LECTURE, ÉDITIONS) comme dans le formulaire (TITRE, AUTEUR, ÉDITEUR, ANNÉE, LECTURE) et dans la section des notes (NOUVELLE NOTE), en encre secondaire (danger si le champ est invalide), sur une colonne de 112 px, à côté de la valeur et jamais au-dessus d'un titre.

Les variantes sont exposées par `components/AppText.tsx` (`title | lead | body | bodyStrong | small | rubric | figure`) et les tons par `theme/tone.ts` (`ink | secondary | signal | danger`). La seule autre lecture des tailles est celle des trois `TextInput` (`SearchField`, `FormField`, `TextAreaField`), qui ne peuvent pas passer par `AppText` et composent leur style de Body à partir de `fontFamily`, `fontSize.body` et `lineHeight.body` de `theme/tokens.ts` ; aucune couleur ni taille n'est écrite en dur hors de ces fichiers.

Aucune chaîne visible n'est écrite dans un composant ni dans un écran : `features/i18n/fr.ts` est le dictionnaire de référence, `en.ts` en reprend le type (`Dictionnaire = typeof fr`), `useTraduction()` livre celui de la langue courante, et les schémas du domaine reçoivent leurs messages en argument (`creerOuvrageFormulaireSchema(t.validation)`, `creerContenuNoteSchema(t.validation)`). Chaque dictionnaire porte sa locale (`fr-FR`, `en-GB`) : les dates passent par `domain/horodatage.ts` (`Intl.DateTimeFormat`, date `medium`, heure `short`) et les comptes par `toLocaleString(locale)`. En anglais, les rubriques deviennent COLLECTION · READ · UNREAD · FAVOURITES, la ligne de compte « 500 books », le tri « Sort: Title », sans qu'une seule mesure change.

### Named Rules
**La règle des chiffres tabulaires.** Tout texte est composé en `tabular-nums`, pas seulement les notes : les colonnes de chiffres restent alignées où qu'elles apparaissent, sans variante à activer. Le texte tapé dans un champ y compris.

**La règle des capitales espacées.** Les capitales espacées à 11 px sont réservées à trois emplois : les rubriques de navigation, l'état de synchronisation et l'étiquette d'un champ dans une liste de définitions, lue ou saisie. Elles nomment une section, un état ou un champ, toujours à côté ou en ligne ; elles ne servent jamais de surtitre décoratif au-dessus d'un titre.

**La règle des guillemets.** Un ouvrage est cité entre guillemets français à espaces insécables, puis vient le verbe : « Titre » supprimé, « Titre » conservé, « Titre » n'a pas pu être supprimé. Trois annonces, pas une de plus, et la même phrase pour l'oeil et pour le lecteur d'écran. Dans la barre d'annulation, le titre est dans son propre bloc de texte et cède seul quand la place manque (une ligne, tronquée au milieu) ; le guillemet fermant et le verbe ne rétrécissent jamais.

**La règle du titre de section.** Une section de la fiche se titre en Body strong encre, sur une ligne de 44 px fermée par un filet, avec son compte en Figure encre secondaire calé à droite (« Notes de lecture » … « 3 notes »). Ni Title, la fiche n'a qu'un titre, ni capitales espacées, qui nomment un champ et non une section : la graisse et le filet suffisent.

**La règle du dictionnaire.** Un composant ne connaît aucune phrase : il reçoit ses libellés, ses textes indicatifs et ses annonces du dictionnaire typé de la langue courante, et un schéma du domaine reçoit ses messages en argument. Une date se formate par `Intl` avec la locale du dictionnaire, un nombre par `toLocaleString(locale)`. Changer de langue rechange tout l'écran à chaud, sans rechargement ; la seule chaîne qui ne se traduit pas est le code de l'autre langue, « EN » ou « FR », qui est le libellé du bouton, et son libellé parlé dit l'action.

## Layout

L'écran est une colonne pleine largeur sur `page`, sans conteneur centré ni marge extérieure, structurée de haut en bas par des filets :

1. **Bandeau de tête** (`chromeHeight = 48`, `minHeight`) sur `surface`, rembourrage horizontal 8 px. À 960 px et plus (`twoPaneMin`), une seule rangée : rubriques à gauche, champ de recherche au centre (`flex: 1`, rembourrage 8 px), bouton texte « Ajouter un ouvrage », marque de synchronisation, puis, derrière un filet vertical de 1 px en `rule` (`Rule` vertical, `aria-hidden`, retiré de 8 px en haut et en bas, 8 px de rembourrage à gauche, écarts de 4 px), les deux commandes de préférence : le bouton-icône de thème (44 × 44 px, `moon` en clair, `sun` en sombre, encre secondaire) et le bouton texte de langue (« EN » en français, « FR » en anglais, encre). En dessous de 960 px, deux rangées de 48 px : recherche (« Titre ou auteur »), bouton-icône `plus` en signal libellé « Ajouter un ouvrage », synchronisation, puis le même groupe de préférences derrière son filet ; puis les rubriques en défilement horizontal sans indicateur, seules sur leur rangée.
2. **Filet.**
3. **Ligne de compte** (`tallyHeight = 28`, `minHeight`), rembourrage horizontal 16 px, figures en encre secondaire séparées par « · ». Elle suit les colonnes du corps (`tallyRow` : une `tallyColumn` en `flex: 1`, puis un `detailSpacer` de 400 + 1 px quand la colonne de fiche est là) : le compte à gauche, et calé à droite, à 16 px du filet vertical, le déclencheur de tri « Tri : Titre » avec sa flèche, qui appartient à la liste qu'il trie et non au volet. Pendant le chargement initial, un squelette de 96 × 10 px remplace le compte, le déclencheur reste.
4. **Filet.**
5. **Corps** en rangée : la liste (`flex: 1`) et, à 960 px et plus, un **filet vertical** puis la **colonne de fiche** de 400 px (`detailPane`). Sous 960 px la fiche prend l'écran entier.

**Deux volets ou une pile** (`app/(fonds)/_layout.tsx`) : à 960 px et plus, le groupe de routes rend `FondsPane` avec la fiche en `Slot` dans la colonne de droite ; en dessous, un `Stack` sans en-tête natif, fond `page`, où la fiche est un écran à part entière. La colonne de droite reçoit indifféremment la fiche (`/ouvrages/:id`), la création (`/ouvrages/nouveau`) et la modification (`/ouvrages/:id/modifier`) ; seul `useWindowDimensions` décide de la disposition (`hooks/useModeOuvrage.ts`).

**Menu de tri** (`components/SortMenu.tsx`, état dans `features/books/tri.ts`) : la seule surcouche du système. Il est posé en absolu sous le déclencheur (`top = tallyHeight`, soit sur le filet qui ferme la ligne de compte, `right: 0` de la colonne de compte, donc à 16 px du filet vertical), `zIndex 2`, largeur minimale 220 px, sur `page`, bordé d'un filet de 1 px en `rule`, porté par `overlayShadow`, rembourré de 8 px en bas. Dedans, quatre rangées de 44 px (`touchTarget`, `minHeight`) sur filets, rembourrage horizontal 16 px, écart 8 px : la case d'icône de 20 px (coche en encre sur la rangée cochée, vide ailleurs), le libellé en Body sur `flex: 1`, et sur la rangée cochée la flèche de sens en encre secondaire calée à droite ; la rangée cochée est sur `surface`, les autres sur `page`. Sous les rangées, l'indication en Small encre secondaire, 8 px au-dessus, 16 px de côté. Tant que le menu est là, un voile transparent (`Pressable` en absolu sur tout le panneau, `zIndex 1`, `aria-hidden`, non focalisable) recouvre la liste et la fiche et ferme le menu au clic ; la ligne de compte, en `zIndex 2`, reste au-dessus. Sous 960 px, même ancrage : le menu part du bord droit de la ligne de compte, à 16 px du bord de l'écran. Tri par défaut titre croissant ; choisir la note la classe décroissante d'abord (le meilleur en tête) ; choisir à nouveau le critère courant inverse le sens.

**Cadre d'ouvrage** (`features/books/CadreOuvrage.tsx`) : la fiche et les deux écrans de formulaire partagent le même cadre, une colonne `flex: 1` sur `page` ouverte par le `ScreenHeader` en mode `ecran` ou `volet` (voir Components › Navigation) ; en écran, la marque de synchronisation est dans l'en-tête et un filet le suit. La touche Échap ferme le volet sur les trois écrans.

**Fiche d'ouvrage** (`features/books/FicheOuvrage.tsx`) : en-tête, puis un contenu défilant rembourré à 16 px avec un écart vertical de 8 px : d'abord la tête de fiche (`features/books/CouvertureOuvrage.tsx`) : la couverture de 80 × 120 px à gauche et, à 16 px à droite, le titre en Title (4 px de retrait haut) puis l'auteur en Lead encre secondaire 4 px dessous ; 16 px plus bas, la ligne « Couverture », une ligne de champ de 44 px sur filet dont la valeur est faite de boutons texte encre (« Remplacer la couverture » avec `image` ; puis « Revenir à la couverture d'origine » avec `rotate-ccw`, seulement quand une couverture a été envoyée), calés au début de la zone de valeur par une marge négative de 12 px qui annule leur rembourrage, retour à la ligne autorisé ; en cas de refus, « Couverture refusée : … » en Small danger `role="alert"`, 8 px dessous, retiré de 124 px. Puis les lignes de champ : Éditeur et Année en lecture, Note en cinq étoiles (`StarRow`), puis deux interrupteurs, « Coup de coeur » (marque coeur) et « Lecture » (case à cocher), qui partagent avec les étoiles la même retouche optimiste (`useRetoucheOuvrage`) et le même message « Modification annulée : … » ; puis la ligne « Éditions » en lecture (`features/enrichissement/useEnrichissement.ts` : OpenLibrary interrogé 300 ms après le titre, réponse gardée pour la session, jamais bloquante). Avec l'écart de 8 px du conteneur, deux lignes de champ de 44 px se suivent à un pas de 52 px. Sous la dernière ligne (« Éditions »), une rangée d'actions calée à droite, 16 px au-dessus, écart 8 px, porte « Supprimer » (icône `trash-2`, danger) puis « Modifier » (icône `edit-2`, encre). Quand on presse « Supprimer », la question « Supprimer cet ouvrage du fonds ? » remplace la rangée à la même place, sous la même marge de 16 px : la question en Body sur sa propre ligne, puis 4 px dessous une rangée calée à droite, « Garder » (encre) et « Supprimer » (danger, `trash-2`), écart 8 px. Rien ne s'ouvre, rien ne se superpose ; la fiche s'allonge de la hauteur de la question, et « Garder » rend la rangée d'actions telle qu'elle était. La section des notes de lecture suit, 24 px plus bas.

**Section des notes** (`features/notes/NotesOuvrage.tsx`, sous la rangée d'actions de la fiche) : 24 px (`space.xl`) sous la rangée ou la question, une colonne à écart 8 px, sur la même largeur de contenu que la fiche (rembourrage 16 px hérité). D'abord la ligne d'en-tête : 44 px (`touchTarget`, `minHeight`), filet inférieur de 1 px, « Notes de lecture » en Body strong à gauche et le compte en Figure encre secondaire à droite (« 3 notes », « 1 note » ; absent pendant le chargement et en erreur). Puis le champ multiligne « Nouvelle note » (`TextAreaField`) sur la grammaire des lignes de champ : étiquette sur 112 px, texte tapé à 152 px, 44 px minimum, grandit avec le texte, filet. Puis la rangée d'action calée à droite, écart 12 px, sans marge propre (les 8 px de la colonne) : « Note ajoutée » en Small encre secondaire quand un ajout vient de réussir, puis « Ajouter la note » en signal avec `plus`. Puis la liste (`role="list"`), ouverte par un filet de 1 px en haut : chaque note est un bloc fermé par un filet, avec une méta-ligne de 44 px (horodatage en Figure encre secondaire à gauche, bouton-icône corbeille 44 × 44 à droite), le contenu en Body encre avec 44 px de rembourrage à droite, sous la colonne de la corbeille, et 12 px de rembourrage en bas. Vide : message d'état (`edit-3`, « Aucune note de lecture », « La première note dit à qui conseiller cet ouvrage. »). Chargement : deux lignes de squelette (120 × 10 puis 85 % × 10, écart 8) à 12 px d'écart, 12 px de rembourrage vertical, `role="progressbar"`. Erreur : message d'état en danger avec « Réessayer ». Un échec de suppression écrit « Suppression annulée : … » en Small danger, `role="alert"`, 4 px sous la liste.

**Formulaire d'ouvrage** (`features/books/FormulaireOuvrage.tsx`, routes `nouveau.tsx` et `[id]/modifier.tsx`) : même cadre, même contenu défilant rembourré à 16 px. Titre d'écran en Title avec 16 px en dessous, puis le formulaire en colonne à écart 8 px : quatre lignes de saisie (Titre, Auteur, Éditeur, Année) et l'interrupteur « Lecture », toutes de 44 px, au même pas de 52 px que la fiche. La ligne de saisie est de hauteur fixe 44 px (le filet est compris dedans), étiquette de 112 px, écart 12 px, puis la zone de saisie `flex: 1` dont le retrait gauche de 28 px (case d'icône 20 + écart 8) fait commencer le texte tapé à 152 px du bord du contenu, exactement sur la colonne des valeurs de la fiche. Le message d'un champ invalide se pose 4 px sous la ligne, retiré de 152 px pour tomber sur la même colonne. L'alerte globale a 12 px au-dessus ; le bouton de reprise après conflit est sur sa propre ligne, calé au bord du contenu par une marge négative de 12 px qui annule son rembourrage. La rangée d'actions vient 16 px sous la dernière ligne, calée à droite, écart 8 px entre « Annuler » et « Enregistrer ».

**Barre d'annulation** (`components/UndoBar.tsx`, rendue par `features/books/SuppressionProvider.tsx` depuis `app/_layout.tsx`, sous tout le contenu) : une bande de 48 px (`chromeHeight`, `minHeight`) sur `surface` en bas de la fenêtre, fermée en haut par un filet, rembourrage 16 px à gauche et 8 px à droite, écart 8 px. Elle est dans le flux, pas au-dessus : la colonne de contenu (liste et volet) fait `flex: 1` et se raccourcit de 48 px pendant que la barre est là. À gauche le texte en Body sur `flex: 1` ; à droite le bouton texte de rattrapage, et, dans la variante d'échec, « Fermer » avant lui. Une seule suppression est en attente à la fois (`SuppressionProvider`), donc une seule barre ; une deuxième demande envoie la première sans attendre.

**Préférences** (`features/preferences/PreferencesProvider.tsx`, `services/stockage.ts`, `theme/ThemeProvider.tsx`) : le thème (`'systeme' | 'clair' | 'sombre'`, `systeme` par défaut) et la langue (`'fr' | 'en'`, `fr` par défaut) sont lus dans `AsyncStorage` (`preferences.theme`, `preferences.langue`) après le premier rendu, les valeurs par défaut s'appliquant jusque-là, et écrits à chaque bascule ; un stockage plein, corrompu ou absent rend la valeur par défaut sans casser l'application. `ThemeProvider` reçoit la préférence : `systeme` suit `useColorScheme`, les deux autres l'ignorent, et `color-scheme` sur `document.documentElement` suit le schéma actif. Le bouton du bandeau lit le schéma rendu et pose l'inverse (`clair` ou `sombre`) : dès qu'on l'a pressé une fois, le thème ne suit plus le système, il n'y a pas de troisième position dans l'interface.

**Ligne de champ** (`FieldRow`, `ToggleRow`) : rangée `minHeight 44` (`touchTarget`), rembourrage vertical 8 px, écart 12 px entre étiquette et valeur, filet inférieur de 1 px. Étiquette en Rubric encre secondaire sur une colonne fixe de 112 px (`layout.fieldLabel`). Zone de valeur `flex: 1` : une case d'icône fixe de 20 px (`layout.iconCase`, toujours présente, même vide, pour que les valeurs s'alignent) puis la valeur en Body, écart 8 px. Dans l'interrupteur, la case de 20 px est la case à cocher elle-même. Dans la ligne des étoiles (`StarRow`), la zone de valeur commence par cinq cibles de 32 × 44 px décalées de −6 px ((32 − 20) / 2) pour que le centre de la première tombe sur le centre de la case d'icône, l'étoile de 16 px centrée dans chacune, puis la valeur en Body à 8 px de la dernière cible. Dans la ligne « Couverture », la case n'existe pas : les boutons texte commencent à 124 px, l'icône du premier occupe la place de la case et son libellé tombe à 144 px, 8 px avant la colonne des valeurs. Dans la ligne de saisie (`FormField`), la case n'existe pas comme élément : sa largeur et son écart deviennent le retrait gauche de 28 px du champ. Dans le champ multiligne (`TextAreaField`), la ligne garde l'étiquette de 112 px, l'écart de 12 px et le retrait de 28 px, mais perd sa hauteur fixe : 44 px minimum, alignée en haut, elle grandit avec le contenu (`onContentSizeChange`) ; l'étiquette se cale sur la première ligne par 14 px de retrait haut ((44 − 16) / 2) et le texte par 12 px de rembourrage vertical ((44 − 20) / 2), de sorte qu'une note d'une ligne fait exactement une ligne de champ.

**Ligne d'ouvrage** (`rowHeight = 56`) : rembourrage horizontal 16 px, écart 12 px entre les quatre zones. Colonne d'état de 40 px (`statusColumn`) contenant deux cases fixes de 16 px espacées de 4 px : la coche « lu » (encre secondaire) puis le coeur « coup de coeur » (signal) ; les cases restent en place même vides pour que les titres s'alignent. Puis la vignette de couverture, 28 × 40 px (`VIGNETTE` dans `components/BookRow.tsx`), `CoverImage` ou son substitut, toujours présente pour que les titres s'alignent aussi. Zone de texte `flex: 1` avec 2 px entre titre et légende. Note à droite, 32 px minimum, alignée à droite. Filet inférieur de 1 px. La liste est virtualisée (`FlatList`, `getItemLayout` sur 56 px, 20 lignes initiales).

**Rythme d'espacement** (`space`) : 4 / 8 / 12 / 16 / 24 / 32. Les rembourrages horizontaux de contenu sont à 16, les écarts internes à 12 ou 8, les micro-écarts (icône-libellé, cases d'état, message sous un champ) à 4, les messages d'état à 32 vertical / 24 horizontal ; 24 sépare la rangée d'actions de la fiche de la section des notes, seul emploi de `space.xl` en colonne. Toute cible interactive fait au moins 44 px (`touchTarget`) en hauteur, et en largeur pour les onglets.

**Points de rupture** : un seul, 960 px, décidé par `useWindowDimensions` et non par une requête média.

## Elevation & Depth

Le système est plat, à une exception près, prévue par la direction et livrée au lot 2 : la surcouche. `theme/tokens.ts` définit un seul jeton d'ombre, `overlayShadow`, et un seul composant le porte, le menu de tri, qui flotte sous la ligne de compte au-dessus de la liste le temps d'un choix. Tout ce qui est dans le flux reste sans ombre : la profondeur y est rendue par deux moyens seulement, le passage de `page` à `surface` (bandeau, ligne survolée ou sélectionnée, rangée cochée du menu) et les filets de 1 px. Le bandeau n'est pas « au-dessus » de la liste ; il est une bande de surface fermée par un filet. Le volet de fiche n'est pas non plus « au-dessus » de la liste : il est une colonne de `page` derrière un filet vertical, et son en-tête de 56 px porte un filet qui rejoint celui de la première ligne de la liste à la même ordonnée. Le formulaire occupe la même colonne avec le même en-tête ; la section des notes prolonge la fiche vers le bas ; ni l'un ni l'autre n'est une boîte de dialogue ni une surcouche. La couverture est plate elle aussi : une image à rayon 2 px sur `surface`, sans ombre, sans cadre en relief, sans reflet ; son substitut est un aplat `surface` fermé par un filet.

Le menu de tri est une surcouche pour une raison précise : il ne change pas le contenu de la page mais son ordre, et il se retire dès qu'on a choisi ; il n'a donc pas de place dans le flux, où il décalerait la liste qu'il trie. Il est fait des matériaux du système, `page`, un filet de bordure, des rangées de 44 px sur filets, et l'ombre ne fait que le décoller du plan de la page ; elle est plus dense en sombre (0,6 contre 0,12) parce qu'une ombre grise sur une page presque noire ne se lit pas autrement. La confirmation de suppression (d'un ouvrage comme d'une note) reste en ligne, et la barre d'annulation reste dans le flux : aucune des deux ne porte l'ombre.

### Shadow Vocabulary
- **Surcouche** (`overlayShadow`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12)` en clair ; `0 4px 12px rgba(0, 0, 0, 0.6)` en sombre) : un menu ancré sous sa commande, qui flotte au-dessus du contenu le temps d'un choix et se retire au choix, à Échap ou au clic ailleurs. Aucun autre emploi : ni carte, ni survol, ni volet, ni barre.

### Named Rules
**La règle du plat.** Pas d'ombre sur ce qui est dans le flux, pas de dégradé, pas de bordure de plus d'un pixel. Un état se lit par un changement de fond (`page` → `surface`), de couleur d'encre ou de filet, en 150 ms. La seule ombre du système est `overlayShadow`, et elle ne se pose que sur une surcouche ancrée ; une bande, une question, une section ou une ligne n'en portent jamais.

**La règle de la surcouche ancrée.** Une surcouche s'ancre sous la commande qui l'ouvre, sur `page`, bordée d'un filet de 1 px en `rule`, portée par `overlayShadow`, et ne contient que des lignes du système : rangées de 44 px sur filets, la cochée sur `surface`, une indication en Small. Elle se ferme au choix, à Échap et au clic sur le voile, et rend le focus à sa commande. Le système en compte une, le menu de tri ; une deuxième reprendrait cette grammaire à l'identique.

**La règle des filets qui se rejoignent.** Quand deux zones se côtoient derrière un filet vertical, leurs filets horizontaux tombent à la même ordonnée : l'en-tête du volet fait la hauteur d'une ligne d'ouvrage (56 px) pour cette seule raison.

## Shapes

Formes carrées et filets droits. Le seul rayon du système est `radius.sm = 2`, appliqué aux blocs de squelette, à la case à cocher de 20 × 20 px de l'interrupteur (bordure 1 px, aucun fond dans les deux états) et, depuis le lot 3, à la couverture et à son substitut (28 × 40 px en liste, 80 × 120 px en fiche) : la couverture est le seul rectangle plein du système, et son rayon dit qu'elle est une image posée sur la page, pas une carte. Deux formes rondes existent par calcul, pas par jeton : le point de synchronisation (8 px, `borderRadius: 4`) et le bloc de squelette de la colonne d'état (16 px, `borderRadius: height / 2`). Les boutons, onglets, champs et lignes n'ont aucun rayon et aucune bordure propre : le champ de recherche n'a pas de contour, son filet est le filet inférieur du bandeau ; un champ du formulaire n'a pas de contour non plus, son filet est le filet inférieur de sa ligne, le même que celui d'une ligne de la fiche. La case à cocher, le menu de tri et le substitut de couverture sont les trois seules bordures fermées du système, toutes à 1 px ; le menu est bordé en `rule` sans rayon, la case en encre à rayon 2 px, le substitut en `rule` à rayon 2 px. L'interrupteur « Coup de coeur » n'a pas de case bordée : sa case de 20 px porte le coeur Feather seul, en encre secondaire à « Non » et en signal à « Oui ». Le bouton-icône est un carré de 44 px sans fond, sans bordure et sans rayon : seule l'icône se voit. Le champ multiligne n'a pas plus de contour que le champ d'une ligne ; son filet grandit avec lui.

Les icônes sont Feather (`@expo/vector-icons/Feather`), 16 px, trait unique de 2 px, dans une case fixe : 16 px dans la colonne d'état de la liste, 20 px (`layout.iconCase`) dans la zone de valeur de la fiche, où l'icône est centrée ; la seule exception de taille est l'icône d'un message d'état à 24 px. Elles sont décoratives (`aria-hidden`) sauf quand un libellé leur est fourni. Les boutons texte du formulaire et de la fiche en portent une à gauche du libellé (`check` pour « Enregistrer », `edit-2` pour « Modifier », `trash-2` pour « Supprimer », dans la rangée comme dans la question, `refresh-cw` pour la reprise du serveur et pour « Réessayer », `rotate-ccw` pour « Annuler » dans la barre d'annulation, `plus` pour « Ajouter la note ») ; « Annuler » sous le formulaire, « Garder » et « Fermer » n'en portent pas. Le tri emploie `arrow-up` / `arrow-down` pour le sens, dans le déclencheur et à droite de la rangée cochée, et `check` dans la case de cette rangée. La corbeille `trash-2` et la lune ou le soleil du thème sont les seules icônes livrées sans libellé visible, dans un bouton-icône : l'icône reste `aria-hidden`, c'est le bouton qui porte l'`aria-label` (« Supprimer la note du 28 juil. 2026, 21:22 », « Passer en thème sombre »). Depuis le lot 3 : `book` à 16 px en encre secondaire au centre du substitut de couverture ; `image` devant « Remplacer la couverture » et `rotate-ccw` devant « Revenir à la couverture d'origine » ; `moon` en clair et `sun` en sombre dans le bouton-icône de thème. Sous 960 px, « Ajouter un ouvrage » devient un bouton-icône `plus` en signal dans la première rangée du bandeau. L'étoile de la note n'est pas une icône de la fonte : `components/StarIcon.tsx` dessine le tracé de l'étoile Feather en SVG (`react-native-svg`, `viewBox` 0 0 24, trait 2 px arrondi) à 16 px (`iconSize`), parce qu'une étoile allumée doit se remplir et que la fonte ne livre que le contour ; éteinte, contour en encre secondaire sans remplissage ; allumée, remplissage et trait en encre ; `aria-hidden`, le bouton radio qui la porte a le libellé. Aucune icône hors Feather n'existe dans le rendu. L'état vide des notes emploie `edit-3` à 24 px. La ligne de progression de la barre d'annulation est un trait de 2 px de signal posé sous le filet, à l'intérieur de la barre, sans rayon ; ce n'est pas une bordure, et elle se retire par `scaleX` ancré à gauche.

## Components

Grammaire commune : tout élément pressé passe à `opacity 0.7`, tout élément désactivé à `opacity 0.5`, tout changement de fond, de couleur de bordure ou d'opacité dure 150 ms en `ease-out` (`theme/transitions.ts`, web uniquement). Le focus clavier est l'anneau global : 2 px de signal, décalé de 2 px.

### Buttons
- **Shape :** rectangle sans rayon ni fond (0 px), hauteur minimale 44 px, rembourrage horizontal 12 px, écart icône-libellé 4 px.
- **Primary (`button-text`) :** texte en Body strong, ton signal, icône Feather 16 px optionnelle du même ton (« + Ajouter un ouvrage », « ✓ Enregistrer »). C'est l'action primaire du système : un texte vert, jamais un aplat.
- **Ink / Danger (`button-text-ink`, `button-text-danger`) :** même forme, ton encre pour une action neutre (« ‹ Fonds », « × Fermer » dans l'en-tête, « Modifier » sous la fiche, « Annuler » et « Reprendre la version du serveur » sous le formulaire, « Remplacer la couverture » et « Revenir à la couverture d'origine » dans la ligne « Couverture », « EN » / « FR » au bout du bandeau, dont le libellé parlé, `accessibilityLabel`, dit l'action : « Switch to English », « Passer en français »), ton danger pour une action destructive.
- **Hover / Focus :** aucun changement de fond au survol ; pressé à 0,7 d'opacité ; focus par l'anneau global.
- **Disabled :** 0,5 d'opacité, `aria-disabled`. Pendant une soumission, le bouton primaire est désactivé et son libellé devient un libellé de progression (« Enregistrement… ») ; aucun indicateur d'attente distinct. Même grammaire pour « Ajouter la note », relibellé « Ajout… », et pour « Remplacer la couverture », relibellé « Envoi… » pendant le choix du fichier, l'envoi ou le retrait, avec « Revenir à la couverture d'origine » désactivé en même temps.
- **Focus à l'arrivée :** `autoFocus` (référence + effet appelant `focus()`) porte le focus sur le bouton dès son montage. Il sert à l'action de refuge, jamais à l'action destructive : « Garder » quand la question apparaît, « Annuler » quand la barre d'annulation apparaît, et « Supprimer » quand la rangée d'actions revient après « Garder », pour rendre le focus au bouton qui a posé la question. Depuis le lot 2, `useAutoFocus(actif, apres)` porte aussi le focus sur la rangée cochée quand le menu de tri s'ouvre, sur le déclencheur quand il se ferme, sur la corbeille d'une note quand sa question se retire par « Garder », et, après la suppression d'une note, sur la corbeille de la note suivante (à défaut la précédente, à défaut « Ajouter la note »), le rappel `onAutoFocus` effaçant le refuge une fois pris.

Il n'existe ni bouton plein, ni bouton contour dans le rendu livré.

**Bouton-icône (`icon-button`, `components/IconButton.tsx`).** Un carré de 44 × 44 px (`touchTarget`) sans fond, sans bordure et sans rayon, `role="button"`, `aria-label` obligatoire, une icône Feather de 16 px centrée, ton encre secondaire par défaut (`tone` accepte les tons de `theme/tone.ts`) ; pressé à 0,7, focus par l'anneau global, `autoFocus` par `useAutoFocus`. Trois emplois livrés : la corbeille d'une note, dont le libellé cite l'horodatage ; la bascule de thème au bout du bandeau (`moon` en clair, `sun` en sombre ; « Passer en thème sombre » / « Passer en thème clair ») ; et, sous 960 px seulement, « Ajouter un ouvrage » en `plus` ton signal dans la première rangée du bandeau, où le libellé ne tient pas à côté de la recherche, de la synchronisation et des préférences. Il ne remplace un bouton texte que là où le libellé ferait doublon avec le contexte (une méta-ligne), là où l'icône est le mot (la lune et le soleil) ou là où la place manque (le `plus` sous 960 px) ; sous la fiche, « Supprimer » garde son libellé, et le bouton de langue reste un bouton texte.

**Rangée d'actions.** Sous une fiche ou un formulaire, les actions se présentent en rangée calée à droite, 16 px sous la dernière ligne de champ, écart 8 px, sans filet ni fond : l'action neutre en encre à gauche (« Annuler »), l'action primaire en signal avec sa coche à droite (« Enregistrer ») ; sous la fiche, la destructive en danger à gauche (« Supprimer », `trash-2`) et la neutre en encre à droite (« Modifier », `edit-2`) : l'action la plus à droite est toujours celle qui ne détruit rien. Une action de récupération (« Reprendre la version du serveur ») ne se mêle pas à cette rangée : elle prend sa propre ligne, alignée au bord du contenu par une marge négative de 12 px. Sous la section des notes, la rangée est courte et tient 8 px sous le champ, avec un écart de 12 px : après un ajout réussi, « Note ajoutée » en Small encre secondaire (`role="status"`), puis « Ajouter la note » en signal avec `plus`, désactivé à 0,5 et relibellé « Ajout… » pendant la requête.

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
- **Marque coeur (`mark="heart"`, `toggle-heart`, `toggle-heart-checked`) :** pour « Coup de coeur », la case de 20 px ne porte pas de case bordée mais le coeur Feather de 16 px, encre secondaire à « Non », signal à « Oui » ; libellés « Oui » / « Non » en Body encre. Même `role="switch"`, même `aria-busy`, même ligne pressable.
- **Busy :** `aria-busy` pendant la mutation optimiste ; la ligne ne change pas d'aspect. « Coup de coeur » et « Lecture » partagent la même retouche (`useRetoucheOuvrage`) : une pression pendant la mutation est ignorée et le message d'échec est commun. Si la modification est annulée par le serveur, un message en Small danger (« Modification annulée : … »), `role="alert"`, s'affiche 12 px sous la dernière ligne ; aucun fond, aucune icône. Dans le formulaire, la même ligne sert de champ « Lecture », sans état busy.

### Inputs / Fields (TextAreaField)
Le champ multiligne (`components/TextAreaField.tsx`) : une ligne de champ qui grandit.
- **Style (`textarea-field`) :** rangée alignée en haut, 44 px minimum, filet inférieur de 1 px, écart 12 px ; étiquette en Rubric encre secondaire sur 112 px, retirée de 14 px en haut pour se caler sur la première ligne ; `TextInput` `multiline` étiré sur `flex: 1`, 44 px minimum, 12 px de rembourrage vertical, retrait gauche de 28 px pour que le texte commence à 152 px comme dans la fiche ; saisie en Body encre (`fontFamily`, `fontSize.body`, `lineHeight.body`, `tabular-nums`), aucun contour, aucun fond, aucun rayon, `textAlignVertical: top`, `aria-label` = étiquette, `maxLength` (1 000 pour une note).
- **Croissance :** la hauteur suit `onContentSizeChange` ; le champ part d'une ligne et s'allonge ligne à ligne sans défilement interne, la fiche défile.
- **Texte indicatif :** en encre secondaire, il dit l'usage attendu (« À qui le conseiller, et pourquoi »).
- **Focus :** anneau global ; curseur et sélection en signal (`selectionColor`).
- **Error (`textarea-field-invalid`) :** comme `FormField` : filet et étiquette en danger en 150 ms (`transitionEtat`), message en Small danger `role="alert"` 4 px sous la ligne, retiré de 152 px ; texte en encre. La validation se fait à « Ajouter la note » (`contenuNoteSchema` : « Écrivez la note avant de l'ajouter », « 1000 caractères maximum »), les erreurs du serveur tombent sur le même message, et l'erreur s'efface à la frappe suivante.

### Menu de tri (SortMenu)
Une commande de la ligne de compte et sa surcouche (`components/SortMenu.tsx`), la seule du système.
- **Déclencheur (`sort-trigger`, `sort-trigger-open`) :** dans la ligne de compte, calé à droite, `role="button"`, `aria-expanded`, `aria-label` « Tri : Titre, croissant » ; libellé en Figure « Tri : Titre » et flèche `arrow-up` / `arrow-down` de 16 px, écart 4 px, 28 px de haut (`tallyHeight`) avec un `hitSlop` de 8 px en haut et en bas pour une cible de 44 px ; encre secondaire au repos, encre quand le menu est ouvert (le libellé en 150 ms par `transitionEtat`) ; pressé à 0,7. Presser le déclencheur ouvert ferme le menu.
- **Menu (`sort-menu`) :** `role="radiogroup"` « Trier le fonds », en absolu sous le déclencheur (`top = 28`, `right = 0`), 220 px minimum, sur `page`, bordure 1 px `rule`, `overlayShadow`, 8 px de rembourrage bas ; voir Layout › Menu de tri et Elevation & Depth.
- **Rangées (`sort-option`, `sort-option-checked`) :** `role="radio"`, `aria-checked`, 44 px minimum, 16 px de côté, écart 8 px, filet inférieur : case d'icône de 20 px (coche en encre si cochée), libellé en Body encre sur `flex: 1`, flèche de sens en encre secondaire à droite de la cochée ; la cochée sur `surface`, les autres sur `page`, en 150 ms ; pressée à 0,7 ; `aria-label` de la cochée « Titre, croissant ».
- **Indication (`sort-hint`) :** Small encre secondaire sous les rangées, 8 px au-dessus, 16 px de côté : « Choisir à nouveau le même critère inverse l'ordre. »
- **Comportement :** choisir ferme le menu ; le même critère inverse le sens, un autre prend son sens par défaut (croissant ; décroissant pour la note). Échap ferme le menu seul (pile de `useEscape` : le dernier gestionnaire inscrit répond), le voile ferme au clic ailleurs. Focus sur la rangée cochée à l'ouverture, retour au déclencheur à la fermeture, quelle qu'en soit la cause.

### Section des notes (NotesOuvrage)
La suite de la fiche : une section sur filets, jamais un onglet ni une carte. Géométrie dans Layout › Section des notes.
- **En-tête (`notes-heading`, `notes-count`) :** ligne de 44 px sur filet, « Notes de lecture » en Body strong encre à gauche, le compte en Figure encre secondaire à droite. Aucune icône, aucune capitale espacée.
- **Saisie :** `TextAreaField` « Nouvelle note » ; puis la rangée d'action (« Note ajoutée » en `role="status"`, `notes-status` ; « Ajouter la note »). Après un succès, le champ se vide et le statut reste jusqu'à la frappe suivante.
- **Liste :** `role="list"` étiquetée « Notes de lecture », filet en haut, notes en `NoteRow` ; vide, chargement et erreur passent par le message d'état et le squelette.
- **Échec de suppression (`notes-alert`) :** « Suppression annulée : … » en Small danger `role="alert"`, 4 px sous la liste ; la note reprend sa place.

### Note (NoteRow)
Un bloc de la liste des notes (`components/NoteRow.tsx`), `role="listitem"`, fermé par un filet, 12 px de rembourrage bas.
- **Méta-ligne (`note-meta`) :** 44 px minimum, horodatage en Figure encre secondaire à gauche, bouton-icône `trash-2` (44 × 44, encre secondaire, `aria-label` « Supprimer la note du … ») calé à droite.
- **Contenu (`note-row`) :** Body encre, retour à la ligne libre, 44 px de rembourrage à droite pour ne jamais passer sous la colonne de la corbeille.
- **Question :** presser la corbeille remplace la méta-ligne par la confirmation en ligne (« Supprimer cette note ? », « Garder » en encre avec le focus, « Supprimer » en danger avec `trash-2`), rembourrée de 8 px en haut et en bas ; le contenu reste visible dessous. « Garder » rend la méta-ligne et le focus à la corbeille.
- **Après « Supprimer » :** la note quitte la liste aussitôt (`useSupprimerNote`, retrait optimiste du cache) ; si le serveur refuse, elle revient et la section affiche « Suppression annulée : … ». Pas de barre d'annulation pour une note. Le focus va sur la corbeille de la note suivante, à défaut de la précédente, à défaut sur « Ajouter la note ».

### Navigation (RubricBar)
- **Style :** onglets `role="tab"` dans un `tablist`, 44 × 44 px minimum, rembourrage horizontal 12 px, libellé en Rubric, filet inférieur de 1 px.
- **Default :** libellé encre secondaire, filet transparent.
- **Active :** libellé signal, filet signal. C'est le seul soulignement du système.
- **Hover :** aucun ; pressé à 0,7.
- **Mobile :** sous 960 px, la barre devient un `ScrollView` horizontal sans indicateur, sur sa propre rangée de 48 px.

### Navigation (ScreenHeader)
L'en-tête d'un écran d'ouvrage (fiche, création, modification, via `CadreOuvrage`) a deux modes, décidés par la largeur, jamais par la plateforme.
- **Écran (`screen-header-ecran`, sous 960 px) :** bande de 48 px (`minHeight`) sur `surface`, rembourrage horizontal 8 px, comme le bandeau de tête. À gauche un bouton texte encre « ‹ Fonds » (icône `chevron-left`) qui ramène à la liste ; à droite la marque de synchronisation. Un filet suit la bande.
- **Volet (`screen-header-volet`, à 960 px et plus) :** rangée de 56 px (`rowHeight`), hauteur fixe, sur `page`, rembourrage horizontal 8 px, avec son propre filet inférieur pour qu'il rejoigne celui de la première ligne d'ouvrage. Un seul bouton texte encre « × Fermer » (icône `x`) calé à droite ; pas de marque de synchronisation, le bandeau de la liste la porte déjà. La touche Échap ferme le volet (`hooks/useEscape.ts`, web uniquement, actif seulement en mode volet), pour la fiche comme pour les deux formulaires ; les gestionnaires forment une pile et seul le dernier inscrit répond, donc Échap ferme d'abord le menu de tri s'il est ouvert, puis le volet.

### Field row (FieldRow)
La ligne d'une liste de définitions ; c'est le composant signature de la fiche, et la forme que reprennent l'interrupteur et la ligne de saisie.
- **Style :** rangée non pressable, hauteur minimale 44 px, rembourrage vertical 8 px, aucun rembourrage horizontal propre (les 16 px viennent du conteneur), écart 12 px, filet inférieur de 1 px en `rule`.
- **Étiquette :** Rubric encre secondaire, colonne fixe de 112 px (`layout.fieldLabel`), texte tel quel (« Éditeur », « Coup de coeur ») mis en capitales par la variante.
- **Case d'icône :** 20 px de large (`layout.iconCase`), centrée, toujours rendue même vide ; quand une icône est fournie (le coeur du coup de coeur), elle est en Feather 16 px ton signal.
- **Valeur :** Body encre, à 8 px de la case ; `muted` la passe en encre secondaire pour une valeur absente (« Sans note », « Éditeur inconnu »). Aucune valeur n'est mise en graisse.

### Couverture (CoverImage, CouvertureOuvrage)
L'image du système, et la seule : une couverture cadrée, jamais une illustration.
- **Image (`cover-thumb`, `cover-fiche`, `components/CoverImage.tsx`) :** `expo-image` à taille fixe passée en propriétés (28 × 40 px dans la ligne d'ouvrage, 80 × 120 px en tête de fiche), `contentFit="cover"` (recadrée, jamais étirée), `cachePolicy="memory-disk"`, `recyclingKey` = l'URI, fondu de 150 ms (`motion.quick`) à l'arrivée, rayon 2 px (`radius.sm`), fond `surface` le temps du chargement ; `alt` et `accessibilityLabel` « Couverture de Titre ».
- **Substitut (`cover-standin`) :** même taille, même rayon, fond `surface`, filet de 1 px en `rule`, glyphe Feather `book` de 16 px en encre secondaire au centre ; `role="img"` avec le même libellé (« Sans couverture » quand le champ est vide). Il prend la place d'une couverture absente (`{ repli: true }`) comme d'une couverture dont le chargement échoue (`onError`) : la page ne montre jamais une image cassée.
- **Source :** `services/api/couvertures.ts › resoudreCouverture` est le seul endroit qui lit le champ `couverture` : un chemin relatif est préfixé de l'URL de l'API, une URL absolue est laissée telle quelle, vide ou nul donne le substitut. `services/plateforme/image.ts` réduit toute image choisie à 600 px de large (`LARGEUR_COUVERTURE_MAX`) en JPEG à 0,8 avant l'envoi ; une photo brute ne quitte jamais l'appareil.
- **Tête de fiche (`features/books/CouvertureOuvrage.tsx`) :** la couverture à gauche, et à 16 px le titre en Title puis l'auteur en Lead encre secondaire ; la zone de texte a 4 px de retrait haut et l'auteur 4 px sous le titre. Le squelette de la fiche ne rejoue pas encore cette tête (barre de titre 70 % × 16 sans bloc de couverture).
- **Ligne « Couverture » (`cover-row`) :** 16 px sous la tête, une ligne de champ de 44 px sur filet, étiquette Rubric sur 112 px, écart 12 px, dont la valeur est une rangée de boutons texte encre à retour à la ligne, calée par une marge de −12 px : « Remplacer la couverture » (`image`) toujours, « Revenir à la couverture d'origine » (`rotate-ccw`) seulement quand une couverture a été envoyée (`/covers/…` non `.svg`). Pendant le choix, l'envoi ou le retrait, le premier se relibelle « Envoi… » et les deux se désactivent à 0,5. Un refus écrit « Couverture refusée : … » en Small danger `role="alert"` (`cover-alert`), 8 px dessous, retiré de 124 px.

### Étoiles (StarRow)
La note d'un ouvrage, lue et donnée dans la même ligne de champ (`components/StarRow.tsx`).
- **Style (`star-row`) :** rangée de 44 px minimum sur filet, étiquette Rubric « Note » sur 112 px, écart 12 px ; dans la zone de valeur, un `radiogroup` étiqueté « Note » (`aria-busy` pendant la retouche) de cinq cibles `role="radio"` de 32 × 44 px (`star-target`, `star-target-unlit`), `hitSlop` de 6 px de chaque côté pour une cible de 44 × 44, décalées de −6 px pour que la première tombe sur la case d'icône, `transitionEtat` (150 ms) sur chacune ; puis la valeur en Body à 8 px : « 2/5 » en encre, « Sans note » en encre secondaire.
- **Étoile :** `StarIcon` de 16 px (`iconSize`), le tracé Feather en SVG : éteinte, contour de 2 px en encre secondaire sans remplissage ; allumée, remplissage et trait en encre ; `aria-hidden` ; allumées de la première à la note courante. Jamais en signal, jamais en rouge, jamais une fonte d'icônes tierce.
- **Libellés :** chaque étoile dit « Noter 3 sur 5 » ; l'étoile courante (`aria-checked`) dit « Retirer la note ».
- **Comportement :** presser une étoile pose la note ; presser à nouveau l'étoile courante retire la note (`null`). La retouche est optimiste et partagée avec les deux interrupteurs (`useRetoucheOuvrage`) : une pression pendant la mutation est ignorée et l'échec écrit le même « Modification annulée : … ». Pressé à 0,7.

### Ligne « Éditions »
Une `FieldRow` ordinaire, dernière de la fiche, dont la valeur vient d'OpenLibrary (`features/enrichissement/useEnrichissement.ts`, `services/api/openLibrary.ts`) : « 12 référencées · première en 1965 » en encre quand des éditions sont trouvées (`trouve`) ; en encre secondaire (`muted`) pour « Recherche sur OpenLibrary… » (`recherche`, et `inactif` sans titre), « Aucune édition référencée » (`aucune`) et « OpenLibrary injoignable » (`indisponible`). La requête part 300 ms après le titre, la réponse est gardée pour la session sans nouvel essai, et la fiche ne dépend jamais de cette ligne : un service tombé n'est qu'un de ses états. Aucune icône, aucun lien, aucune vignette d'éditeur.

### Préférences du bandeau (BandeauFonds)
Les deux réglages qu'une boutique change à l'ouverture et à la fermeture, posés au bout du bandeau, jamais dans un menu ni une page de réglages.
- **Thème :** `IconButton` de 44 × 44 px, `moon` en clair et `sun` en sombre, encre secondaire, libellé « Passer en thème sombre » / « Passer en thème clair » ; presser pose `clair` ou `sombre` (l'inverse du schéma rendu) et l'écrit dans le stockage.
- **Langue (`preference-language`) :** `TextButton` encre, libellé visible = code de l'autre langue (« EN » en français, « FR » en anglais), libellé parlé = l'action (« Switch to English », « Passer en français ») ; presser bascule le dictionnaire et l'écrit dans le stockage ; tout l'écran se retraduit à chaud.
- **Groupe :** une rangée (`styles.preferences`) ouverte par un filet vertical de 1 px en `rule` (`Rule orientation="vertical"`, `aria-hidden`), retirée de 8 px en haut et en bas (le filet fait 32 px dans la bande de 48), 8 px de rembourrage à gauche, 4 px entre le filet, la lune et « EN » ; le filet sépare ce qui est réglage de ce qui est état.
- **Place :** à 960 px et plus, après la marque de synchronisation, dans l'ordre thème puis langue ; en dessous, au bout de la première rangée, après la recherche, le bouton-icône `plus` et la synchronisation ; les rubriques gardent la seconde rangée entière.

### Tally line
Ligne de compte de 28 px sous le bandeau : figures en encre secondaire, séparées par « · » (`aria-hidden`), `role="summary"`, retour à la ligne autorisé. Elle dit combien d'ouvrages ou de résultats, et « actualisation » quand une page se recharge. Depuis le lot 2, elle porte à droite le déclencheur de tri (voir Menu de tri) ; le compte reste sur `flex: 1` et le déclencheur ne rétrécit pas.

### State message
Un seul composant pour le vide, l'erreur et la fiche non ouverte : icône 24 px centrée (encre secondaire, ou danger pour une erreur), titre en Lead (`role="alert"` en erreur), description en Small encre secondaire, action optionnelle en bouton texte. Centré, largeur de texte 420 px maximum, rembourrage 32 / 24, écart 8 px. Aucun fond, aucune bordure. La fiche et l'écran de modification l'emploient en erreur (« Réessayer » avec icône `refresh-cw`) et quand l'adresse ne désigne aucun ouvrage.

### Skeleton
Blocs `skeleton` à rayon 2 px. La liste de chargement rejoue exactement la géométrie de la ligne (56 px, colonne d'état 40 px, rond de 16 px, barres de 45 % × 12 et 65 % × 10, note 32 × 10, filet), 8 lignes au premier chargement, 2 en pied de page pour la page suivante ; `role="progressbar"`, `aria-busy`. Le squelette de la fiche rejoue de même la fiche : une barre de titre 70 % × 16, une barre d'auteur 45 % × 12 avec 12 px en dessous, puis cinq lignes de champ de 44 px sur filet, chacune avec une barre d'étiquette de 64 × 10 dans la colonne de 112 px et une barre de valeur de 40 % × 10. L'écran de modification n'a pas de squelette propre : il ne rend rien tant que l'ouvrage n'est pas chargé. La section des notes rejoue ses notes en deux lignes de squelette (120 × 10 pour l'horodatage, 85 % × 10 pour le contenu, écart 8), à 12 px d'écart, 12 px de rembourrage vertical, sans filet ; `role="progressbar"`, « Chargement des notes ».

### Confirmation en ligne (ConfirmInline)
La question d'une action destructive, posée à la place de la rangée d'actions qu'elle remplace ; ni boîte de dialogue, ni surcouche, ni carte.
- **Style :** bloc `role="group"` dont l'`aria-label` est la question ; la question en Body encre sur sa propre ligne ; 4 px dessous, une rangée calée à droite, écart 8 px, sans filet ni fond. Il prend la marge de 16 px de la rangée qu'il remplace.
- **Actions :** la réponse sûre en encre à gauche (« Garder »), la réponse destructive en danger à droite (« Supprimer », `trash-2`) ; même ordre gauche-droite que la rangée qu'il remplace, la destructive garde sa couleur et son icône.
- **Focus :** « Garder » reçoit le focus au montage ; Entrée sans réfléchir conserve. Après « Garder », la rangée d'actions revient et « Supprimer » reprend le focus.
- **Après « Supprimer » :** le volet se ferme, la ligne s'estompe en 150 ms, et la barre d'annulation prend le relais en bas de la fenêtre.
- **Pour une note :** la même question (« Supprimer cette note ? ») remplace la méta-ligne de la note, avec 8 px de rembourrage vertical, et non une rangée d'actions ; mêmes réponses, même ordre, même focus ; après « Supprimer », pas de barre d'annulation, le focus va sur la corbeille de la note voisine.

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

**La règle de la question en place.** Une action destructive se confirme là où elle a été demandée : la question remplace la rangée d'actions, en Body, avec ses deux réponses calées à droite dans le même ordre, la sûre en encre à gauche, la destructive en danger à droite. Aucune boîte de dialogue, aucune surcouche, aucun fond ; la fiche s'allonge, rien ne se superpose. Pour une note, la question remplace la méta-ligne de la note, pas une rangée d'actions ; le contenu reste lisible dessous.

**La règle de la barre de chrome.** Le rattrapage d'une suppression est une bande de 48 px sur `surface` fermée par un filet, en bas de la fenêtre et dans le flux, comme le bandeau de tête l'est en haut. Son seul minuteur est une ligne de signal de 2 px qui se retire ; pas de carte flottante, pas de chiffres de compte à rebours, pas d'icône d'état. Une seule barre à la fois.

**La règle du refuge focalisé.** Quand une question ou une barre apparaît, le focus va sur l'action qui ne détruit rien : « Garder », « Annuler ». Quand la question se retire par « Garder », le focus revient au bouton qui l'a posée ; quand la barre se retire par « Annuler », il va sur la ligne remise dans le fonds ; quand elle expire en tenant encore le focus, sur la ligne voisine de celle qui a disparu, et à défaut sur la première ligne. Le bouton destructif n'a jamais le focus d'office, et le focus ne tombe jamais sur le vide. Le menu de tri suit la même règle : la rangée cochée à l'ouverture, le déclencheur à la fermeture. Une note supprimée passe le focus à la corbeille de la note suivante, à défaut de la précédente, à défaut à « Ajouter la note ».

**La règle du déclencheur dans la ligne.** Une commande qui règle la liste (le tri) vit dans la ligne de compte, calée à droite, en Figure comme le compte, avec une cible de 44 px obtenue par `hitSlop` et non par une hauteur de ligne plus grande ; elle suit la colonne de la liste, pas celle du volet. Jamais un bouton dans le bandeau, jamais une barre d'outils.

**La règle du bouton-icône libellé.** Un bouton-icône est un carré de 44 px sans fond ni bordure, avec un `aria-label` complet qui cite son objet (« Supprimer la note du 28 juil. 2026, 21:22 ») ; l'icône reste décorative. Il n'existe que là où un libellé ferait doublon avec le contexte (la méta-ligne d'une note), là où l'icône est le mot (la lune et le soleil du thème) ou là où la place manque (le `plus` d'« Ajouter un ouvrage » sous 960 px) ; partout ailleurs, l'action est un bouton texte, et le bouton de langue en est un.

**La règle de la section sur filet.** Une section de la fiche s'ouvre 24 px sous ce qui la précède par une ligne de 44 px sur filet, titre en Body strong à gauche et compte en Figure à droite ; ce qu'elle contient reprend la grammaire des lignes de champ et des rangées d'actions ; sa liste s'ouvre par un filet et chacun de ses blocs se ferme par un filet. Aucun fond, aucun onglet, aucune carte, aucun surtitre.

**La règle du champ qui grandit.** Un champ multiligne est une ligne de champ de 44 px qui s'allonge avec son texte : même étiquette de 112 px calée sur la première ligne, même colonne de valeur à 152 px, même filet, même rouge en cas d'erreur. Il ne défile jamais à l'intérieur ; c'est la page qui défile.

**La règle de la couverture cadrée.** Une couverture est une image à taille fixe, recadrée (`cover`), à rayon 2 px, sur `surface`, sans ombre ni cadre : 28 × 40 px dans une ligne, 80 × 120 px en tête de fiche. Quand elle manque ou ne se charge pas, un substitut de la même taille prend sa place, `surface` bordé d'un filet avec le glyphe `book` en encre secondaire ; la page ne montre jamais une image cassée, un cadre vide ni une image étirée, et les titres restent alignés.

**La règle de l'étoile qui s'efface.** La note se donne dans la ligne de champ qui la montre, en cinq étoiles radio de 16 px sur des cibles de 44 px, pleines en encre quand elles sont allumées, en contour encre secondaire quand elles sont éteintes ; l'étoile courante pressée à nouveau retire la note, et son libellé le dit (« Retirer la note »). Aucun bouton d'effacement, aucune valeur « 0 », aucun demi-point.

**La règle de la préférence retenue.** Le thème et la langue sont deux commandes au bout du bandeau, derrière un filet vertical, un bouton-icône `moon` / `sun` et un bouton texte « EN » / « FR », qui s'appliquent à chaud et s'écrivent aussitôt dans le stockage local (`preferences.theme`, `preferences.langue`) ; au prochain lancement, la valeur retenue reprend après le premier rendu, et un stockage défaillant rend la valeur par défaut sans rien casser. Ni menu, ni page de réglages, ni rechargement.

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
- **Do** poser une commande de la liste dans la ligne de compte, calée à droite, en Figure encre secondaire avec sa flèche `arrow-up` / `arrow-down`, cible de 44 px par `hitSlop` 8 / 8, encre quand elle est ouverte ; et la faire suivre la colonne de la liste (`tallyColumn` + `detailSpacer`).
- **Do** ancrer une surcouche sous sa commande : `page`, bordure 1 px `rule`, `overlayShadow`, rangées `role="radio"` de 44 px sur filets avec la case d'icône de 20 px, la cochée sur `surface` avec sa coche en encre et sa flèche, indication en Small ; voile transparent sur le panneau, Échap par la pile de `useEscape`, focus sur la cochée à l'ouverture et retour au déclencheur à la fermeture.
- **Do** dire le coup de coeur par le coeur Feather dans la case de 20 px de l'interrupteur (`mark="heart"`) : encre secondaire à « Non », signal à « Oui », libellé en Body encre ; garder la case à cocher bordée pour « Lecture ».
- **Do** ouvrir une section de la fiche 24 px sous la rangée d'actions par une ligne de 44 px sur filet, titre en Body strong et compte en Figure encre secondaire ; la composer en champ sur filet, rangée d'action à droite (écart 12 px, statut en Small `role="status"` avant le bouton) et liste `role="list"` ouverte par un filet.
- **Do** faire grandir un champ multiligne (`TextAreaField`) depuis 44 px par `onContentSizeChange`, étiquette calée sur la première ligne (retrait 14 px), texte à 12 px vertical et 28 px à gauche, filet et étiquette en danger quand il est invalide.
- **Do** composer une note comme un bloc sur filet : méta-ligne de 44 px (horodatage en Figure encre secondaire, bouton-icône `trash-2` de 44 × 44 à droite), contenu en Body avec 44 px de rembourrage à droite, 12 px en bas ; la question de suppression remplace la méta-ligne.
- **Do** donner à tout bouton-icône un `aria-label` qui cite son objet, 44 × 44 px, ton encre secondaire, aucune bordure ; et rendre le focus à la corbeille après « Garder », à la corbeille voisine ou à « Ajouter la note » après une suppression.
- **Do** afficher une couverture par `CoverImage` à taille fixe (28 × 40 px en liste, 80 × 120 px en fiche), `contentFit="cover"`, cache mémoire et disque, `recyclingKey`, fondu de 150 ms, rayon 2 px sur `surface` ; et remplacer une couverture absente ou en échec par le substitut de même taille (`surface`, filet `rule`, `book` en encre secondaire, `role="img"` libellé).
- **Do** résoudre le champ `couverture` en un seul endroit (`services/api/couvertures.ts`) : chemin relatif préfixé de l'URL de l'API, URL absolue laissée telle quelle, vide vers le substitut ; et réduire toute image choisie à 600 px de large en JPEG à 0,8 avant l'envoi.
- **Do** composer la tête de fiche couverture à gauche, titre et auteur à droite à 16 px, puis une ligne « Couverture » sur filet dont la valeur est faite de boutons texte encre (« Remplacer la couverture », `image` ; « Revenir à la couverture d'origine », `rotate-ccw`, seulement après un envoi), « Envoi… » désactivé pendant l'opération, « Couverture refusée : … » en Small danger `role="alert"` dessous.
- **Do** donner la note en cinq étoiles `role="radio"` dans un `radiogroup` étiqueté « Note », cibles de 32 × 44 px avec `hitSlop` et `transitionEtat`, `StarIcon` de 16 px (tracé Feather en SVG) pleine en encre allumée et en contour encre secondaire éteinte, valeur « 2/5 » en Body à droite ; l'étoile courante pressée à nouveau retire la note (« Retirer la note »).
- **Do** rendre la ligne « Éditions » en `FieldRow` : encre quand des éditions sont trouvées (« 12 référencées · première en 1965 »), encre secondaire pendant la recherche, sans résultat ou OpenLibrary injoignable ; la fiche ne dépend jamais de la réponse.
- **Do** poser les préférences au bout du bandeau : bouton-icône `moon` / `sun` libellé « Passer en thème sombre / clair », puis bouton texte encre « EN » / « FR » dont le libellé parlé dit l'action, le groupe ouvert par un filet vertical `Rule` (retrait 8 px, rembourrage 8 px, écarts 4 px) ; sous 960 px, elles ferment la première rangée après le bouton-icône `plus` en signal et la synchronisation, les rubriques gardant leur rangée ; les retenir dans `AsyncStorage` (`preferences.theme`, `preferences.langue`) par `services/stockage.ts`.
- **Do** tirer toute chaîne visible de `useTraduction()`, passer `t.validation` aux schémas du domaine, et `t.locale` à `formaterHorodatage` et à `toLocaleString`.

### Don't:
- **Don't** poser un fond de carte, une ombre, un dégradé ou une bordure de plus d'un pixel autour d'un bloc de contenu dans le flux ; `overlayShadow` n'existe que pour une surcouche ancrée qui se retire.
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
- **Don't** mettre le tri dans le bandeau, dans une barre d'outils ou dans le volet ; il vit dans la ligne de compte, au-dessus de la liste qu'il trie.
- **Don't** titrer une section de la fiche en Title, en capitales espacées ou avec une icône ; Body strong sur une ligne de 44 px et un filet.
- **Don't** remplacer un bouton texte par un bouton-icône quand un libellé tient ; la corbeille d'une note et la bascule de thème sont les seuls boutons-icônes, et leur `aria-label` cite l'objet ou dit l'action.
- **Don't** donner au champ multiligne un contour, un fond, une hauteur fixe ni un défilement interne ; il grandit sur son filet et la page défile.
- **Don't** laisser une surcouche sans voile, sans Échap ni retour du focus, ni l'agrandir au-delà de lignes de 44 px sur filets ; jamais de rayon, jamais de deuxième ombre.
- **Don't** afficher une image cassée, un cadre vide ou une couverture étirée ; une couverture manquante ou en échec est le substitut, à la même taille, et une couverture ne porte ni ombre ni cadre en relief.
- **Don't** colorer une étoile en signal, en rouge ou en jaune, ni prendre une étoile dans une fonte d'icônes tierce ; l'étoile est le tracé Feather en SVG, et tout le reste est Feather à 16 px.
- **Don't** mettre le thème ou la langue dans un menu, une page de réglages ou le volet ; ce sont deux commandes au bout du bandeau, et leur bascule ne recharge rien.
- **Don't** formater une date ou un nombre autrement que par `Intl` avec la locale du dictionnaire, ni écrire une phrase dans un composant, un écran ou un schéma du domaine.
