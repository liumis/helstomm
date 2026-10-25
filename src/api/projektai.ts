import type { ProjektaiSettings } from '../types';
import { FALLBACK_PROJEKTAI } from '../data/pageChrome';
import { mapFilters, pick } from './utils';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

export async function fetchProjektaiSettings(): Promise<ProjektaiSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projektai-setting?populate=*`);
    if (!res.ok) throw new Error('Strapi projektai request failed');
    const payload = await res.json();
    const data = payload.data || {};
    const filters = mapFilters(data.filters);
    return {
      badge: pick(data.badge, FALLBACK_PROJEKTAI.badge),
      title: pick(data.title, FALLBACK_PROJEKTAI.title),
      highlight: pick(data.highlight, FALLBACK_PROJEKTAI.highlight),
      intro: pick(data.intro, FALLBACK_PROJEKTAI.intro),
      emptyTitle: pick(data.emptyTitle, FALLBACK_PROJEKTAI.emptyTitle),
      emptyCta: pick(data.emptyCta, FALLBACK_PROJEKTAI.emptyCta),
      analysisCta: pick(data.analysisCta, FALLBACK_PROJEKTAI.analysisCta),
      filters: filters.length > 0 ? filters : FALLBACK_PROJEKTAI.filters,
    };
  } catch (error) {
    console.warn('Projektai: using local headings because CMS is unavailable.', error);
    return FALLBACK_PROJEKTAI;
  }
}
