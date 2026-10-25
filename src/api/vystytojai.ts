import type { DeveloperBenefit, DeveloperBlock } from '../types';
import { FALLBACK_DEVELOPER_BLOCK } from '../data/vystytojai';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiBenefit = {
  slug?: string;
  title?: string;
  stat?: string;
  description?: string;
  iconUrl?: string;
  icon?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiSettings = {
  badge?: string;
  title?: string;
  intro?: string;
  roiCtaLabel?: string;
  analysisCtaLabel?: string;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapBenefit(row: StrapiBenefit): DeveloperBenefit | null {
  if (!row.title) return null;
  return {
    id: row.slug || row.title,
    title: row.title,
    stat: row.stat || '',
    description: row.description || '',
    iconUrl: mediaUrl(row.icon) || row.iconUrl || '',
  };
}

export async function fetchDeveloperBlock(): Promise<DeveloperBlock> {
  try {
    const [settingsRes, benefitsRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/vystytojai-setting`),
      fetch(`${STRAPI_URL}/api/vystytojai?populate=*&sort=sortOrder:asc&pagination[pageSize]=20`),
    ]);

    if (!settingsRes.ok || !benefitsRes.ok) {
      throw new Error('Strapi vystytojai request failed');
    }

    const settingsPayload = await settingsRes.json();
    const benefitsPayload = await benefitsRes.json();
    const settings: StrapiSettings = settingsPayload.data || {};
    const rows: StrapiBenefit[] = Array.isArray(benefitsPayload.data) ? benefitsPayload.data : [];
    const benefits = rows.map(mapBenefit).filter((item): item is DeveloperBenefit => item !== null);

    if (benefits.length === 0) return FALLBACK_DEVELOPER_BLOCK;

    return {
      badge: settings.badge || FALLBACK_DEVELOPER_BLOCK.badge,
      title: settings.title || FALLBACK_DEVELOPER_BLOCK.title,
      intro: settings.intro || FALLBACK_DEVELOPER_BLOCK.intro,
      roiCtaLabel: settings.roiCtaLabel || FALLBACK_DEVELOPER_BLOCK.roiCtaLabel,
      analysisCtaLabel: settings.analysisCtaLabel || FALLBACK_DEVELOPER_BLOCK.analysisCtaLabel,
      benefits,
    };
  } catch (error) {
    console.warn('Vystytojams: using local block because CMS is unavailable.', error);
    return FALLBACK_DEVELOPER_BLOCK;
  }
}
