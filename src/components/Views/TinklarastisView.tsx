import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Linkedin, 
  Instagram,
  ArrowUpRight, 
  Award, 
  Building, 
  Factory, 
  Cpu, 
  Leaf, 
  X, 
  Share2, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

import { fetchArticles } from '../../api/articles';
import { fetchTinklarastisSettings } from '../../api/tinklarastis';
import { articleLinkedInPost, resolveArticleImage } from '../../data/blogArticles';
import { FALLBACK_TINKLARASTIS } from '../../data/pageChrome';
import { Article } from '../../types';

function handleArticleImageError(event: React.SyntheticEvent<HTMLImageElement>, slug: string) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = resolveArticleImage(slug);
}

interface Props {
  onOpenAnalysisModal: () => void;
  articleSlug?: string;
  onOpenArticle?: (slug: string) => void;
  onCloseArticle?: () => void;
}

export function TinklarastisView({
  onOpenAnalysisModal,
  articleSlug,
  onOpenArticle,
  onCloseArticle,
}: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(FALLBACK_TINKLARASTIS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('visi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchArticles(), fetchTinklarastisSettings()])
      .then(([data, settings]) => {
        if (cancelled) return;
        setArticles(data);
        setPage(settings);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!articleSlug) {
      setActiveArticleModal(null);
      return;
    }
    const match = articles.find((article) => article.id === articleSlug);
    setActiveArticleModal(match || null);
  }, [articleSlug, articles]);

  const openArticle = (article: Article) => {
    if (onOpenArticle) {
      onOpenArticle(article.id);
      return;
    }
    setActiveArticleModal(article);
  };

  const closeArticle = () => {
    if (onCloseArticle) {
      onCloseArticle();
      return;
    }
    setActiveArticleModal(null);
  };

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'visi' || article.categorySlug === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Top Banner / Hero */}
      <div className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800 min-h-[380px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.65) 50%, rgba(15, 23, 42, 0.85) 100%), url('${page.backgroundUrl}')` 
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-20">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-[#b8cd33]/20 border border-[#b8cd33]/40 px-3.5 py-1.5 rounded-full text-[#c9dc46] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-[#b8cd33]" />
              <span>{page.badge}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {page.title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              {page.intro}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={page.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-md group"
              >
                <Linkedin className="w-4 h-4 fill-current" />
                <span>{page.linkedinLabel}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={page.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-md group"
              >
                <Instagram className="w-4 h-4" />
                <span>{page.instagramLabel}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenAnalysisModal}
                className="inline-flex items-center space-x-2 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>{page.analysisCta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {loading && (
          <div className="text-center py-10 text-sm font-medium text-slate-500">
            Kraunami straipsniai...
          </div>
        )}

        {/* Featured Hero Article */}
        {featuredArticle && (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px]">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover"
              onError={(event) => handleArticleImageError(event, featuredArticle.id)}
            />
            <div className="absolute top-4 left-4 bg-[#b8cd33] text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-md flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>{page.featuredBadge}</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white to-slate-50/80">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{featuredArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{featuredArticle.readTime}</span>
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-slate-900 hover:text-[#54620b] transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-[#b8cd33] font-bold flex items-center justify-center text-sm shadow-xs">
                  {featuredArticle.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{featuredArticle.author}</div>
                  <div className="text-[11px] text-slate-500">{featuredArticle.authorRole}</div>
                </div>
              </div>

              <a
                href={`/tinklarastis/${featuredArticle.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  openArticle(featuredArticle);
                }}
                className="inline-flex items-center space-x-1 text-xs font-bold text-[#54620b] hover:text-slate-950 bg-[#b8cd33]/20 hover:bg-[#b8cd33] px-4 py-2 rounded-xl transition-all"
              >
                <span>{page.readArticleCta}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        )}

        {/* Search & Category Filter Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={page.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#b8cd33] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={page.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-600" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={page.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {page.categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-slate-950 text-[#b8cd33] shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(event) => handleArticleImageError(event, article.id)}
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-900/90 backdrop-blur-md text-[#b8cd33] text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-xs text-slate-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-lg font-bold text-slate-900 group-hover:text-[#54620b] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-3 pb-3 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[9px] sm:text-xs shrink-0">
                    {article.author.charAt(0)}
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-700 truncate">{article.author}</span>
                </div>

                <a
                  href={`/tinklarastis/${article.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openArticle(article);
                  }}
                  className="text-[10px] sm:text-xs font-bold text-[#54620b] hover:text-slate-950 flex items-center space-x-0.5 sm:space-x-1 group-hover:translate-x-1 transition-all shrink-0 ml-1"
                >
                  <span>{page.readCta}</span>
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">{page.emptyTitle}</h3>
            <p className="text-sm text-slate-500 mt-1">{page.emptyIntro}</p>
            <button
              onClick={() => { setSelectedCategory(page.categories[0]?.slug || 'visi'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#b8cd33] text-slate-950 font-bold text-xs rounded-xl"
            >
              {page.emptyCta}
            </button>
          </div>
        )}

        {/* Bottom Banner - Connect with LinkedIn, Instagram & Contact */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center space-x-3 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center space-x-1 text-sky-400">
                <Linkedin className="w-4 h-4 fill-current" />
                <span>LINKEDIN</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center space-x-1 text-pink-400">
                <Instagram className="w-4 h-4" />
                <span>INSTAGRAM</span>
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {page.followTitle}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {page.followIntro}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={page.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Linkedin className="w-4 h-4 fill-current" />
              <span>LinkedIn</span>
            </a>

            <a
              href={page.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <button
              onClick={onOpenAnalysisModal}
              className="w-full sm:w-auto text-center bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <span>{page.followCta}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={closeArticle}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            
            {/* Modal Header Image */}
            <div className="relative h-64 md:h-80 bg-slate-900">
              <img 
                src={activeArticleModal.image} 
                alt={activeArticleModal.title}
                className="w-full h-full object-cover opacity-90"
                onError={(event) => handleArticleImageError(event, activeArticleModal.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 bg-slate-950/70 hover:bg-slate-950 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#b8cd33]">
                  <span className="bg-[#b8cd33]/20 border border-[#b8cd33]/40 px-2.5 py-1 rounded-md">
                    {activeArticleModal.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticleModal.date}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold leading-snug text-white">
                  {activeArticleModal.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Author & Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-[#b8cd33] font-bold flex items-center justify-center text-sm">
                    {activeArticleModal.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{activeArticleModal.author}</div>
                    <div className="text-slate-500">{activeArticleModal.authorRole}</div>
                  </div>
                </div>

                {articleLinkedInPost(activeArticleModal.linkedinUrl) && (
                  <a
                    href={activeArticleModal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-lg font-bold hover:bg-sky-100 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                    <span>LinkedIn įrašas</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Content Intro */}
              <p className="text-base font-semibold text-slate-800 leading-relaxed">
                {activeArticleModal.content.intro}
              </p>

              {/* Key points box */}
              {activeArticleModal.content.keyPoints && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#54620b]" />
                    <span>PAGRINDINIAI AKCENTAI:</span>
                  </div>
                  <ul className="space-y-2">
                    {activeArticleModal.content.keyPoints.map((point, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-slate-700 flex items-start space-x-2">
                        <span className="text-[#54620b] font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Paragraphs */}
              <div className="space-y-4 text-sm md:text-base text-slate-700 leading-relaxed">
                {activeArticleModal.content.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Quote if present */}
              {activeArticleModal.content.quote && (
                <div className="border-l-4 border-[#b8cd33] pl-4 py-2 my-4 bg-lime-50/50 rounded-r-xl space-y-1">
                  <p className="italic text-slate-900 font-medium text-sm">
                    „{activeArticleModal.content.quote.text}“
                  </p>
                  <div className="text-xs text-slate-600 font-bold">
                    — {activeArticleModal.content.quote.author}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Šaltinis: UAB „HELSTOMM GROUP“ oficialios naujienos
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    closeArticle();
                    onOpenAnalysisModal();
                  }}
                  className="w-full sm:w-auto bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                >
                  Užsakyti projekto analizę
                </button>
                <button
                  onClick={closeArticle}
                  className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
                >
                  Uždaryti
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
