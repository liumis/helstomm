import type { SeoPage } from '../types';
import { DEFAULT_SEO, FALLBACK_SEO_PAGES } from '../data/seo';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = { url?: string };

type StrapiSeoPage = Partial<SeoPage> & {
  ogImage?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapPage(row: StrapiSeoPage): SeoPage | null {
  if (!row.slug || !row.path || !row.title) return null;

  return {
    id: row.slug,
    slug: row.slug,
    path: row.path.startsWith('/') ? row.path : `/${row.path}`,
    title: row.title,
    description: row.description || '',
    ogTitle: row.ogTitle || row.title,
    ogDescription: row.ogDescription || row.description || '',
    ogImageUrl: mediaUrl(row.ogImage) || row.ogImageUrl || '',
    indexable: row.indexable !== false,
  };
}

export async function fetchSeoPages(): Promise<SeoPage[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/seo-pages?populate=ogImage&sort=sortOrder:asc&pagination[pageSize]=100`
    );
    if (!res.ok) throw new Error('Strapi SEO request failed');

    const payload = await res.json();
    const rows: StrapiSeoPage[] = Array.isArray(payload.data) ? payload.data : [];
    const pages = rows.map(mapPage).filter((page): page is SeoPage => page !== null);
    if (pages.length === 0) return FALLBACK_SEO_PAGES;

    const known = new Set(pages.map((page) => page.path.replace(/\/$/, '') || '/'));
    for (const fallback of FALLBACK_SEO_PAGES) {
      const key = fallback.path.replace(/\/$/, '') || '/';
      if (!known.has(key)) pages.push(fallback);
    }
    return pages;
  } catch (error) {
    console.warn('SEO: using local page metadata because CMS is unavailable.', error);
    return FALLBACK_SEO_PAGES;
  }
}

export function findSeoPage(
  pages: SeoPage[],
  path: string,
  fallback?: Partial<SeoPage>
): SeoPage {
  const normalized = path.replace(/\/$/, '') || '/';
  const match =
    pages.find((page) => page.path.replace(/\/$/, '') === normalized) ||
    pages.find((page) => page.path === path);

  if (match) return match;

  const slug = normalized.split('/').filter(Boolean).pop() || 'home';
  const label = slug.replace(/-/g, ' ');
  const generatedTitle = `${label.charAt(0).toUpperCase()}${label.slice(1)} | Helstomm Group`;

  return {
    ...DEFAULT_SEO,
    path: normalized,
    title: fallback?.title || generatedTitle,
    description: fallback?.description || DEFAULT_SEO.description,
    ogTitle: fallback?.ogTitle || fallback?.title || generatedTitle,
    ogDescription: fallback?.ogDescription || fallback?.description || DEFAULT_SEO.ogDescription,
    ogImageUrl: fallback?.ogImageUrl || DEFAULT_SEO.ogImageUrl,
  };
}
