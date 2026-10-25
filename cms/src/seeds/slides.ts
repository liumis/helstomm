export type SlideDownloadSeed = {
  label: string;
  url: string;
  icon: 'download' | 'code' | 'check';
};

export type SlideSeed = {
  slug: string;
  name: string;
  tabSubtitle: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  targetSlug: string;
  ctaLabel: string;
  ctaAction: 'view' | 'analysis';
  analysisCtaLabel: string;
  calculatorLabel: string;
  highlights: string;
  downloadsTitle: string;
  publishedInCarousel: boolean;
  sortOrder: number;
  downloads: SlideDownloadSeed[];
};

function defaultDownloads(prefix: string): SlideDownloadSeed[] {
  return [
    {
      label: 'Projektavimo vadovas',
      url: `/downloads/${prefix}_vadovas.pdf`,
      icon: 'download',
    },
    {
      label: 'Mazgai ir detalės',
      url: `/downloads/${prefix}_cad.zip`,
      icon: 'code',
    },
    {
      label: 'BIM / CAD objektai',
      url: `/downloads/${prefix}_bim.ifc`,
      icon: 'check',
    },
  ];
}

export const SLIDE_SEEDS: SlideSeed[] = [
  {
    slug: 'dviguba-siena',
    name: 'Dvigubos sienos',
    tabSubtitle: 'Laikančios sienos',
    badge: 'Dviguba siena',
    title: 'Dvigubos sienos',
    subtitle: 'Filigran surenkamos-monolitinės gelžbetoninės sienos',
    description:
      'Dviguba siena (2 sluoksniai) gaminama gamykloje kaip vienas elementas: du gelžbetonio sluoksniai, sujungti armatūros girderiais. Aikštelėje tarpas tarp sluoksnių užpildomas betonu – gaunama vientisa monolitinė siena. Tinka rūsiams, laiptinėms, liftų šachtoms ir daugiaaukščiams pastatams.',
    imageUrl: '/dviguba_siena.png',
    targetSlug: 'dviguba-siena',
    ctaLabel: 'Produkto specifikacija',
    ctaAction: 'view',
    analysisCtaLabel: 'Gauti projekto analizę',
    calculatorLabel: 'Skaičiuoklės: sienos storis, apsauginis sluoksnis',
    highlights: 'Nereikia klojinių\nLygūs paviršiai iš abiejų pusių\nTinka rūsiams ir šachtoms',
    downloadsTitle: 'Techninė medžiaga:',
    publishedInCarousel: true,
    sortOrder: 1,
    downloads: defaultDownloads('dviguba_siena'),
  },
  {
    slug: 'thermal-siena',
    name: 'Termo sienos',
    tabSubtitle: 'Su PIR izoliacija',
    badge: 'Termo siena (THERMAL)',
    title: 'Termo sienos (THERMAL)',
    subtitle: 'Trisluoksnės sienos su gamykloje įrengta PIR izoliacija',
    description:
      'Dviguba siena, PIR šilumos izoliacija ir išorinis gelžbetonio sluoksnis gaminami gamykloje kaip vienas elementas. Po betonavimo gaunama laikanti ir apšiltinta išorinė siena, kuriai nereikia atskiro fasado apšiltinimo. Skirta A++ energinės klasės pastatams.',
    imageUrl: '/thermal_trisluoksnes_sienos.png',
    targetSlug: 'thermal-siena',
    ctaLabel: 'Produkto specifikacija',
    ctaAction: 'view',
    analysisCtaLabel: 'Gauti projekto analizę',
    calculatorLabel: 'Skaičiuoklė: termo sienos U vertė',
    highlights: 'Izoliacija įrengta gamykloje\nBe atskiro fasado apšiltinimo\nA++ pastatams',
    downloadsTitle: 'Techninė medžiaga:',
    publishedInCarousel: true,
    sortOrder: 2,
    downloads: defaultDownloads('thermal_siena'),
  },
  {
    slug: 'perdangos',
    name: 'Perdangos',
    tabSubtitle: 'HalfSlab plokštės',
    badge: 'Perdanga (HalfSlab)',
    title: 'Perdangos (HalfSlab)',
    subtitle: 'Filigran surenkamos-monolitinės perdangų plokštės',
    description:
      'Gamyklinė gelžbetonio plokštė su apatine armatūra ir girderiais veikia kaip nuolatinis klojinys. Ant jos klojama viršutinė armatūra ir betonuojamas monolitinis sluoksnis. Gaunama vientisa dviatramė arba daugiatramė perdanga su lygiu gamykliniu lubų paviršiumi.',
    imageUrl: '/perdanga.png',
    targetSlug: 'perdangos',
    ctaLabel: 'Produkto specifikacija',
    ctaAction: 'view',
    analysisCtaLabel: 'Gauti projekto analizę',
    calculatorLabel: 'Skaičiuoklė: perdangos storis, įrąžymas',
    highlights: 'Nuolatinis klojinys\nLygus lubų paviršius\nMontuojant reikia tik ramščių',
    downloadsTitle: 'Techninė medžiaga:',
    publishedInCarousel: true,
    sortOrder: 3,
    downloads: defaultDownloads('perdanga'),
  },
  {
    slug: 'balkonai',
    name: 'Balkonai',
    tabSubtitle: 'Su terminėmis jungtimis',
    badge: 'Balkonai',
    title: 'Balkonai',
    subtitle: 'Balkonų plokštės su termoizoliacinėmis jungtimis',
    description:
      'Balkono plokštė gaminama gamykloje kartu su termoizoliacinės jungties elementu. Aikštelėje ji sumontuojama ir sujungiama su perdangos monolitiniu sluoksniu, o jungtis sumažina šalčio tiltelį tarp balkono ir pastato.',
    imageUrl: '/balkonai.png',
    targetSlug: 'balkonai',
    ctaLabel: 'Produkto specifikacija',
    ctaAction: 'view',
    analysisCtaLabel: 'Gauti projekto analizę',
    calculatorLabel: '',
    highlights: 'Jungtis įrengta gamykloje\nMažesnis šalčio tiltelis\nMontuojama kartu su perdanga',
    downloadsTitle: 'Techninė medžiaga:',
    publishedInCarousel: true,
    sortOrder: 4,
    downloads: defaultDownloads('balkonai'),
  },
  {
    slug: 'kitos-konstrukcijos',
    name: 'Kitos konstrukcijos',
    tabSubtitle: 'Pagal individualų projektą',
    badge: 'Kitos konstrukcijos',
    title: 'Kitos konstrukcijos',
    subtitle: 'Sijos, laiptinių sienos, Berlyno sienelės, inžineriniai statiniai',
    description:
      'Pagal individualų projektą gaminame ir kitus surenkamus-monolitinius elementus: sijų, laiptinių ir šachtų sienas, Berlyno sieneles, pamatų ir didelių apkrovų sienų konstrukcijas. Sprendimą parengia mūsų projektavimo skyrius.',
    imageUrl: '/kitos_konstrukcijos.png',
    targetSlug: 'inzineriniai',
    ctaLabel: 'Aptarti savo konstrukciją',
    ctaAction: 'analysis',
    analysisCtaLabel: '',
    calculatorLabel: '',
    highlights: 'Pagal individualų projektą\nProjektuojame patys\nInžineriniams statiniams',
    downloadsTitle: 'Techninė medžiaga:',
    publishedInCarousel: true,
    sortOrder: 5,
    downloads: defaultDownloads('kitos_konstrukcijos'),
  },
];
