import React from 'react';
import { BALKONAI_SPECS, NODE_BLUEPRINTS } from '../../data/helstommData';
import { Download, ShieldCheck, Zap, Sparkles, Box, CheckCircle } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
}

export const BalkonaiView: React.FC<Props> = ({ onOpenAnalysisModal }) => {
  const advantages = [
    { title: 'DVISLUOKSNĖS MONOLITINĖS SIENOS', desc: '2 sluoksniai surenkami gamykloje; 50-70 mm bendras plokštės storis (galutinis 200-400 mm).' },
    { title: 'SAUGUMAS', desc: 'Užtikrintas aukščiausias darbuotojų saugumas visų montavimo etapų metu.' },
    { title: 'VISKAS VIENAME', desc: 'Plokštėje gamykloje jau yra angos, armatūra, termoizoliacija, įdėtinės detalės ir ŠVOK instaliacija.' },
    { title: 'PALENGVINTAS DARBAS', desc: 'Lengvesnis ir švaresnis komandos darbas aikštelėje be šalčio tiltelių pavojaus.' }
  ];

  return (
    <div className="py-12 bg-white space-y-20">
      
      {/* Header Banner matching mockup Page 7 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
          Termoizoliacinės Isokorb Jungtys
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          BALKONAI
        </h1>
        <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
          „Filigran“ tipo gelžbetonio balkonų plokštės – tai pramoniniu būdu pagaminti elementai su gamykliškai integruotais termoizoliaciniais elementais (termoizoliacinėmis jungtimis). Sistema visiškai panaikina šalčio tiltelius, iki 50% sutrumpina karkaso įrengimo laiką objekte bei garantuoja veidrodinio lygumo paviršius, kuriems nereikia papildomo tinkavimo.
        </p>
      </div>

      {/* Section 1: KONSTRUKCINĖ SCHEMA matching mockup Page 7 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-lime-50/60 rounded-3xl p-6 md:p-10 border border-[#b8cd33]/40">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-8">
            KONSTRUKCINĖ SCHEMA
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 flex items-center justify-center">
              <img 
                src="/balkonai.png" 
                alt="Balkonai Schema" 
                className="w-full h-auto object-contain max-h-[350px]"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-bold">„Filigran“ tipo balkono plokštė</strong> – tai pramoniniu būdu gamykloje pagamintas surenkamas-monolitinis gelžbetonio elementas, suprojektuotas siekiant išspręsti didžiausią fasado konstrukcijų iššūkį – šalčio tiltelius.
                </p>
                <p>
                  Šios plokštės išskirtinumas – dar gamybos etape integruota speciali termoizoliacinė jungtis su nerūdijančio plieno erdviniu armatūros karkasu. Tokiu būdu balkonas tampa visiškai vientisa, monolitiškai tvirta pastato dalimi.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#b8cd33]">
                  Techninė Charakteristika
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {BALKONAI_SPECS.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">{s.label}:</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Atsiunčiamas Balkonų Plokščių Katalogas (PDF)")}
                className="px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Atsisiųsti Balkonų Katalogą</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Section 2: PRIVALUMAI matching mockup Page 7 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-10">
          PRIVALUMAI
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: '/privalumai_dvisluoksne.svg',
              title: 'DVISLUOKSNĖS MONOLITINĖS SIENOS',
              desc: '2 sluoksniai surenkami gamykloje; 50-70 mm bendras sienos storis 200-400'
            },
            {
              icon: '/privalumai_saugumas.svg',
              title: 'SAUGUMAS',
              desc: 'Užtikrintas saugumas visų etapų metu.'
            },
            {
              icon: '/privalumai_viskas_viename.svg',
              title: 'VISKAS VIENAME',
              desc: 'Sienoje yra angos, armatūra, izoliacija, įvairios įdėtinės detalės, elektros instaliacijos, ŠVOK instaliacija, detalė'
            },
            {
              icon: '/privalumai_palengvintas_darbas.svg',
              title: 'PALENGVINTAS DARBAS',
              desc: 'Lengvesnis komandos darbas.'
            }
          ].map((adv, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <img 
                src={adv.icon} 
                alt={adv.title} 
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain hover:scale-105 transition-transform" 
              />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-tight max-w-[220px]">
                {adv.title}
              </h3>
              <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed max-w-[260px]">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: MAZGAI - JUNGTYS matching mockup Page 7 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight">
          MAZGAI - JUNGTYS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {NODE_BLUEPRINTS.map((bp) => (
            <div key={bp.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3">
              <div className="h-36 rounded-xl bg-slate-100 overflow-hidden relative">
                <img src={bp.previewUrl} alt={bp.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-slate-900 text-[#b8cd33] px-2 py-0.5 rounded text-[10px] font-bold">
                  {bp.code}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xs line-clamp-2">{bp.title}</h3>
              <button 
                onClick={() => alert(`Atsiunčiamas mazgas: ${bp.code}`)}
                className="w-full py-2 bg-slate-100 hover:bg-[#b8cd33] hover:text-slate-950 text-slate-800 font-bold rounded-lg text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Atsisiųsti (DWG/PDF)</span>
              </button>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={onOpenAnalysisModal}
            className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md inline-flex items-center space-x-2"
          >
            <span>Užsakyti Balkonų Jungčių Skaičiavimą</span>
          </button>
        </div>
      </div>

    </div>
  );
};
