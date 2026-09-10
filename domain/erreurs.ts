import type { Ouvrage } from './ouvrage';

export type CauseReseau = 'hors-ligne' | 'delai' | 'indisponible' | 'reponse-invalide' | 'inconnue';

export class ErreurReseau extends Error {
  readonly type = 'reseau' as const;

  constructor(
    readonly cause: CauseReseau,
    message: string,
    readonly statut?: number,
  ) {
    super(message);
    this.name = 'ErreurReseau';
  }

  get reessayable(): boolean {
    return this.cause !== 'reponse-invalide';
  }
}

export class ErreurValidation extends Error {
  readonly type = 'validation' as const;

  constructor(
    message: string,
    readonly champs: Readonly<Record<string, string>> = {},
    readonly statut: number = 422,
  ) {
    super(message);
    this.name = 'ErreurValidation';
  }
}

export class ErreurConflit extends Error {
  readonly type = 'conflit' as const;

  constructor(
    message: string,
    readonly serveur: Ouvrage,
    readonly versionAttendue: number,
  ) {
    super(message);
    this.name = 'ErreurConflit';
  }
}

export type CodeAuth =
  | 'jeton_absent'
  | 'jeton_expire'
  | 'jeton_invalide'
  | 'droits_insuffisants'
  | 'identifiants_invalides'
  | 'refresh_invalide';

export class ErreurAuth extends Error {
  readonly type = 'auth' as const;

  constructor(
    readonly code: CodeAuth,
    message: string,
    readonly statut: 401 | 403,
  ) {
    super(message);
    this.name = 'ErreurAuth';
  }
}

export class ErreurIntrouvable extends Error {
  readonly type = 'introuvable' as const;

  constructor(message: string) {
    super(message);
    this.name = 'ErreurIntrouvable';
  }
}

export type ErreurApplicative =
  ErreurReseau | ErreurValidation | ErreurConflit | ErreurAuth | ErreurIntrouvable;

export function estErreurApplicative(valeur: unknown): valeur is ErreurApplicative {
  return (
    valeur instanceof ErreurReseau ||
    valeur instanceof ErreurValidation ||
    valeur instanceof ErreurConflit ||
    valeur instanceof ErreurAuth ||
    valeur instanceof ErreurIntrouvable
  );
}
