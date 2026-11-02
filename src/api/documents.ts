import type { DocumentCategory, DocumentSection, LibraryDocument } from '../types';
import { FALLBACK_DOCUMENTS } from '../data/libraryDocuments';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
  size?: number;
};

type StrapiDocument = {
  slug?: string;
  name?: string;
  category?: DocumentCategory;
  section?: DocumentSection;
  subcategory?: string;
  acronym?: string;
  description?: string;
  version?: string;
  publishedOn?: string;
  pages?: number;
  imageUrl?: string;
  fileSize?: string;
  pdfUrl?: string;
  tags?: string;
  relatedCodes?: string;
  featured?: boolean;
  image?: StrapiMedia | StrapiMedia[] | null;
  dwg?: StrapiMedia | StrapiMedia[] | null;
  svg?: StrapiMedia | StrapiMedia[] | null;
  pdf?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function splitList(value?: string) {
  return (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function overlayDocument(base: LibraryDocument, row?: StrapiDocument | null): LibraryDocument {
  if (!row) return base;
  return {
    ...base,
    name: row.name || base.name,
    category: row.category || base.category,
    section: row.section || base.section,
    audience: row.subcategory || base.audience,
    subcategory: row.subcategory || base.subcategory,
    acronym: row.acronym || base.acronym,
    description: row.description || base.description,
    version: row.version || base.version,
    publishedOn: row.publishedOn || base.publishedOn,
    pages: row.pages || base.pages,
    image: mediaUrl(row.image) || row.imageUrl || base.image,
    fileSize: row.fileSize || base.fileSize,
    dwgUrl: mediaUrl(row.dwg) || base.dwgUrl,
    svgUrl: mediaUrl(row.svg) || base.svgUrl,
    pdfUrl: mediaUrl(row.pdf) || row.pdfUrl || base.pdfUrl,
    tags: splitList(row.tags).length ? splitList(row.tags) : base.tags,
    relatedCodes: splitList(row.relatedCodes).length ? splitList(row.relatedCodes) : base.relatedCodes,
    featured: row.featured ?? base.featured,
  };
}

export async function fetchDocuments(): Promise<LibraryDocument[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/dokumentai?populate=*&sort=sortOrder:asc&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Strapi documents request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiDocument[] = Array.isArray(payload.data) ? payload.data : [];
    const bySlug = new Map(rows.filter((row) => row.slug).map((row) => [row.slug as string, row]));
    return FALLBACK_DOCUMENTS.map((item) => overlayDocument(item, bySlug.get(item.id)));
  } catch (error) {
    console.warn('Dokumentai: using local documents because CMS is unavailable.', error);
    return FALLBACK_DOCUMENTS;
  }
}
