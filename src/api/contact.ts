import type { ContactSettings, SocialLinkItem, SocialPlatform, TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/helstommData';
import { attributionPayload } from '../lib/attribution';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = { url?: string };

export const FALLBACK_CONTACT_SETTINGS: ContactSettings = {
  heading: 'Susisiekite su mumis',
  subtitle: 'Pateikite užklausą arba prisegkite brėžinius nemokamai inžinerinei analizei',
  targetEmail: 'info@helstomm.lt',
  companyName: 'UAB „Helstomm Group“',
  address: 'Dūmų g. 3, Vilnius, LT-11119, Lietuva',
  phone: '+370 686 15499',
  publicEmail: 'info@helstomm.lt',
  copyrightText:
    'UAB „Helstomm Group“. Visos teisės saugomos. Filigran® Surenkamo Monolitinio Gelžbetonio Sprendimai.',
  footerLine:
    '© {year} UAB „Helstomm Group“. Visos teisės saugomos. Filigran® Surenkamo Monolitinio Gelžbetonio Sprendimai.',
  formLabel: 'Pildymo forma',
  namePlaceholder: 'Vardas*',
  emailPlaceholder: 'El. paštas*',
  filePlaceholder: '+ Įkelti failą',
  fileAttachedPrefix: 'Prisegtas:',
  submitLabel: 'Pateikti',
  submittingLabel: 'Siunčiama...',
  successTitle: 'Užklausa Pateikta Sėkmingai!',
  successText: 'Dėkojame, susisieksime su Jumis el. paštu {email} artimiausiu metu.',
  sendAnotherLabel: 'Siųsti Kito Projekto Užklausą',
  errorText: 'Nepavyko išsiųsti užklausos. Bandykite dar kartą.',
  addressLabel: 'Adresas:',
  phoneLabel: 'Telefonas:',
  emailLabel: 'El.p.:',
};

export const FALLBACK_SOCIAL_LINKS: SocialLinkItem[] = [
  { id: 'facebook', platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
  { id: 'instagram', platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/helstomm_group/' },
  { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/helstomm-group/' },
];

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-setting`);
    if (!response.ok) throw new Error(`settings ${response.status}`);
    const payload = await response.json();
    const row = payload.data || {};
    return {
      heading: row.heading || FALLBACK_CONTACT_SETTINGS.heading,
      subtitle: row.subtitle || FALLBACK_CONTACT_SETTINGS.subtitle,
      targetEmail: row.targetEmail || FALLBACK_CONTACT_SETTINGS.targetEmail,
      companyName: row.companyName || FALLBACK_CONTACT_SETTINGS.companyName,
      address: row.address || FALLBACK_CONTACT_SETTINGS.address,
      phone: row.phone || FALLBACK_CONTACT_SETTINGS.phone,
      publicEmail: row.publicEmail || FALLBACK_CONTACT_SETTINGS.publicEmail,
      copyrightText: row.copyrightText || FALLBACK_CONTACT_SETTINGS.copyrightText,
      footerLine:
        row.footerLine ||
        row.copyrightText ||
        FALLBACK_CONTACT_SETTINGS.footerLine,
      formLabel: row.formLabel || FALLBACK_CONTACT_SETTINGS.formLabel,
      namePlaceholder: row.namePlaceholder || FALLBACK_CONTACT_SETTINGS.namePlaceholder,
      emailPlaceholder: row.emailPlaceholder || FALLBACK_CONTACT_SETTINGS.emailPlaceholder,
      filePlaceholder: row.filePlaceholder || FALLBACK_CONTACT_SETTINGS.filePlaceholder,
      fileAttachedPrefix: row.fileAttachedPrefix || FALLBACK_CONTACT_SETTINGS.fileAttachedPrefix,
      submitLabel: row.submitLabel || FALLBACK_CONTACT_SETTINGS.submitLabel,
      submittingLabel: row.submittingLabel || FALLBACK_CONTACT_SETTINGS.submittingLabel,
      successTitle: row.successTitle || FALLBACK_CONTACT_SETTINGS.successTitle,
      successText: row.successText || FALLBACK_CONTACT_SETTINGS.successText,
      sendAnotherLabel: row.sendAnotherLabel || FALLBACK_CONTACT_SETTINGS.sendAnotherLabel,
      errorText: row.errorText || FALLBACK_CONTACT_SETTINGS.errorText,
      addressLabel: row.addressLabel || FALLBACK_CONTACT_SETTINGS.addressLabel,
      phoneLabel: row.phoneLabel || FALLBACK_CONTACT_SETTINGS.phoneLabel,
      emailLabel: row.emailLabel || FALLBACK_CONTACT_SETTINGS.emailLabel,
    };
  } catch (error) {
    console.warn('Contact settings fallback.', error);
    return FALLBACK_CONTACT_SETTINGS;
  }
}

export async function fetchContactPersons(): Promise<TeamMember[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/contact-persons?populate=photo&sort=sortOrder:asc&pagination[pageSize]=50`
    );
    if (!response.ok) throw new Error(`persons ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload.data) ? payload.data : [];
    const people = rows
      .map((row: { name?: string; position?: string; phone?: string; email?: string; photoUrl?: string; photo?: StrapiMedia | StrapiMedia[] | null }) => {
        if (!row.name || !row.email) return null;
        return {
          name: row.name,
          role: row.position || '',
          phone: row.phone || '',
          email: row.email,
          avatar: mediaUrl(row.photo) || row.photoUrl || '',
        } satisfies TeamMember;
      })
      .filter((item: TeamMember | null): item is TeamMember => item !== null);
    return people.length > 0 ? people : TEAM_MEMBERS;
  } catch (error) {
    console.warn('Contact persons fallback.', error);
    return TEAM_MEMBERS;
  }
}

export async function fetchSocialLinks(): Promise<SocialLinkItem[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/social-links?sort=sortOrder:asc&pagination[pageSize]=20`
    );
    if (!response.ok) throw new Error(`social ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload.data) ? payload.data : [];
    const links = rows
      .map((row: { documentId?: string; platform?: SocialPlatform; label?: string; url?: string }) => {
        if (!row.url || !row.platform) return null;
        return {
          id: row.documentId || row.url,
          platform: row.platform,
          label: row.label || row.platform,
          url: row.url,
        } satisfies SocialLinkItem;
      })
      .filter((item: SocialLinkItem | null): item is SocialLinkItem => item !== null);
    return links.length > 0 ? links : FALLBACK_SOCIAL_LINKS;
  } catch (error) {
    console.warn('Social links fallback.', error);
    return FALLBACK_SOCIAL_LINKS;
  }
}

function appendTracking(form: FormData) {
  if (typeof window === 'undefined') return;
  form.append('pageUrl', window.location.href);
  const attribution = attributionPayload();
  form.append('utmSource', attribution.utmSource);
  form.append('utmMedium', attribution.utmMedium);
  form.append('utmCampaign', attribution.utmCampaign);
  form.append('utmContent', attribution.utmContent);
  form.append('utmTerm', attribution.utmTerm);
  form.append('referrer', attribution.referrer);
  form.append('landingPath', attribution.landingPath);
}

async function postForm(path: string, form: FormData) {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Form submit failed: ${response.status}`);
  }
}

export async function submitContactForm(input: {
  name: string;
  email: string;
  file?: File | null;
}): Promise<void> {
  const form = new FormData();
  form.append('name', input.name);
  form.append('email', input.email);
  if (input.file) {
    form.append('attachment', input.file);
  }
  appendTracking(form);
  await postForm('/api/contact-form', form);
}

export async function submitAnalysisForm(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  details?: string;
  files?: File[];
}): Promise<void> {
  const form = new FormData();
  form.append('name', input.name);
  form.append('email', input.email);
  form.append('phone', input.phone || '');
  form.append('company', input.company || '');
  form.append('details', input.details || '');
  for (const file of input.files || []) {
    form.append('attachment', file);
  }
  appendTracking(form);
  await postForm('/api/analysis-form', form);
}

