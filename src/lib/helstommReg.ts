export const REG_KEY = 'helstomm-calc-reg';

export type HelstommReg = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  role?: string;
  projectName?: string;
  kontaktoId?: string;
  newsConsent?: boolean;
};

export function readHelstommReg(): HelstommReg {
  try {
    return JSON.parse(localStorage.getItem(REG_KEY) || 'null') || {};
  } catch {
    return {};
  }
}

export function saveHelstommReg(data: HelstommReg) {
  const current = readHelstommReg();
  try {
    localStorage.setItem(REG_KEY, JSON.stringify({ ...current, ...data }));
  } catch {
    /* ignore quota */
  }
}

export function isHelstommRegistered() {
  const stored = readHelstommReg();
  const name = [stored.firstName, stored.lastName].filter(Boolean).join(' ').trim();
  return Boolean(name && stored.email && stored.company);
}
