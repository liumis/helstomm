import React, { useEffect, useRef, useState } from 'react';
import { calculatorPathForCode } from '../../data/calculators';
import { SKAICIUOKLES_LISTS } from '../../data/skaiciuoklesMarkup';
import '../../skaiciuokles.css';

type Audience = keyof typeof SKAICIUOKLES_LISTS;

const AUDIENCES: {
  id: Audience;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'projektuotojams',
    title: 'Projektuotojams',
    subtitle: 'Architektams ir konstruktoriams · 14',
    icon: (
      <svg className="i" viewBox="0 0 24 24">
        <path d="M3 21l6-6M14 4l6 6-9 9H5v-6z" />
        <path d="M12 6l6 6" />
      </svg>
    ),
  },
  {
    id: 'vystytojams',
    title: 'Vystytojams',
    subtitle: 'Kaina, terminai, nauda · 3 + 1',
    icon: (
      <svg className="i" viewBox="0 0 24 24">
        <path d="M3 20h18M5 20V9l7-5 7 5v11" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    id: 'statybininkams',
    title: 'Statybininkams',
    subtitle: 'Darbai aikštelėje · 2 + 2',
    icon: (
      <svg className="i" viewBox="0 0 24 24">
        <path d="M4 18h16M6 18V8a6 6 0 0 1 12 0v10" />
        <path d="M12 2v4M3 21h18" />
      </svg>
    ),
  },
];

const FILTER_CODES: Record<string, string[] | null> = {
  visos: null,
  sienos: ['P1', 'P2', 'P3', 'P4', 'P8', 'P9', 'P13', 'P14'],
  perdangos: ['P5', 'P6', 'P7', 'P10', 'P11', 'P12'],
  ugnis: ['P2', 'P6'],
  montavimas: ['P7', 'P8', 'S2', 'S3', 'S4'],
};

const NOTIFY_TITLES: Record<string, string> = {
  V4: 'Projekto biudžetas',
  S2: 'Sienų betonavimas',
  S3: 'Medžiagos ir darbai',
};

type NotifyTarget = { code: string; title: string };

interface Props {
  onOpenAnalysisModal: () => void;
  onOpenCalculator: (path: string) => void;
}

function audienceFromPath(pathname: string): Audience {
  if (pathname.includes('/vystytojams')) return 'vystytojams';
  if (pathname.includes('/statybininkams')) return 'statybininkams';
  return 'projektuotojams';
}

function filterKeyFromLabel(text: string) {
  const value = text.toLowerCase();
  if (value.startsWith('sienos')) return 'sienos';
  if (value.startsWith('perdangos')) return 'perdangos';
  if (value.includes('ugniai') || value.includes('ugnis')) return 'ugnis';
  if (value.includes('montavimas')) return 'montavimas';
  return 'visos';
}

function cardCode(card: Element) {
  return card.querySelector('.code')?.textContent?.replace(/\s+/g, '').toUpperCase() || '';
}

