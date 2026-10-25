import { HERO_CARD_SEEDS, HERO_SETTING_SEED } from '../../cms/src/seeds/hero';
import type { HeroBlock, HeroCard, HeroCardAction, HeroIconKey } from '../types';

export const FALLBACK_HERO_BLOCK: HeroBlock = {
  ...HERO_SETTING_SEED,
  cards: HERO_CARD_SEEDS.filter((item) => item.enabled).map((item) => ({
    id: item.slug,
    title: item.title,
    description: item.description,
    ctaLabel: item.ctaLabel,
    action: item.action as HeroCardAction,
    targetSlug: item.targetSlug,
    iconKey: item.iconKey as HeroIconKey,
    iconUrl: '',
  })) as HeroCard[],
};
