import type { ManufacturingBlock } from '../types';
import { FALLBACK_MANUFACTURING_BLOCK } from '../data/gamybosProcesas';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiBlock = {
  enabled?: boolean | null;
  badge?: string;
  title?: string;
  intro?: string;
  tagline?: string;
  videoCaption?: string;
  videoUrl?: string;
  posterUrl?: string;
  poster?: StrapiMedia | StrapiMedia[] | null;
  certificatesCtaLabel?: string;
  certificatesFile?: StrapiMedia | StrapiMedia[] | null;
  certificates?: string;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function toEmbedUrl(url: string) {
  const watch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (watch?.[1]) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

function splitLines(value?: string) {
  return (value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function fetchManufacturingBlock(): Promise<ManufacturingBlock> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/gamybos-procesas?populate[poster]=true&populate[certificatesFile]=true`);
    if (!res.ok) throw new Error('Strapi gamybos-procesas request failed');

    const payload = await res.json();
    const row: StrapiBlock = payload.data || {};
    const certificates = splitLines(row.certificates);

    return {
      enabled: row.enabled !== false,
      badge: row.badge || FALLBACK_MANUFACTURING_BLOCK.badge,
      title: row.title || FALLBACK_MANUFACTURING_BLOCK.title,
      intro: row.intro || FALLBACK_MANUFACTURING_BLOCK.intro,
      tagline: row.tagline || FALLBACK_MANUFACTURING_BLOCK.tagline,
      videoCaption: row.videoCaption || FALLBACK_MANUFACTURING_BLOCK.videoCaption,
      videoUrl: toEmbedUrl(row.videoUrl || FALLBACK_MANUFACTURING_BLOCK.videoUrl),
      posterUrl: mediaUrl(row.poster) || row.posterUrl || FALLBACK_MANUFACTURING_BLOCK.posterUrl,
      certificatesCtaLabel: row.certificatesCtaLabel || FALLBACK_MANUFACTURING_BLOCK.certificatesCtaLabel,
      certificatesFileUrl: mediaUrl(row.certificatesFile) || FALLBACK_MANUFACTURING_BLOCK.certificatesFileUrl || '',
      certificates: certificates.length > 0 ? certificates : FALLBACK_MANUFACTURING_BLOCK.certificates,
    };
  } catch (error) {
    console.warn('Gamybos procesas: using local block because CMS is unavailable.', error);
    return FALLBACK_MANUFACTURING_BLOCK;
  }
}
