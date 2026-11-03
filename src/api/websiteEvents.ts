import { attributionPayload } from '../lib/attribution';
import { readHelstommReg } from '../lib/helstommReg';

export type DocumentActivityAction = 'register' | 'view' | 'download';

export async function postDocumentActivity(input: {
  action: DocumentActivityAction;
  slug: string;
  code?: string;
  title?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  phone?: string;
}) {
  const stored = readHelstommReg();
  const firstName = input.firstName || stored.firstName || '';
  const lastName = input.lastName || stored.lastName || '';
  const payload = {
    action: input.action,
    slug: input.slug,
    code: input.code || '',
    title: input.title || '',
    firstName,
    lastName,
    name: input.name || [firstName, lastName].filter(Boolean).join(' '),
    email: input.email || stored.email || '',
    company: input.company || stored.company || '',
    role: input.role || stored.role || '',
    phone: input.phone || stored.phone || '',
    pageUrl: window.location.href,
    ...attributionPayload(),
  };
  if (!payload.email) return false;
  try {
    const res = await fetch('/api/document-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
