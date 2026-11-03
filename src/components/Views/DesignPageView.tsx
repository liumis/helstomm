import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { InteractiveDiagram } from '../InteractiveDiagram';
import { fetchDesignCategoryBySlug } from '../../api/designCategories';
import { fetchHeaderSettings } from '../../api/header';
import { FALLBACK_HEADER } from '../../data/header';
import type { DesignCategoryItem, HeaderSettings } from '../../types';

interface Props {
  slug: string;
  onOpenAnalysisModal: () => void;
  navigate: (to: string) => void;
}

export const DesignPageView: React.FC<Props> = ({ slug, onOpenAnalysisModal, navigate }) => {
  const [item, setItem] = useState<DesignCategoryItem | null>(null);
  const [brand, setBrand] = useState<HeaderSettings>(FALLBACK_HEADER);

  useEffect(() => {
    let cancelled = false;
    setItem(null);

    Promise.all([fetchDesignCategoryBySlug(slug), fetchHeaderSettings()]).then(([category, header]) => {
      if (cancelled) return;
      setItem(category);
      setBrand(header);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!item) {
    return (
      <div className="py-24 text-center text-slate-500 text-sm font-medium">
        Kraunami projektavimo duomenys...
      </div>
    );
  }

  return (
    <div className="py-12 bg-white space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {item.badge && (
          <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
            {item.badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          {item.pageTitle}
        </h1>
        {item.subtitle && (
          <p className="text-slate-900 font-bold text-lg sm:text-xl mb-3">
            {item.subtitle}
          </p>
        )}
        {item.pageIntro && (
          <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            {item.pageIntro}
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDiagram
          title={item.diagramTitle}
          subtitle={item.diagramSubtitle}
          imageUrl={item.diagramImageUrl}
          hotspots={item.hotspots}
          navigate={navigate}
        />
      </div>

      {(item.assemblyTitle || item.ctaLabel) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {item.assemblyTitle && (
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
              {item.assemblyTitle}
            </h2>
          )}

          <div
            className="max-w-4xl mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 relative p-8 md:p-12 text-center text-white bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.95)), url('${item.assemblyBackgroundUrl || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200'}')`,
            }}
          >
            <div className="mb-6 space-y-2">
              <div className="text-3xl md:text-5xl font-black tracking-wider text-white">
                {brand.brandName} <span className="text-[#b8cd33]">{brand.brandHighlight}</span>
              </div>
              {brand.brandTagline && (
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#b8cd33]">
                  {brand.brandTagline}
                </p>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#b8cd33] text-slate-950 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </div>
            </div>

            {item.assemblyCaption && (
              <p className="text-slate-300 font-medium text-sm max-w-xl mx-auto">
                {item.assemblyCaption}
              </p>
            )}
          </div>

          {item.ctaLabel && (
            <div>
              <button
                onClick={onOpenAnalysisModal}
                className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md inline-flex items-center space-x-2"
              >
                <span>{item.ctaLabel}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
