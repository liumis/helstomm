import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { fetchProductBySlug } from "../../api/products";
import type { ProductCatalogItem } from "../../types";
import { isOpenableFile } from "../../lib/files";
interface Props {
  slug: string;
  onOpenAnalysisModal: () => void;
  onOpenSkaiciuokles?: () => void;
}
const PRODUCT_CALCULATORS: Record<string, string> = {
  "dviguba-siena": "Skaičiuoklės: sienos storis, apsauginis sluoksnis",
  "thermal-siena": "Skaičiuoklė: termo sienos U vertė",
  perdangos: "Skaičiuoklė: perdangos storis, įrąžymas",
};
const TILE_GRIDS: Record<number, string> = {
  3: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
};
export const ProductPageView: React.FC<Props> = ({
  slug,
  onOpenAnalysisModal,
  onOpenSkaiciuokles,
}) => {
  const [product, setProduct] = useState<ProductCatalogItem | null>(null);
  useEffect(() => {
    let cancelled = false;
    setProduct(null);
    fetchProductBySlug(slug).then((item) => {
      if (!cancelled) setProduct(item);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  if (!product) {
    return (
      <div className="py-24 text-center text-slate-500 text-sm font-medium">
        Kraunami produkto duomenys...
      </div>
    );
  }
  const tileGrid = TILE_GRIDS[product.tilesColumns] || TILE_GRIDS[4];
  const tileImageHeight = product.tilesColumns === 3 ? "h-36" : "h-32";
  return (
    <div className="py-12 bg-white space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {product.badge && (
          <span className="text-[#b8cd33] font-medium uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-sm inline-block mb-8">
            {product.badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 uppercase tracking-tight mb-12">
          {product.pageTitle}
        </h1>
        {product.pageIntro && (
          <p className="text-slate-600 max-w-4xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            {product.pageIntro}
          </p>
        )}
      </div>
      {product.tiles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {product.tilesSectionTitle && (
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-12">
              {product.tilesSectionTitle}
            </h2>
          )}
          <div className={`grid ${tileGrid} gap-4`}>
            {product.tiles.map((tile, idx) => (
              <div
                key={`${tile.title}-${idx}`}
                className="bg-slate-50 rounded-sm border border-slate-200 overflow-hidden text-center"
              >
                <div className={`${tileImageHeight} overflow-hidden`}>
                  <img
                    src={tile.imageUrl}
                    alt={tile.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-normal text-slate-900 text-xs sm:text-sm">
                    {tile.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(product.schemaImageUrl ||
        product.schemaParagraphs.length > 0 ||
        product.specs.length > 0) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F6F7F9] rounded-sm p-6 md:p-10 border border-[#C9CED6]">
            {product.schemaTitle && (
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-12">
                {product.schemaTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {product.schemaImageUrl && (
                <div className="lg:col-span-6 flex items-center justify-center">
                  <img
                    src={product.schemaImageUrl}
                    alt={product.pageTitle}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain max-h-[350px]"
                  />
                </div>
              )}
              <div
                className={
                  product.schemaImageUrl
                    ? "lg:col-span-6 space-y-4"
                    : "lg:col-span-12 space-y-4"
                }
              >
                {product.schemaParagraphs.length > 0 && (
                  <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    {product.schemaParagraphs.map((paragraph, idx) => (
                      <p key={idx}>
                        {paragraph.highlight && (
                          <strong className="text-slate-900 font-bold">
                            {paragraph.highlight}
                          </strong>
                        )}
                        {paragraph.text}
                      </p>
                    ))}
                  </div>
                )}
                {product.specs.length > 0 && (
                  <div className="bg-white p-5 rounded-sm border border-slate-200 space-y-2">
                    <h3 className="font-medium text-xs uppercase tracking-wider text-[#b8cd33]">
                      Techninė Charakteristika
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {product.specs.map((spec, idx) => (
                        <div
                          key={`${spec.label}-${idx}`}
                          className="flex justify-between py-1 border-b border-slate-100"
                        >
                          <span className="text-slate-500">{spec.label}:</span>
                          <span className="font-bold text-slate-900 text-right ml-3">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {PRODUCT_CALCULATORS[product.slug] && onOpenSkaiciuokles && (
                  <button
                    type="button"
                    onClick={onOpenSkaiciuokles}
                    className="px-6 py-3 bg-white border border-slate-200 hover:border-[#b8cd33] text-slate-800 font-medium rounded-sm text-xs transition-colors"
                  >
                    {PRODUCT_CALCULATORS[product.slug]}
                  </button>
                )}
                {product.catalogLabel &&
                  (isOpenableFile(product.catalogFileUrl) ? (
                    <a
                      href={product.catalogFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-medium rounded-sm text-xs transition-colors inline-flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{product.catalogLabel}</span>
                    </a>
                  ) : (
                    <span className="px-6 py-3 bg-slate-100 text-slate-400 font-medium rounded-sm text-xs inline-flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>{product.catalogLabel}</span>
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {product.advantages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight text-center mb-14">
            PRIVALUMAI
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {product.advantages.map((advantage, idx) => (
              <div
                key={`${advantage.title}-${idx}`}
                className="flex flex-col items-center text-center space-y-3 p-4 rounded-sm bg-slate-50/50"
              >
                {advantage.iconUrl && (
                  <img
                    src={advantage.iconUrl}
                    alt={advantage.title}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                  />
                )}
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-tight max-w-[220px]">
                  {advantage.title}
                </h3>
                <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed max-w-[260px]">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {product.joints.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight mb-10">
            {product.jointsTitle || "MAZGAI - JUNGTYS"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {product.joints.map((joint, idx) => (
              <div
                key={`${joint.acronym}-${idx}`}
                className="bg-white p-4 rounded-sm border border-slate-200 transition-shadow text-left space-y-3"
              >
                <div className="h-36 rounded-sm bg-slate-100 overflow-hidden relative">
                  <img
                    src={joint.imageUrl}
                    alt={joint.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {joint.acronym && (
                    <span className="absolute top-2 left-2 bg-slate-900 text-[#b8cd33] px-2 py-0.5 rounded-sm text-[10px] font-medium">
                      {joint.acronym}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-2">
                  {joint.title}
                </h3>
                {isOpenableFile(joint.fileUrl) ? (
                  <a
                    href={joint.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-slate-100 hover:bg-[#b8cd33] hover:text-slate-950 text-slate-800 font-medium rounded-sm text-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Atsisiųsti (DWG/PDF)</span>
                  </a>
                ) : (
                  <span className="w-full py-2 bg-slate-50 text-slate-400 font-medium rounded-sm text-xs flex items-center justify-center space-x-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Netrukus</span>
                  </span>
                )}
              </div>
            ))}
          </div>
          {product.jointsCtaLabel && (
            <div>
              <button
                onClick={onOpenAnalysisModal}
                className="px-8 py-3.5 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-medium rounded-sm text-sm transition-all inline-flex items-center space-x-2"
              >
                <span>{product.jointsCtaLabel}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
