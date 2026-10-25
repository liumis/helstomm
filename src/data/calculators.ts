export type CalculatorCode =
  | 'P1'
  | 'P2'
  | 'P3'
  | 'P4'
  | 'P5'
  | 'P6'
  | 'P7'
  | 'P8'
  | 'P9'
  | 'P10'
  | 'P11'
  | 'P12'
  | 'P13'
  | 'P14'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'S4';

export type CalculatorDef = {
  code: CalculatorCode;
  title: string;
  file: string;
  path: string;
  aliases: string[];
};

export const CALCULATORS: CalculatorDef[] = [
  {
    code: 'P1',
    title: 'Apsauginis sluoksnis ir sienučių storis',
    file: 'p1.html',
    path: '/skaiciuokles/projektuotojams/apsauginis-sluoksnis',
    aliases: ['p1', 'projektuotojams/apsauginis-sluoksnis'],
  },
  {
    code: 'P2',
    title: 'Sienų atsparumas ugniai',
    file: 'p2.html',
    path: '/skaiciuokles/projektuotojams/atsparumas-ugniai',
    aliases: ['p2', 'projektuotojams/atsparumas-ugniai'],
  },
  {
    code: 'P3',
    title: 'Girderio parinkimas sienoms',
    file: 'p3.html',
    path: '/skaiciuokles/projektuotojams/girderio-parinkimas',
    aliases: ['p3', 'projektuotojams/girderio-parinkimas'],
  },
  {
    code: 'P4',
    title: 'Laikanti dviguba siena',
    file: 'p4.html',
    path: '/skaiciuokles/projektuotojams/laikanti-siena',
    aliases: ['p4', 'projektuotojams/laikanti-siena'],
  },
  {
    code: 'P5',
    title: 'Perdangos konfigūracija',
    file: 'p5.html',
    path: '/skaiciuokles/projektuotojams/perdangos-konfiguracija',
    aliases: ['p5', 'projektuotojams/perdangos-konfiguracija'],
  },
  {
    code: 'P6',
    title: 'Perdangos atsparumas ugniai',
    file: 'p6.html',
    path: '/skaiciuokles/projektuotojams/perdangos-atsparumas-ugniai',
    aliases: ['p6', 'projektuotojams/perdangos-atsparumas-ugniai'],
  },
  {
    code: 'P7',
    title: 'Montavimo atramų žingsnis ir apkrova ramsčiui',
    file: 'p7.html',
    path: '/skaiciuokles/projektuotojams/montavimo-atramos',
    aliases: ['p7', 'projektuotojams/montavimo-atramos', 'statybininkams/isramstymas', 's1'],
  },
  {
    code: 'P8',
    title: 'Sienos gabaritų parinkimas',
    file: 'p8.html',
    path: '/skaiciuokles/projektuotojams/sienos-gabaritai',
    aliases: ['p8', 'projektuotojams/sienos-gabaritai'],
  },
  {
    code: 'P9',
    title: 'Sienų jungtys',
    file: 'p9.html',
    path: '/skaiciuokles/projektuotojams/sienu-jungtys',
    aliases: ['p9', 'projektuotojams/sienu-jungtys'],
  },
  {
    code: 'P10',
    title: 'Vienkryptė Filigran perdanga',
    file: 'p10.html',
    path: '/skaiciuokles/projektuotojams/vienkrypte-perdanga',
    aliases: ['p10', 'projektuotojams/vienkrypte-perdanga'],
  },
  {
    code: 'P11',
    title: 'Dvikryptė Filigran perdanga',
    file: 'p11.html',
    path: '/skaiciuokles/projektuotojams/dvikrypte-perdanga',
    aliases: ['p11', 'projektuotojams/dvikrypte-perdanga'],
  },
  {
    code: 'P12',
    title: 'Filigran perdanga ant kolonų ir pramušimas',
    file: 'p12.html',
    path: '/skaiciuokles/projektuotojams/perdanga-ant-kolonu',
    aliases: ['p12', 'projektuotojams/perdanga-ant-kolonu'],
  },
  {
    code: 'P13',
    title: 'Rūsio dviguba siena',
    file: 'p13.html',
    path: '/skaiciuokles/projektuotojams/rusio-siena',
    aliases: ['p13', 'projektuotojams/rusio-siena'],
  },
  {
    code: 'P14',
    title: 'Termo siena su izoliacija (Schöck ComBAR jungtys)',
    file: 'p14.html',
    path: '/skaiciuokles/projektuotojams/termo-siena',
    aliases: ['p14', 'projektuotojams/termo-siena'],
  },
  {
    code: 'V1',
    title: 'Sienų kaina: Filigran ir monolitas',
    file: 'v1.html',
    path: '/skaiciuokles/vystytojams/sienu-kaina',
    aliases: ['v1', 'vystytojams/sienu-kaina'],
  },
  {
    code: 'V2',
    title: 'Statybos laiko vertė',
    file: 'v2.html',
    path: '/skaiciuokles/vystytojams/laiko-verte',
    aliases: ['v2', 'vystytojams/laiko-verte'],
  },
  {
    code: 'V3',
    title: 'Perdangų kaina: Filigran ir monolitas',
    file: 'v3.html',
    path: '/skaiciuokles/vystytojams/perdangu-kaina',
    aliases: ['v3', 'vystytojams/perdangu-kaina'],
  },
  {
    code: 'S4',
    title: 'Dvigubų sienų betonavimas',
    file: 's4.html',
    path: '/skaiciuokles/statybininkams/sienu-betonavimas',
    aliases: ['s4', 'statybininkams/sienu-betonavimas'],
  },
];

const BY_SLUG = new Map(
  CALCULATORS.flatMap((item) => item.aliases.map((alias) => [alias.toLowerCase(), item] as const))
);

export function findCalculator(slug?: string) {
  if (!slug) return undefined;
  return BY_SLUG.get(slug.replace(/^\/+|\/+$/g, '').toLowerCase());
}

export function calculatorPathForCode(code: string) {
  const key = code.toUpperCase();
  if (key === 'S1') return CALCULATORS.find((item) => item.code === 'P7')?.path;
  return CALCULATORS.find((item) => item.code === key)?.path;
}
