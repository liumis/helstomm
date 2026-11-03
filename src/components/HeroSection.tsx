import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { fetchHeroBlock } from '../api/hero';
import { FALLBACK_HERO_BLOCK } from '../data/hero';
import { HeroCardIcon } from './heroIcons';

interface Props {
  onOpenAnalysisModal: () => void;
  onOpenRoiCalculator: () => void;
  navigate: (to: string) => void;
}

export const HeroSection: React.FC<Props> = ({
  onOpenAnalysisModal,
  onOpenRoiCalculator,
  navigate,
}) => {
  const heroTopRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [bgHeight, setBgHeight] = useState<string>('75%');
  const [block, setBlock] = useState(FALLBACK_HERO_BLOCK);

  useEffect(() => {
    fetchHeroBlock().then(setBlock);
  }, []);

  useEffect(() => {
    const updateBgHeight = () => {
      if (heroTopRef.current && cardsRef.current) {
        const topHeight = heroTopRef.current.offsetHeight;
        const cardsHeight = cardsRef.current.offsetHeight;
        const totalBg = topHeight + cardsHeight * 0.33;
        setBgHeight(`${totalBg}px`);
      } else if (heroTopRef.current) {
        setBgHeight(`${heroTopRef.current.offsetHeight}px`);
      }
    };

    updateBgHeight();
    window.addEventListener('resize', updateBgHeight);
    const timer = setTimeout(updateBgHeight, 150);
    return () => {
      window.removeEventListener('resize', updateBgHeight);
      clearTimeout(timer);
    };
  }, [block.cards.length, block.enabled]);

  if (!block.enabled) return null;

  return (
    <section className="relative text-white pb-12 sm:pb-16">
      <div 
        className="absolute top-0 left-0 right-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500 bg-slate-950"
        style={{
          height: bgHeight,
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.88)), url('${block.backgroundUrl}')`
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={heroTopRef} className="pt-12 md:pt-20 pb-16">
          {block.badge && (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#b8cd33]/20 border border-[#b8cd33]/40 text-[#b8cd33] font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-xs">
              <Zap className="w-4 h-4" />
              <span>{block.badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight max-w-5xl mx-auto leading-none mb-4">
            {block.title} {block.highlight && <span className="text-[#b8cd33]">{block.highlight}</span>}
          </h1>
          
          {block.intro && (
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
              {block.intro}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            {block.primaryCtaLabel && (
              <button
                onClick={onOpenAnalysisModal}
                className="px-8 py-4 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-base shadow-xl hover:shadow-[#b8cd33]/20 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>{block.primaryCtaLabel}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            
            {block.secondaryCtaLabel && (
              <button
                onClick={onOpenRoiCalculator}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-base border border-slate-700 transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#b8cd33]" />
                <span>{block.secondaryCtaLabel}</span>
              </button>
            )}
          </div>
        </div>

        {block.cards.length > 0 && (
          <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center max-w-7xl mx-auto">
            {block.cards.map((card, index) => {
              const isLastOdd = index === block.cards.length - 1 && block.cards.length % 2 !== 0;
              const onCardClick = () => {
                if (card.action === 'analysis') onOpenAnalysisModal();
                else if (card.action === 'roi') onOpenRoiCalculator();
                else if (card.targetSlug) {
                  const to = card.targetSlug.startsWith('/') ? card.targetSlug : `/${card.targetSlug}`;
                  navigate(to);
                }
              };

              return (
                <button
                  type="button"
                  key={card.id}
                  onClick={onCardClick}
                  className={`w-full bg-[#b8cd33] text-slate-950 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 relative group flex flex-col justify-between items-center text-center cursor-pointer ${
                    isLastOdd ? 'col-span-2 lg:col-span-1 max-w-md mx-auto' : ''
                  }`}
                >
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-center items-center mb-3 sm:mb-6 min-h-[48px] sm:min-h-[72px] relative">
                      <span className="absolute left-0 top-0 text-[10px] sm:text-xs font-black tracking-widest text-slate-950/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <HeroCardIcon card={card} />
                    </div>
                    <h3 className="text-sm sm:text-xl font-bold uppercase mb-1.5 sm:mb-2 tracking-tight">{card.title}</h3>
                    {card.description && (
                      <p className="text-slate-900 font-thin text-[11px] sm:text-sm leading-snug sm:leading-relaxed">
                        {card.description}
                      </p>
                    )}
                  </div>
                  {card.ctaLabel && (
                    <span className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-slate-950/10 w-full flex items-center justify-center space-x-1 sm:space-x-2 font-bold text-[10px] sm:text-xs group-hover:underline">
                      <span>{card.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
