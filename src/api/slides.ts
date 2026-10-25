import type { CarouselDownloadIcon, CarouselSlide } from '../types';
import { FALLBACK_SLIDES } from '../data/carouselSlides';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiDownload = {
  label?: string;
  url?: string;
  icon?: CarouselDownloadIcon;
  file?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiSlide = {
  slug?: string;
  name?: string;
  tabSubtitle?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  targetSlug?: string;
  ctaLabel?: string;
  ctaAction?: 'view' | 'analysis';
  analysisCtaLabel?: string;
  calculatorLabel?: string;
  highlights?: string;
  downloadsTitle?: string;
  publishedInCarousel?: boolean;
  image?: StrapiMedia | StrapiMedia[] | null;
  downloads?: StrapiDownload[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapSlide(row: StrapiSlide): CarouselSlide | null {
  if (!row.slug || !row.name) return null;

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    tabSubtitle: row.tabSubtitle || '',
    badge: row.badge || row.name,
    title: row.title || row.name,
    subtitle: row.subtitle || '',
    description: row.description || '',
    image: mediaUrl(row.image) || row.imageUrl || '',
    targetSlug: row.targetSlug || row.slug,
    ctaLabel: row.ctaLabel || 'Produkto specifikacija',
    ctaAction: row.ctaAction === 'analysis' ? 'analysis' : 'view',
    analysisCtaLabel: row.analysisCtaLabel || '',
    calculatorLabel: row.calculatorLabel || '',
    highlights: (row.highlights || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    downloadsTitle: row.downloadsTitle || 'Techninė medžiaga:',
    downloads: (row.downloads || [])
      .filter((item) => item.label)
      .map((item) => ({
        label: item.label as string,
        url: mediaUrl(item.file) || item.url || '',
        icon: item.icon || 'download',
      })),
  };
}

export async function fetchSlides(): Promise<CarouselSlide[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/slides?populate[image]=true&populate[downloads][populate]=file&sort=sortOrder:asc&pagination[pageSize]=50&filters[publishedInCarousel][$eq]=true`
    );

    if (!response.ok) {
      throw new Error(`Strapi slides request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiSlide[] = Array.isArray(payload.data) ? payload.data : [];
    const slides = rows.map(mapSlide).filter((item): item is CarouselSlide => item !== null);

    return slides.length > 0 ? slides : FALLBACK_SLIDES;
  } catch (error) {
    console.warn('Carousel: using local slides because CMS is unavailable.', error);
    return FALLBACK_SLIDES;
  }
}
