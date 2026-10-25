export type ProductSeed = {
  slug: string;
  name: string;
  menuTitle: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  menuIconUrl: string;
  badge: string;
  pageTitle: string;
  pageIntro: string;
  tilesSectionTitle: string;
  tilesSelectable: boolean;
  tilesColumns: number;
  schemaTitle: string;
  schemaImageUrl: string;
  catalogLabel: string;
  jointsTitle: string;
  jointsCtaLabel: string;
  showInMenu: boolean;
  showInCarousel: boolean;
  sortOrder: number;
  layout: 'standard' | 'engineering';
  guidePdfUrl: string;
  detailsCadUrl: string;
  bimModelUrl: string;
  advantages: { title: string; description: string; iconUrl: string }[];
  specs: { label: string; value: string }[];
  tiles: { title: string; tileKey?: string; imageUrl: string }[];
  joints: { title: string; acronym: string; imageUrl: string }[];
  schemaParagraphs: { highlight?: string; text: string }[];
};

const SHARED_JOINTS: ProductSeed['joints'] = [
  {
    title: 'Sienos ir pamato jungties mazgas (M-01)',
    acronym: 'M-01',
    imageUrl: '/mazgai_jungtys.jpg',
  },
  {
    title: 'Dvigubos sienos ir Filigran perdangos mazgas (M-02)',
    acronym: 'M-02',
    imageUrl: '/mazgai_jungtys.jpg',
  },
  {
    title: 'THERMAL trisluoksnės sienos termoizoliacinis uzpatentas mazgas (M-03)',
    acronym: 'M-03',
    imageUrl: '/mazgai_jungtys.jpg',
  },
  {
    title: 'Balkono Isokorb termo-jungties montavimo mazgas (M-04)',
    acronym: 'M-04',
    imageUrl: '/mazgai_jungtys.jpg',
  },
];

