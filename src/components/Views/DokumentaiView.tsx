import React, { useEffect, useMemo, useState } from 'react';
import { fetchDocuments } from '../../api/documents';
import { fetchDokumentaiSettings } from '../../api/dokumentai';
import { calculatorPathForCode } from '../../data/calculators';
import { FALLBACK_DOKUMENTAI } from '../../data/pageChrome';
import { LIBRARY_UPDATED_ON } from '../../data/libraryDocuments';
import { postDocumentActivity } from '../../api/websiteEvents';
import {
  isHelstommRegistered,
  readHelstommReg,
  saveHelstommReg,
} from '../../lib/helstommReg';
import type { DocumentSection, LibraryDocument } from '../../types';
import '../../skaiciuokles.css';
import '../../dokumentai.css';

type FilterKey = 'visos' | DocumentSection | 'sienos' | 'perdangos';

interface Props {
  documentSlug?: string;
  onOpenDocument: (slug: string) => void;
  onCloseDocument: () => void;
  onOpenCalculator: (path: string) => void;
  onOpenAnalysisModal: () => void;
  onOpenSkaiciuokles: () => void;
}

const ROLES = ['Projektuotojas', 'Statybininkas', 'Vystytojas', 'Kita'];

const EyeIcon = () => (
  <svg className="ii" viewBox="0 0 24 24">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="ii" viewBox="0 0 24 24">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

const LockIcon = () => (
  <svg className="lk" viewBox="0 0 24 24">
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <rect x="5" y="11" width="14" height="10" rx="2" />
  </svg>
);

function matchesSearch(doc: LibraryDocument, query: string) {
  if (!query) return true;
  return [doc.name, doc.acronym, doc.description, doc.subcategory, doc.tags.join(' '), doc.relatedCodes.join(' ')]
    .join(' ')
    .toLowerCase()
    .includes(query);
}

function matchesFilter(doc: LibraryDocument, filter: FilterKey) {
  if (filter === 'visos') return true;
  if (filter === 'sienos') return doc.tags.some((tag) => tag.toLowerCase().includes('sien'));
  if (filter === 'perdangos') return doc.tags.some((tag) => tag.toLowerCase().includes('perdang'));
  return doc.section === filter;
}

function badgeLabel(doc: LibraryDocument) {
  if (doc.badge === 'nauja') return 'NAUJA';
  if (doc.badge === 'atnaujinta') return 'ATNAUJINTA';
  return '';
}

function pdfFileName(doc: LibraryDocument) {
  return doc.pdfUrl.split('/').pop() || `${doc.id}.pdf`;
}

const RelatedCodes: React.FC<{
  codes: string[];
  limit?: number;
  onOpenCalculator: (path: string) => void;
}> = ({ codes, limit = 8, onOpenCalculator }) => {
  if (!codes.length) return null;
  const shown = codes.slice(0, limit);
  const rest = codes.length - shown.length;
  return (
    <div className="rel">
      Susijusios skaičiuoklės:{' '}
      {shown.map((code) => {
        const path = calculatorPathForCode(code);
        return path ? (
          <button key={code} type="button" onClick={() => onOpenCalculator(path)}>
            {code}
          </button>
        ) : (
          <b key={code}>{code}</b>
        );
      })}
      {rest > 0 ? <span> …</span> : null}
    </div>
  );
};

const DocumentActions: React.FC<{
  doc: LibraryDocument;
  registered: boolean;
  compact?: boolean;
  onView: () => void;
  onDownload: () => void;
}> = ({ doc, registered, compact, onView, onDownload }) => (
  <div className="acts">
    <button type="button" className="btn sec" onClick={onView}>
      <EyeIcon />
      Peržiūrėti
    </button>
    <button type="button" className="btn pri" onClick={onDownload} disabled={!doc.pdfUrl}>
      <DownloadIcon />
      Atsisiųsti PDF
    </button>
    {!registered && !compact ? (
      <span className="reg">
        <LockIcon />
        po registracijos
      </span>
    ) : null}
  </div>
);

const RegisterBox: React.FC<{
  onDone: () => void;
  doc?: LibraryDocument;
}> = ({ onDone, doc }) => {
  const stored = readHelstommReg();
  const returning = isHelstommRegistered();
  const [fullName, setFullName] = useState(
    [stored.firstName, stored.lastName].filter(Boolean).join(' ')
  );
  const [company, setCompany] = useState(stored.company || '');
  const [role, setRole] = useState(stored.role || 'Projektuotojas');
  const [phone, setPhone] = useState(stored.phone || '');
  const [email, setEmail] = useState(stored.email || '');
  const [privacy, setPrivacy] = useState(returning);
  const [error, setError] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const names = fullName.trim().split(/\s+/);
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ');
    if (!firstName || !company.trim() || !email.trim()) {
      setError('Užpildykite vardą, įmonę ir el. paštą.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Įveskite teisingą el. paštą.');
      return;
    }
    if (!privacy) {
      setError('Sutikite su privatumo politika.');
      return;
    }
    saveHelstommReg({
      firstName,
      lastName,
      company: company.trim(),
      role,
      phone: phone.trim(),
      email: email.trim(),
    });
    if (doc) {
      void postDocumentActivity({
        action: 'register',
        slug: doc.id,
        code: doc.acronym,
        title: doc.name,
        firstName,
        lastName,
        email: email.trim(),
        company: company.trim(),
        role,
        phone: phone.trim(),
      });
    }
    onDone();
  };

  return (
    <form className="regbox" onSubmit={submit}>
      <div className="rh">
        <LockIcon />
        {returning ? 'Kitas projektas' : 'Toliau – po nemokamos registracijos'}
      </div>
      <p>
        {returning
          ? 'Jūs jau registruoti. Užtenka patvirtinti ir tęsti – ta pati paskyra galioja ir skaičiuoklėms.'
          : 'Užsiregistravę peržiūrėsite ir atsisiųsite visus Helstomm vadovus, mazgus ir instrukcijas. Ta pati paskyra – ir skaičiuoklėms.'}
      </p>
      <div className="fg">
        <div className="fi wide">
          <label>Vardas, pavardė *</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
        </div>
        <div className="fi">
          <label>Įmonė *</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </div>
        <div className="fi">
          <label>Pareigos / veikla *</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="fi">
          <label>Telefonas</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div className="fi">
          <label>El. paštas *</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
      </div>
      <label className="ck">
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
        <span>
          Sutinku su <a className="priv" href="/privatumas">privatumo politika</a> *
        </span>
      </label>
      {error ? <p className="reg-err">{error}</p> : null}
      <div className="rb">
        <button type="submit" className="btn pri">
          {returning ? 'Tęsti' : 'Registruotis ir tęsti'}
        </button>
      </div>
    </form>
  );
};

