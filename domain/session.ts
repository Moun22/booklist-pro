import { z } from 'zod';

export const roleSchema = z.enum(['lecteur', 'editeur']);

export type Role = z.infer<typeof roleSchema>;

export const utilisateurSchema = z.object({
  id: z.string().min(1),
  email: z.string().min(1),
  role: roleSchema,
});

export type Utilisateur = z.infer<typeof utilisateurSchema>;

export const jetonsSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type Jetons = z.infer<typeof jetonsSchema>;

export const connexionReponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  utilisateur: utilisateurSchema,
});

export const rafraichissementReponseSchema = z.object({
  accessToken: z.string().min(1),
});

export const etatServeurSchema = z.object({
  authRequise: z.boolean(),
});

export function peutEcrire(role: Role): boolean {
  return role === 'editeur';
}

export type MessagesConnexion = {
  emailObligatoire: string;
  motDePasseObligatoire: string;
};

export function creerIdentifiantsSchema(m: MessagesConnexion) {
  return z.object({
    email: z.string().trim().min(1, m.emailObligatoire),
    motDePasse: z.string().min(1, m.motDePasseObligatoire),
  });
}

export type Identifiants = z.output<ReturnType<typeof creerIdentifiantsSchema>>;
