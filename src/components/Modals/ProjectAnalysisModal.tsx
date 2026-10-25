import React, { useState } from 'react';
import { X, Check, Send, Paperclip } from 'lucide-react';
import { submitAnalysisForm } from '../../api/contact';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectAnalysisModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    details: ''
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      await submitAnalysisForm({
        ...formData,
        files,
      });
      setSubmitted(true);
    } catch {
      setSubmitError('Nepavyko išsiųsti užklausos. Bandykite dar kartą.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <span className="inline-block px-2.5 py-1 bg-[#b8cd33]/30 text-slate-900 font-bold text-xs rounded-full uppercase tracking-wider mb-1">
              Nemokamas Vertinimas
            </span>
            <h2 className="text-2xl font-bold text-slate-900">Gauti Projektų Analizę</h2>
            <p className="text-sm text-slate-500">Įvertinsime Jūsų projektą ir pasiūlysime optimalų konstrukcinį sprendimą</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-lime-100 text-[#7a8a18] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Projektas Užregistruotas!</h3>
            <p className="text-slate-600 max-w-md mx-auto text-sm">
              Mūsų vyriausiasis inžinierius peržiūrės pateiktą medžiagą ir per 24 val. pateiks išsamią ataskaitą su optizuotais Filigran sprendiniais adresu <span className="font-semibold text-slate-900">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFiles([]);
                setFormData({ name: '', email: '', phone: '', company: '', details: '' });
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#b8cd33] text-slate-950 font-bold rounded-xl text-sm"
            >
              Uždaryti
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vardas *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Vardas Pavardė"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">El. paštas *</label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="el.pastas@imone.lt"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Telefonas</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+370 600 00000"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Įmonė / Projektas</label>
                <input 
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Projekto nosaukums ili imone"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Projekto aprašymas ar pastabos</label>
              <textarea 
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                placeholder="Trumpai aprašykite pastato konstrukciją, aukštų skaičių, norimus sprendinius (sienos, perdangos, balkonai)..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
              />
            </div>

            {/* File Upload Box matching mockup format */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Prisegti Projekto Brėžinius (PDF / DWG / IFC / ZIP)</label>
              <div className="relative border-2 border-dashed border-slate-300 hover:border-[#b8cd33] bg-lime-50/30 p-4 rounded-xl text-center cursor-pointer transition-colors group">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.dxf,.ifc,.zip,.rar,.7z,.jpg,.jpeg,.png,.svg"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Paperclip className="w-6 h-6 text-[#7a8a18] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-slate-800">
                    {files.length > 0
                      ? `Prisegta: ${files.map((item) => item.name).join(', ')}`
                      : '+ Įkelti failus'}
                  </span>
                  <span className="text-xs text-slate-500">Prisegti architektūrinius ar konstrukcinius brėžinius (iki 50MB)</span>
                </div>
              </div>
            </div>

            {submitError && (
              <p className="text-xs font-semibold text-red-600">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] disabled:opacity-60 text-slate-950 font-bold rounded-xl text-base shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>{submitting ? 'Siunčiama...' : 'Pateikti Užklausą'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
