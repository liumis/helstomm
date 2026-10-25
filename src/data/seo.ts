import { SEO_PAGE_SEEDS } from '../../cms/src/seeds/seo';
import type { SeoPage } from '../types';

export const FALLBACK_SEO_PAGES: SeoPage[] = SEO_PAGE_SEEDS.map((page) => ({
  id: page.slug,
  slug: page.slug,
  path: page.path,
  title: page.title,
  description: page.description,
  ogTitle: page.ogTitle,
  ogDescription: page.ogDescription,
  ogImageUrl: page.ogImageUrl,
  indexable: page.indexable,
}));

export const DEFAULT_SEO: SeoPage = FALLBACK_SEO_PAGES.find((page) => page.slug === 'home') || {
  id: 'home',
  slug: 'home',
  path: '/',
  title: 'Helstomm Group - Statybos Sprendimai',
  description:
    'Surenkama-monolitinė Filigran sistema ir sprendimai vienoje vietoje pagal aukščiausius vokiškos inžinerijos standartus.',
  ogTitle: 'Helstomm Group - Statybos Sprendimai',
  ogDescription:
    'Surenkama-monolitinė Filigran sistema ir sprendimai vienoje vietoje pagal aukščiausius vokiškos inžinerijos standartus.',
  ogImageUrl: '/construction_steel_site.jpg',
  indexable: true,
};
