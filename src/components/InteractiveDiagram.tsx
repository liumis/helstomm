import React, { useState } from 'react';
import { Info, FileCode } from 'lucide-react';
import { isOpenableFile } from '../lib/files';

interface Hotspot {
  id: string;
  title: string;
  xPct: number;
  yPct: number;
  description: string;
  techDetail: string;
  fileUrl?: string;
}

interface Props {
  title: string;
  subtitle: string;
  imageUrl: string;
  hotspots: Hotspot[];
}

export const InteractiveDiagram: React.FC<Props> = ({ title, subtitle, imageUrl, hotspots }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(hotspots[0] || null);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-[#b8cd33] font-bold text-xs uppercase tracking-widest bg-[#b8cd33]/10 px-3 py-1 rounded-full inline-block">
          Interaktyvus Konstrukcijos Modelis
        </span>
        <h3 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight">
          {title}
        </h3>
        <p className="text-slate-300 text-sm font-medium">
          {subtitle}
        </p>
      </div>

      {/* Main Diagram Canvas with Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Canvas */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-4 md:p-6 border border-slate-200 relative overflow-hidden group min-h-[360px] flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={title}
            className="max-h-[420px] w-auto object-contain mx-auto filter brightness-105 contrast-105"
          />

          {/* Render Hotspots matching mockup "Aktyvi nuoroda" */}
          {hotspots.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                style={{ top: `${hs.yPct}%`, left: `${hs.xPct}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(hs)}
              >
                <div className="relative flex items-center group/hs">
                  {/* Pulse Effect */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#b8cd33] text-slate-950 scale-125 shadow-lg shadow-[#b8cd33]/50' : 'bg-slate-800/90 text-white hover:bg-[#b8cd33] hover:text-slate-950'
                  }`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
                  </div>

                  {/* Hotspot Label Pill matching mockup */}
                  <div className={`ml-2 px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap shadow-md transition-all ${
                    isSelected 
                      ? 'bg-[#b8cd33] text-slate-950 ring-2 ring-white' 
                      : 'bg-slate-900/90 text-slate-200 border border-slate-700 hover:border-[#b8cd33]'
                  }`}>
                    {hs.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Details Box */}
        <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-4">
          <div className="flex items-center space-x-2 text-[#b8cd33] font-bold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Konstrukcinis Mazgas</span>
          </div>

          {activeHotspot && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <h4 className="text-xl font-bold text-white">{activeHotspot.title}</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {activeHotspot.description}
              </p>
              
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Techninis parametras:</span>
                <p className="text-xs font-semibold text-[#b8cd33]">{activeHotspot.techDetail}</p>
              </div>

              {isOpenableFile(activeHotspot.fileUrl) ? (
                <a
                  href={activeHotspot.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <FileCode className="w-4 h-4" />
                  <span>Atsisiųsti Mazgo DWG / PDF</span>
                </a>
              ) : (
                <span className="w-full py-2.5 bg-slate-700 text-slate-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5">
                  <FileCode className="w-4 h-4" />
                  <span>Failas netrukus</span>
                </span>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
