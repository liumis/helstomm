import type { DokumentaiSettings } from '../types';
import { FALLBACK_DOKUMENTAI } from '../data/pageChrome';
import { pick } from './utils';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

export async function fetchDokumentaiSettings(): Promise<DokumentaiSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/dokumentai-setting`);
    if (!res.ok) throw new Error('Strapi dokumentai request failed');
    const payload = await res.json();
    const data = payload.data || {};
    return {
      badge: pick(data.badge, FALLBACK_DOKUMENTAI.badge),
      title: pick(data.title, FALLBACK_DOKUMENTAI.title),
      intro: pick(data.intro, FALLBACK_DOKUMENTAI.intro),
      searchPlaceholder: pick(data.searchPlaceholder, FALLBACK_DOKUMENTAI.searchPlaceholder),
      roiCta: pick(data.roiCta, FALLBACK_DOKUMENTAI.roiCta),
      analysisCta: pick(data.analysisCta, FALLBACK_DOKUMENTAI.analysisCta),
      emptyTitle: pick(data.emptyTitle, FALLBACK_DOKUMENTAI.emptyTitle),
      emptyIntro: pick(data.emptyIntro, FALLBACK_DOKUMENTAI.emptyIntro),
      emptyCta: pick(data.emptyCta, FALLBACK_DOKUMENTAI.emptyCta),
      manualsHeading: pick(data.manualsHeading, FALLBACK_DOKUMENTAI.manualsHeading),
      mazgaiHeading: pick(data.mazgaiHeading, FALLBACK_DOKUMENTAI.mazgaiHeading),
      downloadLabel: pick(data.downloadLabel, FALLBACK_DOKUMENTAI.downloadLabel),
      missingFileLabel: pick(data.missingFileLabel, FALLBACK_DOKUMENTAI.missingFileLabel),
      sizeLabel: pick(data.sizeLabel, FALLBACK_DOKUMENTAI.sizeLabel),
    };
  } catch (error) {
    console.warn('Dokumentai: using local headings because CMS is unavailable.', error);
    return FALLBACK_DOKUMENTAI;
  }
}
