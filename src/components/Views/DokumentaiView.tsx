import React, { useEffect, useMemo, useState } from 'react';
import { fetchDocuments } from '../../api/documents';
import { fetchDokumentaiSettings } from '../../api/dokumentai';
import { FALLBACK_DOKUMENTAI } from '../../data/pageChrome';
import { LibraryDocument } from '../../types';
import { Download, FileText, FileCode, Search, X } from 'lucide-react';

interface Props {
  onOpenAnalysisModal: () => void;
  onOpenRoiCalculator: () => void;
}

function matchesSearch(doc: LibraryDocument, query: string) {
  if (!query) return true;
  const haystack = [
    doc.name,
    doc.acronym,
    doc.subcategory,
    doc.category === 'mazgas' ? 'cad bim mazgai ifc dwg pdf svg' : 'montavimo instrukcijos vadovai',
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

function primaryFileUrl(doc: LibraryDocument) {
  return doc.pdfUrl || doc.dwgUrl || doc.svgUrl;
}

const FileButton: React.FC<{
  label: string;
  href?: string;
  wide?: boolean;
}> = ({ label, href, wide }) => {
  const enabled = Boolean(href);
  const className = `${wide ? 'w-full' : 'flex-1'} py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1 ${
    enabled
      ? 'bg-slate-100 hover:bg-[#b8cd33] hover:text-slate-950 text-slate-800'
      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
  }`;

  if (!enabled) {
    return (
      <span className={className}>
        <Download className="w-3 h-3" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <a href={href} download className={className}>
      <Download className="w-3 h-3" />
      <span>{label}</span>
    </a>
  );
};

export const DokumentaiView: React.FC<Props> = ({ onOpenAnalysisModal, onOpenRoiCalculator }) => {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [page, setPage] = useState(FALLBACK_DOKUMENTAI);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchDocuments(), fetchDokumentaiSettings()])
      .then(([data, settings]) => {
        if (cancelled) return;
        setDocuments(data);
        setPage(settings);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const query = searchTerm.trim().toLowerCase();

  const manuals = useMemo(
    () => documents.filter((doc) => doc.category === 'manual' && matchesSearch(doc, query)),
    [documents, query]
  );

  const mazgai = useMemo(
    () => documents.filter((doc) => doc.category === 'mazgas' && matchesSearch(doc, query)),
    [documents, query]
  );

  const noResults = !loading && query.length > 0 && manuals.length === 0 && mazgai.length === 0;

  return (
    <div className="py-12 bg-white space-y-16">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block">
          {page.badge}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight">
          {page.title}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto font-medium text-sm sm:text-base">
          {page.intro}
        </p>
      </div>

      {/* Quick Search & Tools */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={page.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#b8cd33] outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Išvalyti paiešką"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={onOpenRoiCalculator}
              className="w-full sm:w-auto px-4 py-2 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
            >
              <span>{page.roiCta}</span>
            </button>
            <button
              onClick={onOpenAnalysisModal}
              className="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
            >
              <span>{page.analysisCta}</span>
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center text-sm font-medium text-slate-500">
          Kraunami dokumentai...
        </div>
      )}

      {noResults && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">{page.emptyTitle}</h3>
            <p className="text-sm text-slate-500 mt-1">{page.emptyIntro}</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-[#b8cd33] text-slate-950 font-bold text-xs rounded-xl"
            >
              {page.emptyCta}
            </button>
          </div>
        </div>
      )}

      {/* Category 1: Montavimo Instrukcijos ir Dokumentai */}
      {manuals.length > 0 && (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-[#7a8a18]" />
          <h2 className="text-xl font-bold text-slate-900 uppercase">{page.manualsHeading}</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {manuals.map((manual) => {
            const href = primaryFileUrl(manual);
            return (
            <div key={manual.id} className="bg-slate-50 p-3 sm:p-5 rounded-2xl border border-slate-200 hover:border-[#b8cd33] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start space-x-3 min-w-0">
                {manual.image ? (
                  <img src={manual.image} alt="" className="hidden sm:block w-14 h-14 rounded-xl object-cover shrink-0" />
                ) : null}
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {manual.subcategory && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#b8cd33] uppercase bg-lime-100 px-2 py-0.5 rounded inline-block">
                        {manual.subcategory}
                      </span>
                    )}
                    {manual.acronym && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 uppercase bg-white border border-slate-200 px-2 py-0.5 rounded inline-block">
                        {manual.acronym}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2">{manual.name}</h3>
                  {manual.fileSize && (
                    <span className="text-[10px] sm:text-xs text-slate-500 block">{page.sizeLabel} {manual.fileSize}</span>
                  )}
                </div>
              </div>
              {href ? (
                <a
                  href={href}
                  download
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-slate-900 hover:bg-[#b8cd33] hover:text-slate-950 text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center justify-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{page.downloadLabel}</span>
                </a>
              ) : (
                <span className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-slate-200 text-slate-500 font-bold rounded-xl text-xs shrink-0 flex items-center justify-center space-x-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>{page.missingFileLabel}</span>
                </span>
              )}
            </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Category 2: CAD / BIM Mazgai */}
      {mazgai.length > 0 && (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <FileCode className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 uppercase">{page.mazgaiHeading}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mazgai.map((bp) => (
            <div key={bp.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow text-left space-y-3">
              <div className="h-36 rounded-xl bg-slate-100 overflow-hidden relative">
                {bp.image ? (
                  <img src={bp.image} alt={bp.name} className="w-full h-full object-cover" />
                ) : null}
                {bp.acronym && (
                  <span className="absolute top-2 left-2 bg-slate-900 text-[#b8cd33] px-2 py-0.5 rounded text-[10px] font-bold">
                    {bp.acronym}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-xs line-clamp-2">{bp.name}</h3>
              <div className="flex flex-wrap gap-2">
                <FileButton label="DWG" href={bp.dwgUrl} />
                <FileButton label="SVG" href={bp.svgUrl} />
                <FileButton label="PDF" href={bp.pdfUrl} />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

    </div>
  );
};
