import type {
  MokymaiBlock,
  MokymaiCalendarEvent,
  MokymaiFormTopic,
  MokymaiManual,
  MokymaiTopic,
} from '../types';
import { FALLBACK_MOKYMAI } from '../data/mokymai';

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, '') || '';

type StrapiMedia = {
  url?: string;
};

type StrapiTopic = {
  title?: string;
  description?: string;
};

type StrapiManual = {
  id?: number | string;
  title?: string;
  url?: string;
  fileSize?: string;
  file?: StrapiMedia | StrapiMedia[] | null;
};

type StrapiMokymai = {
  enabled?: boolean | null;
  badge?: string;
  title?: string;
  intro?: string;
  trainerLabel?: string;
  trainerName?: string;
  trainerRole?: string;
  trainerPhotoUrl?: string;
  trainerPhoto?: StrapiMedia | StrapiMedia[] | null;
  heading?: string;
  topicsIntro?: string;
  topics?: StrapiTopic[] | null;
  formTopics?: { title?: string }[] | null;
  certificateNote?: string;
  manualsHeading?: string;
  manuals?: StrapiManual[] | null;
  registerCta?: string;
  videoTitle?: string;
  videoTagline?: string;
  videoCaption?: string;
  videoPosterUrl?: string;
  videoBrand?: string;
  videoBrandHighlight?: string;
  downloadLabel?: string;
  calendarNote?: string;
  calendarEvents?: {
    dateLabel?: string;
    dateNote?: string;
    program?: string;
    audience?: string;
    audienceTone?: 'lime' | 'blue';
    place?: string;
    seatsLeft?: number;
    seatsTotal?: number;
  }[] | null;
};

function formatFileSize(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const bytes = Number((item as { size?: number } | undefined)?.size || 0);
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(0.1, bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function mediaUrl(file?: StrapiMedia | StrapiMedia[] | null) {
  const item = Array.isArray(file) ? file[0] : file;
  const url = item?.url;
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

export async function fetchMokymaiBlock(): Promise<MokymaiBlock> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/mokymai-setting?populate[topics]=true&populate[formTopics]=true&populate[calendarEvents]=true&populate[manuals][populate]=file&populate[trainerPhoto]=true`
    );
    if (!res.ok) throw new Error('Strapi mokymai request failed');

    const payload = await res.json();
    const data: StrapiMokymai = payload.data || {};
    const topics: MokymaiTopic[] = (data.topics || [])
      .filter((item): item is StrapiTopic & { title: string } => Boolean(item.title))
      .map((item) => ({
        title: item.title,
        description: item.description || '',
      }));
    const formTopics: MokymaiFormTopic[] = (data.formTopics || [])
      .filter((item): item is { title: string } => Boolean(item.title))
      .map((item) => ({ title: item.title }));
    const manuals: MokymaiManual[] = (data.manuals || [])
      .filter((item): item is StrapiManual & { title: string } => Boolean(item.title))
      .map((item, index) => {
        const fileUrl = mediaUrl(item.file);
        return {
          id: String(item.id ?? `manual-${index + 1}`),
          title: item.title,
          url: fileUrl || item.url || '',
          fileSize: item.fileSize || formatFileSize(item.file),
        };
      });
    const calendarEvents: MokymaiCalendarEvent[] = (data.calendarEvents || [])
      .filter((item): item is { dateLabel: string; program: string } & NonNullable<
        StrapiMokymai['calendarEvents']
      >[number] => Boolean(item.dateLabel && item.program))
      .map((item) => ({
        dateLabel: item.dateLabel,
        dateNote: item.dateNote || '',
        program: item.program,
        audience: item.audience || '',
        audienceTone: item.audienceTone === 'blue' ? 'blue' : 'lime',
        place: item.place || '',
        seatsLeft: Number(item.seatsLeft || 0),
        seatsTotal: Number(item.seatsTotal || 0),
      }));

    return {
      enabled: data.enabled !== false,
      badge: data.badge || FALLBACK_MOKYMAI.badge,
      title: data.title || FALLBACK_MOKYMAI.title,
      intro: data.intro || FALLBACK_MOKYMAI.intro,
      trainerLabel: data.trainerLabel || FALLBACK_MOKYMAI.trainerLabel,
      trainerName: data.trainerName || FALLBACK_MOKYMAI.trainerName,
      trainerRole: data.trainerRole || FALLBACK_MOKYMAI.trainerRole,
      trainerPhotoUrl:
        mediaUrl(data.trainerPhoto) || data.trainerPhotoUrl || FALLBACK_MOKYMAI.trainerPhotoUrl,
      heading: data.heading || FALLBACK_MOKYMAI.heading,
      topicsIntro: data.topicsIntro || FALLBACK_MOKYMAI.topicsIntro,
      topics,
      formTopics: formTopics.length > 0 ? formTopics : FALLBACK_MOKYMAI.formTopics,
      certificateNote: data.certificateNote || FALLBACK_MOKYMAI.certificateNote,
      manualsHeading: data.manualsHeading || FALLBACK_MOKYMAI.manualsHeading,
      manuals,
      registerCta: data.registerCta || FALLBACK_MOKYMAI.registerCta,
      videoTitle: data.videoTitle || FALLBACK_MOKYMAI.videoTitle,
      videoTagline: data.videoTagline || FALLBACK_MOKYMAI.videoTagline,
      videoCaption: data.videoCaption || FALLBACK_MOKYMAI.videoCaption,
      videoPosterUrl: data.videoPosterUrl || FALLBACK_MOKYMAI.videoPosterUrl,
      videoBrand: data.videoBrand || FALLBACK_MOKYMAI.videoBrand,
      videoBrandHighlight: data.videoBrandHighlight || FALLBACK_MOKYMAI.videoBrandHighlight,
      downloadLabel: data.downloadLabel || FALLBACK_MOKYMAI.downloadLabel,
      calendarNote: data.calendarNote || FALLBACK_MOKYMAI.calendarNote,
      calendarEvents: calendarEvents.length ? calendarEvents : FALLBACK_MOKYMAI.calendarEvents,
    };
  } catch (error) {
    console.warn('Mokymai: using local block because CMS is unavailable.', error);
    return FALLBACK_MOKYMAI;
  }
}
