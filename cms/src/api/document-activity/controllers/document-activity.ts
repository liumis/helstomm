import { factories } from '@strapi/strapi';
import { attributionFromBody, getClientMeta } from '../../../utils/form-intake';
import { rejectIfGuarded } from '../../../utils/form-guard';
import { syncWebsiteEventOrQueue } from '../../../utils/notion-queue';

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function asText(value: unknown, max = 200) {
  return String(value || '').trim().slice(0, max);
}

export default factories.createCoreController(
  'api::document-activity.document-activity',
  ({ strapi }) => ({
    async submit(ctx) {
      if (await rejectIfGuarded(ctx)) return;
      const raw = (ctx.request.body || {}) as Record<string, unknown>;
      const body = asRecord(raw.data ?? raw);
      const actionRaw = asText(body.action, 20);
      const action =
        actionRaw === 'download' ? 'download' : actionRaw === 'view' ? 'view' : 'register';
      const firstName = asText(body.firstName, 80);
      const lastName = asText(body.lastName, 80);
      const email = asText(body.email, 180);
      const company = asText(body.company, 160);
      const name =
        asText(body.name, 200) || [firstName, lastName].filter(Boolean).join(' ').trim();
      const slug = asText(body.slug, 120);
      const code = asText(body.code, 80);
      const title = asText(body.title, 200);
      const role = asText(body.role, 80);
      const phone = asText(body.phone, 40);
      const pageUrl = asText(body.pageUrl, 500);

      if (!name || !email) {
        return ctx.badRequest('Vardas ir el. paštas yra privalomi.');
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return ctx.badRequest('El. paštas neteisingas.');
      }

      const meta = getClientMeta(ctx);
      const attribution = attributionFromBody(body);

      const entry = await strapi.documents('api::document-activity.document-activity').create({
        data: {
          action,
          slug,
          code,
          title,
          name,
          firstName,
          lastName,
          email,
          company,
          role,
          phone,
          pageUrl,
          ...attribution,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
        } as any,
      });

      const notion = await syncWebsiteEventOrQueue(strapi, {
        action,
        code: code || slug,
        title,
        name,
        firstName,
        lastName,
        email,
        company,
        role,
        phone,
        pageUrl,
        personId: asText(body.kontaktoId || body.personId, 80),
        consent: false,
        ...attribution,
      });

      ctx.body = {
        ok: true,
        kontaktoId: (notion && 'personId' in notion && notion.personId) || '',
        data: {
          id: entry.documentId || entry.id,
          kontaktoId: (notion && 'personId' in notion && notion.personId) || '',
        },
      };
    },
  })
);
