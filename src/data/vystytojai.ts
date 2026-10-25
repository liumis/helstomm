import { VYSTYTOJAI_BENEFIT_SEEDS, VYSTYTOJAI_SETTING_SEED } from '../../cms/src/seeds/vystytojai';
import type { DeveloperBlock } from '../types';

export const FALLBACK_DEVELOPER_BLOCK: DeveloperBlock = {
  ...VYSTYTOJAI_SETTING_SEED,
  benefits: VYSTYTOJAI_BENEFIT_SEEDS.map((item) => ({
    id: item.slug,
    title: item.title,
    stat: item.stat,
    description: item.description,
    iconUrl: item.iconUrl,
  })),
};
