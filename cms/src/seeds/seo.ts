import { ARTICLE_SEEDS } from './articles';
import { DESIGN_CATEGORY_SEEDS } from './projektavimas';
import { PRODUCT_SEEDS } from './products';
import { DOKUMENTAI_SETTING_SEED, HOMEPAGE_SETTING_SEED, PROJEKTAI_SETTING_SEED, TINKLARASTIS_SETTING_SEED } from './page-chrome';
import { GAMYBOS_PROCESAS_SEED } from './gamybos-procesas';
import { MOKYMAI_SETTING_SEED } from './mokymai';

const BRAND = 'Helstomm Group';

export type SeoPageSeed = {
  slug: string;
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  indexable: boolean;
  sortOrder: number;
};

function seoPage(
  slug: string,
  path: string,
  title: string,
  description: string,
  ogImageUrl = '',
  sortOrder = 0
): SeoPageSeed {
  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  return {
    slug,
    path,
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImageUrl,
    indexable: true,
    sortOrder,
  };
}

const CORE_SEO_PAGES: SeoPageSeed[] = [
  seoPage(
    'home',
    '/',
    'Helstomm Group - Statybos Sprendimai',
    HOMEPAGE_SETTING_SEED.processIntro,
    '/construction_steel_site.jpg',
    1
  ),
  seoPage(
    'mokymai',
    '/mokymai',
    'Filigran akademija',
    MOKYMAI_SETTING_SEED.intro,
    '/Mindaugas.png',
    2
  ),
  seoPage(
    'privatumas',
    '/privatumas',
    'Privatumo politika',
    'Kaip Helstomm Group tvarko asmens duomenis, gautus per skaičiuokles, mokymus ir užklausas.',
    '/construction_steel_site.jpg',
    20
  ),
  seoPage(
    'dokumentai',
    '/dokumentai',
    'Dokumentai ir mazgai',
    DOKUMENTAI_SETTING_SEED.intro,
    '/construction_steel_site.jpg',
    3
  ),
  seoPage(
    'skaiciuokles',
    '/skaiciuokles',
    'Skaičiuoklės',
    'Filigran dvigubos sienos ir perdangos: apsauginis sluoksnis, atsparumas ugniai, girderiai, laikančios, rūsio ir termo sienos, jungtys, perdangų patikra ir kainos palyginimas su monolitu.',
    '/construction_steel_site.jpg',
    4
  ),
  seoPage(
    'tinklarastis',
    '/tinklarastis',
    'Tinklaraštis',
    TINKLARASTIS_SETTING_SEED.intro,
    TINKLARASTIS_SETTING_SEED.backgroundUrl,
    4
  ),
  seoPage(
    'projektai',
    '/projektai',
    'Įgyvendinti projektai',
    PROJEKTAI_SETTING_SEED.intro,
    '/construction_steel_site.jpg',
    5
  ),
  seoPage(
    'gamyba',
    '/gamyba',
    'Gamybos procesas',
    GAMYBOS_PROCESAS_SEED.intro,
    GAMYBOS_PROCESAS_SEED.posterUrl,
    6
  ),
];

const DESIGN_SEO_PAGES = DESIGN_CATEGORY_SEEDS.map((item, index) =>
  seoPage(
    item.slug,
    `/${item.slug}`,
    item.name,
    item.pageIntro || item.cardDescription || item.subtitle,
    item.cardImageUrl || item.diagramImageUrl,
    10 + index
  )
);

const PRODUCT_SEO_PAGES = PRODUCT_SEEDS.filter((item) => item.slug !== 'inzineriniai').map(
  (item, index) =>
    seoPage(
      item.slug,
      `/${item.slug}`,
      item.name,
      item.pageIntro || item.description,
      item.imageUrl,
      30 + index
    )
);

const ARTICLE_SEO_PAGES = ARTICLE_SEEDS.map((item, index) =>
  seoPage(item.slug, `/tinklarastis/${item.slug}`, item.title, item.excerpt, item.imageUrl, 50 + index)
);

export const SEO_PAGE_SEEDS: SeoPageSeed[] = [
  ...CORE_SEO_PAGES,
  ...DESIGN_SEO_PAGES,
  ...PRODUCT_SEO_PAGES,
  ...ARTICLE_SEO_PAGES,
];
