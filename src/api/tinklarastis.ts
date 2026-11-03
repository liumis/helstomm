import type { TinklarastisSettings } from '../types';
import { FALLBACK_TINKLARASTIS } from '../data/pageChrome';
import { mapFilters, pick } from './utils';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

function socialLabel(value: string | undefined, fallback: string) {
  const raw = pick(value, fallback).replace(/^sekite mus\s+/i, '').trim();
  return raw || fallback;
}

export async function fetchTinklarastisSettings(): Promise<TinklarastisSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/tinklarastis-setting?populate=*`);
    if (!res.ok) throw new Error('Strapi tinklarastis request failed');
    const payload = await res.json();
    const data = payload.data || {};
    const categories = mapFilters(data.categories);
    return {
      badge: pick(data.badge, FALLBACK_TINKLARASTIS.badge),
      title: pick(data.title, FALLBACK_TINKLARASTIS.title),
      intro: pick(data.intro, FALLBACK_TINKLARASTIS.intro),
      linkedinLabel: socialLabel(data.linkedinLabel, FALLBACK_TINKLARASTIS.linkedinLabel),
      linkedinUrl: pick(data.linkedinUrl, FALLBACK_TINKLARASTIS.linkedinUrl),
      instagramLabel: socialLabel(data.instagramLabel, FALLBACK_TINKLARASTIS.instagramLabel),
      instagramUrl: pick(data.instagramUrl, FALLBACK_TINKLARASTIS.instagramUrl),
      analysisCta: pick(data.analysisCta, FALLBACK_TINKLARASTIS.analysisCta),
      featuredBadge: pick(data.featuredBadge, FALLBACK_TINKLARASTIS.featuredBadge),
      readArticleCta: pick(data.readArticleCta, FALLBACK_TINKLARASTIS.readArticleCta),
      readCta: pick(data.readCta, FALLBACK_TINKLARASTIS.readCta),
      searchPlaceholder: pick(data.searchPlaceholder, FALLBACK_TINKLARASTIS.searchPlaceholder),
      emptyTitle: pick(data.emptyTitle, FALLBACK_TINKLARASTIS.emptyTitle),
      emptyIntro: pick(data.emptyIntro, FALLBACK_TINKLARASTIS.emptyIntro),
      emptyCta: pick(data.emptyCta, FALLBACK_TINKLARASTIS.emptyCta),
      followTitle: pick(data.followTitle, FALLBACK_TINKLARASTIS.followTitle),
      followIntro: pick(data.followIntro, FALLBACK_TINKLARASTIS.followIntro),
      followCta: pick(data.followCta, FALLBACK_TINKLARASTIS.followCta),
      backgroundUrl: pick(data.backgroundUrl, FALLBACK_TINKLARASTIS.backgroundUrl),
      categories: categories.length > 0 ? categories : FALLBACK_TINKLARASTIS.categories,
    };
  } catch (error) {
    console.warn('Tinklaraštis: using local headings because CMS is unavailable.', error);
    return FALLBACK_TINKLARASTIS;
  }
}
