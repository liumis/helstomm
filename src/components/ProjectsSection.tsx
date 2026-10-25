import React, { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '../api/projects';
import { fetchProjektaiSettings } from '../api/projektai';
import { FALLBACK_PROJEKTAI } from '../data/pageChrome';
import { ProjectItem } from '../types';
import { Building, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
}

export const ProjectsSection: React.FC<Props> = ({ onOpenAnalysisModal }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [page, setPage] = useState(FALLBACK_PROJEKTAI);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('visi');

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchProjects(), fetchProjektaiSettings()])
      .then(([data, settings]) => {
        if (cancelled) return;
        setProjects(data);
        setPage(settings);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'visi'
        ? projects
        : projects.filter((p) => p.category === selectedCategory),
    [projects, selectedCategory]
  );

  return (
    <section id="projektai-realizacija" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {page.badge && (
            <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
              {page.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight">
            {page.title} {page.highlight && <span className="text-[#b8cd33]">{page.highlight}</span>}
          </h2>
          {page.intro && (
            <p className="text-slate-600 font-medium text-sm md:text-base mt-2">
              {page.intro}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {page.filters.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-slate-900 text-[#b8cd33] shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center text-sm font-medium text-slate-500 mb-8">
            Kraunami projektai...
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">{page.emptyTitle}</h3>
            <button
              onClick={() => setSelectedCategory(page.filters[0]?.slug || 'visi')}
              className="mt-4 px-4 py-2 bg-[#b8cd33] text-slate-950 font-bold text-xs rounded-xl"
            >
              {page.emptyCta}
            </button>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-36 sm:h-52 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-900/80 backdrop-blur-xs text-[#b8cd33] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase">
                    {project.categoryLabel}
                  </div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#b8cd33] text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-md flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>-{project.savedTimeWeeks} sav.</span>
                  </div>
                </div>

                <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="text-xs sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                    {project.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-500 pt-1.5 sm:pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-1 sm:space-x-1.5 truncate">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-1.5 truncate">
                      <Building className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 pt-0 sm:p-6 sm:pt-0">
                <button
                  onClick={onOpenAnalysisModal}
                  className="w-full py-2 sm:py-2.5 bg-slate-100 hover:bg-[#b8cd33] hover:text-slate-950 text-slate-800 font-bold rounded-xl text-[10px] sm:text-xs transition-colors flex items-center justify-center space-x-1 sm:space-x-1.5"
                >
                  <span className="truncate">{page.analysisCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
