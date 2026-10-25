import { SLIDE_SEEDS } from '../../cms/src/seeds/slides';
import type { CarouselSlide } from '../types';

export const FALLBACK_SLIDES: CarouselSlide[] = SLIDE_SEEDS.map((slide) => ({
  id: slide.slug,
  slug: slide.slug,
  name: slide.name,
  tabSubtitle: slide.tabSubtitle,
  badge: slide.badge,
  title: slide.title,
  subtitle: slide.subtitle,
  description: slide.description,
  image: slide.imageUrl,
  targetSlug: slide.targetSlug,
  ctaLabel: slide.ctaLabel,
  ctaAction: slide.ctaAction,
  analysisCtaLabel: slide.analysisCtaLabel,
  calculatorLabel: slide.calculatorLabel,
  highlights: (slide.highlights || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  downloadsTitle: slide.downloadsTitle,
  downloads: slide.downloads,
}));
