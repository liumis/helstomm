import React, { useEffect, useState } from 'react';
import { PageView } from '../types';
import { HelstommLogo } from './HelstommLogo';
import { fetchProducts, menuProducts } from '../api/products';
import { FALLBACK_PRODUCTS } from '../data/productCatalog';
import { fetchDesignCategories, menuDesignCategories } from '../api/designCategories';
import { FALLBACK_DESIGN_CATEGORIES } from '../data/designCategories';
import { fetchHeaderSettings } from '../api/header';
import { FALLBACK_HEADER } from '../data/header';
import { pathForView } from '../routing';
import { 
  GraduationCap, 
  Leaf, 
  Calculator, 
  ChevronDown, 
  Menu, 
  X, 
  Building2, 
  Compass,
  Shield,
  Building,
  Home,
  Factory,
  Landmark,
  Hammer,
  type LucideIcon
} from 'lucide-react';

const DESIGN_MENU_ICONS: Record<string, LucideIcon> = {
  Building2,
  Compass,
  Leaf,
  Home,
  Factory,
  Landmark,
  Hammer,
  Shield,
  Building,
};

interface Props {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  onOpenTrainingModal: () => void;
  onOpenAnalysisModal: () => void;
}

export const Header: React.FC<Props> = ({
  activeView,
  setActiveView,
  onOpenAnalysisModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [products, setProducts] = useState(menuProducts(FALLBACK_PRODUCTS));
  const [designItems, setDesignItems] = useState(menuDesignCategories(FALLBACK_DESIGN_CATEGORIES));
  const [labels, setLabels] = useState(FALLBACK_HEADER);

  useEffect(() => {
    fetchProducts().then((items) => setProducts(menuProducts(items)));
    fetchDesignCategories().then((items) => setDesignItems(menuDesignCategories(items)));
    fetchHeaderSettings().then(setLabels);
  }, []);

  const productSlugs = products.map((product) => product.slug);
  const designSlugs = designItems.map((item) => item.slug);
  const phoneHref = labels.phone.replace(/\s/g, '');

  const handleNavClick = (view: PageView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            {labels.companyLine && (
              <span className="hidden sm:inline-block text-slate-400 font-medium">
                {labels.companyLine}
              </span>
            )}
            {labels.phone && (
              <a href={`tel:${phoneHref}`} className="hover:text-[#b8cd33] font-semibold transition-colors">
                {labels.phone}
              </a>
            )}
            {labels.email && (
              <a href={`mailto:${labels.email}`} className="hidden md:inline hover:text-[#b8cd33] transition-colors">
                {labels.email}
              </a>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {labels.pillMokymai && (
              <button
                onClick={() => handleNavClick('mokymai')}
                className="flex items-center space-x-1.5 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full transition-all text-xs shadow-xs"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{labels.pillMokymai}</span>
              </button>
            )}

            {labels.pillEko && (
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-all text-xs shadow-xs"
              >
                <Leaf className="w-3.5 h-3.5 text-lime-300" />
                <span>{labels.pillEko}</span>
              </button>
            )}

            {labels.pillAnalysis && (
              <button
                onClick={onOpenAnalysisModal}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-all text-xs border border-slate-700"
              >
                <Calculator className="w-3.5 h-3.5 text-[#b8cd33]" />
                <span>{labels.pillAnalysis}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="cursor-pointer group flex items-center hover:opacity-90 transition-opacity"
          >
            {labels.logoUrl ? (
              <img src={labels.logoUrl} alt={labels.brandName} className="h-10 sm:h-12 w-auto" />
            ) : (
              <HelstommLogo compact className="h-11 sm:h-14 w-auto" />
            )}
          </a>

          <nav className="hidden lg:flex flex-1 items-center justify-end space-x-1 text-sm font-semibold text-slate-700">
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('projektavimas')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                  designSlugs.includes(activeView) ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{labels.menuProjektavimas}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              {activeDropdown === 'projektavimas' && (
                <div className="absolute top-full left-0 w-72 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {labels.designDropdownLabel && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#b8cd33] px-3 py-1.5 border-b border-slate-800/80 mb-1">
                      {labels.designDropdownLabel}
                    </div>
                  )}
                  {designItems.map((item) => {
                    const Icon = DESIGN_MENU_ICONS[item.menuIconName] || Building2;
                    return (
                      <a
                        key={item.slug}
                        href={pathForView(item.slug as PageView)}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.slug as PageView);
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-slate-800/90 rounded-xl text-slate-100 flex items-center space-x-2.5 transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-[#b8cd33] group-hover:scale-110 transition-transform" />
                        <span>{item.menuTitle}</span>
                      </a>
                    );
                  })}
                  
                  {labels.designDropdownFooter && (
                    <div className="pt-2 border-t border-slate-800 mt-2 space-y-1">
                      <button onClick={() => handleNavClick('pastatai')} className="w-full text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white flex items-center justify-between transition-colors">
                        <span>{labels.designDropdownFooter}</span>
                        <span className="text-[#b8cd33]">→</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('produktai')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div 
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                  productSlugs.includes(activeView)
                    ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{labels.menuProduktai}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              {activeDropdown === 'produktai' && (
                <div className="absolute top-full left-0 w-72 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {labels.productsDropdownLabel && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#b8cd33] px-3 py-1.5 border-b border-slate-800/80 mb-1">
                      {labels.productsDropdownLabel}
                    </div>
                  )}
                  {products.map((product) => (
                    <a
                      key={product.slug}
                      href={pathForView(product.slug as PageView)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(product.slug as PageView);
                      }}
                      className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-slate-800/90 rounded-xl text-slate-100 flex items-center space-x-2.5 transition-colors group"
                    >
                      {product.menuIconUrl && (
                        <img src={product.menuIconUrl} alt="" className="w-5 h-5 object-contain group-hover:scale-110 transition-transform" />
                      )}
                      <span>{product.menuTitle}</span>
                    </a>
                  ))}
                  
                  {labels.productsDropdownFooter && (
                    <div className="pt-2 border-t border-slate-800 mt-2 space-y-1">
                      <button onClick={() => handleNavClick('home')} className="w-full text-left px-3 py-1.5 text-xs text-slate-400 hover:text-white flex items-center justify-between transition-colors">
                        <span>{labels.productsDropdownFooter}</span>
                        <span className="text-[#b8cd33]">→</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <a
              href={pathForView('gamyba')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('gamyba');
              }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'gamyba' ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {labels.menuGamyba}
            </a>

            <a
              href={pathForView('igyyvendinti-projektai')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('igyyvendinti-projektai');
              }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'igyyvendinti-projektai' ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {labels.menuProjektai}
            </a>

            <a
              href={pathForView('dokumentai')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('dokumentai');
              }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'dokumentai' ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {labels.menuDokumentai}
            </a>

            <a
              href={pathForView('skaiciuokles')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('skaiciuokles');
              }}
              className={`relative px-3 py-2 rounded-full bg-[#b8cd33] text-slate-950 font-bold hover:bg-[#a6ba2a] transition-colors ${
                activeView === 'skaiciuokles' ? 'ring-2 ring-slate-900/15' : ''
              }`}
            >
              Skaičiuoklės
              <span className="absolute -top-2 -right-2 bg-slate-950 text-white text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full">
                NAUJA
              </span>
            </a>

            <a
              href={pathForView('tinklarastis')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('tinklarastis');
              }}
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeView === 'tinklarastis' ? 'bg-[#b8cd33]/20 text-[#54620b] font-bold' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {labels.menuTinklarastis}
            </a>
          </nav>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">{labels.mobileNavLabel}</div>
          <button onClick={() => handleNavClick('home')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.mobileHome}
          </button>
          <div className="space-y-1 pl-2">
            <div className="text-xs font-bold text-[#b8cd33] uppercase tracking-wider pt-2">{labels.menuProjektavimas}:</div>
            {designItems.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleNavClick(item.slug as PageView)}
                className="w-full text-left text-sm py-1.5 text-slate-700 hover:text-slate-950 font-medium"
              >
                • {item.menuTitle}
              </button>
            ))}
          </div>

          <div className="space-y-1 pl-2">
            <div className="text-xs font-bold text-[#b8cd33] uppercase tracking-wider pt-2">{labels.menuProduktai}:</div>
            {products.map((product) => (
              <button
                key={product.slug}
                onClick={() => handleNavClick(product.slug as PageView)}
                className="w-full text-left text-sm py-1.5 text-slate-700 hover:text-slate-950"
              >
                • {product.menuTitle}
              </button>
            ))}
          </div>

          <button onClick={() => handleNavClick('gamyba')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.menuGamyba}
          </button>
          <button onClick={() => handleNavClick('igyyvendinti-projektai')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.menuProjektai}
          </button>
          <button onClick={() => handleNavClick('pastatai')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.mobilePastatai}
          </button>
          <button onClick={() => handleNavClick('dokumentai')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.mobileDokumentai}
          </button>
          <button onClick={() => handleNavClick('skaiciuokles')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100 flex items-center justify-between">
            <span>Skaičiuoklės</span>
            <span className="bg-slate-950 text-white text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded-full">NAUJA</span>
          </button>
          <button onClick={() => handleNavClick('tinklarastis')} className="w-full text-left font-bold text-slate-900 py-2 border-b border-slate-100">
            {labels.mobileTinklarastis}
          </button>

          <div className="pt-2 space-y-2">
            {labels.mobileMokymaiCta && (
              <button
                onClick={() => handleNavClick('mokymai')}
                className="w-full py-2.5 bg-sky-500 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{labels.mobileMokymaiCta}</span>
              </button>
            )}
            {labels.mobileAnalysisCta && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalysisModal();
                }}
                className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4 text-[#b8cd33]" />
                <span>{labels.mobileAnalysisCta}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
