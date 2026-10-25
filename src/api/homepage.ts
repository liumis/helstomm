import type { HomepageSettings } from '../types';
import { FALLBACK_HOMEPAGE } from '../data/pageChrome';
import { pick } from './utils';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

export async function fetchHomepageSettings(): Promise<HomepageSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/homepage-setting`);
    if (!res.ok) throw new Error('Strapi homepage request failed');
    const payload = await res.json();
    const data = payload.data || {};
    return {
      processBadge: pick(data.processBadge, FALLBACK_HOMEPAGE.processBadge),
      processTitle: pick(data.processTitle, FALLBACK_HOMEPAGE.processTitle),
      processHighlight: pick(data.processHighlight, FALLBACK_HOMEPAGE.processHighlight),
      processIntro: pick(data.processIntro, FALLBACK_HOMEPAGE.processIntro),
      carouselTitle: pick(data.carouselTitle, FALLBACK_HOMEPAGE.carouselTitle),
      carouselIntro: pick(data.carouselIntro, FALLBACK_HOMEPAGE.carouselIntro),
    };
  } catch (error) {
    console.warn('Homepage: using local headings because CMS is unavailable.', error);
    return FALLBACK_HOMEPAGE;
  }
}
