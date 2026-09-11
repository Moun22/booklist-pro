import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { en } from '@/features/i18n/en';
import { fr, type Dictionnaire } from '@/features/i18n/fr';
import { stockage } from '@/services/stockage';
import { ThemeProvider, type PreferenceTheme } from '@/theme/ThemeProvider';

export type Langue = 'fr' | 'en';

export type Preferences = {
  theme: PreferenceTheme;
  langue: Langue;
  dictionnaire: Dictionnaire;
  definirTheme: (theme: PreferenceTheme) => void;
  definirLangue: (langue: Langue) => void;
};

const CLES = { theme: 'preferences.theme', langue: 'preferences.langue' } as const;
const DICTIONNAIRES: Record<Langue, Dictionnaire> = { fr, en };

function estTheme(valeur: string | null): valeur is PreferenceTheme {
  return valeur === 'systeme' || valeur === 'clair' || valeur === 'sombre';
}

function estLangue(valeur: string | null): valeur is Langue {
  return valeur === 'fr' || valeur === 'en';
}

const PreferencesContext = createContext<Preferences | null>(null);

type Props = {
  children: ReactNode;
  initiales?: { theme?: PreferenceTheme; langue?: Langue };
};

export function PreferencesProvider({ children, initiales }: Props) {
  const [theme, setTheme] = useState<PreferenceTheme>(initiales?.theme ?? 'systeme');
  const [langue, setLangue] = useState<Langue>(initiales?.langue ?? 'fr');

  // The stored choice arrives after the first paint; until then the defaults apply.
  useEffect(() => {
    let actif = true;
    void Promise.all([stockage.lire(CLES.theme), stockage.lire(CLES.langue)]).then(
      ([themeStocke, langueStockee]) => {
        if (!actif) {
          return;
        }
        if (estTheme(themeStocke)) {
          setTheme(themeStocke);
        }
        if (estLangue(langueStockee)) {
          setLangue(langueStockee);
        }
      },
    );
    return () => {
      actif = false;
    };
  }, []);

  const definirTheme = useCallback((prochain: PreferenceTheme) => {
    setTheme(prochain);
    void stockage.ecrire(CLES.theme, prochain);
  }, []);
  const definirLangue = useCallback((prochaine: Langue) => {
    setLangue(prochaine);
    void stockage.ecrire(CLES.langue, prochaine);
  }, []);

  const valeur = useMemo<Preferences>(
    () => ({ theme, langue, dictionnaire: DICTIONNAIRES[langue], definirTheme, definirLangue }),
    [theme, langue, definirTheme, definirLangue],
  );

  return (
    <PreferencesContext.Provider value={valeur}>
      <ThemeProvider preference={theme}>{children}</ThemeProvider>
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): Preferences {
  const preferences = useContext(PreferencesContext);
  if (preferences === null) {
    throw new Error('usePreferences must be used inside a PreferencesProvider.');
  }
  return preferences;
}
