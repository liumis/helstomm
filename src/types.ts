export type PageView =
  | "home"
  | "pastatai"
  | "gyvenamieji-namai"
  | "industriniai-pastatai"
  | "komerciniai-pastatai"
  | "viesieji-pastatai"
  | "individuali-statyba"
  | "tvarus-pastatas"
  | "inzineriniai"
  | "dviguba-siena"
  | "thermal-siena"
  | "perdangos"
  | "balkonai"
  | "mokymai"
  | "dokumentai"
  | "skaiciuokles"
  | "tinklarastis"
  | "igyyvendinti-projektai"
  | "gamyba"
  | "privatumas";
export type CarouselDownloadIcon = "download" | "code" | "check";
export interface CarouselDownload {
  label: string;
  url: string;
  icon: CarouselDownloadIcon;
}
export interface CarouselSlide {
  id: string;
  slug: string;
  name: string;
  tabSubtitle: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  targetSlug: string;
  ctaLabel: string;
  ctaAction?: "view" | "analysis";
  analysisCtaLabel?: string;
  calculatorLabel?: string;
  highlights?: string[];
  downloadsTitle: string;
  downloads: CarouselDownload[];
}
export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  viewKey: PageView;
  downloads: { guidePdf?: string; detailsCad?: string; bimModel?: string };
}
export type ProductLayout = "standard" | "engineering";
export interface ProductAdvantage {
  title: string;
  description: string;
  iconUrl: string;
}
export interface ProductSpec {
  label: string;
  value: string;
}
export interface ProductTile {
  title: string;
  imageUrl: string;
  tileKey?: string;
}
export interface DesignHotspot {
  id: string;
  title: string;
  description: string;
  techDetail: string;
  xPct: number;
  yPct: number;
  fileUrl?: string;
  productSlug?: string;
}
export interface DesignCategoryItem {
  id: string;
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
  showOnHome: boolean;
  cardBadge: string;
  cardTitle: string;
  cardDescription: string;
  cardImageUrl: string;
  cardBadgeIcon: "Building" | "Shield" | "Leaf";
  cardTheme: "standard" | "eco";
  cardTargetSlug: string;
  cardCtaLabel: string;
  cardIconKey: "pastatai" | "inzineriniai" | "tvarus";
  sortOrder: number;
  hotspots: DesignHotspot[];
}
export interface ProductJoint {
  title: string;
  acronym: string;
  imageUrl: string;
  fileUrl?: string;
}
export interface ProductParagraph {
  highlight?: string;
  text: string;
}
export interface ProductCatalogItem {
  id: string;
  slug: string;
  name: string;
  menuTitle: string;
  subtitle: string;
  description: string;
  image: string;
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
  catalogFileUrl?: string;
  jointsTitle: string;
  jointsCtaLabel: string;
  showInMenu: boolean;
  showInCarousel: boolean;
  sortOrder: number;
  layout: ProductLayout;
  guidePdfUrl?: string;
  detailsCadUrl?: string;
  bimModelUrl?: string;
  advantages: ProductAdvantage[];
  specs: ProductSpec[];
  tiles: ProductTile[];
  joints: ProductJoint[];
  schemaParagraphs: ProductParagraph[];
}
export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
export interface TechnicalSpec {
  label: string;
  value: string;
}
export interface ProjectItem {
  id: string;
  title: string;
  category:
    | "gyvenamieji"
    | "industriniai"
    | "komerciniai"
    | "viesieji"
    | "individualūs"
    | "inzineriniai";
  categoryLabel: string;
  image: string;
  location: string;
  area: string;
  completionYear: string;
  savedTimeWeeks: number;
}
export interface NodeBlueprint {
  id: string;
  title: string;
  code: string;
  previewUrl: string;
  pdfUrl: string;
  dwgUrl: string;
}
export interface TeamMember {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "other";
export interface SocialLinkItem {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
}
export interface ContactSettings {
  heading: string;
  subtitle: string;
  targetEmail: string;
  companyName: string;
  address: string;
  phone: string;
  publicEmail: string;
  copyrightText: string;
  footerLine: string;
  formLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  filePlaceholder: string;
  fileAttachedPrefix: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successText: string;
  sendAnotherLabel: string;
  errorText: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
}
export interface ManualDownload {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  downloadUrl: string;
}
export type DocumentCategory = "manual" | "mazgas";
export type DocumentSection = "projektavimas" | "montavimas" | "kokybe";
export type DocumentBadge = "nauja" | "atnaujinta";
export interface DocumentTocItem {
  title: string;
  page: number;
}
export interface LibraryDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  section: DocumentSection;
  audience: string;
  subcategory: string;
  acronym: string;
  description: string;
  version: string;
  publishedOn: string;
  pages: number;
  image: string;
  portraitImage: string;
  fileSize: string;
  dwgUrl: string;
  svgUrl: string;
  pdfUrl: string;
  tags: string[];
  relatedCodes: string[];
  featured: boolean;
  badge: DocumentBadge | "";
  toc: DocumentTocItem[];
}
export type ArticleCategorySlug =
  | "apdovanojimai"
  | "projektai"
  | "gamyba"
  | "bim"
  | "tvarumas";
