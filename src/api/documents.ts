import type { DocumentCategory, LibraryDocument } from '../types';
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
  subcategory?: string;
  acronym?: string;
  imageUrl?: string;
  fileSize?: string;
  pdfUrl?: string;
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

function formatBytes(size?: number) {
  if (!size || size <= 0) return '';
  if (size < 1024) return `${Math.round(size)} KB`;
  return `${(size / 1024).toFixed(1)} MB`;
}

function mapDocument(row: StrapiDocument): LibraryDocument | null {
  if (!row.slug || !row.name || !row.category) return null;

  const pdf = Array.isArray(row.pdf) ? row.pdf[0] : row.pdf;
  const dwg = Array.isArray(row.dwg) ? row.dwg[0] : row.dwg;
  const svg = Array.isArray(row.svg) ? row.svg[0] : row.svg;
  const sizedFile = pdf || dwg || svg;

  return {
    id: row.slug,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory || '',
    acronym: row.acronym || '',
    image: mediaUrl(row.image) || row.imageUrl || '',
    fileSize: row.fileSize || formatBytes(sizedFile?.size),
    dwgUrl: mediaUrl(row.dwg),
    svgUrl: mediaUrl(row.svg),
    pdfUrl: mediaUrl(row.pdf) || row.pdfUrl || '',
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
    const documents = rows
      .map(mapDocument)
      .filter((item): item is LibraryDocument => item !== null);

    const ids = new Set(documents.map((item) => item.id));
    const extras = FALLBACK_DOCUMENTS.filter((item) => item.pdfUrl && !ids.has(item.id));
    const merged = extras.length ? [...documents, ...extras] : documents;
    return merged.length > 0 ? merged : FALLBACK_DOCUMENTS;
  } catch (error) {
    console.warn('Dokumentai: using local documents because CMS is unavailable.', error);
    return FALLBACK_DOCUMENTS;
  }
}
