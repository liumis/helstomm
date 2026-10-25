export type DesignHotspotSeed = {
  title: string;
  description: string;
  techDetail: string;
  xPct: number;
  yPct: number;
};

export type DesignCategorySeed = {
  slug: string;
  name: string;
  menuTitle: string;
  menuIconName: string;
  badge: string;
  pageTitle: string;
  subtitle: string;
  pageIntro: string;
  diagramTitle: string;
  diagramSubtitle: string;
  diagramImageUrl: string;
  assemblyTitle: string;
  assemblyCaption: string;
  assemblyBackgroundUrl: string;
  ctaLabel: string;
  showInMenu: boolean;
  showOnHome?: boolean;
  cardBadge?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardImageUrl?: string;
  cardBadgeIcon?: 'Building' | 'Shield' | 'Leaf';
  cardTheme?: 'standard' | 'eco';
  cardTargetSlug?: string;
  cardCtaLabel?: string;
  cardIconKey?: 'pastatai' | 'inzineriniai' | 'tvarus';
  sortOrder: number;
  hotspots: DesignHotspotSeed[];
};

const BUILDING_HOTSPOTS: DesignHotspotSeed[] = [
  {
    title: 'Filigran Dvigubos Sienos Plokštės',
    description:
      'Gamykloje pagamintos dvi lygiagrečios 50-70 mm sienutės su erdviniu karkasu. Užtikrina idealų paviršių be tinkavimo.',
    techDetail: 'Sienos storis iki 50 cm | Betono klasė C30/37',
    xPct: 22,
    yPct: 35,
  },
  {
    title: 'Monolitinis Šerdis (Betonavimas)',
    description:
      'Objekte užpilamas prekinis betonas sujungia elementus į vientisą monolitinę karkaso struktūrą be jokių tradicinių klojinių.',
    techDetail: '100% Monolitinis vientisumas ir akustinė izoliacija',
    xPct: 55,
    yPct: 65,
  },
  {
    title: 'Filigran Perdangų Plokštė',
    description: 'Surenkama-monolitinė perdanga su integruota armatūra. Sutrumpina karkaso rengimo laiką iki 50%.',
    techDetail: 'Projektuojamas storis 200-250 mm',
    xPct: 75,
    yPct: 25,
  },
  {
    title: 'Termoizoliacinė Jungtis (Balkonai)',
    description: 'Isokorb tipo nerūdijančio plieno armavimo karkasas, visiškai eliminuojantis šalčio tiltelius.',
    techDetail: 'A++ Energetinė klasė ir Pasyvus standartas',
    xPct: 30,
    yPct: 80,
  },
];

const ENGINEERING_HOTSPOTS: DesignHotspotSeed[] = [
  {
    title: 'Vandeniui Neprataki Sienos Jungtis',
    description:
      'Surenkamų sienų sujungimas su monolitinio užpildo branduoliu, garantuojantis 100% hidroizoliacinį sandarumą pagal W-4/W-8 standartus.',
    techDetail: 'Aukštas atsparumas gruntiniams vandenims',
    xPct: 25,
    yPct: 30,
  },
  {
    title: 'Berlyno Sienelės Sulaikymo Karkasas',
    description:
      'Aukšto atsparumo gruntų sulaikymo sienos, tinkamos atviroms iškasoms bei šalia esantiems pamatams apsaugoti.',
    techDetail: 'Didelė laikomoji galia lenkimui ir šlyčiai',
    xPct: 65,
    yPct: 40,
  },
  {
    title: 'Surenkamas Rezervuaro Dugno & Sienų Mazgas',
    description: 'Rezervuarams ir valymo įrenginiams skirti kompozitiniai mazgai be tradicinių sunkiųjų klojinių.',
    techDetail: 'Ilgaamžis betonas C35/45 XF2/XD3',
    xPct: 50,
    yPct: 75,
  },
];

