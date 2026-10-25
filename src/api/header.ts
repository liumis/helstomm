import type { HeaderSettings } from '../types';
import { FALLBACK_HEADER } from '../data/header';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = { url?: string };
type StrapiHeader = Partial<HeaderSettings> & {
  logo?: StrapiMedia | StrapiMedia[] | null;
};

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function fetchHeaderSettings(): Promise<HeaderSettings> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/header-setting?populate=*`);
    if (!res.ok) throw new Error('Strapi header request failed');

    const payload = await res.json();
    const data: StrapiHeader = payload.data || {};

    return {
      companyLine: data.companyLine || FALLBACK_HEADER.companyLine,
      phone: data.phone || FALLBACK_HEADER.phone,
      email: data.email || FALLBACK_HEADER.email,
      pillMokymai: data.pillMokymai || FALLBACK_HEADER.pillMokymai,
      pillEko: data.pillEko || FALLBACK_HEADER.pillEko,
      pillAnalysis: data.pillAnalysis || FALLBACK_HEADER.pillAnalysis,
      menuProjektavimas: data.menuProjektavimas || FALLBACK_HEADER.menuProjektavimas,
      menuProduktai: data.menuProduktai || FALLBACK_HEADER.menuProduktai,
      menuGamyba: data.menuGamyba || FALLBACK_HEADER.menuGamyba,
      menuProjektai: data.menuProjektai || FALLBACK_HEADER.menuProjektai,
      menuDokumentai: data.menuDokumentai || FALLBACK_HEADER.menuDokumentai,
      menuTinklarastis: data.menuTinklarastis || FALLBACK_HEADER.menuTinklarastis,
      designDropdownLabel: data.designDropdownLabel || FALLBACK_HEADER.designDropdownLabel,
      designDropdownFooter: data.designDropdownFooter || FALLBACK_HEADER.designDropdownFooter,
      productsDropdownLabel: data.productsDropdownLabel || FALLBACK_HEADER.productsDropdownLabel,
      productsDropdownFooter: data.productsDropdownFooter || FALLBACK_HEADER.productsDropdownFooter,
      roiCtaLabel: data.roiCtaLabel || FALLBACK_HEADER.roiCtaLabel,
      mobileNavLabel: data.mobileNavLabel || FALLBACK_HEADER.mobileNavLabel,
      mobileHome: data.mobileHome || FALLBACK_HEADER.mobileHome,
      mobilePastatai: data.mobilePastatai || FALLBACK_HEADER.mobilePastatai,
      mobileDokumentai: data.mobileDokumentai || FALLBACK_HEADER.mobileDokumentai,
      mobileTinklarastis: data.mobileTinklarastis || FALLBACK_HEADER.mobileTinklarastis,
      mobileMokymaiCta: data.mobileMokymaiCta || FALLBACK_HEADER.mobileMokymaiCta,
      mobileAnalysisCta: data.mobileAnalysisCta || FALLBACK_HEADER.mobileAnalysisCta,
      logoUrl: mediaUrl(data.logo) || data.logoUrl || FALLBACK_HEADER.logoUrl,
      brandName: data.brandName || FALLBACK_HEADER.brandName,
      brandHighlight: data.brandHighlight || FALLBACK_HEADER.brandHighlight,
      brandTagline: data.brandTagline || FALLBACK_HEADER.brandTagline,
    };
  } catch (error) {
    console.warn('Header: using local labels because CMS is unavailable.', error);
    return FALLBACK_HEADER;
  }
}
