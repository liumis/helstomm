import type { HeroBlock, HeroCard, HeroCardAction, HeroIconKey } from '../types';
import { FALLBACK_HERO_BLOCK } from '../data/hero';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiSettings = {
  enabled?: boolean | null;
  badge?: string;
  title?: string;
  highlight?: string;
  intro?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  backgroundUrl?: string;
  background?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiCard = {
  slug?: string;
  title?: string;
  enabled?: boolean | null;
  description?: string;
  ctaLabel?: string;
  action?: string;
  targetSlug?: string;
  iconKey?: string;
  iconUrl?: string;
  icon?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function asAction(value?: string): HeroCardAction {
  if (value === 'analysis' || value === 'roi' || value === 'view') return value;
  return 'view';
}

function asIconKey(value?: string): HeroIconKey {
  if (
    value === 'konsultacija' ||
    value === 'projektavimas' ||
    value === 'gamyba' ||
    value === 'montavimas' ||
    value === 'custom'
  ) {
    return value;
  }
  return 'custom';
}

function resolveTargetSlug(row: StrapiCard) {
  const target = row.targetSlug || '';
  if (row.slug === 'projektavimas-bim' && target === 'pastatai') {
    return 'dokumentai/projektavimo-vadovas';
  }
  if (row.slug === 'statybos-darbai' && target === 'mokymai') {
    return 'dokumentai/hg-cw-inst-001';
  }
  return target;
}

function mapCard(row: StrapiCard): HeroCard | null {
  if (!row.title || row.enabled === false) return null;
  return {
    id: row.slug || row.title,
    title: row.title,
    description: row.description || '',
    ctaLabel: row.ctaLabel || '',
    action: asAction(row.action),
    targetSlug: resolveTargetSlug(row),
    iconKey: asIconKey(row.iconKey),
    iconUrl: mediaUrl(row.icon) || row.iconUrl || '',
  };
}

export async function fetchHeroBlock(): Promise<HeroBlock> {
  try {
    const [settingsRes, cardsRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/hero-setting?populate=*`),
      fetch(`${STRAPI_URL}/api/hero-cards?populate=*&sort=sortOrder:asc&pagination[pageSize]=20`),
    ]);

    if (!settingsRes.ok || !cardsRes.ok) {
      throw new Error('Strapi hero request failed');
    }

    const settingsPayload = await settingsRes.json();
    const cardsPayload = await cardsRes.json();
    const settings: StrapiSettings = settingsPayload.data || {};
    const rows: StrapiCard[] = Array.isArray(cardsPayload.data) ? cardsPayload.data : [];
    const cards = rows.map(mapCard).filter((item): item is HeroCard => item !== null);

    return {
      enabled: settings.enabled !== false,
      badge: settings.badge || FALLBACK_HERO_BLOCK.badge,
      title: settings.title || FALLBACK_HERO_BLOCK.title,
      highlight: settings.highlight || FALLBACK_HERO_BLOCK.highlight,
      intro: settings.intro || FALLBACK_HERO_BLOCK.intro,
      primaryCtaLabel: settings.primaryCtaLabel || FALLBACK_HERO_BLOCK.primaryCtaLabel,
      secondaryCtaLabel: settings.secondaryCtaLabel || FALLBACK_HERO_BLOCK.secondaryCtaLabel,
      backgroundUrl:
        mediaUrl(settings.background) || settings.backgroundUrl || FALLBACK_HERO_BLOCK.backgroundUrl,
      cards,
    };
  } catch (error) {
    console.warn('Hero: using local block because CMS is unavailable.', error);
    return FALLBACK_HERO_BLOCK;
  }
}
