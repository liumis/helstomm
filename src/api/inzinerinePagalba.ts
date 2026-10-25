import type { EngineeringHelpBanner } from '../types';
import { FALLBACK_ENGINEERING_HELP } from '../data/inzinerinePagalba';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiBanner = {
  enabled?: boolean | null;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  phone?: string;
  phoneLabel?: string;
};

export async function fetchEngineeringHelpBanner(): Promise<EngineeringHelpBanner> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/inzinerine-pagalba`);
    if (!res.ok) throw new Error('Strapi inzinerine-pagalba request failed');

    const payload = await res.json();
    const row: StrapiBanner = payload.data || {};

    return {
      enabled: row.enabled !== false,
      title: row.title || FALLBACK_ENGINEERING_HELP.title,
      subtitle: row.subtitle || FALLBACK_ENGINEERING_HELP.subtitle,
      ctaLabel: row.ctaLabel || FALLBACK_ENGINEERING_HELP.ctaLabel,
      phone: row.phone || FALLBACK_ENGINEERING_HELP.phone || '',
      phoneLabel: row.phoneLabel || FALLBACK_ENGINEERING_HELP.phoneLabel || '',
    };
  } catch (error) {
    console.warn('Inžinerinė pagalba: using local banner because CMS is unavailable.', error);
    return FALLBACK_ENGINEERING_HELP;
  }
}
