import React, { useState } from "react";
import {
  X,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Download,
  Clock,
  DollarSign,
  ShieldAlert,
  Award,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenAnalysis: () => void;
}

export const RoiCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenAnalysis,
}) => {
  const [area, setArea] = useState<number>(5000);
  const [buildingType, setBuildingType] = useState<string>("gyvenamasis");
  const [useEkoConcrete, setUseEkoConcrete] = useState<boolean>(true);

  if (!isOpen) return null;

  // Calculation parameters based on area
  const estimatedDaysMonolithic = Math.round(area * 0.08);
  const estimatedDaysFiligran = Math.round(estimatedDaysMonolithic * 0.35); // 65% time reduction
  const daysSaved = estimatedDaysMonolithic - estimatedDaysFiligran;
  const weeksSaved = Math.round(daysSaved / 5);
  const laborSavingsPct = 40;
  const craneSavingsPct = 30;
  const estimatedMonolithicCost = Math.round(area * 180);
  const estimatedFiligranCost = Math.round(area * 155);
  const totalFinancialSaving = estimatedMonolithicCost - estimatedFiligranCost;
  const co2ReducedTons = Math.round(area * (useEkoConcrete ? 0.045 : 0.025));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-sm max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh] border border-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Uždaryti"
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-sm hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="pr-10 pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-sm bg-[#b8cd33]/20 text-slate-800">
              <Calculator className="w-6 h-6 text-[#7a8a18]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Projekto ROI & Greičio Skaičiuoklė
              </h2>
              <p className="text-sm text-slate-500">
                Įvertinkite sutaupytą laiką, biudžetą bei jėgos resursus su
                Filigran sistema
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-sm border border-slate-200/80">
            <div>
              <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
                Pastato plotas (m²):{" "}
                <span className="text-[#b8cd33] font-bold text-base">
                  {area.toLocaleString()} m²
                </span>
              </label>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#b8cd33] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>500 m²</span>
                <span>15,000 m²</span>
                <span>30,000 m²</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 uppercase tracking-wider mb-2">
                Pastato paskirtis
              </label>
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-sm text-sm text-slate-800 font-medium focus:ring-2 focus:ring-[#b8cd33] outline-none"
              >
                <option value="gyvenamasis">
                  Gyvenamieji namai / Kvartalas
                </option>
                <option value="industrinis">
                  Gamybos ir Logistikos centras
                </option>
                <option value="komercinis">Verslo centras / Komercija</option>
                <option value="viesasis">Viešasis / Švietimo pastatas</option>
                <option value="inzinerinis">
                  Inžineriniai statiniai / Rūsys
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-[#F6F7F9] border border-[#C9CED6] p-3 rounded-sm text-sm">
            <input
              type="checkbox"
              id="eko-betonas"
              checked={useEkoConcrete}
              onChange={(e) => setUseEkoConcrete(e.target.checked)}
              className="w-4 h-4 accent-[#b8cd33] rounded"
            />
            <label
              htmlFor="eko-betonas"
              className="text-slate-800 cursor-pointer font-medium"
            >
              Įtraukti{" "}
              <span className="text-emerald-700 font-bold">EKO Betoną</span>{" "}
              (Sumažintas CO₂ pėdsakas gamyboje)
            </label>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-sm border border-slate-200 text-center">
              <div className="flex justify-center text-[#7a8a18] mb-1">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                ~{weeksSaved} sav.
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Sutaupyta laiko
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-sm border border-slate-200 text-center">
              <div className="flex justify-center text-[#5F6F0E] mb-1">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                ~{totalFinancialSaving.toLocaleString()} €
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Tiesioginiai sutaupymai
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-sm border border-slate-200 text-center">
              <div className="flex justify-center text-slate-700 mb-1">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                -{laborSavingsPct}%
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Darbo jėgos poreikio
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-sm border border-slate-200 text-center">
              <div className="flex justify-center text-[#5F6F0E] mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                -{co2ReducedTons} t
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Sumažinta CO₂
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-sm space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <span>Tradicinis Monolitas vs Helstomm Filigran</span>
              <span>Proceso Efektyvumas</span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Monolitinis karkasas</span>
                  <span className="text-slate-400">
                    {estimatedDaysMonolithic} d.
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-sm overflow-hidden">
                  <div className="bg-slate-500 h-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#b8cd33] font-semibold">
                    Helstomm „Filigran“ karkasas
                  </span>
                  <span className="text-[#b8cd33] font-bold">
                    {estimatedDaysFiligran} d. (-65%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-sm overflow-hidden">
                  <div
                    className="bg-[#b8cd33] h-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenAnalysis();
              }}
              className="w-full md:w-auto px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-medium rounded-sm flex items-center justify-center space-x-2 transition-all"
            >
              <span>Gauti tikslią inžinerinę analizę</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full md:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-sm text-sm transition-colors"
            >
              Uždaryti skaičiuoklę
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
