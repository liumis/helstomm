export type DocumentSeed = {
  slug: string;
  name: string;
  category: 'manual' | 'mazgas';
  subcategory?: string;
  acronym?: string;
  imageUrl?: string;
  fileSize?: string;
  pdfUrl?: string;
  sortOrder: number;
};

export const DOCUMENT_SEEDS: DocumentSeed[] = [
  {
    slug: 'ploksciu-montavimo-instrukcija',
    name: 'Plokščių montavimo instrukcija (Sienos ir Perdangos)',
    category: 'manual',
    subcategory: 'Montavimo vadovas',
    fileSize: '4.2 MB',
    sortOrder: 1,
  },
  {
    slug: 'sienu-montavimo-vadovas',
    name: 'Surenkamų/monolitinių kompozitinių sienų montavimo vadovas',
    category: 'manual',
    subcategory: 'Konstrukcinė instrukcija',
    fileSize: '5.8 MB',
    sortOrder: 2,
  },
  {
    slug: 'perdangu-balkonu-technologine-kortele',
    name: 'Perdangų ir Balkonų montavimo technologinė kortelė',
    category: 'manual',
    subcategory: 'Techninis gidas',
    fileSize: '3.9 MB',
    sortOrder: 3,
  },
  {
    slug: 'filigran-bim-cad-katalogas',
    name: 'Helstomm Filigran BIM & CAD Mazgų Katalogo Katalogas (IFC/DWG)',
    category: 'manual',
    subcategory: 'BIM / CAD Archyvas',
    fileSize: '18.4 MB',
    sortOrder: 4,
  },
  {
    slug: 'ce-sertifikatai-2026',
    name: 'CE Sertifikatai ir Atitikties Deklaracijos 2026',
    category: 'manual',
    subcategory: 'Gamybos dokumentai',
    fileSize: '2.1 MB',
    sortOrder: 5,
  },
  {
    slug: 'v1-sienu-kainos-techninis-lapas',
    name: 'Sienų kaina: Filigran ir monolitas (techninis lapas)',
    category: 'manual',
    subcategory: 'Skaičiuoklės',
    acronym: 'V1',
    fileSize: '71 KB',
    pdfUrl: '/downloads/HELSTOMM_V1_techninis_lapas.pdf',
    sortOrder: 6,
  },
  {
    slug: 'mazgas-m-01',
    name: 'Sienos ir pamato jungties mazgas (M-01)',
    category: 'mazgas',
    acronym: 'M-01',
    imageUrl: '/mazgai_jungtys.jpg',
    sortOrder: 1,
  },
  {
    slug: 'mazgas-m-02',
    name: 'Dvigubos sienos ir Filigran perdangos mazgas (M-02)',
    category: 'mazgas',
    acronym: 'M-02',
    imageUrl: '/mazgai_jungtys.jpg',
    sortOrder: 2,
  },
  {
    slug: 'mazgas-m-03',
    name: 'THERMAL trisluoksnės sienos termoizoliacinis uzpatentas mazgas (M-03)',
    category: 'mazgas',
    acronym: 'M-03',
    imageUrl: '/mazgai_jungtys.jpg',
    sortOrder: 3,
  },
  {
    slug: 'mazgas-m-04',
    name: 'Balkono Isokorb termo-jungties montavimo mazgas (M-04)',
    category: 'mazgas',
    acronym: 'M-04',
    imageUrl: '/mazgai_jungtys.jpg',
    sortOrder: 4,
  },
];
