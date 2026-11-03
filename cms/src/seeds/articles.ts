export type ArticleSeed = {
  slug: string;
  title: string;
  category: string;
  categorySlug: 'apdovanojimai' | 'projektai' | 'gamyba' | 'bim' | 'tvarumas';
  dateLabel: string;
  publishedOn: string;
  readTime: string;
  author: string;
  authorRole: string;
  featured?: boolean;
  imageUrl: string;
  excerpt: string;
  linkedinUrl: string;
  intro: string;
  keyPoints: string[];
  paragraphs: string[];
  quoteText?: string;
  quoteAuthor?: string;
};

export const ARTICLE_SEEDS: ArticleSeed[] = [
  {
    slug: 'metu-gaminys-2024',
    title: '„Lietuvos metų gaminys 2024“ aukso medalis – HELSTOMM GROUP Filigran technologijai',
    category: 'Apdovanojimai & Inovacijos',
    categorySlug: 'apdovanojimai',
    dateLabel: '2024 gruodžio 18 d.',
    publishedOn: '2024-12-18',
    readTime: '4 min.',
    author: 'Mindaugas Dagys',
    authorRole: 'Technikos direktorius (CTO)',
    featured: true,
    imageUrl: '/Concrete_Vision_2018_pastatai.jpeg',
    excerpt:
      'Lietuvos pramonininkų konfederacija (LPK) prestižiniu aukso medaliu įvertino „Helstomm Group“ gaminamas surenkamąsias-monolitines Filigran plokštes ir DoubleWall sienas statybų sektoriuje.',
    linkedinUrl: '',
    intro:
      'Lietuvos pramonininkų konfederacijos (LPK) rengiamuose kasmetiniuose apdovanojimuose „Lietuvos metų gaminys 2024“ aukso medaliu Statybos ir statybinių medžiagų pramonės grupėje buvo įvertintos UAB „Helstomm Group“ surenkamosios-monolitinės Filigran konstrukcijos.',
    keyPoints: [
      'Aukso medalis už Filigran surenkamųjų-monolitinių konstrukcijų proveržį Baltijos šalyse',
      'Sumažinamos darbo jėgos sąnaudos objekte iki 50%',
      'Užtikrinamas gamyklinis paviršiaus lygumas ir A++ energinis naudingumas',
      'Galimybė integruoti šildymo/vėsinimo vamzdynus bei elektros instaliaciją tiesiai gamykloje',
    ],
    paragraphs: [
      'Šis įvertinimas – tai svarbus visos mūsų inžinierių ir gamybos komandos darbo pripažinimas. Filigran technologija atveria naują etapą Lietuvos statybų rinkoje, leidžiantį suderinti gamyklinio gelžbetonio greitį su monolitinio karkaso vientisumu.',
      'Tradicinė monolitinė statyba reikalauja itin didelio klojinių kiekio, ilgų kietėjimo terminų bei didelės darbuotojų komandos statybvietėje. HELSTOMM GROUP Filigran plokštės atlieka liekamojo klojinio funkciją – jos pristatomos į objektą, sumontuojamos per kelias valandas ir užpilamos betonu, sukuriant vientisą monolitinę perdangą.',
      'Šis apdovanojimas skatina mus toliau investuoti į gamybos robotizaciją, skaitmeninius BIM procesus ir tvarių gelžbetonio gaminių plėtrą.',
    ],
    quoteText:
      'Filigran plokštės nėra tiesiog statybinė medžiaga – tai išbaigta inžinerinė sistema, sujungianti skaitmeninį projektavimą, automatizuotą gamybą ir efektyvų montavimą.',
    quoteAuthor: 'Mindaugas Dagys, HELSTOMM GROUP Technikos direktorius',
  },
  {
    slug: 'virsuliskiu-daugiabutis',
    title: 'Operatyvus indėlis atstatant Viršuliškių daugiabutį: inžineriniai Filigran sprendimai',
    category: 'Projektai & Atstatymas',
    categorySlug: 'projektai',
    dateLabel: '2024 spalio 12 d.',
    publishedOn: '2024-10-12',
    readTime: '5 min.',
    author: 'Paulius Vasiliauskas',
    authorRole: 'Inžinerinių projektų vadovas',
    imageUrl: '/Aukstuminis_gyvenamuju.jpeg',
    excerpt:
      'Po Viršuliškių daugiabučio gaisro ir sprogimo „Helstomm Group“ inžinieriai operatyviai pateikė specializuotus surenkamojo gelžbetonio elementų sprendimus saugiam perdangų atstatymui.',
    linkedinUrl: '',
    intro:
      'Sudėtingose avarinės būklės pastatų rekonstrukcijose sprendimų greitis ir konstrukcinis saugumas yra kritiniai veiksniai. „Helstomm Group“ komanda aktyviai prisidėjo rengiant ir tiekiant Filigran gelžbetonio konstrukcijas pažeistam Viršuliškių daugiabučiui Vilniuje.',
    keyPoints: [
      'Saugus montavimas be sudėtingų klojinių sistemų pažeistoje konstrukcijoje',
      'Griežtas priešgaisrinės saugos RE240 reikalavimų atitikimas',
      'Operatyvus BIM modeliavimas ir individualus plokščių pritaikymas',
      'Užtikrintas monolitinis ryšys su išlikusiomis pastato sienomis',
    ],
    paragraphs: [
      'Avarinės būklės objekte tradiciniai betonavimo būdai būtų kėlę riziką dėl papildomų klojinių svorio bei ilgo montavimo laiko. Filigran plokštės leido sumažinti pagalbinių atramų poreikį ir iškart užtikrinti darbinės platformos saugumą.',
      'Mūsų inžinerinis skyrius per rekordiškai trumpą laiką paruošė konstrukcinį modelį, atiko skaičiavimus ir išsiuntė gamybos užsakymą į automatizuotą liniją.',
      'Projekto pavyzdys įrodė, kad Filigran surenkamieji-monolitiniai elementai yra nepakeičiami ne tik naujoje statyboje, bet ir aukščiausio sudėtingumo rekonstrukcijos objektuose.',
    ],
    quoteText:
      'Kai kalbama apie žmonių saugumą ir pastatų konstrukcinį vientisumą, Filigran sprendimų tikslumas ir greitis tampa lemiamu pranašumu.',
    quoteAuthor: 'Paulius Vasiliauskas, HELSTOMM GROUP inžinerijos vadovas',
  },
  {
    slug: 'gamybos-pletra-kaisiadoryse',
    title: 'Automatizacija ir robotizacija: naujos Filigran gamybos linijos plėtra',
    category: 'Gamyba & Technologijos',
    categorySlug: 'gamyba',
    dateLabel: '2024 rugpjūčio 25 d.',
    publishedOn: '2024-08-25',
    readTime: '4 min.',
    author: 'HELSTOMM GROUP',
    authorRole: 'Gamybos komanda',
    imageUrl: '/construction_steel_site.jpg',
    excerpt:
      'Augant tvarios statybos paklausai Baltijos šalyse, „Helstomm Group“ plečia gamybinius pajėgumus ir diegia vokišką automatizuotą gamybos liniją su lazeriniu pozicionavimu.',
    linkedinUrl: '',
    intro:
      'Atsliepdama į sparčiai augančią Filigran perdangos plokščių ir DoubleWall dvigubų sienų paklausą, UAB „Helstomm Group“ įgyvendino stambų gamybos pajėgumų plėtros etaptą.',
    keyPoints: [
      'Lazerinė klojinių pozicionavimo sistema su ±1 mm paklaidos ribomis',
      'Automatizuotas armatūros tinklų ir fermų virinimo robotas',
      'Gamybinis našumas padidintas daugiau nei 65%',
      'Švarus, lygus gamyklinis betono paviršius, paruoštas dažymui be tinkavimo',
    ],
    paragraphs: [
      'Naujoje gamybinėje linijoje įdiegti modernūs vokiški sprendimai užtikrina nepriekaištingą gaminių geometriją. Visi klojinių matmenys perkeliami tiesiai iš skaitmeninio 3D BIM modelio į gamybos valdymo pultą.',
      'Tai reiškia, kad elektros dėžutės, vamzdynų įvorės, išpjovos ir technologinės angos suformuojamos gamykloje su milimetro tikslumu. Statybvietėje nebereikia gręžti ar kalti betono.',
      'Šis gamybos etapas leidžia garantuoti trumpiausius tiekimo terminus net ir stambiausiems gyvenamųjų namų kvartalams bei logistikos centrams.',
    ],
  },
  {
    slug: 'kodel-filigran-hibridas',
    title: 'KODĖL FILIGRAN? Monolitinės ir surenkamosios statybos hibridas A++ klasei',
    category: 'BIM & Inžinerija',
    categorySlug: 'bim',
    dateLabel: '2024 birželio 14 d.',
    publishedOn: '2024-06-14',
    readTime: '6 min.',
    author: 'Mindaugas Dagys',
    authorRole: 'Technikos direktorius',
    imageUrl: '/perdanga.png',
    excerpt:
      'Apžvalginis straipsnis portale 15min.lt ir LinkedIn: kaip Filigran technologija padeda NT vystytojams išspręsti akustikos, gaisrinės saugos bei sandarumo iššūkius.',
    linkedinUrl: '',
    intro:
      'Tradicinė statyba susiduria su dviem kraštutinumais: klasikinė monolitinė statyba garantuoja sandarumą, bet reikalauja milžiniško darbo jėgos kiekio; paprastos surenkamosios plokštės montuojamos greitai, tačiau riboja architektūrines formas bei reikalauja papildomų sandarinimo siūlių.',
    keyPoints: [
      'Lankstumas architektams: galimybė projektuoti grakščias, konsolines ir sudėtingų formų perdangas',
      'Monolitinis vientisumas – idealus garso izoliacijos rodiklis R\'w > 58 dB',
      'Nėra šilumos tiltelių dėka vientisai betonuojamų mazgų ir izoliacijos sluoksnio',
      'Greitas karkaso uždarymas nepriklausomai nuo oro sąlygų',
    ],
    paragraphs: [
      'Filigran surenkamas-monolitinis hibridas sujungia geriausias abiejų sistemų savybes. Plokštė gaminama gamykloje kaip 5–7 cm storio gelžbetoninis padas su išsikišusia erdvine armatūros ferma.',
      'Objekte paklota plokštė atlieka darbinio klojinio vaidmenį. Užpylus viršutinį betono sluoksnį, gaunama monolitinė perdanga, kurios apačia yra idealiai glaisti ir lygi.',
      'Generuojama didelė ekonominė nauda: nereikia nuomotis ar surinkinėti perdangos klojinių, sumažėja kranų darbo valandos, o apdailos darbai supaprastėja kartais.',
    ],
  },
  {
    slug: '3d-bim-tekla-structures',
    title: 'Skaitmeninė statyba: BIM modeliavimas su Tekla Structures nuliui klaidų',
    category: 'BIM & Inžinerija',
    categorySlug: 'bim',
    dateLabel: '2024 gegužės 30 d.',
    publishedOn: '2024-05-30',
    readTime: '5 min.',
    author: 'Inžinerijos Skyrius',
    authorRole: 'HELSTOMM BIM Team',
    imageUrl: '/mazgai_jungtys.jpg',
    excerpt:
      'Kiekvienas „Helstomm Group“ gaminys prasideda tiksliame 3D skaitmeniniame modelyje. Sužinokite, kaip BIM modeliai perduodami tiesiai į robotizuotas stakles.',
    linkedinUrl: '',
    intro:
      'Statybos skaitmenizacija nėra ateities vizija – tai kasdienis „Helstomm Group“ inžinierių darbo standartas. Visos Filigran perdangos ir DoubleWall sienos detalizuojamos naudojant pažangią „Tekla Structures“ programinę įrangą.',
    keyPoints: [
      'Automatinis kirtimų ir komunikacijų susikirtimų (clash detection) tikrinimas',
      'BIM duomenų eksportas tiesiai į gamybines stakles (CAM/BVBS formatai)',
      'Inžinerinių mazgų suderinimas su architektu ir užsakovu dar prieš gamybą',
      'Tikslus medžiagų ir betono tūrio apskaičiavimas be atliekų',
    ],
    paragraphs: [
      'Skaitmeninio modelio dėka architektas ir konstruktorius mato pilną 3D pastato karkasą. Visos elektros dėžutės, sanitariniai įvadai, ventiliacijos angos ir vėsinimo kanalo įdėklai įbraižomi modelyje.',
      'Procesas apsaugo užsakovą nuo brangiai kainuojančių klaidų ir perdarymų statybvietėje. Objektas statomas sklandžiai, pagal tikslų laiko grafiką.',
    ],
  },
  {
    slug: 'eko-gelzbetonis-tvarumas',
    title: 'EKO Gelžbetonis ir CO2 pėdsako mažinimas tvariame nekilnojamajame turte',
    category: 'Tvarumas & EKO',
    categorySlug: 'tvarumas',
    dateLabel: '2024 balandžio 17 d.',
    publishedOn: '2024-04-17',
    readTime: '4 min.',
    author: 'HELSTOMM GROUP',
    authorRole: 'Tvarumo komanda',
    imageUrl: '/Eko_perdanga.png',
    excerpt:
      'Kaip optimizuotas betono tūris, mažesnis transportavimo skaičius ir surenkamas gamyklinis karkasas padeda NT vystytojams gauti BREEAM ir LEED sertifikatus.',
    linkedinUrl: '',
    intro:
      'Europos Sąjungos žaliasis kursas ir BREEAM/LEED sertifikavimo reikalavimai skatina statybų sektorių ieškoti mažesnį CO2 pėdsaką paliekančių technologijų. Gelžbetonis atlieka pagrindinį vaidmenį šiame viršsme.',
    keyPoints: [
      'Mažesnis žaliavų naudojimas dėl tiksliai apskaičiuotų plokščių storių',
      'Liko 0% betono atliekų statybvietėje – visi likučiai perdirbami gamykloje',
      'Optimizuotas logistikos reisas – vienu vilkiku pervežamas zymiai didesnis plotas plokščių',
      'Ilgas pastato gyvavimo ciklas (100+ metų) su minimalia priežiūra',
    ],
    paragraphs: [
      'Palyginti su masyviuoju betonavimu statybvietėje, gamykloje pagamintos Filigran plokštės reikalauja mažesnio betono kiekio ir efektyviau išnaudoja cemento rišamąsias savybes.',
      'Mūsų EKO betono receptūrose naudojami aukštos kokybės priedai ir antrinės perdirbtos medžiagos, padedančios pasiekti tvarumo tikslus be nuolaidų konstrukcijos tvirtumui.',
    ],
  },
];
