import { factories } from '@strapi/strapi';
import {
  getClientMeta,
  getMailSettings,
  notifyEmailsFor,
  sendFormNotification,
} from '../../../utils/form-intake';

export default factories.createCoreController(
  'api::training-submission.training-submission',
  ({ strapi }) => ({
    async submit(ctx) {
      const body = (ctx.request.body || {}) as Record<string, string>;
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();
      const phone = String(body.phone || '').trim();
      const company = String(body.company || '').trim();
      const participantsCount = String(body.participantsCount || '').trim();
      const topic = String(body.topic || '').trim();

      if (!name || !email || !phone) {
        return ctx.badRequest('Vardas, el. paštas ir telefonas yra privalomi.');
      }

      const meta = getClientMeta(ctx);
      const mail = await getMailSettings(strapi);
      const recipients = notifyEmailsFor('training', mail);

      const entry = await strapi.documents('api::training-submission.training-submission').create({
        data: {
          name,
          email,
          phone,
          company,
          participantsCount,
          topic,
          notifyEmails: recipients.join(', '),
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          deviceType: meta.deviceType,
          submittedAt: meta.submittedAt,
        },
      });

      try {
        await sendFormNotification(strapi, {
          kind: 'training',
          replyTo: email,
          recipients,
          fromName: mail.fromName,
          fromEmail: mail.fromEmail,
          meta,
          fields: [
            { label: 'Vardas', value: name },
            { label: 'El. paštas', value: email },
            { label: 'Telefonas', value: phone },
            { label: 'Įmonė', value: company },
            { label: 'Dalyvių skaičius', value: participantsCount },
            { label: 'Mokymų tema', value: topic },
          ],
        });
      } catch (error) {
        strapi.log.error(`Training form email failed: ${error}`);
      }

      ctx.body = {
        data: {
          id: entry.documentId || entry.id,
        },
      };
    },
  })
);
