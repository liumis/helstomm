import React from 'react';
import { InteractiveDiagram } from '../InteractiveDiagram';
import { Play } from 'lucide-react';

interface Props {
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  diagramTitle?: string;
  diagramSubtitle?: string;
  hotspots?: Array<{
    id: string;
    title: string;
    xPct: number;
    yPct: number;
    description: string;
    techDetail?: string;
  }>;
  onOpenAnalysisModal: () => void;
}

export const CategoryViewTemplate: React.FC<Props> = ({
  title,
  badge,
  subtitle,
  description,
  diagramTitle = "KONSTRUKCINIS MODELIS",
  diagramSubtitle = "Spustelėkite aktyvias nuorodas, kad pamatytumėte Filigran sienų ir perdangų sprendimus",
  hotspots = [],
  onOpenAnalysisModal,
}) => {
  const defaultHotspots = [
    {
      id: 'hs1',
      title: 'Filigran Dvigubos Sienos Plokštės',
      xPct: 22,
      yPct: 35,
      description: 'Gamykloje pagamintos dvi lygiagrečios 50-70 mm sienutės su erdviniu karkasu. Užtikrina idealų paviršių be tinkavimo.',
      techDetail: 'Sienos storis iki 50 cm | Betono klasė C30/37'
    },
    {
      id: 'hs2',
      title: 'Monolitinis Šerdis (Betonavimas)',
      xPct: 55,
      yPct: 65,
      description: 'Objekte užpilamas prekinis betonas sujungia elementus į vientisą monolitinę karkaso struktūrą be jokių tradicinių klojinių.',
      techDetail: '100% Monolitinis vientisumas ir akustinė izoliacija'
    },
    {
      id: 'hs3',
      title: 'Filigran Perdangų Plokštė',
      xPct: 75,
      yPct: 25,
      description: 'Surenkama-monolitinė perdanga su integruota armatūra. Sutrumpina karkaso rengimo laiką iki 50%.',
      techDetail: 'Projektuojamas storis 200-250 mm'
    },
    {
      id: 'hs4',
      title: 'Termoizoliacinė Jungtis (Balkonai)',
      xPct: 30,
      yPct: 80,
      description: 'Isokorb tipo nerūdijančio plieno armavimo karkasas, visiškai eliminuojantis šalčio tiltelius.',
      techDetail: 'A++ Energetinė klasė ir Pasyvus standartas'
    }
  ];

  const activeHotspots = hotspots.length > 0 ? hotspots : defaultHotspots;

  return (
    <div className="py-12 bg-white space-y-20">
      {/* Header Banner matching Pastatai style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
          {badge}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-slate-900 font-bold text-lg sm:text-xl mb-3">
          {subtitle}
        </p>
        <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive Diagram Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDiagram 
          title={diagramTitle}
          subtitle={diagramSubtitle}
          imageUrl="/80456-16320159.webp"
          hotspots={activeHotspots}
        />
      </div>

      {/* Video & Assembly Walkthrough Section matching Pastatai style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
          GREITAS KONSTRUKCIJŲ SURINKIMAS
        </h2>

        <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 relative p-8 md:p-12 text-center text-white bg-cover bg-center" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.95)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200')`
        }}>
          <div className="mb-6 space-y-2">
            <div className="text-3xl md:text-5xl font-black tracking-wider text-white">
              HELSTOMM <span className="text-[#b8cd33]">GROUP</span>
            </div>
            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#b8cd33]">
              PRECAST CONCRETE | DESIGN | MANUFACTURE | BUILD | MANAGEMENT
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#b8cd33] text-slate-950 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 fill-slate-950 ml-1" />
            </div>
          </div>

          <p className="text-slate-300 font-medium text-sm max-w-xl mx-auto">
            Animacinis 3D karkaso montavimo gidas: nuo pirmojo aukšto dvigubų sienų iki stogo Filigran perdangų užpylimo.
          </p>
        </div>

        <div>
          <button
            onClick={onOpenAnalysisModal}
            className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>Užsakyti Projekto Analizę</span>
          </button>
        </div>
      </div>
    </div>
  );
};