export const SkaiciuoklesView: React.FC<Props> = ({ onOpenAnalysisModal, onOpenCalculator }) => {
  const [audience, setAudience] = useState<Audience>(() => audienceFromPath(window.location.pathname));
  const [notify, setNotify] = useState<NotifyTarget | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyError, setNotifyError] = useState('');
  const [notifyDone, setNotifyDone] = useState(false);
  const [notifySending, setNotifySending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const activeFilter = useRef('visos');

  const applyFilter = (key: string) => {
    const root = listRef.current;
    if (!root) return;
    activeFilter.current = key;
    const allowed = FILTER_CODES[key] ?? null;

    root.querySelectorAll('.filters span').forEach((span) => {
      span.classList.toggle('on', filterKeyFromLabel(span.textContent || '') === key);
    });

    root.querySelectorAll('.sc').forEach((card) => {
      const code = cardCode(card);
      const visible = !allowed || allowed.includes(code);
      card.classList.toggle('is-hidden', !visible);
    });

    root.querySelectorAll('.grp').forEach((group) => {
      const visible = Array.from(group.querySelectorAll('.sc')).some(
        (card) => !card.classList.contains('is-hidden')
      );
      group.classList.toggle('is-hidden', !visible);
    });
  };

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    root.querySelectorAll('.sc').forEach((card) => {
      const code = cardCode(card);
      const path = code ? calculatorPathForCode(code) : undefined;
      if (path && !card.classList.contains('dim')) {
        card.setAttribute('data-calc', code);
      }
    });
    applyFilter(activeFilter.current);
  }, [audience]);

  const openNotify = (card: HTMLElement) => {
    const code = cardCode(card);
    const title =
      card.querySelector('h4')?.textContent?.trim() || NOTIFY_TITLES[code] || code;
    setNotify({ code, title });
    setNotifyError('');
    setNotifyDone(false);
    try {
      const stored = JSON.parse(localStorage.getItem('helstomm-calc-reg') || 'null');
      setNotifyEmail(stored?.email || '');
    } catch {
      setNotifyEmail('');
    }
  };

  const onListClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('.sbtn.lime')) {
      event.preventDefault();
      onOpenAnalysisModal();
      return;
    }

    const filter = target.closest('.filters span') as HTMLElement | null;
    if (filter) {
      applyFilter(filterKeyFromLabel(filter.textContent || ''));
      return;
    }

    const dim = target.closest('.sc.dim') as HTMLElement | null;
    if (dim) {
      event.preventDefault();
      openNotify(dim);
      return;
    }

    const card = target.closest('.sc') as HTMLElement | null;
    const path = card ? calculatorPathForCode(card.getAttribute('data-calc') || '') : undefined;
    if (path) {
      event.preventDefault();
      onOpenCalculator(path);
    }
  };

  const submitNotify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!notify) return;
    const email = notifyEmail.trim();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNotifyError('Įveskite el. paštą.');
      return;
    }
    setNotifySending(true);
    setNotifyError('');
    try {
      const res = await fetch('/api/calculator-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'notify',
          code: notify.code,
          title: notify.title,
          name: 'Praneškite man',
          email,
          pageUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error('fail');
      setNotifyDone(true);
    } catch {
      setNotifyError('Nepavyko išsiųsti. Bandykite dar kartą.');
    } finally {
      setNotifySending(false);
    }
  };

  return (
    <div className="skaiciuokles-page">
      <div className="hero w">
        <span className="chip">SKAIČIUOKLĖS IR ĮRANKIAI</span>
        <h1>
          Pasiskaičiuokite patys
          <em>prieš priimdami sprendimą</em>
        </h1>
        <p>
          Filigran dvigubos sienos ir perdangos: apsauginis sluoksnis, atsparumas ugniai, girderiai,
          laikančios, rūsio ir termo sienos, jungtys, perdangų patikra ir kainos palyginimas su monolitu.
        </p>
        <div className="free">
          Duomenis įvesti galite laisvai · rezultatai <b>po nemokamos registracijos</b>
        </div>
        <div className="aud">
          {AUDIENCES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={audience === item.id ? 'on' : ''}
              onClick={() => {
                activeFilter.current = 'visos';
                setAudience(item.id);
              }}
            >
              <span className="ic">{item.icon}</span>
              <span>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={listRef}
        dangerouslySetInnerHTML={{ __html: SKAICIUOKLES_LISTS[audience] }}
        onClick={onListClick}
      />

      {notify && (
        <div
          className="notify-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setNotify(null);
          }}
        >
          <form className="notify-box" onSubmit={submitNotify}>
            <button
              type="button"
              className="notify-close"
              aria-label="Uždaryti"
              onClick={() => setNotify(null)}
            >
              ×
            </button>
            {notifyDone ? (
              <>
                <h3>Ačiū, pranešime</h3>
                <p>
                  Kai {notify.code} bus paruošta, parašysime adresu <b>{notifyEmail}</b>.
                </p>
                <button type="button" className="notify-submit" onClick={() => setNotify(null)}>
                  Uždaryti
                </button>
              </>
            ) : (
              <>
                <h3>Praneškite man</h3>
                <p>
                  {notify.code}
                  {notify.title ? ` · ${notify.title}` : ''} dar rengiama. Palikite el. paštą –
                  parašysime, kai skaičiuoklė bus paruošta.
                </p>
                <label htmlFor="notify-email">El. paštas *</label>
                <input
                  id="notify-email"
                  type="email"
                  autoComplete="email"
                  value={notifyEmail}
                  onChange={(event) => setNotifyEmail(event.target.value)}
                  required
                />
                {notifyError && <div className="notify-err">{notifyError}</div>}
                <button className="notify-submit" type="submit" disabled={notifySending}>
                  {notifySending ? 'Siunčiama…' : 'Pranešti man →'}
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