export interface Article {
  id: string;
  title: string;
  category: string;
  categorySlug: ArticleCategorySlug;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  featured?: boolean;
  linkedinUrl: string;
  content: {
    intro: string;
    keyPoints: string[];
    paragraphs: string[];
    quote?: { text: string; author: string };
  };
}
export interface DeveloperBenefit {
  id: string;
  title: string;
  stat: string;
  description: string;
  iconUrl: string;
}
export interface DeveloperBlock {
  badge: string;
  title: string;
  intro: string;
  roiCtaLabel: string;
  analysisCtaLabel: string;
  benefits: DeveloperBenefit[];
}
export interface EngineeringHelpBanner {
  enabled: boolean;
  title: string;
  subtitle: string;
  ctaLabel: string;
  phone?: string;
  phoneLabel?: string;
}
export interface ManufacturingBlock {
  enabled: boolean;
  badge: string;
  title: string;
  intro: string;
  tagline: string;
  videoCaption: string;
  videoUrl: string;
  posterUrl: string;
  certificatesCtaLabel: string;
  certificatesFileUrl?: string;
  certificates: string[];
}
export type HeroCardAction = "analysis" | "roi" | "view";
export type HeroIconKey =
  | "konsultacija"
  | "projektavimas"
  | "gamyba"
  | "montavimas"
  | "custom";
export interface HeroCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  action: HeroCardAction;
  targetSlug: string;
  iconKey: HeroIconKey;
  iconUrl: string;
}
export interface HeroBlock {
  enabled: boolean;
  badge: string;
  title: string;
  highlight: string;
  intro: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  backgroundUrl: string;
  cards: HeroCard[];
}
export interface HeaderSettings {
  companyLine: string;
  phone: string;
  email: string;
  pillMokymai: string;
  pillEko: string;
  pillAnalysis: string;
  menuProjektavimas: string;
  menuProduktai: string;
  menuGamyba: string;
  menuProjektai: string;
  menuDokumentai: string;
  menuTinklarastis: string;
  designDropdownLabel: string;
  designDropdownFooter: string;
  productsDropdownLabel: string;
  productsDropdownFooter: string;
  roiCtaLabel: string;
  mobileNavLabel: string;
  mobileHome: string;
  mobilePastatai: string;
  mobileDokumentai: string;
  mobileTinklarastis: string;
  mobileMokymaiCta: string;
  mobileAnalysisCta: string;
  logoUrl: string;
  brandName: string;
  brandHighlight: string;
  brandTagline: string;
}
export interface FilterOption {
  slug: string;
  label: string;
}
export interface HomepageSettings {
  processBadge: string;
  processTitle: string;
  processHighlight: string;
  processIntro: string;
  carouselTitle: string;
  carouselIntro: string;
}
export interface ProjektaiSettings {
  badge: string;
  title: string;
  highlight: string;
  intro: string;
  emptyTitle: string;
  emptyCta: string;
  analysisCta: string;
  filters: FilterOption[];
}
export interface TinklarastisSettings {
  badge: string;
  title: string;
  intro: string;
  linkedinLabel: string;
  linkedinUrl: string;
  instagramLabel: string;
  instagramUrl: string;
  analysisCta: string;
  featuredBadge: string;
  readArticleCta: string;
  readCta: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyIntro: string;
  emptyCta: string;
  followTitle: string;
  followIntro: string;
  followCta: string;
  backgroundUrl: string;
  categories: FilterOption[];
}
export interface DokumentaiSettings {
  badge: string;
  title: string;
  highlight: string;
  intro: string;
  searchPlaceholder: string;
  roiCta: string;
  analysisCta: string;
  emptyTitle: string;
  emptyIntro: string;
  emptyCta: string;
  manualsHeading: string;
  mazgaiHeading: string;
  downloadLabel: string;
  missingFileLabel: string;
  sizeLabel: string;
}
export interface MokymaiTopic {
  title: string;
  description: string;
}
export interface MokymaiFormTopic {
  title: string;
}
export interface MokymaiManual {
  id: string;
  title: string;
  url: string;
  fileSize: string;
}
export interface SeoPage {
  id: string;
  slug: string;
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  indexable: boolean;
}
export interface MokymaiCalendarEvent {
  dateLabel: string;
  dateNote: string;
  program: string;
  audience: string;
  audienceTone: "lime" | "blue";
  place: string;
  seatsLeft: number;
  seatsTotal: number;
}
export interface MokymaiBlock {
  enabled: boolean;
  badge: string;
  title: string;
  intro: string;
  trainerLabel: string;
  trainerName: string;
  trainerRole: string;
  trainerPhotoUrl: string;
  heading: string;
  topicsIntro: string;
  topics: MokymaiTopic[];
  formTopics: MokymaiFormTopic[];
  certificateNote: string;
  manualsHeading: string;
  manuals: MokymaiManual[];
  registerCta: string;
  videoTitle: string;
  videoTagline: string;
  videoCaption: string;
  videoPosterUrl: string;
  videoBrand: string;
  videoBrandHighlight: string;
  downloadLabel: string;
  calendarNote: string;
  calendarEvents: MokymaiCalendarEvent[];
}