export async function submitTrainingForm(input: {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  company?: string;
  participantsCount?: string;
  topic?: string;
  program?: string;
  position?: string;
  groupDate?: string;
  preferredDate?: string;
  location?: string;
  objectAddress?: string;
  daysCount?: string;
  question?: string;
  newsConsent?: boolean;
}): Promise<void> {
  const form = new FormData();
  form.append('name', input.name);
  form.append('firstName', input.firstName || '');
  form.append('lastName', input.lastName || '');
  form.append('email', input.email);
  form.append('phone', input.phone);
  form.append('company', input.company || '');
  form.append('participantsCount', input.participantsCount || '');
  form.append('topic', input.topic || '');
  form.append('program', input.program || '');
  form.append('position', input.position || '');
  form.append('groupDate', input.groupDate || '');
  form.append('preferredDate', input.preferredDate || '');
  form.append('location', input.location || '');
  form.append('objectAddress', input.objectAddress || '');
  form.append('daysCount', input.daysCount || '');
  form.append('question', input.question || '');
  form.append('newsConsent', input.newsConsent ? 'true' : 'false');
  appendTracking(form);
  await postForm('/api/training-form', form);
}

export async function fetchAcademyGroups(program: string): Promise<Array<{ id: string; dateLabel: string; place: string; seatsLeft: number }>> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/mokymai-grupes?programa=${encodeURIComponent(program)}`);
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}
