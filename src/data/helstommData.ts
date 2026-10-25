import { ProductItem, AdvantageItem, TechnicalSpec, ProjectItem, NodeBlueprint, TeamMember, ManualDownload } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'MINDAUGAS DAGYS',
    role: 'Chief Technical Officer',
    phone: '+370 686 15499',
    email: 'mindaugas@helstomm.lt',
    avatar: '/Mindaugas.png'
  },
  {
    name: 'ANDRIUS GUZAITIS',
    role: 'Chief Administrative Officer',
    phone: '+370 650 79303',
    email: 'andrius@helstomm.lt',
    avatar: '/Andrius_Guzaitis.jpg'
  }
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'dviguba-siena',
    title: 'Dviguba siena',
    subtitle: '„Filigran“ surenkamos-monolitinės gelžbetoninės sienos',
    description: '„Filigran“ surenkamos-monolitinės gelžbetoninės sistemos sienos, projektuojamos perimti konstrukcines apkrovas. Idealu rūsiams, laiptinėms ir aukštumingai statybai.',
    image: '/dviguba_siena.png',
    viewKey: 'dviguba-siena',
    downloads: {
      guidePdf: '/downloads/dviguba_siena_vadovas.pdf',
      detailsCad: '/downloads/dviguba_siena_cad.zip',
      bimModel: '/downloads/dviguba_siena_bim.ifc'
    }
  },
  {
    id: 'thermal-siena',
    title: 'THERMAL trisluoksnės sienos',
    subtitle: '„Filigran“ surenkamos-monolitinės sienos su PIR izoliacija',
    description: '„Filigran“ surenkamos-monolitinės gelžbetoninės sistemos sienos su PIR šilumos izoliacija, projektuojamos perimti konstrukcines apkrovas ir užtikrinti A++ energinį efektyvumą.',
    image: '/thermal_trisluoksnes_sienos.png',
    viewKey: 'thermal-siena',
    downloads: {
      guidePdf: '/downloads/thermal_siena_vadovas.pdf',
      detailsCad: '/downloads/thermal_siena_cad.zip',
      bimModel: '/downloads/thermal_siena_bim.ifc'
    }
  },
  {
    id: 'perdanga',
    title: 'Perdanga',
    subtitle: '„Filigran“ surenkamos-monolitinės perdangų sistemos',
    description: '„Filigran“ surenkamos-monolitinės gelžbetoninės perdangos. Dviatramėms arba daugiatramėms perdangų sistemoms su lygiais gamykliniais paviršiais.',
    image: '/perdanga.png',
    viewKey: 'perdangos',
    downloads: {
      guidePdf: '/downloads/perdanga_vadovas.pdf',
      detailsCad: '/downloads/perdanga_cad.zip',
      bimModel: '/downloads/perdanga_bim.ifc'
    }
  },
  {
    id: 'balkonai',
    title: 'Balkonai',
    subtitle: 'Gelžbetoninės balkonų plokštės su termoizoliacinėmis jungtimis',
    description: 'Surenkamos-monolitinės balkonų plokštės su gamykliškai integruotu termoizoliaciniu elementu, visiškai panaikinančiu šalčio tiltelius.',
    image: '/balkonai.png',
    viewKey: 'balkonai',
    downloads: {
      guidePdf: '/downloads/balkonai_vadovas.pdf',
      detailsCad: '/downloads/balkonai_cad.zip',
      bimModel: '/downloads/balkonai_bim.ifc'
    }
  },
  {
    id: 'kitos-konstrukcijos',
    title: 'Kitos konstrukcijos',
    subtitle: 'Inžineriniai statiniai, sijos, laiptinių sienos, Berlyno sienelės',
    description: 'Kompozitiniai sprendimai specialiosioms pamatų, laiptinių, Berlyno sienelių bei aukštų apkrovų sienų konstrukcijoms.',
    image: '/kitos_konstrukcijos.png',
    viewKey: 'inzineriniai',
    downloads: {
      guidePdf: '/downloads/kitos_konstrukcijos_vadovas.pdf',
      detailsCad: '/downloads/kitos_konstrukcijos_cad.zip',
      bimModel: '/downloads/kitos_konstrukcijos_bim.ifc'
    }
  }
];

