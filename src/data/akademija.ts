export const AKADEMIJA_PROGRAMS = [
  'Sertifikuotas montuotojas',
  'Projektavimas su Filigran',
  'Montavimo specialistas objekte',
] as const;

export type AkademijaProgram = (typeof AKADEMIJA_PROGRAMS)[number];

export type AkademijaCalendarEvent = {
  dateLabel: string;
  dateNote: string;
  program: string;
  audience: string;
  audienceTone: 'lime' | 'blue';
  place: string;
  seatsLeft: number;
  seatsTotal: number;
};

export const AKADEMIJA_CALENDAR: AkademijaCalendarEvent[] = [
  {
    dateLabel: '11-12 / 11-13',
    dateNote: '2 dienos',
    program: 'Sertifikuotas montuotojas',
    audience: 'Statybininkams',
    audienceTone: 'lime',
    place: 'Gamykla, Vilnius',
    seatsLeft: 5,
    seatsTotal: 12,
  },
  {
    dateLabel: '11-20',
    dateNote: '14:00–16:00',
    program: 'Projektavimas su Filigran',
    audience: 'Konstruktoriams',
    audienceTone: 'blue',
    place: 'Nuotoliu',
    seatsLeft: 14,
    seatsTotal: 20,
  },
  {
    dateLabel: '12-03 / 12-04',
    dateNote: '2 dienos',
    program: 'Sertifikuotas montuotojas',
    audience: 'Statybininkams',
    audienceTone: 'lime',
    place: 'Gamykla, Vilnius',
    seatsLeft: 0,
    seatsTotal: 12,
  },
];

export const AKADEMIJA_CALENDAR_NOTE =
  'Grupei iš vienos įmonės mokymus galime surengti atskirai, sutartu laiku.';
