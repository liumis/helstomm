import { factories } from '@strapi/strapi';
import { attributionFromBody, getClientMeta } from '../../../utils/form-intake';
import { syncWebsiteEventOrQueue } from '../../../utils/notion-queue';

function firstFile(files: unknown) {
  if (!files) return null;
  if (Array.isArray(files)) return files[0] || null;
  return files;
}

export default factories.createCoreController(
  'api::form-submission.form-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      const body = (ctx.request.body || {}) as Record<string, unknown>;
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();

      if (!name || !email) {
        return ctx.badRequest('Vardas ir el. paštas yra privalomi.');
      }

      const settings = await strapi.documents('api::contact-setting.contact-setting').findFirst({
        status: 'published',
      });
      const targetEmail = settings?.targetEmail || 'info@helstomm.lt';

      const incoming = firstFile(
        (ctx.request.files as Record<string, unknown> | undefined)?.attachment
      );

      let attachmentId: number | string | null = null;
      let attachmentName = '';

      if (incoming) {
        const uploaded = await strapi.plugin('upload').service('upload').upload({
          data: {},
          files: incoming,
        });
        const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
        attachmentId = file?.id ?? null;
        attachmentName = file?.name || '';
      }

      const entry = await strapi.documents('api::form-submission.form-submission').create({
        data: {
          name,
          email,
          targetEmail,
          attachment: attachmentId,
          attachmentName,
        },
      });

      const meta = getClientMeta(ctx);
      void syncWebsiteEventOrQueue(strapi, {
        action: 'contact',
        code: 'KONTAKTAI',
        title: 'Kontaktų užklausa',
        name,
        email,
        pageUrl: String(body.pageUrl || '').trim().slice(0, 500),
        consent: false,
        summary: attachmentName ? `Prisegtas failas: ${attachmentName}` : '',
        ...attributionFromBody(body),
      });
      strapi.log.info(`Contact form saved (${meta.ipAddress})`);

      return {
        data: {
          id: entry.documentId,
          targetEmail,
        },
      };
    },
  })
);
