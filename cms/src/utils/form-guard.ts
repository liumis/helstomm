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

export async function rejectIfGuarded(ctx: {
  request: any;
  badRequest: (msg: string) => unknown;
  tooManyRequests?: (msg: string) => unknown;
}) {
  const meta = getClientMeta(ctx);
  if (!allowRate(meta.ipAddress)) {
    if (typeof ctx.tooManyRequests === 'function') {
      ctx.tooManyRequests('Per daug užklausų. Bandykite po minutės.');
    } else {
      ctx.badRequest('Per daug užklausų. Bandykite po minutės.');
    }
    return true;
  }
  return false;
}
