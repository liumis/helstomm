import { factories } from '@strapi/strapi';
import {
  getClientMeta,
  getMailSettings,
  notifyEmailsFor,
  sendFormNotification,
  uploadFormFiles,
} from '../../../utils/form-intake';

export default factories.createCoreController(
  'api::analysis-submission.analysis-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      const body = (ctx.request.body || {}) as Record<string, string>;
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();
      const phone = String(body.phone || '').trim();
      const company = String(body.company || '').trim();
      const details = String(body.details || '').trim();

      if (!name || !email) {
        return ctx.badRequest('Vardas ir el. paštas yra privalomi.');
      }

      const meta = getClientMeta(ctx);
      const mail = await getMailSettings(strapi);
      const recipients = notifyEmailsFor('analysis', mail);
      const uploadedFiles = await uploadFormFiles(
        strapi,
        ctx,
        'analysis',
        `Analizės forma: ${name}`
      );
      if ('aborted' in uploadedFiles && uploadedFiles.aborted) return;

      const entry = await strapi.documents('api::analysis-submission.analysis-submission').create({
        data: {
          name,
          email,
          phone,
          company,
          details,
          notifyEmails: recipients.join(', '),
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
          ...(uploadedFiles.attachmentIds.length > 0 ? { attachment: uploadedFiles.attachmentIds } : {}),
        },
      });

      try {
        await sendFormNotification(strapi, {
          kind: 'analysis',
          replyTo: email,
          recipients,
          fromName: mail.fromName,
          fromEmail: mail.fromEmail,
          meta,
          uploaded: uploadedFiles.uploaded,
          attachmentName: uploadedFiles.attachmentNames.join(', '),
          fields: [
            { label: 'Vardas', value: name },
            { label: 'El. paštas', value: email },
            { label: 'Telefonas', value: phone },
            { label: 'Įmonė / projektas', value: company },
            { label: 'Aprašymas', value: details },
          ],
        });
      } catch (error) {
        strapi.log.error(`Analysis form email failed: ${error}`);
      }

      ctx.body = {
        data: {
          id: entry.documentId || entry.id,
        },
      };
    },
  })
);