export const PRODUCT_SEEDS: ProductSeed[] = [
  {
    slug: 'dviguba-siena',
    name: 'Dviguba siena',
    menuTitle: 'Dviguba siena („Filigran“)',
    subtitle: '„Filigran“ surenkamos-monolitinės gelžbetoninės sienos',
    description:
      '„Filigran“ surenkamos-monolitinės gelžbetoninės sistemos sienos, projektuojamos perimti konstrukcines apkrovas. Idealu rūsiams, laiptinėms ir aukštumingai statybai.',
    imageUrl: '/dviguba_siena.png',
    menuIconUrl: '/Dviguba_Siena_filigran.svg',
    badge: 'Surenkamas Gelžbetonis',
    pageTitle: 'DVIGUBA FILIGRAN SIENA',
    pageIntro:
      'Dvigubos Filigran sienos sprendimas, lenkiantis įprastą monolitą greičiu, o standartinį prefab – neribota pritaikymo laisve ir monolitiniu vientisumu. Dėl unikalių konstrukcinių savybių sistema idealiai tinka bet kokiems architektūriniams sprendimams: nuo sudėtingų požeminių rūsių iki aukštuminės statybos.',
    tilesSectionTitle: 'KONSTRUKCINIAI SPRENDIMAI',
    tilesSelectable: false,
    tilesColumns: 6,
    schemaTitle: 'KONSTRUKCINĖ SCHEMA',
    schemaImageUrl: '/dviguba_siena.png',
    catalogLabel: 'Atsisiųsti Techninį Katalogą',
    jointsTitle: 'MAZGAI - JUNGTYS',
    jointsCtaLabel: 'Užsakyti Individualų Mazgų Projektavimą',
    showInMenu: true,
    showInCarousel: true,
    sortOrder: 1,
    layout: 'standard',
    guidePdfUrl: '/downloads/dviguba_siena_vadovas.pdf',
    detailsCadUrl: '/downloads/dviguba_siena_cad.zip',
    bimModelUrl: '/downloads/dviguba_siena_bim.ifc',
    tiles: [
      { title: 'Vidinės sienos', imageUrl: '/Vidine_Siena.png' },
      { title: 'Laiptinių sienos', imageUrl: '/Laiptiniu_siena.png' },
      { title: 'Berlyno sienelė', imageUrl: '/Berlyno.png' },
      { title: 'Aukštos sienos', imageUrl: '/aukstos_sienos.png' },
      { title: 'Išorinės sienos', imageUrl: '/Isorine_Siena.png' },
      { title: 'Rūsio sienos', imageUrl: '/Rusio.png' },
    ],
    schemaParagraphs: [
      {
        text: 'Dviguba Filigran siena gaminama gamykloje kaip vienas surenkamas-monolitinis elementas iš dviejų gelžbetonio sluoksnių (sienučių). Sluoksniai gamykloje standžiai sujungiami erdviniu armatūros karkasu – girderiais.',
      },
      {
        text: 'Aikštelėje elementas sumontuojamas, o tarpas tarp sluoksnių užpildomas betonu. Gaunama vientisa monolitinė siena be sieninių klojinių montavimo ir ardymo.',
      },
    ],
    specs: [
      { label: 'Ilgis', value: 'iki 12,0 m' },
      { label: 'Plotis', value: 'iki 3,75 m' },
      { label: 'Bendras storis', value: 'iki 50 cm' },
      { label: 'Sienutės storis', value: '5–7 cm' },
      { label: 'Betono klasė', value: 'C30/37, C35/45' },
      { label: 'Aplinkos klasės', value: 'pagal projektą (XC, XD, XF)' },
      { label: 'Gamybos standartas', value: 'LST EN 14992 (gelžbetonio sienų elementai)' },
    ],
    advantages: [
      {
        title: 'MAKSIMALUS STATYBŲ GREITIS',
        description:
          'Dėl didelių sienų gabaritų ir minimalių darbų objekte. Darbai atliekami greičiau: 300 % sparčiau nei monolitas, ir 30% greičiau nei surenkamas gelžbetonis',
        iconUrl: '/privalumai_maksimalus.svg',
      },
      {
        title: 'MONOLITINIS VIENTISUMAS IR SANDARUMAS',
        description: 'Sistema užtikrina maksimalią konstrukcijos galią, ypatingą akustinį sandarumą ir vientisumą.',
        iconUrl: '/privalumai_monolitinis.svg',
      },
      {
        title: 'IDEALIAI LYGŪS ABIEJŲ PUSIŲ PAVIRŠIAI',
        description: 'Idealiai lygūs gamykliniai paviršiai, kuriems nereikia papildomo tinkavimo darbų.',
        iconUrl: '/privalumai_idealiai_lygus_double.svg',
      },
      {
        title: 'VISKAS VIENAME (GAMYKLINĖ INTEGRACIJA)',
        description: 'Sienose jau gamykloje sumontuojamos elektros instaliacijos dėžutės, ŠVOK kanalai ir įdėtinės detalės.',
        iconUrl: '/privalumai_viskas_viename.svg',
      },
      {
        title: 'MAŽESNIS SVORIS LENGVESNIS MONTAVIMAS',
        description: 'Filigran elementai yra lengvesni. Tai leidžia statybų aikštelėje naudoti mažesnės galios kranus.',
        iconUrl: '/privalumai_mazesnis_svoris.svg',
      },
      {
        title: 'ESTETIŠKOS IR MINIMALIOS SIŪLĖS',
        description:
          'Tarpai tarp sumontuotų sienų elementų siekia vos 0–5 mm, todėl jų sandarinimas ir apdaila reikalauja minimalių pastangų.',
        iconUrl: '/privalumai_estetiskos.svg',
      },
      {
        title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
        description: 'Dėl mažesnio tuščiavidurių elementų svorio transportuojama daug daugiau kvadratinių metrų sienų vienu reisu.',
        iconUrl: '/privalumai_efektyvesnis.svg',
      },
      {
        title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS',
        description: 'Standartizuoti mazgai, BIM modeliavimas ir visapusiška techninė pagalba visų etapų metu.',
        iconUrl: '/privalumai_sklandus.svg',
      },
    ],
    joints: SHARED_JOINTS,
  },
  {
    slug: 'thermal-siena',
    name: 'THERMAL trisluoksnės sienos',
    menuTitle: 'THERMAL trisluoksnės sienos',
    subtitle: '„Filigran“ surenkamos-monolitinės sienos su PIR izoliacija',
    description:
      '„Filigran“ surenkamos-monolitinės gelžbetoninės sistemos sienos su PIR šilumos izoliacija, projektuojamos perimti konstrukcines apkrovas ir užtikrinti A++ energinį efektyvumą.',
    imageUrl: '/thermal_trisluoksnes_sienos.png',
    menuIconUrl: '/Thermal_trisluoksnes_sienos.svg',
    badge: 'A++ Energinė Klasė & Pasyvus Pastatas',
    pageTitle: 'THERMAL TRISLUOKSNĖ FILIGRAN SIENA',
    pageIntro:
      'Thermal trisluoksnės sienos sujungia monolitinę konstrukciją ir gamykloje integruotą šilumos izoliaciją (PIR). Įvairūs išorinės apdailos tipai leidžia įgyvendinti bet kokius architektūrinius sprendinius be šalčio tiltelių.',
    tilesSectionTitle: 'SIENOS APDAILOS TIPAI',
    tilesSelectable: true,
    tilesColumns: 5,
    schemaTitle: 'KONSTRUKCINĖ SCHEMA',
    schemaImageUrl: '/thermal_trisluoksnes_sienos.png',
    catalogLabel: 'Atsisiųsti THERMAL Katalogą',
    jointsTitle: 'MAZGAI - JUNGTYS',
    jointsCtaLabel: 'Užsakyti THERMAL Sienų Analizę',
    showInMenu: true,
    showInCarousel: true,
    sortOrder: 2,
    layout: 'standard',
    guidePdfUrl: '/downloads/thermal_siena_vadovas.pdf',
    detailsCadUrl: '/downloads/thermal_siena_cad.zip',
    bimModelUrl: '/downloads/thermal_siena_bim.ifc',
    tiles: [
      { title: 'Betoninis paviršius', tileKey: 'betonas', imageUrl: '/betoninis.png' },
      { title: 'Grafinis betonas', tileKey: 'grafinis', imageUrl: '/grafinis_betonas.png' },
      { title: 'Klinkerio plytelės', tileKey: 'klinkeris', imageUrl: '/klinkeris.png' },
      { title: 'Su matrica (Tekstūra)', tileKey: 'matrica', imageUrl: '/matrica.png' },
      { title: 'Akmens plokštė', tileKey: 'akmuo', imageUrl: '/akmens_plokste.png' },
    ],
    schemaParagraphs: [
      {
        text: 'Termo siena (THERMAL) gaminama gamykloje kaip vienas trisluoksnis elementas: du gelžbetonio sluoksniai ir tarp jų gamykloje įrengta norimo storio PIR šilumos izoliacija.',
      },
      {
        text: 'Aikštelėje laikanti dalis užpildoma betonu. Vienu etapu gaunama laikanti ir apšiltinta siena su minimaliais šalčio tilteliais – tinka A++ ir pasyviems pastatams.',
      },
    ],
    specs: [
      { label: 'Ilgis', value: 'iki 12,0 m' },
      { label: 'Plotis', value: 'iki 3,75 m' },
      { label: 'Bendras storis', value: 'iki 50 cm' },
      { label: 'Sienutės storis', value: '5–7 cm' },
      { label: 'Šilumos izoliacija', value: 'PIR iki 200 mm, λ = 0,022 W/(m·K)' },
      { label: 'Betono klasė', value: 'C30/37, C35/45' },
      { label: 'Aplinkos klasės', value: 'pagal projektą' },
      { label: 'Išorinis paviršius', value: 'betonas, klinkeris, grafinis betonas, akmens plokštės, matrica' },
    ],
    advantages: [
      {
        title: 'ARCHITEKTŪRINIS PAVIRŠIUS',
        description: 'Galimybės įvairaus architektūrinio apdailinio paviršiaus',
        iconUrl: '/privalumai_architekturinis.svg',
      },
      {
        title: 'MAXIMALUS ENERGETINIS EFEKTYVUMAS',
        description: 'Integruotas vientisas izoliacinis sluoksnis garantuoja nepriekaištingą šiluminę varžą',
        iconUrl: '/privalumai_maximalus_energetinis.svg',
      },
      {
        title: 'IDEALIAI LYGŪS ABIEJŲ PUSIŲ PAVIRŠIAI',
        description: 'Idealiai lygūs paviršiai be tinkavimo',
        iconUrl: '/privalumai_idealiai_lygus_double.svg',
      },
      {
        title: 'VISKAS VIENAME (GAMYKLINĖ INTEGRACIJA)',
        description: 'Sienose gamykloje sumontuojamos elektros instaliacijos dėžutės, ŠVOK kanalai.',
        iconUrl: '/privalumai_viskas_viename.svg',
      },
      {
        title: 'MONOLITINIS VIENTISUMAS IR SANDARUMAS',
        description: 'Sistema užtikrina maksimalią konstrukcijos galią, ypatingą akustinį sandarumą ir vientisumą.',
        iconUrl: '/privalumai_monolitinis.svg',
      },
      {
        title: 'MAKSIMALUS STATYBŲ GREITIS',
        description:
          'Dėl didelių sienų gabaritų ir minimalių darbų objekte. Darbai atliekami greičiau: 300 % sparčiau nei monolitas, ir 30% greičiau nei surenkamas gelžbetonis',
        iconUrl: '/privalumai_maksimalus.svg',
      },
      {
        title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
        description: 'Dėl mažesnio tuštividurių elementų svorio transportuojama daug daugiau kvadratinių metrų sienų.',
        iconUrl: '/privalumai_efektyvesnis.svg',
      },
      {
        title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS',
        description: 'Standartizuoti mazgai, BIM ir techninė pagalba',
        iconUrl: '/privalumai_sklandus.svg',
      },
    ],
    joints: SHARED_JOINTS,
  },
  {
    slug: 'perdangos',
    name: 'Perdanga',
    menuTitle: 'Perdangos (Filigran & Akustinė)',
    subtitle: '„Filigran“ surenkamos-monolitinės perdangų sistemos',
    description:
      '„Filigran“ surenkamos-monolitinės gelžbetoninės perdangos. Dviatramėms arba daugiatramėms perdangų sistemoms su lygiais gamykliniais paviršiais.',
    imageUrl: '/perdanga.png',
    menuIconUrl: '/Perdangos_Filigran_akustine.svg',
    badge: 'Iki 50% Greitesnis Įrengimas',
    pageTitle: 'PERDANGOS',
    pageIntro:
      '„Filigran“ surenkamos-monolitinės perdangų plokštės – tai pažangus sprendimas, iki 50% pagreitinantis perdangų įrengimą statybvietėje. Mūsų „Filigran“ perdangos sukurtos taip, kad idealiai ir be papildomų klojinių susijungtų su „Double Wall“ sienų elementais, suformuojant vientisą, monolitinį pastato karkasą.',
    tilesSectionTitle: 'KONSTRUKCINIAI SPRENDIMAI',
    tilesSelectable: false,
    tilesColumns: 3,
    schemaTitle: 'KONSTRUKCINĖ SCHEMA',
    schemaImageUrl: '/perdanga.png',
    catalogLabel: 'Atsisiųsti Perdangų Katalogą',
    jointsTitle: 'MAZGAI - JUNGTYS',
    jointsCtaLabel: 'Užsakyti Perdangų Inžinerinį Projektą',
    showInMenu: true,
    showInCarousel: true,
    sortOrder: 3,
    layout: 'standard',
    guidePdfUrl: '/downloads/perdanga_vadovas.pdf',
    detailsCadUrl: '/downloads/perdanga_cad.zip',
    bimModelUrl: '/downloads/perdanga_bim.ifc',
    tiles: [
      { title: 'Perdanga su Delta sijomis', imageUrl: '/Su_delta_sija.png' },
      { title: 'Perdanga su sijomis', imageUrl: '/Su_sija.png' },
      { title: 'Perdanga su Filigran sija', imageUrl: '/Su_Filigran_sija.png' },
      { title: 'Filigran tipo perdanga', imageUrl: '/Filigran_tipo.png' },
      { title: 'Akustinė perdanga', imageUrl: '/Akustine.png' },
      { title: 'Daugiaatramės plokštės', imageUrl: '/Daugiaatramine.png' },
      { title: 'Rūsio perdanga', imageUrl: '/Rusio-1.png' },
      { title: 'EKO perdanga', imageUrl: '/Eko_perdanga.png' },
      { title: 'Išlengvinta perdanga (su tūrio užpildais)', imageUrl: '/Islengvinta.png' },
    ],
    schemaParagraphs: [
      {
        text: 'Filigran perdanga (HalfSlab) – gamykloje pagaminta 50–70 mm storio gelžbetonio plokštė su apatine armatūra ir erdviniais armatūros karkasais (girderiais).',
      },
      {
        text: 'Aikštelėje plokštė veikia kaip nuolatinis klojinys: ant jos klojama viršutinė armatūra ir betonuojamas monolitinis sluoksnis. Gaunama vientisa perdanga, skaičiuojama kaip monolitinė, su lygiu gamykliniu lubų paviršiumi.',
      },
    ],
    specs: [
      { label: 'Ilgis', value: 'iki 10,0 m' },
      { label: 'Plotis', value: 'iki 3,0 m' },
      { label: 'Plokštės storis', value: '50–70 mm' },
      { label: 'Perdangos storis', value: '200–250 mm (pagal projektą)' },
      { label: 'Betono klasė', value: 'C30/37, C35/45' },
      { label: 'Aplinkos klasės', value: 'pagal projektą' },
      { label: 'Armavimas', value: 'pagal konstrukcinį skaičiavimą' },
    ],
    advantages: [
      {
        title: 'SUDĖTINGI SPRENDIMAI. MONOLITINIS VIENTISUMAS',
        description:
          'Vientisa perdanga. Ji pasižymi maksimaliu konstrukciniu saugumu, didele laikomąja galia ir nepriekaištinga garso izoliacija',
        iconUrl: '/privalumai_sudetingi_sprendimai.svg',
      },
      {
        title: 'NEREIKALINGOS ATRAMOS',
        description:
          'Nereikalingos atramos- sijos, sąramos, sienos įrengiant Filigrann perdangą, lyginant su standartinėmis plokštėmis',
        iconUrl: '/Privalumai_NEREIKALINGOS ATRAMOS .svg',
      },
      {
        title: 'STATYBA BE TRADICINIŲ KLOJINIŲ',
        description: 'Filigran® plokštė pati atlieka saugaus liktinio klojinio funkciją.',
        iconUrl: '/Privalumai_STATYBA_BE_TRADICINIU_KLOJINIU -1.svg',
      },
      {
        title: 'IDEALIAI LYGUS PAVIRŠIUS',
        description: 'Idealiai lygus paviršiai be tinkavimo',
        iconUrl: '/privalumai_idealiai_lygus.svg',
      },
      {
        title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
        description: 'Vienu reisu atvežama iki 120 m2 perdangos plokščių.',
        iconUrl: '/privalumai_efektyvesnis.svg',
      },
      {
        title: 'IKI 50% GREITESNIS MONTAVIMAS',
        description: 'Iki 3 kartų sutrumpėja statybos greitis',
        iconUrl: '/privalumai_iki_50.svg',
      },
      {
        title: 'INŽINERINIŲ SISTEMŲ INTEGRAVIMAS',
        description: 'Kompozitinėje perdangoje, integruojamos inžinerinės sistemos – ŠVOK, vandentiekis, elektros instaliacija',
        iconUrl: '/privalumai_inzinieriniu_sistemu.svg',
      },
      {
        title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS',
        description: 'Standartizuoti mazgai, BIM ir techninė pagalba',
        iconUrl: '/privalumai_sklandus.svg',
      },
    ],
    joints: SHARED_JOINTS,
  },
  {
    slug: 'balkonai',
    name: 'Balkonai',
    menuTitle: 'Balkonai su termo-jungtimi',
    subtitle: 'Gelžbetoninės balkonų plokštės su termoizoliacinėmis jungtimis',
    description:
      'Surenkamos-monolitinės balkonų plokštės su gamykliškai integruotu termoizoliaciniu elementu, visiškai panaikinančiu šalčio tiltelius.',
    imageUrl: '/balkonai.png',
    menuIconUrl: '/Balkonai_su_termo_jungtimi.svg',
    badge: 'Termoizoliacinės Isokorb Jungtys',
    pageTitle: 'BALKONAI',
    pageIntro:
      '„Filigran“ tipo gelžbetonio balkonų plokštės – tai pramoniniu būdu pagaminti elementai su gamykliškai integruotais termoizoliaciniais elementais (termoizoliacinėmis jungtimis). Sistema visiškai panaikina šalčio tiltelius, iki 50% sutrumpina karkaso įrengimo laiką objekte bei garantuoja veidrodinio lygumo paviršius, kuriems nereikia papildomo tinkavimo.',
    tilesSectionTitle: '',
    tilesSelectable: false,
    tilesColumns: 4,
    schemaTitle: 'KONSTRUKCINĖ SCHEMA',
    schemaImageUrl: '/balkonai.png',
    catalogLabel: 'Atsisiųsti Balkonų Katalogą',
    jointsTitle: 'MAZGAI - JUNGTYS',
    jointsCtaLabel: 'Užsakyti Balkonų Jungčių Skaičiavimą',
    showInMenu: true,
    showInCarousel: true,
    sortOrder: 4,
    layout: 'standard',
    guidePdfUrl: '/downloads/balkonai_vadovas.pdf',
    detailsCadUrl: '/downloads/balkonai_cad.zip',
    bimModelUrl: '/downloads/balkonai_bim.ifc',
    tiles: [],
    schemaParagraphs: [
      {
        text: 'Filigran balkono plokštė – surenkamas-monolitinis elementas, gamykloje pagamintas kartu su termoizoliacine jungtimi, kuri jungia balkoną su perdanga.',
      },
      {
        text: 'Jungtyje naudojama nerūdijančio plieno armatūra ir izoliacinis intarpas, todėl šalčio tiltelis tarp balkono ir pastato sumažinamas. Aikštelėje plokštė sujungiama su perdangos monolitiniu sluoksniu ir tampa vientisa pastato dalimi.',
      },
    ],
    specs: [
      { label: 'Ilgis', value: 'iki 8,0 m' },
      { label: 'Plotis', value: 'iki 3,0 m' },
      { label: 'Plokštės storis', value: '50–70 mm' },
      { label: 'Betono klasė', value: 'C30/37, C35/45' },
      { label: 'Terminė jungtis', value: 'izoliacinis intarpas su nerūdijančio plieno armatūra' },
      { label: 'Paviršius', value: 'gamykliškai lygus, paruoštas dažymui ar hidroizoliacijai' },
    ],
    advantages: [
      {
        title: 'DVISLUOKSNĖS MONOLITINĖS SIENOS',
        description: '2 sluoksniai surenkami gamykloje; 50-70 mm bendras sienos storis 200-400',
        iconUrl: '/privalumai_dvisluoksne.svg',
      },
      {
        title: 'SAUGUMAS',
        description: 'Užtikrintas saugumas visų etapų metu.',
        iconUrl: '/privalumai_saugumas.svg',
      },
      {
        title: 'VISKAS VIENAME',
        description: 'Sienoje yra angos, armatūra, izoliacija, įvairios įdėtinės detalės, elektros instaliacijos, ŠVOK instaliacija, detalė',
        iconUrl: '/privalumai_viskas_viename.svg',
      },
      {
        title: 'PALENGVINTAS DARBAS',
        description: 'Lengvesnis komandos darbas.',
        iconUrl: '/privalumai_palengvintas_darbas.svg',
      },
    ],
    joints: SHARED_JOINTS,
  },
  {
    slug: 'inzineriniai',
    name: 'Kitos konstrukcijos',
    menuTitle: 'Kitos konstrukcijos / Inžineriniai',
    subtitle: 'Inžineriniai statiniai, sijos, laiptinių sienos, Berlyno sienelės',
    description:
      'Kompozitiniai sprendimai specialiosioms pamatų, laiptinių, Berlyno sienelių bei aukštų apkrovų sienų konstrukcijoms.',
    imageUrl: '/kitos_konstrukcijos.png',
    menuIconUrl: '/Kitos_konstrukcijos.svg',
    badge: 'Specialioji Inžinerija',
    pageTitle: 'KITOS KONSTRUKCIJOS / INŽINERINIAI',
    pageIntro:
      'Kompozitiniai sprendimai specialiosioms pamatų, laiptinių, Berlyno sienelių bei aukštų apkrovų sienų konstrukcijoms.',
    tilesSectionTitle: '',
    tilesSelectable: false,
    tilesColumns: 4,
    schemaTitle: '',
    schemaImageUrl: '/kitos_konstrukcijos.png',
    catalogLabel: '',
    jointsTitle: '',
    jointsCtaLabel: '',
    showInMenu: true,
    showInCarousel: true,
    sortOrder: 5,
    layout: 'engineering',
    guidePdfUrl: '/downloads/kitos_konstrukcijos_vadovas.pdf',
    detailsCadUrl: '/downloads/kitos_konstrukcijos_cad.zip',
    bimModelUrl: '/downloads/kitos_konstrukcijos_bim.ifc',
    tiles: [],
    schemaParagraphs: [],
    specs: [],
    advantages: [],
    joints: [],
  },
];
