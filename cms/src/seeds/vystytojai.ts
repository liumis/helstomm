export const VYSTYTOJAI_SETTING_SEED = {
  badge: 'Nekilnojamo turto vystytojams ir generaliniams rangovams',
  title: 'VYSTYTOJAMS',
  intro:
    'Industrializuota statyba sumažina darbo jėgos poreikį, sutrumpina terminus ir leidžia tiksliau suplanuoti projekto biudžetą bei eigą.',
  roiCtaLabel: 'Gauti ROI skaičiavimą',
  analysisCtaLabel: 'Gauti projekto analizę',
};

export const VYSTYTOJAI_BENEFIT_SEEDS = [
  {
    slug: 'finansavimo-kastai',
    title: 'Finansavimo kaštai',
    stat: 'Didesnis ROI',
    description: 'Trumpesnis statybos ciklas = didesnė investicijų grąža ir mažesnės palūkanų sąnaudos.',
    iconUrl: '/vystytojams_finansavimo.svg',
    sortOrder: 1,
  },
  {
    slug: 'terminai',
    title: 'Terminai',
    stat: '30–50 % greičiau',
    description: 'Greitesnė statyba = anksčiau parduodamas ar išnuomojamas turtas.',
    iconUrl: '/vystytojams_terminai.svg',
    sortOrder: 2,
  },
  {
    slug: 'rizika',
    title: 'Rizika',
    stat: 'Minimali rizika',
    description: 'Mažiau neplanuotų darbų aikštelėje = didesnis projekto grynas pelnas.',
    iconUrl: '/vystytojams_rizika.svg',
    sortOrder: 3,
  },
  {
    slug: 'kokybe',
    title: 'Kokybė',
    stat: 'Gamyklinė kokybė',
    description: 'Elementai gaminami kontroliuojamomis sąlygomis = mažiau defektų ir pretenzijų.',
    iconUrl: '/vystytojams_kokybe.svg',
    sortOrder: 4,
  },
  {
    slug: 'neapibreztumas',
    title: 'Valdymas',
    stat: 'Design-Build',
    description: 'Vienas partneris nuo projekto iki montavimo = mažiau derinimo ir valdymo problemų.',
    iconUrl: '/vystytojams_neapibreztumas.svg',
    sortOrder: 5,
  },
];