export const DESIGN_CATEGORY_SEEDS: DesignCategorySeed[] = [
  {
    slug: 'pastatai',
    name: 'Pastatai',
    menuTitle: 'Pastatai',
    menuIconName: 'Building2',
    badge: 'Surenkama-monolitinė Karkaso Sistema',
    pageTitle: 'PASTATAI',
    subtitle: 'Monolito tvirtumas. Gamyklos greitis.',
    pageIntro:
      'Viena sistema. Pilnai suderinti „Filigran“ sienų ir perdangų sprendimai visam pastato karkasui nuo pamatų iki stogo, garantuojantys greitą montavimą bei neribotą pritaikymo laisvę.',
    diagramTitle: 'PASTATO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte Filigran sienų ir perdangų jungtis',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Pastato Karkaso Analizę',
    showInMenu: true,
    showOnHome: true,
    cardBadge: 'Surenkamas gelžbetonis',
    cardTitle: 'Pastatai',
    cardDescription:
      'Filigran surenkama-monolitinė gelžbetonio sistema gyvenamiesiems ir komerciniams pastatams: nuo rūsio iki stogo.',
    cardImageUrl: '/Concrete_Vision_2018_pastatai.jpeg',
    cardBadgeIcon: 'Building',
    cardTheme: 'standard',
    cardTargetSlug: 'pastatai',
    cardCtaLabel: 'Sužinoti daugiau',
    cardIconKey: 'pastatai',
    sortOrder: 1,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'inzineriniai',
    name: 'Inžineriniai statiniai',
    menuTitle: 'Inžineriniai statiniai',
    menuIconName: 'Compass',
    badge: 'Specialioji Inžinerija',
    pageTitle: 'INŽINERINIAI STATINIAI',
    subtitle: '',
    pageIntro:
      '„Filigran“ kompozitinės konstrukcijos – pažangus sprendimas inžineriniams statiniams, sujungiantis monolito vientisumą ir gamyklinį tikslumą, garantuojantys ypatingą tvirtumą ir trumpiausią montavimo laiką.',
    diagramTitle: 'INŽINERINIŲ STATINIŲ MAZGAI',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte požeminių bei atraminių konstrukcijų jungtis',
    diagramImageUrl: '/kitos_konstrukcijos.png',
    assemblyTitle: 'LENGVAS SURINKIMAS KIEKVIENAM MONTUOTOJUI',
    assemblyCaption: 'Inžinerinių atraminių sienelių ir požeminių statinių Filigran karkaso montavimo instrukcija.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Gauti Inžinerinio Statinio Analizę',
    showInMenu: true,
    showOnHome: true,
    cardBadge: 'Specialioji inžinerija',
    cardTitle: 'Inžineriniai statiniai',
    cardDescription:
      'Atraminės sienos, kameros, rezervuarai ir kiti statiniai. Tinka vandeniui nepralaidžioms konstrukcijoms ir didelėms apkrovoms.',
    cardImageUrl: '/PROGRESS_Tiefbaukatalog_DE_2024_v12_SCREEN_Inzineriniai.jpeg',
    cardBadgeIcon: 'Shield',
    cardTheme: 'standard',
    cardTargetSlug: 'inzineriniai',
    cardCtaLabel: 'Sužinoti daugiau',
    cardIconKey: 'inzineriniai',
    sortOrder: 2,
    hotspots: ENGINEERING_HOTSPOTS,
  },
  {
    slug: 'tvarus-pastatas',
    name: 'Tvarus Pastatas (CO₂ betonas)',
    menuTitle: 'Tvarus Pastatas (CO₂ betonas)',
    menuIconName: 'Leaf',
    badge: 'Tvarumo ir CO₂ Mažinimo Sprendimai',
    pageTitle: 'TVARUS PASTATAS (CO₂ BETONAS)',
    subtitle: 'Žaliojo betono ir optimizuoto svertinio karkaso statybos technologija',
    pageIntro:
      'Inovatyvūs mažaangliai gelžbetonio sprendimai, sumažinantys konstrukcijų CO₂ pėdsaką iki 40%. Filigran elementai leidžia tiksliai dozuoti medžiagas ir užtikrinti žiedinės ekonomikos principus.',
    diagramTitle: 'TVARAUS PASTATO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte mažaanglio gelžbetonio karkaso mazgus',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: true,
    showOnHome: true,
    cardBadge: 'Žalioji linija',
    cardTitle: 'Tvari statyba (eco betonas)',
    cardDescription:
      'Betonas su mažesniu CO₂ pėdsaku. Padeda pasiekti A++ energinę klasę ir rinkti LEED / BREEAM taškų.',
    cardImageUrl: '/ECO betonas3.png',
    cardBadgeIcon: 'Leaf',
    cardTheme: 'eco',
    cardTargetSlug: 'tvarus-pastatas',
    cardCtaLabel: 'Sužinoti daugiau',
    cardIconKey: 'tvarus',
    sortOrder: 3,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'gyvenamieji-namai',
    name: 'Gyvenamieji namai',
    menuTitle: 'Gyvenamieji namai',
    menuIconName: 'Home',
    badge: 'Gyvenamosios Statybos Sprendimai',
    pageTitle: 'GYVENAMIEJI NAMAI',
    subtitle: 'Maksimali garso izoliacija ir greitas karkaso montavimas',
    pageIntro:
      'Optimalūs Filigran dvigubų sienų bei perdangų sprendimai daugiabučiams, kotedžams ir gyvenamųjų namų kvartalams. Užtikrinamas aukščiausias komfortas bei A++ energetinio naudingumo klasė.',
    diagramTitle: 'GYVENAMOJO NAMO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte Filigran sienų ir perdangų sprendimus daugiabučiams',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: false,
    sortOrder: 10,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'industriniai-pastatai',
    name: 'Industriniai pastatai',
    menuTitle: 'Industriniai pastatai',
    menuIconName: 'Factory',
    badge: 'Pramoninės Statybos Sprendimai',
    pageTitle: 'INDUSTRINIAI PASTATAI',
    subtitle: 'Išskirtinis tvirtumas, ilgaamžiškumas ir gamybinis efektyvumas',
    pageIntro:
      'Filigran gelžbetonio konstrukcijos gamykloms, sandėliams ir logistikos centrams. Užtikrinamos didelės apkrovos, atsparumas ugniai ir greita statybų eiga.',
    diagramTitle: 'INDUSTRINIO PASTATO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte pramoninius sienų ir perdangų mazgus',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: false,
    sortOrder: 11,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'komerciniai-pastatai',
    name: 'Komerciniai pastatai',
    menuTitle: 'Komerciniai pastatai',
    menuIconName: 'Landmark',
    badge: 'Verslo ir Prekybos Sprendimai',
    pageTitle: 'KOMERCINIAI PASTATAI',
    subtitle: 'Lanksčios erdvės, estetiški gamykliniai paviršiai ir maži eksploatacijos kaštai',
    pageIntro:
      'Aukštos kokybės Filigran konstrukcijos biurams, prekybos centrams bei daugiafunkciniams verslo kompleksams. Švarūs paviršiai sumažina apdailos darbus.',
    diagramTitle: 'KOMERCINIO PASTATO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte komercinių pastatų gelžbetonio sprendimus',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: false,
    sortOrder: 12,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'viesieji-pastatai',
    name: 'Viešieji pastatai',
    menuTitle: 'Viešieji pastatai',
    menuIconName: 'Landmark',
    badge: 'Visuomeninės Paskirties Statyba',
    pageTitle: 'VIEŠIEJI PASTATAI',
    subtitle: 'Padidintas saugumas, priešgaisrinė apsauga ir ilgalaikis patikimumas',
    pageIntro:
      'Sprendimai mokykloms, darželiams, ligoninėms ir administraciniams pastatams. Monolitinis vientisumas užtikrina ypatingą seisminį bei gaisrinį saugumą.',
    diagramTitle: 'VIEŠOJO PASTATO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte visuomeninių pastatų karkaso elementus',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: false,
    sortOrder: 13,
    hotspots: BUILDING_HOTSPOTS,
  },
  {
    slug: 'individuali-statyba',
    name: 'Individuali statyba',
    menuTitle: 'Individuali statyba',
    menuIconName: 'Hammer',
    badge: 'Privačių Namų Statybos Sprendimai',
    pageTitle: 'INDIVIDUALI STATYBA',
    subtitle: 'Moderni, greita ir itin tiksli vienbučių namų statyba',
    pageIntro:
      'Filigran technologija individualiems gyvenamiesiems namams ir viloms. Gamykloje pagaminti elementai garantuoja idealiai lygias sienas ir lubas.',
    diagramTitle: 'INDIVIDUALAUS NAMO KONSTRUKCINIS MODELIS',
    diagramSubtitle: 'Spustelėkite aktyvias nuorodas, kad pamatytumėte individualių namų Filigran karkasą',
    diagramImageUrl: '/80456-16320159.webp',
    assemblyTitle: 'GREITAS KONSTRUKCIJŲ SURINKIMAS',
    assemblyCaption:
      'Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.',
    assemblyBackgroundUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
    ctaLabel: 'Užsakyti Projekto Analizę',
    showInMenu: false,
    sortOrder: 14,
    hotspots: BUILDING_HOTSPOTS,
  },
];
