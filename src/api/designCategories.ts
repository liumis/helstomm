import type { DesignCategoryItem } from '../types';
import { FALLBACK_DESIGN_CATEGORIES } from '../data/designCategories';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiHotspot = {
  title?: string;
  description?: string;
  techDetail?: string;
  xPct?: number;
  yPct?: number;
  file?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiDesignCategory = {
  slug?: string;
  name?: string;
  menuTitle?: string;
  menuIconName?: string;
  badge?: string;
  pageTitle?: string;
  subtitle?: string;
  pageIntro?: string;
  diagramTitle?: string;
  diagramSubtitle?: string;
  diagramImageUrl?: string;
  assemblyTitle?: string;
  assemblyCaption?: string;
  assemblyBackgroundUrl?: string;
  ctaLabel?: string;
  showInMenu?: boolean;
  showOnHome?: boolean;
  cardBadge?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardImageUrl?: string;
  cardBadgeIcon?: 'Building' | 'Shield' | 'Leaf';
  cardTheme?: 'standard' | 'eco';
  cardTargetSlug?: string;
  cardCtaLabel?: string;
  cardIconKey?: 'pastatai' | 'inzineriniai' | 'tvarus';
  sortOrder?: number;
  diagramImage?: StrapiMedia | StrapiMedia[] | null;
  cardImage?: StrapiMedia | StrapiMedia[] | null;
  hotspots?: StrapiHotspot[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapCategory(row: StrapiDesignCategory): DesignCategoryItem | null {
  if (!row.slug || !row.name) return null;

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    menuTitle: row.menuTitle || row.name,
    menuIconName: row.menuIconName || 'Building2',
    badge: row.badge || '',
    pageTitle: row.pageTitle || row.name,
    subtitle: row.subtitle || '',
    pageIntro: row.pageIntro || '',
    diagramTitle: row.diagramTitle || 'KONSTRUKCINIS MODELIS',
    diagramSubtitle: row.diagramSubtitle || '',
    diagramImageUrl: mediaUrl(row.diagramImage) || row.diagramImageUrl || '/80456-16320159.webp',
    assemblyTitle: row.assemblyTitle || '',
    assemblyCaption: row.assemblyCaption || '',
    assemblyBackgroundUrl: row.assemblyBackgroundUrl || '',
    ctaLabel: row.ctaLabel || 'Užsakyti Projekto Analizę',
    showInMenu: row.showInMenu !== false,
    showOnHome: Boolean(row.showOnHome),
    cardBadge: row.cardBadge || '',
    cardTitle: row.cardTitle || row.name,
    cardDescription: row.cardDescription || '',
    cardImageUrl: mediaUrl(row.cardImage) || row.cardImageUrl || '',
    cardBadgeIcon: row.cardBadgeIcon || 'Building',
    cardTheme: row.cardTheme === 'eco' ? 'eco' : 'standard',
    cardTargetSlug: row.cardTargetSlug || row.slug,
    cardCtaLabel: row.cardCtaLabel || 'Sužinoti daugiau',
    cardIconKey: row.cardIconKey || 'pastatai',
    sortOrder: Number(row.sortOrder) || 0,
    hotspots: (row.hotspots || [])
      .filter((item) => item.title)
      .map((item, index) => {
        const fallbackHotspot = FALLBACK_DESIGN_CATEGORIES.find((category) => category.slug === row.slug)?.hotspots.find(
          (hotspot) => hotspot.title === item.title
        );
        return {
          id: `${row.slug}-${index}`,
          title: item.title as string,
          description: item.description || '',
          techDetail: item.techDetail || '',
          xPct: Number(item.xPct) || 0,
          yPct: Number(item.yPct) || 0,
          fileUrl: mediaUrl(item.file) || '',
          productSlug: fallbackHotspot?.productSlug,
        };
      }),
  };
}

export async function fetchDesignCategories(): Promise<DesignCategoryItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projektavimai?populate[diagramImage]=true&populate[cardImage]=true&populate[hotspots][populate]=file&sort=sortOrder:asc&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Strapi projektavimas request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiDesignCategory[] = Array.isArray(payload.data) ? payload.data : [];
    const items = rows.map(mapCategory).filter((item): item is DesignCategoryItem => item !== null);

    return items.length > 0 ? items : FALLBACK_DESIGN_CATEGORIES;
  } catch (error) {
    console.warn('Projektavimas: using local categories because CMS is unavailable.', error);
    return FALLBACK_DESIGN_CATEGORIES;
  }
}

export async function fetchDesignCategoryBySlug(slug: string): Promise<DesignCategoryItem | null> {
  const items = await fetchDesignCategories();
  return items.find((item) => item.slug === slug) || null;
}

export function menuDesignCategories(items: DesignCategoryItem[]) {
  return items.filter((item) => item.showInMenu);
}

export function homeDesignCards(items: DesignCategoryItem[]) {
  return items.filter((item) => item.showOnHome);
}

export function designCategorySlugs(items: DesignCategoryItem[] = FALLBACK_DESIGN_CATEGORIES) {
  return items.map((item) => item.slug);
}
