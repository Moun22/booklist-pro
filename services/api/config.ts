const URL_PAR_DEFAUT = 'http://localhost:3000';

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? URL_PAR_DEFAUT).replace(/\/+$/, '');

export const DELAI_REQUETE_MS = 10_000;
