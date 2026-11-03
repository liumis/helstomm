import React, { useEffect, useState } from 'react';
import { Play, Award, CheckCircle } from 'lucide-react';
import { HelstommLogo } from './HelstommLogo';
import { fetchManufacturingBlock } from '../api/gamybosProcesas';
import { FALLBACK_MANUFACTURING_BLOCK } from '../data/gamybosProcesas';
import { isOpenableFile } from '../lib/files';

export const ManufacturingSection: React.FC = () => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [block, setBlock] = useState(FALLBACK_MANUFACTURING_BLOCK);

  useEffect(() => {
    fetchManufacturingBlock().then(setBlock);
  }, []);

  if (!block.enabled) return null;

  return (
    <section id="gamybos-procesas" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          {block.badge && (
            <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
              {block.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight">
            {block.title}
          </h2>
          {block.intro && (
            <p className="text-slate-600 font-medium text-base md:text-lg mt-2">
              {block.intro}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 relative mb-10">
          {isPlayingVideo && block.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src={`${block.videoUrl}${block.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                title={block.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-8 text-center bg-cover bg-center" style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.85), rgba(15,23,42,0.95)), url('${block.posterUrl}')`
            }}>
              <div className="mb-6 flex flex-col items-center">
                <HelstommLogo compact lightText={true} className="h-16 md:h-20 w-auto mb-2" />
                {block.tagline && (
                  <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#b8cd33]">
                    {block.tagline}
                  </div>
                )}
              </div>

              {block.videoUrl && (
                <button 
                  onClick={() => setIsPlayingVideo(true)}
                  className="w-16 h-16 md:w-20 md:h-20 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer group mb-4"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-slate-950 ml-1" />
                </button>
              )}
              
              {block.videoCaption && (
                <p className="text-slate-300 font-semibold text-sm max-w-lg">
                  {block.videoCaption}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="text-center space-y-6">
          {block.certificatesCtaLabel && (
            isOpenableFile(block.certificatesFileUrl) ? (
              <a
                href={block.certificatesFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md inline-flex items-center space-x-2"
              >
                <Award className="w-5 h-5 text-slate-950" />
                <span>{block.certificatesCtaLabel}</span>
              </a>
            ) : (
              <span className="px-8 py-3.5 bg-slate-100 text-slate-400 font-black rounded-xl text-sm inline-flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>{block.certificatesCtaLabel}</span>
              </span>
            )
          )}

          {block.certificates.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto pt-4">
              {block.certificates.map((item, index) => {
                const isLastOdd = index === block.certificates.length - 1 && block.certificates.length % 2 !== 0;
                return (
                  <div
                    key={item}
                    className={`flex items-center space-x-2 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 ${
                      isLastOdd ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
