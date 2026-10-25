import { MOKYMAI_SETTING_SEED } from '../../cms/src/seeds/mokymai';
import type { MokymaiBlock, MokymaiManual } from '../types';
import { AKADEMIJA_CALENDAR, AKADEMIJA_CALENDAR_NOTE } from './akademija';

export const FALLBACK_MOKYMAI: MokymaiBlock = {
  ...MOKYMAI_SETTING_SEED,
  formTopics: MOKYMAI_SETTING_SEED.formTopics || [],
  manuals: (MOKYMAI_SETTING_SEED.manuals || []).map((item, index) => ({
    id: `manual-${index + 1}`,
    title: item.title,
    url: item.url,
    fileSize: item.fileSize,
  })) as MokymaiManual[],
  calendarNote: AKADEMIJA_CALENDAR_NOTE,
  calendarEvents: AKADEMIJA_CALENDAR,
};
