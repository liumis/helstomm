const KEY = 'helstomm-utm';

export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  referrer: string;
  landingPath: string;
};

const EMPTY: Attribution = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  referrer: '',
  landingPath: '',
};

function readParams() {
  try {
    return new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams();
  }
}

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const stored = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    if (stored) return { ...EMPTY, ...JSON.parse(stored) };
  } catch {
    /* ignore */
  }
  const params = readParams();
  const data: Attribution = {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    referrer: document.referrer || '',
    landingPath: `${window.location.pathname}${window.location.search}`,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
  return data;
}

export function attributionPayload() {
  return captureAttribution();
}