export const DVIGUBA_SIENA_ADVANTAGES: AdvantageItem[] = [
  {
    id: 'speed',
    title: 'MAKSIMALUS STATYBŲ GREITIS',
    description: 'Dėl didelių sienų gabaritų ir minimalių darbų objekte. Darbai atliekami greičiau 300% sparčiau nei monolitas, ir 30% greičiau nei surenkamas gelžbetonis.',
    iconName: 'Zap'
  },
  {
    id: 'integrity',
    title: 'MONOLITINIS VIENTISUMAS IR SANDARUMAS',
    description: 'Sistema užtikrina maksimalią konstrukcijos galią, ypatingą akustinį sandarumą ir vientisumą.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'smoothness',
    title: 'IDEALIAI LYGŪS ABIEJŲ PUSIŲ PAVIRŠIAI',
    description: 'Idealiai lygūs gamykliniai paviršiai, kuriems nereikia papildomo tinkavimo darbų.',
    iconName: 'Sparkles'
  },
  {
    id: 'all-in-one',
    title: 'VISKAS VIENAME (GAMYKLINĖ INTEGRACIJA)',
    description: 'Sienose jau gamykloje sumontuojamos elektros instaliacijos dėžutės, ŠVOK kanalai ir įdėtinės detalės.',
    iconName: 'Box'
  },
  {
    id: 'weight',
    title: 'MAŽESNIS SVORIS LENGVESNIS MONTAVIMAS',
    description: 'Filigran elementai yra lengvesni. Tai leidžia statybų aikštelėje naudoti mažesnės galios kranus.',
    iconName: 'Feather'
  },
  {
    id: 'aesthetic',
    title: 'ESTETIŠKOS IR MINIMALIOS SIŪLĖS',
    description: 'Tarpai tarp sumontuotų sienų elementų siekia vos 0–5 mm, todėl jų sandarinimas ir apdaila reikalauja minimalių pastangų.',
    iconName: 'Maximize2'
  },
  {
    id: 'transport',
    title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
    description: 'Dėl mažesnio tuščiavidurių elementų svorio transportuojama daug daugiau kvadratinių metrų sienų vienu reisu.',
    iconName: 'Truck'
  },
  {
    id: 'design',
    title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS',
    description: 'Standartizuoti mazgai, BIM modeliavimas ir visapusiška techninė pagalba visų etapų metu.',
    iconName: 'FileCheck'
  }
];

export const DVIGUBA_SIENA_SPECS: TechnicalSpec[] = [
  { label: 'Ilgis', value: 'iki 12,0 m' },
  { label: 'Plotis', value: 'iki 4,0 m' },
  { label: 'Bendras storis', value: 'iki 50 cm' },
  { label: 'Sienutės storis', value: '5 - 7 cm' },
  { label: 'Aplinkos klasės', value: 'XC1, XC3, XC4, XD3, XF2' },
  { label: 'Betono klasė', value: 'C30/37, C35/45' },
  { label: 'Gamybos standartas', value: 'EN 14992 (Gelžbetonio sienų elementai)' }
];

export const THERMAL_SPECS: TechnicalSpec[] = [
  { label: 'Ilgis', value: 'iki 12,0 m' },
  { label: 'Plotis', value: 'iki 4,0 m' },
  { label: 'Storis', value: 'iki 50 cm' },
  { label: 'Sienutės storis', value: '5 - 7 cm' },
  { label: 'Šilumos izoliacija', value: 'PIR (iki 200 mm, lambda 0.022 W/mK)' },
  { label: 'Aplinkos klasės', value: 'XC1, XC3, XC4, XD3, XF2' },
  { label: 'Betono klasė', value: 'C30/37, C35/45' },
  { label: 'Galimi paviršiai', value: 'Betonas, klinkeris, grafinis betonas, akmens plokštė, matrica' }
];

export const PERDANGOS_SPECS: TechnicalSpec[] = [
  { label: 'Ilgis', value: 'iki 10,0 m' },
  { label: 'Plotis', value: 'iki 2,5 m' },
  { label: 'Filigran plokštės storis', value: '50 - 70 mm' },
  { label: 'Projektuojamas perdangos storis', value: '200 - 250 mm' },
  { label: 'Aplinkos klasės', value: 'XC1, XC3, XC4, XD3, XF2' },
  { label: 'Betono klasė', value: 'C30/37, C35/45' },
  { label: 'Armavimas', value: 'Pagal konstrukcinius skaičiavimus bei erdvinį grotelių karkasą' }
];

