import { getClientMeta } from './form-intake';

const hits = new Map<string, number[]>();

function prune(ip: string, now: number) {
  const list = (hits.get(ip) || []).filter((at) => now - at < 60_000);
  hits.set(ip, list);
  return list;
}

export function allowRate(ip: string, limit = 10) {
  const now = Date.now();
  const key = ip || 'unknown';
  const list = prune(key, now);
  if (list.length >= limit) return false;
  list.push(now);
  hits.set(key, list);
  return true;
}

export async function verifyTurnstile(token: string, ip: string) {
  const secret = String(process.env.TURNSTILE_SECRET || process.env.TURNSTILE_SECRET_KEY || '').trim();
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  return Boolean(json.success);
}

function bodyOf(ctx: { request: any }): Record<string, unknown> {
  const raw = ctx.request.body || {};
  if (raw && typeof raw === 'object' && raw.data && typeof raw.data === 'object') {
    return raw.data as Record<string, unknown>;
  }
  return raw as Record<string, unknown>;
}

export async function rejectIfGuarded(ctx: { request: any; badRequest: (msg: string) => unknown; tooManyRequests?: (msg: string) => unknown }) {
  const meta = getClientMeta(ctx);
  if (!allowRate(meta.ipAddress)) {
    if (typeof ctx.tooManyRequests === 'function') {
      ctx.tooManyRequests('Per daug užklausų. Bandykite po minutės.');
    } else {
      ctx.badRequest('Per daug užklausų. Bandykite po minutės.');
    }
    return true;
  }
  const body = bodyOf(ctx);
  const token = String(body.turnstileToken || body['cf-turnstile-response'] || '').trim();
  if (!(await verifyTurnstile(token, meta.ipAddress))) {
    ctx.badRequest('Nepavyko patvirtinti, kad nesate robotas.');
    return true;
  }
  return false;
}
