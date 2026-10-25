import {
  DOKUMENTAI_SETTING_SEED,
  HOMEPAGE_SETTING_SEED,
  PROJEKTAI_SETTING_SEED,
  TINKLARASTIS_SETTING_SEED,
} from '../../cms/src/seeds/page-chrome';
import type {
  DokumentaiSettings,
  HomepageSettings,
  ProjektaiSettings,
  TinklarastisSettings,
} from '../types';

export const FALLBACK_HOMEPAGE: HomepageSettings = { ...HOMEPAGE_SETTING_SEED };

export const FALLBACK_PROJEKTAI: ProjektaiSettings = {
  ...PROJEKTAI_SETTING_SEED,
  filters: [...PROJEKTAI_SETTING_SEED.filters],
};

export const FALLBACK_TINKLARASTIS: TinklarastisSettings = {
  ...TINKLARASTIS_SETTING_SEED,
  categories: [...TINKLARASTIS_SETTING_SEED.categories],
};

export const FALLBACK_DOKUMENTAI: DokumentaiSettings = { ...DOKUMENTAI_SETTING_SEED };