export const BALKONAI_SPECS: TechnicalSpec[] = [
  { label: 'Ilgis', value: 'iki 8,0 m' },
  { label: 'Plotis', value: 'iki 3,5 m' },
  { label: 'Filigran plokštės storis', value: 'nuo 50 - 70 mm' },
  { label: 'Izoliacinis elementas', value: 'Termoizoliacinė jungtis su nerūdijančio plieno armatūra' },
  { label: 'Pavršiaus apdaila', value: 'Gamykliškai lygus, paruoštas dažymui ar hidrozoliacijai' }
];

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Aukštuminis gyvenamųjų namų kvartalas „Naujamiestis West“',
    category: 'gyvenamieji',
    categoryLabel: 'Gyvenamieji namai',
    image: '/Aukstuminis_gyvenamuju.jpeg',
    location: 'Vilnius, Lietuva',
    area: '14,500 m²',
    completionYear: '2025',
    savedTimeWeeks: 12
  },
  {
    id: 'p2',
    title: 'A++ Klasės Logistikos ir Gamybos Centras „Kaunas Logistics Hub“',
    category: 'industriniai',
    categoryLabel: 'Industriniai pastatai',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    location: 'Kaunas LEZ',
    area: '28,000 m²',
    completionYear: '2025',
    savedTimeWeeks: 18
  },
  {
    id: 'p3',
    title: 'Verslo ir Komercijos Centras „Green Office Park“',
    category: 'komerciniai',
    categoryLabel: 'Komerciniai pastatai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    location: 'Klaipėda',
    area: '9,200 m²',
    completionYear: '2024',
    savedTimeWeeks: 8
  },
  {
    id: 'p4',
    title: 'Kultūros ir Švietimo Daugiafunkcinis Kompleksas',
    category: 'viesieji',
    categoryLabel: 'Viešieji pastatai',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    location: 'Šiauliai',
    area: '6,400 m²',
    completionYear: '2024',
    savedTimeWeeks: 6
  },
  {
    id: 'p5',
    title: 'Pasyvių Individualių Namų Gyvenvietė „Neries Vingis“',
    category: 'individualūs',
    categoryLabel: 'Individuali statyba',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    location: 'Vilniaus raj.',
    area: '3,800 m²',
    completionYear: '2025',
    savedTimeWeeks: 5
  },
  {
    id: 'p6',
    title: 'Požeminis Inžinerinis Rūsys ir Sulaikymo Rezervuarai',
    category: 'inzineriniai',
    categoryLabel: 'Inžineriniai statiniai',
    image: '/pozeminis.jpg',
    location: 'Panevėžys',
    area: '4,100 m²',
    completionYear: '2025',
    savedTimeWeeks: 7
  }
];

export const MANUAL_DOWNLOADS: ManualDownload[] = [
  {
    id: 'm1',
    title: 'Plokščių montavimo instrukcija (Sienos ir Perdangos)',
    category: 'Montavimo vadovas',
    fileSize: '4.2 MB',
    downloadUrl: '#download-ploksčiu-instrukcija'
  },
  {
    id: 'm2',
    title: 'Surenkamų/monolitinių kompozitinių sienų montavimo vadovas',
    category: 'Konstrukcinė instrukcija',
    fileSize: '5.8 MB',
    downloadUrl: '#download-sienu-instrukcija'
  },
  {
    id: 'm3',
    title: 'Perdangų ir Balkonų montavimo technologinė kortelė',
    category: 'Techninis gidas',
    fileSize: '3.9 MB',
    downloadUrl: '#download-perdangu-instrukcija'
  },
  {
    id: 'm4',
    title: 'Helstomm Filigran BIM & CAD Mazgų Katalogo Katalogas (IFC/DWG)',
    category: 'BIM / CAD Archyvas',
    fileSize: '18.4 MB',
    downloadUrl: '#download-bim-cad'
  },
  {
    id: 'm5',
    title: 'CE Sertifikatai ir Atitikties Deklaracijos 2026',
    category: 'Gamybos dokumentai',
    fileSize: '2.1 MB',
    downloadUrl: '#download-sertifikatai'
  }
];

export const NODE_BLUEPRINTS: NodeBlueprint[] = [
  {
    id: 'n1',
    title: 'Sienos ir pamato jungties mazgas (M-01)',
    code: 'M-01',
    previewUrl: '/mazgai_jungtys.jpg',
    pdfUrl: '#pdf-m01',
    dwgUrl: '#dwg-m01'
  },
  {
    id: 'n2',
    title: 'Dvigubos sienos ir Filigran perdangos mazgas (M-02)',
    code: 'M-02',
    previewUrl: '/mazgai_jungtys.jpg',
    pdfUrl: '#pdf-m02',
    dwgUrl: '#dwg-m02'
  },
  {
    id: 'n3',
    title: 'THERMAL trisluoksnės sienos termoizoliacinis uzpatentas mazgas (M-03)',
    code: 'M-03',
    previewUrl: '/mazgai_jungtys.jpg',
    pdfUrl: '#pdf-m03',
    dwgUrl: '#dwg-m03'
  },
  {
    id: 'n4',
    title: 'Balkono Isokorb termo-jungties montavimo mazgas (M-04)',
    code: 'M-04',
    previewUrl: '/mazgai_jungtys.jpg',
    pdfUrl: '#pdf-m04',
    dwgUrl: '#dwg-m04'
  }
];
