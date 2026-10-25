export type ProjectSeed = {
  slug: string;
  name: string;
  category: 'gyvenamieji' | 'industriniai' | 'komerciniai' | 'viesieji' | 'individualus' | 'inzineriniai';
  timeWeeks: number;
  location: string;
  area: string;
  imageUrl: string;
  sortOrder: number;
};

export const PROJECT_SEEDS: ProjectSeed[] = [
  {
    slug: 'naujamiestis-west',
    name: 'Aukštuminis gyvenamųjų namų kvartalas „Naujamiestis West“',
    category: 'gyvenamieji',
    timeWeeks: 12,
    location: 'Vilnius, Lietuva',
    area: '14,500 m²',
    imageUrl: '/Aukstuminis_gyvenamuju.jpeg',
    sortOrder: 1,
  },
  {
    slug: 'kaunas-logistics-hub',
    name: 'A++ Klasės Logistikos ir Gamybos Centras „Kaunas Logistics Hub“',
    category: 'industriniai',
    timeWeeks: 18,
    location: 'Kaunas LEZ',
    area: '28,000 m²',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    sortOrder: 2,
  },
  {
    slug: 'green-office-park',
    name: 'Verslo ir Komercijos Centras „Green Office Park“',
    category: 'komerciniai',
    timeWeeks: 8,
    location: 'Klaipėda',
    area: '9,200 m²',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    sortOrder: 3,
  },
  {
    slug: 'kulturos-svietimo-kompleksas',
    name: 'Kultūros ir Švietimo Daugiafunkcinis Kompleksas',
    category: 'viesieji',
    timeWeeks: 6,
    location: 'Šiauliai',
    area: '6,400 m²',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    sortOrder: 4,
  },
  {
    slug: 'neries-vingis',
    name: 'Pasyvių Individualių Namų Gyvenvietė „Neries Vingis“',
    category: 'individualus',
    timeWeeks: 5,
    location: 'Vilniaus raj.',
    area: '3,800 m²',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    sortOrder: 5,
  },
  {
    slug: 'pozeminis-rusys-rezervuarai',
    name: 'Požeminis Inžinerinis Rūsys ir Sulaikymo Rezervuarai',
    category: 'inzineriniai',
    timeWeeks: 7,
    location: 'Panevėžys',
    area: '4,100 m²',
    imageUrl: '/pozeminis.jpg',
    sortOrder: 6,
  },
];
