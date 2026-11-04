import { factories } from '@strapi/strapi';
import {
  attributionFromBody,
  getClientMeta,
  getMailSettings,
  notifyEmailsFor,
  sendFormNotification,
  uploadFormFile,
} from '../../../utils/form-intake';
import { rejectIfGuarded } from '../../../utils/form-guard';
import { syncWebsiteEventOrQueue } from '../../../utils/notion-queue';

export default factories.createCoreController(
  'api::contact-submission.contact-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      if (await rejectIfGuarded(ctx)) return;
      const body = (ctx.request.body || {}) as Record<string, string>;
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();

      if (!name || !email) {
        return ctx.badRequest('Vardas ir el. paštas yra privalomi.');
      }

      const meta = getClientMeta(ctx);
      const attribution = attributionFromBody(body);
      const pageUrl = String(body.pageUrl || '').trim().slice(0, 500);
      const mail = await getMailSettings(strapi);
      const recipients = notifyEmailsFor('contact', mail);
      const uploadedFile = await uploadFormFile(
        strapi,
        ctx,
        'contact',
        `Kontaktų forma: ${name}`
      );
      if ('aborted' in uploadedFile && uploadedFile.aborted) return;

      const entry = await strapi.documents('api::contact-submission.contact-submission').create({
        data: {
          name,
          email,
          targetEmail: recipients[0],
          notifyEmails: recipients.join(', '),
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
          ...(uploadedFile.attachmentId ? { attachment: uploadedFile.attachmentId } : {}),
        },
      });

      const notion = await syncWebsiteEventOrQueue(strapi, {
        action: 'contact',
        code: 'KONTAKTAI',
        title: 'Kontaktų užklausa',
        name,
        email,
        pageUrl,
        consent: false,
        summary: uploadedFile.attachmentName
          ? `Prisegtas failas: ${uploadedFile.attachmentName}`
          : '',
        ...attribution,
      });

      try {
        await sendFormNotification(strapi, {
          kind: 'contact',
          replyTo: email,
          recipients,
          fromName: mail.fromName,
          fromEmail: mail.fromEmail,
          meta,
          uploaded: uploadedFile.uploaded,
          attachmentName: uploadedFile.attachmentName,
          fields: [
            { label: 'Vardas', value: name },
            { label: 'El. paštas', value: email },
          ],
        });
      } catch (error) {
        strapi.log.error(`Contact form email failed: ${error}`);
      }

      ctx.body = {
        ok: true,
        kontaktoId: (notion && 'personId' in notion && notion.personId) || '',
        data: {
          id: entry.documentId || entry.id,
          targetEmail: recipients[0],
          kontaktoId: (notion && 'personId' in notion && notion.personId) || '',
        },
      };
    },
  })
);