const DocumentPage: React.FC<{
  doc: LibraryDocument;
  registered: boolean;
  onRegistered: () => void;
  onClose: () => void;
  onDownload: () => void;
  onOpenCalculator: (path: string) => void;
}> = ({ doc, registered, onRegistered, onClose, onDownload, onOpenCalculator }) => {
  const cover = doc.portraitImage || doc.image;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="dpage w">
      <div className="crumbs">
        <button type="button" onClick={onClose}>
          Dokumentai ir mazgai
        </button>
        {' › '}
        {doc.audience}
        {' › '}
        <b>{doc.name}</b>
      </div>
      <div className="dhead">
        <div>
          <div className="code">
            <b>{doc.acronym}</b> · v{doc.version}
          </div>
          <h2>{doc.name}</h2>
          <p>{doc.description}</p>
        </div>
        <div className="acts" style={{ border: 0, paddingTop: 0 }}>
          <button type="button" className="btn sec" onClick={copyLink}>
            {copied ? 'Nukopijuota' : 'Kopijuoti nuorodą'}
          </button>
          <button type="button" className="btn pri" onClick={onDownload} disabled={!doc.pdfUrl}>
            <DownloadIcon />
            Atsisiųsti PDF
          </button>
        </div>
      </div>
      <div className="dgrid">
        <aside className="toc">
          <h6>Turinys</h6>
          {doc.toc.length ? (
            doc.toc.map((item, index) => (
              <div key={item.title} className={index === 0 ? 'on' : ''}>
                {item.title}
                <i>{item.page}</i>
              </div>
            ))
          ) : (
            <div>Turinys – PDF faile</div>
          )}
        </aside>
        <div className="viewer">
          <div className="vbar">
            <span>{pdfFileName(doc)}</span>
            <span>
              1 / {doc.pages} · peržiūra
            </span>
          </div>
          {registered && doc.pdfUrl ? (
            <iframe className="vframe" title={doc.name} src={`${doc.pdfUrl}#page=1`} />
          ) : (
            <div className="vlock">
              <div className="vpage" style={{ backgroundImage: cover ? `url(${cover})` : undefined }} />
              <RegisterBox doc={doc} onDone={onRegistered} />
            </div>
          )}
        </div>
        <aside className="info">
          <h6>Dokumentas</h6>
          <div className="row">
            <span>Kodas</span>
            <b>{doc.acronym}</b>
          </div>
          <div className="row">
            <span>Versija</span>
            <b>v{doc.version}</b>
          </div>
          <div className="row">
            <span>Data</span>
            <b>{doc.publishedOn}</b>
          </div>
          <div className="row">
            <span>Puslapiai</span>
            <b>{doc.pages}</b>
          </div>
          <div className="row">
            <span>Failas</span>
            <b>PDF {doc.fileSize}</b>
          </div>
          <button type="button" className="btn pri" onClick={onDownload} disabled={!doc.pdfUrl}>
            <DownloadIcon />
            {registered ? 'Atsisiųsti PDF' : 'Atsisiųsti PDF'}
          </button>
          {!registered ? <p className="reg">po nemokamos registracijos</p> : null}
          {doc.relatedCodes.length ? (
            <>
              <h6 style={{ marginTop: 18 }}>Susijusios skaičiuoklės</h6>
              <RelatedCodes codes={doc.relatedCodes} onOpenCalculator={onOpenCalculator} />
            </>
          ) : null}
          <h6 style={{ marginTop: 18 }}>Versijų istorija</h6>
          <div className="hist">
            <div>
              <b>v{doc.version}</b> · {doc.publishedOn} · {doc.badge === 'nauja' ? 'pirmasis leidimas' : 'atnaujinta'}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export const DokumentaiView: React.FC<Props> = ({
  documentSlug,
  onOpenDocument,
  onCloseDocument,
  onOpenCalculator,
  onOpenAnalysisModal,
  onOpenSkaiciuokles,
}) => {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [page, setPage] = useState(FALLBACK_DOKUMENTAI);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterKey>('visos');
  const [registered, setRegistered] = useState(() => isHelstommRegistered());

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
  const visible = useMemo(() => {
    const order = new Map<string, number>(documents.map((doc, index) => [doc.id, index]));
    return documents
      .filter((doc) => matchesSearch(doc, query) && matchesFilter(doc, filter))
      .sort((a, b) => {
        const byDate = b.publishedOn.localeCompare(a.publishedOn);
        if (byDate) return byDate;
        return (order.get(a.id) || 0) - (order.get(b.id) || 0);
      });
  }, [documents, query, filter]);

  const grouped = {
    projektavimas: visible.filter((doc) => doc.section === 'projektavimas'),
    montavimas: visible.filter((doc) => doc.section === 'montavimas'),
    kokybe: visible.filter((doc) => doc.section === 'kokybe'),
  };

  const openDoc = documents.find((doc) => doc.id === documentSlug);
  const counts = {
    visos: documents.length,
    projektavimas: documents.filter((doc) => doc.section === 'projektavimas').length,
    montavimas: documents.filter((doc) => doc.section === 'montavimas').length,
    kokybe: documents.filter((doc) => doc.section === 'kokybe').length,
  };

  const downloadDoc = (doc: LibraryDocument) => {
    if (!doc.pdfUrl) return;
    if (!registered) {
      onOpenDocument(doc.id);
      return;
    }
    const link = document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = pdfFileName(doc);
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    void postDocumentActivity({
      action: 'download',
      slug: doc.id,
      code: doc.acronym,
      title: doc.name,
    });
  };

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'visos', label: `Visi · ${counts.visos}` },
    { key: 'projektavimas', label: `Projektavimas · ${counts.projektavimas}` },
    { key: 'montavimas', label: `Montavimas ir logistika · ${counts.montavimas}` },
    { key: 'kokybe', label: `Kokybė · ${counts.kokybe}` },
    { key: 'sienos', label: 'Sienos' },
    { key: 'perdangos', label: 'Perdangos' },
  ];

  if (openDoc) {
    return (
      <div className="skaiciuokles-page dokumentai-page">
        <DocumentPage
          doc={openDoc}
          registered={registered}
          onRegistered={() => setRegistered(true)}
          onClose={onCloseDocument}
          onDownload={() => downloadDoc(openDoc)}
          onOpenCalculator={onOpenCalculator}
        />
      </div>
    );
  }

  return (
    <div className="skaiciuokles-page dokumentai-page">
      <div className="hero w">
        <span className="chip">{page.badge}</span>
        <h1>
          {page.title}
          <em>{page.highlight}</em>
        </h1>
        <p>{page.intro}</p>
        <div className="free">
          Pirmas puslapis ir turinys – laisvai · visą dokumentą peržiūrėti ir atsisiųsti{' '}
          <b>po nemokamos registracijos</b>
        </div>
        <div className="aud">
          <button type="button" className={filter === 'projektavimas' ? 'on' : ''} onClick={() => setFilter('projektavimas')}>
            <span className="ic">
              <svg className="i" viewBox="0 0 24 24">
                <path d="M3 21l6-6M14 4l6 6-9 9H5v-6z" />
                <path d="M12 6l6 6" />
              </svg>
            </span>
            <span>
              <b>Projektuotojams</b>
              <small>Vadovas, mazgai · {counts.projektavimas}</small>
            </span>
          </button>
          <button type="button" className={filter === 'montavimas' ? 'on' : ''} onClick={() => setFilter('montavimas')}>
            <span className="ic">
              <svg className="i" viewBox="0 0 24 24">
                <path d="M4 18h16M6 18V8a6 6 0 0 1 12 0v10" />
                <path d="M12 2v4M3 21h18" />
              </svg>
            </span>
            <span>
              <b>Statybininkams</b>
              <small>Montavimas ir logistika · {counts.montavimas}</small>
            </span>
          </button>
          <button type="button" className={filter === 'kokybe' ? 'on' : ''} onClick={() => setFilter('kokybe')}>
            <span className="ic">
              <svg className="i" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <span>
              <b>Kokybė ir priežiūra</b>
              <small>Specifikacija, remontas · {counts.kokybe}</small>
            </span>
          </button>
        </div>
      </div>

      <div className="list w">
            <div className="list-h">
              <h2>{page.manualsHeading}</h2>
              <p>
                {counts.visos} dokumentai · atnaujinta {LIBRARY_UPDATED_ON}
              </p>
            </div>
            <div className="search">
              <div className="box">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={page.searchPlaceholder}
                />
              </div>
              <span className="sort">Rikiuoti: naujausi ▾</span>
            </div>
            <div className="filters">
              {filters.map((item) => (
                <span
                  key={item.key}
                  className={filter === item.key ? 'on' : ''}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {loading ? <div className="note">Kraunami dokumentai...</div> : null}

            {!loading && visible.length === 0 ? (
              <div className="help">
                <div>
                  <h4>{page.emptyTitle}</h4>
                  <p>{page.emptyIntro}</p>
                </div>
                <button type="button" className="sbtn lime" onClick={() => { setSearchTerm(''); setFilter('visos'); }}>
                  {page.emptyCta}
                </button>
              </div>
            ) : null}

            {grouped.projektavimas.length > 0 && (
              <div className="grp">
                <div className="grp-h">
                  <div>
                    <h3>Projektuotojams</h3>
                    <p>Projektavimo vadovas ir tipiniai mazgai – kartu su skaičiuoklėmis P1–P14.</p>
                  </div>
                  <button type="button" className="aside" onClick={onOpenSkaiciuokles}>
                    → Skaičiuoklės
                  </button>
                </div>
                <div className="feat">
                  {grouped.projektavimas.map((doc) => (
                    <article key={doc.id} className="fd">
                      <div
                        className="pic"
                        style={{
                          backgroundImage: `url(${doc.image})`,
                          ['--pp' as string]: `url(${doc.portraitImage || doc.image})`,
                          ['--pl' as string]: `url(${doc.image})`,
                        }}
                      >
                        <span className="code">{doc.acronym}</span>
                        {badgeLabel(doc) ? <span className="upd">{badgeLabel(doc)}</span> : null}
                      </div>
                      <div className="bd">
                        <div className="k">{doc.audience}</div>
                        <h4>{doc.name}</h4>
                        <p>{doc.description}</p>
                        <div className="meta">
                          <span>v<b>{doc.version}</b></span>
                          <span>{doc.publishedOn}</span>
                          <span>{doc.pages} psl.</span>
                          <span>PDF {doc.fileSize}</span>
                        </div>
                        <div className="tags">
                          {doc.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <RelatedCodes codes={doc.relatedCodes} onOpenCalculator={onOpenCalculator} />
                        <DocumentActions
                          doc={doc}
                          registered={registered}
                          onView={() => onOpenDocument(doc.id)}
                          onDownload={() => downloadDoc(doc)}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {grouped.montavimas.length > 0 && (
              <div className="grp">
                <div className="grp-h">
                  <div>
                    <h3>Montavimas ir logistika</h3>
                    <p>Instrukcijos aikštelei: pristatymas, kėlimas, montavimas, išramstymas, betonavimas.</p>
                  </div>
                  {!registered ? <span className="aside">Po registracijos</span> : null}
                </div>
                <div className="docs">
                  {grouped.montavimas.map((doc) => (
                    <article key={doc.id} className="dc">
                      <div className="pic" style={{ backgroundImage: `url(${doc.image})` }}>
                        {badgeLabel(doc) ? <span className="upd">{badgeLabel(doc)}</span> : null}
                      </div>
                      <div className="bd">
                        <span className="kc">{doc.acronym}</span>
                        <h4>{doc.name}</h4>
                        <p>{doc.description}</p>
                        <div className="meta">
                          <span>v<b>{doc.version}</b></span>
                          <span>{doc.publishedOn}</span>
                          <span>{doc.pages} psl.</span>
                          <span>PDF {doc.fileSize}</span>
                        </div>
                        <div className="tags">
                          {doc.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <DocumentActions
                          doc={doc}
                          registered={registered}
                          compact
                          onView={() => onOpenDocument(doc.id)}
                          onDownload={() => downloadDoc(doc)}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {grouped.kokybe.length > 0 && (
              <div className="grp">
                <div className="grp-h">
                  <div>
                    <h3>Kokybė ir priežiūra</h3>
                    <p>Specifikacija, darbų užbaigimas ir gelžbetonio defektacija.</p>
                  </div>
                </div>
                <div className="docs">
                  {grouped.kokybe.map((doc) => (
                    <article key={doc.id} className="dc">
                      <div className="pic" style={{ backgroundImage: `url(${doc.image})` }}>
                        {badgeLabel(doc) ? <span className="upd">{badgeLabel(doc)}</span> : null}
                      </div>
                      <div className="bd">
                        <span className="kc">{doc.acronym}</span>
                        <h4>{doc.name}</h4>
                        <p>{doc.description}</p>
                        <div className="meta">
                          <span>v<b>{doc.version}</b></span>
                          <span>{doc.publishedOn}</span>
                          <span>{doc.pages} psl.</span>
                          <span>PDF {doc.fileSize}</span>
                        </div>
                        <div className="tags">
                          {doc.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <DocumentActions
                          doc={doc}
                          registered={registered}
                          compact
                          onView={() => onOpenDocument(doc.id)}
                          onDownload={() => downloadDoc(doc)}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="cta">
            <div>
              <h3>Neradote reikiamo dokumento?</h3>
              <p>Atsiųskite brėžinius – įvertinsime projektą ir pasiūlysime optimalų sprendimą.</p>
            </div>
            <button type="button" className="sbtn lime" onClick={onOpenAnalysisModal}>
              {page.analysisCta} →
            </button>
          </div>
    </div>
  );
};
