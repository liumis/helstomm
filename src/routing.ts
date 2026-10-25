import { useEffect, useState } from 'react';
import type { PageView } from './types';

export const CORE_VIEWS: PageView[] = [
  'home',
  'mokymai',
  'dokumentai',
  'skaiciuokles',
  'tinklarastis',
  'igyyvendinti-projektai',
  'gamyba',
  'privatumas',
];

const VIEW_PATHS: Partial<Record<PageView, string>> = {
  home: '/',
  mokymai: '/mokymai',
  dokumentai: '/dokumentai',
  skaiciuokles: '/skaiciuokles',
  tinklarastis: '/tinklarastis',
  'igyyvendinti-projektai': '/projektai',
  gamyba: '/gamyba',
  privatumas: '/privatumas',
};

const PATH_ALIASES: Record<string, PageView> = {
  '/': 'home',
  '/mokymai': 'mokymai',
  '/dokumentai': 'dokumentai',
  '/skaiciuokles': 'skaiciuokles',
  '/tinklarastis': 'tinklarastis',
  '/projektai': 'igyyvendinti-projektai',
  '/igyyvendinti-projektai': 'igyyvendinti-projektai',
  '/gamyba': 'gamyba',
  '/privatumas': 'privatumas',
  '/akademija': 'mokymai',
};

export type AppRoute = {
  view: PageView;
  articleSlug?: string;
  calculatorSlug?: string;
  path: string;
};

export function pathForView(view: PageView, articleSlug?: string) {
  if (view === 'tinklarastis' && articleSlug) {
    return `/tinklarastis/${articleSlug}`;
  }
  return VIEW_PATHS[view] || `/${view}`;
}

export function parseAppPath(pathname: string): AppRoute {
  const path = pathname.replace(/\/$/, '') || '/';
  const parts = path.split('/').filter(Boolean);

  if (parts[0] === 'tinklarastis' && parts[1]) {
    return { view: 'tinklarastis', articleSlug: parts[1], path };
  }

  if (parts[0] === 'skaiciuokles' && parts[1]) {
    return { view: 'skaiciuokles', calculatorSlug: parts.slice(1).join('/'), path };
  }

  const aliased = PATH_ALIASES[path];
  if (aliased) {
    return { view: aliased, path };
  }

  if (parts.length === 1) {
    return { view: parts[0] as PageView, path };
  }

  return { view: 'home', path: '/' };
}

function locationKey() {
  return `${window.location.pathname}${window.location.search}`;
}

export function useAppRoute() {
  const [location, setLocation] = useState(() => locationKey());

  useEffect(() => {
    const onPopState = () => setLocation(locationKey());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    const next = `${url.pathname}${url.search}`;
    if (next === locationKey()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', next);
    setLocation(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const path = location.split('?')[0] || '/';
  return { path, route: parseAppPath(path), navigate };
}
