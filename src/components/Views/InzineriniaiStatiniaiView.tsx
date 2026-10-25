import React from 'react';
import { InteractiveDiagram } from '../InteractiveDiagram';
import { Play, Shield, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
}

export const InzineriniaiStatiniaiView: React.FC<Props> = ({ onOpenAnalysisModal }) => {
  const engineeringHotspots = [
    {
      id: 'eng1',
      title: 'Vandeniui Neprataki Sienos Jungtis',
      xPct: 25,
      yPct: 30,
      description: 'Surenkamų sienų sujungimas su monolitinio užpildo branduoliu, garantuojantis 100% hidroizoliacinį sandarumą pagal W-4/W-8 standartus.',
      techDetail: 'Aukštas atsparumas gruntiniams vandenims'
    },
    {
      id: 'eng2',
      title: 'Berlyno Sienelės Sulaikymo Karkasas',
      xPct: 65,
      yPct: 40,
      description: 'Aukšto atsparumo gruntų sulaikymo sienos, tinkamos atviroms iškasoms bei šalia esantiems pamatams apsaugoti.',
      techDetail: 'Didelė laikomoji galia lenkimui ir šlyčiai'
    },
    {
      id: 'eng3',
      title: 'Surenkamas Rezervuaro Dugno & Sienų Mazgas',
      xPct: 50,
      yPct: 75,
      description: 'Rezervuarams ir valymo įrenginiams skirti kompozitiniai mazgai be tradicinių sunkiųjų klojinių.',
      techDetail: 'Ilgaamžis betonas C35/45 XF2/XD3'
    }
  ];

  return (
    <div className="py-12 bg-white space-y-20">
      
      {/* Header Banner matching mockup Page 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
          Specialioji Inžinerija
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          INŽINERINIAI STATINIAI
        </h1>
        <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
          „Filigran“ kompozitinės konstrukcijos – pažangus sprendimas inžineriniams statiniams, sujungiantis monolito vientisumą ir gamyklinį tikslumą, garantuojantys ypatingą tvirtumą ir trumpiausią montavimo laiką.
        </p>
      </div>

      {/* Interactive Diagram Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveDiagram 
          title="INŽINERINIŲ STATINIŲ MAZGAI"
          subtitle="Spustelėkite aktyvias nuorodas, kad pamatytumėte požeminių bei atraminių konstrukcijų jungtis"
          imageUrl="/kitos_konstrukcijos.png"
          hotspots={engineeringHotspots}
        />
      </div>

      {/* Video & Assembly Section matching mockup Page 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
          LENGVAS SURINKIMAS KIEKVIENAM MONTUOTOJUI
        </h2>

        <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 relative p-8 md:p-12 text-center text-white bg-cover bg-center" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.9), rgba(15,23,42,0.95)), url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1200')`
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
            Inžinerinių atraminių sienelių ir požeminių statinių Filigran karkaso montavimo instrukcija.
          </p>
        </div>

        <div>
          <button
            onClick={onOpenAnalysisModal}
            className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>Gauti Inžinerinio Statinio Analizę</span>
          </button>
        </div>
      </div>

    </div>
  );
};
