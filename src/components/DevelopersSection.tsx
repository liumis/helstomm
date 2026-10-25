import React, { useEffect, useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { fetchDeveloperBlock } from '../api/vystytojai';
import { FALLBACK_DEVELOPER_BLOCK } from '../data/vystytojai';

interface Props {
  onOpenRoiCalculator: () => void;
  onOpenAnalysisModal: () => void;
}

export const DevelopersSection: React.FC<Props> = ({ onOpenRoiCalculator, onOpenAnalysisModal }) => {
  const [block, setBlock] = useState(FALLBACK_DEVELOPER_BLOCK);

  useEffect(() => {
    fetchDeveloperBlock().then(setBlock);
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          {block.badge && (
            <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/10 px-3 py-1 rounded-full inline-block mb-3 border border-[#b8cd33]/20">
              {block.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
            {block.title}
          </h2>
          {block.intro && (
            <p className="text-slate-300 font-medium text-base md:text-lg mt-4 leading-relaxed">
              {block.intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-12">
          {block.benefits.map((b, index) => {
            const isLastOdd = index === block.benefits.length - 1 && block.benefits.length % 2 !== 0;
            return (
              <div 
                key={b.id} 
                className={`bg-slate-800/90 border border-slate-700/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 flex flex-col items-center text-center hover:border-[#b8cd33] transition-all hover:-translate-y-1 group ${
                  isLastOdd ? 'col-span-2 sm:col-span-1 lg:col-span-1 max-w-md mx-auto w-full' : ''
                }`}
              >
                {b.iconUrl && (
                  <img 
                    src={b.iconUrl} 
                    alt={b.title} 
                    className="w-10 h-10 sm:w-16 sm:h-16 mb-2 sm:mb-4 group-hover:scale-110 transition-transform object-contain"
                  />
                )}
                {b.stat && (
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#b8cd33] tracking-wider sm:tracking-widest mb-0.5 sm:mb-1">
                    {b.stat}
                  </span>
                )}
                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{b.title}</h3>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-snug sm:leading-relaxed">{b.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRoiCalculator}
            className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4 text-slate-950" />
            <span>{block.roiCtaLabel}</span>
          </button>

          <button
            onClick={onOpenAnalysisModal}
            className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm border border-slate-600 transition-all flex items-center space-x-2"
          >
            <span>{block.analysisCtaLabel}</span>
            <ArrowRight className="w-4 h-4 text-[#b8cd33]" />
          </button>
        </div>

      </div>
    </section>
  );
};
