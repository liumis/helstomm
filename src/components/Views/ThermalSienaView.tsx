import React, { useState } from 'react';
import { THERMAL_SPECS, NODE_BLUEPRINTS } from '../../data/helstommData';
import { Download, Zap, ShieldCheck, Sparkles, Box, Feather, Maximize2, Truck, FileCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
}

export const ThermalSienaView: React.FC<Props> = ({ onOpenAnalysisModal }) => {
  const [selectedFinish, setSelectedFinish] = useState('betonas');

  const finishes = [
    { id: 'betonas', name: 'Betoninis paviršius', img: '/betoninis.png' },
    { id: 'grafinis', name: 'Grafinis betonas', img: '/grafinis_betonas.png' },
    { id: 'klinkeris', name: 'Klinkerio plytelės', img: '/klinkeris.png' },
    { id: 'matrica', name: 'Su matrica (Tekstūra)', img: '/matrica.png' },
    { id: 'akmuo', name: 'Akmens plokštė', img: '/akmens_plokste.png' }
  ];

  return (
    <div className="py-12 bg-white space-y-20">
      
      {/* Header Banner matching mockup Page 5 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
          A++ Energinė Klasė & Pasyvus Pastatas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          THERMAL TRISLUOKSNĖ FILIGRAN SIENA
        </h1>
        <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
          Thermal trisluoksnės sienos sujungia monolitinę konstrukciją ir gamykloje integruotą šilumos izoliaciją (PIR). Įvairūs išorinės apdailos tipai leidžia įgyvendinti bet kokius architektūrinius sprendinius be šalčio tiltelių.
        </p>
      </div>

      {/* Section 1: SIENOS APDAILOS TIPAI matching mockup Page 5 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-8">
          SIENOS APDAILOS TIPAI
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {finishes.map((f) => (
            <div 
              key={f.id}
              onClick={() => setSelectedFinish(f.id)}
              className={`p-3 rounded-2xl border cursor-pointer transition-all text-center space-y-2 ${
                selectedFinish === f.id
                  ? 'bg-lime-50 border-[#b8cd33] ring-2 ring-[#b8cd33] shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="h-32 rounded-xl overflow-hidden">
                <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs">{f.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: KONSTRUKCINĖ SCHEMA matching mockup Page 5 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-lime-50/60 rounded-3xl p-6 md:p-10 border border-[#b8cd33]/40">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-8">
            KONSTRUKCINĖ SCHEMA
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 flex items-center justify-center">
              <img 
                src="/thermal_trisluoksnes_sienos.png" 
                alt="Thermal Wall Schema" 
                className="w-full h-auto object-contain max-h-[350px]"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-bold">„Thermal siena“</strong> – tai energetiškai efektyvus, trisluoksnis „Filigran“ tipo gelžbetoninis elementas, turintis integruotą termoizoliacijos sluoksnį. Sieną sudaro dvi gamyklinės plokštės, tarp kurių pramoniniu būdu yra sumontuotas norimo storio poliuretano (PIR) sluoksnis.
                </p>
                <p>
                  Vienu technologiniu žingsniu išgaunama maksimaliai apšiltinta, nešanti konstrukcija, visiškai panaikinanti šalčio tiltelius. Šis sprendimas atveria galimybes statyti A++ ar net pasyvius pastatus neįtikėtinu greičiu.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#b8cd33]">
                  Techninė Charakteristika
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {THERMAL_SPECS.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">{s.label}:</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Atsiunčiama THERMAL Trisluoksnės Sienos Specifikacija (PDF)")}
                className="px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Atsisiųsti THERMAL Katalogą</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Section 3: PRIVALUMAI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-10">
          PRIVALUMAI
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: '/privalumai_architekturinis.svg',
              title: 'ARCHITEKTŪRINIS PAVIRŠIUS',
              desc: 'Galimybės įvairaus architektūrinio apdailinio paviršiaus'
            },
            {
              icon: '/privalumai_maximalus_energetinis.svg',
              title: 'MAXIMALUS ENERGETINIS EFEKTYVUMAS',
              desc: 'Integruotas vientisas izoliacinis sluoksnis garantuoja nepriekaištingą šiluminę varžą'
            },
            {
              icon: '/privalumai_idealiai_lygus_double.svg',
              title: 'IDEALIAI LYGŪS ABIEJŲ PUSIŲ PAVIRŠIAI',
              desc: 'Idealiai lygūs paviršiai be tinkavimo'
            },
            {
              icon: '/privalumai_viskas_viename.svg',
              title: 'VISKAS VIENAME (GAMYKLINĖ INTEGRACIJA)',
              desc: 'Sienose gamykloje sumontuojamos elektros instaliacijos dėžutės, ŠVOK kanalai.'
            },
            {
              icon: '/privalumai_monolitinis.svg',
              title: 'MONOLITINIS VIENTISUMAS IR SANDARUMAS',
              desc: 'Sistema užtikrina maksimalią konstrukcijos galią, ypatingą akustinį sandarumą ir vientisumą.'
            },
            {
              icon: '/privalumai_maksimalus.svg',
              title: 'MAKSIMALUS STATYBŲ GREITIS',
              desc: 'Dėl didelių sienų gabaritų ir minimalių darbų objekte. Darbai atliekami greičiau: 300 % sparčiau nei monolitas, ir 30% greičiau nei surenkamas gelžbetonis'
            },
            {
              icon: '/privalumai_efektyvesnis.svg',
              title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
              desc: 'Dėl mažesnio tuštividurių elementų svorio transportuojama daug daugiau kvadratinių metrų sienų.'
            },
            {
              icon: '/privalumai_sklandus.svg',
              title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS',
              desc: 'Standartizuoti mazgai, BIM ir techninė pagalba'
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

      {/* Section 4: MAZGAI - JUNGTYS matching mockup Page 5 */}
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
            <span>Užsakyti THERMAL Sienų Analizę</span>
          </button>
        </div>
      </div>

    </div>
  );
};
