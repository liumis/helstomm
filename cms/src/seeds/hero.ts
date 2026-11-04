export const HERO_SETTING_SEED = {
  enabled: true,
  badge: 'Surenkama-monolitinė Filigran Technologija',
  title: 'MES KEIČIAME',
  highlight: 'STATYBOS PROCESĄ',
  intro:
    'Nuo sprendimo iki įgyvendinimo – 4 žingsniai, vienas partneris ir viena atsakomybė už visas konstrukcijas.',
  primaryCtaLabel: 'Gauti projektų analizę',
  secondaryCtaLabel: 'Palyginti kainą',
  backgroundUrl: '/filigran_construction_site.jpg',
};

export const HERO_CARD_SEEDS = [
  {
    slug: 'technine-konsultacija',
    title: 'Analizė',
    enabled: true,
    description:
      'Įvertiname jūsų brėžinius ir pasiūlome optimalų konstrukcinį sprendimą su preliminaria kaina ir terminu. Nemokamai, per 5 darbo dienas.',
    ctaLabel: 'Gauti projekto analizę',
    action: 'analysis' as const,
    targetSlug: '',
    iconKey: 'konsultacija' as const,
    sortOrder: 1,
  },
  {
    slug: 'projektavimas-bim',
    title: 'Projektavimas (BIM)',
    enabled: true,
    description:
      'Parengiame konstrukcijų projektą ir gaminio darbo brėžinius 3D modelyje. Sandūras ir mazgus suderiname dar prieš gamybą.',
    ctaLabel: 'Projektavimo vadovas',
    action: 'view' as const,
    targetSlug: 'dokumentai/projektavimo-vadovas',
    iconKey: 'projektavimas' as const,
    sortOrder: 2,
  },
  {
    slug: 'surenkama-gamyba',
    title: 'Gamyba',
    enabled: true,
    description:
      'Filigran sienas ir HalfSlab perdangas gaminame gamykloje kontroliuojamomis sąlygomis, pagal montavimo grafiką ir eiliškumą.',
    ctaLabel: 'Kaip gaminame',
    action: 'view' as const,
    targetSlug: 'gamyba',
    iconKey: 'gamyba' as const,
    sortOrder: 3,
  },
  {
    slug: 'statybos-darbai',
    title: 'Montavimas',
    enabled: true,
    description:
      'Pristatome gaminius pagal grafiką ir sumontuojame juos aikštelėje. Aukštas sumontuojame per kelias dienas.',
    ctaLabel: 'Montavimo instrukcija',
    action: 'view' as const,
    targetSlug: 'dokumentai/hg-cw-inst-001',
    iconKey: 'montavimas' as const,
    sortOrder: 4,
  },
];
