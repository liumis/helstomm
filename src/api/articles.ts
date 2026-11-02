import type { Article } from '../types';
import { articleLinkedInPost, FALLBACK_ARTICLES, resolveArticleImage } from '../data/blogArticles';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiArticle = {
  slug?: string;
  title?: string;
  category?: string;
  categorySlug?: Article['categorySlug'];
  dateLabel?: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  excerpt?: string;
  featured?: boolean;
  linkedinUrl?: string;
  imageUrl?: string;
  intro?: string;
  keyPoints?: string[];
  paragraphs?: string[];
  quoteText?: string;
  quoteAuthor?: string;
  cover?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(url?: string) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

function coverUrl(cover: StrapiMedia | StrapiMedia[] | null | undefined) {
  if (!cover) return '';
  if (Array.isArray(cover)) return mediaUrl(cover[0]?.url);
  return mediaUrl(cover.url);
}

function mapArticle(row: StrapiArticle): Article | null {
  if (!row.slug || !row.title) return null;

  const cover = coverUrl(row.cover);

  return {
    id: row.slug,
    title: row.title,
    category: row.category || '',
    categorySlug: row.categorySlug || 'bim',
    date: row.dateLabel || '',
    readTime: row.readTime || '',
    author: row.author || 'HELSTOMM GROUP',
    authorRole: row.authorRole || '',
    image: resolveArticleImage(row.slug, cover || row.imageUrl),
    excerpt: row.excerpt || '',
    featured: Boolean(row.featured),
    linkedinUrl: articleLinkedInPost(row.linkedinUrl),
    content: {
      intro: row.intro || '',
      keyPoints: Array.isArray(row.keyPoints) ? row.keyPoints : [],
      paragraphs: Array.isArray(row.paragraphs) ? row.paragraphs : [],
      quote:
        row.quoteText && row.quoteAuthor
          ? { text: row.quoteText, author: row.quoteAuthor }
          : undefined,
    },
  };
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=cover&sort=publishedOn:desc&pagination[pageSize]=100`
    );

    if (!response.ok) {
      throw new Error(`Strapi articles request failed: ${response.status}`);
    }

    const payload = await response.json();
    const rows: StrapiArticle[] = Array.isArray(payload.data) ? payload.data : [];
    const articles = rows.map(mapArticle).filter((article): article is Article => article !== null);

    return articles.length > 0 ? articles : FALLBACK_ARTICLES;
  } catch (error) {
    console.warn('Tinklaraštis: using local articles because CMS is unavailable.', error);
    return FALLBACK_ARTICLES;
  }
}
