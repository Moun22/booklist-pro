import type { InfiniteData, QueryClient } from '@tanstack/react-query';

import { clesOuvrages } from './cles';
import type { Ouvrage } from '@/domain/ouvrage';
import type { Page } from '@/domain/page';

export type DonneesListe = InfiniteData<Page<Ouvrage>>;

export function trouverDansListes(client: QueryClient, id: string): Ouvrage | undefined {
  const listes = client.getQueriesData<DonneesListe>({ queryKey: clesOuvrages.listes() });
  for (const [, donnees] of listes) {
    for (const page of donnees?.pages ?? []) {
      const trouve = page.items.find((ouvrage) => ouvrage.id === id);
      if (trouve !== undefined) {
        return trouve;
      }
    }
  }
  return undefined;
}

export function remplacerDansListe(donnees: DonneesListe, ouvrage: Ouvrage): DonneesListe {
  return {
    ...donnees,
    pages: donnees.pages.map((page) => ({
      ...page,
      items: page.items.map((item) => (item.id === ouvrage.id ? ouvrage : item)),
    })),
  };
}

export function retirerDesListes(donnees: DonneesListe, id: string): DonneesListe {
  const pages = donnees.pages.map((page) => ({
    ...page,
    items: page.items.filter((item) => item.id !== id),
  }));
  const retire = pages.some(
    (page, index) => page.items.length !== donnees.pages[index]?.items.length,
  );
  if (!retire) {
    return donnees;
  }
  return {
    ...donnees,
    pages: pages.map((page) => ({ ...page, total: Math.max(0, page.total - 1) })),
  };
}

export function propagerOuvrage(client: QueryClient, ouvrage: Ouvrage): void {
  client.setQueryData(clesOuvrages.detail(ouvrage.id), ouvrage);
  client.setQueriesData<DonneesListe>({ queryKey: clesOuvrages.listes() }, (donnees) =>
    donnees === undefined ? donnees : remplacerDansListe(donnees, ouvrage),
  );
}
