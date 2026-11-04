import type { Core } from '@strapi/strapi';
import { sendFormNotification, getClientMeta } from './form-intake';
import { syncWebsiteEventToNotion, type NotionCrmEvent } from './notion-crm';

const UID = 'api::notion-sync-job.notion-sync-job' as const;

export async function enqueueNotionJob(strapi: Core.Strapi, event: NotionCrmEvent, error: string) {
  try {
    await strapi.documents(UID).create({
      data: {
        action: event.action,
        status: 'pending',
        attempts: 1,
        lastError: String(error).slice(0, 1500),
        payload: event,
        nextAttemptAt: new Date(Date.now() + 15 * 60 * 1000),
      } as any,
    });
    strapi.log.warn(`Notion queue stored ${event.action}`);
  } catch (queueError) {
    strapi.log.error(`Notion queue write failed: ${String(queueError).slice(0, 300)}`);
  }
}

export async function syncWebsiteEventOrQueue(strapi: Core.Strapi, event: NotionCrmEvent) {
  const result = await syncWebsiteEventToNotion(event, strapi.log);
  if (result && 'error' in result && result.error) {
    await enqueueNotionJob(strapi, event, result.error);
  }
  return result;
}

export async function processNotionQueue(strapi: Core.Strapi) {
  const now = new Date();
  const jobs = await strapi.documents(UID).findMany({
    filters: { status: 'pending' },
    sort: { createdAt: 'asc' },
    limit: 20,
  } as any);
  const list = Array.isArray(jobs) ? jobs : [];

  for (const job of list) {
    const payload = (job.payload || {}) as NotionCrmEvent;
    const createdAt = new Date(job.createdAt || now);
    const nextAt = job.nextAttemptAt ? new Date(job.nextAttemptAt) : now;
    if (nextAt > now) continue;

    const result = await syncWebsiteEventToNotion(payload, strapi.log);
    const ok = result && !('error' in result && result.error) && !result.skipped;
    if (ok) {
      await strapi.documents(UID).update({
        documentId: job.documentId,
        data: { status: 'done', lastError: '' } as any,
      });
      continue;
    }

    const ageMs = now.getTime() - createdAt.getTime();
    const data: Record<string, unknown> = {
      attempts: Number(job.attempts || 1) + 1,
      lastError: String(('error' in (result || {}) && (result as { error?: string }).error) || 'retry').slice(0, 1500),
      nextAttemptAt: new Date(Date.now() + 15 * 60 * 1000),
    };
    if (ageMs >= 24 * 60 * 60 * 1000 && !job.alertedAt) {
      data.alertedAt = now;
      data.status = 'failed';
      try {
        await sendFormNotification(strapi, {
          kind: 'calculator',
          recipients: ['info@helstomm.lt'],
          fromName: 'Helstomm Group',
          fromEmail: process.env.SMTP_FROM || 'noreply@helstomm.lt',
          meta: getClientMeta({ request: { headers: {}, ip: '' } }),
          fields: [
            { label: 'Notion eilė', value: 'Užklausa nepavyko 24 val.' },
            { label: 'Veiksmas', value: payload.action || '' },
            { label: 'Kodas', value: payload.code || '' },
            { label: 'El. paštas', value: payload.email || '' },
            { label: 'Vardas', value: payload.name || '' },
            { label: 'Įmonė', value: payload.company || '' },
            { label: 'Projektas', value: payload.projectName || '' },
            { label: 'Klaida', value: String(data.lastError) },
          ],
        });
      } catch (error) {
        strapi.log.error(`Notion queue alert failed: ${String(error).slice(0, 200)}`);
      }
    }
    await strapi.documents(UID).update({
      documentId: job.documentId,
      data: data as any,
    });
  }
}
