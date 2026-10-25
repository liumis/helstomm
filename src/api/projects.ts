import type { ProjectItem } from '../types';
import { FALLBACK_PROJECTS } from '../data/projectItems';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

const CATEGORY_META: Record<string, Pick<ProjectItem, 'category' | 'categoryLabel'>> = {
  gyvenamieji: { category: 'gyvenamieji', categoryLabel: 'Gyvenamieji namai' },
  industriniai: { category: 'industriniai', categoryLabel: 'Industriniai pastatai' },
  komerciniai: { category: 'komerciniai', categoryLabel: 'Komerciniai pastatai' },
  viesieji: { category: 'viesieji', categoryLabel: 'Viešieji pastatai' },
  individualus: { category: 'individualūs', categoryLabel: 'Individuali statyba' },
  inzineriniai: { category: 'inzineriniai', categoryLabel: 'Inžineriniai statiniai' },
};

type StrapiMedia = {
  url?: string;
};

type StrapiProject = {
  slug?: string;
  name?: string;
  category?: string;
  timeWeeks?: number;
  location?: string;
  area?: string;
  imageUrl?: string;
  image?: StrapiMedia | StrapiMedia[] | null;
  photo?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function mapProject(row: StrapiProject): ProjectItem | null {
  if (!row.slug || !row.name || !row.category) return null;

  const meta = CATEGORY_META[row.category];
  if (!meta) return null;

  return {
    id: row.slug,
    title: row.name,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    image: mediaUrl(row.image) || mediaUrl(row.photo) || row.imageUrl || '',
    location: row.location || '',
    area: row.area || '',
    completionYear: '',
    savedTimeWeeks: Number(row.timeWeeks) || 0,
  };
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projects?populate=*&sort=sortOrder:asc&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Strapi projects request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiProject[] = Array.isArray(payload.data) ? payload.data : [];
    const projects = rows.map(mapProject).filter((item): item is ProjectItem => item !== null);

    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('Projektai: using local projects because CMS is unavailable.', error);
    return FALLBACK_PROJECTS;
  }
}
