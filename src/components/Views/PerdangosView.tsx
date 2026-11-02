import React from 'react';
import { PERDANGOS_SPECS, NODE_BLUEPRINTS } from '../../data/helstommData';
import { Download, Layers, ShieldCheck, Zap, Sparkles, Box, Feather, Maximize2, Truck, FileCheck } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
}

export const PerdangosView: React.FC<Props> = ({ onOpenAnalysisModal }) => {
  const perdangosTypes = [
    { title: 'Perdanga su Delta sijomis', img: '/Su_delta_sija.png' },
    { title: 'Perdanga su sijomis', img: '/Su_sija.png' },
    { title: 'Perdanga su Filigran sija', img: '/Su_Filigran_sija.png' },
    { title: 'Filigran tipo perdanga', img: '/Filigran_tipo.png' },
    { title: 'Akustinė perdanga', img: '/Akustine.png' },
    { title: 'Daugiaatramės plokštės', img: '/Daugiaatramine.png' },
    { title: 'Rūsio perdanga', img: '/Rusio-1.png' },
    { title: 'EKO perdanga', img: '/Eko_perdanga.png' },
    { title: 'Išlengvinta perdanga (su tūrio užpildais)', img: '/Islengvinta.png' }
  ];

  const advantages = [
    { title: 'SUDĖTINGI SPRENDIMAI. MONOLITINIS VIENTISUMAS', desc: 'Vientisa perdanga. Ji pasižymi maksimaliu konstrukciniu saugumu, didele laikomąja galia ir nepriekaištinga garso izoliacija.' },
    { title: 'NEREIKALINGOS ATRAMOS', desc: 'Nereikalingos papildomos atramos-sijos, sąramos ar sienos rengiant Filigran perdangą, lyginant su standartinėmis plokštėmis.' },
    { title: 'STATYBA BE TRADICINIŲ KLOJINIŲ', desc: 'Filigran plokštė pati atlieka saugaus liktinio klojinio funkciją statybvietėje.' },
    { title: 'IDEALIAI LYGUS PAVIRŠIUS', desc: 'Idealiai lygūs gamykliniai paviršiai be papildomo tinkavimo poreikio.' },
    { title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS', desc: 'Vienu reisu atvežama iki 120 m² perdangos plokščių.' },
    { title: 'IKI 50% GREITESNIS MONTAVIMAS', desc: 'Iki 3 kartų sutrumpėja perdangų įrengimo statybos greitis.' },
    { title: 'INŽINERINIŲ SISTEMŲ INTEGRAVIMAS', desc: 'Kompozitinėje perdangoje gamykloje integruojamos ŠVOK, vandentiekio bei elektros instaliacijos.' },
    { title: 'SKLANDUS IR AIŠKUS PROJEKTAVIMAS', desc: 'Standartizuoti mazgai, BIM modeliai ir visapusiška techninė pagalba.' }
  ];

  return (
    <div className="py-12 bg-white space-y-20">
      
      {/* Header Banner matching mockup Page 6 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
          Iki 50% Greitesnis Įrengimas
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-4">
          PERDANGOS
        </h1>
        <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
          „Filigran“ surenkamos-monolitinės perdangų plokštės – tai pažangus sprendimas, iki 50% pagreitinantis perdangų įrengimą statybvietėje. Mūsų „Filigran“ perdangos sukurtos taip, kad idealiai ir be papildomų klojinių susijungtų su „Double Wall“ sienų elementais, suformuojant vientisą, monolitinį pastato karkasą.
        </p>
      </div>

      {/* Section 1: KONSTRUKCINIAI SPRENDIMAI matching mockup Page 6 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-8">
          KONSTRUKCINIAI SPRENDIMAI
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {perdangosTypes.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-center">
              <div className="h-36 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: KONSTRUKCINĖ SCHEMA matching mockup Page 6 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-lime-50/60 rounded-3xl p-6 md:p-10 border border-[#b8cd33]/40">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-8">
            KONSTRUKCINĖ SCHEMA
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 flex items-center justify-center">
              <img 
                src="/perdanga.png" 
                alt="Perdangos Schema" 
                className="w-full h-auto object-contain max-h-[350px]"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-bold">„Filigran“ perdanga</strong> – tai pažangi surenkama-monolitinė kompozitinė gelžbetonio sistema, kurią sudaro gamykloje pagaminta lygi plokštė (paprastai 50–70 mm storio) su laikančiąja armatūra ir erdviniu karkasu (grotelėmis).
                </p>
                <p>
                  Kompozitinė konstrukcija, susidedanti iš surenkamo elemento ir monolitinio sluoksnio, tampa visiškai vientisa ir standi, atitinkanti įprasto monolito skaičiavimus su aukščiausia garso izoliacija.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#b8cd33]">
                  Techninė Charakteristika
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {PERDANGOS_SPECS.map((s, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">{s.label}:</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert("Atsiunčiamas Perdangų Plokščių Katalogas (PDF)")}
                className="px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-xs shadow-md transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Atsisiųsti Perdangų Katalogą</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Section 3: PRIVALUMAI matching mockup Page 6 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-10">
          PRIVALUMAI
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: '/privalumai_sudetingi_sprendimai.svg',
              title: 'SUDĖTINGI SPRENDIMAI. MONOLITINIS VIENTISUMAS',
              desc: 'Vientisa perdanga. Ji pasižymi maksimaliu konstrukciniu saugumu, didele laikomąja galia ir nepriekaištinga garso izoliacija'
            },
            {
              icon: '/Privalumai_NEREIKALINGOS ATRAMOS .svg',
              title: 'NEREIKALINGOS ATRAMOS',
              desc: 'Nereikalingos atramos- sijos, sąramos, sienos įrengiant Filigrann perdangą, lyginant su standartinėmis plokštėmis'
            },
            {
              icon: '/Privalumai_STATYBA_BE_TRADICINIU_KLOJINIU -1.svg',
              title: 'STATYBA BE TRADICINIŲ KLOJINIŲ',
              desc: 'Filigran® plokštė pati atlieka saugaus liktinio klojinio funkciją.'
            },
            {
              icon: '/privalumai_idealiai_lygus.svg',
              title: 'IDEALIAI LYGUS PAVIRŠIUS',
              desc: 'Idealiai lygus paviršiai be tinkavimo'
            },
            {
              icon: '/privalumai_efektyvesnis.svg',
              title: 'EFEKTYVESNIS IR PIGESNIS TRANSPORTAVIMAS',
              desc: 'Vienu reisu atvežama iki 120 m2 perdangos plokščių.'
            },
            {
              icon: '/privalumai_iki_50.svg',
              title: 'IKI 50% GREITESNIS MONTAVIMAS',
              desc: 'Iki 3 kartų sutrumpėja statybos greitis'
            },
            {
              icon: '/privalumai_inzinieriniu_sistemu.svg',
              title: 'INŽINERINIŲ SISTEMŲ INTEGRAVIMAS',
              desc: 'Kompozitinėje perdangoje, integruojamos inžinerinės sistemos – ŠVOK, vandentiekis, elektros instaliacija'
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

      {/* Section 4: MAZGAI - JUNGTYS matching mockup Page 6 */}
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
            <span>Užsakyti Perdangų Inžinerinį Projektą</span>
          </button>
        </div>
      </div>

    </div>
  );
};
