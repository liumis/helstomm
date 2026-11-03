import type { ProductCatalogItem, ProductLayout } from '../types';
import { FALLBACK_PRODUCTS } from '../data/productCatalog';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiAdvantage = {
  title?: string;
  description?: string;
  iconUrl?: string;
  icon?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiSpec = {
  label?: string;
  value?: string;
};

type StrapiTile = {
  title?: string;
  tileKey?: string;
  imageUrl?: string;
  image?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiJoint = {
  title?: string;
  acronym?: string;
  imageUrl?: string;
  image?: StrapiMedia | StrapiMedia[] | null;
  file?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiParagraph = {
  highlight?: string;
  text?: string;
};

type StrapiProduct = {
  slug?: string;
  name?: string;
  menuTitle?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  menuIconUrl?: string;
  badge?: string;
  pageTitle?: string;
  pageIntro?: string;
  tilesSectionTitle?: string;
  tilesSelectable?: boolean;
  tilesColumns?: number;
  schemaTitle?: string;
  schemaImageUrl?: string;
  catalogLabel?: string;
  catalogFile?: StrapiMedia | StrapiMedia[] | null;
  jointsTitle?: string;
  jointsCtaLabel?: string;
  showInMenu?: boolean;
  showInCarousel?: boolean;
  sortOrder?: number;
  layout?: ProductLayout;
  guidePdfUrl?: string;
  detailsCadUrl?: string;
  bimModelUrl?: string;
  image?: StrapiMedia | StrapiMedia[] | null;
  menuIcon?: StrapiMedia | StrapiMedia[] | null;
  schemaImage?: StrapiMedia | StrapiMedia[] | null;
  advantages?: StrapiAdvantage[] | null;
  specs?: StrapiSpec[] | null;
  tiles?: StrapiTile[] | null;
  joints?: StrapiJoint[] | null;
  schemaParagraphs?: StrapiParagraph[] | null;
};

const CTA_LABEL_FIXES: Record<string, string> = {
  'Atsisiųsti Techninį Katalogą': 'Atsisiųsti techninį katalogą',
  'Atsisiųsti THERMAL Katalogą': 'Atsisiųsti THERMAL katalogą',
  'Užsakyti THERMAL Sienų Analizę': 'Užsakyti THERMAL sienų analizę',
  'Atsisiųsti Perdangų Katalogą': 'Atsisiųsti perdangų katalogą',
  'Užsakyti Perdangų Inžinerinį Projektą': 'Užsakyti perdangų inžinerinį projektą',
  'Atsisiųsti Balkonų Katalogą': 'Atsisiųsti balkonų katalogą',
  'Užsakyti Balkonų Jungčių Skaičiavimą': 'Užsakyti balkonų jungčių skaičiavimą',
  'Užsakyti Individualų Mazgų Projektavimą': 'Užsakyti individualų mazgų projektavimą',
};

function remapLabel(value: string) {
  return CTA_LABEL_FIXES[value] || value;
}

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapProduct(row: StrapiProduct): ProductCatalogItem | null {
  if (!row.slug || !row.name) return null;

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    menuTitle: row.menuTitle || row.name,
    subtitle: row.subtitle || '',
    description: row.description || '',
    image: mediaUrl(row.image) || row.imageUrl || '',
    menuIconUrl: mediaUrl(row.menuIcon) || row.menuIconUrl || '',
    badge: row.badge || '',
    pageTitle: row.pageTitle || row.name,
    pageIntro: row.pageIntro || row.description || '',
    tilesSectionTitle: row.tilesSectionTitle || '',
    tilesSelectable: Boolean(row.tilesSelectable),
    tilesColumns: row.tilesColumns || 4,
    schemaTitle: row.schemaTitle || '',
    schemaImageUrl: mediaUrl(row.schemaImage) || row.schemaImageUrl || row.imageUrl || '',
    catalogLabel: remapLabel(row.catalogLabel || ''),
    catalogFileUrl: mediaUrl(row.catalogFile) || '',
    jointsTitle: row.jointsTitle || '',
    jointsCtaLabel: remapLabel(row.jointsCtaLabel || ''),
    showInMenu: row.showInMenu !== false,
    showInCarousel: row.showInCarousel !== false,
    sortOrder: Number(row.sortOrder) || 0,
    layout: row.layout === 'engineering' ? 'engineering' : 'standard',
    guidePdfUrl: row.guidePdfUrl,
    detailsCadUrl: row.detailsCadUrl,
    bimModelUrl: row.bimModelUrl,
    advantages: (row.advantages || [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title as string,
        description: item.description || '',
        iconUrl: mediaUrl(item.icon) || item.iconUrl || '',
      })),
    specs: (row.specs || [])
      .filter((item) => item.label && item.value)
      .map((item) => ({
        label: item.label as string,
        value: item.value as string,
      })),
    tiles: (row.tiles || [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title as string,
        imageUrl: mediaUrl(item.image) || item.imageUrl || '',
        tileKey: item.tileKey,
      })),
    joints: (row.joints || [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title as string,
        acronym: item.acronym || '',
        imageUrl: mediaUrl(item.image) || item.imageUrl || '',
        fileUrl: mediaUrl(item.file) || '',
      })),
    schemaParagraphs: (row.schemaParagraphs || [])
      .filter((item) => item.text)
      .map((item) => ({
        highlight: item.highlight,
        text: item.text as string,
      })),
  };
}

const POPULATE =
  'populate[advantages][populate]=icon&populate[tiles][populate]=image&populate[joints][populate][0]=image&populate[joints][populate][1]=file&populate[schemaParagraphs]=true&populate[specs]=true&populate[image]=true&populate[menuIcon]=true&populate[schemaImage]=true&populate[catalogFile]=true';

export async function fetchProducts(): Promise<ProductCatalogItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?${POPULATE}&sort=sortOrder:asc&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Strapi products request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiProduct[] = Array.isArray(payload.data) ? payload.data : [];
    const products = rows.map(mapProduct).filter((item): item is ProductCatalogItem => item !== null);

    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch (error) {
    console.warn('Produktai: using local products because CMS is unavailable.', error);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductCatalogItem | null> {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug) || null;
}

export function menuProducts(products: ProductCatalogItem[]) {
  return products.filter((product) => product.showInMenu);
}

export function carouselProducts(products: ProductCatalogItem[]) {
  return products.filter((product) => product.showInCarousel);
}
